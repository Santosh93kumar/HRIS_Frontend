import React, { useState, useEffect, useCallback } from "react";
import { Calendar, X } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveEntryPopup = ({ isOpen, onClose, employeeName = "Ibad ur Rahman" }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    leavePeriod: "",
    leaveFromDate: "",
    leaveToDate: "",
    remarks: "",
  });


  const [dateError, setDateError] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);


  // Handle Change for All Inputs
  const handleChange = (e) => {
      let obj = { ...formData };
      let InputName = e.target.name; // Corrected the typo
      let InputValue = e.target.value;
      obj[InputName] = InputValue;
      setFormData(obj);
  };
  

  // Date Validation
  const validateDates = (start, end) => {
    if (!start || !end) return true;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      setDateError("Start date cannot be in the past");
      return false;
    }
    if (endDate < startDate) {
      setDateError("End date cannot be before start date");
      return false;
    }
    setDateError("");
    return true;
  };

  // Handle Date Changes with Validation
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "leaveFromDate") {
      validateDates(value, formData.leaveToDate);
    } else if (name === "leaveToDate") {
      validateDates(formData.leaveFromDate, value);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateDates(formData.leaveFromDate, formData.leaveToDate)) {
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/leave/leaveentry`,
        formData
      );
  
      if (response.status === 200) {
        // Show success toast with the message from the backend
        toast.success(response.data.msg || "Successfully submitted!", { position: "top-right" });
  
        // Reset form after successful submission
        setFormData({
          leaveType: "",
          leavePeriod: "",
          leaveFromDate: "",
          leaveToDate: "",
          remarks: "",
        });
  
        // Do NOT close the popup automatically
        // onClose(); // ❌ Remove this line to keep the popup open
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error toast with message from the backend if available
      toast.error(error.response?.data?.msg || "Submission failed. Please try again.", { position: "top-right" });
    }
  };
  
  



  // useEffect(() => {

    
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // },
  
  // [isOpen]);

//   useEffect(() => {
//     if (isOpen) {
//         document.body.style.overflow = "hidden"; // Disable scrolling when modal is open

//         // Fetch Employee Types when modal opens
//         const fetchEmployeeTypes = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/website/leave/leaveentrydata");
//               console.log(response.data.employees.names)
//                 if (response.status === 200 && response.data.employees.names) {
//                     setEmployeeTypes(response.data.employees.names); // Store employee types correctly
//                 } else {
//                     console.error("Unexpected response format:", response.data);
//                 }

//             } catch (error) {
//                 console.error("Error fetching employee types:", error);
//             }
//         };

//         fetchEmployeeTypes();
//     }

//     return () => {
//         document.body.style.overflow = "unset"; // Restore scrolling when modal closes
//     };
// }, [isOpen]); 

useEffect(() => {
  if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open

      // Fetch Employee Names when modal opens
      const fetchEmployeeTypes = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_API_URL}/website/leave/leaveentrydata`);
              
              if (response.status === 200 && Array.isArray(response.data.employees)) {
                  // Extract only names from employees array
                  const names = response.data.employees.map(emp => emp.name);
                  
                  console.log("Extracted Names:", names);
                  setEmployeeTypes(names); // Store employee names correctly
              } else {
                  console.error("Unexpected response format:", response.data);
              }

          } catch (error) {
              console.error("Error fetching employee names:", error);
          }
      };

      fetchEmployeeTypes();
  }

  return () => {
      document.body.style.overflow = "unset"; // Restore scrolling when modal closes
  };
}, [isOpen]);




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="border border-gray-300 rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[#D3D3D3]">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
                Leave Entry of {employeeName}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                       {/* Employee Type */}
                       <div className="space-y-2">
    <label className="block text-gray-700 font-medium">Employee Type *</label>
    <select
        name="employeeType"
        value={formData.employeeType}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
    >
        <option value="">Select Employee Type</option>
        {employeeTypes.length > 0 ? (
            employeeTypes.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
            ))
        ) : (
            <option value="" disabled>Loading...</option>
        )}
    </select>
</div>


                {/* Leave Type */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Leave Type *</label>
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="outdoor">Outdoor Activity</option>
                    <option value="annual">Annual Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="casual">Casual Leave</option>
                    <option value="maternity">Maternity Leave</option>
                    <option value="paternity">Paternity Leave</option>
                    <option value="study">Study Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                    <option value="wfh">Work From Home</option>
                  </select>
                </div>

                {/* Leave Period */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Leave Period *</label>
                  <select
                    name="leavePeriod"
                    value={formData.leavePeriod}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Leave</option>
                    <option value="full">Full Day</option>
                    <option value="first_half">First Half</option>
                    <option value="second_half">Second Half</option>
                  </select>
                </div>

                {/* From Date */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">From Date *</label>
                  <input
                    type="date"
                    name="leaveFromDate"
                    value={formData.leaveFromDate}
                    onChange={handleDateChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* To Date */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">To Date *</label>
                  <input
                    type="date"
                    name="leaveToDate"
                    value={formData.leaveToDate}
                    onChange={handleDateChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {dateError && <div className="text-red-500 text-sm">{dateError}</div>}

              {/* Remarks */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter your remarks here"
                  className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 p-4 sm:p-5">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Close
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Submit
              </button>
              <ToastContainer />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveEntryPopup;
