import React from 'react';
import { UserRole } from '../types';

interface StatCardProps {
  name: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  userRole: UserRole;
  trend?: number[];
}

export default function StatCard({ 
  name, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  userRole,
  trend 
}: StatCardProps) {
  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          bg: 'bg-gradient-to-br from-student-50 to-blue-50',
          iconBg: 'bg-student-100',
          iconText: 'text-student-600',
          accent: 'text-student-700'
        };
      case 'teacher':
        return {
          bg: 'bg-gradient-to-br from-teacher-50 to-orange-50',
          iconBg: 'bg-teacher-100',
          iconText: 'text-teacher-600',
          accent: 'text-teacher-700'
        };
      case 'admin':
        return {
          bg: 'bg-gradient-to-br from-admin-50 to-purple-50',
          iconBg: 'bg-admin-100',
          iconText: 'text-admin-600',
          accent: 'text-admin-700'
        };
      default:
        return {
          bg: 'bg-gray-50',
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
          accent: 'text-gray-700'
        };
    }
  };

  const colors = getRoleColors(userRole);

  return (
    <div className={`${colors.bg} rounded-xl shadow-sm border border-white/50 p-6 hover:shadow-md transition-all duration-200 animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${colors.iconBg} shadow-sm`}>
            <Icon className={`h-6 w-6 ${colors.iconText}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{name}</p>
            <p className={`text-3xl font-bold ${colors.accent}`}>{value}</p>
            {change && (
              <div className="flex items-center mt-1">
                <span className={`text-sm font-medium ${
                  changeType === 'positive' ? 'text-green-600' : 
                  changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {changeType === 'positive' && '↗'} 
                  {changeType === 'negative' && '↘'} 
                  {change}
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last week</span>
              </div>
            )}
          </div>
        </div>
        {trend && (
          <div className="hidden sm:block">
            <svg className="h-8 w-16" viewBox="0 0 64 32">
              <polyline
                fill="none"
                stroke={changeType === 'positive' ? '#10b981' : changeType === 'negative' ? '#ef4444' : '#6b7280'}
                strokeWidth="2"
                points={trend.map((point, index) => `${(index / (trend.length - 1)) * 60 + 2},${32 - (point / Math.max(...trend)) * 28}`).join(' ')}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
