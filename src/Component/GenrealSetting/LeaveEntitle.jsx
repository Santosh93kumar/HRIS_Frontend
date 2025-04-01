// import React, { useState } from "react";
// import Header from "../Header";
// import axios from "axios";
// import downArrow from "../Image/downArrow.png";
// import calenderIcon from "../Image/calenderIcon.png";
// import crossIcon from "../Image/crossIcon.png";

// function LeaveEntitle() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOpenImport, setIsOpenImport] = useState(false);
//   const [selectedFileName, setSelectedFileName] = useState(null);
//   const [formData, setFormData] = useState({
//     department: "",
//     employee: "",
//     leavetype: "",
//     year: "",
//     fromDate: "",
//     toDate: "",
//     noDays: "",
//   });
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/website/leaveentitlementroute/leaveentitlement",
//         formData
//       );
//       console.log("Response:", response.data);
//       setFormData({
//         department: "",
//         employee: "",
//         leavetype: "",
//         year: "",
//         fromDate: "",
//         toDate: "",
//         noDays: "",
//       });
//       setIsOpen(false);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//   const handleFileChange = (e) => {
//     setSelectedFileName(e.target.files[0]);
//   };
//   const saveData = async (e) => {
//     e.preventDefault();
//     if (!selectedFileName) {
//       console.error("No file selected");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("leaveimage", selectedFileName);
//     try {
//       const res = await axios.post(
//         "http://localhost:8000/website/leaveBalanceRoute/leaveBalance",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       console.log("Upload successful:", res.data);
//       setSelectedFileName(null);
//       setIsOpenImport(false);
//     } catch (error) {
//       console.error("Error uploading data:", error);
//     }
//   };
//   return (
//     <>
//       <section className="bg-sky-100 flex flex-col w-full h-screen">
//         <Header />
//         <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
//           <h1 className="my-4 font-bold text-xl">Leave Entitlement</h1>
//           <div className="bg-white p-4 rounded-lg flex flex-wrap md:flex-nowrap items-center gap-4 w-full">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 w-full">
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 className="w-full p-2 text-gray-600 border border-gray-400 rounded-md"
//               >
//                 <option value="">Select Department</option>
//                 <option value="hr">HR</option>
//                 <option value="it">IT</option>
//                 <option value="finance">Finance</option>
//               </select>
//               <select
//                 name="leavetype"
//                 value={formData.leavetype}
//                 onChange={handleChange}
//                 className="w-full p-2 text-gray-600 border border-gray-400 rounded-md"
//               >
//                 <option value="">Select Leave Type</option>
//                 <option value="paid leave">Paid Leave</option>
//                 <option value="unpaid leave">Unpaid Leave</option>
//                 <option value="voluntary leave">Voluntary Leave</option>
//               </select>
//               <select
//                 name="year"
//                 value={formData.year}
//                 onChange={handleChange}
//                 className="w-full p-2 text-gray-600 border border-gray-400 rounded-md"
//               >
//                 <option value="">Select Year</option>
//                 <option value="2024">2024</option>
//                 <option value="2025">2025</option>
//               </select>
//             </div>
//             <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto justify-center">
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto">
//                 Show
//               </button>
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
//                 onClick={() => setIsOpen(true)}
//               >
//                 Add New
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
//                 onClick={() => setIsOpenImport(true)}
//               >
//                 Import
//               </button>
//             </div>
//           </div>
//           <h1 className="bg-white my-2 p-3 font-semibold rounded">Leave Entitled</h1>
//         </div>
//       </section>
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs px-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-[578px] mx-auto relative">
//             <div className="flex justify-between items-center border-b-[1px] border-[#D3D3D3] pb-3">
//               <p className="font-[600] text-[18px]">Add Leave Entitlement</p>
//               <button onClick={() => setIsOpen(false)} className="w-[14px] h-[14px]">
//                 <img src={crossIcon} alt="Close" />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//                 {["Department", "Employee", "Leave Type", "Year"].map((label, index) => (
//                   <div key={index} className="relative">
//                     <label className="block text-[#535353] font-[600] text-[15px]">{label}</label>
//                     <div className="relative">
//                       <select
//                         name={label.toLowerCase().replace(" ", "")}
//                         value={formData[label.toLowerCase().replace(" ", "")]}
//                         onChange={handleChange}
//                         className="mt-[9px] w-full p-2 border-[#696969] border-[1px] rounded-lg appearance-none focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969]"
//                       >
//                         <option value="">Select {label}</option>
//                         <option value="hr">HR</option>
//                         <option value="finance">Finance</option>
//                         <option value="it">IT</option>
//                         <option value="marketing">Marketing</option>
//                       </select>
//                       <img
//                         src={downArrow}
//                         alt="Dropdown Arrow"
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[10px] h-[5px] pointer-events-none"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
//                 {["fromDate", "toDate"].map((name, index) => (
//                   <div key={index}>
//                     <label className="block text-[#535353] font-[600] text-[15px]">
//                       {name === "fromDate" ? "From Date" : "To Date"}
//                     </label>
//                     <div className="relative mt-[9px] flex items-center border-[1px] border-[#696969] rounded-lg p-2">
//                       <input
//                         name={name}
//                         type="date"
//                         value={formData[name]}
//                         onChange={handleChange}
//                         className="text-[#696969] text-[16px] font-[500] bg-transparent focus:outline-none w-full pr-10 cursor-pointer placeholder-gray-400"
//                         placeholder={name === "fromDate" ? "From Date" : "To Date"}
//                         style={{
//                           appearance: "none",
//                           WebkitAppearance: "none",
//                           MozAppearance: "none",
//                         }}
//                       />
//                       <button type="button" className="absolute right-3">
//                         <img src={calenderIcon} alt="Calendar Icon" className="w-[18px] h-[20px]" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-3">
//                 <label className="block text-[#535353] font-[600] text-[15px]">No Days</label>
//                 <input
//                   name="noDays"
//                   value={formData.noDays}
//                   onChange={handleChange}
//                   className="w-full mt-[9px] p-2 border-[#696969] border-[1px] rounded-lg appearance-none focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969] placeholder-[#696969]"
//                   placeholder="No Days"
//                 />
//               </div>
//               <div className="flex flex-wrap mt-[18px] justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="w-[92px] h-[40px] rounded-[4px] bg-[#A1A1A1] text-white font-[600] text-[15px] p-[10px]"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="w-[92px] h-[40px] rounded-[4px] bg-[#238BB2] text-white font-[600] text-[15px] px-[27px] py-[10px]"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {isOpenImport && (
//         <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs px-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-[487px] h-[168px] mx-auto relative">
//             <div className="flex justify-between items-center border-b-[1px] border-[#D3D3D3] pb-3">
//               <p className="font-[600] text-[18px]">Import Leave Balance</p>
//               <button onClick={() => setIsOpenImport(false)} className="w-[14px] h-[14px]">
//                 <img src={crossIcon} alt="Close" />
//               </button>
//             </div>
//             <form onSubmit={saveData} encType="multipart/form-data"> {/* Corrected encType */}
//               <div className="flex flex-wrap gap-[10px] items-center">
//                 <div className="flex items-center bg-[#83D4FF] border border-[#D6D6D6] w-[296px] h-[50px] px-[20px]">
//                   <input
//                     type="file"
//                     id="fileInput"
//                     className="hidden"
//                     name="leaveimage"
//                     onChange={handleFileChange}
//                     aria-describedby="fileHelp" // Accessibility
//                   />
//                   <div className="flex items-center justify-between w-full">
//                     <label htmlFor="fileInput" className="bg-[#ECECEC] text-[#919191] font-[400] text-[15px] px-[12px] py-[8px] cursor-pointer rounded-md text-center">
//                       Choose File
//                     </label>
//                     <span className="font-[600] text-[14px] text-[#FFFFFF] whitespace-nowrap"> {/* Corrected to span */}
//                       {selectedFileName ? selectedFileName.name : "No File Chosen"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-[#FF0022] flex items-center justify-center text-white font-[600] text-[15px] w-[92px] h-[40px]">
//                   <button type="submit">Import</button>
//                 </div>
//               </div>
//                <p id="fileHelp" className="text-gray-500 text-sm mt-1">Select a CSV or Excel file to import leave balances.</p> {/* Accessibility help text */}
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// export default LeaveEntitle;

