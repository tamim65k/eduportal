import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockUsers, mockCourses, mockAnnouncements } from '../data/mockData';
import { 
  UsersIcon,
  AcademicCapIcon,
  MegaphoneIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  
  const handleCreateUser = () => {
    // Create user logic here
  };

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'users', name: 'User Management', icon: UsersIcon },
    { id: 'courses', name: 'Course Management', icon: AcademicCapIcon },
    { id: 'announcements', name: 'Announcements', icon: MegaphoneIcon },
    { id: 'settings', name: 'System Settings', icon: CogIcon }
  ];

  const getUserStats = () => {
    const students = mockUsers.filter(u => u.role === 'student').length;
    const teachers = mockUsers.filter(u => u.role === 'teacher').length;
    const admins = mockUsers.filter(u => u.role === 'admin').length;
    
    return { students, teachers, admins, total: students + teachers + admins };
  };

  const stats = getUserStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-500">Manage users, courses, and system settings</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.students}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UsersIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Teachers</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.teachers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AcademicCapIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{mockCourses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                <button
                  onClick={handleCreateUser}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {user.avatar ? (
                                <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {user.firstName[0]}{user.lastName[0]}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.studentId || user.employeeId || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'teacher' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Course Management</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Course
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{course.name}</h4>
                      <span className="text-sm text-gray-500">{course.code}</span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Instructor: {course.instructor.firstName} {course.instructor.lastName}</p>
                      <p>Credits: {course.credits}</p>
                      <p>Schedule: {course.schedule}</p>
                      <p>Enrolled: {mockUsers.filter(u => u.role === 'student').length} students</p>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">System Announcements</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Announcement
                </button>
              </div>
              
              <div className="space-y-4">
                {mockAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-medium text-gray-900">{announcement.title}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                            announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {announcement.priority}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">{announcement.content}</p>
                        <p className="mt-2 text-sm text-gray-500">
                          Posted on {new Date(announcement.publishDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="text-gray-600 hover:text-gray-900">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">System Settings</h3>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Academic Year Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                      <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>Fall 2024</option>
                        <option>Spring 2025</option>
                        <option>Summer 2025</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                      <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>2024-2025</option>
                        <option>2025-2026</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Notification Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Email notifications for new assignments</span>
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">SMS reminders for exams</span>
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Weekly attendance reports</span>
                      <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">System Maintenance</h4>
                  <div className="space-y-4">
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <div className="font-medium text-gray-900">Database Backup</div>
                      <div className="text-sm text-gray-500">Last backup: 2 hours ago</div>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <div className="font-medium text-gray-900">System Health Check</div>
                      <div className="text-sm text-gray-500">All systems operational</div>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <div className="font-medium text-gray-900">Clear Cache</div>
                      <div className="text-sm text-gray-500">Improve system performance</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
