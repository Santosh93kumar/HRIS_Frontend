import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const File = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("Saira Khan");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleShow = () => {
    console.log("Show data for:", department, employee);
  };

  const handleAddNew = () => {
    console.log("Add new employee");
  };

  const handleImport = () => {
    console.log("Import data");
  };

  const handleProfileImageChange = (e) => {
    // You'll need to implement profile image upload logic if needed
    console.log("Profile image change");
  };

  const handleUpdateProfile = () => {
    // You'll need to implement profile image update logic if needed
    console.log("Update profile");
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/fileRoute/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Filename saved:", response.data);
      alert("Filename saved successfully!");
    } catch (error) {
      console.error("Error saving filename:", error);
      alert("Error saving filename.");
    }
  };

  return (
    <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
      <h1 className="font-bold text-xl">Employee Info</h1>

      <div className="bg-white p-4 rounded-lg flex flex-wrap mt-3 gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <select
            className="w-full sm:w-60 p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="hr">Officer</option>
            <option value="it">Jr. Officer</option>
            <option value="finance">Manager</option>
          </select>

          <select
            className="w-full sm:w-60 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            <option value="Saira Khan">Saira Khan</option>
            <option value="Hassan Khan">Hassan Khan</option>
            <option value="Nadeem Ur Rahman">Nadeem Ur Rahman</option>
            <option value="Mithali Ade">Mithali Ade</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleShow}
          >
            Show
          </button>
          <button
            className="bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleAddNew}
          >
            Add New
          </button>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <div className="flex flex-col md:flex-row mt-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
              <img
                src=""
                alt="Profile"
                className="rounded-full mx-auto w-32 h-32"
              />
              <h3 className="font-semibold mt-2">{selectedEmployee}</h3>
              <input
                type="file"
                className="mt-4 border p-2 w-full rounded-md"
                onChange={handleProfileImageChange}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 w-full mt-2 rounded"
                type="submit"
              >
                Update
              </button>
            </div>

            <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border w-full">
              <div className="border-b pb-2 mb-4 flex flex-wrap gap-4 text-black-500 justify-start">
                <Link
                  to="/employeemanagement/employee_profile"
                  className="hover:underline"
                >
                  Employee Info
                </Link>
                <Link
                  to="/employeemanagement/employee_contact"
                  className="hover:underline"
                >
                  Contact Info
                </Link>
                <Link
                  to="/employeemanagement/employeement_info"
                  className="hover:underline"
                >
                  Employment Info
                </Link>
                <Link
                  to="/employeemanagement/payroll"
                  className="hover:underline"
                >
                  Payroll
                </Link>
                <Link to="/employeemanagement/security">
                  <button className="hover:underline">Security</button>
                </Link>
                <a href="#" className="font-bold underline">
                  Files
                </a>
              </div>

              <div>
                <p className="mb-2">Choose File</p>
                <input
                  type="file"
                  className="p-2 w-full border rounded-md"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default File;