import React, { useState,useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import downArrow from "../Image/downArrow.png";
import calenderIcon from "../Image/calenderIcon.png";
import crossIcon from "../Image/crossIcon.png";

function LeaveEntitle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImport, setIsOpenImport] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);
    const [employeeTypes, setEmployeeTypes] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    leaveType: "",
    year: "",
    fromDate: "",
    toDate: "",
    noDays: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  // useEffect(() => {
  //   // Fetch departments
  //   axios
  //     .get("http://localhost:8000/website/departmentroutes/viewdepartment")
  //     .then((response) => {
  //       setDepartments(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching departments:", error);
  //     });

  //   // Fetch employees
  //   axios
  //     .get("http://localhost:8000/website/employeeInfoRoute/employeeinfo")
  //     .then((response) => {
  //       setEmployees(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching employees:", error);
  //     });
  // }, []);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/website/departmentroutes/viewdepartment`)
      .then((response) => {
        console.log("Departments Data:", response.data.departments);
        if (Array.isArray(response.data.departments)) {
          setDepartments(response.data.departments);
          
        } else {
          console.error("Expected an array but got:", response.data);
          setDepartments([]); // Ensure it's always an array
        }
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setDepartments([]); // Fallback to an empty array
      });
  }, []);

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
  
        // Fetch Employee Names when modal opens
        const fetchEmployeeTypes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/website/leave/leaveentrydata`);
                
                if (response.status === 200 && Array.isArray(response.data.employees)) {
                    // Extract only names from employees array
                    const names = response.data.employees.map(emp => emp.name);
                    
                    console.log("Extracted Names:", names);
                    setEmployeeTypes(names); // Store employee names correctly
                } else {
                    console.error("Unexpected response format:", response.data);
                }
  
            } catch (error) {
                console.error("Error fetching employee names:", error);
            }
        };
  
        fetchEmployeeTypes();
    }
  
    return () => {
        document.body.style.overflow = "unset"; // Restore scrolling when modal closes
    };
  }, [isOpen]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/leaveentitlementroute/leaveentitlement`,
        formData
      );
      console.log("Response:", response.data);
      setFormData({
        department: "",
        employee: "",
        leavetype: "",
        year: "",
        fromDate: "",
        toDate: "",
        noDays: "",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleFileChange = (e) => {
    setSelectedFileName(e.target.files[0]);
  };
  const saveData = async (e) => {
    e.preventDefault();
    if (!selectedFileName) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("leaveimage", selectedFileName);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/leaveBalanceRoute/leaveBalance`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Upload successful:", res.data);
      setSelectedFileName(null);
      setIsOpenImport(false);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />
        <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
          <h1 className="my-4 font-bold text-xl">Leave Entitlement</h1>
          <div className="bg-white p-4 rounded-lg flex flex-wrap md:flex-nowrap items-center gap-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1 w-full">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2 text-gray-600 border border-gray-400 rounded-md"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
              <select
                name="leavetype"
                value={formData.leavetype}
                onChange={handleChange}
                className="w-full p-2 text-gray-600 border border-gray-400 rounded-md"
              >
                <option value="">Select Leave Type</option>
                <option value="paid leave">Paid Leave</option>
                <option value="unpaid leave">Unpaid Leave</option>
                <option value="voluntary leave">Voluntary Leave</option>
              </select>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 text-gray-600 border border-gray-400 rounded-md"
              >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto">
                Show
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                onClick={() => setIsOpen(true)}
              >
                Add New
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                onClick={() => setIsOpenImport(true)}
              >
                Import
              </button>
            </div>
          </div>
          <h1 className="bg-white my-2 p-3 font-semibold rounded">
            Leave Entitled
          </h1>
        </div>
      </section>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs px-4">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-[578px] mx-auto relative">
            <div className="flex justify-between items-center border-b-[1px] border-[#D3D3D3] pb-3">
              <p className="font-[600] text-[18px]">Add Leave Entitlement</p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-[14px] h-[14px]"
              >
                <img src={crossIcon} alt="Close" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
  {/* Department */}
  <div className="mt-3">
    <label className="block text-[#535353] font-[600] text-[15px]">Department</label>
    <select
      name="department"
      value={formData.department}
      onChange={handleChange}
      className="mt-[9px] w-full p-2 border-[#696969] border-[1px] rounded-lg focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969]"
    >
      <option value="">Select Department</option>
      {departments.map((dept) => (
        <option key={dept._id} value={dept._id}>
          {dept.departmentName}
        </option>
      ))}
    </select>
  </div>

  {/* Employee */}
  <div className="mt-3">
    <label className="block text-[#535353] font-[600] text-[15px]">Employee</label>
    <select
      name="employee"
      value={formData.employee}
      onChange={handleChange}
      className="mt-[9px] w-full p-2 border-[#696969] border-[1px] rounded-lg focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969]"
    >
      <option value="">Select Employee</option>
      {employeeTypes.length > 0 ? (
            employeeTypes.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            ))
        ) : (
            <option value="" disabled>Loading...</option>
        )}
    </select>
  </div>

  {/* Leave Type */}
  <div className="mt-3">
    <label className="block text-[#535353] font-[600] text-[15px]">Leave Type</label>
    <select
      name="leaveType"
      value={formData.leaveType}
      onChange={handleChange}
      className="mt-[9px] w-full p-2 border-[#696969] border-[1px] rounded-lg focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969]"
    >
      <option value="">Select Leave Type</option>
  
    </select>
  </div>

  {/* Year */}
  <div className="mt-3">
    <label className="block text-[#535353] font-[600] text-[15px]">Year</label>
    <input
      type="number"
      name="year"
      value={formData.year}
      onChange={handleChange}
      className="w-full mt-[9px] p-2 border-[#696969] border-[1px] rounded-lg focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969] placeholder-[#696969]"
      placeholder="Enter Year"
    />
  </div>

  {/* From Date & To Date */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
    {/* From Date */}
    <div>
      <label className="block text-[#535353] font-[600] text-[15px]">From Date</label>
      <input
        type="date"
        name="fromDate"
        value={formData.fromDate}
        onChange={handleChange}
        className="w-full mt-[9px] p-2 border-[#696969] border-[1px] rounded-lg focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969]"
      />
    </div>

    {/* To Date */}
    <div>
      <label className="block text-[#535353] font-[600] text-[15px]">To Date</label>
      <input
        type="date"
        name="toDate"
        value={formData.toDate}
        onChange={handleChange}
        className="w-full mt-[9px] p-2 border-[#696969] border-[1px] rounded-lg focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969]"
      />
    </div>
  </div>

  {/* No Days */}
  <div className="mt-3">
    <label className="block text-[#535353] font-[600] text-[15px]">No Days</label>
    <input
      type="number"
      name="noDays"
      value={formData.noDays}
      onChange={handleChange}
      className="w-full mt-[9px] p-2 border-[#696969] border-[1px] rounded-lg focus:outline-none focus:ring-0 font-[500] text-[16px] text-[#696969] placeholder-[#696969]"
      placeholder="No Days"
    />
  </div>

  {/* Buttons */}
  <div className="flex flex-wrap mt-[18px] justify-end gap-2">
    <button
      type="button"
      onClick={() => setIsOpen(false)}
      className="w-[92px] h-[40px] rounded-[4px] bg-[#A1A1A1] text-white font-[600] text-[15px] p-[10px]"
    >
      Close
    </button>
    <button
      type="submit"
      className="w-[92px] h-[40px] rounded-[4px] bg-[#238BB2] text-white font-[600] text-[15px] px-[27px] py-[10px]"
    >
      Submit
    </button>
  </div>
</form>

          </div>
        </div>
      )}
      {isOpenImport && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs px-4">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-[487px] h-[168px] mx-auto relative">
            <div className="flex justify-between items-center border-b-[1px] border-[#D3D3D3] pb-3">
              <p className="font-[600] text-[18px]">Import Leave Balance</p>
              <button
                onClick={() => setIsOpenImport(false)}
                className="w-[14px] h-[14px]"
              >
                <img src={crossIcon} alt="Close" />
              </button>
            </div>
            <form onSubmit={saveData} encType="multipart/form-data">
              {" "}
              {/* Corrected encType */}
              <div className="flex flex-wrap gap-[10px] items-center">
                <div className="flex items-center bg-[#83D4FF] border border-[#D6D6D6] w-[296px] h-[50px] px-[20px]">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    name="leaveimage"
                    onChange={handleFileChange}
                    aria-describedby="fileHelp" // Accessibility
                  />
                  <div className="flex items-center justify-between w-full">
                    <label
                      htmlFor="fileInput"
                      className="bg-[#ECECEC] text-[#919191] font-[400] text-[15px] px-[12px] py-[8px] cursor-pointer rounded-md text-center"
                    >
                      Choose File
                    </label>
                    <span className="font-[600] text-[14px] text-[#FFFFFF] whitespace-nowrap">
                      {" "}
                      {/* Corrected to span */}
                      {selectedFileName
                        ? selectedFileName.name
                        : "No File Chosen"}
                    </span>
                  </div>
                </div>
                <div className="bg-[#FF0022] flex items-center justify-center text-white font-[600] text-[15px] w-[92px] h-[40px]">
                  <button type="submit">Import</button>
                </div>
              </div>
              <p id="fileHelp" className="text-gray-500 text-sm mt-1">
                Select a CSV or Excel file to import leave balances.
              </p>{" "}
              {/* Accessibility help text */}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default LeaveEntitle;