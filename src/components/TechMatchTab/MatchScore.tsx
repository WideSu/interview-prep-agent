import React from 'react';
import clsx from 'clsx';

interface MatchScoreProps {
  score: number;
}

export const MatchScore: React.FC<MatchScoreProps> = ({ score }) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-600 border-green-600';
    if (score >= 50) return 'text-yellow-600 border-yellow-600';
    return 'text-red-600 border-red-600';
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-500 mb-2">Overall Match Score</h3>
      <div
        className={clsx(
          'w-32 h-32 rounded-full border-8 flex items-center justify-center text-4xl font-bold',
          getColor(score)
        )}
      >
        {score}%
      </div>
    </div>
  );
};
