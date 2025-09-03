import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  ClockIcon,
  AcademicCapIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import DashboardCard from './DashboardCard';
import { mockCourses, mockAssignments } from '../data/mockData';

export default function TeacherDashboard() {
  const pendingSubmissions = [
    { course: 'Web Development', count: 8, urgent: 2 },
    { course: 'Database Systems', count: 5, urgent: 1 },
    { course: 'Software Engineering', count: 3, urgent: 0 },
  ];

  const todaysClasses = [
    { name: 'Web Development', time: '09:00 AM', students: 28, room: 'A-302' },
    { name: 'Database Systems', time: '11:00 AM', students: 24, room: 'B-205' },
    { name: 'Web Dev Lab', time: '02:00 PM', students: 15, room: 'Lab-3' },
  ];

  return (
    <div className="space-y-8">
      {/* Today's Teaching Schedule */}
      <DashboardCard
        title="📅 Today's Classes"
        userRole="teacher"
        icon={ClockIcon}
        headerAction={
          <Link to="/schedule" className="text-sm font-medium text-teacher-600 hover:text-teacher-500">
            View full schedule
          </Link>
        }
      >
        <div className="space-y-4">
          {todaysClasses.map((classItem, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-teacher-50 rounded-lg hover:bg-teacher-100 transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-teacher-400"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{classItem.name}</p>
                  <p className="text-xs text-gray-500">{classItem.time} • {classItem.room}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-teacher-600 font-medium">{classItem.students} students</span>
                <button className="px-3 py-1 bg-teacher-500 text-white text-xs font-medium rounded-md hover:bg-teacher-600 transition-colors duration-200">
                  Start Class
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Pending Submissions */}
      <DashboardCard
        title="📤 Pending Submissions"
        userRole="teacher"
        icon={DocumentTextIcon}
        headerAction={
          <Link to="/grades" className="text-sm font-medium text-teacher-600 hover:text-teacher-500">
            Grade all
          </Link>
        }
      >
        <div className="space-y-4">
          {pendingSubmissions.map((submission, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teacher-100 rounded-lg">
                  <DocumentTextIcon className="h-5 w-5 text-teacher-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{submission.course}</p>
                  <p className="text-xs text-gray-500">{submission.count} submissions pending</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {submission.urgent > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {submission.urgent} urgent
                  </span>
                )}
                <button className="px-3 py-1 bg-teacher-500 text-white text-xs font-medium rounded-md hover:bg-teacher-600 transition-colors duration-200">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Class Performance Analytics */}
      <DashboardCard
        title="📊 Class Performance Analytics"
        userRole="teacher"
        icon={ChartBarIcon}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-teacher-700">Average Grades by Course</h4>
            {mockCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{course.name}</span>
                  <span className="text-teacher-600 font-semibold">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-teacher-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-teacher-700">Attendance Trends</h4>
            <div className="bg-teacher-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">This Week</span>
                <span className="text-sm font-bold text-teacher-600">92%</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Last Week</span>
                <span className="text-sm text-gray-500">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Month Average</span>
                <span className="text-sm text-gray-500">87%</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
