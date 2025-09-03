import React from 'react';
import { UserRole, User } from '../types';
import { SparklesIcon, ClockIcon } from '@heroicons/react/24/outline';

interface WelcomeHeaderProps {
  user: User;
}

export default function WelcomeHeader({ user }: WelcomeHeaderProps) {
  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleEmoji = (role: UserRole) => {
    switch (role) {
      case 'student': return '🎓';
      case 'teacher': return '👨‍🏫';
      case 'admin': return '⚙️';
      default: return '👋';
    }
  };

  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          gradient: 'bg-gradient-to-r from-student-500 to-blue-500',
          text: 'text-student-700',
          badge: 'bg-student-100 text-student-800 border-student-200'
        };
      case 'teacher':
        return {
          gradient: 'bg-gradient-to-r from-teacher-500 to-orange-500',
          text: 'text-teacher-700',
          badge: 'bg-teacher-100 text-teacher-800 border-teacher-200'
        };
      case 'admin':
        return {
          gradient: 'bg-gradient-to-r from-admin-500 to-purple-500',
          text: 'text-admin-700',
          badge: 'bg-admin-100 text-admin-800 border-admin-200'
        };
      default:
        return {
          gradient: 'bg-gradient-to-r from-gray-500 to-gray-600',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const colors = getRoleColors(user.role);

  return (
    <div className={`${colors.gradient} rounded-xl p-6 text-white shadow-lg mb-8`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{getRoleEmoji(user.role)}</span>
            <h1 className="text-2xl font-bold">
              {getCurrentTime()}, {user.firstName}!
            </h1>
          </div>
          <p className="text-white/90 text-sm">
            {user.role === 'student' && "Ready to learn something new today?"}
            {user.role === 'teacher' && "Ready to inspire minds today?"}
            {user.role === 'admin' && "Managing the platform efficiently today?"}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {user.role === 'student' && (
            <div className="text-right">
              <div className="flex items-center space-x-2 text-white/90">
                <SparklesIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Level 12</span>
              </div>
              <p className="text-xs text-white/75">850/1000 XP</p>
            </div>
          )}
          <div className="text-right">
            <div className="flex items-center space-x-2 text-white/90">
              <ClockIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-white/75">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
