import React from 'react';

function Longtermloan() {
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        {/* Header */}
        <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
          <div className="flex justify-center items-center space-x-1.5">
            <p className="text-gray-300 text-xl">Santosh</p>
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
              className="h-16 w-16 rounded-full"
              alt="Profile"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="mx-6 lg:mx-10 text-lg font-semibold">Long/Short Term Loan</h3>

        {/* Input Form */}
        <div className="bg-white mx-4 lg:mx-6 my-2 p-4 rounded-lg shadow-md">
          <div className="w-full">
            <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
              {/* LTA Input */}
              <div className="w-full md:w-2/12">
                <input
                  type="text"
                  className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                  placeholder="LTA"
                />
              </div>

              {/* Total Amount */}
              <div className="w-full md:w-2/12">
                <input
                  type="text"
                  className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                  placeholder="Total Amount"
                />
              </div>

              {/* Monthly Amount */}
              <div className="w-full md:w-2/12">
                <input
                  type="text"
                  className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                  placeholder="Monthly Amount"
                />
              </div>

              {/* Description */}
              <div className="w-full md:w-2/12">
                <input
                  type="text"
                  className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                  placeholder="Description"
                />
              </div>

              {/* Date Input */}
              <div className="w-full md:w-2/12">
                <input
                  type="date"
                  className="border border-gray-400 py-2 px-4 rounded-lg w-full"
                />
              </div>

              {/* Buttons - Aligned Properly */}
              <div className="w-full md:w-auto flex md:justify-end gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full md:w-auto">Submit</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full md:w-auto">Show</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Longtermloan;
