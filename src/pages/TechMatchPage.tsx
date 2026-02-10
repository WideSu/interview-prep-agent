import React from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { MatchScore } from '@/components/TechMatchTab/MatchScore';
import { KeywordMatch } from '@/components/TechMatchTab/KeywordMatch';
import { TechCategory } from '@/utils/keywordExtractor';

export const TechMatchPage: React.FC = () => {
  const { matchResults } = useAnalysisStore();

  const categories: { key: TechCategory; label: string }[] = [
    { key: 'language', label: 'Languages' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'cloud', label: 'Cloud' },
    { key: 'devops', label: 'DevOps' },
    { key: 'ml_ai', label: 'ML / AI' },
  ];

  if (matchResults.keywords.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">No analysis results yet</h2>
        <p className="text-gray-500 mt-2">Please go to the Input tab and submit your JD and Resume.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <MatchScore score={matchResults.overallScore} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const keywords = matchResults.keywords.filter(k => k.category === category.key);
          const score = matchResults.categoryScores[category.key] || 0;

          if (keywords.length === 0) return null;

          return (
            <div key={category.key} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-lg font-medium text-gray-900">{category.label}</h3>
                <span className="text-sm font-medium text-gray-500">{score}% Match</span>
              </div>
              <div className="space-y-2">
                {keywords.map((keyword) => (
                  <KeywordMatch key={keyword.id} keyword={keyword} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
