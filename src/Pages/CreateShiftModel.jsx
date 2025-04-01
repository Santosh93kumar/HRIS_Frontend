import React, { useState, useEffect, useCallback, use } from "react";
import { X } from "lucide-react";
import axios from "axios";

const SetupPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Shift");
  const [employee, setEmployee] = useState([]);

  
 

  const [formData, setFormData] = useState({
    shift: {
      shiftName: "Day Shift",
      assignedEmployee: "",
      shiftIn:"10:00 AM",
      shiftOut: "2:00 PM",
      shiftOutNextDay: "",
    },
    lateEarlyRelaxation: {
      dailyLateMinute: "",
      dayEarlyMinute: "",
      monthlyLateMinute: "",
      monthlyEarlyMinute: "",
      monthlySpecialNoLate: "",
      minuteForOneTimeLate: "",
      noOfLateWithoutSpecialLate: "",
      dayToDeduct: "",
    },
    lateShiftinOverTime: {
      dailyLateMinute: "",
      lateShiftinTime: "",
      lateShiftingMinute: "",
      overTimePerMonth: "",
      overTimePerDay: "",
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

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      shift: {
        ...prevData.shift,
        shiftIn: prevData.shift.shiftName === "Day Shift" ? "10:00 AM" : "2:00 PM",
      },
    }));
    setFormData((prevData) => ({
      ...prevData,
      shift: {
        ...prevData.shift,
        shiftOut: prevData.shift.shiftName === "Day Shift" ? "2:00 PM" : "6:00 PM",
      },
    }));

    console.log(formData.shift.shiftIn,formData.shift.shiftOut);
  }, [formData.shift.shiftName]);

  useEffect(()=>{
    const employeename = async()=>{
      try{
        const response = await axios.get("http://localhost:8000/website/employeeInfoRoute/employeeinfo");
        console.log(response)
        setEmployee(response.data.employees);
        console.log(response.data);
        if(!response.data){
            return console.log("No data found");
        }
        
      }
      catch(error){
        console.log(error)
      }
    }
    employeename();
},[])

 
  const shiftForm = () => (
    <>
      <div className="mt-6 space-y-6 p-4 max-w-4xl mx-auto">
        
       <div className="flex md:flex-row flex-col gap-6 w-full">
        {/* Shift Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Shift Name
          </label>
          <select
            value={formData.shift.shiftName}
            onChange={(e) => handleInputChange("shift", "shiftName", e.target.value)}
            className="w-[290px] p-2 border border-gray-300 rounded-md"
          >
           
            <option value="Day Shift">Day Shift</option>
            <option value="OverNight Shift">OverNight Shift</option>
          </select>
        </div>

        {/* Assigned Employee */}
        <div className="w-full">
          <label className="block  text-gray-700 font-medium mb-2">
            Assigned Employee
          </label>

          <select
            value={formData.shift.assignedEmployee}
            onChange={(e) => handleInputChange("shift", "assignedEmployee", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled hidden>Select Employee</option>
            {
             employee && employee.map((emp) => (
              <option key={emp._id} value={emp._id}>{emp.name}</option>
            ))
            }

    
          </select>
          </div>
        </div> 

  
        {/* Time Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Shift IN */}
          <div>
            {/* ------------------------------------------------------------------------------------------ */}
            <label className="block text-gray-700 font-medium mb-2">
              Shift IN
            </label>
            <div className="flex gap-2">
              <input
                type="string"
              value={formData.shift.shiftName==="Day Shift"?"10:00 AM":"2:00 PM"}
              readOnly
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              
              
              
            </div>
          </div>
          
          {/* Shift OUT */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Shift OUT
            </label>
            <div className="flex gap-2">
              <input
                type="string"
                value={formData.shift.shiftName==="Day Shift"?"2:00 PM":"6:00 PM"}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              
            </div>
          </div>
          
          {/* Shift OUT Next Day */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Shift OUT Next Day
            </label>
            <select
              value={formData.shift.shiftOutNextDay}
              onChange={(e) => handleInputChange("shift", "shiftOutNextDay", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md appearance-none relative"
            >
              <option value="">Select</option>
              <option value="Day Shift">Day Shift</option>
            <option value="OverNight Shift">OverNight Shift</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
  //shift form ends

  const lateEarlyRelaxationForm = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            Daily Late Minute:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.dailyLateMinute}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "dailyLateMinute",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            Daily Early Minute:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.dayEarlyMinute}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "dayEarlyMinute",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            Monthly Late Minute:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.monthlyLateMinute}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "monthlyLateMinute",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            Monthly Early Minute:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.monthlyEarlyMinute}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "monthlyEarlyMinute",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            Monthly Special No of Relax:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.monthlySpecialNoLate}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "monthlySpecialNoLate",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            Minute for One Time Late:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.minuteForOneTimeLate}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "minuteForOneTimeLate",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            No of Late Without Special Late:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.noOfLateWithoutSpecialLate}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "noOfLateWithoutSpecialLate",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[15px]  font-[600]  text-[#535353]">
            Day to Deduct:
          </label>
          <input
            type="text"
            value={formData.lateEarlyRelaxation.dayToDeduct}
            onChange={(e) =>
              handleInputChange(
                "lateEarlyRelaxation",
                "dayToDeduct",
                e.target.value
              )
            }
            className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none 
 "
          />
        </div>
      </div>
    </>
  );
  const [autoCalculate, setAutoCalculate] = useState(true);
  const [values, setValues] = useState({
    fullDayMinutes: 480,
    fullDayValue: 1,
    halfDayMinutes: 240,
    halfDayValue: 0, 
    shortDayMinutes: 120,
    shortDayValue: 0.33,
  });


  const leave =()=>(
    <>
    <div className="max-w-lg mx-auto p-6 bg-white ">
      <label className="flex items-center mb-4 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={autoCalculate}
          onChange={() => setAutoCalculate(!autoCalculate)}
          className="mr-2 w-4 h-4"
        />
        Check to auto calculate the leave minutes on the basis of Shift IN and Shift OUT
      </label>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(values).map(([key, value]) => (
          <div key={key}>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {key.replace(/([A-Z])/g, ' $1').replace('Day ', 'Day ')}
            </label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        ))}
      </div>
      
     
    </div>
    
    </>
  );


  const lateShiftingOverTimeForm = () => (
    <>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[15px]  font-[600]  text-[#535353]">
              Daily Late Minute:
            </label>
            <input
              type="text"
              value={formData.lateShiftinOverTime.dailyLateMinute}
              onChange={(e) =>
                handleInputChange(
                  "lateShiftinOverTime",
                  "dailyLateMinute",
                  e.target.value
                )
              }
              className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[15px]  font-[600]  text-[#535353]">
              Late Sitting Time:
            </label>
            <input
              type="text"
              value={formData.lateShiftinOverTime.lateShiftinTime}
              onChange={(e) =>
                handleInputChange(
                  "lateShiftinOverTime",
                  "lateShiftinTime",
                  e.target.value
                )
              }
              className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none "
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[15px]  font-[600]  text-[#535353]">
              Late Sitting Minute:
            </label>
            <input
              type="text"
              value={formData.lateShiftinOverTime.lateShiftingMinute}
              onChange={(e) =>
                handleInputChange(
                  "lateShiftinOverTime",
                  "lateShiftingMinute",
                  e.target.value
                )
              }
              className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[15px]  font-[600]  text-[#535353]">
              Over Time Per Month:
            </label>
            <input
              type="text"
              value={formData.lateShiftinOverTime.overTimePerMonth}
              onChange={(e) =>
                handleInputChange(
                  "lateShiftinOverTime",
                  "overTimePerMonth",
                  e.target.value
                )
              }
              className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none "
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[15px]  font-[600]  text-[#535353]">
              Over Time Per Day:
            </label>
            <input
              type="text"
              value={formData.lateShiftinOverTime.overTimePerDay}
              onChange={(e) =>
                handleInputChange(
                  "lateShiftinOverTime",
                  "overTimePerDay",
                  e.target.value
                )
              }
              className="rounded-[4px] w-full p-2 border-[#696969] border-[1px] focus:outline-none "
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
              className="h-[18px] w-[18px] border-[#5F6338] text-[#5F6368]"
            />
            <label className="block text-[15px]  font-[600]  text-[#535353]">
              {day.day}
            </label>
          </div>
        ))}
      </div>
    );
  };

  // Regular input change handler
  const handleInputChange = (category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      }
      
    }));
    console.log(formData.shift.shiftName);
  };

  // Special handler for nested input fields (like shiftIn.hours)
  const handleNestedInputChange = (category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {  // Dynamically update the category (e.g., "shift")
        ...prevData[category],  // Preserve existing keys in the nested object
        [field]: value,  // Dynamically update the specific field
      },
    }));
   console.log(formData.shift.shiftIn);
  };

  // Helper function to render EOBI form (placeholder)
  const renderEOBIForm = () => (
    <div className="p-4 text-center">
      <p>EOBI form content will be added here.</p>
    </div>
  );

  // Helper function to render Gratuity form (placeholder)
  const renderGratuityForm = () => (
    <div className="p-4 text-center">
      <p>Gratuity form content will be added here.</p>
    </div>
  );

  const getActiveForm = () => {
    switch (activeTab) {
      case "Leave":
        return leave();

      case "Shift":
        return shiftForm();
      case "Late & Early Relaxation":
        return lateEarlyRelaxationForm();
      case "Late Sitting & Over Time":
        return lateShiftingOverTimeForm();
      case "Working Days":
        return (
          <WorkingDaysForm formData={formData} setFormData={setFormData} />
        );
      case "EOBI":
        return renderEOBIForm();
      case "Gratuity":
        return renderGratuityForm();
      default:
        return null;
    }
  };

  const handleSave = async() => {
    // console.log("Saving data:", formData.shift.shiftName);
    console.log(formData.shift);
    localStorage.setItem("setupData", JSON.stringify(formData));
    const savedShift = await axios.post("http://localhost:8000/website/shift/setShift", formData.shift);
    console.log(savedShift);
    onClose();

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-[800px] bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b m-4 border-gray-400">
          <h2 className="text-xl font-medium">Add Setup</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-[4px] border-b border-gray-400 mb-4">
            {[
              "Shift",
              "Late & Early Relaxation",
              "Late Sitting & Over Time",
              "Working Days",
              "Leave"
             
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-[5px] relative ${
                  activeTab === tab
                    ? "text-[636363] font-[600] text-[16px]  border-x border-t border-gray-400 bg-white z-10"
                    : "text-[#0091DF] font-[600] text-[16px] border-transparent"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-white" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-4">{getActiveForm()}</div>
        </div>

        <div className="flex justify-end gap-2 p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupPopup;