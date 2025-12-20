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
      return 'bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white shadow-sm';
    }

    const feedback = getKeyFeedback(key);
    switch (feedback) {
      case 'correct':
        return 'bg-green-500 hover:bg-green-600 text-white shadow-sm';
      case 'present':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm';
      case 'absent':
        return 'bg-gray-400 hover:bg-gray-500 text-white shadow-sm';
      default:
        return 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 shadow-sm';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-300 z-10 py-2 sm:py-3">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Align keyboard with middle two grids - matches GameBoard grid layout */}
        <div className="w-full">
          {/* Match the grid container from GameBoard: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {/* Empty spacer for first column on larger screens */}
            <div className="hidden md:block"></div>
            
            {/* Keyboard spans middle 2 columns */}
            <div className="col-span-2">
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
                          px-2 sm:px-3 py-2 sm:py-2.5
                          text-sm sm:text-base font-semibold
                          rounded-md
                          transition-all duration-150
                          active:scale-95
                          min-w-[2.25rem] sm:min-w-[2.75rem]
                          ${key === 'Enter' || key === 'Backspace' ? 'text-xs sm:text-sm px-2 sm:px-2.5' : ''}
                          disabled:opacity-60 disabled:cursor-not-allowed
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
            
            {/* Empty spacer for last column on larger screens */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

