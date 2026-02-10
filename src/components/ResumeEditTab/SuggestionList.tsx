import React from 'react';
import { OptimizationSuggestion } from '@/utils/suggestionGenerator';
import { AlertCircle, Zap, Star } from 'lucide-react';
import clsx from 'clsx';

interface SuggestionListProps {
  suggestions: OptimizationSuggestion[];
}

export const SuggestionList: React.FC<SuggestionListProps> = ({ suggestions }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'missing_keyword': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'quantification': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'leadership': return <Star className="w-5 h-5 text-purple-500" />;
      default: return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-blue-500';
      default: return 'border-l-4 border-gray-500';
    }
  };

  if (suggestions.length === 0) {
    return <div className="text-gray-500 italic">No suggestions available.</div>;
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div 
          key={suggestion.id} 
          className={clsx('bg-white p-4 rounded shadow-sm border', getPriorityColor(suggestion.priority))}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(suggestion.type)}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{suggestion.description}</h4>
              <p className="mt-1 text-sm text-gray-600">{suggestion.suggestion}</p>
              {suggestion.example && (
                <div className="mt-2 text-xs bg-gray-50 p-2 rounded border border-gray-100 text-gray-500">
                  <span className="font-semibold">Example:</span> {suggestion.example}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
