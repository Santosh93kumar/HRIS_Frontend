import React, { useState } from "react";
import Header from "../Header";
import Delete from "./images/delete1.png";
import Edit from "./images/edit1.png";
import SetupPopup from "./SetupPopup";

function PayrollSetup() {
  const [showTable, setShowTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  

  const handleShow = () => {
    setShowTable(true);
  };

  const data = [
    {
      id: "15",
      name: "New Payroll",
      salary: "30000 TO 150000",
      limit: "35000",
      eobi: "120",
      sess: "500",
      pf: "5% of Basic Salary",
    },
    {
      id: "20",
      name: "New Payroll",
      salary: "45000 TO 600000",
      limit: "50000",
      eobi: "190",
      sess: "1000",
      pf: "10% of Basic Salary",
    },
  ];

  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />

        <div className="pt-4 pb-3 pr-8 pl-3">
          <div className="flex items-start mb-3 font-medium text-base">
            <h1 className="text-black pl-1">Payroll Setup</h1>
          </div>

          {/* 1st Container */}
          <div className="flex flex-col md:flex-row gap-3 mb-8 bg-white rounded-lg p-3 items-center">
            <input
              type="id"
              className="px-2 py-1 border rounded w-full md:w-1/2"
              placeholder="ID"
            />
            <div className="flex-grow"></div>
            <button
              className="bg-sky-500 text-white px-3 py-1 rounded w-full md:w-auto"
              onClick={handleShow}
            >
              Show
            </button>
            <button className="bg-teal-700 text-white px-3 py-1 rounded w-full md:w-auto mt-2 md:mt-0 md:mr-2" onClick={() => setIsOpen(true)}>
              Add New
            </button>
            <SetupPopup //button for popup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
          </div>

          {/* Flex Table */}
          {showTable && (
            <div className="bg-white shadow-md rounded overflow-x-auto justify-center mt-8 p-4">
              <h2 className="font-medium pb-4">Tax Rules</h2>
              <div className="flex flex-col">
                <div className="flex bg-gray-300 font-medium rounded">
                  <div className="p-2 flex-1">Edit</div>
                  <div className="p-2 flex-1">Delete</div>
                  <div className="p-2 flex-1">ID</div>
                  <div className="p-2 flex-2">Payroll Name</div>
                  <div className="p-2 flex-2">Salary Range</div>
                  <div className="p-2 flex-2">Income Limit</div>
                  <div className="p-2 flex-1">EOBI</div>
                  <div className="p-2 flex-1">SESS</div>
                  <div className="p-2 flex-2">PF</div>
                </div>
                {data.map((row, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row my-3 divide-y md:divide-y-0 md:divide-x-2 divide-gray-300"
                  >
                    <div className="px-2 py-1 mt-2 flex-1">
                      <img src={Edit} alt="Edit" className="w-6 h-6" />
                    </div>
                    <div className="px-3 py-1 flex-1 mt-2">
                      <img src={Delete} alt="Delete" className="w-5 h-5" />
                    </div>
                    <div className="p-2 flex-1">{row.id}</div>
                    <div className="p-2 flex-2">{row.name}</div>
                    <div className="p-2 flex-2">{row.salary}</div>
                    <div className="p-2 flex-2">{row.limit}</div>
                    <div className="p-2 flex-1">{row.eobi}</div>
                    <div className="p-2 flex-1">{row.sess}</div>
                    <div className="p-2 flex-2">{row.pf}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default PayrollSetup;
