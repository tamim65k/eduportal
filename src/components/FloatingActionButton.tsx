import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { PlusIcon } from '@heroicons/react/24/outline';

interface FloatingAction {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FloatingActionButtonProps {
  userRole: UserRole;
}

export default function FloatingActionButton({ userRole }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getActionsForRole = (role: UserRole): FloatingAction[] => {
    switch (role) {
      case 'student':
        return [
          { name: 'Submit Assignment', href: '/assignments', icon: () => <span className="text-sm font-medium">📝</span> },
          { name: 'Join Class', href: '/schedule', icon: () => <span className="text-sm font-medium">🎓</span> },
          { name: 'Send Message', href: '/messages', icon: () => <span className="text-sm font-medium">💬</span> },
        ];
      case 'teacher':
        return [
          { name: 'Create Assignment', href: '/assignments', icon: () => <span className="text-sm font-medium">📋</span> },
          { name: 'Take Attendance', href: '/attendance', icon: () => <span className="text-sm font-medium">✅</span> },
          { name: 'Post Announcement', href: '/messages', icon: () => <span className="text-sm font-medium">📢</span> },
          { name: 'Upload Resource', href: '/resources', icon: () => <span className="text-sm font-medium">📚</span> },
        ];
      case 'admin':
        return [
          { name: 'Add User', href: '/admin', icon: () => <span className="text-sm font-medium">👤</span> },
          { name: 'Create Course', href: '/courses', icon: () => <span className="text-sm font-medium">🏫</span> },
          { name: 'Generate Report', href: '/reports', icon: () => <span className="text-sm font-medium">📊</span> },
        ];
      default:
        return [];
    }
  };

  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          main: 'bg-student-500 hover:bg-student-600',
          action: 'bg-student-400 hover:bg-student-500'
        };
      case 'teacher':
        return {
          main: 'bg-teacher-500 hover:bg-teacher-600',
          action: 'bg-teacher-400 hover:bg-teacher-500'
        };
      case 'admin':
        return {
          main: 'bg-admin-500 hover:bg-admin-600',
          action: 'bg-admin-400 hover:bg-admin-500'
        };
      default:
        return {
          main: 'bg-primary-500 hover:bg-primary-600',
          action: 'bg-primary-400 hover:bg-primary-500'
        };
    }
  };

  const actions = getActionsForRole(userRole);
  const colors = getRoleColors(userRole);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action items */}
      {isOpen && (
        <div className="mb-4 space-y-2 animate-slide-up">
          {actions.map((action, index) => (
            <Link
              key={action.name}
              to={action.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 ${colors.action} text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap">{action.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 ${colors.main} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          userRole === 'student' ? 'focus:ring-student-300' :
          userRole === 'teacher' ? 'focus:ring-teacher-300' :
          'focus:ring-admin-300'
        }`}
      >
        <PlusIcon 
          className={`w-6 h-6 mx-auto transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`} 
        />
      </button>
    </div>
  );
}
