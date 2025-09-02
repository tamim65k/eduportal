import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon, PencilIcon, UserCircleIcon, AcademicCapIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, MapPinIcon, LockClosedIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const tabs = [
  { name: 'Profile', icon: UserCircleIcon, current: true },
  { name: 'Account', icon: LockClosedIcon, current: false },
  { name: 'Notifications', icon: BellIcon, current: false },
  { name: 'Privacy', icon: ShieldCheckIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const profile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Computer Science Major, Class of 2025',
  coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d47a2f80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  fields: {
    'Student ID': 'S12345678',
    'Phone': '(555) 123-4567',
    'Date of Birth': 'January 15, 2000',
    'Address': '123 University Ave, Apt 4B, Boston, MA 02115',
    'Major': 'Computer Science',
    'Minor': 'Mathematics',
    'Enrollment Status': 'Full-time',
    'Expected Graduation': 'May 2025',
    'Advisor': 'Dr. Sarah Johnson',
  },
};

const courses = [
  { id: 1, name: 'Web Development', code: 'CS-401', instructor: 'Dr. Smith', credits: 3 },
  { id: 2, name: 'Database Systems', code: 'CS-402', instructor: 'Prof. Johnson', credits: 4 },
  { id: 3, name: 'Algorithms', code: 'CS-403', instructor: 'Dr. Williams', credits: 3 },
  { id: 4, name: 'Computer Networks', code: 'CS-404', instructor: 'Prof. Brown', credits: 3 },
  { id: 5, name: 'Software Engineering', code: 'CS-405', instructor: 'Dr. Davis', credits: 4 },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save the data to your backend here
  };

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    navigate('/login');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Cover Photo */}
      <div className="relative rounded-lg overflow-hidden bg-gray-100 h-48">
        <img
          className="object-cover w-full h-full"
          src={formData.coverImage}
          alt="Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end">
            <div className="flex-shrink-0 -mt-12">
              {formData.avatar ? (
                <img
                  className="w-24 h-24 rounded-full ring-4 ring-white"
                  src={formData.avatar}
                  alt=""
                />
              ) : (
                <div className="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white bg-gray-300 rounded-full ring-4 ring-white">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="ml-6
            ">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                <button
                  type="button"
                  className="ml-3 p-1 text-white rounded-full hover:bg-white/20"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <CameraIcon className="w-5 h-5" />
                  <input id="avatar-upload" type="file" className="hidden" accept="image/*" />
                </button>
              </div>
              <p className="text-white/90">{formData.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={classNames(
                activeTab === tab.name
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
              )}
            >
              <tab.icon
                className={classNames(
                  activeTab === tab.name ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-5 w-5'
                )}
                aria-hidden="true"
              />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pb-12">
        {activeTab === 'Profile' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" />
                  Edit
                </button>
              ) : (
                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(profile);
                      setIsEditing(false);
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save changes
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg
            ">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">About</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and information.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  {isEditing ? (
                    <>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Bio</dt>
                        <dd className="mt-1">
                          <input
                            type="text"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          />
                        </dd>
                      </div>
                      {Object.entries(formData.fields).map(([key, value]) => (
                        <div key={key} className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">{key}</dt>
                          <dd className="mt-1">
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleFieldChange(key, e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            />
                          </dd>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formData.name}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                      </div>
                      {Object.entries(formData.fields).map(([key, value]) => (
                        <div key={key} className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">{key}</dt>
                          <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </>
                  )}
                </dl>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Current Courses</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Courses you are currently enrolled in.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {courses.map((course) => (
                    <li key={course.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-3 rounded-md bg-primary-100">
                          <AcademicCapIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{course.name}</p>
                          <p className="text-sm text-gray-500">{course.code} • {course.credits} Credits</p>
                        </div>
                        <div className="ml-auto">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {course.instructor}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Account' && (
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Update your password associated with your account.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current password
                    </label>
                    <div className="mt-1">
                      <input
                        id="current-password"
                        name="current-password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <div className="mt-1">
                      <input
                        id="new-password"
                        name="new-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm new password
                    </label>
                    <div className="mt-1">
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Update password
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Danger Zone</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  These actions are irreversible. Please be certain.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">Delete account</h4>
                    <p className="text-sm text-gray-500">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Preferences</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage how you receive notifications.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <form className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-notifications"
                            name="email-notifications"
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-notifications" className="font-medium text-gray-700">
                            Email notifications
                          </label>
                          <p className="text-gray-500">Get notified about important account updates.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push-notifications"
                            name="push-notifications"
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push-notifications" className="font-medium text-gray-700">
                            Push notifications
                          </label>
                          <p className="text-gray-500">Get push notifications in your browser.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="course-updates"
                            name="course-updates"
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="course-updates" className="font-medium text-gray-700">
                            Course updates
                          </label>
                          <p className="text-gray-500">Get notified about new assignments and grades.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="announcements"
                            name="announcements"
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="announcements" className="font-medium text-gray-700">
                            University announcements
                          </label>
                          <p className="text-gray-500">Get important updates from the university.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'Privacy' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy Settings</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Control how your information is shared and displayed.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <form className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Profile Visibility</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose who can see your profile information.
                  </p>
                  <fieldset className="mt-4">
                    <legend className="sr-only">Profile visibility</legend>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="visibility-public"
                          name="visibility"
                          type="radio"
                          className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          defaultChecked
                        />
                        <label htmlFor="visibility-public" className="block ml-3 text-sm font-medium text-gray-700">
                          Public
                          <p className="text-sm font-normal text-gray-500">Anyone can see your profile</p>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="visibility-students"
                          name="visibility"
                          type="radio"
                          className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor="visibility-students" className="block ml-3 text-sm font-medium text-gray-700">
                          Students only
                          <p className="text-sm font-normal text-gray-500">Only students and faculty can see your profile</p>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="visibility-private"
                          name="visibility"
                          type="radio"
                          className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor="visibility-private" className="block ml-3 text-sm font-medium text-gray-700">
                          Private
                          <p className="text-sm font-normal text-gray-500">Only you can see your profile</p>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
