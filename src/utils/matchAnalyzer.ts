import { extractKeywordsFromText, TechCategory, techKeywords } from './keywordExtractor';

export interface AnalyzedKeyword {
  id: string;
  name: string;
  category: TechCategory;
  matchLevel: 'strong' | 'partial' | 'missing';
  context?: string;
}

export interface AnalysisResult {
  keywords: AnalyzedKeyword[];
  overallScore: number;
  categoryScores: Record<string, number>;
}

export function analyzeMatch(jdText: string, resumeText: string): AnalysisResult {
  const jdKeywords = extractKeywordsFromText(jdText);
  // We don't just extract from resume, we check specific presence of JD keywords in resume
  
  const analyzedKeywords: AnalyzedKeyword[] = [];
  const categoryCounts: Record<string, { total: number; matched: number }> = {};

  // Initialize category counts
  Object.keys(techKeywords).forEach(cat => {
    categoryCounts[cat] = { total: 0, matched: 0 };
  });

  const lowerResumeText = resumeText.toLowerCase();

  jdKeywords.forEach((jdKeyword) => {
    // Find the definition to get aliases
    const definition = techKeywords[jdKeyword.category].find(k => k.name === jdKeyword.name);
    const allTerms = definition ? [definition.name, ...definition.aliases] : [jdKeyword.name];

    // Check match level
    let matchLevel: 'strong' | 'partial' | 'missing' = 'missing';
    let context = '';

    // Strong match: Exact term found
    const strongMatch = allTerms.some(term => {
       const regex = new RegExp(`\\b${term}\\b`, 'i');
       return regex.test(resumeText);
    });

    // Partial match: Substring found (simplified logic, can be improved)
    // For now, if strong match fails, we check if it's present as part of another word or case insensitive without boundary
    // But let's stick to the PRD logic: 
    // "primaryMatch -> strong"
    // "partialMatch -> partial" (e.g. includes first word)
    
    if (strongMatch) {
      matchLevel = 'strong';
    } else {
       // Check for partial
       const partialMatch = allTerms.some(term => lowerResumeText.includes(term.toLowerCase()));
       if (partialMatch) {
         matchLevel = 'partial';
       }
    }

    // Extract context (simple snippet around the term in resume if found, or JD if missing)
    // If missing, we want to show where it appeared in JD to help user understand context
    // If found, show how it appears in resume
    const sourceText = matchLevel === 'missing' ? jdText : resumeText;
    const foundTerm = allTerms.find(term => sourceText.toLowerCase().includes(term.toLowerCase())) || jdKeyword.name;
    
    const index = sourceText.toLowerCase().indexOf(foundTerm.toLowerCase());
    if (index !== -1) {
      const start = Math.max(0, index - 30);
      const end = Math.min(sourceText.length, index + foundTerm.length + 30);
      context = '...' + sourceText.substring(start, end).replace(/\n/g, ' ') + '...';
    }

    analyzedKeywords.push({
      id: `${jdKeyword.category}-${jdKeyword.name}`,
      name: jdKeyword.name,
      category: jdKeyword.category,
      matchLevel,
      context
    });

    // Update counts
    if (categoryCounts[jdKeyword.category]) {
      categoryCounts[jdKeyword.category].total++;
      if (matchLevel === 'strong') {
        categoryCounts[jdKeyword.category].matched += 1;
      } else if (matchLevel === 'partial') {
        categoryCounts[jdKeyword.category].matched += 0.5;
      }
    }
  });

  // Calculate scores
  let totalWeightedScore = 0;
  let totalKeywords = 0;
  const categoryScores: Record<string, number> = {};

  Object.entries(categoryCounts).forEach(([category, { total, matched }]) => {
    if (total > 0) {
      const score = Math.round((matched / total) * 100);
      categoryScores[category] = score;
      totalWeightedScore += matched;
      totalKeywords += total;
    } else {
        categoryScores[category] = 100; // No requirements in this category
    }
  });

  const overallScore = totalKeywords > 0 ? Math.round((totalWeightedScore / totalKeywords) * 100) : 0;

  return {
    keywords: analyzedKeywords,
    overallScore,
    categoryScores
  };
}
