import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockCourses, mockAttendance, mockGrades, mockUsers } from '../data/mockData';
import { 
  ChartBarIcon,
  DocumentChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export default function Reports() {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState('performance');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const reportTypes = [
    { id: 'performance', name: 'Student Performance', icon: ChartBarIcon },
    { id: 'attendance', name: 'Attendance Report', icon: UsersIcon },
    { id: 'course', name: 'Course Analytics', icon: AcademicCapIcon },
    { id: 'grades', name: 'Grade Distribution', icon: DocumentChartBarIcon }
  ];

  const generatePerformanceData = () => {
    return mockUsers
      .filter(u => u.role === 'student')
      .map(student => {
        const studentGrades = mockGrades.filter(g => g.studentId === student.id);
        const avgGrade = studentGrades.reduce((sum, g) => sum + g.percentage, 0) / studentGrades.length || 0;
        const attendance = mockAttendance.filter(a => a.studentId === student.id);
        const attendanceRate = (attendance.filter(a => a.status === 'present').length / attendance.length) * 100 || 0;
        
        return {
          student: `${student.firstName} ${student.lastName}`,
          avgGrade: avgGrade.toFixed(1),
          attendance: attendanceRate.toFixed(1),
          totalAssignments: studentGrades.length
        };
      });
  };

  const performanceData = generatePerformanceData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.role === 'admin' ? 'System-wide analytics and reports' : 'Course performance and analytics'}
          </p>
        </div>
        
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <report.icon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium text-center">{report.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Courses</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="current">Current Semester</option>
              <option value="last">Last Semester</option>
              <option value="year">Academic Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="table">Table View</option>
              <option value="chart">Chart View</option>
              <option value="summary">Summary</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {selectedReport === 'performance' && (
          <div>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Student Performance Report</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {performanceData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.student}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          parseFloat(data.avgGrade) >= 90 ? 'bg-green-100 text-green-800' :
                          parseFloat(data.avgGrade) >= 80 ? 'bg-blue-100 text-blue-800' :
                          parseFloat(data.avgGrade) >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {data.avgGrade}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          parseFloat(data.attendance) >= 90 ? 'bg-green-100 text-green-800' :
                          parseFloat(data.attendance) >= 75 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {data.attendance}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.totalAssignments}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'attendance' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">87%</div>
                <div className="text-sm text-green-700 mt-1">Average Attendance</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">156</div>
                <div className="text-sm text-blue-700 mt-1">Total Classes</div>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">23</div>
                <div className="text-sm text-yellow-700 mt-1">Students Below 75%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
