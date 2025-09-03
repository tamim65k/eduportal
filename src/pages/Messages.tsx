import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockMessages, mockUsers } from '../data/mockData';
import { Message } from '../types';
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = mockMessages.reduce((acc, message) => {
    const otherUserId = message.senderId === user?.id ? message.receiverId : message.senderId;
    if (!acc[otherUserId]) {
      acc[otherUserId] = [];
    }
    acc[otherUserId].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // Handle message sending logic here
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.entries(conversations).map(([userId, messages]) => {
            const otherUser = mockUsers.find(u => u.id === userId);
            const lastMessage = messages[messages.length - 1];
            
            return (
              <div
                key={userId}
                onClick={() => setSelectedConversation(userId)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === userId ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {otherUser?.avatar ? (
                      <img className="h-10 w-10 rounded-full" src={otherUser.avatar} alt="" />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {otherUser?.firstName} {otherUser?.lastName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage?.content}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-400">
                      {new Date(lastMessage?.timestamp || '').toLocaleDateString()}
                    </p>
                    {!lastMessage?.read && lastMessage?.receiverId === user?.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {mockUsers.find(u => u.id === selectedConversation)?.avatar ? (
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={mockUsers.find(u => u.id === selectedConversation)?.avatar} 
                      alt="" 
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {mockUsers.find(u => u.id === selectedConversation)?.firstName} {mockUsers.find(u => u.id === selectedConversation)?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {mockUsers.find(u => u.id === selectedConversation)?.role === 'teacher' ? 'Teacher' : 'Student'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversations[selectedConversation]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user?.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
