import React from 'react';
import Header from '../Header';

function AttendanceDetailReport() {
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header/>

        
      

        <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
      <h1 className='font-semibold'>HR Attendance Details Report</h1>

      <div className="bg-white p-4 rounded-lg flex flex-wrap mt-8 gap-4 items-center">
        <select className="w-40 p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md" aria-label="Select Department">
          <option>Select Department</option>
          <option value="hr">HR</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
        </select>
        
        <select className="w-40 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md" aria-label="Select Employee">
          <option>Select Employee</option>
          <option value="john">John Doe</option>
          <option value="jane">Jane Smith</option>
        </select>

        <div className="relative">
          <input type="date" className="p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md w-40" placeholder="Select start date" />
        </div>
        
        <div className="relative">
          <input type="date" className="p-2 border-2 border-gray-600 outline-gray-400 text-gray-600 rounded-md w-40" placeholder="Select end date" />
        </div>
        
        <div className="flex-grow"></div> 
        <button className="bg-blue-500 text-white px-8 py-2 rounded-md">Show</button>
                {/* <img src={file} alt='icon'style={{width:"30px"}}/> */}
        
      </div>

    </div>

      </section>
    
    </>
  );
}

export default AttendanceDetailReport;
 



