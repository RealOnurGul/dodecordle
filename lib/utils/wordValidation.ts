import wordsData from '@/lib/data/words.json';

const VALID_WORDS = new Set(wordsData.words.map(w => w.toLowerCase()));

/**
 * Check if a word is valid (exists in the word list)
 */
export function isValidWord(word: string): boolean {
  return VALID_WORDS.has(word.toLowerCase());
}

/**
 * Letter feedback types
 */
export type LetterFeedback = 'correct' | 'present' | 'absent';

/**
 * Calculate feedback for a guess against a target word
 * Returns an array of feedback for each letter position
 */
export function calculateFeedback(guess: string, target: string): LetterFeedback[] {
  const feedback: LetterFeedback[] = new Array(5).fill('absent');
  const guessLower = guess.toLowerCase();
  const targetLower = target.toLowerCase();
  
  // First pass: mark correct positions
  const targetLetters = targetLower.split('');
  const guessLetters = guessLower.split('');
  const usedTargetIndices = new Set<number>();
  const usedGuessIndices = new Set<number>();
  
  // Mark correct positions
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      feedback[i] = 'correct';
      usedTargetIndices.add(i);
      usedGuessIndices.add(i);
    }
  }
  
  // Second pass: mark present letters (not in correct position)
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === 'correct') continue;
    
    // Find if this letter exists in target at unused positions
    for (let j = 0; j < 5; j++) {
      if (usedTargetIndices.has(j)) continue;
      if (guessLetters[i] === targetLetters[j]) {
        feedback[i] = 'present';
        usedTargetIndices.add(j);
        break;
      }
    }
  }
  
  return feedback;
}

/**
 * Calculate feedback for a guess against all target words
 * Returns an array of feedback arrays, one for each target word
 */
export function calculateFeedbackForAll(
  guess: string,
  targets: string[]
): LetterFeedback[][] {
  return targets.map(target => calculateFeedback(guess, target));
}

