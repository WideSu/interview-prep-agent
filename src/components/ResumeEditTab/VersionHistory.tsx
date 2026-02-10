import React from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { Clock, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';

export const VersionHistory: React.FC = () => {
  const { versions, setInput } = useAnalysisStore();

  const handleRestore = (content: string) => {
    if (window.confirm('Are you sure you want to restore this version? Current changes will be lost if not saved.')) {
      setInput({ resumeContent: content });
    }
  };

  if (versions.length === 0) {
    return <div className="text-sm text-gray-500 italic p-4">No saved versions yet.</div>;
  }

  return (
    <div className="bg-white border-l border-gray-200 w-64 flex-shrink-0 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-900 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Version History
        </h3>
      </div>
      <div className="overflow-y-auto flex-grow p-2 space-y-2">
        {versions.map((version) => (
          <div key={version.id} className="p-3 bg-gray-50 rounded border border-gray-100 hover:border-blue-300 transition-colors group">
            <div className="flex justify-between items-start">
              <div className="text-xs text-gray-500">
                {format(new Date(version.createdAt), 'MMM d, HH:mm')}
              </div>
              <button
                onClick={() => handleRestore(version.content)}
                className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Restore this version"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
            <div className="mt-1 text-xs font-medium text-gray-700 truncate">
              Version {version.id.slice(-4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
