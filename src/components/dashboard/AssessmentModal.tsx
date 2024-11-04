import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { generateGuidanceFromAssessment } from '../../lib/generateGuidance';
import { toast } from 'sonner';
import LoadingSpinner from '../LoadingSpinner';

interface AssessmentModalProps {
  puppy: {
    id: string;
    name: string;
  } | null;
  onClose: () => void;
  onComplete: (assessment: any) => void;
}

const QUESTIONS = [
  {
    id: 'name_response',
    category: 'Basic Training',
    question: 'How well does your puppy respond to their name?',
    helper: 'Consider how consistently they look at you when called',
    labels: {
      1: 'Never responds',
      5: 'Sometimes responds',
      10: 'Always responds'
    }
  },
  {
    id: 'basic_commands',
    category: 'Basic Training',
    question: 'How well does your puppy follow basic commands?',
    helper: 'Think about commands like "sit", "stay", and "come"',
    labels: {
      1: 'No commands',
      5: 'Some commands',
      10: 'Most commands'
    }
  },
  {
    id: 'house_training',
    category: 'Basic Training',
    question: 'How is your puppy progressing with house training?',
    helper: 'Consider accidents in the house and asking to go outside',
    labels: {
      1: 'Frequent accidents',
      5: 'Some progress',
      10: 'Fully trained'
    }
  },
  {
    id: 'anxiety_level',
    category: 'Demeanor',
    question: 'How does your puppy handle being alone?',
    helper: 'Think about their behavior when left alone',
    labels: {
      1: 'Very anxious',
      5: 'Some anxiety',
      10: 'Completely calm'
    }
  },
  {
    id: 'social_people',
    category: 'Socialization',
    question: 'How does your puppy interact with new people?',
    helper: 'Consider their behavior around strangers',
    labels: {
      1: 'Fearful/Aggressive',
      5: 'Cautious',
      10: 'Friendly'
    }
  },
  {
    id: 'social_dogs',
    category: 'Socialization',
    question: 'How does your puppy interact with other dogs?',
    helper: 'Think about their behavior at the park or on walks',
    labels: {
      1: 'Fearful/Aggressive',
      5: 'Cautious',
      10: 'Friendly'
    }
  },
  {
    id: 'eating_habits',
    category: 'Health',
    question: "How are your puppy's eating habits?",
    helper: 'Consider their appetite and eating routine',
    labels: {
      1: 'Poor appetite',
      5: 'Inconsistent',
      10: 'Healthy appetite'
    }
  },
  {
    id: 'energy_level',
    category: 'Health',
    question: "How would you rate your puppy's energy level?",
    helper: 'Think about their activity throughout the day',
    labels: {
      1: 'Lethargic',
      5: 'Moderate',
      10: 'Very energetic'
    }
  },
  {
    id: 'new_experiences',
    category: 'Adaptability',
    question: 'How does your puppy handle new experiences?',
    helper: 'Consider their reaction to new places, sounds, or situations',
    labels: {
      1: 'Very fearful',
      5: 'Cautious',
      10: 'Confident'
    }
  },
  {
    id: 'routine_changes',
    category: 'Adaptability',
    question: 'How well does your puppy adapt to changes in routine?',
    helper: 'Think about schedule changes or unexpected events',
    labels: {
      1: 'Very stressed',
      5: 'Some stress',
      10: 'Adapts well'
    }
  }
];

export default function AssessmentModal({ puppy, onClose, onComplete }: AssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [QUESTIONS[currentStep].id]: value
    }));
  };

  const calculateCategoryScore = (category: string) => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    const scores = categoryQuestions.map(q => answers[q.id] || 0);
    return Math.round(scores.reduce((a, b) => a + b, 0) / categoryQuestions.length);
  };

  const handleSubmit = async () => {
    if (!puppy) return;

    setSubmitting(true);
    try {
      const scores = {
        basic_training_score: calculateCategoryScore('Basic Training'),
        demeanor_score: calculateCategoryScore('Demeanor'),
        socialization_score: calculateCategoryScore('Socialization'),
        health_score: calculateCategoryScore('Health'),
        adaptability_score: calculateCategoryScore('Adaptability')
      };

      const overall_score = Math.round(
        Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
      );

      // Set next assessment date to 7 days from now
      const next_assessment_date = new Date();
      next_assessment_date.setDate(next_assessment_date.getDate() + 7);

      const { data: assessment, error: assessmentError } = await supabase
        .from('puppy_assessments')
        .insert([{
          puppy_id: puppy.id,
          ...scores,
          overall_score,
          next_assessment_date
        }])
        .select()
        .single();

      if (assessmentError) throw assessmentError;

      // Save individual responses
      const responses = Object.entries(answers).map(([question_id, score]) => ({
        assessment_id: assessment.id,
        question_id,
        category: QUESTIONS.find(q => q.id === question_id)?.category,
        score
      }));

      const { error: responsesError } = await supabase
        .from('assessment_responses')
        .insert(responses);

      if (responsesError) throw responsesError;

      // Generate new guidance based on assessment scores
      await generateGuidanceFromAssessment(puppy, scores, Math.ceil(
        (new Date().getTime() - new Date(puppy.created_at).getTime()) / (1000 * 60 * 60 * 24 * 7)
      ));

      toast.success('Assessment completed! Check out your personalized action items below.');
      onComplete(assessment);
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('Failed to save assessment');
    } finally {
      setSubmitting(false);
    }
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              <span>{currentQuestion.category}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h4 className="text-xl font-medium text-gray-900 mb-3">
              {currentQuestion.question}
            </h4>
            <p className="text-sm text-gray-600">
              {currentQuestion.helper}
            </p>

            <div className="mt-8">
              <input
                type="range"
                min="1"
                max="10"
                value={answers[currentQuestion.id] || 5}
                onChange={(e) => handleAnswer(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between mt-4 text-sm text-gray-600">
                {Object.entries(currentQuestion.labels).map(([value, label]) => (
                  <span
                    key={value}
                    className={`text-center ${
                      Number(value) === answers[currentQuestion.id]
                        ? 'text-purple-600 font-medium'
                        : ''
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="flex items-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </button>
            {currentStep === QUESTIONS.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || Object.keys(answers).length !== QUESTIONS.length}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="sm" className="text-white" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Complete Assessment</span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(prev => Math.min(QUESTIONS.length - 1, prev + 1))}
                disabled={!answers[currentQuestion.id]}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Question</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}