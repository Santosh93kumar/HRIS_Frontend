// import React, { useEffect } from "react";
// import Header from "../Header";
// import { useState } from "react";
// import Delete from "./images/delete1.png";
// import Edit from "./images/edit1.png";
// import SetupPopup from "../../Pages/CreateShiftModel";
// import axios from "axios";

// function CreateShift() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [data, setData] = useState([]); // Corrected state initialization

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/website/shift/getShift")
//       .then((res) => {
//         setData(res.data.shifts); // Assuming `shifts` is inside `res.data`
//         console.log("Fetched data:", res.data.shifts);
//       })
//       .catch((err) => console.error("Error fetching shift data:", err));
//   }, []);

//   return (
//     <>
//       <section className="bg-sky-100 flex flex-col w-full h-screen">
//         <Header />

//         <section className="pt-4 pb-3 pr-8 pl-3 overflow-hidden">
//           <div className="flex items-start mb-3 font-medium text-base">
//             <h1 className="text-black pl-1">Master Shift Setup</h1>
//           </div>
//           {/* 1st Container */}
//           <div className="flex flex-col md:flex-row gap-3 mb-8 bg-white rounded-lg p-3 items-center overflow-hidden">
//             <input
//               type="text"
//               className="px-2 py-1 border rounded w-full md:w-1/2"
//               placeholder="ID"
//             />
//             <div className="flex-grow"></div>
//             <button 
//    className=" px-3 py-1  bg-green-700 rounded text-white" onClick={() => setIsPopupOpen(true)}
// >
//   Add
// </button>

// {/* Render the popup outside */}
// {isPopupOpen && <SetupPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
//             <button className="bg-sky-500 text-white px-3 py-1 rounded w-full md:w-auto">
//               Show
//             </button>
            
//           </div>
//           {/* Flex Table */}
//           <div className="bg-white shadow-md rounded overflow-x-auto justify-center mt-8 p-4 h-full overflow-hidden text-neutral-700 font-medium">
//             <h2 className="font-medium pb-4">Master Shift</h2>
//             <div className="flex flex-col mr-5 overflow-hidden">
//       {/* Table Header */}
//       <div className="flex bg-gray-300 font-medium rounded justify-center py-2 overflow-hidden">
//         <div className="p-2 flex-[0.5]">Edit</div>
//         <div className="p-2 flex-[0.5]">Delete</div>
//         <div className="p-2 flex-1">Name</div>
//         <div className="p-2 flex-1">Shift_IN</div>
//         <div className="p-2 flex-1">Shift_OUT</div>
//         <div className="p-2 flex-1">Late Daily</div>
//         <div className="p-2 flex-1">Early Daily</div>
//         <div className="p-2 flex-[1.5]">Over Time Daily</div>
//         <div className="p-2 flex-2">Working Days</div>
//         <div className="p-2 flex-1">Late Sitting</div>
//       </div>

//       {/* Table Body - Mapping Shift Data */}
//       {data.length > 0 ? (
//         data.map((shift, index) => (
          
//           <div
//             key={shift._id}
//             className="flex flex-col md:flex-row my-3 items-stretch h-full overflow-hidden bg-sky-200"
//           >
//             <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
//               <img
//                 onClick={() => console.log("Edit Shift", shift._id)}
//                 src={Edit}
//                 alt="Edit"
//                 width="24"
//                 height="24"
//               />
//             </div>
//             <div className="p-2 md:p-1 lg:p-1 flex-1 ml-4 md:ml-1">
//               <img
//                 onClick={() => console.log("Delete Shift", shift._id)}
//                 src={Delete}
//                 alt="Delete"
//                 width="16"
//                 height="18"
//               />
//             </div>
//             <div className="p-2 flex-1">{shift.shiftName || "N/A"}</div>
//             <div className="p-2 flex-1">{shift.shiftIn || "N/A"}</div>
//             <div className="p-2 flex-1">{shift.shiftOut || "N/A"}</div>
//             <div className="p-2 flex-1">0</div>
//             <div className="p-2 flex-1">0</div>
//             <div className="p-2 flex-[1.5]">0</div>
//             <div className="p-2 flex-2">Mo, Tu, We, Th, Fr, Sa</div>
//             <div className="p-2 flex-1">0</div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center p-4">No shifts available.</p>
//       )}
//     </div>

//           </div>
//         </section>

//         {/* Popup Component */}
//         {/* <ShiftPop isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} /> */}
//       </section>
//     </>
//   );
// }

// export default CreateShift;



import React, { useEffect, useState } from "react";
import Header from "../Header";
import DeleteIcon from "./images/delete1.png";
import EditIcon from "./images/edit1.png";
import SetupPopup from "../../Pages/CreateShiftModel";
import axios from "axios";

