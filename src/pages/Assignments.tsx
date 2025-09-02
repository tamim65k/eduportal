import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockAssignments, mockCourses } from '../data/mockData';
import { Assignment } from '../types';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';

export default function Assignments() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const getStatusColor = (dueDate: string, submitted: boolean) => {
    const due = new Date(dueDate);
    const now = new Date();
    const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (submitted) return 'text-green-600 bg-green-50';
    if (hoursUntilDue < 0) return 'text-red-600 bg-red-50';
    if (hoursUntilDue < 24) return 'text-yellow-600 bg-yellow-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getStatusText = (dueDate: string, submitted: boolean) => {
    const due = new Date(dueDate);
    const now = new Date();
    const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (submitted) return 'Submitted';
    if (hoursUntilDue < 0) return 'Overdue';
    if (hoursUntilDue < 24) return 'Due Soon';
    return 'Pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assignments</h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.role === 'student' ? 'View and submit your assignments' : 'Manage course assignments'}
          </p>
        </div>
        
        {user?.role === 'teacher' && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Assignment
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Assignments' },
            { key: 'pending', label: 'Pending' },
            { key: 'submitted', label: 'Submitted' },
            { key: 'graded', label: 'Graded' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Assignments List */}
      <div className="grid gap-6">
        {mockAssignments.map((assignment) => {
          const course = mockCourses.find(c => c.id === assignment.courseId);
          const isSubmitted = Math.random() > 0.5; // Demo data
          
          return (
            <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.dueDate, isSubmitted)}`}>
                      {getStatusText(assignment.dueDate, isSubmitted)}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <DocumentTextIcon className="h-4 w-4 mr-1" />
                      {course?.name}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span>{assignment.maxPoints} points</span>
                  </div>
                  
                  <p className="mt-3 text-gray-600">{assignment.description}</p>
                  
                  {assignment.attachments.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((file, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            <DocumentTextIcon className="h-3 w-3 mr-1" />
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-6 flex flex-col space-y-2">
                  {user?.role === 'student' && !isSubmitted && (
                    <button
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowUploadModal(true);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <ArrowUpTrayIcon className="h-4 w-4 mr-1" />
                      Submit
                    </button>
                  )}
                  
                  {user?.role === 'student' && isSubmitted && (
                    <div className="flex items-center text-green-600">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Submitted</span>
                    </div>
                  )}
                  
                  {user?.role === 'teacher' && (
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                        View Submissions ({assignment.submissions.length})
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                        Edit Assignment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Submit Assignment: {selectedAssignment?.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Files
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Drag and drop files here, or click to select
                    </p>
                    <input type="file" multiple className="hidden" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add any comments about your submission..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    // Handle submission logic here
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
