import React, { useState } from "react";

const BulkShiftPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-100">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Bulk Shift Assign to Employeement</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-600">
          ✖
        </button>
      </div>

      {/* Leave Type & Period */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select className="w-full p-2 border rounded">
            <option>Select</option>
            <option>Casual Leave</option>
            <option>Medical Leave</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee</label>
          <select className="w-full p-2 border rounded">
            <option>Select Leave</option>
          </select>
        </div>
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Shift</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
      </div>

      {/* Remarks */}
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Remarks</label>
        <textarea className="w-full p-2 border rounded"></textarea>
      </div> */}

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
          Close
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  </div>
  );
};

export default BulkShiftPopup