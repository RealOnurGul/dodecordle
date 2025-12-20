import { LetterFeedback } from '@/lib/utils/wordValidation';

interface GridCellProps {
  letter: string;
  feedback?: LetterFeedback;
  isCurrentGuess?: boolean;
}

export default function GridCell({ letter, feedback, isCurrentGuess }: GridCellProps) {
  const getBackgroundColor = () => {
    if (!feedback) {
      return isCurrentGuess ? 'bg-gray-800 border-2 border-gray-600 text-gray-300' : 'bg-gray-800 border-2 border-gray-600';
    }
    
    switch (feedback) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-800 border-2 border-gray-600';
    }
  };

  const displayLetter = letter.trim() ? letter.toUpperCase() : '';

  return (
    <div
      className={`
        w-full aspect-square
        flex items-center justify-center
        text-xl sm:text-2xl font-bold
        rounded
        transition-colors duration-200
        ${getBackgroundColor()}
      `}
    >
      {displayLetter}
    </div>
  );
}

