import React,{useState} from 'react'
import Sidebar from '../Component/Sidebar'
import Home from '../Component/Dashboard/Home'
import Attendance from '../Component/Attendance/Attendance'
import MyAttendanceReport from '../Component/Attendance/MyAttendanceReport';
import { Outlet } from 'react-router-dom';

function Attendancepage() {
  const [select , setSelected] = useState("Attendance");
  
  return (
    <>
        <div className='flex flex-row bg-sky-100 w-full'>
            <div className='w-3/12'>
                {<Sidebar />}
            </div>
            <div className='w-9/12'>
              <Outlet/>
             <Home/>
            </div>
        </div>
    
    </>
  )
}

export default Attendancepage;
