// frontend/src/components/MessageBox.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react'; // For close icon

interface MessageBoxProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // in ms, 0 for sticky
  onClose?: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  if (!isVisible) return null;

  let bgColor = '';
  let textColor = '';
  let borderColor = '';

  switch (type) {
    case 'success':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      borderColor = 'border-green-400';
      break;
    case 'error':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      borderColor = 'border-red-400';
      break;
    case 'warning':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      borderColor = 'border-yellow-400';
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      borderColor = 'border-blue-400';
      break;
  }

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg flex items-center justify-between z-[9999] max-w-sm w-full transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${bgColor} ${textColor} border ${borderColor}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        onClick={handleClose}
        className={`ml-4 p-1 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 ${textColor}`}
        aria-label="Close message"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MessageBox;
