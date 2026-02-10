import { AnalysisResult } from './matchAnalyzer';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export interface OptimizationSuggestion {
  id: string;
  type: 'missing_keyword' | 'quantification' | 'leadership' | 'clarity';
  priority: 'high' | 'medium' | 'low';
  description: string;
  suggestion: string;
  example?: string;
}

export function generateSuggestions(matchResults: AnalysisResult): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];

  // 1. Missing Keywords (High Priority)
  const missingKeywords = matchResults.keywords.filter(k => k.matchLevel === 'missing');
  if (missingKeywords.length > 0) {
    missingKeywords.forEach(k => {
      suggestions.push({
        id: `missing-${k.id}`,
        type: 'missing_keyword',
        priority: 'high',
        description: `Missing core skill: ${k.name}`,
        suggestion: `Your resume is missing "${k.name}", which is mentioned in the JD. Try to incorporate it into your "Skills" section or project descriptions.`,
        example: `Project X: utilized ${k.name} to implement...`
      });
    });
  }

  // 2. Partial Matches (Medium Priority)
  const partialKeywords = matchResults.keywords.filter(k => k.matchLevel === 'partial');
  partialKeywords.forEach(k => {
    suggestions.push({
      id: `partial-${k.id}`,
      type: 'missing_keyword',
      priority: 'medium',
      description: `Weak match for: ${k.name}`,
      suggestion: `You have a partial match for "${k.name}". Ensure you use the standard terminology (e.g., "${k.name}" instead of abbreviations) or mention it more explicitly.`,
    });
  });

  // 3. Quantification (Heuristic) - Low Priority check
  // This would normally require parsing the resume text, but we can do a simple regex check for numbers
  // For now, let's just add a generic advice if no numbers are found in a simplified way, or just always add it as a tip
  suggestions.push({
    id: 'quantification-tip',
    type: 'quantification',
    priority: 'medium',
    description: 'Quantify your impact',
    suggestion: 'Ensure your bullet points include numbers (e.g., "Improved performance by 20%", "Managed team of 5").',
    example: 'Reduced build time by 40% through Webpack optimizations.'
  });

  return suggestions;
}
