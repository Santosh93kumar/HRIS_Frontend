// import React,{useState} from "react";

// function AttendanceSummary() {
//         const [showTable, setShowTable] = useState(false);
    
//         const handleShow = () => {
//             setShowTable(true);
//         };
    
//   return (
//     <div className="flex flex-col">
//       <div className="bg-sky-100 h-16 bg-slate-700 flex flex-col w-full justify-end items-center pr-3"></div>

//       <div className="pt-4 pb-3 pr-8 pl-3">
//         <div className="flex items-start mb-3 font-medium text-base">
//           <h1 className="pl-1">Attendance Summary Report</h1>
//         </div>

//         {/* Filters */}
//         <div className="flex gap-3 mb-5 bg-white rounded-lg p-3 items-center">
//           <select className="p-1 border rounded w-1/6">
//             <option>Select Employee</option>
//             <option>Saria Khan</option>
//             <option>Hussan Khan</option>
//             <option>Ibad ur Rahman</option>
//             <option>Nadeem ur Rahman</option>
//             <option></option>
//           </select>
//           <input
//             type="date"
//             name="From Date"
//             className="p-1 border rounded w-1/6"
//           />
//           <input type="date" className="p-1 border rounded w-1/6" />
//           <div className="flex-grow"></div>
//           <button className="bg-blue-500 text-white px-3 py-1 rounded "
//                                       onClick={handleShow}>
//             Show
//           </button>
//         </div>


// {/* Tables  */}
// {showTable && (
//   <>
//     {/* Day Deduction Summary */}
//         <div className="mb-3">
//           <h3 className="p-1 font-semibold text-base mb-1 mt-7 text-gray-800">
//             Day Deduction Summary
//           </h3>
//           <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-1 px-3">Name</th>
//                 <th className="py-1 px-3">Joining Date</th>
//                 <th className="py-1 px-3">Separation Date</th>
//                 <th className="py-1 px-3">Days Before Joining</th>
//                 <th className="py-1 px-3">Days after Separation</th>
//                 <th className="py-1 px-3">Absent Days</th>
//                 <th className="py-1 px-3">Unpaid Leaves</th>
//                 <th className="py-1 px-3">Suspension Days</th>
//                 <th className="py-1 px-3">Days to be Deducted</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               <tr>
//                 <td className="px-2 py-5 border border-gray-200">
//                   Ibad ur Rahman
//                 </td>
//                 <td className="px-2 py-5 border border-gray-200">02-01-2019</td>
//                 <td className="px-2 py-5 border border-gray-200">01-01-2024</td>
//                 <td className="px-2 py-5 border border-gray-200">0</td>
//                 <td className="px-2 py-5 border border-gray-200">0</td>
//                 <td className="px-2 py-5 border border-gray-200">5</td>
//                 <td className="px-2 py-5 border border-gray-200">0</td>
//                 <td className="px-2 py-5 border border-gray-200">0</td>
//                 <td className="px-2 py-5 border border-gray-200">5</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Time Deduction Summary */}
//         <div className="mb-3">
//           <h3 className="p-1 font-semibold text-base mb-1 mt-7 text-gray-800">
//             Time Deduction Summary
//           </h3>
//           <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-1 px-3">Late Coming</th>
//                 <th className="py-1 px-3">Entry Going</th>
//                 <th className="py-1 px-3">Late Exemption</th>
//                 <th className="py-1 px-3">Early Exemption</th>
//                 <th className="py-1 px-3">Late Deduction</th>
//                 <th className="py-1 px-3">Early Deduction</th>
//                 <th className="py-1 px-3">Time Deduction</th>
//                 <th className="py-1 px-3">Description</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               <tr>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">11:20</td>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">
//                   103:53
//                 </td>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">5:10</td>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">2:35</td>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">8:33</td>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">
//                   102:47
//                 </td>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">0</td>
//                 <td className="px-2 pt-5 pb-1 border border-gray-200">
//                   10 Times Late <br />
//                   6.0 Late Than 60
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Attendance Details */}
//         <div className="mb-3">
//           <h3 className="p-1 font-semibold text-base mb-1 mt-7 text-gray-800">
//             Attendance Details
//           </h3>
//           <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Date</th>
//                 <th className="p-3">IN</th>
//                 <th className="p-3">OUT</th>
//                 <th className="p-3">Late</th>
//                 <th className="p-3">Early</th>
//                 <th className="p-3">Holiday Gazette</th>
//                 <th className="p-3">Late Sitting Amount</th>
//                 <th className="p-3">Leave Name</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {Array(6)
//                 .fill(0)
//                 .map((_, i) => (
//                   <tr key={i} className={i === 0 ? "bg-sky-200 border-0" : ""}>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       Ibad ur Rahman
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       01-01-2023
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       9:00 AM
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       5:32 PM
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       0
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       0
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       0
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200">
//                       0
//                     </td>
//                     <td className="px-2 pt-5 pb-1 border-r border-gray-200"></td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//           </div>
//         </>
//       )}
//     </div>
//   </div>
//   );
// }

