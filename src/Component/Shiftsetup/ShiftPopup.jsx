import React, { useState, useEffect, useCallback } from "react";

const ShiftPop = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Shift");
  const [formData, setFormData] = useState({
    shiftName: "Overnights Shift",
    shiftIn: "",
    shiftOut: "",
    shiftOutNextDay: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-50">
      <div className="bg-white w-[757px] h-[441px] rounded-lg shadow-lg p-6 border border-gray-300 relative">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-300">
          Create New Shift
          <span className="text-sky-500"> (Overnights Swifts)</span>
        </h2>

        {/*  Tabs  */}
        <div className="flex font-medium ">
          {[
            "Shift",
            "Late & Early Relaxation",
            "Late Sitting & Over Time",
            "Working Days",
            "Leave",
            "Missing Time",
          ].map((tab) => (
            <button
              key={tab}
              className={`text-sm px-3 py-2
                                ${
                                  activeTab === tab
                                    ? "text-gray-600 font-semibold border-t-1 border-x-1 border-b-0 border-gray-300"
                                    : "text-sky-500 border-b-1 border-gray-300"
                                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-gray-700 font-medium block mb-2">
              Shift Name
            </label>
            <input
              type="text"
              value={formData.shiftName}
              className="w-1/2 p-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>

          {/* Shift Timing Inputs */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift IN
              </label>
              <input
                type="time"
                value={formData.shiftIn}
                onChange={(e) => handleInputChange("shiftIn", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift OUT
              </label>
              <input
                type="time"
                value={formData.shiftOut}
                onChange={(e) => handleInputChange("shiftOut", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift OUT Next Day
              </label>
              <input
                type="time"
                value={formData.shiftOutNextDay}
                onChange={(e) =>
                  handleInputChange("shiftOutNextDay", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-10 space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition-all"
          >
            Close
          </button>
          <button className="bg-sky-500 text-white px-5 py-2 rounded-md hover:bg-sky-400 transition-all">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftPop;
