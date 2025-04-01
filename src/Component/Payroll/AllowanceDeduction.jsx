import React from 'react';
import { useState} from 'react';
import Header from '../Header';
import AllowanceDeductionPopup from './AllowanceDeductionPopup';

function AllowanceDeduction() {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="bg-sky-100 flex flex-col w-full h-screen">
        <Header/>

        <h3>AllowanceDeduction</h3>
        <div>
                {/* Button to trigger the popup */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add 
                </button>

                <AllowanceDeductionPopup
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </div>

      </section>
    </>
  );
}

export default AllowanceDeduction;
 






