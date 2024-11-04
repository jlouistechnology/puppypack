import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ExternalLink, Gift } from 'lucide-react';
import { toast } from 'sonner';

interface Recommendation {
  id: string;
  category: string;
  name: string;
  description: string;
  image_url: string;
  link_url: string;
}

interface RandomRecommendationProps {
  puppyName?: string;
}

export default function RandomRecommendation({ puppyName }: RandomRecommendationProps) {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomRecommendation = async () => {
      try {
        const { data, error } = await supabase
          .from('recommendations')
          .select('*')
          .eq('active', true);

        if (error) throw error;

        if (data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRecommendation(data[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching recommendation:', error);
        toast.error('Failed to load recommendation');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecommendation();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!recommendation) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {puppyName ? `Recommended for ${puppyName}` : 'Recommended for You'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Carefully selected products and services to support your puppy's development and well-being
          </p>
        </div>
        <Gift className="h-5 w-5 text-purple-600" />
      </div>
      
      <a
        href={recommendation.link_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={recommendation.image_url}
            alt={recommendation.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900 group-hover:text-purple-600">
            {recommendation.name}
          </h4>
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />
        </div>
        <p className="text-sm text-gray-600 mb-4">{recommendation.description}</p>
      </a>

      <Link
        to="/recommendations"
        className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
      >
        View All Recommendations
      </Link>
    </div>
  );
}