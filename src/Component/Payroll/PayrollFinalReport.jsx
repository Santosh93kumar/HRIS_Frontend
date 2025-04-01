import React, { useState } from 'react';
import icon from "../Payroll/Print.png"
import Header from '../Header';
const PayrollFinalReport = () => {
  const [filters, setFilters] = useState({
    payroll: '',
    department: '',
    admin: '',
    year: '',
    month: '',
    reportType: ''
  });

  const [showPayroll, setShowPayroll] = useState(false);

  const payrollData = [
    {
      name: 'Saira',
      department: 'Finance',
      designation: 'Officer',
      totalDays: 31,
      payableDays: 31,
      noOfLate: 31,
      timeDeduction: '0.000000',
      lateDeduction: '0.00'
    },
    {
      name: 'Deepika',
      department: 'it',
      designation: 'Officer',
      totalDays: 31,
      payableDays: 31,
      noOfLate: 1,
      timeDeduction: '0.000000',
      lateDeduction: '7.00'
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShow = () => {
    setShowPayroll(true);
    console.log('Applying filters:', filters);
  };

  return (
    <section className="bg-sky-100 flex flex-col w-full">
      <Header/>
    <div className="min-h-screen bg-sky-100 p-5">
    <h1 className="text-2xl font-semibold mb-6">Payroll Report</h1>
    
    {/* Filters Section */}
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap items-center justify-between  w-full">
        <input
          type="text"
          name="payroll"
          value={filters.payroll}
          onChange={handleFilterChange}
          placeholder="Payroll"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
        />
        <input
          type="text"
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
          placeholder="Department"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
        />
        <input
          type="text"
          name="admin"
          value={filters.admin}
          onChange={handleFilterChange}
          placeholder="Admin"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
        />
        <input
          type="text"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          placeholder="2023"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
        />
        <input
          type="text"
          name="month"
          value={filters.month}
          onChange={handleFilterChange}
          placeholder="January"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
        />
        <input
          type="text"
          name="reportType"
          value={filters.reportType}
          onChange={handleFilterChange}
          placeholder="Summary Report"
          className="border border-gray-400 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-40"
        />
        
        <button
          onClick={handleShow}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Show
        </button>

        <div className="cursor-pointer flex items-center justify-center  ">
          <img src={icon} alt="Print" className="w-10 h-10" />
        </div>
      </div>
    </div>


      {/* Payroll History Section (Initially visible) */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-800">Payroll</h2>

        {/* Payroll Section - Appears inside this div when Show is clicked */}
        {showPayroll && (
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-300">
                  <tr>
                    {['Name', 'Department', 'Designation', 'Total Days', 'Payable Days', 'No of Late', 'Time Deduction', 'Late Deduction'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrollData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="px-6 py-4 whitespace-nowrap text-left">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default PayrollFinalReport;
 







