import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  CogIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ServerIcon,
  CircleStackIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import DashboardCard from './DashboardCard';

export default function AdminDashboard() {
  const systemMetrics = [
    { name: 'CPU Usage', value: '45%', status: 'good' },
    { name: 'Memory', value: '67%', status: 'warning' },
    { name: 'Storage', value: '23%', status: 'good' },
    { name: 'Network', value: '12ms', status: 'good' },
  ];

  const recentActivities = [
    { action: 'New student registered', user: 'John Smith', time: '2 minutes ago', type: 'user' },
    { action: 'Course created', user: 'Dr. Johnson', time: '15 minutes ago', type: 'course' },
    { action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { action: 'Grade report generated', user: 'Prof. Davis', time: '2 hours ago', type: 'report' },
  ];

  const userBreakdown = [
    { role: 'Students', count: 1156, change: '+23', color: 'bg-blue-500' },
    { role: 'Teachers', count: 78, change: '+2', color: 'bg-green-500' },
    { role: 'Admins', count: 13, change: '0', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* System Health Overview */}
      <DashboardCard
        title="🔧 System Health"
        userRole="admin"
        icon={ServerIcon}
        headerAction={
          <Link to="/admin" className="text-sm font-medium text-admin-600 hover:text-admin-500">
            View details
          </Link>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full mb-2 ${
                metric.status === 'good' ? 'bg-green-100 text-green-600' :
                metric.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  metric.status === 'good' ? 'bg-green-500' :
                  metric.status === 'warning' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
              </div>
              <p className="text-sm font-medium text-gray-900">{metric.name}</p>
              <p className="text-lg font-bold text-admin-600">{metric.value}</p>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* User Management Overview */}
      <DashboardCard
        title="👥 User Overview"
        userRole="admin"
        icon={UserGroupIcon}
        headerAction={
          <Link to="/admin" className="text-sm font-medium text-admin-600 hover:text-admin-500">
            Manage users
          </Link>
        }
      >
        <div className="space-y-4">
          {userBreakdown.map((userType, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${userType.color}`}></div>
                <span className="text-sm font-medium text-gray-900">{userType.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-admin-600">{userType.count}</span>
                <span className="text-xs text-green-600 font-medium">{userType.change}</span>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-admin-500 text-white text-sm font-medium rounded-lg hover:bg-admin-600 transition-colors duration-200">
              Add New User
            </button>
          </div>
        </div>
      </DashboardCard>

      {/* Recent System Activities */}
      <DashboardCard
        title="📋 Recent Activities"
        userRole="admin"
        icon={ClockIcon}
      >
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150">
              <div className={`p-2 rounded-lg ${
                activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'course' ? 'bg-green-100 text-green-600' :
                activity.type === 'system' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {activity.type === 'user' && <UserGroupIcon className="h-4 w-4" />}
                {activity.type === 'course' && <AcademicCapIcon className="h-4 w-4" />}
                {activity.type === 'system' && <CogIcon className="h-4 w-4" />}
                {activity.type === 'report' && <ChartBarIcon className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Quick Admin Actions */}
      <DashboardCard
        title="⚡ Quick Actions"
        userRole="admin"
        icon={CogIcon}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-admin-50 rounded-lg hover:bg-admin-100 transition-colors duration-150 text-left">
            <UserGroupIcon className="h-6 w-6 text-admin-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Bulk User Import</p>
              <p className="text-xs text-gray-500">Import from CSV/Excel</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-admin-50 rounded-lg hover:bg-admin-100 transition-colors duration-150 text-left">
            <ChartBarIcon className="h-6 w-6 text-admin-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Generate Report</p>
              <p className="text-xs text-gray-500">System analytics</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-admin-50 rounded-lg hover:bg-admin-100 transition-colors duration-150 text-left">
            <CircleStackIcon className="h-6 w-6 text-admin-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Database Backup</p>
              <p className="text-xs text-gray-500">Manual backup</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-admin-50 rounded-lg hover:bg-admin-100 transition-colors duration-150 text-left">
            <CogIcon className="h-6 w-6 text-admin-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">System Settings</p>
              <p className="text-xs text-gray-500">Configure platform</p>
            </div>
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}
