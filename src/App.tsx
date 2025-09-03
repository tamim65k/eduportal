import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import AccessibilityPanel from './components/AccessibilityPanel';
import FloatingActionButton from './components/FloatingActionButton';
import GlassmorphismSidebar from './components/GlassmorphismSidebar';
import GlassmorphismHeader from './components/GlassmorphismHeader';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Grades from './pages/Grades';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Assignments from './pages/Assignments';
import Messages from './pages/Messages';
import Attendance from './pages/Attendance';
import Resources from './pages/Resources';
import Exams from './pages/Exams';
import Reports from './pages/Reports';
import Admin from './pages/Admin';

// Loading component for theme initialization
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function AppContent() {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isInitialized: isThemeInitialized } = useTheme();
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  const toggleAccessibilityPanel = useCallback(() => {
    setAccessibilityOpen(prev => !prev);
  }, []);

  // Show loading screen while auth and theme are initializing
  if (isAuthLoading || !isThemeInitialized) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  const getRoleBackground = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-gradient-to-br from-student-50 via-blue-50 to-white';
      case 'teacher':
        return 'bg-gradient-to-br from-teacher-50 via-orange-50 to-white';
      case 'admin':
        return 'bg-gradient-to-br from-admin-50 via-purple-50 to-white';
      default:
        return 'bg-gradient-to-br from-blue-50 to-indigo-100';
    }
  };

  return (
    <div className={`min-h-screen ${getRoleBackground(user.role)}`}>
      <div className="flex h-screen">
        {/* Glassmorphism Sidebar */}
        <GlassmorphismSidebar />
        
        {/* Glassmorphism Header */}
        <GlassmorphismHeader />

        {/* Main content area */}
        <main className="flex-1 ml-80 pt-24 pb-6 px-6 overflow-y-auto">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/reports" element={<Reports />} />
              {user.role === 'admin' && (
                <>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/users" element={<Admin />} />
                </>
              )}
              <Route path="/settings" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
      
      <AccessibilityPanel 
        isOpen={accessibilityOpen} 
        onClose={() => setAccessibilityOpen(false)} 
      />
      
      <FloatingActionButton 
        userRole={user.role} 
        onAccessibilityClick={toggleAccessibilityPanel}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
