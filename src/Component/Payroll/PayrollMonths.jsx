import React from "react";
import Header from "../Header";
import { useState } from "react";
import Delete from "./images/delete1.png";
import Edit from "./images/edit1.png";

function PayrollMonths() {
  const [showTable, setShowTable] = useState(false);

  const handleShow = () => {
    setShowTable(true);
  };

  const data = [
    {
      year: 2023,
      month: "January",
      fromDate: "1-01-2023",
      toDate: "31-01-2023",
      activity: "",
      dateCreated: "31-03-2023 7:25:44 PM",
    },
    {
      year: 2023,
      month: "February",
      fromDate: "12-02-2023",
      toDate: "28-02-2023",
      activity: "",
      dateCreated: "28-05-2023 8:65:00 PM",
    },
    {
      year: 2023,
      month: "March",
      fromDate: "15-05-2023",
      toDate: "30-06-2023",
      activity: "",
      dateCreated: "30-08-2023 9:00:00 PM",
    },
    {
      year: 2023,
      month: "April",
      fromDate: "19-06-2023",
      toDate: "31-07-2023",
      activity: "",
      dateCreated: "31-09-2023 10:00:00 PM",
    },
  ];

  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
    
        <Header />

        <div className="pt-4 pb-3 pr-8 pl-3 text-neutral-700">
          <div className="flex items-start mb-3 font-medium text-base">
            <h1 className="pl-1 text-black">Month Names</h1>
          </div>

          {/* 1st Container */}
          <div className="flex flex-col md:flex-row gap-3 mb-5 bg-white rounded-lg p-3 items-center">
            <input
              type="number"
              className="px-2 py-1 border rounded w-full md:w-2/6"
              placeholder="Year"
              min="1900"
              max="2100"
              id="yearInput"
            />
            <input
              type="text"
              className="px-2 py-1 border rounded w-full md:w-2/6"
              placeholder="Month"
              id="monthInput"
            />
            <div className="flex-grow "> </div>
            <button
              className="bg-sky-500 text-white px-3 py-1 rounded w-full md:w-auto"
              onClick={handleShow}
            >
              Show
            </button>
            <button className="bg-teal-700 text-white px-3 py-1 rounded w-full md:w-auto mt-2 md:mt-0 md:mr-2">
              Add New
            </button>
          </div>

          {/* Table */}
          {showTable && (
            <div className="justify-center mt-8">
              <div className="bg-white shadow-md rounded-lg p-3 overflow-x-auto">
                <h2 className="text-black mt-2 ml-2 text-lg font-semibold pb-2">
                  Month Names
                </h2>
                <div className="flex flex-col">
                  <div className="flex bg-gray-300 font-medium p-3 rounded mb-8">
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1 ">
                      Year
                    </div>
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                      Month Name
                    </div>
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                      From Date
                    </div>
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                      To Date
                    </div>
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                      Activity
                    </div>
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                      Date Created
                    </div>
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                      Edit
                    </div>
                    <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                      Delete
                    </div>
                  </div>
                  {data.map((row, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap divide-x divide-gray-300 font-medium"
                    >
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        {row.year}
                      </div>
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        {row.month}
                      </div>
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        {row.fromDate}
                      </div>
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        {row.toDate}
                      </div>
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        {row.activity}
                      </div>
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        {row.dateCreated}
                      </div>
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        <img src={Edit} alt="Edit" width="24" height="24" />
                      </div>
                      <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
                        <img src={Delete} alt="Delete" width="16" height="18" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PayrollMonths;
