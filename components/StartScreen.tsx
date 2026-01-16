'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function StartScreen() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md">
        {/* Dodecordle Title */}
        <div className="mb-12 text-center">
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-4">
            {['D', 'O', 'D', 'E', 'C', 'O', 'R', 'D', 'L', 'E'].map((letter, index) => (
              <div
                key={index}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12
                  flex items-center justify-center
                  text-xl sm:text-2xl font-bold
                  rounded-md
                  shadow-md
                  ${
                    index < 4
                      ? 'bg-green-500 text-white'
                      : index < 6
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-700 text-white'
                  }
                `}
              >
                {letter}
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="mt-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center text-lg sm:text-xl font-bold transition-colors shadow-md hover:shadow-lg mx-auto"
            aria-label="Show game information"
            title="How to play"
          >
            ?
          </button>
        </div>

        {/* Menu Options */}
        <div className="space-y-4">
          {/* Daily Game Card */}
          <div className="bg-gray-800 rounded-xl p-6 border-2 border-yellow-500 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-yellow-400 text-2xl font-bold">Dodecordle</h2>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              The original Dodecordle. Solve 12 Wordles at once!
            </p>
            <div className="flex gap-3">
              <Link
                href="/game"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors text-center shadow-md hover:shadow-lg"
              >
                Daily Game
              </Link>
              <Link
                href="/game?practice=true"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center shadow-md hover:shadow-lg"
              >
                Practice
              </Link>
            </div>
          </div>
        </div>

        {/* Content section for AdSense placement - Collapsible but always in DOM */}
        <div className="mt-6 mb-8 max-w-2xl mx-auto">
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showInfo ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-gray-300 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">About Dodecordle</h2>
                <p className="mb-2">
                  Dodecordle is the ultimate word puzzle challenge! Solve 12 Wordle puzzles at the same time with each guess you make. It's the perfect game for word puzzle enthusiasts who want to take their skills to the next level.
                </p>
                <p className="mb-2">
                  Play the Daily Game to compete with players worldwide on the same puzzle, or jump into Practice Mode for unlimited gameplay. Whether you're a casual player or a word game master, Dodecordle offers an exciting and challenging experience.
                </p>
                <p>
                  Start playing now and see if you can solve all 12 words within the guess limit. Good luck!
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Game Rules</h3>
                <p className="mb-2 text-sm">
                  Each guess must be a valid 5-letter word. Your guess applies to all 12 target words simultaneously. Use the color feedback (green, yellow, gray) to eliminate possibilities and narrow down all 12 words at once. You have 14 guesses to solve everything in Daily Game mode.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
