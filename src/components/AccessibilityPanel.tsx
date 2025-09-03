import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  SunIcon, 
  MoonIcon, 
  AdjustmentsHorizontalIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const { 
    theme, 
    isDark, 
    toggleTheme, 
    fontSize, 
    setFontSize, 
    highContrast, 
    toggleHighContrast 
  } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Accessibility Settings</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isDark ? (
                  <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {theme === 'system' ? 'System' : isDark ? 'Dark' : 'Light'} Mode
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Font Size */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-3 py-2 text-sm rounded-md border ${
                      fontSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <EyeIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">High Contrast</span>
              </div>
              <button
                onClick={toggleHighContrast}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  highContrast ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Screen Reader Support Info */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-md">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                This portal supports screen readers and keyboard navigation. 
                Use Tab to navigate and Enter to activate buttons.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
