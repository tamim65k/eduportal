import { User, UserRole } from '../types';

// Demo users for different roles
const DEMO_USERS: Record<string, User> = {
  'student@demo.com': {
    id: '1',
    email: 'student@demo.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    studentId: 'STU2024001',
    grade: 'Computer Science - Year 3',
    bio: 'Passionate about web development and AI',
    phone: '+1 (555) 123-4567',
    joinDate: '2022-09-01',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  'teacher@demo.com': {
    id: '2',
    email: 'teacher@demo.com',
    firstName: 'Dr. Sarah',
    lastName: 'Smith',
    role: 'teacher',
    employeeId: 'TCH2020001',
    department: 'Computer Science',
    bio: 'Professor of Web Development and Software Engineering',
    phone: '+1 (555) 234-5678',
    joinDate: '2020-08-15',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  'admin@demo.com': {
    id: '3',
    email: 'admin@demo.com',
    firstName: 'Michael',
    lastName: 'Johnson',
    role: 'admin',
    employeeId: 'ADM2019001',
    department: 'Administration',
    bio: 'System Administrator',
    phone: '+1 (555) 345-6789',
    joinDate: '2019-01-10',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }
};

// Demo password for all demo accounts
const DEMO_PASSWORD = 'demo123';

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;

  private constructor() {
    this.loadAuthData();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadAuthData() {
    const userData = localStorage.getItem('user');
    this.token = localStorage.getItem('auth_token');
    this.user = userData ? JSON.parse(userData) : null;
  }

  private saveAuthData(user: User) {
    // Generate a simple token for demo purposes
    this.token = `demo-token-${user.id}-${Date.now()}`;
    this.user = user;
    
    localStorage.setItem('auth_token', this.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public clearAuthData() {
    this.token = null;
    this.user = null;
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  public getToken(): string | null {
    return this.token;
  }

  public getUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public async login(email: string, password: string, role: UserRole): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        try {
          // Check if this is a demo user
          const user = DEMO_USERS[email];
          
          if (!user) {
            throw new Error('User not found');
          }
          
          // Check if the role matches
          if (user.role !== role) {
            throw new Error(`Please select ${user.role} role`);
          }
          
          // Check password (in a real app, this would be hashed and verified on the server)
          if (password !== DEMO_PASSWORD) {
            throw new Error('Invalid password');
          }
          
          // Save user data
          this.saveAuthData(user);
          resolve(user);
          
        } catch (error) {
          console.error('Login error:', error);
          reject(error instanceof Error ? error : new Error('Login failed'));
        }
      }, 800); // Simulate network delay
    });
  }

  public async refreshAuthToken(): Promise<string> {
    return new Promise((resolve) => {
      // In a real app, this would make an API call to refresh the token
      // For demo, we'll just return the current token or generate a new one
      if (this.token) {
        resolve(this.token);
      } else {
        this.token = `demo-token-${Date.now()}`;
        localStorage.setItem('auth_token', this.token);
        resolve(this.token);
      }
    });
  }

  public async logout(): Promise<void> {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        this.clearAuthData();
        resolve();
      }, 300);
    });
  }
}

// For demo purposes, we'll expose the instance for easier testing
const authService = AuthService.getInstance();

// Add to window for testing in browser console
if (process.env.NODE_ENV === 'development') {
  (window as any).authService = authService;
}

export default authService;
