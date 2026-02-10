import React from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export const JDInput: React.FC = () => {
  const { application, setApplication } = useAnalysisStore();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={application.companyName}
            onChange={(e) => setApplication({ companyName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="e.g. Google"
          />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={application.jobTitle}
            onChange={(e) => setApplication({ jobTitle: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>
      </div>
      <div>
        <label htmlFor="jdLink" className="block text-sm font-medium text-gray-700">
          JD Link
        </label>
        <input
          type="url"
          id="jdLink"
          value={application.jdLink}
          onChange={(e) => setApplication({ jdLink: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          placeholder="https://..."
        />
      </div>
      <div>
        <label htmlFor="jdContent" className="block text-sm font-medium text-gray-700">
          Job Description
        </label>
        <div className="mt-1">
          <textarea
            id="jdContent"
            rows={10}
            value={application.jdContent}
            onChange={(e) => setApplication({ jdContent: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="Paste the full job description here..."
          />
        </div>
      </div>
    </div>
  );
};
