import React from 'react';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface Badge {
  name: string;
  earned: boolean;
  description: string;
  icon: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GamificationBadgeProps {
  badges: Badge[];
  userLevel: number;
  xpCurrent: number;
  xpNext: number;
}

export default function GamificationBadge({ badges, userLevel, xpCurrent, xpNext }: GamificationBadgeProps) {
  const getRarityColors = (rarity: string = 'common') => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500 text-white';
      case 'epic':
        return 'from-purple-400 to-pink-500 text-white';
      case 'rare':
        return 'from-blue-400 to-indigo-500 text-white';
      default:
        return 'from-gray-100 to-gray-200 text-gray-700';
    }
  };

  const xpProgress = (xpCurrent / xpNext) * 100;

  return (
    <div className="bg-gradient-to-br from-student-50 to-blue-50 rounded-xl p-6 border border-student-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-student-700">🏆 Achievements</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-student-600">Level {userLevel}</span>
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-student-400 to-blue-400 transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
              badge.earned 
                ? `bg-gradient-to-r ${getRarityColors(badge.rarity)} shadow-sm hover:shadow-md` 
                : 'bg-gray-100 opacity-60'
            }`}
          >
            <div className="flex items-center space-x-3 p-4">
              <div className="flex-shrink-0">
                <span className="text-2xl">{badge.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${badge.earned ? 'text-current' : 'text-gray-500'}`}>
                  {badge.name}
                </p>
                <p className={`text-xs ${badge.earned ? 'text-current opacity-90' : 'text-gray-400'}`}>
                  {badge.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                {badge.earned ? (
                  <CheckCircleIcon className="h-5 w-5 text-current" />
                ) : (
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            {badge.earned && badge.rarity && badge.rarity !== 'common' && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-white/20 text-current">
                  {badge.rarity.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-student-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-student-600 font-medium">Progress to Level {userLevel + 1}</span>
          <span className="text-student-700 font-semibold">{xpCurrent}/{xpNext} XP</span>
        </div>
      </div>
    </div>
  );
}
