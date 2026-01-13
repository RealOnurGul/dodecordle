'use client';

import { useGame } from '@/lib/context/GameContext';
import GameBoard from '@/components/GameBoard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { generateShareText, copyToClipboard } from '@/lib/utils/share';
import { isValidWord } from '@/lib/utils/wordValidation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function GamePage() {
  const { state, addLetter, removeLetter, submitGuess, clearError, initPractice, initDaily, isPractice: contextIsPractice } = useGame();
  const [shareMessage, setShareMessage] = useState('');
  const searchParams = useSearchParams();
  const urlIsPractice = searchParams.get('practice') === 'true';
  const [modeInitialized, setModeInitialized] = useState(false);

  // Initialize mode based on URL immediately on mount
  useEffect(() => {
    if (urlIsPractice) {
      initPractice();
    } else {
      initDaily();
    }
    setModeInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Handle mode changes when URL changes after initial load
  useEffect(() => {
    if (modeInitialized) {
      if (urlIsPractice && !contextIsPractice) {
        initPractice();
      } else if (!urlIsPractice && contextIsPractice) {
        initDaily();
      }
    }
  }, [urlIsPractice, contextIsPractice, modeInitialized, initPractice, initDaily]);

  const isPractice = contextIsPractice;

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if modifier keys are pressed (Cmd/Ctrl/Shift/Alt)
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      if (state.status !== 'playing') {
        return;
      }

      if (e.key === 'Enter') {
        // Don't submit if word is invalid
        const isInvalid = state.currentGuess.length === 5 && !isValidWord(state.currentGuess);
        if (!isInvalid) {
          submitGuess();
        }
      } else if (e.key === 'Backspace') {
        removeLetter();
      } else if (e.key.length === 1 && /[a-z]/i.test(e.key) && !e.shiftKey) {
        // Only process letters if Shift is not pressed
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

  // Format date for display (e.g., "Jan 15, 2024")
  // Parse YYYY-MM-DD format directly to avoid timezone issues
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Don't render until mode is initialized to prevent flash
  if (!modeInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 pb-44 sm:pb-48">
        <div className="w-full max-w-6xl">
          <div className="mb-4 sm:mb-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white text-xl font-semibold flex items-center gap-2"
            >
              ← Back
            </Link>
          </div>

          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
              {isPractice ? 'Practice Mode' : `DAILY GAME (${formatDate(state.puzzleDate)})`}
            </h1>
            <p className="text-base sm:text-lg text-gray-300">Solve 12 Wordles at once!</p>
            {!isPractice && (
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Puzzle #{state.puzzleNumber} • {state.guessesUsed}/{state.maxGuesses} guesses
              </p>
            )}
            {isPractice && (
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                {state.guessesUsed}/{state.maxGuesses} guesses
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Solved: {state.solvedWords.filter(s => s).length}/12
            </p>
          </div>

          {state.invalidWordError && (
            <div className="mb-4 text-center">
              <p className="text-red-400 font-semibold animate-pulse">
                Not a valid word!
              </p>
            </div>
          )}
          
          <GameBoard />
          
          {state.status === 'won' && (
            <div className="mt-4 text-center space-y-2">
              <p className="text-green-400 font-bold text-lg">🎉 You won! All 12 words solved!</p>
              <button
                onClick={handleShare}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Share Results
              </button>
              {shareMessage && (
                <p className="text-sm text-gray-400">{shareMessage}</p>
              )}
            </div>
          )}
          
          {state.status === 'lost' && (
            <div className="mt-4 text-center space-y-2">
              <p className="text-red-400 font-bold text-lg">Game Over</p>
              <p className="text-sm text-gray-400">
                Solved: {state.solvedWords.filter(s => s).length}/12 words
              </p>
              <button
                onClick={handleShare}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Share Results
              </button>
              {shareMessage && (
                <p className="text-sm text-gray-400">{shareMessage}</p>
              )}
            </div>
          )}
        </div>
      </main>

      <VirtualKeyboard />
    </>
  );
}

