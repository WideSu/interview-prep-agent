import React, { useEffect, useState } from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { generateInterviewQuestions } from '@/utils/questionGenerator';
import { QuestionCategory } from '@/components/InterviewPrepTab/QuestionCategory';

export const InterviewPrepPage: React.FC = () => {
  const { matchResults } = useAnalysisStore();
  const [questions, setQuestions] = useState<{
    resume_based: any[];
    screening: any[];
    hiring_manager: any[];
  }>({ resume_based: [], screening: [], hiring_manager: [] });

  useEffect(() => {
    if (matchResults && matchResults.keywords.length > 0) {
      const generated = generateInterviewQuestions(matchResults);
      setQuestions(generated);
    }
  }, [matchResults]);

  if (matchResults.keywords.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">No interview questions generated</h2>
        <p className="text-gray-500 mt-2">Please go to the Input tab and submit your JD and Resume to generate personalized questions.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Interview Preparation</h1>
        <p className="mt-2 text-gray-600">
          Here are personalized interview questions based on your resume and the job description.
        </p>
      </div>

      <QuestionCategory 
        title="Resume-Based Questions" 
        description="Deep dive into your technical skills and projects found in your resume."
        questions={questions.resume_based} 
      />

      <QuestionCategory 
        title="Screening Call Questions" 
        description="Common questions asked by recruiters during the initial phone screen."
        questions={questions.screening} 
      />

      <QuestionCategory 
        title="Hiring Manager Questions" 
        description="Behavioral and scenario-based questions focusing on team fit and problem solving."
        questions={questions.hiring_manager} 
      />
    </div>
  );
};
