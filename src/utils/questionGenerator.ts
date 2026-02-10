import { AnalysisResult } from './matchAnalyzer';

export interface InterviewQuestion {
  id: string;
  category: 'resume_based' | 'screening' | 'hiring_manager';
  question: string;
  tips: string[];
  relatedKeywords?: string[];
}

export function generateInterviewQuestions(matchResults: AnalysisResult): {
  resume_based: InterviewQuestion[];
  screening: InterviewQuestion[];
  hiring_manager: InterviewQuestion[];
} {
  const resume_based: InterviewQuestion[] = [];
  const screening: InterviewQuestion[] = [];
  const hiring_manager: InterviewQuestion[] = [];

  // 1. Resume Based Questions (Based on Strong/Partial Matches)
  const relevantKeywords = matchResults.keywords.filter(k => k.matchLevel !== 'missing');
  
  // Pick top 3-5 keywords to ask about
  const topKeywords = relevantKeywords.slice(0, 5);

  topKeywords.forEach((k, index) => {
    resume_based.push({
      id: `tech-${index}`,
      category: 'resume_based',
      question: `Can you describe a challenging project where you used ${k.name}?`,
      tips: [
        'Use the STAR method (Situation, Task, Action, Result).',
        `Highlight specific features of ${k.name} you utilized.`,
        'Focus on your individual contribution.'
      ],
      relatedKeywords: [k.name]
    });

    resume_based.push({
      id: `tech-depth-${index}`,
      category: 'resume_based',
      question: `What are the pros and cons of using ${k.name} compared to alternatives?`,
      tips: [
        'Demonstrate depth of knowledge.',
        'Mention specific trade-offs (performance, scalability, dev experience).',
      ],
      relatedKeywords: [k.name]
    });
  });

  // 2. Screening Questions (Generic)
  const screeningQs = [
    {
      q: 'Tell me about yourself.',
      tips: ['Keep it under 2 minutes.', 'Focus on professional journey and key achievements.', 'End with why you are interested in this role.']
    },
    {
      q: 'Why do you want to work for this company?',
      tips: ['Show you have researched the company.', 'Align your values with theirs.', 'Mention specific products or initiatives.']
    },
    {
      q: 'What are your salary expectations?',
      tips: ['Do market research beforehand.', 'Give a range rather than a specific number.', 'Mention you are flexible based on the total package.']
    }
  ];

  screeningQs.forEach((item, index) => {
    screening.push({
      id: `screen-${index}`,
      category: 'screening',
      question: item.q,
      tips: item.tips
    });
  });

  // 3. Hiring Manager Questions (Behavioral + Gaps + System Design)
  hiring_manager.push({
    id: 'hm-1',
    category: 'hiring_manager',
    question: 'Tell me about a time you had a conflict with a team member. How did you resolve it?',
    tips: ['Focus on resolution and professional communication.', 'Avoid blaming others.', 'Show empathy and emotional intelligence.']
  });

  hiring_manager.push({
    id: 'hm-2',
    category: 'hiring_manager',
    question: 'What is your biggest professional failure and what did you learn from it?',
    tips: ['Be honest but choose a failure that you truly learned from.', 'Focus on the "learning" part.', 'Show resilience.']
  });

  // If backend/cloud keywords are present, add system design
  const hasSystemDesign = matchResults.keywords.some(k => 
    (k.category === 'backend' || k.category === 'cloud') && k.matchLevel !== 'missing'
  );

  if (hasSystemDesign) {
    hiring_manager.push({
      id: 'hm-3',
      category: 'hiring_manager',
      question: 'How would you design a scalable API for this service?',
      tips: ['Clarify requirements first.', 'Discuss high-level architecture.', 'Dive into database schema and API endpoints.', 'Address scalability and reliability.']
    });
  }

  return {
    resume_based,
    screening,
    hiring_manager
  };
}
