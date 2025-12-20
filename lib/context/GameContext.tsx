'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GameState, createInitialGameState } from '@/lib/types/game';
import { getDailyWords, getPuzzleNumber } from '@/lib/utils/puzzle';
import { isValidWord, calculateFeedbackForAll } from '@/lib/utils/wordValidation';

type GameAction =
  | { type: 'INIT_GAME'; targetWords: string[] }
  | { type: 'ADD_LETTER'; letter: string }
  | { type: 'REMOVE_LETTER' }
  | { type: 'SUBMIT_GUESS' }
  | { type: 'RESET_GAME' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INIT_GAME': {
      const initialState = createInitialGameState(action.targetWords);
      initialState.puzzleNumber = getPuzzleNumber();
      return initialState;
    }

    case 'ADD_LETTER': {
      if (state.currentGuess.length < 5 && state.status === 'playing') {
        return {
          ...state,
          currentGuess: state.currentGuess + action.letter.toLowerCase(),
        };
      }
      return state;
    }

    case 'REMOVE_LETTER': {
      if (state.currentGuess.length > 0 && state.status === 'playing') {
        return {
          ...state,
          currentGuess: state.currentGuess.slice(0, -1),
        };
      }
      return state;
    }

    case 'SUBMIT_GUESS': {
      if (state.currentGuess.length !== 5 || state.status !== 'playing') {
        return state;
      }

      if (!isValidWord(state.currentGuess)) {
        // Invalid word - could add error state here
        return state;
      }

      const guess = state.currentGuess.toLowerCase();
      const feedbackForAll = calculateFeedbackForAll(guess, state.targetWords);
      
      // Check which words are solved (all letters correct)
      const newSolvedWords = state.solvedWords.map((solved, index) => {
        if (solved) return true;
        return feedbackForAll[index].every(f => f === 'correct');
      });

      const allSolved = newSolvedWords.every(solved => solved);
      const guessesUsed = state.guessesUsed + 1;
      const isLost = guessesUsed >= state.maxGuesses && !allSolved;

      return {
        ...state,
        currentGuess: '',
        guesses: [...state.guesses, guess],
        feedback: [...state.feedback, feedbackForAll],
        solvedWords: newSolvedWords,
        guessesUsed,
        status: allSolved ? 'won' : isLost ? 'lost' : 'playing',
      };
    }

    case 'RESET_GAME': {
      const targetWords = getDailyWords();
      const initialState = createInitialGameState(targetWords);
      initialState.puzzleNumber = getPuzzleNumber();
      return initialState;
    }

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, null as any);

  // Initialize game on mount
  useEffect(() => {
    const targetWords = getDailyWords();
    dispatch({ type: 'INIT_GAME', targetWords });
  }, []);

  const addLetter = (letter: string) => {
    dispatch({ type: 'ADD_LETTER', letter });
  };

  const removeLetter = () => {
    dispatch({ type: 'REMOVE_LETTER' });
  };

  const submitGuess = () => {
    dispatch({ type: 'SUBMIT_GUESS' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  // Don't render until game is initialized
  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        addLetter,
        removeLetter,
        submitGuess,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

