import React, { Fragment, useState } from 'react';
import { AcademicCapIcon, ArrowDownIcon, ArrowUpIcon, BookOpenIcon, ChartBarIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

const semesters = [
  { id: 'fall-2025', name: 'Fall 2025' },
  { id: 'summer-2025', name: 'Summer 2025' },
  { id: 'spring-2025', name: 'Spring 2025' },
  { id: 'fall-2024', name: 'Fall 2024' },
];

const courses = [
  {
    id: 1,
    code: 'CS-401',
    name: 'Web Development',
    instructor: 'Dr. Smith',
    credits: 3,
    grade: 'A',
    gpa: 4.0,
    assignments: [
      { id: 1, name: 'Project 1', score: 95, maxScore: 100, weight: 15 },
      { id: 2, name: 'Quiz 1', score: 18, maxScore: 20, weight: 10 },
      { id: 3, name: 'Midterm Exam', score: 88, maxScore: 100, weight: 25 },
      { id: 4, name: 'Project 2', score: 92, maxScore: 100, weight: 15 },
      { id: 5, name: 'Final Exam', score: 91, maxScore: 100, weight: 35 },
    ],
  },
  {
    id: 2,
    code: 'CS-402',
    name: 'Database Systems',
    instructor: 'Prof. Johnson',
    credits: 4,
    grade: 'A-',
    gpa: 3.7,
    assignments: [
      { id: 1, name: 'ER Diagram', score: 46, maxScore: 50, weight: 10 },
      { id: 2, name: 'SQL Queries', score: 28, maxScore: 30, weight: 15 },
      { id: 3, name: 'Midterm Exam', score: 85, maxScore: 100, weight: 25 },
      { id: 4, name: 'Database Design', score: 90, maxScore: 100, weight: 20 },
      { id: 5, name: 'Final Project', score: 88, maxScore: 100, weight: 30 },
    ],
  },
  {
    id: 3,
    code: 'CS-403',
    name: 'Algorithms',
    instructor: 'Dr. Williams',
    credits: 3,
    grade: 'B+',
    gpa: 3.3,
    assignments: [
      { id: 1, name: 'Sorting Algorithms', score: 42, maxScore: 50, weight: 15 },
      { id: 2, name: 'Graph Theory', score: 27, maxScore: 30, weight: 15 },
      { id: 3, name: 'Midterm Exam', score: 78, maxScore: 100, weight: 30 },
      { id: 4, name: 'Dynamic Programming', score: 45, maxScore: 50, weight: 15 },
      { id: 5, name: 'Final Exam', score: 82, maxScore: 100, weight: 25 },
    ],
  },
  {
    id: 4,
    code: 'MATH-301',
    name: 'Discrete Mathematics',
    instructor: 'Prof. Brown',
    credits: 4,
    grade: 'B',
    gpa: 3.0,
    assignments: [
      { id: 1, name: 'Logic', score: 44, maxScore: 50, weight: 10 },
      { id: 2, name: 'Set Theory', score: 26, maxScore: 30, weight: 15 },
      { id: 3, name: 'Midterm Exam', score: 75, maxScore: 100, weight: 25 },
      { id: 4, name: 'Graph Theory', score: 42, maxScore: 50, weight: 15 },
      { id: 5, name: 'Final Exam', score: 78, maxScore: 100, weight: 35 },
    ],
  },
  {
    id: 5,
    code: 'ENG-201',
    name: 'Technical Writing',
    instructor: 'Dr. Davis',
    credits: 3,
    grade: 'A-',
    gpa: 3.7,
    assignments: [
      { id: 1, name: 'Research Paper', score: 47, maxScore: 50, weight: 20 },
      { id: 2, name: 'Technical Report', score: 28, maxScore: 30, weight: 20 },
      { id: 3, name: 'Presentation', score: 90, maxScore: 100, weight: 20 },
      { id: 4, name: 'Final Project', score: 88, maxScore: 100, weight: 40 },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function getGPA(grade: string) {
  const gradeMap: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0,
  };
  return gradeMap[grade] || 0;
}

export default function Grades() {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'code', 
    direction: 'asc' 
  });

  // Calculate overall GPA
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalGradePoints = courses.reduce(
    (sum, course) => sum + (getGPA(course.grade) * course.credits),
    0
  );
  const overallGPA = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

  // Sort courses
  const sortedCourses = [...courses].sort((a, b) => {
    if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter courses based on search term
  const filteredCourses = sortedCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-green-600 bg-green-100';
    if (grade.includes('B')) return 'text-blue-600 bg-blue-100';
    if (grade.includes('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.includes('D') || grade === 'F') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Grades</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your academic progress and performance
          </p>
        </div>
        
        <div className="flex items-center mt-4 space-x-3 sm:mt-0
        ">
          <div className="relative">
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center justify-center w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                {selectedSemester.name}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {semesters.map((semester) => (
                      <Menu.Item key={semester.id}>
                        {({ active }) => (
                          <button
                            onClick={() => setSelectedSemester(semester)}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-sm text-left'
                            )}
                          >
                            {semester.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <BookOpenIcon className="w-5 h-5 mr-2 -ml-1" />
            Request Transcript
          </button>
        </div>
      </div>

      {/* GPA Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-primary-100">
                <AcademicCapIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Current GPA</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {overallGPA.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
                <ChartBarIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Credits Completed</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {totalCredits}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-blue-100">
                <ChartBarIcon className="w-6 h-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">Semester GPA</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {overallGPA.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col justify-between mt-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-10 pr-3 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FunnelIcon className="w-4 h-4 mr-2 text-gray-400" />
              {sortConfig.key === 'code' ? 'Course Code' : 
               sortConfig.key === 'name' ? 'Course Name' : 'Instructor'}
              {sortConfig.direction === 'asc' ? (
                <ArrowUpIcon className="w-4 h-4 ml-1 text-gray-400" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 ml-1 text-gray-400" />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => requestSort('code')}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-sm text-left'
                        )}
                      >
                        Course Code
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => requestSort('name')}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-sm text-left'
                        )}
                      >
                        Course Name
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => requestSort('instructor')}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-sm text-left'
                        )}
                      >
                        Instructor
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Course List */}
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const totalScore = course.assignments.reduce((sum, a) => sum + (a.score / a.maxScore) * a.weight, 0);
              const percentage = Math.round(totalScore * 10) / 10;
              
              return (
                <li key={course.id} className="hover:bg-gray-50">
                  <div 
                    className="px-4 py-4 sm:px-6"
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-primary-600 truncate">
                            {course.code} - {course.name}
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 ml-2 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {course.instructor}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                        <p className="mt-1 text-sm text-gray-500">
                          {percentage}%
                        </p>
                      </div>
                    </div>
                    
                    {expandedCourse === course.id && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Assignments & Grades</h4>
                        <div className="mt-2 overflow-hidden border border-gray-200 rounded-md">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                  Assignment
                                </th>
                                <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                                  Score
                                </th>
                                <th scope="col" className="px-3 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                                  Weight
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {course.assignments.map((assignment) => (
                                <tr key={assignment.id}>
                                  <td className="px-3 py-3 text-sm text-gray-900 whitespace-nowrap">
                                    {assignment.name}
                                  </td>
                                  <td className="px-3 py-3 text-sm text-right text-gray-500 whitespace-nowrap">
                                    {assignment.score} / {assignment.maxScore} ({Math.round((assignment.score / assignment.maxScore) * 100)}%)
                                  </td>
                                  <td className="px-3 py-3 text-sm text-right text-gray-500 whitespace-nowrap">
                                    {assignment.weight}%
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-gray-50">
                                <td className="px-3 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                                  Total
                                </td>
                                <td className="px-3 py-3 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                  {percentage}%
                                </td>
                                <td className="px-3 py-3 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                  {course.grade}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-12 text-center">
              <AcademicCapIcon className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'No courses available for this semester.'}
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
