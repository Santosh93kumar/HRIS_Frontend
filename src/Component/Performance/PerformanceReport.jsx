import React from 'react'
// import img1 from '../assets/Vector1.png'
import Header from '../Header';
import { useState } from 'react';
import icon from "../Payroll/Print.png";


function PerformanceReport() {

  const department = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Management' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'House Keeping' },
    { id: 5, name: 'Security' }
  ];
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleShow = () => {
    // if (!selectedDepartment || !fromDate) {
    //   alert('Please select all required fields');
    //   return;
    // }
    
  };

  

  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />

        <div className="min-h-screen bg-sky-100 p-5">
          <h1 className="text-2xl font-semibold mb-6">Performance Report</h1>

          {/* Filters Section */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left Side - Filters */}
              <div className="flex flex-wrap gap-4 flex-1">
              <select className="w-60 md:w-64 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md">
                  <option>Select Employee</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                </select>

                <select
                  className="w-60 md:w-64 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md"
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

               
              </div>

              {/* Right Side - Show Button & Print Icon */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={handleShow}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Show
                </button>
                
                <div className="cursor-pointer">
                  <img src={icon} alt="Print" className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Performance table of Ibad  Ur Rahman</h2>
            <div className='bg-gray-300 p-4 rounded-lg shadow'>
              <h3 className='font-semibold'>No Records Found!</h3>

            </div>
            
            
          </div>
          
        </div>
      </section>
        </>
        )
}

        export default PerformanceReport;