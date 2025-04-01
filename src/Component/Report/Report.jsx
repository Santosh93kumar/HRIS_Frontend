import React from "react";

const reports = [
  { title: "Time Report", bgColor: "bg-blue-400" },
  { title: "Present and Absent Report", bgColor: "bg-green-600" },
  { title: "Late Coming and Early Going", bgColor: "bg-red-500" },
  { title: "Time Adjustment Report", bgColor: "bg-yellow-400" },
  { title: "Late Sitting Report", bgColor: "bg-red-500" },
  { title: "Over Time Report", bgColor: "bg-blue-900" },
  { title: "Out Door Visits", bgColor: "bg-blue-800" },
  { title: "Machine Time", bgColor: "bg-yellow-500" },
  { title: "Shift Date Wise Report", bgColor: "bg-blue-400" },
];

const reports1 = [
  { title: "Time Report", bgColor: "bg-blue-400" },
  { title: "Present and Absent Report", bgColor: "bg-green-600" },
  { title: "Late Coming and Early Going", bgColor: "bg-red-500" },
];

const reports2 = [...reports];

const Report = () => {
  return (
    <section className="bg-sky-100 flex flex-col w-full">
      <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
        <div className="flex justify-center items-center space-x-1.5">
          <p className="text-gray-300 text-xl">Santosh</p>
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
            className="h-16 w-16 rounded-full"
            alt="Profile"
          />
        </div>
      </div>

      <section className="bg-sky-100 min-h-screen p-6">
        <h1 className="text-2xl font-semibold mb-4 px-8">System Report</h1>

        {/* Attendance Reports */}
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Attendance Reports
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, index) => (
              <div key={index}>
                <div className={`w-full p-3 text-white text-center font-semibold rounded-md ${report.bgColor}`}>
                  {report.title}
                </div>
                <p className="mt-5 text-gray-600">{report.title}</p>
                <button className="mt-3 mb-5 border-2 border-green-500 text-green-600 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition">
                  Show Report
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Reports */}
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-5">
          <p className="text-lg font-semibold text-gray-700 mb-6">Leave Reports</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports1.map((report, index) => (
              <div key={index}>
                <div className={`w-full p-5 text-white text-center font-semibold rounded-md ${report.bgColor}`}>
                  {report.title}
                </div>
                <p className="mt-2 text-gray-600">{report.title}</p>
                <button className="mt-3 mb-5 border-2 border-green-500 text-green-600 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition">
                  Show Report
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payroll Reports */}
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-5">
          <p className="text-lg font-semibold text-gray-700 mb-6">Payroll Reports</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports2.map((report, index) => (
              <div key={index}>
                <div className={`w-full p-3 text-white text-center font-semibold rounded-md ${report.bgColor}`}>
                  {report.title}
                </div>
                <p className="mt-6 text-gray-600">{report.title}</p>
                <button className="mt-3 mb-5 border-2 border-green-500 text-green-600 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition">
                  Show Report
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>
    </section>
  );
};

export default Report;
