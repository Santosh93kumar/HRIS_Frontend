import React, { useEffect, useState } from 'react';

function Onlinepunch() {
  const [data, setData] = useState([]);
  console.log("Printing Data", data);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [punchIn, setPunchIn] = useState('');
  const [punchOut, setPunchOut] = useState('');
  console.log("Date---", date);

  // Function to fetch punch data and update state
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllPunchData`);
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Initial fetch of punch data
  useEffect(() => {
    fetchData();
  }, []);

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
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    // Set state values with current time, formatted date and day
    setTime(formattedTime);
    setDate(`${dayNum} ${shortMonthsArr[monthIndex]}`);
    setDay(daysOfWeek[now.getDay()]);

    console.log('name', name);
    console.log('time', formattedTime);
    console.log('date', `${dayNum} ${shortMonthsArr[monthIndex]}`);
    console.log('day', daysOfWeek[now.getDay()]);
    console.log('punchIn', formattedTime);
    console.log('punchOut', formattedTime);
  }, [name]);

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

  // const handlePunch = async (type) => {
  //   const now = new Date();

  //   // Format current time to 12-hour format with AM/PM
  //   const hour24 = now.getHours();
  //   const minutes = String(now.getMinutes()).padStart(2, "0");
  //   const ampm = hour24 >= 12 ? "PM" : "AM";
  //   let hour12 = hour24 % 12 || 12;
  //   const formattedTime = `${hour12}:${minutes} ${ampm}`;

  //   if (type === "Punch In") {
  //     setPunchIn(formattedTime);
  //   } else if (type === "Punch Out") {
  //     setPunchOut(formattedTime);
  //   }

  //   console.log(name, date, day, formattedTime, type);

  //   const payload = {
  //     name,
  //     date,
  //     time: formattedTime,
  //     day,
  //     punchIn: type === "Punch In" ? formattedTime : punchIn,
  //     punchOut: type === "Punch Out" ? formattedTime : punchOut,
  //     status: "Pending",
  //   };

  //   try {
  //     const response = await fetch("
  // 
  // 
  // 
  // 
  // 
  // 
  // 
  // 
  // /onlinePunch", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) throw new Error("Failed to save punch data");

  //     console.log("Punch successful:", await response.json());

  //     // Fetch updated data immediately after punching
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error sending punch data:", error);
  //   }
  // };


  const handlePunch = async (type) => {
    const now = new Date();
  
    // Format current time to 12-hour format with AM/PM
    const hour24 = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hour24 >= 12 ? "PM" : "AM";
    let hour12 = hour24 % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;
  
    if (!name) {
      alert("Please select an employee before punching in/out.");
      return;
    }
  
    // Check if the employee already has a punch-in entry
    const existingEntry = data.find((item) => item.name === name && item.date === date);
  
    let payload;
  
    if (type === "Punch In") {
      if (existingEntry && existingEntry.punchIn) {
        alert("You have already punched in.");
        return;
      }
      payload = { name, date, day, time: formattedTime, punchIn: formattedTime, punchOut: null, status: "Pending" };
    } else if (type === "Punch Out") {
      if (!existingEntry || !existingEntry.punchIn) {
        alert("You must punch in before punching out.");
        return;
      }
      payload = { ...existingEntry, punchOut: formattedTime, status: "Completed" };
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/onlinePunch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("Failed to save punch data");
  
      console.log("Punch successful:", await response.json());
  
      // Fetch updated data immediately after punching
      fetchData();
    } catch (error) {
      console.error("Error sending punch data:", error);
    }
  };
  
  
  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
    setName(e.target.value);
  };

  return (
    <section className="bg-sky-100 flex flex-col w-full h-screen">
     

      <h3 className="mx-4 lg:mx-6">Punch IN Time, OUT Time auto</h3>

      <div className="flex md:flex-row justify-between mx-4 lg:mx-6 rounded-lg my-2 lg:my-4 bg-white px-3 py-1">
        <div className="flex items-center gap-12 w-full lg:w-12/12 md:mr-4">
          <div className="custom-selects w-full flex gap-5">
            <label htmlFor="employeeSelect">Select Employee:</label>
            <select id="employeeSelect" onChange={handleChange} value={selectedEmployee}>
              <option value="" disabled>Select an employee</option>
              {employees.map((employee, index) => (
                <option key={index} value={employee.name}>{employee.name}</option>
              ))}
            </select>
          </div>

          <input type="text" value={date} readOnly className="w-full rounded-lg outline-none py-1.5" />
        </div>

        <div className="w-full lg:w-5/12 flex justify-end text-white mt-2 md:mt-0">
          <div className="flex gap-2">
            <button onClick={() => handlePunch("Punch In")}
              className="px-3 py-2 bg-green-700 rounded-lg">Punch In</button>
            <button onClick={() => handlePunch("Punch Out")}
              className="px-3 py-2 bg-red-700 rounded-lg">Punch Out</button>
          </div>
        </div>
      </div>

      <h1 className="text-center text-2xl mb-4">Employee Attendance Records:</h1>
      <div className="w-full border">
        <div className="w-full flex justify-around bg-gray-200 border-b p-2">
          <div className="flex-1 text-center font-bold">Name</div>
          <div className="flex-1 text-center font-bold">Time</div>
          <div className="flex-1 text-center font-bold">Day</div>
          <div className="flex-1 text-center font-bold">Date</div>
          <div className="flex-1 text-center font-bold">PunchIn</div>
          <div className="flex-1 text-center font-bold">PunchOut</div>
          <div className="flex-1 text-center font-bold">Status</div>
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
              </div>
            ))
          ) : (
            <div className="w-full p-2 text-center">No data available</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Onlinepunch;
