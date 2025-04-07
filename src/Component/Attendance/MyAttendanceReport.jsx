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

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleUpdate = () => {
    // Do your update logic here
    console.log('Updated Item:', selectedItem);
    setIsOpen(false);
  };

  return (
    <section className="bg-sky-100 flex flex-col w-full h-screen">
      <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
       
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
                            <p className="flex justify-center cursor-pointer"
              onClick={() => handleEditClick(item)}>
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
        {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                value={selectedItem?.name || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                placeholder="Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={selectedItem?.time || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, time: e.target.value })}
                placeholder="Time"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={selectedItem?.day || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, day: e.target.value })}
                placeholder="Day"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={selectedItem?.date || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, date: e.target.value })}
                placeholder="Date"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={selectedItem?.punchIn || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, punchIn: e.target.value })}
                placeholder="Punch In"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={selectedItem?.punchOut || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, punchOut: e.target.value })}
                placeholder="Punch Out"
                className="border p-2 rounded"
              />
              <input
                type="text"
                value={selectedItem?.status || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                placeholder="Status"
                className="border p-2 rounded"
              />

              <button
                type="button"
                onClick={handleUpdate}
                className="bg-green-500 text-white py-2 rounded mt-4"
              >
                Update
              </button>
            </form>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-red-500 mt-2 underline text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}

export default MyAttendanceReport;
