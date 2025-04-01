// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Payroll = () => {
//   const [selectedEmployee, setSelectedEmployee] = useState("Saira Khan");
//   const [department, setDepartment] = useState("");
//   const [employee, setEmployee] = useState("");
//   const [payrollData, setPayrollData] = useState({
//     pf: { type: "", employerContribution: "", employeeContribution: "" },
//     sses: { type: "", employerContribution: "", employeeContribution: "" },
//     eobi: { type: "", employerContribution: "", employeeContribution: "" },
//   });
//   const [profileImage, setProfileImage] = useState(null);

//   const handleShow = () => {
//     console.log("Show data for:", department, employee);
//   };

//   const handleAddNew = () => {
//     console.log("Add new employee");
//   };

//   const handleImport = () => {
//     console.log("Import data");
//   };

//   const handleProfileImageChange = (e) => {
//     setProfileImage(e.target.files[0]);
//   };

//   const handleUpdateProfile = () => {
//     console.log("Update profile image");
//   };

//   const handlePayrollChange = (section, field, value) => {
//     setPayrollData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSavePayroll = async () => {
//     try {
//       const payload = {
//         ...payrollData,
//       };
//       const response = await axios.post("http://localhost:8000/website/payrollRoute/payroll", payload);
//       if (response.data.status === 1) {
//         alert("Employee details saved successfully!");
//       } else {
//         alert("Error saving employee details.");
//       }
//       console.log("Payroll data saved:", response.data);
//     } catch (error) {
//       console.error("Error saving payroll data:", error);
//     }
//   };

//   return (
//     <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
//       <h1 className="font-bold text-xl">Employee Info</h1>

//       <div className="bg-white p-4 rounded-lg flex flex-wrap mt-3 gap-4 items-center justify-between">
//         {/* Filter Container (unchanged) */}
//         <div className="flex flex-wrap gap-4 w-full sm:w-auto">
//           <select
//             className="w-full sm:w-60 p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md"
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//           >
//             <option value="">Select Department</option>
//             <option value="hr">Officer</option>
//             <option value="it">Jr. Officer</option>
//             <option value="finance">Manager</option>
//           </select>

//           <select
//             className="w-full sm:w-60 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md"
//             value={employee}
//             onChange={(e) => setEmployee(e.target.value)}
//           >
//             <option value="">Select Employee</option>
//             <option value="Saira Khan">Saira Khan</option>
//             <option value="Hassan Khan">Hassan Khan</option>
//             <option value="Nadeem Ur Rahman">Nadeem Ur Rahman</option>
//             <option value="Mithali Ade">Mithali Ade</option>
//           </select>
//         </div>

//         <div className="flex flex-wrap gap-3 w-full sm:w-auto">
//           <button
//             className="bg-blue-400 text-white px-4 py-2 rounded w-full sm:w-auto"
//             onClick={handleShow}
//           >
//             Show
//           </button>
//           <button
//             className="bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto"
//             onClick={handleAddNew}
//           >
//             Add New
//           </button>
//           <button
//             className="bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto"
//             onClick={handleImport}
//           >
//             Import
//           </button>
//         </div>
//       </div>

//       <div className="p-3">
//         <div className="flex flex-col md:flex-row mt-4 gap-4">
//           {/* Profile Section (unchanged) */}
//           <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
//             <img
//               src={profileImage ? URL.createObjectURL(profileImage) : ""}
//               alt="Profile"
//               className="rounded-full mx-auto w-32 h-32"
//             />
//             <h3 className="font-semibold mt-2">{selectedEmployee}</h3>
//             <input
//               type="file"
//               className="mt-4 border p-2 w-full rounded-md"
//               onChange={handleProfileImageChange}
//             />
//             <button
//               className="bg-green-500 text-white px-4 py-2 w-full mt-2 rounded"
//               onClick={handleSavePayroll}
//             >
//               Update
//             </button>
//           </div>

//           <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border w-full">
//             <div className="border-b pb-2 mb-4 flex flex-wrap gap-4 text-black justify-start">
//               {/* Navigation Links */}
//               <Link 
//               to="/employeemanagement/employee_profile" 
//               className="hover:underline">
//                 Employee Info
//               </Link>
//               <Link
//               to="/employeemanagement/employee_contact"
//               className="hover:underline">
//                 Contact Info
//               </Link>
//               <Link to="/employeemanagement/employeement_info">
//                 <button className="hover:underline">Employment Info</button>
//               </Link>
//               <Link to="/employeemanagement/payroll">
//                 <button className="font-bold underline">Payroll</button>
//               </Link>
//               <Link to="/employeemanagement/security">
//                 <button className="hover:underline">Security</button>
//               </Link>
//               <Link to="/employeemanagement/file">
//                 <button className="hover:underline">Files</button>
//               </Link>
//             </div>

