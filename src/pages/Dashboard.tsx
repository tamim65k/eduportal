import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockCourses, mockAssignments, mockGrades, mockAttendance, mockAnnouncements } from '../data/mockData';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BellIcon,
  BookOpenIcon,
  TrophyIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';
import DashboardCard from '../components/DashboardCard';
import StatCard from '../components/StatCard';
import ProgressCard from '../components/ProgressCard';
import QuickActionCard from '../components/QuickActionCard';
import AnnouncementCard from '../components/AnnouncementCard';
import ScheduleCard from '../components/ScheduleCard';
import GamificationBadge from '../components/GamificationBadge';
import WelcomeHeader from '../components/WelcomeHeader';

export default function Dashboard() {
  const { user } = useAuth();

  const getStudentStats = () => {
    const totalCourses = mockCourses.length;
    const avgGrade = mockGrades.reduce((sum, grade) => sum + grade.percentage, 0) / mockGrades.length;
    const attendancePercentage = (mockAttendance.filter(a => a.status === 'present').length / mockAttendance.length) * 100;
    const upcomingAssignments = mockAssignments.filter(a => new Date(a.dueDate) > new Date()).length;
    
    return [
      { name: 'Current GPA', value: (avgGrade / 25).toFixed(1), change: '+0.2', changeType: 'positive', icon: ChartBarIcon, trend: [3.2, 3.4, 3.3, 3.6, 3.8] },
      { name: 'Enrolled Courses', value: totalCourses.toString(), change: '0', changeType: 'neutral', icon: AcademicCapIcon, trend: [5, 5, 6, 6, 6] },
      { name: 'Attendance', value: `${Math.round(attendancePercentage)}%`, change: '+5%', changeType: 'positive', icon: CheckCircleIcon, trend: [85, 88, 90, 92, 95] },
      { name: 'Pending Tasks', value: upcomingAssignments.toString(), change: '-1', changeType: 'negative', icon: DocumentTextIcon, trend: [8, 6, 4, 3, 2] },
    ];
  };

  const getTeacherStats = () => {
    const totalCourses = mockCourses.length;
    const totalStudents = mockCourses.reduce((sum, course) => sum + course.enrolledStudents, 0);
    const pendingGrading = mockAssignments.length * 3; // Demo calculation
    const avgAttendance = 87; // Demo value
    
    return [
      { name: 'Active Courses', value: totalCourses.toString(), change: '0', changeType: 'neutral', icon: AcademicCapIcon, trend: [4, 5, 5, 6, 6] },
      { name: 'Total Students', value: totalStudents.toString(), change: '+5', changeType: 'positive', icon: UserGroupIcon, trend: [120, 125, 130, 135, 142] },
      { name: 'Pending Grading', value: pendingGrading.toString(), change: '-3', changeType: 'negative', icon: DocumentTextIcon, trend: [25, 20, 18, 15, 12] },
      { name: 'Class Attendance', value: `${avgAttendance}%`, change: '+2%', changeType: 'positive', icon: CheckCircleIcon, trend: [82, 84, 85, 86, 87] },
    ];
  };

  const getAdminStats = () => {
    return [
      { name: 'Total Users', value: '1,247', change: '+23', changeType: 'positive', icon: UserGroupIcon, trend: [1200, 1210, 1225, 1235, 1247] },
      { name: 'Active Sessions', value: '89', change: '+12', changeType: 'positive', icon: ClockIcon, trend: [65, 70, 75, 82, 89] },
      { name: 'System Health', value: '98%', change: '+1%', changeType: 'positive', icon: CheckCircleIcon, trend: [95, 96, 97, 97, 98] },
      { name: 'Support Tickets', value: '3', change: '-5', changeType: 'negative', icon: ExclamationTriangleIcon, trend: [12, 8, 6, 5, 3] },
    ];
  };

  const stats = user?.role === 'student' ? getStudentStats() : 
                user?.role === 'teacher' ? getTeacherStats() : 
                getAdminStats();

  const upcomingClasses = [
    {
      id: 1,
      name: 'Web Development',
      time: '09:00 AM - 10:30 AM',
      location: 'Building A, Room 302',
      instructor: 'Dr. Smith',
      type: 'lecture' as const,
      status: 'upcoming' as const
    },
    {
      id: 2,
      name: 'Database Systems',
      time: '11:00 AM - 12:30 PM',
      location: 'Building B, Room 205',
      instructor: 'Prof. Johnson',
      type: 'lecture' as const,
      status: 'ongoing' as const
    },
    {
      id: 3,
      name: 'Web Dev Lab',
      time: '02:00 PM - 04:00 PM',
      location: 'Computer Lab 3',
      instructor: 'Dr. Smith',
      type: 'lab' as const,
      status: 'upcoming' as const
    }
  ];

  const getQuickActionsForRole = (role: string) => {
    switch (role) {
      case 'student':
        return [
          { name: 'Submit Assignment', href: '/assignments', icon: DocumentTextIcon, description: 'Upload your work', badge: '3 due' },
          { name: 'View Grades', href: '/grades', icon: ChartBarIcon, description: 'Check your progress' },
          { name: 'Course Materials', href: '/resources', icon: BookOpenIcon, description: 'Download resources' },
          { name: 'Messages', href: '/messages', icon: BellIcon, description: 'Check notifications', badge: '2 new' },
        ];
      case 'teacher':
        return [
          { name: 'Create Assignment', href: '/assignments', icon: DocumentTextIcon, description: 'Design new tasks' },
          { name: 'Grade Submissions', href: '/grades', icon: ChartBarIcon, description: 'Review student work', badge: '12 pending' },
          { name: 'Take Attendance', href: '/attendance', icon: CheckCircleIcon, description: 'Mark present/absent' },
          { name: 'Upload Resources', href: '/resources', icon: BookOpenIcon, description: 'Share materials' },
        ];
      case 'admin':
        return [
          { name: 'User Management', href: '/admin', icon: UserGroupIcon, description: 'Manage accounts' },
          { name: 'System Reports', href: '/reports', icon: ChartBarIcon, description: 'View analytics' },
          { name: 'Course Setup', href: '/courses', icon: AcademicCapIcon, description: 'Configure courses' },
          { name: 'System Settings', href: '/admin', icon: CheckCircleIcon, description: 'Platform config' },
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActionsForRole(user?.role || 'student');

  // Get gamification data for students
  const getStudentBadges = () => {
    const completedAssignments = mockAssignments.filter(a => new Date(a.dueDate) < new Date()).length;
    // const totalAssignments = mockAssignments.length;
    const attendanceRate = Math.round((mockAttendance.filter(a => a.status === 'present').length / mockAttendance.length) * 100);
    
    return [
      { name: '🏅 On Time Submitter', earned: completedAssignments >= 5, description: 'Submit 5 assignments on time' },
      { name: '📈 Top Performer', earned: attendanceRate >= 90, description: 'Maintain 90%+ attendance' },
      { name: '🎯 Goal Achiever', earned: false, description: 'Complete semester with 3.5+ GPA' },
    ];
  };

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <WelcomeHeader user={user} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.name}
            name={stat.name}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType as 'positive' | 'negative' | 'neutral'}
            icon={stat.icon}
            userRole={user?.role || 'student'}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Student-specific gamification section */}
      {user?.role === 'student' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProgressCard
            title="Assignment Progress"
            current={8}
            total={12}
            userRole="student"
            subtitle="This semester"
            showBadge={true}
            badgeText="On Track 🎯"
          />
          <ProgressCard
            title="Course Completion"
            current={4}
            total={6}
            userRole="student"
            subtitle="Current semester"
          />
          <GamificationBadge
            badges={getStudentBadges().map(badge => ({
              name: badge.name.substring(2),
              earned: badge.earned,
              description: badge.description,
              icon: badge.name.split(' ')[0],
              rarity: badge.earned ? 'rare' : 'common'
            }))}
            userLevel={12}
            xpCurrent={850}
            xpNext={1000}
          />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Schedule Card - spans 2 columns */}
        <div className="lg:col-span-2">
          <ScheduleCard
            title="📅 Today's Schedule"
            scheduleItems={upcomingClasses}
            userRole={user?.role || 'student'}
            showJoinButton={user?.role === 'student'}
          />

          {/* Assignment/Grading Card for Students/Teachers */}
          {user?.role === 'student' && (
            <div className="mt-8">
              <DashboardCard
                title="📝 Upcoming Deadlines"
                userRole="student"
                icon={ClockIcon}
                headerAction={
                  <Link to="/assignments" className="text-sm font-medium text-student-600 hover:text-student-500">
                    View all
                  </Link>
                }
              >
                <div className="space-y-4">
                  {mockAssignments.slice(0, 3).map((assignment) => {
                    const course = mockCourses.find(c => c.id === assignment.courseId);
                    const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-student-400"></div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{assignment.title}</p>
                            <p className="text-xs text-gray-500">{course?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            daysUntilDue < 0 ? 'bg-red-100 text-red-800' :
                            daysUntilDue <= 1 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {daysUntilDue < 0 ? 'Overdue' : daysUntilDue <= 1 ? 'Due Soon' : `${daysUntilDue}d`}
                          </span>
                          <span className="text-xs text-gray-500">{assignment.maxPoints}pts</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DashboardCard>
            </div>
          )}

          {user?.role === 'teacher' && (
            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardCard
                  title="📤 Pending Grading"
                  userRole="teacher"
                  icon={DocumentTextIcon}
                >
                  <div className="space-y-3">
                    {mockCourses.slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 bg-teacher-50 rounded-lg hover:bg-teacher-100 transition-colors duration-150">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{course.name}</p>
                          <p className="text-xs text-gray-500">{Math.floor(Math.random() * 10) + 5} submissions</p>
                        </div>
                        <button className="px-3 py-1 bg-teacher-500 text-white text-xs font-medium rounded-md hover:bg-teacher-600 transition-colors duration-200">
                          Grade
                        </button>
                      </div>
                    ))}
                  </div>
                </DashboardCard>

                <DashboardCard
                  title="📊 Class Analytics"
                  userRole="teacher"
                  icon={ChartBarIcon}
                >
                  <div className="space-y-4">
                    <div className="bg-teacher-50 rounded-lg p-4">
                      <h4 className="font-semibold text-teacher-700 mb-3">Average Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Class Average</span>
                          <span className="font-bold text-teacher-600">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-teacher-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-lg font-bold text-green-600">92%</p>
                        <p className="text-xs text-gray-600">Attendance</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">156</p>
                        <p className="text-xs text-gray-600">Total Students</p>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>
          )}

          {user?.role === 'admin' && (
            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DashboardCard
                  title="🏫 Platform Overview"
                  userRole="admin"
                  icon={ChartBarIcon}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">1,247</p>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">78</p>
                        <p className="text-xs text-gray-600">Teachers</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">45</p>
                        <p className="text-xs text-gray-600">Courses</p>
                      </div>
                    </div>
                    <div className="bg-admin-50 rounded-lg p-4">
                      <h4 className="font-semibold text-admin-700 mb-2">System Usage</h4>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Daily Active Users</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-admin-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                  </div>
                </DashboardCard>

                <DashboardCard
                  title="⚠️ System Alerts"
                  userRole="admin"
                  icon={ExclamationTriangleIcon}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Server Memory High</p>
                        <p className="text-xs text-gray-500">Memory usage at 67%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Backup Completed</p>
                        <p className="text-xs text-gray-500">Daily backup successful</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <CircleStackIcon className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Database Optimized</p>
                        <p className="text-xs text-gray-500">Query performance improved</p>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <QuickActionCard
            title="⚡ Quick Actions"
            actions={quickActions}
            userRole={user?.role || 'student'}
          />

          {/* Announcements */}
          <AnnouncementCard
            announcements={mockAnnouncements}
            userRole={user?.role || 'student'}
          />

          {/* Performance/Progress Card */}
          {user?.role === 'student' && (
            <DashboardCard
              title="🎯 This Week's Goals"
              userRole="student"
              icon={TrophyIcon}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-student-50 rounded-lg">
                  <span className="text-sm font-medium">Complete 2 assignments</span>
                  <span className="text-xs text-student-600">1/2 ✅</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-student-50 rounded-lg">
                  <span className="text-sm font-medium">Attend all classes</span>
                  <span className="text-xs text-student-600">3/3 ✅</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Study 10 hours</span>
                  <span className="text-xs text-gray-500">6/10 📚</span>
                </div>
              </div>
            </DashboardCard>
          )}

          {user?.role === 'admin' && (
            <DashboardCard
              title="🔧 System Overview"
              userRole="admin"
              icon={CheckCircleIcon}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Server Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ● Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Database</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ● Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Backup Status</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    ● Scheduled
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Link to="/admin" className="text-sm font-medium text-admin-600 hover:text-admin-500">
                    View detailed system status →
                  </Link>
                </div>
              </div>
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
}
