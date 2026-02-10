import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export const Preview: React.FC = () => {
  const { input } = useAnalysisStore();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Live Preview</label>
      </div>
      <div className="flex-grow w-full rounded-md border border-gray-200 bg-white p-6 overflow-y-auto prose prose-sm max-w-none">
        <ReactMarkdown>{input.resumeContent || '*No content to preview*'}</ReactMarkdown>
      </div>
    </div>
  );
};
