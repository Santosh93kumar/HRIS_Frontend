import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios'; // Ensure axios is imported

import { toast, ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAllowancePopup = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track form submission status

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation (if any)
    if (!formData.type || !formData.name || !formData.description) {
      toast.error("Please fill in all fields.", { position: "top-right" });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true to disable the button while submitting

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/payroll/allowdeductiontyperoutes`,
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.msg || "Successfully submitted!", { position: "top-right" });

        // Reset form after successful submission
        setFormData({
          type: '',
          name: '',
          description: ''
        });

        setIsFormSubmitted(true); // Set the form submission flag to true

        // Optionally call onSave if you need to trigger any action on save
        // if (onSave) onSave();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.msg || "Submission failed. Please try again.", { position: "top-right" });
    } finally {
      setIsSubmitting(false); // Reset the submitting state after submission
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-400">
            <h2 className="text-xl font-semibold text-gray-800">
              Add Allowance and Deduction Types
            </h2>
            <button
              onClick={onClose} // This is where the popup will close manually
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type */}
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="allowance">Allowance</option>
                  <option value="deduction">Deduction</option>
                </select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
                rows={1}
                className="w-4/5 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose} // This is the manual close button
                className="px-6 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-teal-600'} text-white hover:bg-teal-700 transition-colors`}
                disabled={isSubmitting} // Disable the button while submitting
              >
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            </div>
          </form>
           <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AddAllowancePopup;
