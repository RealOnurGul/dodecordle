export interface GameStatistics {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // Index = number of guesses (1-17), value = count
  lastPlayedDate: string | null;
}

const STATS_KEY = 'dodecordle-stats';

export function getStatistics(): GameStatistics {
  if (typeof window === 'undefined') {
    return getDefaultStatistics();
  }

  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      const stats = JSON.parse(stored);
      // Ensure all fields exist
      return {
        gamesPlayed: stats.gamesPlayed || 0,
        gamesWon: stats.gamesWon || 0,
        currentStreak: stats.currentStreak || 0,
        maxStreak: stats.maxStreak || 0,
        guessDistribution: stats.guessDistribution || new Array(18).fill(0),
        lastPlayedDate: stats.lastPlayedDate || null,
      };
    }
  } catch (error) {
    console.error('Error loading statistics:', error);
  }

  return getDefaultStatistics();
}

function getDefaultStatistics(): GameStatistics {
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: new Array(18).fill(0), // 0-17 guesses
    lastPlayedDate: null,
  };
}

export function saveStatistics(stats: GameStatistics): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving statistics:', error);
  }
}

export function updateStatisticsForGame(
  won: boolean,
  guessesUsed: number,
  puzzleDate: string
): GameStatistics {
  const stats = getStatistics();
  const today = puzzleDate;

  // Check if we already played today
  const alreadyPlayedToday = stats.lastPlayedDate === today;

  if (alreadyPlayedToday) {
    // Don't update stats if already played today
    return stats;
  }

  // Update games played
  stats.gamesPlayed += 1;
  stats.lastPlayedDate = today;

  if (won) {
    stats.gamesWon += 1;
    
    // Update streak
    const yesterday = getYesterdayDate(today);
    if (stats.lastPlayedDate === yesterday || stats.currentStreak === 0) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }
    
    // Update max streak
    if (stats.currentStreak > stats.maxStreak) {
      stats.maxStreak = stats.currentStreak;
    }

    // Update guess distribution (clamp to valid range)
    const guessIndex = Math.min(Math.max(guessesUsed, 1), 17);
    stats.guessDistribution[guessIndex] = (stats.guessDistribution[guessIndex] || 0) + 1;
  } else {
    // Lost - reset streak
    stats.currentStreak = 0;
  }

  saveStatistics(stats);
  return stats;
}

function getYesterdayDate(today: string): string {
  const date = new Date(today);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

export function resetStatistics(): void {
  if (typeof window === 'undefined') return;
  
  const defaultStats = getDefaultStatistics();
  saveStatistics(defaultStats);
}

