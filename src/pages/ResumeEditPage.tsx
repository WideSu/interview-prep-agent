import React, { useEffect } from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { generateSuggestions } from '@/utils/suggestionGenerator';
import { Editor } from '@/components/ResumeEditTab/Editor';
import { Preview } from '@/components/ResumeEditTab/Preview';
import { SuggestionList } from '@/components/ResumeEditTab/SuggestionList';
import { VersionHistory } from '@/components/ResumeEditTab/VersionHistory';

export const ResumeEditPage: React.FC = () => {
  const { matchResults, suggestions, setSuggestions } = useAnalysisStore();

  useEffect(() => {
    if (matchResults) {
      const newSuggestions = generateSuggestions(matchResults);
      setSuggestions(newSuggestions);
    }
  }, [matchResults, setSuggestions]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-7xl mx-auto w-full">
      <div className="flex-grow flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Suggestions & Editor */}
          <div className="w-full md:w-1/2 flex flex-col border-r border-gray-200 overflow-hidden">
            {/* Suggestions Panel (Collapsible or scrollable top section) */}
            <div className="h-1/3 overflow-y-auto p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 mb-3 sticky top-0 bg-gray-50 py-1">Optimization Suggestions</h3>
              <SuggestionList suggestions={suggestions} />
            </div>
            
            {/* Editor Area */}
            <div className="h-2/3 p-4 bg-white overflow-hidden">
              <Editor />
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="hidden md:block w-1/2 p-4 bg-gray-100 overflow-hidden">
             <Preview />
          </div>
        </div>

        {/* Far Right: Version History */}
        <VersionHistory />
      </div>
    </div>
  );
};
