import wordsData from '@/lib/data/words.json';

const WORDS = wordsData.words;

/**
 * Get the date string for today (YYYY-MM-DD)
 * Puzzles reset at 3am, so we use the previous day if it's before 3am
 */
export function getPuzzleDate(): string {
  const now = new Date();
  const hour = now.getHours();
  
  // If before 3am, use yesterday's date
  if (hour < 3) {
    now.setDate(now.getDate() - 1);
  }
  
  return now.toISOString().split('T')[0];
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

