import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function GlassmorphismHeader() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  const getRoleColors = (role: string) => {
    switch (role) {
      case 'student':
        return {
          gradient: 'from-student-500/80 to-blue-500/80',
          searchBg: 'bg-white/20 border-white/30 focus:border-student-300',
          buttonHover: 'hover:bg-white/20'
        };
      case 'teacher':
        return {
          gradient: 'from-teacher-500/80 to-orange-500/80',
          searchBg: 'bg-white/20 border-white/30 focus:border-teacher-300',
          buttonHover: 'hover:bg-white/20'
        };
      case 'admin':
        return {
          gradient: 'from-admin-500/80 to-purple-500/80',
          searchBg: 'bg-white/20 border-white/30 focus:border-admin-300',
          buttonHover: 'hover:bg-white/20'
        };
      default:
        return {
          gradient: 'from-gray-500/80 to-gray-600/80',
          searchBg: 'bg-white/20 border-white/30 focus:border-blue-300',
          buttonHover: 'hover:bg-white/20'
        };
    }
  };

  const colors = getRoleColors(user.role);

  return (
    <header className={`
      fixed top-4 left-80 right-4 z-40 h-16
      bg-gradient-to-r ${colors.gradient} backdrop-blur-xl
      rounded-2xl border border-white/20 shadow-2xl
    `}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-white/70" />
            </div>
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`
                block w-full pl-10 pr-4 py-2 rounded-xl
                ${colors.searchBg} border
                placeholder-white/60 text-white
                focus:outline-none focus:ring-2 focus:ring-white/50
                transition-all duration-300
              `}
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className={`
            relative p-2 rounded-xl text-white/80 ${colors.buttonHover}
            transition-all duration-300 hover:scale-105
          `}>
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Settings */}
          <button className={`
            p-2 rounded-xl text-white/80 ${colors.buttonHover}
            transition-all duration-300 hover:scale-105
          `}>
            <Cog6ToothIcon className="h-5 w-5" />
          </button>

          {/* Profile Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className={`
              flex items-center space-x-2 p-2 rounded-xl
              ${colors.buttonHover} transition-all duration-300 hover:scale-105
            `}>
              <div className={`
                w-8 h-8 rounded-full 
                bg-gradient-to-br ${
                  user.role === 'student' ? 'from-cyan-400 to-teal-500' :
                  user.role === 'teacher' ? 'from-blue-500 to-indigo-600' :
                  'from-purple-500 to-blue-600'
                }
                flex items-center justify-center text-white font-semibold text-sm
                shadow-lg
              `}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">
                {user.firstName}
              </span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="
                absolute right-0 mt-2 w-56 origin-top-right
                bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl
                border border-white/20 ring-1 ring-black/5
                focus:outline-none
              ">
                <div className="p-4 border-b border-gray-200/50">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role} Account
                  </p>
                </div>
                
                <div className="py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`
                          ${active ? 'bg-gray-100/80' : ''}
                          group flex w-full items-center px-4 py-2 text-sm text-gray-700
                          transition-colors duration-150
                        `}
                      >
                        <Cog6ToothIcon className="mr-3 h-4 w-4" />
                        Profile Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`
                          ${active ? 'bg-gray-100/80' : ''}
                          group flex w-full items-center px-4 py-2 text-sm text-gray-700
                          transition-colors duration-150
                        `}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}
