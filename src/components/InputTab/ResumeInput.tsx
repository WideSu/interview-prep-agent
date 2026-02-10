import React from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export const ResumeInput: React.FC = () => {
  const { input, setInput } = useAnalysisStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label htmlFor="resumeContent" className="block text-sm font-medium text-gray-700">
          Resume Content
        </label>
        <div className="flex items-center space-x-2">
          <label htmlFor="format" className="text-sm text-gray-500">Format:</label>
          <select
            id="format"
            value={input.format}
            onChange={(e) => setInput({ format: e.target.value as any })}
            className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1 border"
          >
            <option value="markdown">Markdown</option>
            <option value="latex">LaTeX</option>
            <option value="plain">Plain Text</option>
          </select>
        </div>
      </div>
      <div className="mt-1">
        <textarea
          id="resumeContent"
          rows={15} // Slightly taller to match the JD input height visually if needed
          value={input.resumeContent}
          onChange={(e) => setInput({ resumeContent: e.target.value })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border font-mono"
          placeholder="Paste your resume content here..."
        />
      </div>
    </div>
  );
};
