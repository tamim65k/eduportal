// User roles and types
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  studentId?: string; // For students
  employeeId?: string; // For teachers/admin
  grade?: string; // For students
  department?: string; // For teachers
  bio?: string;
  phone?: string;
  joinDate: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: User;
  credits: number;
  schedule: string;
  semester: string;
  year: number;
  enrolledStudents: number;
  maxStudents: number;
  syllabus?: string;
  materials: CourseMaterial[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  uploadDate: string;
  size?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  maxPoints: number;
  type: 'essay' | 'project' | 'quiz' | 'exam';
  status: 'draft' | 'published' | 'closed';
  submissions: AssignmentSubmission[];
  attachments: string[];
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  assignmentId: string;
  submissionDate: string;
  files: string[];
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'direct' | 'announcement' | 'forum';
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId: string;
  points: number;
  maxPoints: number;
  percentage: number;
  letterGrade: string;
  date: string;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  date: string;
  duration: number; // in minutes
  type: 'midterm' | 'final' | 'quiz' | 'practical';
  totalMarks: number;
  instructions: string;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  type: 'mcq' | 'short_answer' | 'essay';
  question: string;
  options?: string[]; // For MCQ
  correctAnswer?: string | number;
  points: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'specific_course';
  courseId?: string;
  priority: 'low' | 'medium' | 'high';
  publishDate: string;
  expiryDate?: string;
}
