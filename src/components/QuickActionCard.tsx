import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';

interface QuickAction {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
}

interface QuickActionCardProps {
  title: string;
  actions: QuickAction[];
  userRole: UserRole;
}

export default function QuickActionCard({ title, actions, userRole }: QuickActionCardProps) {
  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          hover: 'hover:bg-student-50',
          icon: 'text-student-600',
          accent: 'text-student-700'
        };
      case 'teacher':
        return {
          hover: 'hover:bg-teacher-50',
          icon: 'text-teacher-600',
          accent: 'text-teacher-700'
        };
      case 'admin':
        return {
          hover: 'hover:bg-admin-50',
          icon: 'text-admin-600',
          accent: 'text-admin-700'
        };
      default:
        return {
          hover: 'hover:bg-gray-50',
          icon: 'text-gray-600',
          accent: 'text-gray-700'
        };
    }
  };

  const colors = getRoleColors(userRole);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <h3 className={`text-lg font-semibold ${colors.accent}`}>{title}</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className={`flex items-center p-4 rounded-lg border border-gray-100 ${colors.hover} transition-all duration-200 group`}
            >
              <div className="flex-shrink-0">
                <action.icon className={`h-6 w-6 ${colors.icon} group-hover:scale-110 transition-transform duration-200`} />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    {action.name}
                  </p>
                  {action.badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {action.badge}
                    </span>
                  )}
                </div>
                {action.description && (
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                )}
              </div>
              <div className="ml-2">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
