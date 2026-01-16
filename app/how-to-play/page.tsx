import Link from 'next/link';

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-300 hover:text-white transition-colors mb-4"
          >
            <span className="text-2xl sm:text-3xl">←</span>
            <span>Go back to home</span>
          </Link>
        </div>

        <div className="text-center mb-8">
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
        </div>

        <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
          <section>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Dodecordle</h1>
            <div className="space-y-4">
              <p>
                Dodecordle is the ultimate word puzzle challenge! Solve 12 Wordle puzzles at the same time with each guess you make. It's the perfect game for word puzzle enthusiasts who want to take their skills to the next level.
              </p>
              <p>
                Play the Daily Game to compete with players worldwide on the same puzzle, or jump into Practice Mode for unlimited gameplay. Whether you're a casual player or a word game master, Dodecordle offers an exciting and challenging experience.
              </p>
              <p>
                Start playing now and see if you can solve all 12 words within the guess limit. Good luck!
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Game Rules</h2>
            <div className="space-y-4">
              <p>
                Each guess must be a valid 5-letter word. Your guess applies to all 12 target words simultaneously. Use the color feedback (green, yellow, gray) to eliminate possibilities and narrow down all 12 words at once.
              </p>
              <p>
                You have 14 guesses to solve everything in Daily Game mode. In Practice Mode, you can play unlimited games with randomly generated puzzles.
              </p>
              <p>
                Green means the letter is in the correct position, yellow means the letter is in the word but in the wrong position, and gray means the letter is not in the word at all. Use this feedback across all 12 grids to strategize your next guesses!
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Tips & Strategies</h2>
            <div className="space-y-4">
              <p>
                Start with common 5-letter words that contain frequently used letters like vowels and common consonants. Words like "ROATE", "CRANE", or "SLATE" can give you valuable information across multiple grids.
              </p>
              <p>
                Pay attention to which words share common letters. If you see green or yellow feedback in the same position across multiple grids, you can use that to narrow down possibilities faster.
              </p>
              <p>
                Don't forget that each guess applies to all 12 words. Think strategically about words that will help you eliminate possibilities across as many grids as possible.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Game Modes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Daily Game</h3>
                <p>
                  Play the same puzzle as everyone else around the world! Each day brings a new challenge with 12 words to solve. You have 14 guesses to complete all 12 words. Compare your results with friends and see who can solve them all!
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Practice Mode</h3>
                <p>
                  Want to improve your skills? Practice Mode lets you play unlimited games with randomly generated puzzles. Perfect for learning strategies and getting familiar with the game mechanics without the pressure of the daily challenge.
                </p>
              </div>
            </div>
          </section>

          <div className="pt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Start Playing Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
