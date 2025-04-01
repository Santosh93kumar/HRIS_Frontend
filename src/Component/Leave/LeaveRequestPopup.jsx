import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';

const LeaveRequestPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    leaveType: '',
    leavePeriod: '',
    fromDate: '',
    toDate: '',
    startTime: '',
    endTime: '',
    remarks: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let newError = '';
    
    switch (field) {
      case 'leaveType':
      case 'leavePeriod':
        if (!value) {
          newError = 'This field is required';
        }
        break;
      case 'fromDate':
      case 'toDate':
        if (!value) {
          newError = 'Date is required';
        }
        break;
      case 'startTime':
      case 'endTime':
        if (!value) {
          newError = 'Time is required';
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: newError
    }));

    return !newError;
  };

  const validateForm = () => {
    const fields = ['leaveType', 'leavePeriod', 'fromDate', 'toDate', 'startTime', 'endTime'];
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const fieldIsValid = validateField(field, formData[field]);
      if (!fieldIsValid) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission
    }
  };

  if (!isOpen) return null;

  const inputClass = (field) => `
    w-full p-2 border rounded-md pr-10 
    focus:outline-none focus:ring-2 focus:ring-teal-500
    ${errors[field] && touched[field] ? 'border-red-500' : 'border-gray-300'}
  `;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(4px)' }}
    >
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      
      <form 
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Out Door Activity Entry of Ibad ur Rahman</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-gray-700">Leave Type</label>
            <div className="relative">
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                onBlur={() => handleBlur('leaveType')}
                className={inputClass('leaveType')}
              >
                <option value="">Select Leave Type</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="annual">Annual Leave</option>
              </select>
              {errors.leaveType && touched.leaveType && (
                <p className="text-red-500 text-sm mt-1">{errors.leaveType}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Leave Period</label>
            <div className="relative">
              <select
                name="leavePeriod"
                value={formData.leavePeriod}
                onChange={handleChange}
                onBlur={() => handleBlur('leavePeriod')}
                className={inputClass('leavePeriod')}
              >
                <option value="">Select Leave Period</option>
                <option value="full">Full Day</option>
                <option value="half">Half Day</option>
                <option value="short">Short Leave</option>
              </select>
              {errors.leavePeriod && touched.leavePeriod && (
                <p className="text-red-500 text-sm mt-1">{errors.leavePeriod}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">From Date</label>
            <div className="relative">
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                onBlur={() => handleBlur('fromDate')}
                className={inputClass('fromDate')}
              />
              {errors.fromDate && touched.fromDate && (
                <p className="text-red-500 text-sm mt-1">{errors.fromDate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">To Date</label>
            <div className="relative">
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                onBlur={() => handleBlur('toDate')}
                className={inputClass('toDate')}
              />
              {errors.toDate && touched.toDate && (
                <p className="text-red-500 text-sm mt-1">{errors.toDate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Start Time</label>
            <div className="relative">
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                onBlur={() => handleBlur('startTime')}
                className={inputClass('startTime')}
              />
              {errors.startTime && touched.startTime && (
                <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">End Time</label>
            <div className="relative">
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                onBlur={() => handleBlur('endTime')}
                className={inputClass('endTime')}
              />
              {errors.endTime && touched.endTime && (
                <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks"
            className="w-full p-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
          <button 
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestPopup;