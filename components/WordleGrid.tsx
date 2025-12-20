import GridCell from './GridCell';
import { LetterFeedback } from '@/lib/utils/wordValidation';

interface WordleGridProps {
  guesses: string[];
  feedback: LetterFeedback[][];
  currentGuess: string;
  isSolved: boolean;
  gridIndex: number;
}

export default function WordleGrid({
  guesses,
  feedback,
  currentGuess,
  isSolved,
  gridIndex,
}: WordleGridProps) {
  const maxGuesses = 17;
  const rows: Array<{ letters: string; feedback?: LetterFeedback[] }> = [];

  // Add completed guesses
  guesses.forEach((guess, guessIndex) => {
    rows.push({
      letters: guess,
      feedback: feedback[guessIndex],
    });
  });

  // Add current guess if any
  if (currentGuess && guesses.length < maxGuesses) {
    rows.push({
      letters: currentGuess.padEnd(5, ' '),
    });
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
              feedback={row.feedback?.[colIndex]}
              isCurrentGuess={
                rowIndex === guesses.length && currentGuess.length > 0
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

