export const constitutionQA: { question: string; answer: string; category: string }[] = [];

export function findAnswer(query: string): string | null {
  const lowerQuery = query.toLowerCase();
  
  for (const qa of constitutionQA) {
    const questionWords = qa.question.toLowerCase().split(' ').filter(w => w.length > 3);
    const matchCount = questionWords.filter(word => lowerQuery.includes(word)).length;
    if (matchCount >= Math.min(3, questionWords.length * 0.5)) {
      return qa.answer;
    }
  }
  
  const keywords = [
    { words: ['preamble'], category: 'Preamble' },
    { words: ['sovereign', 'sovereignty'], category: 'Preamble' },
    { words: ['secular', 'secularism'], category: 'Preamble' },
    { words: ['democratic', 'democracy'], category: 'Preamble' },
    { words: ['republic'], category: 'Preamble' },
    { words: ['basic structure'], category: 'Basic Structure' },
    { words: ['fundamental rights', 'article 14', 'article 15', 'article 16', 'article 19', 'article 21', 'article 32'], category: 'Fundamental Rights' },
    { words: ['dpsp', 'directive principles'], category: 'DPSP' },
    { words: ['fundamental duties'], category: 'Fundamental Duties' },
    { words: ['president', 'executive'], category: 'Union Executive' },
    { words: ['parliament', 'lok sabha', 'rajya sabha'], category: 'Parliament' },
    { words: ['supreme court', 'judiciary', 'judicial'], category: 'Judiciary' },
    { words: ['emergency'], category: 'Emergency' },
    { words: ['amendment'], category: 'Amendment' },
    { words: ['ambedkar', 'father of constitution'], category: 'Miscellaneous' }
  ];
  
  for (const keyword of keywords) {
    if (keyword.words.some(word => lowerQuery.includes(word))) {
      const categoryQAs = constitutionQA.filter(qa => qa.category === keyword.category);
      if (categoryQAs.length > 0) {
        return categoryQAs[0].answer;
      }
    }
  }
  
  return null;
}
