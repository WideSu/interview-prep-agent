import React, { useState } from 'react';
import { InterviewQuestion } from '@/utils/questionGenerator';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import clsx from 'clsx';

interface QuestionCardProps {
  question: InterviewQuestion;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(question.question);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-3">
      <div 
        className="p-4 flex justify-between items-start cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-grow pr-4">
          <h4 className="text-base font-medium text-gray-900">{question.question}</h4>
          {question.relatedKeywords && question.relatedKeywords.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {question.relatedKeywords.map(k => (
                <span key={k} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleCopy}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200"
            title="Copy question"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button className="text-gray-400">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
          <div className="mt-3">
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Preparation Tips</h5>
            <ul className="list-disc pl-5 space-y-1">
              {question.tips.map((tip, idx) => (
                <li key={idx} className="text-sm text-gray-600">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
