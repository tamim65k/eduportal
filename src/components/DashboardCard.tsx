import React from 'react';
import { UserRole } from '../types';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  userRole: UserRole;
  className?: string;
  headerAction?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function DashboardCard({ 
  title, 
  children, 
  userRole, 
  className = '', 
  headerAction,
  icon: Icon 
}: DashboardCardProps) {
  const getRoleColors = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          border: 'border-student-200',
          header: 'bg-gradient-to-r from-student-50 to-blue-50',
          accent: 'text-student-600',
          iconBg: 'bg-student-100',
          iconText: 'text-student-600'
        };
      case 'teacher':
        return {
          border: 'border-teacher-200',
          header: 'bg-gradient-to-r from-teacher-50 to-orange-50',
          accent: 'text-teacher-600',
          iconBg: 'bg-teacher-100',
          iconText: 'text-teacher-600'
        };
      case 'admin':
        return {
          border: 'border-admin-200',
          header: 'bg-gradient-to-r from-admin-50 to-purple-50',
          accent: 'text-admin-600',
          iconBg: 'bg-admin-100',
          iconText: 'text-admin-600'
        };
      default:
        return {
          border: 'border-gray-200',
          header: 'bg-gray-50',
          accent: 'text-gray-600',
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600'
        };
    }
  };

  const colors = getRoleColors(userRole);

  return (
    <div className={`bg-white rounded-xl shadow-sm ${colors.border} border hover:shadow-md transition-all duration-200 animate-fade-in ${className}`}>
      <div className={`px-6 py-4 ${colors.header} rounded-t-xl border-b border-gray-100`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                <Icon className={`h-5 w-5 ${colors.iconText}`} />
              </div>
            )}
            <h3 className={`text-lg font-semibold ${colors.accent}`}>{title}</h3>
          </div>
          {headerAction}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
