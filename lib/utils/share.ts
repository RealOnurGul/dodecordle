import { GameState } from '@/lib/types/game';
import { LetterFeedback } from '@/lib/utils/wordValidation';

export function generateShareText(state: GameState): string {
  const solvedCount = state.solvedWords.filter(s => s).length;
  const status = state.status === 'won' ? '✅' : state.status === 'lost' ? '❌' : '🔄';
  
  let text = `Dodecordle ${state.puzzleNumber} ${status}\n`;
  text += `Solved: ${solvedCount}/12 words\n`;
  text += `Guesses: ${state.guessesUsed}/${state.maxGuesses}\n\n`;

  // Create a grid representation
  const maxGuesses = Math.min(state.guesses.length, 6); // Show first 6 guesses
  
  for (let guessIndex = 0; guessIndex < maxGuesses; guessIndex++) {
    const guess = state.guesses[guessIndex];
    if (!guess) break;
    
    // For each grid, show the feedback
    const feedbackForGuess = state.feedback[guessIndex];
    if (!feedbackForGuess) continue;
    
    // Show feedback for all 12 grids in a compact way
    const feedbackLine = feedbackForGuess.map((feedbackForWord) => {
      return feedbackForWord.map((f) => {
        switch (f) {
          case 'correct':
            return '🟩';
          case 'present':
            return '🟨';
          case 'absent':
            return '⬜';
          default:
            return '⬜';
        }
      }).join('');
    }).join(' ');
    
    text += `${feedbackLine}\n`;
  }
  
  text += '\nPlay at: dodecordle.com';
  
  return text;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

