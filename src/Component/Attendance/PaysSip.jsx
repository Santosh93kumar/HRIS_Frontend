import React from 'react';
import Header from '../Header';
import v1 from '../Attendance/images/v1.png'
import './attendence.css'
function PaysSip() {
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header/>

        <div className="payslip">
      <h4>My Pay Slip</h4>
      <div className="inputs">
        <input type="text" placeholder='2023'/>
        <input type="text" placeholder='janaury' />
        <input type="text"  placeholder='Summary Report'/>

        <button>Show</button>
          <div className='copy'><img src={v1} alt="" /></div>
      </div>
      <div className="summary">
        <h3>Time Deduction Summary</h3>
        <input type="" />
      </div>
    </div>

      </section>
    </>
  );
}

export default PaysSip;
 



 





