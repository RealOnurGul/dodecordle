'use client';

import Link from 'next/link';

interface StartScreenProps {
  onStartPractice?: () => void;
}

export default function StartScreen({ onStartPractice }: StartScreenProps) {
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
          <div className="text-5xl sm:text-6xl mt-4 text-white">?</div>
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
              <button
                onClick={onStartPractice}
                disabled={!onStartPractice}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Practice
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Privacy policy will be added later
            }}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </main>
  );
}
