'use client';

import { useGame } from '@/lib/context/GameContext';
import GameBoard from '@/components/GameBoard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { useEffect } from 'react';

export default function Home() {
  const { state, addLetter, removeLetter, submitGuess } = useGame();

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.status !== 'playing') return;

      if (e.key === 'Enter') {
        submitGuess();
      } else if (e.key === 'Backspace') {
        removeLetter();
      } else if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        addLetter(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.status, addLetter, removeLetter, submitGuess]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gray-50 pb-20 sm:pb-24">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dodecordle</h1>
          <p className="text-base sm:text-lg text-gray-600">Solve 12 Wordles at once!</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Puzzle #{state.puzzleNumber} • {state.guessesUsed}/{state.maxGuesses} guesses
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Solved: {state.solvedWords.filter(s => s).length}/12
          </p>
        </div>
        
        <GameBoard />
        
        <VirtualKeyboard />
        
        {state.status === 'won' && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-bold text-lg">🎉 You won! All 12 words solved!</p>
          </div>
        )}
        
        {state.status === 'lost' && (
          <div className="mt-4 text-center">
            <p className="text-red-600 font-bold text-lg">Game Over</p>
            <p className="text-sm text-gray-600 mt-1">
              Solved: {state.solvedWords.filter(s => s).length}/12 words
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

