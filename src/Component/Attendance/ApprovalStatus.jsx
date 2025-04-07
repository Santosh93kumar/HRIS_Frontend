// import React, { useEffect, useState } from 'react';
// import Calender from "./Calender"
// import axios from 'axios';
// function ApprovalStatus() {

//     const [leaveData, setLeavedata] = useState([]);


// useEffect(()=>{
//     axios.get("http://localhost:8000/website/leave/leaveentryalldata")
//     .then((res)=>{
//         if(res.data.status===1){
//             setLeavedata(res.data.data)
//         }
//     }).catch((error)=>{
//         console.error('Error fetchin',error)
//     })
// },[])

//   return (
//     <>
//       <section className="bg-sky-100 flex flex-col w-full h-screen">
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
//         <h3 className=''>Transaction Status Report </h3>
//         <div className="flex flex-row justify-between mx-4 lg:mx-6 rounded-lg my-2 lg:my-4 bg-white px-3 py-1">
//         <div className="flex flex-row gap-2">
//         <input type="date"  className="p-2 border-2 border-gray-600 outline-gray-400 text-gray-600 rounded-md w-40 lg:w-60" placeholderText="From date" />
//         <input type="date"  className="p-2 border-2 border-gray-600 outline-gray-400 text-gray-600 rounded-md w-40 lg:w-60" placeholderText="To date" />
//         </div>
//         <div>
//             <button className='px-3 py-2 rounded-lg text-white bg-blue-500'>show </button>
//         </div>
//         </div>
//         <section className='bg-white rounded mx-4 lg:mx-6 my-2 lg:my-4 flex flex-col px-3 py-1'>
//             <h5 className='text-lg font-semibold'>leaves</h5>
//             <div className="p-2 flex w-full rounded-lg mt-2 bg-gray-300">
//                 <div className='w-5/12 flex-row flex'>
//                     <div className='w-full flex flex-row'>
//                         <div className='w-3/12 '>
//                             <p className='font-semibold text-base'>Date</p>
//                         </div>
//                         <div className='w-4/12'>
//                             <p className='font-semibold text-base'>Leave Name</p>
//                         </div>
//                         <div className=' w-3/12'>
//                             <p className='font-semibold text-base'>Leave</p>
//                         </div>
//                         <div className='w-2/12'>
//                             <p className='font-semibold text-base'>Reason</p>
//                         </div>  
//                     </div>
//                 </div>
//                 <div className='w-7/12'>
//                     <div className='w-full flex flex-row'>
                       
//                         <div className='w-1/12'>
//                         <p className='font-semibold text-base'>HR</p>
//                         </div>
                        
//                         <div className='w-2/12'>
//                         <p className='font-semibold text-base'>Rejected</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {leaveData.map((leave, index) => (
//             <div key={index} className="p-2 flex w-full rounded-lg mt-2 border border-solid border-black">
//               <div className='w-5/12 flex-row flex'>
//                 <div className='w-full flex flex-row'>
//                   <div className='w-3/12'><p className='text-base'>{leave.leaveFromDate}</p></div>
//                   <div className='w-4/12'><p className='text-base'>{leave.leaveType}</p></div>
//                   <div className='w-3/12'><p className='text-base'>{leave.leavePeriod}</p></div>
//                   <div className='w-2/12'><p className='text-base'>{leave.remarks}</p></div>
//                 </div>
//               </div>
//               <div className='w-7/12'>
//                 <div className='w-full flex flex-row'>
//                   <div className='w-6/12'></div>
//                   <div className='w-2/12'><input type="checkbox" /></div>
//                   <div className='w-1/12'><input type="checkbox" /></div>
                  
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>
//       </section>
//     </>
//   );
// }


// export default ApprovalStatus;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApprovalStatus() {
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/website/leave/leaveentryalldata`)
      .then((res) => {
        if (res.data.status === 1) {
          const updatedData = res.data.data.map(leave => ({
            ...leave,
            status: "Pending" // Default status
          }));
          setLeaveData(updatedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleStatusChange = (index, status) => {
    setLeaveData(prevData =>
      prevData.map((leave, i) =>
        i === index ? { ...leave, status } : leave
      )
    );
  };

  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/website/approvalstatusreportroutes/approvalstatusreport`, leaveData)
      .then(response => {
        console.log("Data sent successfully:", response.data);
        toast.success("Leave statuses updated successfully! ✅", {
          position: "top-right",
          autoClose: 3000
        });
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-sky-100 flex flex-col w-full h-screen">
       
        <h3 className='text-center my-2 font-bold text-xl'>Transaction Status Report</h3>

        <div className="flex flex-row justify-between mx-4 lg:mx-6 rounded-lg my-2 lg:my-4 bg-white px-3 py-1">
          <div className="flex flex-row gap-2">
            <input type="date" className="p-2 border-2 border-gray-600 rounded-md w-40 lg:w-60" />
            <input type="date" className="p-2 border-2 border-gray-600 rounded-md w-40 lg:w-60" />
          </div>
          <button className='px-3 py-2 rounded-lg text-white bg-blue-500'>Show</button>
        </div>

        <section className='bg-white rounded mx-4 lg:mx-6 my-2 lg:my-4 flex flex-col px-3 py-1'>
          <h5 className='text-lg font-semibold'>Leaves</h5>

          <div className="p-2 flex w-full rounded-lg mt-2 bg-gray-300">
            <div className='w-full flex flex-row'>
              {["Date", "Leave Name", "Leave", "Reason", "Approved", "Rejected"].map((header, idx) => (
                <div key={idx} className='w-1/6 text-center'>
                  <p className='font-semibold text-base'>{header}</p>
                </div>
              ))}
            </div>
          </div>

          {leaveData.map((leave, index) => (
            <div key={index} className="p-2 flex w-full rounded-lg mt-2 border border-solid border-black">
              <div className='w-full flex flex-row'>
                <div className='w-1/6 text-center'><p className='text-base'>{leave.leaveFromDate}</p></div>
                <div className='w-1/6 text-center'><p className='text-base'>{leave.leaveType}</p></div>
                <div className='w-1/6 text-center'><p className='text-base'>{leave.leavePeriod}</p></div>
                <div className='w-1/6 text-center'><p className='text-base'>{leave.remarks}</p></div>
                <div className='w-1/6 text-center'>
                  <input 
                    type="radio" 
                    name={`status-${index}`} 
                    checked={leave.status === "Approved"} 
                    onChange={() => handleStatusChange(index, "Approved")} 
                  />
                </div>
                <div className='w-1/6 text-center'>
                  <input 
                    type="radio" 
                    name={`status-${index}`} 
                    checked={leave.status === "Rejected"} 
                    onChange={() => handleStatusChange(index, "Rejected")} 
                  />
                </div>
              </div>
            </div>
          ))}

          <button 
            className='px-4 py-2 mt-4 self-center bg-green-500 text-white rounded-lg'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </section>
      </section>
    </>
  );
}

export default ApprovalStatus;
