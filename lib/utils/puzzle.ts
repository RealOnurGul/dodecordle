import wordsData from '@/lib/data/words.json';

const WORDS = wordsData.words;

/**
 * Get the date string for today (YYYY-MM-DD) in EST
 * Puzzles reset at 3am EST, so we use the previous day if it's before 3am EST
 */
export function getPuzzleDate(): string {
  // Get current time in EST/EDT
  const now = new Date();
  const estDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const hour = estDate.getHours();
  
  // If before 3am EST, use yesterday's date
  if (hour < 3) {
    estDate.setDate(estDate.getDate() - 1);
  }
  
  // Format as YYYY-MM-DD
  const year = estDate.getFullYear();
  const month = String(estDate.getMonth() + 1).padStart(2, '0');
  const day = String(estDate.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Generate a seed from a date string for consistent random selection
 */
function seedFromDate(dateString: string): number {
  const date = new Date(dateString);
  return date.getTime();
}

/**
 * Simple seeded random number generator
 */
function seededRandom(seed: number): () => number {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

/**
 * Get 12 random words for today's puzzle
 * Same date = same words (deterministic)
 */
export function getDailyWords(): string[] {
  const dateString = getPuzzleDate();
  const seed = seedFromDate(dateString);
  const random = seededRandom(seed);
  
  const selectedWords: string[] = [];
  const usedIndices = new Set<number>();
  
  // Select 12 unique words
  while (selectedWords.length < 12) {
    const index = Math.floor(random() * WORDS.length);
    
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      selectedWords.push(WORDS[index]);
    }
  }
  
  return selectedWords;
}

/**
 * Get the puzzle number (days since a fixed start date)
 */
export function getPuzzleNumber(): number {
  const startDate = new Date('2024-01-01');
  const puzzleDate = new Date(getPuzzleDate());
  const diffTime = puzzleDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get 12 random words for practice mode (truly random, not seeded)
 */
export function getPracticeWords(): string[] {
  const selectedWords: string[] = [];
  const usedIndices = new Set<number>();
  
  // Select 12 unique words randomly
  while (selectedWords.length < 12) {
    const index = Math.floor(Math.random() * WORDS.length);
    
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      selectedWords.push(WORDS[index]);
    }
  }
  
  return selectedWords;
}
