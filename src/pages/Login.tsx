import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { AcademicCapIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

  const getRoleTheme = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          background: 'bg-gradient-to-br from-student-50 via-blue-50 to-white',
          iconBg: 'bg-student-500',
          buttonPrimary: 'bg-student-600 hover:bg-student-700 focus:ring-student-500',
          accent: 'border-student-500 bg-student-50 text-student-700'
        };
      case 'teacher':
        return {
          background: 'bg-gradient-to-br from-teacher-50 via-orange-50 to-white',
          iconBg: 'bg-teacher-500',
          buttonPrimary: 'bg-teacher-600 hover:bg-teacher-700 focus:ring-teacher-500',
          accent: 'border-teacher-500 bg-teacher-50 text-teacher-700'
        };
      case 'admin':
        return {
          background: 'bg-gradient-to-br from-admin-50 via-purple-50 to-white',
          iconBg: 'bg-admin-500',
          buttonPrimary: 'bg-admin-600 hover:bg-admin-700 focus:ring-admin-500',
          accent: 'border-admin-500 bg-admin-50 text-admin-700'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
          iconBg: 'bg-blue-600',
          buttonPrimary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          accent: 'border-blue-500 bg-blue-50 text-blue-700'
        };
    }
  };

  const theme = getRoleTheme(selectedRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password, selectedRole);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const demoCredentials = {
    student: { email: 'john.doe@student.edu', password: 'password123' },
    teacher: { email: 'sarah.smith@teacher.edu', password: 'password123' },
    admin: { email: 'admin@university.edu', password: 'password123' }
  };

  const fillDemoCredentials = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.background} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`mx-auto h-16 w-16 ${theme.iconBg} rounded-full flex items-center justify-center`}>
            <AcademicCapIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            EduPortal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Select your role
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['student', 'teacher', 'admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                    selectedRole === role
                      ? theme.accent
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {role === 'student' && <UserIcon className="h-6 w-6 mb-1" />}
                  {role === 'teacher' && <AcademicCapIcon className="h-6 w-6 mb-1" />}
                  {role === 'admin' && <CogIcon className="h-6 w-6 mb-1" />}
                  <span className="text-xs font-medium capitalize">{role}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${theme.buttonPrimary.includes('student') ? 'focus:ring-student-500 focus:border-student-500' : theme.buttonPrimary.includes('teacher') ? 'focus:ring-teacher-500 focus:border-teacher-500' : 'focus:ring-admin-500 focus:border-admin-500'}`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none ${theme.buttonPrimary.includes('student') ? 'focus:ring-student-500 focus:border-student-500' : theme.buttonPrimary.includes('teacher') ? 'focus:ring-teacher-500 focus:border-teacher-500' : 'focus:ring-admin-500 focus:border-admin-500'}`}
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${theme.buttonPrimary} focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 text-center">Demo Credentials</p>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'teacher', 'admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => fillDemoCredentials(role)}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 capitalize"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
