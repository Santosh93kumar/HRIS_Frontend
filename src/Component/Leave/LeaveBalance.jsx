import React from 'react';
import icon from "../Payroll/Print.png";
import Header from '../Header';



function LeaveBalance() {
  

   
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header />

        <section className="bg-sky-100 flex flex-col w-full h-screen">
        

        <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
        <h1 className='font-[500] text-[18px] '>Leave Balance</h1>
        <div className='w-full bg-white flex'>
          <div className='w-10/12 my-2.5'>
            <input type="text" className='w-10/12 h-12 ml-2.5 rounded-lg outline-none border border-gray-500 border-solid p-6'   />
          </div> 
          <div className='flex justify-end my-2.5 gap-2'>
            <button className='px-6 cursor-pointer py-2 bg-blue-500 rounded-lg flex justify-end items-center'>Show </button>
            <div className="cursor-pointer flex items-center">
              <img src={icon} alt="Print" className="w-10 h-10" />
            </div>
          </div> 
        </div> 
        </div>
      </section>

     


      </section>
    </>
  );
}

export default LeaveBalance;
