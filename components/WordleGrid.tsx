import GridCell from './GridCell';
import { LetterFeedback } from '@/lib/utils/wordValidation';

interface WordleGridProps {
  guesses: string[];
  feedback: LetterFeedback[][];
  currentGuess: string;
  isSolved: boolean;
  gridIndex: number;
  isCurrentGuessInvalid?: boolean;
}

export default function WordleGrid({
  guesses,
  feedback,
  currentGuess,
  isSolved,
  gridIndex,
  isCurrentGuessInvalid = false,
}: WordleGridProps) {
  const maxGuesses = 17;
  const rows: Array<{ letters: string; feedback?: LetterFeedback[]; isGray?: boolean }> = [];

  // Find when this word was solved
  let solvedAtGuessIndex = -1;
  if (isSolved) {
    for (let i = 0; i < feedback.length; i++) {
      if (feedback[i] && feedback[i].every(f => f === 'correct')) {
        solvedAtGuessIndex = i;
        break;
      }
    }
  }

  // Add completed guesses
  guesses.forEach((guess, guessIndex) => {
    // If word is solved, show the solving guess as green, then subsequent guesses as gray (no letters)
    if (isSolved && solvedAtGuessIndex >= 0) {
      if (guessIndex === solvedAtGuessIndex) {
        // The guess that solved it - show as green with letters
        rows.push({
          letters: guess,
          feedback: feedback[guessIndex],
        });
      } else if (guessIndex > solvedAtGuessIndex) {
        // Guesses after solving - show as gray with NO letters
        rows.push({
          letters: '     ', // Empty - no letters shown
          feedback: ['absent', 'absent', 'absent', 'absent', 'absent'] as LetterFeedback[],
          isGray: true,
        });
      } else {
        // Guesses before solving - show normally
        rows.push({
          letters: guess,
          feedback: feedback[guessIndex],
        });
      }
    } else {
      // Word not solved yet - show normally
      rows.push({
        letters: guess,
        feedback: feedback[guessIndex],
      });
    }
  });

  // Add current guess if any
  if (currentGuess && guesses.length < maxGuesses) {
    if (isSolved && solvedAtGuessIndex >= 0) {
      // If solved, don't show current guess row at all - nothing appears while typing
      // (We'll add empty rows below to fill the grid)
    } else {
      rows.push({
        letters: currentGuess.padEnd(5, ' '),
      });
    }
  }

  // Fill remaining rows
  while (rows.length < maxGuesses) {
    rows.push({ letters: '     ' });
  }

  return (
    <div className="flex flex-col gap-0.5 sm:gap-1">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-0.5 sm:gap-1">
          {row.letters.split('').map((letter, colIndex) => (
            <GridCell
              key={colIndex}
              letter={letter}
              feedback={row.isGray ? 'absent' : row.feedback?.[colIndex]}
              isCurrentGuess={
                rowIndex === guesses.length && currentGuess.length > 0
              }
              isInvalid={
                rowIndex === guesses.length && currentGuess.length > 0 && isCurrentGuessInvalid
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

