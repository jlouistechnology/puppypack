import React from 'react';
import RandomRecommendation from '../RandomRecommendation';

interface RecommendationsCardProps {
  puppyName?: string;
}

export default function RecommendationsCard({ puppyName }: RecommendationsCardProps) {
  return <RandomRecommendation puppyName={puppyName} />;
}