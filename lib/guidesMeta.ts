export const GUIDE_SLUGS = [
  'dodecordle-strategy',
  'best-opening-words',
  'how-to-improve-wordle-skills',
  'hard-wordle-variants',
  'word-patterns-and-letter-frequency',
  'mistakes-to-avoid',
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export const GUIDES: Record<
  GuideSlug,
  { title: string; description: string }
> = {
  'dodecordle-strategy': {
    title: 'Dodecordle Strategy',
    description:
      'How to use each guess across all 12 grids, when to narrow one word vs. many, and how to finish within the guess limit.',
  },
  'best-opening-words': {
    title: 'Best Opening Words',
    description:
      'Why certain first guesses work well in Wordle and Dodecordle, and how to pick an opener that helps all 12 words.',
  },
  'how-to-improve-wordle-skills': {
    title: 'How to Improve Your Wordle Skills',
    description:
      'Practical ways to get better at Wordle-style games: pattern recognition, letter frequency, and deliberate practice.',
  },
  'hard-wordle-variants': {
    title: 'Hard Wordle Variants',
    description:
      'A look at tougher word puzzles like Dodecordle, Quordle, and Octordle, and what makes them challenging.',
  },
  'word-patterns-and-letter-frequency': {
    title: 'Word Patterns and Letter Frequency',
    description:
      'How letter frequency and common word patterns can guide your guesses in five-letter word games.',
  },
  'mistakes-to-avoid': {
    title: 'Mistakes to Avoid',
    description:
      'Common pitfalls in Wordle and Dodecordle—wasted guesses, ignoring feedback, and how to fix them.',
  },
};

export function getGuide(slug: string): { title: string; description: string } | null {
  if (GUIDE_SLUGS.includes(slug as GuideSlug)) {
    return GUIDES[slug as GuideSlug];
  }
  return null;
}
