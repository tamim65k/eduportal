import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { AcademicCapIcon, BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ScheduleItem {
  id: number;
  name: string;
  time: string;
  location: string;
  instructor: string;
  type: 'lecture' | 'lab' | 'tutorial';
  status?: 'upcoming' | 'ongoing' | 'completed';
}

interface ScheduleCardProps {
  title: string;
  scheduleItems: ScheduleItem[];
  userRole: UserRole;
  showJoinButton?: boolean;
}

export default function ScheduleCard({ title, scheduleItems, userRole, showJoinButton = false }: ScheduleCardProps) {
  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          accent: 'text-student-600',
          bg: 'bg-student-50',
          button: 'bg-student-500 hover:bg-student-600'
        };
      case 'teacher':
        return {
          accent: 'text-teacher-600',
          bg: 'bg-teacher-50',
          button: 'bg-teacher-500 hover:bg-teacher-600'
        };
      case 'admin':
        return {
          accent: 'text-admin-600',
          bg: 'bg-admin-50',
          button: 'bg-admin-500 hover:bg-admin-600'
        };
      default:
        return {
          accent: 'text-gray-600',
          bg: 'bg-gray-50',
          button: 'bg-gray-500 hover:bg-gray-600'
        };
    }
  };

  const colors = getRoleColors(userRole);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return AcademicCapIcon;
      case 'lab':
        return BookOpenIcon;
      default:
        return ClockIcon;
    }
  };

  const getTypeColors = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-600';
      case 'lab':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-purple-100 text-purple-600';
    }
  };

  const getStatusIndicator = (status?: string) => {
    switch (status) {
      case 'ongoing':
        return <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>;
      case 'completed':
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-blue-400 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className={`px-6 py-4 ${colors.bg} border-b border-gray-100`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${colors.accent}`}>{title}</h3>
          <Link to="/schedule" className={`text-sm font-medium ${colors.accent} hover:underline`}>
            View all
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {scheduleItems.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${getTypeColors(item.type)}`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {getStatusIndicator(item.status)}
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.time}</p>
                    <p className="text-xs text-gray-500">{item.location} • {item.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColors(item.type)}`}>
                    {item.type}
                  </span>
                  {showJoinButton && item.status === 'upcoming' && (
                    <button className={`px-3 py-1 ${colors.button} text-white text-xs font-medium rounded-md transition-colors duration-200`}>
                      Join
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