// export default AttendanceSummary; 


import React, { useState, useEffect } from "react";
import axios from "axios";

function AttendanceSummary() {
  const [data, setData] = useState([]);
  console.log(data)
  const [showTable, setShowTable] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeData, setEmployeeData] = useState({
    profileName: "",
    joiningDate: null,
    separationDate: null,
  });

  const handleShow = () => {
    setShowTable(true);
  };

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8000/website/employementInfoRoute/employementInfo"
  //       );
  //       if (response.data.status === 1 && response.data.employees) {
  //         console.log(response.data);
  //         setEmployees(
  //           response.data.employees.map((emp) => ({ name: emp.profileName }))
  //         ); // Extract profileName to use as employee name
  //         console.log("Fetched Employees:", response.data.employees);
  //       } else {
  //         setError(
  //           "Failed to fetch employee data: " +
  //             (response.data.msg || "Unknown error")
  //         );
  //       }
  //     } catch (err) {
  //       setError("Error fetching employees: " + err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchEmployees();
  // }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllPunchDetails`
          );
          
          const result = await response.json();
          setData(result.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
  const handleEmployeeSelect = async (e) => {
    const selectedEmployeeName = e.target.value;
    setSelectedEmployee(selectedEmployeeName);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/website/employementInfoRoute/employementInfo`
      );
      cconsole.log(response)
      if (response.data.status === 1 && Array.isArray(response.data.employees)) {
        console.log(response.data);
        const employeeInfo = response.data.employees.find(
          (emp) => emp.profileName === selectedEmployeeName
        );

        if (employeeInfo) {
          setEmployeeData({
            profileName: selectedEmployeeName,
            joiningDate: employeeInfo.joiningDate,
            separationDate: employeeInfo.separationDate,
          });
          console.log("joiningDate:", employeeInfo.joiningDate);
          console.log("separationDate:", employeeInfo.separationDate);
        } else {
          setEmployeeData({
            profileName: selectedEmployeeName,
            joiningDate: null,
            separationDate: null,
          });
        }
      } else {
        setEmployeeData({
          profileName: selectedEmployeeName,
          joiningDate: null,
          separationDate: null,
        });
      }
    } catch (error) {
      console.error("Error fetching employee employment data:", error);
      setEmployeeData({
        profileName: selectedEmployeeName,
        joiningDate: null,
        separationDate: null,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-sky-100 h-16  flex flex-col w-full justify-end items-center pr-3"></div>

      <div className="pt-4 pb-3 pr-8 pl-3">
        <div className="flex items-start mb-3 font-medium text-base">
          <h1 className="pl-1">Attendance Summary Report</h1>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5 bg-white rounded-lg p-3 items-center">
          <select
            value={selectedEmployee}
            onChange={handleEmployeeSelect}
            className="p-1 border rounded w-1/6"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.name} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="From Date"
            className="p-1 border rounded w-1/6"
          />
          <input type="date" className="p-1 border rounded w-1/6" />
          <div className="flex-grow"></div>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded "
            onClick={handleShow}
          >
            Show
          </button>
        </div>

        {/* Tables  */}
        {showTable && (
          <>


            {/* Attendance Details */}
            <div className="mb-3">
              <h3 className="p-1 font-semibold text-base mb-1 mt-7 text-gray-800">
                Attendance Details
              </h3>
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">IN</th>
                    <th className="p-3">OUT</th>
                    <th className="p-3">Late</th>
                    <th className="p-3">Early</th>
                    <th className="p-3">Holiday Gazette</th>
                    <th className="p-3">Late Sitting Amount</th>
                    <th className="p-3">Leave Name</th>
                  </tr>
                </thead>
                <tbody>
                        {data.length > 0 ? (
                          data.map((item, index) => (
                            <tr key={index} className="border-b border-gray-300">
                              <td className="px-4 py-2">
                                {item.name || "N/A"}
                              </td>
                              <td className="px-4 py-2">
                                {item.date || "N/A"}
                              </td>
                              {/* Present Column */}
                              {/* <td className="px-4 py-2">
                                {item.punchIn ? "Present" : "0"}
                              </td> */}
                              {/* Absent Column */}
                              <td className="px-4 py-2">
                                {item.punchIn ? item.punchIn : "-"}
                              </td>
                              <td className="px-4 py-2">
                                {item.punchOut?item.punchOut:"-"}
                              </td>
                              {/* <td className="px-4 py-2">
                                {item.late || 0}
                              </td>
                              <td className="px-4 py-2">
                                {item.onLeave || 0}
                              </td> */}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center py-4">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AttendanceSummary;





