import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JDInput } from '@/components/InputTab/JDInput';
import { ResumeInput } from '@/components/InputTab/ResumeInput';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { analyzeMatch } from '@/utils/matchAnalyzer';
import { applicationService } from '@/services/applicationService';
import { ArrowRight, Save, Loader2 } from 'lucide-react';

export const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const { application, input, setMatchResults, setApplication } = useAnalysisStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleAnalyze = async () => {
    if (!application.jdContent.trim() || !input.resumeContent.trim()) {
      alert('Please enter both Job Description and Resume content.');
      return;
    }

    try {
        setIsSaving(true);
        // Save to backend first
        const savedApp = await applicationService.save({
            id: application.id || undefined,
            company_name: application.companyName,
            job_title: application.jobTitle,
            jd_link: application.jdLink,
            jd_content: application.jdContent,
            resume_content: input.resumeContent
        });

        // Update local store with the ID if it was a new creation
        if (!application.id && savedApp.id) {
            setApplication({ id: savedApp.id });
        }

        // Trigger analysis logic
        const results = analyzeMatch(application.jdContent, input.resumeContent);
        setMatchResults(results);
        
        // Navigate to the match page
        navigate('/match');
    } catch (error) {
        console.error('Failed to save application:', error);
        alert('Failed to save application data. Please try again.');
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div className="mb-8 md:mb-0">
          <div className="bg-white shadow rounded-lg p-6 h-full">
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Job Details</h2>
            <JDInput />
          </div>
        </div>
        <div>
          <div className="bg-white shadow rounded-lg p-6 h-full flex flex-col">
            <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Your Resume</h2>
            <div className="flex-grow">
              <ResumeInput />
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleAnalyze}
                disabled={isSaving}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Saving & Analyzing...
                    </>
                ) : (
                    <>
                        Save & Analyze Match
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
