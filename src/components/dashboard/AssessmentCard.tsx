import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Chart } from 'chart.js/auto';
import { Clock, Sparkles, CheckCircle, Info } from 'lucide-react';
import AssessmentModal from './AssessmentModal';
import { toast } from 'sonner';
import LoadingSpinner from '../LoadingSpinner';

interface PuppyProfile {
  id: string;
  name: string;
}

interface Assessment {
  id: string;
  created_at: string;
  basic_training_score: number;
  demeanor_score: number;
  socialization_score: number;
  health_score: number;
  adaptability_score: number;
  overall_score: number;
  next_assessment_date: string;
}

interface AssessmentCardProps {
  puppy: PuppyProfile | null;
  onAssessmentComplete?: () => void;
}

export default function AssessmentCard({ puppy, onAssessmentComplete }: AssessmentCardProps) {
  const [latestAssessment, setLatestAssessment] = useState<Assessment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (!puppy?.id) return;

    const fetchLatestAssessment = async () => {
      try {
        const { data, error } = await supabase
          .from('puppy_assessments')
          .select('*')
          .eq('puppy_id', puppy.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setLatestAssessment(data);
      } catch (error) {
        console.error('Error fetching assessment:', error);
        toast.error('Failed to load progress data');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAssessment();
  }, [puppy?.id]);

  useEffect(() => {
    if (!latestAssessment) return;

    if (chart) {
      chart.destroy();
    }

    const ctx = document.getElementById('assessmentChart') as HTMLCanvasElement;
    if (!ctx) return;

    const newChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'Basic Training',
          'Demeanor',
          'Socialization',
          'Health',
          'Adaptability'
        ],
        datasets: [{
          label: 'Current Progress',
          data: [
            latestAssessment.basic_training_score,
            latestAssessment.demeanor_score,
            latestAssessment.socialization_score,
            latestAssessment.health_score,
            latestAssessment.adaptability_score
          ],
          backgroundColor: 'rgba(147, 51, 234, 0.2)',
          borderColor: 'rgb(147, 51, 234)',
          pointBackgroundColor: 'rgb(147, 51, 234)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(147, 51, 234)'
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, [latestAssessment]);

  const canTakeAssessment = () => {
    if (!latestAssessment) return true;
    const nextDate = new Date(latestAssessment.next_assessment_date);
    return new Date() >= nextDate;
  };

  const getTimeUntilNextAssessment = () => {
    if (!latestAssessment) return '';
    const nextDate = new Date(latestAssessment.next_assessment_date);
    const now = new Date();
    const diff = nextDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} day${days === 1 ? '' : 's'}`;
  };

  const handleAssessmentComplete = (newAssessment: Assessment) => {
    setLatestAssessment(newAssessment);
    setShowModal(false);
    if (onAssessmentComplete) {
      onAssessmentComplete();
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-center items-center h-48">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {puppy?.name ? `${puppy.name}'s Progress Tracker` : 'Puppy Progress Tracker'}
          </h3>
          <p className="text-sm text-gray-600">
            Let's see how {puppy?.name || 'your puppy'} is growing and learning! 🐾
          </p>
        </div>
        {latestAssessment && (
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-gray-600">Next check-in in {getTimeUntilNextAssessment()}</span>
          </div>
        )}
      </div>

      {latestAssessment ? (
        <div className="space-y-6">
          <div className="aspect-square w-full max-w-md mx-auto">
            <canvas id="assessmentChart"></canvas>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <button
                    onClick={() => setShowScoreInfo(!showScoreInfo)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-lg font-semibold text-purple-600">
                  {latestAssessment.overall_score}/10
                </span>
              </div>
              {showScoreInfo && (
                <div className="text-xs text-gray-600 mb-2 bg-white p-2 rounded">
                  This score is an average of all areas (Basic Training, Demeanor, Socialization, Health, and Adaptability). 
                  Higher scores show stronger progress in these key development areas.
                </div>
              )}
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(latestAssessment.overall_score / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Journey Status</span>
                <span className="text-lg font-semibold text-green-600">Amazing!</span>
              </div>
              <p className="text-sm text-gray-600">
                You're doing a fantastic job! 🌟
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Ready to start tracking {puppy?.name}'s amazing journey? Take a quick check-in to see how you're both doing!
          </p>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          disabled={!canTakeAssessment()}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {canTakeAssessment() ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span>{latestAssessment ? "Quick Progress Check-in" : "Start Your Journey Together!"}</span>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5" />
              <span>Next check-in available in {getTimeUntilNextAssessment()}</span>
            </>
          )}
        </button>
      </div>

      {showModal && (
        <AssessmentModal
          puppy={puppy}
          onClose={() => setShowModal(false)}
          onComplete={handleAssessmentComplete}
        />
      )}
    </div>
  );
}