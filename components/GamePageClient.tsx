'use client';

import { useGame } from '@/lib/context/GameContext';
import GameBoard from '@/components/GameBoard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import EndScreen from '@/components/EndScreen';
import { isValidWord } from '@/lib/utils/wordValidation';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function GamePageClient() {
  const { state, addLetter, removeLetter, submitGuess, clearError, initPractice, initDaily, isPractice: contextIsPractice } = useGame();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlIsPractice = searchParams.get('practice') === 'true';
  const [modeInitialized, setModeInitialized] = useState(false);
  const [endScreenDismissed, setEndScreenDismissed] = useState(false);

  useEffect(() => {
    if (urlIsPractice) {
      initPractice();
    } else {
      initDaily();
    }
    setModeInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state && (state.status === 'won' || state.status === 'lost')) {
      setEndScreenDismissed(false);
    }
  }, [state?.status]);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (state.status !== 'playing') return;
      if (e.key === 'Enter') {
        const isInvalid = state.currentGuess.length === 5 && !isValidWord(state.currentGuess);
        if (!isInvalid) submitGuess();
      } else if (e.key === 'Backspace') {
        removeLetter();
      } else if (e.key.length === 1 && /[a-z]/i.test(e.key) && !e.shiftKey) {
        addLetter(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.status, addLetter, removeLetter, submitGuess]);

  useEffect(() => {
    if (state.invalidWordError) {
      const timer = setTimeout(() => clearError(), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.invalidWordError, clearError]);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!modeInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-4 left-4 z-[100] pointer-events-auto">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push('/');
          }}
          className="text-gray-300 hover:text-white text-xl font-semibold flex items-center gap-2 cursor-pointer bg-gray-900/80 px-3 py-2 rounded-lg backdrop-blur-sm"
        >
          ← Back
        </a>
      </div>

      <main className="flex min-h-screen flex-col items-center p-4 bg-gray-900 pb-44 sm:pb-48">
        <div className="w-full max-w-6xl">
          <div className="mb-4 sm:mb-6 h-10 sm:h-12" />
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
              <p className="text-red-400 font-semibold animate-pulse">Not a valid word!</p>
            </div>
          )}

          <GameBoard />

          {(state.status === 'won' || state.status === 'lost') && !endScreenDismissed && (
            <EndScreen state={state} isPractice={isPractice} onClose={() => setEndScreenDismissed(true)} />
          )}

          <section className="mt-12 mb-8 text-gray-300 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">How to Play Dodecordle</h2>
                <p className="mb-2">
                  Dodecordle is an exciting word puzzle game where you solve 12 Wordle puzzles simultaneously! Each guess you make applies to all 12 target words at once.
                </p>
                <p className="mb-2">
                  After each guess, you'll see color feedback for each letter across all 12 grids. Green means the letter is in the correct position, yellow means the letter is in the word but in the wrong position, and gray means the letter is not in the word at all.
                </p>
                <p>
                  The challenge is to strategically use your guesses to narrow down all 12 words at the same time. You have a limited number of guesses, so think carefully about each word you choose!
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">What is the difference between Daily Game and Practice Mode?</h4>
                    <p className="text-sm text-gray-400">
                      Daily Game features a new puzzle each day that everyone plays. Practice Mode lets you play unlimited games with randomly generated puzzles.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">How many guesses do I get?</h4>
                    <p className="text-sm text-gray-400">
                      You have 14 guesses to solve all 12 words in Daily Game mode. Practice Mode gives you the same challenge with unlimited attempts.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Can I use the same guess strategy for all words?</h4>
                    <p className="text-sm text-gray-400">
                      Yes! Each guess you make applies to all 12 grids simultaneously. Your goal is to find words that help narrow down multiple target words at once.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">What happens if I solve some words but not all?</h4>
                    <p className="text-sm text-gray-400">
                      You can see your progress as you solve each word. The game shows how many words you've solved out of 12. Try to solve all 12 before running out of guesses!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <VirtualKeyboard />
    </>
  );
}
