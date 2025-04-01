// import React from 'react';
// import Header from '../Header';

// function GazettedHoliday() {
//   return (
//     <>
//       <section className="bg-sky-100 flex flex-col w-full h-screen">
//         <Header/>

//         <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
//       <h1 className='mb-3 font-semibold text-xl text-center md:text-left'>Gazetted Holidays</h1>

//       <div className="bg-white p-5 rounded flex flex-wrap items-center justify-center md:justify-between gap-5">
//         <div className="flex-1 w-full md:w-auto">
//           <input
//             type="text" placeholder="Name"
//             className="p-3 border-2 border-gray-600 outline-gray-400 text-gray-600 rounded-md w-full md:w-96"/>
//         </div>

//         <div className="flex gap-3 w-full md:w-auto justify-center md:justify-start">
//           <button className="bg-blue-400 text-white px-4 py-2 rounded w-full md:w-auto">Show</button>
//           <button className="bg-green-700 text-white px-4 py-2 rounded w-full md:w-auto">Add New</button>
//         </div>
//       </div>

//       <h1 className='bg-white p-5 my-3 rounded font-semibold text-center md:text-left'>Gazetted Holidays</h1>

//       <div className="flex justify-center md:justify-start">

//       </div>
//     </div>

//       </section>

//     </>
//   );
// }

// export default GazettedHoliday ;

import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";

function GazettedHoliday() {
  const [holidayData, setHolidayData] = useState({
    name: "",
    date: "",
  });

  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([]); // Store fetched holidays
  const [error, setError] = useState(null); // Store any errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHolidayData({ ...holidayData, [name]: value });
  };

  const handleAddHoliday = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/holidayRoute/holidays`,
        holidayData,
        {
          "Content-Type": "application/json",
        }
      );

      if (response.data.status === 1) {
        alert("Holiday details saved successfully!");
      } else {
        alert("Error saving holiday details.");
      }
    } catch (error) {
      console.error("Error submitting holiday data:", error);
    }
  };

  const handleShowHolidays = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/website/holidayRoute/holidays`
      );
      if (response.data.status === 1 && response.data.holidays) {
        console.log(response.data);
        setHolidays(response.data.holidays);
        console.log("Fetched Holiday Details:", response.data.holidays);
      } else {
        setError(
          "Failed to fetch holiday data: " +
            (response.data.msg || "Unknown error")
        );
      }
    } catch (err) {
      setError("Error fetching holiday data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleShowHolidays(); // Call the function inside useEffect
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full min-h-screen">
        <Header />

        <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
          <h1 className="mb-3 font-semibold text-xl text-center md:text-left">
            Gazetted Holidays
          </h1>

          <div className="bg-white p-5 rounded flex flex-wrap items-center justify-center md:justify-between gap-5">
            <div className="flex-1 flex-row w-full md:w-auto">
              <input
                type="text"
                name="name"
                placeholder="Holiday Name"
                value={holidayData.name}
                onChange={handleChange}
                className="p-3 border-2 border-gray-600 outline-gray-400 text-gray-600 rounded-md w-full md:w-96"
              />
              <input
                type="date"
                name="date"
                value={holidayData.date}
                onChange={handleChange}
                className="mx-3 p-3 border-2 border-gray-600 outline-gray-400 text-gray-600 rounded-md w-full md:w-auto"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto justify-center md:justify-start">
              <button
                onClick={handleShowHolidays}
                className="bg-blue-400 text-white px-4 py-2 rounded w-full md:w-auto"
              >
                Show
              </button>
              <button
                onClick={handleAddHoliday}
                className="bg-green-700 text-white px-4 py-2 rounded w-full md:w-auto"
              >
                Add New
              </button>
            </div>
          </div>

          <h1 className="bg-white p-5 my-3 rounded font-semibold text-center md:text-left">
            Gazetted Holidays
          </h1>

          <div className="flex justify-center md:justify-start">
            {error && <p className="text-red-500">{error}</p>}
            {/* Display error message */}
            {holidays.length > 0 ? (
              <table className="min-w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-600 text-white text-left">
                  <tr>
                    <th className="px-6 py-3">Holiday Name</th>
                    <th className="px-6 py-3">Holiday Date</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map((holiday, index) => (
                    <tr
                      key={holiday._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="px-6 py-3 border-b border-gray-300">
                        {holiday.name}
                      </td>
                      <td className="px-6 py-3 border-b border-gray-300">
                        {holiday.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No holidays found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default GazettedHoliday;
