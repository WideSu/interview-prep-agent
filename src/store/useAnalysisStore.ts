import { create } from 'zustand';

interface TechKeyword {
  id: string;
  name: string;
  category: 'language' | 'frontend' | 'backend' | 'cloud' | 'devops' | 'ml_ai';
  matchLevel: 'strong' | 'partial' | 'missing';
  context?: string;
}

interface MatchResult {
  keywords: TechKeyword[];
  overallScore: number;
  categoryScores: Record<string, number>;
}

interface OptimizationSuggestion {
  id: string;
  type: 'missing_keyword' | 'quantification' | 'leadership' | 'clarity';
  priority: 'high' | 'medium' | 'low';
  description: string;
  suggestion: string;
  example?: string;
}

interface InterviewQuestion {
  id: string;
  category: 'resume_based' | 'screening' | 'hiring_manager';
  question: string;
  tips: string[];
  relatedKeywords?: string[];
}

interface ResumeVersion {
  id: string;
  content: string;
  versionNumber: number;
  createdAt: string;
}

interface AnalysisState {
  application: {
    id: string | null;
    companyName: string;
    jobTitle: string;
    jdLink: string;
    jdContent: string;
  };
  input: {
    resumeContent: string;
    format: 'markdown' | 'latex' | 'plain';
  };
  versions: ResumeVersion[];
  currentVersion: ResumeVersion | null;
  matchResults: MatchResult;
  suggestions: OptimizationSuggestion[];
  interviewQuestions: {
    resume_based: InterviewQuestion[];
    screening: InterviewQuestion[];
    hiring_manager: InterviewQuestion[];
  };
  
  // Actions
  setApplication: (data: Partial<AnalysisState['application']>) => void;
  setInput: (data: Partial<AnalysisState['input']>) => void;
  setMatchResults: (results: MatchResult) => void;
  setSuggestions: (suggestions: OptimizationSuggestion[]) => void;
  setInterviewQuestions: (questions: AnalysisState['interviewQuestions']) => void;
  addVersion: (version: ResumeVersion) => void;
  setCurrentVersion: (version: ResumeVersion) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  application: {
    id: null,
    companyName: '',
    jobTitle: '',
    jdLink: '',
    jdContent: '',
  },
  input: {
    resumeContent: '',
    format: 'markdown',
  },
  versions: [],
  currentVersion: null,
  matchResults: {
    keywords: [],
    overallScore: 0,
    categoryScores: {},
  },
  suggestions: [],
  interviewQuestions: {
    resume_based: [],
    screening: [],
    hiring_manager: [],
  },

  setApplication: (data) =>
    set((state) => ({ application: { ...state.application, ...data } })),
  setInput: (data) =>
    set((state) => ({ input: { ...state.input, ...data } })),
  setMatchResults: (matchResults) => set({ matchResults }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setInterviewQuestions: (interviewQuestions) => set({ interviewQuestions }),
  addVersion: (version) =>
    set((state) => ({ versions: [version, ...state.versions] })),
  setCurrentVersion: (currentVersion) => set({ currentVersion }),
}));
