import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockExams, mockCourses } from '../data/mockData';
import { 
  ClockIcon,
  DocumentTextIcon,
  PlayIcon,
  CheckCircleIcon,
  PlusIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function Exams() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getExamStatusColor = (examDate: string) => {
    const exam = new Date(examDate);
    const now = new Date();
    const hoursUntilExam = (exam.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilExam < 0) return 'bg-gray-100 text-gray-800';
    if (hoursUntilExam < 24) return 'bg-red-100 text-red-800';
    if (hoursUntilExam < 72) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getExamStatus = (examDate: string) => {
    const exam = new Date(examDate);
    const now = new Date();
    const hoursUntilExam = (exam.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilExam < 0) return 'Completed';
    if (hoursUntilExam < 24) return 'Tomorrow';
    if (hoursUntilExam < 72) return 'This Week';
    return 'Upcoming';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Exams & Quizzes</h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.role === 'student' ? 'View and take your exams' : 'Create and manage exams'}
          </p>
        </div>
        
        {user?.role === 'teacher' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Exam
          </button>
        )}
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExams.map((exam) => {
          const course = mockCourses.find(c => c.id === exam.courseId);
          const examDate = new Date(exam.date);
          const isPast = examDate < new Date();
          
          return (
            <div key={exam.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">{course?.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {examDate.toLocaleDateString()} at {examDate.toLocaleTimeString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <DocumentTextIcon className="h-4 w-4 mr-1" />
                      {exam.duration} minutes • {exam.totalMarks} marks
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getExamStatusColor(exam.date)}`}>
                      {getExamStatus(exam.date)}
                    </span>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      exam.type === 'final' ? 'bg-red-100 text-red-800' :
                      exam.type === 'midterm' ? 'bg-orange-100 text-orange-800' :
                      exam.type === 'quiz' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                {user?.role === 'student' && !isPast && (
                  <button
                    onClick={() => { /* Handle exam click */ }}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Start Exam
                  </button>
                )}
                
                {user?.role === 'student' && isPast && (
                  <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    View Results
                  </button>
                )}
                
                {user?.role === 'teacher' && (
                  <>
                    <button className="flex-1 text-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md border border-blue-200">
                      View Results
                    </button>
                    <button className="flex-1 text-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md border border-gray-200">
                      Edit Exam
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Exam Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Exam</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter exam title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a course</option>
                    {mockCourses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="120"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Create Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
