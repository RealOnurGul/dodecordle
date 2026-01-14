'use client';

import { useGame } from '@/lib/context/GameContext';
import WordleGrid from './WordleGrid';
import { isValidWord } from '@/lib/utils/wordValidation';

export default function GameBoard() {
  const { state } = useGame();
  
  // Check if current guess is invalid (only if it's 5 letters)
  const isCurrentGuessInvalid = state.currentGuess.length === 5 && !isValidWord(state.currentGuess);

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4" style={{ width: 'calc(50% + 0.5rem)', maxWidth: '100%' }}>
        {state.targetWords.map((targetWord, index) => (
          <div
            key={index}
            className={`
              p-2 sm:p-3
              rounded-lg
              border-2
              ${state.solvedWords[index] 
                ? 'border-green-500 bg-green-900/30' 
                : 'border-gray-600 bg-gray-800'
              }
            `}
          >
            <WordleGrid
              guesses={state.guesses}
              feedback={state.feedback.map(f => f[index])}
              currentGuess={state.currentGuess}
              isSolved={state.solvedWords[index]}
              gridIndex={index}
              isCurrentGuessInvalid={isCurrentGuessInvalid}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

