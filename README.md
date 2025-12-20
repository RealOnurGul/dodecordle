# Dodecordle

A word puzzle game where players solve 12 Wordle puzzles simultaneously. Each puzzle shares the same guess, and players must find all 12 words within 17 attempts.

## Features

- 🎮 **12 Simultaneous Wordles**: Same guess applies to all 12 grids
- 📅 **Daily Puzzles**: New puzzle every day at 3am
- 📱 **Mobile-First Design**: Optimized for mobile devices
- ⌨️ **Keyboard Support**: Both virtual and physical keyboard
- 🎯 **17 Guess Limit**: Challenge yourself to solve all 12 words

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RealOnurGul/dodecordle.git
cd dodecordle
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## Project Structure

```
dodecordle/
├── app/              # Next.js app directory
├── components/        # React components
├── lib/               # Utilities and data
│   └── data/          # Word lists and data
├── public/            # Static assets
└── ...
```

## License

ISC

