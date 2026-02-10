import React from 'react';
import { InterviewQuestion } from '@/utils/questionGenerator';
import { QuestionCard } from './QuestionCard';

interface QuestionCategoryProps {
  title: string;
  description: string;
  questions: InterviewQuestion[];
}

export const QuestionCategory: React.FC<QuestionCategoryProps> = ({ title, description, questions }) => {
  if (questions.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
};
