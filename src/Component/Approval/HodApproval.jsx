import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function Approval() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
    
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        {/* Navbar */}
        <div className="pt-4 pb-3 pr-8 pl-3">
          <div className="flex items-start mb-3 font-medium text-base">
            <h1 className="pl-1">Head of Department Approval</h1>
          </div>

          {/* Toggle - Responsive */}
          <div className="flex flex-wrap gap-3 mb-5 bg-white rounded-lg p-3 items-center">
            <select className="p-1 border border-black rounded w-full sm:w-1/6 text-gray-600">
              <option className="text-black">Select Department</option>
              <option className="text-black">Finance</option>
              <option className="text-black">Human Resource</option>
              <option className="text-black">Information Technology</option>
            </select>
            <input
              type="date"
              name="From Date"
              className="p-1 border rounded w-full sm:w-1/6 text-gray-600"
            />
            <input
              type="date"
              className="p-1 border rounded w-full sm:w-1/6 text-gray-600"
            />
            <div className="flex-grow"></div>
            <button className="bg-sky-500 text-white px-3 py-1 rounded">
              Show
            </button>
            <button className="bg-teal-600 text-white px-3 py-1 rounded">
              Approve All
            </button>
          </div>

          {/* Colour Components - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-center h-40 py-2 mb-5">
            <div className="bg-sky-400 text-white p-4 rounded-lg text-center flex flex-col justify-center items-center">
              <p className="text-lg font-medium">0</p>
              <p>Leave</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg text-center flex flex-col justify-center items-center">
              <p className="text-lg font-medium">0</p>
              <p>Late Sitting</p>
            </div>
            <div className="bg-sky-700 text-white p-4 rounded-lg text-center flex flex-col justify-center items-center">
              <p className="text-lg font-medium">0</p>
              <p>Out Door Activity</p>
            </div>
            <div className="bg-gray-600 text-white p-4 rounded-lg text-center flex flex-col justify-center items-center">
              <p className="text-lg font-medium">0</p>
              <p>Missing Time</p>
            </div>
            <div className="bg-sky-400 text-white p-4 rounded-lg text-center flex flex-col justify-center items-center">
              <p className="text-lg font-medium">0</p>
              <p>Loan</p>
            </div>
            <div className="bg-yellow-400 text-white p-4 rounded-lg text-center flex flex-col justify-center items-center">
              <p className="text-lg font-medium">0</p>
              <p>Provident Fund</p>
            </div>
          </div>

          {/* Leave Container */}
          <div className="bg-white mt-5 p-4 mb-5 rounded-lg font-medium mt-5">
            <h1 className="text-gray-600 mb-5">Leave</h1>
            <div className="bg-gray-300 p-3 mb-5 rounded">
              <p>No Record Found!</p>
            </div>
          </div>

          {/* Late Sitting Container */}
          <div className="bg-white mt-5 p-4 mb-5 rounded-lg font-medium">
            <h1 className="text-gray-600 mb-5">Late Sitting</h1>
            <div className="bg-gray-300 p-3 mb-5 rounded">
              <p>No Record Found!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Approval;
