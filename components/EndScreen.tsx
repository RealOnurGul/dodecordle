'use client';

import { GameState } from '@/lib/types/game';
import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils/share';

interface EndScreenProps {
  state: GameState;
  isPractice: boolean;
  onClose?: () => void;
}

/**
 * Find which guess number solved each word (1-indexed)
 * Returns -1 if word was not solved
 */
function findSolveGuess(state: GameState, wordIndex: number): number {
  if (!state.solvedWords[wordIndex]) {
    return -1; // Not solved
  }

  // Find the first guess where all letters were correct for this word
  for (let guessIndex = 0; guessIndex < state.feedback.length; guessIndex++) {
    const feedbackForWord = state.feedback[guessIndex]?.[wordIndex];
    if (feedbackForWord && feedbackForWord.every(f => f === 'correct')) {
      return guessIndex + 1; // 1-indexed
    }
  }

  return -1;
}

/**
 * Generate share text in the format requested
 */
function generateEndScreenShareText(state: GameState, isPractice: boolean): string {
  const title = isPractice 
    ? 'Practice Dodecordle' 
    : `Daily Dodecordle #${state.puzzleNumber}`;
  
  let text = `${title}\n`;

  // Create 2 columns, 6 rows layout
  const wordsPerColumn = 6;
  
  for (let row = 0; row < wordsPerColumn; row++) {
    const leftWordIndex = row;
    const rightWordIndex = row + wordsPerColumn;
    
    const leftWord = state.targetWords[leftWordIndex];
    const rightWord = state.targetWords[rightWordIndex];
    
    const leftSolveGuess = findSolveGuess(state, leftWordIndex);
    const rightSolveGuess = findSolveGuess(state, rightWordIndex);
    
    // Format: WORD 🟥6️⃣ WORD 🟥🟥
    // For numbers 1-10, use emoji numbers, for >10 use regular numbers
    const getNumberEmoji = (num: number): string => {
      const emojiMap: { [key: number]: string } = {
        1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣',
        6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣', 10: '🔟'
      };
      return emojiMap[num] || String(num);
    };
    
    const leftSquare = leftSolveGuess > 0 
      ? `🟩${getNumberEmoji(leftSolveGuess)}` 
      : '🟥';
    const rightSquare = rightSolveGuess > 0
      ? `🟩${getNumberEmoji(rightSolveGuess)}`
      : '🟥';
    
    text += `${leftWord.toUpperCase()} ${leftSquare} ${rightWord.toUpperCase()} ${rightSquare}\n`;
  }
  
  return text;
}

export default function EndScreen({ state, isPractice, onClose }: EndScreenProps) {
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = async () => {
    const shareText = generateEndScreenShareText(state, isPractice);
    const success = await copyToClipboard(shareText);
    if (success) {
      setCopyMessage('Copied successfully!');
      setTimeout(() => setCopyMessage(''), 2000);
    } else {
      setCopyMessage('Failed to copy');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const title = isPractice 
    ? 'Practice Dodecordle' 
    : `Daily Dodecordle #${state.puzzleNumber}`;

  const wordsPerColumn = 6;

  const won = state.status === 'won';
  const solvedCount = state.solvedWords.filter(s => s).length;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-gray-800 rounded-xl p-6 border-2 border-gray-600 relative max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-3xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-gray-700"
              aria-label="Close"
            >
              ×
            </button>
          )}
          <h2 className="text-2xl font-bold text-white mb-2 text-center pr-10">{title}</h2>
      <p className={`text-lg font-semibold mb-4 text-center ${won ? 'text-green-400' : 'text-red-400'}`}>
        {won ? '🎉 You Won!' : `You Lost - Solved ${solvedCount}/12 words`}
      </p>
      
      <div className="space-y-2 mb-6 font-mono">
        {Array.from({ length: wordsPerColumn }).map((_, row) => {
          const leftWordIndex = row;
          const rightWordIndex = row + wordsPerColumn;
          
          const leftWord = state.targetWords[leftWordIndex];
          const rightWord = state.targetWords[rightWordIndex];
          
          const leftSolveGuess = findSolveGuess(state, leftWordIndex);
          const rightSolveGuess = findSolveGuess(state, rightWordIndex);
          
          const leftSolved = leftSolveGuess > 0;
          const rightSolved = rightSolveGuess > 0;
          
          return (
            <div key={row} className="flex items-center justify-center gap-3 text-base">
              {/* Format: WORD 🟥6️⃣ WORD 🟥🟥 */}
              <span className="font-bold text-white">{leftWord.toUpperCase()}</span>
              <div className={`
                w-10 h-10 flex items-center justify-center rounded
                text-white font-bold
                ${leftSolved ? 'bg-green-500' : 'bg-red-500'}
              `}>
                {leftSolved ? (
                  <span className={leftSolveGuess > 10 ? 'text-[10px] leading-none' : 'text-sm'}>
                    {leftSolveGuess}
                  </span>
                ) : (
                  <span className="text-lg">✕</span>
                )}
              </div>
              
              <span className="font-bold text-white">{rightWord.toUpperCase()}</span>
              <div className={`
                w-10 h-10 flex items-center justify-center rounded
                text-white font-bold
                ${rightSolved ? 'bg-green-500' : 'bg-red-500'}
              `}>
                {rightSolved ? (
                  <span className={rightSolveGuess > 10 ? 'text-[10px] leading-none' : 'text-sm'}>
                    {rightSolveGuess}
                  </span>
                ) : (
                  <span className="text-lg">✕</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center space-y-2">
        <button
          onClick={handleCopy}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Copy Results
        </button>
        {copyMessage && (
          <p className={`text-sm ${copyMessage === 'Copied successfully!' ? 'text-green-400' : 'text-red-400'}`}>
            {copyMessage}
          </p>
        )}
      </div>
        </div>
      </div>
    </>
  );
}
