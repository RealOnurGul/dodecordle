'use client';

import { useGame } from '@/lib/context/GameContext';
import { LetterFeedback } from '@/lib/utils/wordValidation';

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

export default function VirtualKeyboard() {
  const { state, addLetter, removeLetter, submitGuess } = useGame();

  // Calculate keyboard feedback - show the best feedback for each letter across all guesses
  const getKeyFeedback = (letter: string): LetterFeedback | undefined => {
    let bestFeedback: LetterFeedback | undefined;
    const letterLower = letter.toLowerCase();
    
    state.guesses.forEach((guess, guessIndex) => {
      const feedbackForGuess = state.feedback[guessIndex];
      if (!feedbackForGuess) return;
      
      // Check all 12 grids for this letter in this guess
      feedbackForGuess.forEach((feedbackForWord) => {
        guess.split('').forEach((guessLetter, letterIndex) => {
          if (guessLetter === letterLower) {
            const cellFeedback = feedbackForWord[letterIndex];
            if (cellFeedback) {
              // Prioritize: correct > present > absent
              if (!bestFeedback) {
                bestFeedback = cellFeedback;
              } else if (cellFeedback === 'correct') {
                bestFeedback = 'correct';
              } else if (cellFeedback === 'present' && bestFeedback === 'absent') {
                bestFeedback = 'present';
              }
            }
          }
        });
      });
    });
    
    return bestFeedback;
  };

  const handleKeyClick = (key: string) => {
    if (key === 'Enter') {
      submitGuess();
    } else if (key === 'Backspace') {
      removeLetter();
    } else if (key.length === 1) {
      addLetter(key);
    }
  };

  const getKeyColor = (key: string) => {
    if (key === 'Enter' || key === 'Backspace') {
      return 'bg-gray-400 hover:bg-gray-500 text-white';
    }

    const feedback = getKeyFeedback(key);
    switch (feedback) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 sm:mt-6">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-1 sm:gap-1.5"
          >
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className={`
                  ${getKeyColor(key)}
                  px-2 sm:px-3 py-2 sm:py-3
                  text-sm sm:text-base font-semibold
                  rounded
                  transition-colors
                  active:scale-95
                  min-w-[2.5rem] sm:min-w-[3rem]
                  ${key === 'Enter' || key === 'Backspace' ? 'text-xs sm:text-sm' : ''}
                `}
                disabled={state.status !== 'playing'}
              >
                {key === 'Backspace' ? '⌫' : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

