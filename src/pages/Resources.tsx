import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockCourses } from '../data/mockData';
import { CourseMaterial } from '../types';
import { 
  DocumentTextIcon,
  VideoCameraIcon,
  LinkIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function Resources() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const allMaterials = mockCourses.flatMap(course => 
    course.materials.map(material => ({
      ...material,
      courseName: course.name,
      courseCode: course.code
    }))
  );

  const filteredMaterials = allMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || mockCourses.find(c => c.materials.some(m => m.id === material.id))?.id === selectedCourse;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    
    return matchesSearch && matchesCourse && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <DocumentTextIcon className="h-5 w-5" />;
      case 'video':
        return <VideoCameraIcon className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <FolderIcon className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return 'text-red-600 bg-red-50';
      case 'video':
        return 'text-purple-600 bg-purple-50';
      case 'link':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Resources</h1>
          <p className="mt-1 text-sm text-gray-500">
            {user?.role === 'student' ? 'Access course materials and resources' : 'Manage course resources'}
          </p>
        </div>
        
        {user?.role === 'teacher' && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Upload Resource
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF Documents</option>
              <option value="video">Videos</option>
              <option value="link">Links</option>
              <option value="document">Documents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>
                  {getTypeIcon(material.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {material.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {material.courseName} ({material.courseCode})
                  </p>
                </div>
              </div>
              
              <button
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                title="Download"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>Uploaded: {new Date(material.uploadDate).toLocaleDateString()}</span>
              {material.size && <span>{material.size}</span>}
            </div>
            
            <div className="mt-4">
              <button
                className="w-full text-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {material.type === 'link' ? 'Open Link' : 'View Resource'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'No resources have been uploaded yet'}
          </p>
        </div>
      )}
    </div>
  );
}
