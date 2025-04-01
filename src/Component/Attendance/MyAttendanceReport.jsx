import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import crossIcon from "../Image/crossIcon.png";
import downArrow from "../Image/downArrow.png"
import calenderIcon from "../Image/calenderIcon.png"

function MyAttendanceReport() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);


  // Modal Values Variable
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (date) { // Ensure date is not empty before processing
      const [year, month, day] = date.split("-");
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const abbreviatedMonth = monthNames[parseInt(month, 10) - 1];
      const newFormattedDate = `${day}${abbreviatedMonth}`;
      setDate(newFormattedDate);
      console.log(newFormattedDate); // Output: "05Feb"
    }
  }, [date]); // Re-run effect whenever `date` changes


  const handleSubmit = () => {
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Reason:", reason);
    setIsOpen(false);
  };

  // getAllPunchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllPunchData`);
        const result = await response.json();
        console.log("result: ", result)
        setData(result.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // getEmployeeInfo
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getEmployeeInfo`);
        const result = await response.json();
        setEmployees(result.data || []);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchEmployeeData();
  }, []);

  // update the data
  const handlePunch = async (type) => {

    const payload = {
      name,
      date,
      time: formattedTime,
      day,
      punchIn: type === "Punch In" ? formattedTime : punchIn,
      punchOut: type === "Punch Out" ? formattedTime : punchOut,
      status: "Pending",
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/onlinePunch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save punch data");

      console.log("Punch successful:", await response.json());
    } catch (error) {
      console.error("Error sending punch data:", error);
    }
  };

  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  return (
    <section className="bg-sky-100 flex flex-col w-full h-screen">
      <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
        <div className="flex justify-center items-center space-x-1.5">
          <p className="text-gray-300 text-xl">Santosh</p>
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
            className="h-16 w-16 rounded-full"
            alt="User"
          />
        </div>
      </div>

      <div>
        <section className="bg-sky-100 flex flex-col w-full h-screen">
          <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
            <h1 className="font-[500] text-[18px]">Employee Attendance Report</h1>

            <div className="bg-white p-4 rounded-lg grid grid-cols-[80%_auto] mt-8 gap-4 items-center">
              {/* Left section with inputs */}
              <div className="flex gap-2 w-full">
                {/* Select Dropdown */}

                <select id="employeeSelect" onChange={handleChange} value={selectedEmployee}
                  className="flex-1 p-2 text-[#292929] text-[16px] font-[500] border border-[#292929] focus:outline-none rounded-[4px]"
                >
                  <option value="" disabled>Select an employee</option>
                  {employees.map((employee, index) => (
                    <option key={index} value={employee.name}>{employee.name}</option>
                  ))}
                </select>

                {/* Start Date Input */}
                <input
                  type="date"
                  className="flex-1 p-2 border border-[#292929] font-[500] focus:outline-none rounded-[4px]"
                  value=""
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) =>
                    e.target.value === "" &&
                    (e.target.type = "text", (e.target.placeholder = "From Date"))
                  }
                  placeholder="From Date"
                />

                {/* End Date Input */}
                <input
                  type="date"
                  className="flex-1 p-2 text-[#292929] text-[16px] font-[500] border border-[#292929] focus:outline-none rounded-[4px]"
                  value=""
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) =>
                    e.target.value === "" &&
                    (e.target.type = "text", (e.target.placeholder = "End Date"))
                  }
                  placeholder="End Date"
                />
              </div>

              {/* Right section with Button */}
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-8 py-2 rounded-md">
                  Show
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div>
              <h1 className="text-center text-2xl mb-4">My Attendance Report:</h1>
              <div className="w-full border">
                {/* Table Header */}
                {/* Table Body */}
                <div className="w-full border">
                  <div className="w-full flex justify-around bg-gray-200 border-b p-2">
                    <div className="flex-1 text-center font-bold">Name</div>
                    <div className="flex-1 text-center font-bold">Time</div>
                    <div className="flex-1 text-center font-bold">Day</div>
                    <div className="flex-1 text-center font-bold">Date</div>
                    <div className="flex-1 text-center font-bold">PunchIn</div>
                    <div className="flex-1 text-center font-bold">PunchOut</div>
                    <div className="flex-1 text-center font-bold">Status</div>
                    <div className="flex-1 text-center font-bold">Edit</div>
                  </div>
                  <div className="w-full">
                    {data.length > 0 ? (
                      data.map((item, index) => (
                        <div key={index} className="w-full flex justify-around gap-x-4 gap-y-2 p-2 border-b">
                          <div className="flex-1 text-center">{item.name || "No Name"}</div>
                          <div className="flex-1 text-center">{item.time || "No time"}</div>
                          <div className="flex-1 text-center">{item.day || "No day"}</div>
                          <div className="flex-1 text-center">{item.date || "No date"}</div>
                          <div className="flex-1 text-center">{item.punchIn || "No Time"}</div>
                          <div className="flex-1 text-center">{item.punchOut || "No Time"}</div>
                          <div className="flex-1 text-center">{item.status || "No Status"}</div>
                          <div className="flex-1 text-center">
                            <p className='flex justify-center cursor-pointer' onClick={() => setIsOpen(true)}>
                              <FaEdit />
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full p-2 text-center">No data available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popup Modal */}
        {
          isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xs px-4">
              <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-[578px] mx-auto relative">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b-[1px] border-[#D3D3D3] pb-3">
                  <p className="font-[600] text-[18px]">In Time Missing Time Entry</p>
                  <button onClick={() => setIsOpen(false)} className="w-[14px] h-[14px]">
                    <img src={crossIcon} alt="Close" />
                  </button>
                </div>

                {/* Form */}
                <div>
                  {/* Date & Time Fields */}
                  <div className="flex justify-evenly">
                    <div>
                      <label className="block text-[#535353] font-[600] text-[15px]">Date</label>
                      <div className="relative mt-[9px] flex items-center border-[1px] border-[#696969] rounded-lg p-2">
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="text-[#696969] text-[16px] font-[500] bg-transparent focus:outline-none w-full pr-10 cursor-pointer placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#535353] font-[600] text-[15px]">Time</label>
                      <div className="relative mt-[9px] flex items-center border-[1px] border-[#696969] rounded-lg p-2">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="text-[#696969] text-[16px] font-[500] bg-transparent focus:outline-none w-full pr-10 cursor-pointer placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reason Input */}
                  <div className="flex flex-col mt-4">
                    <label className="text-[#535353] font-[600] text-[15px]">Reason</label>
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="border-[1px] border-[#696969] rounded-lg p-2 text-[#696969] text-[16px] font-[500] bg-transparent focus:outline-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap mt-[18px] justify-end gap-2">
                    <button
                      className="w-[92px] h-[40px] rounded-[4px] bg-[#A1A1A1] text-white font-[600] text-[15px] p-[10px]"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="w-[92px] h-[40px] rounded-[4px] bg-[#238BB2] text-white font-[600] text-[15px] px-[27px] py-[10px]"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  );
}

export default MyAttendanceReport;
