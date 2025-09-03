import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BookOpenIcon, CalendarIcon, ChartBarIcon, ClockIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const courses = [
  {
    id: 1,
    name: 'Web Development',
    code: 'CS-401',
    instructor: 'Dr. Smith',
    credits: 3,
    schedule: 'Mon, Wed 09:00 AM - 10:30 AM',
    progress: 75,
    color: 'indigo',
  },
  {
    id: 2,
    name: 'Database Systems',
    code: 'CS-402',
    instructor: 'Prof. Johnson',
    credits: 4,
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
    progress: 60,
    color: 'green',
  },
  {
    id: 3,
    name: 'Algorithms',
    code: 'CS-403',
    instructor: 'Dr. Williams',
    credits: 3,
    schedule: 'Mon, Wed, Fri 01:00 PM - 02:00 PM',
    progress: 45,
    color: 'blue',
  },
  {
    id: 4,
    name: 'Computer Networks',
    code: 'CS-404',
    instructor: 'Prof. Brown',
    credits: 3,
    schedule: 'Tue, Thu 02:00 PM - 03:30 PM',
    progress: 30,
    color: 'purple',
  },
  {
    id: 5,
    name: 'Software Engineering',
    code: 'CS-405',
    instructor: 'Dr. Davis',
    credits: 4,
    schedule: 'Mon, Wed 04:00 PM - 05:30 PM',
    progress: 15,
    color: 'pink',
  },
];

const resources = [
  { name: 'Syllabus', icon: DocumentTextIcon, href: '#' },
  { name: 'Assignments', icon: BookOpenIcon, href: '#' },
  { name: 'Grades', icon: ChartBarIcon, href: '#' },
  { name: 'Schedule', icon: CalendarIcon, href: '#' },
  { name: 'Classmates', icon: UserGroupIcon, href: '#' },
];

const colors = {
  indigo: 'bg-indigo-100 text-indigo-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  pink: 'bg-pink-100 text-pink-800',
};

export default function Courses() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
        <p className="mt-1 text-sm text-gray-500">View and manage your current courses</p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.code}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[course.color as keyof typeof colors]}`}>
                  {course.credits} Credits
                </span>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <UserGroupIcon className="flex-shrink-0 w-4 h-4 mr-1.5" />
                  {course.instructor}
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <ClockIcon className="flex-shrink-0 w-4 h-4 mr-1.5" />
                  {course.schedule}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${course.progress > 70 ? 'bg-green-500' : course.progress > 40 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-5 gap-2">
                  {resources.map((resource) => (
                    <Link
                      key={resource.name}
                      to={resource.href}
                      className="flex flex-col items-center p-2 text-sm text-center text-gray-600 rounded-md hover:bg-gray-50"
                      title={resource.name}
                    >
                      <resource.icon className="w-5 h-5 text-gray-500" />
                      <span className="mt-1 text-xs truncate">{resource.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <AcademicCapIcon className="w-5 h-5 mr-2 -ml-1" />
          Add Course
        </button>
      </div>
    </div>
  );
}
