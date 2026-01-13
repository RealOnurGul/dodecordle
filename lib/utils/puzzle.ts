import wordsData from '@/lib/data/words.json';

const WORDS = wordsData.words;

/**
 * Get the date string for today (YYYY-MM-DD) in EST
 * Puzzles reset at 3am EST, so we use the previous day if it's before 3am EST
 */
export function getPuzzleDate(): string {
  const now = new Date();
  
  // Get EST hour to check if we should use yesterday
  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    hour12: false,
  });
  const hourParts = hourFormatter.formatToParts(now);
  const hour = parseInt(hourParts.find(p => p.type === 'hour')!.value, 10);
  
  // If before 3am EST, get yesterday's date
  let dateToFormat = now;
  if (hour < 3) {
    // Subtract 24 hours to get yesterday in EST
    dateToFormat = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }
  
  // Get EST date components
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  const dateParts = dateFormatter.formatToParts(dateToFormat);
  const year = dateParts.find(p => p.type === 'year')!.value;
  const month = dateParts.find(p => p.type === 'month')!.value;
  const day = dateParts.find(p => p.type === 'day')!.value;
  
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
