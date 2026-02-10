import React, { useState } from 'react';
import clsx from 'clsx';
import { AnalyzedKeyword } from '@/utils/matchAnalyzer';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface KeywordMatchProps {
  keyword: AnalyzedKeyword;
}

export const KeywordMatch: React.FC<KeywordMatchProps> = ({ keyword }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'strong': return 'bg-green-100 text-green-800 border-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'missing': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (level: string) => {
    switch (level) {
      case 'strong': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'partial': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'missing': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white mb-2">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          {getIcon(keyword.matchLevel)}
          <span className="font-medium text-gray-900">{keyword.name}</span>
          <span className={clsx('px-2 py-0.5 rounded-full text-xs font-medium border', getStatusColor(keyword.matchLevel))}>
            {keyword.matchLevel.toUpperCase()}
          </span>
        </div>
        {keyword.context && (
          <button className="text-gray-400 hover:text-gray-600">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      {isOpen && keyword.context && (
        <div className="bg-gray-50 p-3 border-t text-sm text-gray-600 italic">
          "{keyword.context}"
        </div>
      )}
    </div>
  );
};
