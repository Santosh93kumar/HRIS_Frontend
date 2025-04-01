import React from 'react'
import Sidebar from '../Component/Sidebar'
import Home from '../Component/Dashboard/Home'
import { Outlet } from 'react-router-dom'

function Homepage() {
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

export default Homepage
