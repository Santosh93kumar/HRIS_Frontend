import React from 'react';
import { useState } from 'react';
import Header from '../Header';
import icon from "../Payroll/Print.png";
import LeaveEntryPopup from './LeaveEntryPopup';

function LeaveEntry() {
  const [filters, setFilters] = useState({
    department: '',
    employee: '',
    year: '',
    month: '',
    reportType: ''
  });

  const [showPayroll, setShowPayroll] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [fromDate, setFromDate] = useState('From Date');
  const [toDate, setToDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const department = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Management' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'House Keeping' },
    { id: 5, name: 'Security' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleShow = () => {
    if (!selectedDepartment || !fromDate || !toDate) {
      alert('Please select all required fields');
      return;
    }
    setShowPayroll(true);
    console.log('Applying filters:', filters);
  };

  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />

        <div className="min-h-screen bg-sky-100 p-5">
          <h1 className="text-2xl font-semibold mb-6">Leave Entry</h1>

          {/* Filters Section */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left Side - Filters */}
              <div className="flex flex-wrap gap-4 flex-1">
                <select
                  className="border p-2 rounded w-full max-w-[200px] pl-8"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {department.map(dep => (
                    <option key={dep.id} value={dep.id}>
                      {dep.name}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  className="border p-2 rounded w-full max-w-[200px] pl-8"
                  data-placeholder='From Date'
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />

                <input
                  type="date"
                  className="border p-2 rounded w-full max-w-[200px] pl-8"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              {/* Right Side - Show Button & Print Icon */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={handleShow}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Show
                </button>
                <button
                 onClick={() => setIsOpen(true)}
                  className="bg-[#238B82] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Leave Entry
                </button>
                <LeaveEntryPopup  //button for popup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
                <div className="cursor-pointer">
                  <img src={icon} alt="Print" className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Leave Entry Table Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Leave History</h2>
            <div className='bg-gray-300 p-4 rounded-lg shadow'>

            </div>
            
            
          </div>
          
        </div>
      </section>
    </>
  );
}

export default LeaveEntry;