import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const SetupPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Shift');
  const [formData, setFormData] = useState({
    lateEarlyRelaxation: {
      dailyLateMinute: '',
      dayEarlyMinute: '',
      monthlyLateMinute: '',
      monthlyEarlyMinute: '',
      monthlySpecialNoLate: '',
      minuteForOneTimeLate: '',
      noOfLateWithoutSpecialLate: '',
      dayToDeduct: '',
    },
    lateShiftinOverTime: {
      dailyLateMinute: '',
      lateShiftinTime: '',
      lateShiftingMinute: '',
      overTimePerMonth: '',
      overTimePerDay: '',
    },
    workingDays: [
      { day: "Monday", checked: true },
      { day: "Tuesday", checked: true },
      { day: "Wednesday", checked: true },
      { day: "Thursday", checked: true },
      { day: "Friday", checked: true },
      { day: "Saturday", checked: true },
      { day: "Sunday", checked: false },
    ],
  });



  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const lateEarlyRelaxationForm = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Daily Late Minute:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.dailyLateMinute}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "dailyLateMinute", e.target.value)}
            className="w-full p-2 border rounded-md"
            
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Daily Early Minute:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.dayEarlyMinute}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "dayEarlyMinute", e.target.value)}
            className="w-full p-2 border rounded-md"
            
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Monthly Late Minute:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.monthlyLateMinute}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "monthlyLateMinute", e.target.value)}
            className="w-full p-2 border rounded-md"
           
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Monthly Early Minute:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.monthlyEarlyMinute}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "monthlyEarlyMinute", e.target.value)}
            className="w-full p-2 border rounded-md"
           
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Monthly Special No of Relax:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.monthlySpecialNoLate}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "monthlySpecialNoLate", e.target.value)}
            className="w-full p-2 border rounded-md"
            
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Minute for One Time Late:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.minuteForOneTimeLate}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "minuteForOneTimeLate", e.target.value)}
            className="w-full p-2 border rounded-md"
            
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">No of Late Without Special Late:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.noOfLateWithoutSpecialLate}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "noOfLateWithoutSpecialLate", e.target.value)}
            className="w-full p-2 border rounded-md"
           
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Day to Deduct:</label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.dayToDeduct}
            onChange={(e) => handleInputChange("lateEarlyRelaxation", "dayToDeduct", e.target.value)}
            className="w-full p-2 border rounded-md"
            
          />
        </div>
      </div>
    </>
  );

  const lateShiftingOverTimeForm = () => (
    
      <>
      <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Daily Late Minute:</label>
        <input
          type="text"
          value={formData.lateShiftinOverTime.dailyLateMinute}
          onChange={(e) => handleInputChange("lateShiftinOverTime", "dailyLateMinute", e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Late Sitting Time:</label>
        <input
          type="text"
          value={formData.lateShiftinOverTime.lateShiftinTime}
          onChange={(e) => handleInputChange("lateShiftinOverTime", "lateShiftinTime", e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Late Sitting Minute:</label>
        <input
          type="text"
          value={formData.lateShiftinOverTime.lateShiftingMinute}
          onChange={(e) => handleInputChange("lateShiftinOverTime", "lateShiftingMinute", e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Over Time Per Month:</label>
        <input
          type="text"
          value={formData.lateShiftinOverTime.overTimePerMonth}
          onChange={(e) => handleInputChange("lateShiftinOverTime", "overTimePerMonth", e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Over Time Per Day:</label>
        <input
          type="text"
          value={formData.lateShiftinOverTime.overTimePerDay}
          onChange={(e) => handleInputChange("lateShiftinOverTime", "overTimePerDay", e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  </div>
    </>
    
  );

  const WorkingDaysForm = ({ formData, setFormData }) => {
    const handleCheckboxChange = (index) => {
      setFormData((prevFormData) => {
        const updatedWorkingDays = prevFormData.workingDays.map((day, i) =>
          i === index ? { ...day, checked: !day.checked } : day
        );
  
        return {
          ...prevFormData,
          workingDays: updatedWorkingDays,
        };
      });
    };
  
    return (
      <div className="flex flex-wrap gap-4">
        {formData.workingDays.map((day, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={day.checked}
              onChange={() => handleCheckboxChange(index)}
              className="h-5 w-5"
            />
            <label className="text-sm font-medium text-gray-700">{day.day}</label>
          </div>
        ))}
      </div>
    );
  };
  
  
  const handleInputChange = (category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (index) => {
    setFormData((prevData) => {
      const updatedDays = [...prevData.workingDays];
      updatedDays[index].checked = !updatedDays[index].checked;
      return { ...prevData, workingDays: updatedDays };
    });
  };


  const getActiveForm = () => {
    switch (activeTab) {
      case "Late & Early Relaxation":
        return lateEarlyRelaxationForm();
      case "Late Sitting & Over Time":
        return lateShiftingOverTimeForm();
      case "Working Days": // ✅ Corrected from "Working" to "Working Days"
        return <WorkingDaysForm formData={formData} setFormData={setFormData} />;
      case "EOBI":
        return renderEOBIForm();
      case "Gratuity":
        return renderGratuityForm();
      default:
        return null;
    }
  };
  
  
  

  const handleSave = () => {
    console.log('Saving data:', formData);
    localStorage.setItem('setupData', JSON.stringify(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b m-4 border-gray-400">
          <h2 className="text-xl font-medium">Add Setup</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex space-x-4 border-b border-gray-400 mb-4">
          {['Shift', 'Late & Early Relaxation', 'Late Sitting & Over Time', 'Working Days', 'Leave', 'Message Time'].map(
  (tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`py-2 px-4 relative ${
        activeTab === tab
          ? 'text-gray-700 font-semibold border-x border-t border-gray-400 bg-white z-10'
          : 'text-sky-500 hover:text-gray-400 border-transparent'
      }`}
    >
      {tab}
      {activeTab === tab && (
        <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-white" />
      )}
    </button>
  )
)}

          </div>

          <div className="mt-4">{getActiveForm()}</div>
        </div>

        <div className="flex justify-end gap-2 p-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
            Close
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPopup;
