'use client';

import { useGame } from '@/lib/context/GameContext';
import { LetterFeedback, isValidWord } from '@/lib/utils/wordValidation';
import { useState, useEffect } from 'react';
import React from 'react';

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

export default function VirtualKeyboard() {
  const { state, addLetter, removeLetter, submitGuess } = useGame();
  const [fullKeys, setFullKeys] = useState<Set<string>>(new Set());
  const fullKeyTimeoutsRef = React.useRef<Map<string, NodeJS.Timeout>>(new Map());
  
  // Check if current guess is invalid
  const isCurrentGuessInvalid = state.currentGuess.length === 5 && !isValidWord(state.currentGuess);

  // Listen for physical keyboard presses for full key animation (when trying to add 6th letter)
  useEffect(() => {
    const fullKeyTimeouts = new Map<string, NodeJS.Timeout>();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if modifier keys are pressed
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      if (e.key.length === 1 && /[a-z]/i.test(e.key) && !e.shiftKey) {
        const key = e.key.toLowerCase();
        // Check if this key press will make the guess full (6th character attempt)
        const willBeFull = state.currentGuess.length === 5;

        if (willBeFull) {
          // Clear any existing timeout for this key
          const existingFullTimeout = fullKeyTimeouts.get(key);
          if (existingFullTimeout) {
            clearTimeout(existingFullTimeout);
            fullKeyTimeouts.delete(key);
          }
          
          setFullKeys((prev) => {
            const newSet = new Set(prev);
            newSet.add(key);
            return newSet;
          });
          
          // Clear full key after animation
          const fullTimeout = setTimeout(() => {
            setFullKeys((prev) => {
              const newSet = new Set(prev);
              newSet.delete(key);
              return newSet;
            });
            fullKeyTimeouts.delete(key);
          }, 150);
          fullKeyTimeouts.set(key, fullTimeout);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Clear all timeouts on cleanup
      fullKeyTimeouts.forEach(timeout => clearTimeout(timeout));
      fullKeyTimeouts.clear();
    };
  }, [state.currentGuess.length]);

  // Calculate keyboard feedback for each grid (0-11) for a given letter
  // Returns an array of 12 feedback values, one for each grid
  const getKeyFeedbackForGrids = (letter: string): (LetterFeedback | undefined)[] => {
    const letterLower = letter.toLowerCase();
    const gridFeedbacks: (LetterFeedback | undefined)[] = new Array(12).fill(undefined);
    
    state.guesses.forEach((guess, guessIndex) => {
      const feedbackForGuess = state.feedback[guessIndex];
      if (!feedbackForGuess) return;
      
      // Check each grid (0-11)
      feedbackForGuess.forEach((feedbackForWord, gridIndex) => {
        let bestFeedbackForGrid = gridFeedbacks[gridIndex];
        
        // Check all positions in this guess for this grid
        guess.split('').forEach((guessLetter, letterIndex) => {
          if (guessLetter === letterLower) {
            const cellFeedback = feedbackForWord[letterIndex];
            if (cellFeedback) {
              // Prioritize: correct > present > absent
              if (!bestFeedbackForGrid) {
                bestFeedbackForGrid = cellFeedback;
              } else if (cellFeedback === 'correct') {
                bestFeedbackForGrid = 'correct';
              } else if (cellFeedback === 'present' && bestFeedbackForGrid === 'absent') {
                bestFeedbackForGrid = 'present';
              }
            }
          }
        });
        
        gridFeedbacks[gridIndex] = bestFeedbackForGrid;
      });
    });
    
    return gridFeedbacks;
  };

  const handleKeyClick = (key: string) => {
    const isLetterKey = key.length === 1 && key !== 'Enter' && key !== 'Backspace';
    const willBeFull = isLetterKey && state.currentGuess.length === 5;
    
    // If this is a letter key that will be the 6th character, mark it as full for animation
    if (willBeFull) {
      // Clear any existing timeout for this key
      const existingTimeout = fullKeyTimeoutsRef.current.get(key);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        fullKeyTimeoutsRef.current.delete(key);
      }
      
      setFullKeys((prev) => {
        const newSet = new Set(prev);
        newSet.add(key);
        return newSet;
      });
      
      // Clear full key after 150ms
      const fullTimeout = setTimeout(() => {
        setFullKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
        fullKeyTimeoutsRef.current.delete(key);
      }, 150);
      
      fullKeyTimeoutsRef.current.set(key, fullTimeout);
    }

    if (key === 'Enter') {
      // Don't submit if word is invalid
      if (!isCurrentGuessInvalid) {
        submitGuess();
      }
    } else if (key === 'Backspace') {
      removeLetter();
    } else if (key.length === 1) {
      addLetter(key);
    }
  };

  const getKeyBaseColor = (key: string) => {
    if (key === 'Enter') {
      // Disable Enter if word is invalid
      if (isCurrentGuessInvalid) {
        return 'bg-gray-600 hover:bg-gray-600 active:bg-gray-600 text-gray-400 shadow-sm cursor-not-allowed';
      }
      return 'bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white shadow-sm';
    }
    if (key === 'Backspace') {
      return 'bg-gray-400 hover:bg-gray-500 active:bg-gray-600 text-white shadow-sm';
    }
    // For letter keys, we'll use a base color and overlay segments
    return 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600 shadow-sm relative overflow-hidden';
  };
  
  const getSegmentColor = (feedback: LetterFeedback | undefined): string => {
    switch (feedback) {
      case 'correct':
        return 'bg-green-500';
      case 'present':
        return 'bg-yellow-500';
      case 'absent':
        return 'bg-gray-600';
      default:
        return 'bg-gray-800/50';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-10 py-2 sm:py-3">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Align keyboard with middle two grids - matches GameBoard grid layout */}
        <div className="w-full">
          {/* Match the grid container from GameBoard: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {/* Empty spacer for first column on larger screens */}
            <div className="hidden md:block"></div>
            
            {/* Keyboard spans middle 2 columns */}
            <div className="col-span-2">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {KEYBOARD_ROWS.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center gap-1 sm:gap-1.5"
                  >
                    {row.map((key) => {
                      const keyToCheck = key === 'Backspace' ? 'Backspace' : key.toLowerCase();
                      const isLetterKey = key.length === 1 && key !== 'Enter' && key !== 'Backspace';
                      // Check if the letter is in the current guess
                      const isHighlighted = isLetterKey && state.currentGuess.includes(key.toLowerCase());
                      const isFullKey = fullKeys.has(key) || fullKeys.has(keyToCheck);
                      const shouldShowFullAnimation = isLetterKey && isFullKey;
                      
                      // Get feedback for each grid for letter keys
                      const gridFeedbacks = isLetterKey ? getKeyFeedbackForGrids(key.toLowerCase()) : null;
                      
                      return (
                        <button
                          key={key}
                          onClick={() => handleKeyClick(key)}
                          className={`
                            ${getKeyBaseColor(key)}
                            px-2 sm:px-3 py-2 sm:py-2.5
                            text-sm sm:text-base font-semibold
                            rounded-md
                            transition-all duration-150
                            active:scale-95
                            min-w-[2.25rem] sm:min-w-[2.75rem]
                            ${key === 'Enter' || key === 'Backspace' ? 'text-xs sm:text-sm px-2 sm:px-2.5' : ''}
                            disabled:opacity-60 disabled:cursor-not-allowed
                            ${shouldShowFullAnimation 
                              ? 'scale-110 ring-2 ring-red-400 ring-opacity-70 animate-pulse' 
                              : isHighlighted 
                                ? 'scale-110 ring-2 ring-white ring-opacity-50' 
                                : ''
                            }
                          `}
                          disabled={state.status !== 'playing' || (key === 'Enter' && isCurrentGuessInvalid)}
                        >
                          {/* For letter keys, show 12 segments (2 columns, 6 rows) covering the entire key */}
                          {isLetterKey && gridFeedbacks ? (
                            <div className="absolute inset-0 grid grid-cols-2 grid-rows-6 pointer-events-none">
                              {gridFeedbacks.map((feedback, gridIndex) => (
                                <div
                                  key={gridIndex}
                                  className={getSegmentColor(feedback)}
                                />
                              ))}
                            </div>
                          ) : null}
                          {/* Letter text - ensure it's on top with shadow for readability */}
                          <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{key === 'Backspace' ? '⌫' : key}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Empty spacer for last column on larger screens */}
            <div className="hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

