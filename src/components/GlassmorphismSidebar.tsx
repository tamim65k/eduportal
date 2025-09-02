import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const getNavigationForRole = (role: string) => {
  const baseNav = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Courses', href: '/courses', icon: BookOpenIcon },
    { name: 'Schedule', href: '/schedule', icon: CalendarDaysIcon },
  ];

  if (role === 'student') {
    return [
      ...baseNav,
      { name: 'Assignments', href: '/assignments', icon: DocumentTextIcon },
      { name: 'Exams', href: '/exams', icon: AcademicCapIcon },
      { name: 'Grades', href: '/grades', icon: ChartBarIcon },
      { name: 'Attendance', href: '/attendance', icon: ClockIcon },
      { name: 'Resources', href: '/resources', icon: FolderIcon },
      { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
    ];
  }

  if (role === 'teacher') {
    return [
      ...baseNav,
      { name: 'Assignments', href: '/assignments', icon: DocumentTextIcon },
      { name: 'Exams', href: '/exams', icon: AcademicCapIcon },
      { name: 'Grades', href: '/grades', icon: ChartBarIcon },
      { name: 'Attendance', href: '/attendance', icon: ClockIcon },
      { name: 'Resources', href: '/resources', icon: FolderIcon },
      { name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
      { name: 'Reports', href: '/reports', icon: ChartBarIcon },
    ];
  }

  if (role === 'admin') {
    return [
      ...baseNav,
      { name: 'Users', href: '/users', icon: UserGroupIcon },
      { name: 'Admin Panel', href: '/admin', icon: ShieldCheckIcon },
      { name: 'Reports', href: '/reports', icon: ChartBarIcon },
      { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ];
  }

  return baseNav;
};

export default function GlassmorphismSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  const navigation = getNavigationForRole(user.role);

  const getRoleGradient = (role: string) => {
    switch (role) {
      case 'student':
        return 'from-blue-500/20 via-cyan-500/20 to-teal-500/20';
      case 'teacher':
        return 'from-blue-600/20 via-indigo-500/20 to-purple-500/20';
      case 'admin':
        return 'from-purple-600/20 via-blue-600/20 to-indigo-600/20';
      default:
        return 'from-gray-500/20 via-gray-600/20 to-gray-700/20';
    }
  };

  const getActiveGlow = (role: string) => {
    switch (role) {
      case 'student':
        return 'shadow-[0_0_20px_rgba(20,184,166,0.4)]';
      case 'teacher':
        return 'shadow-[0_0_20px_rgba(99,102,241,0.4)]';
      case 'admin':
        return 'shadow-[0_0_20px_rgba(147,51,234,0.4)]';
      default:
        return 'shadow-[0_0_20px_rgba(59,130,246,0.4)]';
    }
  };

  return (
    <div className="fixed left-4 top-4 w-72 z-50" style={{ bottom: '120px' }}>
      {/* Solid Container */}
      <div className={`
        h-full rounded-2xl 
        bg-white border border-gray-200 
        shadow-2xl shadow-black/5
        animate-float
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`
              w-10 h-10 rounded-xl 
              ${user.role === 'student' ? 'bg-student-500' :
                user.role === 'teacher' ? 'bg-teacher-500' :
                'bg-admin-500'}
              flex items-center justify-center
              shadow-lg
            `}>
              <span className="text-xl">
                {user.role === 'student' ? '🎓' : user.role === 'teacher' ? '👨‍🏫' : '⚙️'}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">EduPortal</h2>
              <p className="text-xs text-gray-500 capitalize">{user.role} Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 bg-white">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group relative flex items-center space-x-3 px-4 py-3 rounded-xl
                  transition-all duration-300 ease-out
                  hover:scale-105 bg-white
                  ${isActive 
                    ? `${user.role === 'student' ? 'bg-student-100 text-student-700' :
                        user.role === 'teacher' ? 'bg-teacher-100 text-teacher-700' :
                        'bg-admin-100 text-admin-700'} shadow-lg border border-gray-200` 
                    : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900 border border-transparent'
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className={`
                    absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
                    bg-gradient-to-b ${
                      user.role === 'student' ? 'from-cyan-400 to-teal-400' :
                      user.role === 'teacher' ? 'from-blue-400 to-indigo-400' :
                      'from-purple-400 to-blue-400'
                    }
                    shadow-lg animate-glow
                  `} />
                )}
                
                {/* Icon */}
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-lg
                  transition-all duration-300
                  ${isActive 
                    ? `${user.role === 'student' ? 'bg-student-500 text-white' :
                        user.role === 'teacher' ? 'bg-teacher-500 text-white' :
                        'bg-admin-500 text-white'}` 
                    : 'text-gray-500 group-hover:text-gray-700 group-hover:bg-gray-100'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Text */}
                <span className={`
                  text-sm font-medium transition-colors duration-300
                  ${isActive 
                    ? `${user.role === 'student' ? 'text-student-700' :
                        user.role === 'teacher' ? 'text-teacher-700' :
                        'text-admin-700'}` 
                    : 'text-gray-600 group-hover:text-gray-900'
                  }
                `}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom spacing */}
        <div className="h-12 bg-white rounded-b-2xl"></div>
      </div>
    </div>
  );
}
