'use client';

import { getStatistics } from '@/lib/utils/statistics';
import { useState, useEffect } from 'react';

export default function Statistics({ onClose }: { onClose: () => void }) {
  const [stats, setStats] = useState(getStatistics());

  useEffect(() => {
    setStats(getStatistics());
  }, []);

  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  const maxDistribution = Math.max(...stats.guessDistribution.slice(1), 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close statistics"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-sm text-gray-600">Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{winRate}%</div>
            <div className="text-sm text-gray-600">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-sm text-gray-600">Current</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-sm text-gray-600">Max</div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Guess Distribution</h3>
          <div className="space-y-1">
            {stats.guessDistribution.slice(1, 18).map((count, index) => {
              const guessNum = index + 1;
              const percentage = maxDistribution > 0 ? (count / maxDistribution) * 100 : 0;
              
              return (
                <div key={guessNum} className="flex items-center gap-2">
                  <div className="w-8 text-sm font-semibold">{guessNum}</div>
                  <div className="flex-1 bg-gray-200 rounded h-6 relative">
                    <div
                      className="bg-green-500 h-6 rounded flex items-center justify-end pr-2 text-white text-xs font-semibold transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    >
                      {count > 0 && count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

