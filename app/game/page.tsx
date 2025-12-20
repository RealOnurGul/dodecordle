'use client';

import { useGame } from '@/lib/context/GameContext';
import GameBoard from '@/components/GameBoard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import Statistics from '@/components/Statistics';
import { generateShareText, copyToClipboard } from '@/lib/utils/share';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GamePage() {
  const { state, addLetter, removeLetter, submitGuess, clearError } = useGame();
  const [showStats, setShowStats] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.status !== 'playing') {
        if (e.key === 'Enter' && (state.status === 'won' || state.status === 'lost')) {
          setShowStats(true);
        }
        return;
      }

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

  // Auto-clear error after 2 seconds
  useEffect(() => {
    if (state.invalidWordError) {
      const timer = setTimeout(() => {
        clearError();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.invalidWordError, clearError]);

  // Show stats when game ends
  useEffect(() => {
    if (state.status === 'won' || state.status === 'lost') {
      const timer = setTimeout(() => {
        setShowStats(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.status]);

  const handleShare = async () => {
    const shareText = generateShareText(state);
    const success = await copyToClipboard(shareText);
    if (success) {
      setShareMessage('Copied to clipboard!');
      setTimeout(() => setShareMessage(''), 2000);
    } else {
      setShareMessage('Failed to copy');
      setTimeout(() => setShareMessage(''), 2000);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 bg-gray-50 pb-44 sm:pb-48">
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 text-xl font-semibold flex items-center gap-2"
            >
              ← Back
            </Link>
            <button
              onClick={() => setShowStats(true)}
              className="text-gray-500 hover:text-gray-700 text-xl"
              aria-label="Show statistics"
            >
              📊
            </button>
          </div>

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

          {state.invalidWordError && (
            <div className="mb-4 text-center">
              <p className="text-red-500 font-semibold animate-pulse">
                Not a valid word!
              </p>
            </div>
          )}
          
          <GameBoard />
          
          {state.status === 'won' && (
            <div className="mt-4 text-center space-y-2">
              <p className="text-green-600 font-bold text-lg">🎉 You won! All 12 words solved!</p>
              <button
                onClick={handleShare}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Share Results
              </button>
              {shareMessage && (
                <p className="text-sm text-gray-600">{shareMessage}</p>
              )}
            </div>
          )}
          
          {state.status === 'lost' && (
            <div className="mt-4 text-center space-y-2">
              <p className="text-red-600 font-bold text-lg">Game Over</p>
              <p className="text-sm text-gray-600">
                Solved: {state.solvedWords.filter(s => s).length}/12 words
              </p>
              <button
                onClick={handleShare}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Share Results
              </button>
              {shareMessage && (
                <p className="text-sm text-gray-600">{shareMessage}</p>
              )}
            </div>
          )}
        </div>
      </main>

      <VirtualKeyboard />

      {showStats && (
        <Statistics onClose={() => setShowStats(false)} />
      )}
    </>
  );
}

