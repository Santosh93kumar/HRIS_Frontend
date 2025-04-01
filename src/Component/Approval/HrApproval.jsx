
import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";

function HrApproval() {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/website/approvalstatusreportroutes/approvalstatusreport`)
      .then((res) => {
        console.log("Fetched Data:", res.data);
        if (Array.isArray(res.data.data)) {
          // Ensure each leave has a status (default to "Pending" if missing)
          const updatedData = res.data.data.map((leave) => ({
            ...leave,
            status: leave.status || "Pending",
          }));
          setLeaveData(updatedData);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to update status when radio button is clicked
  const handleStatusChange = (index, newStatus) => {
    setLeaveData((prevData) =>
      prevData.map((leave, i) =>
        i === index ? { ...leave, status: newStatus } : leave
      )
    );
  };

  return (
    <>
  
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />
        <div className="pt-4 pb-3 pr-8 pl-3">
          <div className="flex items-start mb-3 font-medium text-base">
            <h1 className="pl-1">Human Resource Approval</h1>
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

          </div>

          {/* Colour Components - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-center h-40 py-2 ">
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

      
        </div>
        {/* Leaves Table */}
        <section className="bg-white rounded mx-4 lg:mx-6  flex flex-col px-3 py-1">
          <h5 className="text-lg font-semibold">Leaves</h5>

          {/* Table Headers */}
          <div className="p-2 flex w-full rounded-lg mt-2 bg-gray-300">
            <div className="w-full flex flex-row">
              {["Name", "Leave Type", "Period", "From", "To", "Reason", "Pending", "Approved", "Rejected"].map((header, idx) => (
                <div key={idx} className="w-1/9 text-center">
                  <p className="font-semibold text-base">{header}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Table Data */}
          {leaveData.map((leave, index) => (
            <div key={index} className="p-2 flex w-full rounded-lg mt-2 border border-solid border-black">
              <div className="w-full flex flex-row">
                <div className="w-1/9 text-center"><p className="text-base">{leave.employeeType || "N/A"}</p></div>
                <div className="w-1/9 text-center"><p className="text-base">{leave.leaveType}</p></div>
                <div className="w-1/9 text-center"><p className="text-base">{leave.leavePeriod}</p></div>
                <div className="w-1/9 text-center"><p className="text-base">{leave.leaveFromDate}</p></div>
                <div className="w-1/9 text-center"><p className="text-base">{leave.leaveToDate}</p></div>
                <div className="w-1/9 text-center"><p className="text-base">{leave.remarks || "No Remarks"}</p></div>

                {/* Pending Status */}
                <div className="w-1/9 text-center">
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="Pending"
                    checked={leave.status === "Pending"}
                    onChange={() => handleStatusChange(index, "Pending")}
                  />
                </div>

                {/* Approved Status */}
                <div className="w-1/9 text-center">
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="Approved"
                    checked={leave.status === "Approved"}
                    onChange={() => handleStatusChange(index, "Approved")}
                  />
                </div>

                {/* Rejected Status */}
                <div className="w-1/9 text-center">
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="Rejected"
                    checked={leave.status === "Rejected"}
                    onChange={() => handleStatusChange(index, "Rejected")}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}

export default HrApproval;
