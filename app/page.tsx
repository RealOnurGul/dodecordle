'use client';

import { useGame } from '@/lib/context/GameContext';

export default function Home() {
  const { state } = useGame();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Dodecordle</h1>
          <p className="text-lg text-gray-600">Solve 12 Wordles at once!</p>
          <p className="text-sm text-gray-500 mt-2">
            Puzzle #{state.puzzleNumber} • {state.guessesUsed}/{state.maxGuesses} guesses
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-center text-gray-500">
            Game initialized! Ready for Phase 2 implementation.
          </p>
          <p className="text-center text-sm text-gray-400 mt-2">
            Status: {state.status} | Solved: {state.solvedWords.filter(s => s).length}/12
          </p>
        </div>
      </div>
    </main>
  );
}

