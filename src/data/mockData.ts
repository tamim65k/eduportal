import { User, Course, Assignment, Attendance, Message, Grade, Exam, Announcement } from '../types';

// Demo users
export const mockUsers: User[] = [
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
  },
  {
    id: '4',
    email: 'emma.wilson@student.edu',
    firstName: 'Emma',
    lastName: 'Wilson',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    studentId: 'STU2024002',
    grade: 'Computer Science - Year 2',
    bio: 'Interested in machine learning and data science',
    phone: '+1 (555) 456-7890',
    joinDate: '2023-09-01'
  },
  {
    id: '5',
    email: 'david.brown@teacher.edu',
    firstName: 'Prof. David',
    lastName: 'Brown',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    employeeId: 'TCH2021002',
    department: 'Mathematics',
    bio: 'Professor of Applied Mathematics and Statistics',
    phone: '+1 (555) 567-8901',
    joinDate: '2021-01-15'
  },
  {
    id: '6',
    email: 'lisa.garcia@student.edu',
    firstName: 'Lisa',
    lastName: 'Garcia',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    studentId: 'STU2024003',
    grade: 'Computer Science - Year 1',
    bio: 'New to programming, excited to learn!',
    phone: '+1 (555) 678-9012',
    joinDate: '2024-09-01'
  }
];

// Demo courses
export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Web Development',
    code: 'CS-401',
    description: 'Learn modern web development with React, Node.js, and databases',
    instructor: mockUsers[1],
    credits: 3,
    schedule: 'Mon, Wed 09:00 AM - 10:30 AM',
    semester: 'Fall',
    year: 2024,
    enrolledStudents: 25,
    maxStudents: 30,
    materials: [
      {
        id: '1',
        title: 'React Fundamentals',
        type: 'pdf',
        url: 'https://example.com/react-fundamentals.pdf',
        uploadDate: '2024-08-15',
        size: '2.5 MB'
      },
      {
        id: '2',
        title: 'JavaScript ES6+ Features',
        type: 'video',
        url: 'https://example.com/js-es6-video',
        uploadDate: '2024-08-20'
      }
    ]
  },
  {
    id: '2',
    name: 'Database Systems',
    code: 'CS-402',
    description: 'Comprehensive study of database design, SQL, and NoSQL systems',
    instructor: mockUsers[1],
    credits: 4,
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
    semester: 'Fall',
    year: 2024,
    enrolledStudents: 28,
    maxStudents: 30,
    materials: []
  },
  {
    id: '3',
    name: 'Algorithms',
    code: 'CS-403',
    description: 'Data structures and algorithm analysis',
    instructor: mockUsers[1],
    credits: 3,
    schedule: 'Mon, Wed, Fri 01:00 PM - 02:00 PM',
    semester: 'Fall',
    year: 2024,
    enrolledStudents: 22,
    maxStudents: 25,
    materials: []
  }
];

// Demo assignments
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'React Portfolio Project',
    description: 'Create a personal portfolio website using React and Tailwind CSS',
    courseId: '1',
    dueDate: '2024-09-15T23:59:00',
    maxPoints: 100,
    type: 'project',
    status: 'published',
    submissions: [],
    attachments: ['project-requirements.pdf', 'starter-template.zip']
  },
  {
    id: '2',
    title: 'Database Design Assignment',
    description: 'Design a normalized database schema for an e-commerce system',
    courseId: '2',
    dueDate: '2024-09-10T23:59:00',
    maxPoints: 75,
    type: 'essay',
    status: 'published',
    submissions: [],
    attachments: ['schema-template.sql']
  }
];

// Demo attendance
export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    date: '2024-09-01',
    status: 'present'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '2',
    date: '2024-09-01',
    status: 'present'
  },
  {
    id: '3',
    studentId: '1',
    courseId: '1',
    date: '2024-08-30',
    status: 'late'
  }
];

