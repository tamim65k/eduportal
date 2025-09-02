import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@student.edu',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    studentId: 'STU2024001',
    grade: 'Computer Science - Year 3',
    bio: 'Passionate about web development and AI',
    phone: '+1 (555) 123-4567',
    joinDate: '2022-09-01'
  },
  {
    id: '2',
    email: 'sarah.smith@teacher.edu',
    firstName: 'Dr. Sarah',
    lastName: 'Smith',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    employeeId: 'TCH2020001',
    department: 'Computer Science',
    bio: 'Professor of Web Development and Software Engineering',
    phone: '+1 (555) 234-5678',
    joinDate: '2020-08-15'
  },
  {
    id: '3',
    email: 'admin@university.edu',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    employeeId: 'ADM2019001',
    department: 'Administration',
    bio: 'System Administrator',
    phone: '+1 (555) 345-6789',
    joinDate: '2019-01-10'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
