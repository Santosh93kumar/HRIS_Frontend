import React from 'react'
import Sidebar from '../Component/Sidebar'
import { Outlet } from 'react-router-dom'

function Payrollpage() {
  return (
    <>
        <div className='flex flex-row bg-sky-100 w-full'>
            <div className='w-3/12'>
                {<Sidebar />}
            </div>
            <div className='w-9/12'>
                <Outlet/>
            </div>
        </div>
    
    </>
  )
}

export default Payrollpage




