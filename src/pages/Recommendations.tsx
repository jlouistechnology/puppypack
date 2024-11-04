import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Recommendation {
  id: string;
  category: string;
  name: string;
  description: string;
  image_url: string;
  link_url: string;
}

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<Record<string, Recommendation[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data, error } = await supabase
          .from('recommendations')
          .select('*')
          .eq('active', true)
          .order('priority', { ascending: true });

        if (error) throw error;

        // Group recommendations by category
        const grouped = (data || []).reduce((acc: Record<string, Recommendation[]>, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});

        setRecommendations(grouped);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast.error('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Recommended Products & Services</h1>
      
      <div className="space-y-12">
        {Object.entries(recommendations).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-600">
                        {item.name}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}