function CreateShift() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState([]); // State to store shift data
  console.log("Shift Data:", data);
  console.log("Data Type:", Array.isArray(data)); // Should return true
  




  const fetchShifts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/website/shift/getShift`);
      setData(response.data.shifts || []);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };
  
  const handleAddShift = async (newShiftData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/website/shift/createShift`, newShiftData);
      fetchShifts(); // Refetch shifts after adding
    } catch (error) {
      console.error("Error adding shift:", error);
    }
  };
  
  // Call `fetchShifts()` in useEffect
  useEffect(() => {
    fetchShifts();
  }, []);
  
  
  


  // Delete Shift Function
  const handleDelete = async (shiftId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/website/shift/deleteShift/${shiftId}`);
      setData(data.filter((shift) => shift._id !== shiftId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting shift:", error);
    }
  };

  return (
    <section className="bg-sky-100 flex flex-col w-full h-screen">
      <Header />

      <section className="pt-4 pb-3 pr-8 pl-3 overflow-hidden">
        <div className="flex items-start mb-3 font-medium text-base">
          <h1 className="text-black pl-1">Master Shift Setup</h1>
        </div>

        {/* Input & Add Button Section */}
        <div className="flex flex-col md:flex-row gap-3 mb-8 bg-white rounded-lg p-3 items-center overflow-hidden">
          <input
            type="text"
            className="px-2 py-1 border rounded w-full md:w-1/2"
            placeholder="ID"
          />
          <div className="flex-grow"></div>
          <button 
            className="px-3 py-1 bg-green-700 rounded text-white" 
            onClick={() => setIsPopupOpen(true)}
          >
            Add
          </button>
          <button className="bg-sky-500 text-white px-3 py-1 rounded w-full md:w-auto">
            Show
          </button>
        </div>

        {/* Shift Table */}
        <div className="bg-white shadow-md rounded overflow-x-auto justify-center mt-8 p-4 h-full overflow-hidden text-neutral-700 font-medium">
  <h2 className="font-medium pb-4">Master Shift</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300">
      {/* Table Header */}
      <thead>
        <tr className="bg-gray-300 text-center">
          <th className="p-2 border border-gray-400">Edit</th>
          <th className="p-2 border border-gray-400">Delete</th>
          <th className="p-2 border border-gray-400">Employee Name</th>
          <th className="p-2 border border-gray-400">Department</th>
          <th className="p-2 border border-gray-400">Shift Name</th>
          <th className="p-2 border border-gray-400">Shift_IN</th>
          <th className="p-2 border border-gray-400">Shift_OUT</th>
          <th className="p-2 border border-gray-400">Late Daily</th>
          <th className="p-2 border border-gray-400">Early Daily</th>
          <th className="p-2 border border-gray-400">Over Time Daily</th>
          <th className="p-2 border border-gray-400">Working Days</th>
          <th className="p-2 border border-gray-400">Late Sitting</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {data.length > 0 ? (
          data.map((shift) => (
            <tr key={shift._id} className="bg-sky-200 text-center">
              <td className="p-2 border border-gray-400">
                <img
                  onClick={() => console.log("Edit Shift", shift._id)}
                  src={EditIcon}
                  alt="Edit"
                  width="24"
                  height="24"
                  className="cursor-pointer mx-auto"
                />
              </td>
              <td className="p-2 border border-gray-400">
                <img
                  onClick={() => handleDelete(shift._id)}
                  src={DeleteIcon}
                  alt="Delete"
                  width="16"
                  height="18"
                  className="cursor-pointer mx-auto"
                />
              </td>
              <td className="p-2 border border-gray-400">{shift.assignedEmployee?.name || "N/A"}</td>
              <td className="p-2 border border-gray-400">{shift.assignedEmployee?.departmentName || "N/A"}</td>
              <td className="p-2 border border-gray-400">{shift.shiftName || "N/A"}</td>
              <td className="p-2 border border-gray-400">{shift.shiftIn || "N/A"}</td>
              <td className="p-2 border border-gray-400">{shift.shiftOut || "N/A"}</td>
              <td className="p-2 border border-gray-400">0</td>
              <td className="p-2 border border-gray-400">0</td>
              <td className="p-2 border border-gray-400">0</td>
              <td className="p-2 border border-gray-400">Mo, Tu, We, Th, Fr, Sa</td>
              <td className="p-2 border border-gray-400">0</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="12" className="text-center p-4 border border-gray-400">
              No shifts available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

      </section>

      {/* Render the popup outside */}
      {isPopupOpen && <SetupPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
    </section>
  );
}

export default CreateShift;
