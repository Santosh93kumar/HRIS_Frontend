import React, { useState } from 'react';

const PerformanceEntry = () => {
    const [showTable, setShowTable] = useState(false);
    const performanceData = [
      { id: 1, detail: "Job knowledge: Knowledge of product, policies, and procedures OR knowledge of techniques, skill, equipment, procedures, and materials.", rating: 9 },
      { id: 2, detail: "Quality of work: Freedom from error and mistakes, accuracy, quality of work in general.", rating: 9 },
      { id: 3, detail: "Quantity of work: Productivity of the employee.", rating: 7 },
      { id: 4, detail: "Reliability: The extent to which the employee can be depended upon to complete work properly and on time.", rating: 5 }
    ];
  
    return (
      <section className="bg-sky-100 flex flex-col w-full min-h-screen">
        {/* Header */}
        <div className="h-20 bg-slate-700 flex justify-end items-center px-4">
          <div className="flex items-center space-x-2">
            <p className="text-gray-300 text-lg sm:text-xl">Santosh</p>
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              className="h-12 w-12 sm:h-16 sm:w-16 rounded-full"
              alt="User Profile"
            />
          </div>
        </div>
        <div className='p-2 mt-2'>
          <h1 className='px-5 text-xl'>Performance by HOD</h1>
          <div className='bg-white p-3 rounded-lg flex gap-4 items-center mx-2 mt-8'>
            <h1>Select Employee</h1>
            <select className='w-50 p-2 border-2 border-gray-600 outline-gray-400 rounded-md'>
              <option value='finance'>Finance</option>
              <option value='hr'>HR</option>
              <option value='it'>IT</option>
              <option value='marketing'>Marketing</option>
            </select>
  
            <label>Select Your Relation as</label>
            <input type="radio" name='relation' value='self' />Self
            <input type="radio" name='relation' value='supervisor' />Supervisor
            <input type="radio" name='relation' value='peer' />Peer
            <input type="radio" name='relation' value='junior' />Junior
  
            <button onClick={() => setShowTable(true)} className='bg-blue-500 text-white px-9 py-3 lg:ml-24 rounded-md'>Show</button>
          </div>
  
          {showTable && (
            <div className='bg-white p-4 rounded-lg flex flex-wrap gap-4 items-center mx-2 mt-8'>
              <p className='font-semibold'>Head Office Employee Shifts</p>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-md">
                  <thead>
                    <tr className="bg-gray-300 text-gray-700">
                      <th className="py-3 px-4 sm:px-6 text-left w-25">Sr No</th>
                      <th className="py-3 px-4 sm:px-6 text-left">Details</th>
                      <th className="py-3 px-4 sm:px-6 text-center w-35">Rating 1 to 10</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        <td className="py-3 px-4 sm:px-6">{item.id}</td>
                        <td className="py-3 px-4 sm:px-6">{item.detail}</td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                          <div className="bg-gray-300 px-3 py-1 rounded-md text-gray-700 font-bold">
                            {item.rating}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };
  
  export default PerformanceEntry;