export interface KeywordDefinition {
  name: string;
  aliases: string[];
}

export type TechCategory = 'language' | 'frontend' | 'backend' | 'cloud' | 'devops' | 'ml_ai';

export const techKeywords: Record<TechCategory, KeywordDefinition[]> = {
  language: [
    { name: 'JavaScript', aliases: ['JS', 'ES6', 'TypeScript', 'TS'] },
    { name: 'Python', aliases: ['Py'] },
    { name: 'Java', aliases: [] },
    { name: 'Go', aliases: ['Golang'] },
    { name: 'C++', aliases: ['Cpp'] },
    { name: 'Rust', aliases: [] },
    { name: 'Ruby', aliases: [] },
    { name: 'PHP', aliases: [] },
    { name: 'Swift', aliases: [] },
    { name: 'Kotlin', aliases: [] },
  ],
  frontend: [
    { name: 'React', aliases: ['React.js', 'ReactJS'] },
    { name: 'Vue', aliases: ['Vue.js', 'VueJS'] },
    { name: 'Angular', aliases: [] },
    { name: 'Svelte', aliases: [] },
    { name: 'HTML', aliases: ['HTML5'] },
    { name: 'CSS', aliases: ['CSS3', 'SCSS', 'SASS', 'Tailwind'] },
    { name: 'Redux', aliases: [] },
    { name: 'Next.js', aliases: ['NextJS'] },
  ],
  backend: [
    { name: 'Node.js', aliases: ['NodeJS', 'Node'] },
    { name: 'Express', aliases: ['Express.js'] },
    { name: 'Django', aliases: [] },
    { name: 'Flask', aliases: [] },
    { name: 'Spring Boot', aliases: ['Spring'] },
    { name: 'GraphQL', aliases: [] },
    { name: 'REST', aliases: ['RESTful'] },
    { name: 'PostgreSQL', aliases: ['Postgres'] },
    { name: 'MongoDB', aliases: ['Mongo'] },
    { name: 'Redis', aliases: [] },
  ],
  cloud: [
    { name: 'AWS', aliases: ['Amazon Web Services', 'EC2', 'S3', 'Lambda'] },
    { name: 'Azure', aliases: ['Microsoft Azure'] },
    { name: 'GCP', aliases: ['Google Cloud', 'Google Cloud Platform'] },
    { name: 'Firebase', aliases: [] },
    { name: 'Heroku', aliases: [] },
  ],
  devops: [
    { name: 'Docker', aliases: [] },
    { name: 'Kubernetes', aliases: ['K8s', 'K8'] },
    { name: 'CI/CD', aliases: ['CICD', 'Continuous Integration', 'Jenkins', 'GitHub Actions', 'GitLab CI'] },
    { name: 'Terraform', aliases: [] },
    { name: 'Linux', aliases: [] },
    { name: 'Git', aliases: [] },
  ],
  ml_ai: [
    { name: 'TensorFlow', aliases: ['TF'] },
    { name: 'PyTorch', aliases: [] },
    { name: 'Machine Learning', aliases: ['ML'] },
    { name: 'Deep Learning', aliases: ['DL'] },
    { name: 'NLP', aliases: ['Natural Language Processing'] },
    { name: 'OpenAI', aliases: ['GPT', 'LLM'] },
  ],
};

// Helper to escape regex special characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractKeywordsFromText(text: string): { name: string; category: TechCategory }[] {
  const results: { name: string; category: TechCategory }[] = [];
  const lowerText = text.toLowerCase();

  for (const [category, keywords] of Object.entries(techKeywords)) {
    for (const keyword of keywords) {
      const allTerms = [keyword.name, ...keyword.aliases];
      
      // Check if any term exists in the text
      // We use word boundary check for short terms to avoid false positives (e.g., "go" in "good")
      const found = allTerms.some(term => {
        const lowerTerm = term.toLowerCase();
        if (lowerTerm.length <= 3) {
           // For short terms, strictly check word boundaries
           const regex = new RegExp(`\\b${escapeRegExp(lowerTerm)}\\b`, 'i');
           return regex.test(text);
        }
        return lowerText.includes(lowerTerm);
      });

      if (found) {
        results.push({
          name: keyword.name,
          category: category as TechCategory,
        });
      }
    }
  }

  return results;
}
