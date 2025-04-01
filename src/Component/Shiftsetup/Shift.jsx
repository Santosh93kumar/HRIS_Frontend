import React from 'react';


function Shift() {
 
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
          <div className="flex justify-center items-center space-x-1.5">
            <p className="text-gray-300 text-xl">Santosh</p>
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
              className="h-16 w-16 rounded-full"
              alt=""
            />
          </div>
        </div>

        <button
            onClick={() => setIsPopupOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
          >
            Open Setup Popup
          </button>

          {/* SetupPopup component */}
          {isPopupOpen && <SetupPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}

      </section>
    </>
  );
}

export default Shift;
