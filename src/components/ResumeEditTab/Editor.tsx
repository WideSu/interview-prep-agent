import React, { useEffect, useState } from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export const Editor: React.FC = () => {
  const { input, setInput, addVersion } = useAnalysisStore();
  const [localContent, setLocalContent] = useState(input.resumeContent);

  // Sync local content with store on mount
  useEffect(() => {
    setLocalContent(input.resumeContent);
  }, [input.resumeContent]);

  // Handle change and auto-save (debounced in a real app, here simple blur or manual)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalContent(newValue);
    setInput({ resumeContent: newValue });
  };

  const handleSave = () => {
    addVersion({
      id: Date.now().toString(),
      content: localContent,
      versionNumber: Date.now(), // Simple versioning
      createdAt: new Date().toISOString(),
    });
    alert('Version saved!');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2 flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Editor (Markdown)</label>
        <button
          onClick={handleSave}
          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
        >
          Save Version
        </button>
      </div>
      <textarea
        className="flex-grow w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-4 font-mono border resize-none"
        value={localContent}
        onChange={handleChange}
        placeholder="# My Resume..."
      />
    </div>
  );
};
