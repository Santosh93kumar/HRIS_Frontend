import React from 'react'

const PerformanceTemplate = () => {
  return (
    <section className="bg-sky-100 flex flex-col w-full min-h-screen">
      {/* Header */}
      <div className="h-20 bg-slate-700 flex justify-end items-center px-4">
        <div className="flex items-center space-x-2">
          <p className="text-gray-300 text-lg sm:text-xl">Santosh</p>
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
            className="h-12 w-12 sm:h-16 sm:w-16 rounded-full"
            alt="User Profile"
          />
        </div>
      </div>
      <div className='p-2 mt-2 '>
      <h2 className="text-2xl font-semibold px-3 mb-4">Performance Template</h2>
      <div className='bg-white p-3 rounded-lg flex justify-between gap-2 items-center mx-2  mt-8'>
        <select className='w-50 p-2 border-2 border-gray-600 outline-gray-400 rounded-md'>
          <option>Finance</option>
          <option value='hr'>hr</option>
          <option value='hr'>hr</option>
          <option value='hr'>hr</option>
        </select>
        <button className='bg-blue-500 text-white px-6 py-3 rounded-md '>Import template</button>
      </div>
      </div>
      </section>
  )
}

export default PerformanceTemplate;