//             {[
//               "pf",
//               "sses",
//               "eobi",
//             ].map((section, index) => (
//               <div key={index} className="mb-6">
//                 <h2 className="font-semibold text-lg mb-2">{section.toUpperCase()}</h2>
//                 <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
//                   <div>
//                     <label className="block text-gray-600 mb-1">Type</label>
//                     <select
//                       className="w-full p-2 border border-black rounded-md"
//                       value={payrollData[section].type}
//                       onChange={(e) =>
//                         handlePayrollChange(section, "type", e.target.value)
//                       }
//                     >
//                       <option value="">Select</option>
//                       <option value="Percentage">Percentage</option>
//                       <option value="Fixed">Fixed</option>
//                       <option value="None">None</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 mb-1">Employer Contribution</label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border border-black rounded-md"
//                       placeholder=""
//                       value={payrollData[section].employerContribution}
//                       onChange={(e) =>
//                         handlePayrollChange(section, "employerContribution", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-600 mb-1">Employee Contribution</label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border border-black rounded-md"
//                       placeholder=""
//                       value={payrollData[section].employeeContribution}
//                       onChange={(e) =>
//                         handlePayrollChange(section, "employeeContribution", e.target.value)
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payroll;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Payroll = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [payrollData, setPayrollData] = useState({
    pf: { type: "", employerContribution: "", employeeContribution: "" },
    sses: { type: "", employerContribution: "", employeeContribution: "" },
    eobi: { type: "", employerContribution: "", employeeContribution: "" },
  });

  const handleShow = () => {
    console.log("Show data for:", employees);
  };

  const handleAddNew = () => {
    console.log("Add new employee");
  };

  const handleImport = () => {
    console.log("Import data");
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/website/employeeInfoRoute/employeeinfo`
        );
        if (response.data.status === 1 && response.data.employees) {
          console.log(response.data);
          setEmployees(response.data.employees);
          console.log("Fetched Employees:", response.data.employees);
        } else {
          setError(
            "Failed to fetch employee data: " +
              (response.data.msg || "Unknown error")
          );
        }
      } catch (err) {
        setError("Error fetching employees: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (e) => {
    const selectedEmployeeName = e.target.value;
    setSelectedEmployee(selectedEmployeeName);

    const foundEmployee = employees.find(
      (emp) => emp.name === selectedEmployeeName
    );
    console.log("Selected Employee Data:", foundEmployee); // Debugging output

    if (foundEmployee) {
      setEmployeeData({
        ...employeeData,
        profileName: foundEmployee.name,
      });
    } else {
      setEmployeeData({
        ...employeeData,
        profileName: "",
      });
    }
  };

  const handlePayrollChange = (section, field, value) => {
    setPayrollData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSavePayroll = async () => {
    try {
      const payload = {
        ...payrollData,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/payrollRoute/payroll`,
        payload
      );
      if (response.data.status === 1) {
        alert("Employee details saved successfully!");
      } else {
        alert("Error saving employee details.");
      }
      console.log("Payroll data saved:", response.data);
    } catch (error) {
      console.error("Error saving payroll data:", error);
    }
  };

  return (
    <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
      <h1 className="font-bold text-xl">Employee Info</h1>

      <div className="bg-white p-4 rounded-lg flex flex-wrap mt-3 gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          {/* <select
            className="w-full sm:w-60 p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="hr">Officer</option>
            <option value="it">Jr. Officer</option>
            <option value="finance">Manager</option>
          </select> */}

          <select
            className="w-full md:w-60 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md"
            value={selectedEmployee}
            onChange={handleEmployeeSelect}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleShow}
          >
            Show
          </button>
          <button
            className="bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleAddNew}
          >
            Add New
          </button>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="flex flex-col md:flex-row mt-4 gap-4">
          {/* Profile Section (unchanged) */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
            <img
              src="//"
              alt="Profile"
              className="rounded-full mx-auto w-32 h-32"
            />
            <h3 className="font-semibold mt-2">{selectedEmployee}</h3>
            {/* <input
              type="file"
              className="mt-4 border p-2 w-full rounded-md"
              onChange={handleProfileImageChange}
            /> */}
            <button
              className="bg-green-500 text-white px-4 py-2 w-full mt-2 rounded"
              onClick={handleSavePayroll}
            >
              Update
            </button>
          </div>

          <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border w-full">
            <div className="border-b pb-2 mb-4 flex flex-wrap gap-4 text-black justify-start">
              {/* Navigation Links */}
              <Link
                to="/employeemanagement/employee_profile"
                className="hover:underline"
              >
                Employee Info
              </Link>
              <Link
                to="/employeemanagement/employee_contact"
                className="hover:underline"
              >
                Contact Info
              </Link>
              <Link to="/employeemanagement/employeement_info">
                <button className="hover:underline">Employment Info</button>
              </Link>
              <Link to="/employeemanagement/payroll">
                <button className="font-bold underline">Payroll</button>
              </Link>
              <Link to="/employeemanagement/security">
                <button className="hover:underline">Security</button>
              </Link>
              <Link to="/employeemanagement/file">
                <button className="hover:underline">Files</button>
              </Link>
            </div>

            {["pf", "sses", "eobi"].map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="font-semibold text-lg mb-2">
                  {section.toUpperCase()}
                </h2>
                <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Type</label>
                    <select
                      className="w-full p-2 border border-black rounded-md"
                      value={payrollData[section].type}
                      onChange={(e) =>
                        handlePayrollChange(section, "type", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="Percentage">Percentage</option>
                      <option value="Fixed">Fixed</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">
                      Employer Contribution
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      placeholder=""
                      value={payrollData[section].employerContribution}
                      onChange={(e) =>
                        handlePayrollChange(
                          section,
                          "employerContribution",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">
                      Employee Contribution
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black rounded-md"
                      placeholder=""
                      value={payrollData[section].employeeContribution}
                      onChange={(e) =>
                        handlePayrollChange(
                          section,
                          "employeeContribution",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;