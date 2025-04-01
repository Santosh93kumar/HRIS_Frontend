import React, { useState } from "react";
import Header from "../Header";
import icon from "../Payroll/Print.png";

function HrAttendanceReport() {
  const [filters, setFilters] = useState({
    department: "",
    employee: "",
    attendanceStatus: "",
    startDate: "",
    endDate: ""
  });
  const [showTable, setShowTable] = useState(false);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShowReport = () => {
    setShowTable(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const attendanceData = [
    {
      id: 1,
      empCode: "1234213450",
      name: "Ibad ur Rahman",
      department: "Finance",
      date: "01-01-2024 12:00:00 AM",
      day: "Sunday",
      timeIn: "",
      timeOut: "",
      workingTime: "",
      lateMinutes: 0,
      earlyMinutes: 5,
      shiftIn: "10:00 PM"
    },
    {
      id: 2,
      empCode: "1234213450",
      name: "Ibad ur Rahman",
      department: "Finance",
      date: "11-05-2024 11:00:00 AM",
      day: "Monday",
      timeIn: "5:30 PM",
      timeOut: "9:10 AM",
      workingTime: "15:39:29",
      lateMinutes: 0,
      earlyMinutes: 0,
      shiftIn: "9:00 PM"
    }
  ];

  return (
    <section className="flex flex-col w-full min-h-screen bg-sky-100">
      <Header />
    
      <div className="flex-1 p-6 bg-[#DBF2FF] rounded-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          HR Attendance Report
        </h2>

        {/* Filter */}
        <div className="p-5 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-wrap justify-between items-center w-full">
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="w-44 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none m-1"
            >
              <option value="">Select Department</option>
              <option value="hr">HR</option>
              <option value="it">IT</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
            </select>

            <select
              name="employee"
              value={filters.employee}
              onChange={handleFilterChange}
              className="w-44 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none m-1"
            >
              <option value="">Select Employee</option>
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
              <option value="ibad">Ibad ur Rahman</option>
            </select>

            <select
              name="attendanceStatus"
              value={filters.attendanceStatus}
              onChange={handleFilterChange}
              className="w-44 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none m-1"
            >
              <option value="">Attendance Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="early">Early Leave</option>
            </select>

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              placeholder="Start Date"
              className="w-44 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none m-1"
            />

            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              placeholder="End Date"
              className="w-44 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none m-1"
            />

            <div className="flex items-center ml-auto">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mr-3"
                onClick={handleShowReport}
              >
                Show
              </button>
              <div className="cursor-pointer" onClick={handlePrint}>
                <img src={icon} alt="Print" className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        {showTable && (
          <div className="p-5 bg-white rounded-lg shadow-md print:shadow-none">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800">Attendance Results</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border-gray-200 border-t">Employee Code</th>
                    <th className="p-3 text-left border-gray-200 border-t">Name</th>
                    <th className="p-3 text-left border-gray-200 border-t">Department</th>
                    <th className="p-3 text-left border-gray-200 border-t">Date</th>
                    <th className="p-3 text-left border-gray-200 border-t">Day</th>
                    <th className="p-3 text-left border-gray-200 border-t">IN</th>
                    <th className="p-3 text-left border-gray-200 border-t">OUT</th>
                    <th className="p-3 text-left border-gray-200 border-t">Working Time</th>
                    <th className="p-3 text-center border-gray-200 border-t">Late Min</th>
                    <th className="p-3 text-center border-gray-200 border-t">Early Min</th>
                    <th className="p-3 text-left border-gray-200 border-t">Shift IN</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="p-3 border-r border-gray-300">{row.empCode}</td>
                      <td className="p-3 border-r border-gray-300">{row.name}</td>
                      <td className="p-3 border-r border-gray-300">{row.department}</td>
                      <td className="p-3 border-r border-gray-300">{row.date}</td>
                      <td className="p-3 border-r border-gray-300">{row.day}</td>
                      <td className="p-3 border-r border-gray-300">{row.timeIn || "-"}</td>
                      <td className="p-3 border-r border-gray-300">{row.timeOut || "-"}</td>
                      <td className="p-3 border-r border-gray-300">{row.workingTime || "-"}</td>
                      <td className="p-3 text-center border-r border-gray-300">{row.lateMinutes}</td>
                      <td className="p-3 text-center border-r border-gray-300">{row.earlyMinutes}</td>
                      <td className="p-3 border-gray-300">{row.shiftIn}</td>
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
}

export default HrAttendanceReport;