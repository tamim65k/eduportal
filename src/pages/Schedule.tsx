import React, { Fragment, useState } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';

// Sample schedule data
const scheduleData = [
  {
    id: 1,
    title: 'Web Development',
    instructor: 'Dr. Smith',
    location: 'Building A, Room 302',
    startTime: '2025-09-02T09:00:00',
    endTime: '2025-09-02T10:30:00',
    type: 'lecture',
    recurring: ['MO', 'WE'],
  },
  {
    id: 2,
    title: 'Database Systems',
    instructor: 'Prof. Johnson',
    location: 'Building B, Room 205',
    startTime: '2025-09-02T11:00:00',
    endTime: '2025-09-02T12:30:00',
    type: 'lecture',
    recurring: ['TU', 'TH'],
  },
  {
    id: 3,
    title: 'Algorithms',
    instructor: 'Dr. Williams',
    location: 'Building C, Room 101',
    startTime: '2025-09-02T13:00:00',
    endTime: '2025-09-02T14:00:00',
    type: 'lecture',
    recurring: ['MO', 'WE', 'FR'],
  },
  {
    id: 4,
    title: 'Web Development Lab',
    instructor: 'Dr. Smith',
    location: 'Computer Lab 3',
    startTime: '2025-09-03T14:00:00',
    endTime: '2025-09-03T16:00:00',
    type: 'lab',
    recurring: ['TH'],
  },
  {
    id: 5,
    title: 'Study Group',
    instructor: 'Self',
    location: 'Library Study Room 5',
    startTime: '2025-09-04T15:00:00',
    endTime: '2025-09-04T17:00:00',
    type: 'study',
    recurring: [],
  },
];

const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function getEventsForDay(day: Date) {
  const dayOfWeek = days[day.getDay()];
  return scheduleData.filter(event => 
    isSameDay(parseISO(event.startTime), day) || 
    (event.recurring.includes(dayOfWeek) && 
     day >= startOfMonth(new Date()) && 
     day <= endOfMonth(new Date()))
  );
}

export default function Schedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('month');

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const today = new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekStartsOn = 1; // Start week on Monday
  const startDate = new Date(monthStart);
  const startDay = startDate.getDay();
  
  // Adjust start date to the beginning of the week
  startDate.setDate(startDate.getDate() - (startDay === 0 ? 6 : startDay - 1));
  
  const endDate = new Date(monthEnd);
  const endDay = endDate.getDay();
  
  // Adjust end date to the end of the week
  endDate.setDate(endDate.getDate() + (endDay === 0 ? 0 : 7 - endDay));
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Get events for the selected day
  const dayEvents = getEventsForDay(selectedDay);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">
            {format(selectedDay, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        
        <div className="flex items-center mt-4 space-x-3 sm:mt-0">
          <div className="flex bg-white rounded-md shadow-sm">
            <button
              onClick={prevMonth}
              className="flex items-center justify-center w-10 p-2 text-gray-400 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-50"
            >
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50"
            >
              Today
            </button>
            <div className="relative">
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center justify-center w-32 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-l-0 border-r-0 border-gray-300 hover:bg-gray-50">
                  {format(currentMonth, 'MMMM yyyy')}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-sm text-left'
                            )}
                            onClick={() => setView('month')}
                          >
                            Month view
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-sm text-left'
                            )}
                            onClick={() => setView('week')}
                          >
                            Week view
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <button
              onClick={nextMonth}
              className="flex items-center justify-center w-10 p-2 text-gray-400 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-50"
            >
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 mt-4 text-sm leading-6 text-center text-gray-500">
          {weekDays.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 mt-2 text-sm bg-white">
          {calendarDays.map((day, dayIdx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, selectedDay);
            const dayEvents = getEventsForDay(day);
            
            return (
              <div
                key={day.toString()}
                className={classNames(
                  'min-h-28 p-2 border-t border-gray-200',
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white',
                  dayIdx === 0 ? 'border-l' : '',
                  dayIdx % 7 === 0 ? 'border-l' : '',
                )}
                onClick={() => setSelectedDay(day)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className={classNames(
                        'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                        isSelected && isToday ? 'bg-primary-600 text-white' : '',
                        isSelected && !isToday ? 'bg-primary-100 text-primary-700' : '',
                        !isSelected && isToday ? 'text-primary-600' : '',
                        !isSelected && !isToday && isCurrentMonth ? 'text-gray-900' : '',
                        !isSelected && !isToday && !isCurrentMonth ? 'text-gray-400' : '',
                      )}
                    >
                      {format(day, 'd')}
                    </button>
                    {dayEvents.length > 0 && (
                      <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 mt-1 space-y-1 overflow-y-auto">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={classNames(
                          'p-1 text-xs truncate rounded',
                          event.type === 'lecture' ? 'bg-blue-100 text-blue-800' :
                          event.type === 'lab' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        )}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Events */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900">
          Schedule for {format(selectedDay, 'EEEE, MMMM d, yyyy')}
        </h2>
        
        {dayEvents.length > 0 ? (
          <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {dayEvents.map((event) => {
                const start = new Date(event.startTime);
                const end = new Date(event.endTime);
                
                return (
                  <li key={event.id} className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2 rounded-md bg-primary-50">
                        <CalendarIcon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <span className={classNames(
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            event.type === 'lecture' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'lab' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          )}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <ClockIcon className="flex-shrink-0 w-4 h-4 mr-1.5" />
                            {format(start, 'h:mm a')} - {format(end, 'h:mm a')}
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPinIcon className="flex-shrink-0 w-4 h-4 mr-1.5" />
                            {event.location}
                          </div>
                          <div className="flex items-center mt-1">
                            <UserCircleIcon className="flex-shrink-0 w-4 h-4 mr-1.5" />
                            {event.instructor}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="mt-4 text-center bg-white rounded-lg shadow">
            <div className="p-12">
              <CalendarIcon className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
