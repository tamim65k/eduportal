import React from 'react';
import { UserRole, Announcement } from '../types';
import { BellIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface AnnouncementCardProps {
  announcements: Announcement[];
  userRole: UserRole;
  showAll?: boolean;
}

export default function AnnouncementCard({ announcements, userRole, showAll = false }: AnnouncementCardProps) {
  const displayAnnouncements = showAll ? announcements : announcements.slice(0, 3);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return ExclamationTriangleIcon;
      case 'medium':
        return BellIcon;
      default:
        return InformationCircleIcon;
    }
  };

  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          accent: 'text-student-600',
          bg: 'bg-student-50'
        };
      case 'teacher':
        return {
          accent: 'text-teacher-600',
          bg: 'bg-teacher-50'
        };
      case 'admin':
        return {
          accent: 'text-admin-600',
          bg: 'bg-admin-50'
        };
      default:
        return {
          accent: 'text-gray-600',
          bg: 'bg-gray-50'
        };
    }
  };

  const colors = getRoleColors(userRole);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className={`px-6 py-4 ${colors.bg} border-b border-gray-100`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${colors.accent}`}>Latest Announcements</h3>
          <BellIcon className={`h-5 w-5 ${colors.accent}`} />
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {displayAnnouncements.map((announcement) => {
          const PriorityIcon = getPriorityIcon(announcement.priority);
          
          return (
            <div key={announcement.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-2 rounded-lg ${
                  announcement.priority === 'high' ? 'bg-red-100' :
                  announcement.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  <PriorityIcon className={`h-5 w-5 ${
                    announcement.priority === 'high' ? 'text-red-600' :
                    announcement.priority === 'medium' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {announcement.title}
                    </p>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {announcement.content}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(announcement.publishDate).toLocaleDateString()} • 
                    {announcement.targetAudience === 'all' ? ' All Users' : ` ${announcement.targetAudience}`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!showAll && announcements.length > 3 && (
        <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
          <button className={`text-sm font-medium ${colors.accent} hover:underline`}>
            View all {announcements.length} announcements
          </button>
        </div>
      )}
    </div>
  );
}
