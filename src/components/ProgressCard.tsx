import React from 'react';
import { UserRole } from '../types';

interface ProgressCardProps {
  title: string;
  current: number;
  total: number;
  userRole: UserRole;
  subtitle?: string;
  showBadge?: boolean;
  badgeText?: string;
}

export default function ProgressCard({ 
  title, 
  current, 
  total, 
  userRole, 
  subtitle,
  showBadge = false,
  badgeText 
}: ProgressCardProps) {
  const percentage = Math.round((current / total) * 100);
  
  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          progress: 'bg-student-500',
          bg: 'bg-student-50',
          text: 'text-student-700',
          badge: 'bg-student-100 text-student-800'
        };
      case 'teacher':
        return {
          progress: 'bg-teacher-500',
          bg: 'bg-teacher-50',
          text: 'text-teacher-700',
          badge: 'bg-teacher-100 text-teacher-800'
        };
      case 'admin':
        return {
          progress: 'bg-admin-500',
          bg: 'bg-admin-50',
          text: 'text-admin-700',
          badge: 'bg-admin-100 text-admin-800'
        };
      default:
        return {
          progress: 'bg-gray-500',
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const colors = getRoleColors(userRole);

  return (
    <div className={`${colors.bg} rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${colors.text}`}>{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {showBadge && badgeText && (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{current} of {total} completed</span>
          <span className={`font-semibold ${colors.text}`}>{percentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full ${colors.progress} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {percentage >= 100 && (
          <div className="flex items-center space-x-2 text-green-600 text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Complete!</span>
          </div>
        )}
      </div>
    </div>
  );
}
