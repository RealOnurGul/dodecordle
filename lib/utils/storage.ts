import { GameState } from '@/lib/types/game';
import { getPuzzleDate } from './puzzle';

const DAILY_GAME_KEY = 'dodecordle-daily-game';
const DAILY_GAME_DATE_KEY = 'dodecordle-daily-game-date';

/**
 * Save daily game state to localStorage
 */
export function saveDailyGame(state: GameState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(DAILY_GAME_KEY, JSON.stringify(state));
    localStorage.setItem(DAILY_GAME_DATE_KEY, state.puzzleDate);
  } catch (error) {
    console.error('Error saving daily game:', error);
  }
}

/**
 * Load daily game state from localStorage if it exists and is for today's puzzle
 */
export function loadDailyGame(): GameState | null {
  if (typeof window === 'undefined') return null;

  try {
    const savedDate = localStorage.getItem(DAILY_GAME_DATE_KEY);
    const todayDate = getPuzzleDate();

    // Only load if the saved game is for today's puzzle
    if (savedDate === todayDate) {
      const saved = localStorage.getItem(DAILY_GAME_KEY);
      if (saved) {
        const state = JSON.parse(saved) as GameState;
        return state;
      }
    } else {
      // Clear old daily game if it's for a different date
      localStorage.removeItem(DAILY_GAME_KEY);
      localStorage.removeItem(DAILY_GAME_DATE_KEY);
    }
  } catch (error) {
    console.error('Error loading daily game:', error);
  }

  return null;
}
