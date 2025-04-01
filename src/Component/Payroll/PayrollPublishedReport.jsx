import React from "react";
import Header from "../Header";
import pdf from "./images/pdf1.png";
import show2 from "./images/show2.png";
function PayrollPublishedReport() {
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />

        <section className="pt-4 pb-3 pr-8 pl-3 overflow-hidden">
          <div className="flex items-start mb-3 font-medium text-base">
            <h1 className="text-black pl-1">
              Payroll Monthly Published Report
            </h1>
          </div>
          {/* 1st Container */}
          <div className="text-gray-600 flex flex-col md:flex-row gap-3 mb-8 bg-white rounded-lg p-4 items-center overflow-hidden">
            <input
              type="text"
              className="px-3 py-1 border rounded w-full md:w-1/7"
              placeholder="Department"
            />
            <input
              type="text"
              className="px-3 py-1 border rounded w-full md:w-1/7"
              placeholder="Select Employee"
            />
            <input
              type="text"
              className="px-3 py-1 border rounded w-full md:w-1/7"
              placeholder="Year"
            />
            <input
              type="text"
              className="px-3 py-1 border rounded w-full md:w-1/7"
              placeholder="Month"
            />
            <input
              type="text"
              className="px-3 py-1 border rounded w-full md:w-1/7"
              placeholder="Summary Report"
            />
            <button className="ml-30 bg-sky-500 text-white px-4 py-1 rounded w-full md:w-auto">
              Show
            </button>
            <div className="bg-gray-300 rounded p-1">
              <img src={show2} width="16" height="20" alt="Show Icon" />
            </div>
          </div>

          {/* Flex Table */}
          <div className="bg-white shadow-md rounded overflow-x-auto justify-center mt-8 p-4 h-full overflow-hidden text-neutral-700 font-medium">
            <h2 className="font-medium pb-4">
              Payroll Monthly Published Report
            </h2>
            <div className="flex flex-col mr-5 overflow-auto justify-center">
              <div className="flex bg-gray-300 font-medium rounded justify-center overflow-auto">
                <div className="p-2 flex-1">PaySlip</div>
                <div className="p-2 flex-1">User ID</div>
                <div className="p-2 flex-1">Name</div>
                <div className="p-2 flex-1">Department</div>
                <div className="p-2 flex-1">Month</div>
                <div className="p-2 flex-1">Year</div>
                <div className="p-2 flex-1">Late Sitting Over Time</div>
                <div className="p-2 flex-1">Day Deduction</div>
              </div>

              <div className="flex flex-col md:flex-row my-3 divide-y md:divide-y-0 md:divide-x-2 divide-gray-300 items-stretch h-full overflow-hidden mt-6">
                <div className="p-2 flex-1">
                  <img
                    src={pdf}
                    width="25"
                    height="25"
                    className="ml-4 bg-gray-300 rounded p-1"
                    alt="PDF Icon"
                  />
                </div>
                <div className="p-2 flex-1">4563</div>
                <div className="p-2 flex-1">Saira</div>
                <div className="p-2 flex-1">Finance</div>
                <div className="p-2 flex-1">January</div>
                <div className="p-2 flex-1">23</div>
                <div className="p-2 flex-1">0</div>
                <div className="p-2 flex-1">0</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default PayrollPublishedReport;
