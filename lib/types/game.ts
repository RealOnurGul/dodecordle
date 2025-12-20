import { LetterFeedback } from '@/lib/utils/wordValidation';

/**
 * Game state
 */
export interface GameState {
  // Target words for today's puzzle
  targetWords: string[];
  
  // Puzzle date and number
  puzzleDate: string;
  puzzleNumber: number;
  
  // Current guess being typed
  currentGuess: string;
  
  // History of guesses
  guesses: string[];
  
  // Feedback for each guess against each target word
  feedback: LetterFeedback[][][];
  
  // Which words have been solved
  solvedWords: boolean[];
  
  // Game status
  status: 'playing' | 'won' | 'lost';
  
  // Number of guesses used
  guessesUsed: number;
  
  // Maximum guesses allowed
  maxGuesses: number;
}

/**
 * Initial game state
 */
export function createInitialGameState(targetWords: string[]): GameState {
  return {
    targetWords,
    puzzleDate: new Date().toISOString().split('T')[0],
    puzzleNumber: 0, // Will be set by puzzle utils
    currentGuess: '',
    guesses: [],
    feedback: [],
    solvedWords: new Array(12).fill(false),
    status: 'playing',
    guessesUsed: 0,
    maxGuesses: 17,
  };
}