// Demo messages
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    subject: 'Assignment Feedback',
    content: 'Great work on your latest project! I have some suggestions for improvement...',
    timestamp: '2024-09-01T14:30:00',
    read: false,
    type: 'direct'
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    subject: 'Question about Project',
    content: 'Hi Dr. Smith, I have a question about the React portfolio project requirements.',
    timestamp: '2024-09-01T15:15:00',
    read: true,
    type: 'direct'
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '1',
    subject: 'Re: Question about Project',
    content: 'Sure! The project should include at least 5 pages and use React Router for navigation.',
    timestamp: '2024-09-01T15:45:00',
    read: false,
    type: 'direct'
  },
  {
    id: '4',
    senderId: '1',
    receiverId: '2',
    subject: 'Thank you',
    content: 'Thank you for the clarification! I\'ll get started on it right away.',
    timestamp: '2024-09-01T16:00:00',
    read: true,
    type: 'direct'
  },
  {
    id: '5',
    senderId: '3',
    receiverId: '1',
    subject: 'Registration Reminder',
    content: 'Don\'t forget to register for next semester\'s courses. Registration closes on September 15th.',
    timestamp: '2024-09-01T09:00:00',
    read: false,
    type: 'direct'
  },
  {
    id: '6',
    senderId: '1',
    receiverId: '3',
    subject: 'Course Registration Question',
    content: 'Hi, I\'m having trouble accessing the course registration portal. Can you help?',
    timestamp: '2024-09-01T10:30:00',
    read: true,
    type: 'direct'
  },
  {
    id: '7',
    senderId: '3',
    receiverId: '1',
    subject: 'Re: Course Registration Question',
    content: 'I\'ve reset your portal access. Please try logging in again with your student ID.',
    timestamp: '2024-09-01T11:00:00',
    read: false,
    type: 'direct'
  },
  {
    id: '8',
    senderId: '2',
    receiverId: 'all',
    subject: 'Class Cancelled Tomorrow',
    content: 'Due to a faculty meeting, tomorrow\'s Web Development class is cancelled.',
    timestamp: '2024-09-01T16:00:00',
    read: true,
    type: 'announcement'
  },
  {
    id: '9',
    senderId: '2',
    receiverId: '1',
    subject: 'Extra Credit Opportunity',
    content: 'There\'s an optional coding challenge available for extra credit. Check the course materials section.',
    timestamp: '2024-09-02T08:30:00',
    read: false,
    type: 'direct'
  },
  {
    id: '10',
    senderId: '1',
    receiverId: '2',
    subject: 'Midterm Preparation',
    content: 'Could you provide some study materials for the upcoming midterm exam?',
    timestamp: '2024-09-02T12:00:00',
    read: true,
    type: 'direct'
  },
  {
    id: '11',
    senderId: '4',
    receiverId: '1',
    subject: 'Study Group',
    content: 'Hey John! Want to join our study group for the algorithms class?',
    timestamp: '2024-09-02T14:00:00',
    read: false,
    type: 'direct'
  },
  {
    id: '12',
    senderId: '1',
    receiverId: '4',
    subject: 'Re: Study Group',
    content: 'Absolutely! When and where are you meeting?',
    timestamp: '2024-09-02T14:15:00',
    read: true,
    type: 'direct'
  },
  {
    id: '13',
    senderId: '5',
    receiverId: '1',
    subject: 'Math Tutoring Available',
    content: 'I\'m offering free tutoring sessions for students struggling with calculus. Let me know if you\'re interested!',
    timestamp: '2024-09-02T16:30:00',
    read: false,
    type: 'direct'
  },
  {
    id: '14',
    senderId: '6',
    receiverId: '1',
    subject: 'Programming Help',
    content: 'Hi! I heard you\'re good with React. Could you help me with my first project?',
    timestamp: '2024-09-02T18:00:00',
    read: false,
    type: 'direct'
  },
  {
    id: '15',
    senderId: '1',
    receiverId: '6',
    subject: 'Re: Programming Help',
    content: 'Of course! I\'d be happy to help. What specific part are you stuck on?',
    timestamp: '2024-09-02T18:30:00',
    read: true,
    type: 'direct'
  }
];

// Demo grades
export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    assignmentId: '1',
    points: 85,
    maxPoints: 100,
    percentage: 85,
    letterGrade: 'B+',
    date: '2024-08-25'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '2',
    assignmentId: '2',
    points: 92,
    maxPoints: 100,
    percentage: 92,
    letterGrade: 'A-',
    date: '2024-08-28'
  }
];

// Demo announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Campus Reopening Update',
    content: 'The campus will reopen on Monday with updated safety protocols. Please review the new guidelines before attending classes.',
    authorId: '3',
    targetAudience: 'all',
    priority: 'high',
    publishDate: '2024-09-01T08:00:00'
  },
  {
    id: '2',
    title: 'New Career Services Portal',
    content: 'Check out our new career services portal for job opportunities, internships, and career guidance.',
    authorId: '3',
    targetAudience: 'students',
    priority: 'medium',
    publishDate: '2024-08-31T10:00:00'
  },
  {
    id: '3',
    title: 'Faculty Meeting Reminder',
    content: 'Don\'t forget about the faculty meeting scheduled for tomorrow at 3 PM in the main conference room.',
    authorId: '3',
    targetAudience: 'teachers',
    priority: 'medium',
    publishDate: '2024-09-01T12:00:00'
  }
];

// Demo exams
export const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Web Development Midterm',
    courseId: '1',
    date: '2024-09-20T10:00:00',
    duration: 120,
    type: 'midterm',
    totalMarks: 100,
    instructions: 'Answer all questions. Use of external resources is not allowed.',
    questions: [
      {
        id: '1',
        type: 'mcq',
        question: 'What is React?',
        options: ['A JavaScript library', 'A database', 'A server', 'An operating system'],
        correctAnswer: 0,
        points: 5
      },
      {
        id: '2',
        type: 'short_answer',
        question: 'Explain the concept of virtual DOM in React.',
        points: 15
      }
    ]
  }
];
