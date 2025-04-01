import React, { useState } from "react";
import Header from "../Header";
import Delete from "./images/delete1.png";
import Edit from "./images/edit1.png";
import AddAllowancePopup from "./AddAllowancePopup";

function AllowanceDeductionTypes() {
  const [showTable, setShowTable] = useState(false);
  const[isOpen, setIsOpen] = useState(false);
  const handleShow = () => {
    setShowTable(true);
  };

  const handleSave = (formData) => {
    console.log('Form data:', formData);
    setIsOpen(false);
  };
  

  const data = [
    {
      id: 15,
      type: "Allowance",
      name: "Mobile",
      description: "Mobile",
      entryDate: "31-03-2023 7:25:44 PM",
      createdBy: "Demo User",
      modifiedDate: "",
      modifiedBy: ""
    },
    {
      id: 14,
      type: "Deduction",
      name: "Mobile",
      description: "Transport",
      entryDate: "12-04-2023 7:15:00 PM",
      createdBy: "Ibad Khan",
      modifiedDate: "",
      modifiedBy: ""
    },
    {
      id: 14,
      type: "Allowance",
      name: "Mobile",
      description: "Mobile",
      entryDate: "28-09-2023 9:00:00 PM",
      createdBy: "Demo User",
      modifiedDate: "",
      modifiedBy: ""
    }
  ];


  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />

        <div className="pt-4 pb-3 pr-8 pl-3">
          <div className="flex items-start mb-3 font-medium text-base">
            <h1 className="text-black pl-1">Allowance and Deduction Types Entry </h1>
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
            <button className="bg-teal-700 text-white px-3 py-1 rounded w-full md:w-auto mt-2 md:mt-0 md:mr-2"
              onClick={() => { setIsOpen(true) }}
            >
              Add New
            </button>
            <AddAllowancePopup
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onSave={handleSave}
             

            />
          </div>

          {/* Flex Table */}
          {showTable && (
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
              <div className="p-4">
                <h2 className="text-base font-semibold mb-4">Allowance and Deduction Types Entry</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                      <tr>
                        <th className="bg-gray-300 text-sm font-medium p-4 text-left border-gray-300  border-t border-l first:rounded-tl">ID</th>
                        <th className="bg-gray-300 text-sm font-medium p-4 text-left border-gray-300 border-t">Type</th>
                        <th className="bg-gray-300 text-sm font-medium p-4 text-left border-gray-300 border-t">Name</th>
                        <th className="bg-gray-300 text-sm font-medium p-4 text-left border-gray-300 border-t">Description</th>
                        <th className="bg-gray-300 text-sm font-medium p-4 text-left border-gray-300 border-t">Entry Date</th>
                        <th className="bg-gray-300 text-sm font-medium p-4  text-left border-gray-300 border-t">Created By</th>
                        <th className="bg-gray-300 text-sm font-medium p-4  text-left border-gray-300 border-t">Modified Date</th>
                        <th className="bg-gray-300 text-sm font-medium p-4  text-left border-gray-300  border-t">Modified By</th>
                        <th className="bg-gray-300 text-sm font-medium p-4 text-center border-gray-300  border-t">Edit</th>
                        <th className="bg-gray-300 text-sm font-medium p-4  text-center border-gray-300  border-t border-r last:rounded-tr">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr
                          key={index}
                          className={`bg-white hover:bg-gray-50 ${index === data.length - 1 ? 'last:border-b' : ''
                            }`}
                        >
                          <td className="px-4 py-3 text-sm border-gray-300  border-r">{row.id}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r">{row.type}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r">{row.name}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r">{row.description}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r">{row.entryDate}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r">{row.createdBy}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r">{row.modifiedDate}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r">{row.modifiedBy}</td>
                          <td className="px-4 py-3 text-sm border-gray-300 border-r text-center">
                            <button className="p-1">
                              <img src={Edit} alt="Edit" className="w-5 h-5 inline-block" />
                            </button>
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            <button className="p-1">
                              <img src={Delete} alt="Delete" className="w-5 h-5 inline-block" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AllowanceDeductionTypes;





