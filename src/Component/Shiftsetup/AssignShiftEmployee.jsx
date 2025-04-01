import React, { useState } from "react";
import Header from "../Header";
import BulkShiftPopup from "./BulkShiftPopup";
import { Link } from 'react-router-dom';


const AssignEmployeShift = () => {
    const [department, setDepartment] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    

    return (
        <>
            <Header />
            <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
            <h2 className="text-lg font-semibold mb-4 ">Head Office Employee Shifts</h2>

                <div className="bg-white shadow-md rounded-md p-6 w-full mx-auto">

                    {/* Dropdown and Buttons */}
                    <div className="flex items-center space-x-4 mb-6 w-full">
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="border rounded-md p-2 w-9/12"
                        >
                            <option value="">Select Department</option>
                            <option value="HR">HR</option>
                            <option value="IT">IT</option>
                            <option value="Finance">Finance</option>
                        </select>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Show</button>
                        <button onClick={() => setIsPopupOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      Bulk Shift
                      </button>
                        </div>

                    {/* Employee Shifts Section */}
                   
                </div>
                <div className="bg-white max-w-3xl m-8 ml-16 my-4 p-2  rounded-sm ">
                        <h3 className="font-semibold">Head Office Employee Shifts</h3>
                        {/* Placeholder for shift data */}
                    </div>
            </div>
            <BulkShiftPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

            <div>
          <button onClick={()=>setIsopen(true)}>
            add
          </button>
      
        </div>

        </>
    );
};

export default AssignEmployeShift;