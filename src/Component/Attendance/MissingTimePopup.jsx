import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, X } from 'lucide-react';

const MissingTimePopup = ({ isOpen, onClose }) => {
  const [date, setDate] = useState('2023-06-01');
  const [time, setTime] = useState('02:00');
  const [reason, setReason] = useState('');

  const focusInput = (inputId) => {
    const element = document.getElementById(inputId);
    if (element) {
      element.focus();
      element.click(); // Triggers native picker on mobile
    }
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
    if (event.key === 'Tab') {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      const firstInput = document.querySelector('input');
      if (firstInput) firstInput.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const formatTimeForDisplay = (time24h) => {
    if (!time24h) return '';
    const [hours, minutes] = time24h.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[585px] bg-white rounded-lg border border-[#D3D3D3] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#D3D3D3]">
          <h2 id="modal-title" className="text-base sm:text-lg font-semibold">
            IN Time Missing Time Entry
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date Input */}
            <div className="space-y-2">
              <label htmlFor="date-input" className="block text-gray-700 text-sm font-medium">
                Date
              </label>
              <div className="relative">
                <input
                  id="date-input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  max={new Date().toISOString().split('T')[0]}
                />
                <button
                  type="button"
                  onClick={() => focusInput('date-input')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Open date picker"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Time Input */}
            <div className="space-y-2">
              <label htmlFor="time-input" className="block text-gray-700 text-sm font-medium">
                Missing Time
              </label>
              <div className="relative">
                <input
                  id="time-input"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 border rounded-md pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => focusInput('time-input')}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Open time picker"
                >
                  <Clock className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Reason Input */}
          <div className="space-y-2">
            <label htmlFor="reason-input" className="block text-gray-700 text-sm font-medium">
              Reason
            </label>
            <input
              id="reason-input"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Reason for Missing Time"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              console.log({
                date: formatDateForDisplay(date),
                time: formatTimeForDisplay(time),
                reason
              });
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissingTimePopup;