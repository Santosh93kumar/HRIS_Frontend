import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import ManagmentDashboard from "./ManagmentDashboard";
import homeIcon from "../Image/homeIcon.png";
import userProfileIcon from "../Image/userProfile.png";
import axios from "axios";

function Home() {
  const [totalReg, settotalReg]  = useState([])
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("From Date");
  const [activeTab, setActiveTab] = useState("employee"); // Default tab is Employee Dashboard
  const [data, setData] = useState([]);
  const [len, setlength] = useState([]);
  const [pres, setpres ] = useState([])
    const [date, setDate] = useState('');
    console.log('date--',date)
  

  useEffect(() => {

    const now = new Date();

    // Format time to 12-hour format with AM/PM
    const hour24 = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hour24 >= 12 ? "PM" : "AM";
    let hour12 = hour24 % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;

    // Get full date details
    const dayNum = now.getDate();
    const monthIndex = now.getMonth();
    const year = now.getFullYear();
    const shortMonthsArr = [
      "Jan", "Feb", "Mar", "April", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    // Set state values with current time, formatted date and day
   
    setDate(`${dayNum} ${shortMonthsArr[monthIndex]}`);
    if(!date) return;
    
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/getAllPunchDetails` 
          
        );


        const res= await axios.get(
          `${import.meta.env.VITE_API_URL}/getEmployeeInfo` 
        )
        console.log(res)
        settotalReg(res.data.data.length);

        const result = await response.json();
        const result_ = result.data
        setData(result_ || []);
        const allDates = result_.map(item => item.date);
        console.log('allDates',allDates)
     
        const present = allDates.filter(item => item.trim().toLowerCase() === date.trim().toLowerCase());
        setpres(present)

        console.log('present',present)
        console.log('hey',result.data)
        setlength(result.data.length  || 0)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [date]);


  

  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        {/* Header */}
        <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
          <div className="flex justify-center items-center space-x-1.5">
            <p className="text-gray-300 text-xl">Novanectar</p>
            <img
              src="/logo.jpg"
              className="h-16 w-16 rounded-full"
              alt="Profile"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#dbf2ff] p-4 flex flex-col">
          {/* Tabs */}
          <div className="grid grid-cols-[31%_auto] border-[#D3D3D3]">
            {/* Employee Dashboard Tab */}
            <div
              className={`cursor-pointer flex items-center gap-3 p-2 border-r border-[#D3D3D3] ${
                activeTab === "employee"
                  ? "font-[500] text-[20px] text-[#636363] bg-white border-[1px] border-b-0"
                  : "bg-transparent text-[#0091DF] border-b-[1px]"
              }`}
              onClick={() => setActiveTab("employee")}
            >
              <img
                src={homeIcon}
                alt="Home Icon"
                className={`w-[16px] transition-all duration-300 ${
                  activeTab === "employee" ? "text-[#636363]" : "text-[#0091DF]"
                }`}
              />
              <p
                className={`font-[500] text-[18px] md:text-[20px] ${
                  activeTab === "employee" ? "text-[#636363]" : "text-[#0091DF]"
                }`}
              >
                Employee Dashboard
              </p>
            </div>

            {/* Management Dashboard Tab */}
            <div
              className={`cursor-pointer flex items-center gap-3 p-2 ${
                activeTab === "management"
                  ? "font-[500] text-[20px] text-blue-600 bg-white border border-b-0 border-[#D3D3D3]"
                  : "text-[#0091DF] border-b-[1px] border-[#D3D3D3]"
              }`}
              onClick={() => setActiveTab("management")}
            >
              <img
                src={userProfileIcon}
                alt="User Icon"
                className={`w-[16px] transition-all duration-300 ${
                  activeTab === "management"
                    ? "text-[#636363]"
                    : "text-[#0091DF]"
                }`}
              />
              <p
                className={`font-[500] text-[18px] md:text-[20px] ${
                  activeTab === "management"
                    ? "text-[#636363]"
                    : "text-[#0091DF]"
                }`}
              >
                Management Dashboard
              </p>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="mt-4 w-full">
            {activeTab === "employee" && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700">
                  Employee Dashboard
                </h2>
                {/* Employee Dashboard Cards */}
                <div className="grid grid-cols-[15%_30%_15%_15%_15%] gap-5 mt-4">
                  <div className="bg-[#26B3FF] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
                    <div className="flex flex-col items-center text-white">
                      <h1 className="pt-4 font-[500] text-[18px] text-center">
                       {totalReg}
                      </h1>
                      <p className="pt-1 font-[500] text-[14px]">
                        Total Employee
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#24948A] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
                    <div className="flex flex-col items-center text-white">
                      <h1 className="pt-4 font-[500] text-[18px] text-center">
                    {  pres.length}
                      </h1>
                      <p className="pt-1 font-[500] text-[14px]">
                        Present Today
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#FFD755] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
                    <div className="flex flex-col items-center text-white">
                      <h1 className="pt-4 font-[500] text-[18px] text-center">
                        {totalReg - pres.length}
                      </h1>
                      <p className="pt-1 font-[500] text-[14px]">
                        Absent Today
                      </p>
                    </div>
                  </div>
                  
                  {/* <div className="bg-[#FF0022] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
                    <div className="flex flex-col items-center text-white">
                      <h1 className="pt-4 font-[500] text-[18px] text-center">
                        0
                      </h1>
                      <p className="pt-1 font-[500] text-[14px]">
                        Late Today
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#005D8F] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
                    <div className="flex flex-col items-center text-white">
                      <h1 className="pt-4 font-[500] text-[18px] text-center">
                        0
                      </h1>
                      <p className="pt-1 font-[500] text-[14px]">
                        On Time Today
                      </p>
                    </div>
                  </div> */}
                </div>

                {/* Attendance Summary Report */}
                <div className="mt-6">
                  <p className="font-medium text-lg pb-3">
                    Attendance Summary Report of the Day
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0 bg-white p-4">
                      <thead className="bg-[#D6D6D6]">
                        <tr className="font-semibold text-gray-700 text-sm md:text-base">
                          {[
                            "Employee Name",
                            "Department",
                            "Present",
                            "Date",
                            "Punch in Time",
                          ].map((heading, index) => (
                            <th
                              key={index}
                              className="border-r border-gray-300 px-4 py-2 text-left"
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0 ? (
                          data.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-300"
                            >
                              <td className="px-4 py-2">
                                {item.name || "N/A"}
                              </td>
                              <td className="px-4 py-2">
                                {item.department || "N/A"}
                              </td>
                              {/* Present Column */}
                              <td className="px-4 py-2">
                                {item.punchIn ? "✔️" : "0"}
                              </td>
                              {/* Absent Column */}
                              <td className="px-4 py-2">
                                {item.date }
                              </td>
                              <td className="px-4 py-2">{item.punchIn}</td>
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
                </div>
              </div>
            )}

            {/* Management Dashboard */}
            {activeTab === "management" && (
              <div className="p-4 bg-[#dbf2ff]">
                <div className="bg-white p-4 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 items-center">
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      {[
                        "3 Days",
                        "7 Days",
                        "15 Days",
                        "1 Month",
                        "2 Months",
                      ].map((day, index) => (
                        <div
                          key={index}
                          className="bg-[#A4DFFF] px-4 py-2 rounded-xl font-[400] text-[14px] md:text-[15px]"
                        >
                          <p>{day}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 md:gap-4">
                      <input
                        type="date"
                        className="border border-[#D6D6D6] py-1 px-2 text-[#818181] text-[14px] md:text-[15px] rounded"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <input
                        type="date"
                        className="border border-[#D6D6D6] py-1 px-2 text-[#818181] text-[14px] md:text-[15px] rounded"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                      <button className="bg-[#00A6FF] px-4 py-2 text-white rounded-xl font-medium">
                        Show
                      </button>
                    </div>
                  </div>
                </div>

                <ManagmentDashboard />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { GoHome } from "react-icons/go";
// import { FaRegUser } from "react-icons/fa";
// import ManagmentDashboard from "./ManagmentDashboard";
// import homeIcon from "../Image/homeIcon.png"
// import userProfileIcon from "../Image/userProfile.png"
// import axios from "axios";

// function Home() {
//   const [toDate, setToDate] = useState("");
//   const [fromDate, setFromDate] = useState("From Date");
//   const [activeTab, setActiveTab] = useState("employee"); // Default tab is Employee Dashboard
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartmentData = async () => {
//       try {
//         await axios.get("http://localhost:8000/website/dashboardroute/dashboard")
//           .then((res) => {
//             console.log(res.data);
//             const formattedData = res.data.map(dept => ({
//               departmentName: dept.departmentName.charAt(0).toUpperCase() + dept.departmentName.slice(1).toLowerCase(),
//               count: dept.count
//             }));
//             setDepartments(formattedData);
//           });
//       } catch (error) {
//         console.error("Error fetching department data:", error);
//       }
//     };

//     fetchDepartmentData();
//   }, []);
//   return (
//     <>
//       <section className="bg-sky-100 flex flex-col w-full h-screen">
//         {/* Header */}
//         <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
//           <div className="flex justify-center items-center space-x-1.5">
//             <p className="text-gray-300 text-xl">Santosh</p>
//             <img
//               src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
//               className="h-16 w-16 rounded-full"
//               alt=""
//             />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-[#dbf2ff] p-4  flex flex-col ">
//           {/* Tabs */}
//           <div className="grid grid-cols-[31%_auto]  border-[#D3D3D3] ">
//   {/* Employee Dashboard Tab */}
// {/* Employee Dashboard Tab */}
// <div
//   className={`cursor-pointer flex items-center gap-3 p-2 border-r border-[#D3D3D3] ${
//     activeTab === "employee"
//       ? "font-[500] text-[20px] text-[#636363] bg-white border-[1px] border-b-0"
//       : "bg-transparent text-[#0091DF] border-b-[1px]"
//   }`}
//   onClick={() => setActiveTab("employee")}
// >
//   <img
//     src={homeIcon}
//     alt="Home Icon"
//     className={`w-[16px] transition-all duration-300 ${
//       activeTab === "employee" ? "text-[#636363]" : "text-[#0091DF]"
//     }`}
//   />
//   <p
//     className={`font-[500] text-[18px] md:text-[20px] ${
//       activeTab === "employee" ? "text-[#636363]" : "text-[#0091DF]"
//     }`}
//   >
//     Employee Dashboard
//   </p>
// </div>

// {/* Management Dashboard Tab */}
// <div
//   className={`cursor-pointer flex items-center gap-3 p-2 ${
//     activeTab === "management"
//       ? "font-[500] text-[20px] text-blue-600 bg-white border border-b-0 border-[#D3D3D3]"
//       : "text-[#0091DF] border-b-[1px] border-[#D3D3D3]"
//   }`}
//   onClick={() => setActiveTab("management")}
// >
//   <img
//     src={userProfileIcon}
//     alt="User Icon"
//     className={`w-[16px] transition-all duration-300 ${
//       activeTab === "management" ? "text-[#636363]" : "text-[#0091DF]"
//     }`}
//   />
//   <p
//     className={`font-[500] text-[18px] md:text-[20px] ${
//       activeTab === "management" ? "text-[#636363]" : "text-[#0091DF]"
//     }`}
//   >
//     Management Dashboard
//   </p>
// </div>

// </div>

//           {/* Dashboard Content (Both inside the same div) */}
//           <div className="mt-4 w-full">
//             {activeTab === "employee" && (
//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h2 className="text-xl font-bold text-gray-700">
//                   Employee Dashboard
//                 </h2>
//                 {/* Employee Dashboard Cards */}
//                 <div className="grid grid-cols-[15%_30%_15%_15%_15%] gap-5 mt-4">
//                   <div className="bg-[#26B3FF] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
//                     <div className="flex flex-col items-center text-white">
//                       <h1 className="pt-4 font-[500] text-[18px] text-center">
//                         15
//                       </h1>
//                       <p className="pt-1 font-[500] text-[14px]">
//                         Total Employee
//                       </p>
//                     </div>
//                   </div>
//                   <div className="bg-[#24948A] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
//                     <div className="flex flex-col items-center text-white">
//                       <h1 className="pt-4 font-[500] text-[18px] text-center">
//                         0
//                       </h1>
//                       <p className="pt-1 font-[500] text-[14px]">
//                         Present Today
//                       </p>
//                     </div>
//                   </div>
//                   <div className="bg-[#FFD755] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
//                     <div className="flex flex-col items-center text-white">
//                       <h1 className="pt-4 font-[500] text-[18px] text-center">
//                         15
//                       </h1>
//                       <p className="pt-1 font-[500] text-[14px]">
//                         Absent Today
//                       </p>
//                     </div>
//                   </div>
//                   <div className="bg-[#FF0022] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
//                     <div className="flex flex-col items-center text-white">
//                       <h1 className="pt-4 font-[500] text-[18px] text-center">
//                         0
//                       </h1>
//                       <p className="pt-1 font-[500] text-[14px]">Late Today</p>
//                     </div>
//                   </div>
//                   <div className="bg-[#005D8F] flex flex-col items-center justify-center pt-9 pb-7 rounded-2xl">
//                     <div className="flex flex-col items-center text-white">
//                       <h1 className="pt-4 font-[500] text-[18px] text-center">
//                         0
//                       </h1>
//                       <p className="pt-1 font-[500] text-[14px]">
//                         On Time Today
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Attendance Summary Report */}
//                 <div className="mt-6">
//       <p className="font-medium text-lg pb-3">
//         Attendance Summary Report of the Day
//       </p>
//       <div className="overflow-x-auto">
//         <table className="w-full border-separate border-spacing-0 bg-white p-4">
//           <thead className="bg-[#D6D6D6]">
//             <tr className="font-semibold text-gray-700 text-sm md:text-base">
//               {["Department", "Total Employee", "Present", "Absent", "On Time", "Late", "On Leave"].map((heading, index) => (
//                 <th key={index} className="border-r border-gray-300 px-4 py-2 text-left">
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {departments.map((dept, index) => (
//               <tr key={index} className="bg-white text-gray-600 font-medium text-sm md:text-base">
//                 <td className="border-r border-gray-300 px-4 py-2">{dept.departmentName}</td>
//                 <td className="border-r border-gray-300 px-4 py-2">{dept.count}</td>
//                 {Array.from({ length: 5 }).map((_, colIndex) => (
//                   <td key={colIndex} className="border-r border-gray-300 px-4 py-2">-</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//               </div>
//             )}

//             {/* Management Dashboard */}
//             {activeTab === "management" && (
//               <div className="p-4 bg-[#dbf2ff]">
//                 {/* Dashboard Header */}

//                 {/* Attendance Section */}
//                 <div className="bg-white p-4 rounded-xl">
//                   <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 items-center">
//                     {/* Attendance Buttons */}
//                     <div className="flex flex-wrap gap-2 md:gap-4">
//                       {[
//                         "3 Days",
//                         "7 Days",
//                         "15 Days",
//                         "1 Month",
//                         "2 Months",
//                       ].map((day, index) => (
//                         <div
//                           key={index}
//                           className="bg-[#A4DFFF] px-4 py-2 rounded-xl font-[400] text-[14px] md:text-[15px]"
//                         >
//                           <p>{day}</p>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Date Picker & Show Button */}
//                     <div className="flex flex-wrap justify-end gap-2 md:gap-4">
//                       <input
//                         type="date"
//                         className="border border-[#D6D6D6] py-1 px-2 text-[#818181] text-[14px] md:text-[15px] rounded"
//                         value={fromDate}
//                         onChange={(e) => setFromDate(e.target.value)}
//                       />
//                       <input
//                         type="date"
//                         className="border border-[#D6D6D6] py-1 px-2 text-[#818181] text-[14px] md:text-[15px] rounded"
//                         value={toDate}
//                         onChange={(e) => setToDate(e.target.value)}
//                       />
//                       <button className="bg-[#00A6FF] px-4 py-2 text-white rounded-xl font-medium">
//                         Show
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Profile & Additional Section */}
//                 <ManagmentDashboard />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;
