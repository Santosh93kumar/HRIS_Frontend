import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Security = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("Saira Khan");
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("");
  const [securityRole, setSecurityRole] = useState("");
  const [leaveEntryDays, setLeaveEntryDays] = useState(100);
  const [password, setPassword] = useState("");
  const [recordLevelAuthority, setRecordLevelAuthority] = useState({
    cod: false,
    hr: false,
    hod: false,
    secondIn: false,
  });
  const [profileImage, setProfileImage] = useState(null);

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
    setProfileImage(e.target.files[0]);
  };

  const handleCheckboxChange = (name) => {
    setRecordLevelAuthority({
      ...recordLevelAuthority,
      [name]: !recordLevelAuthority[name],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sec = {
        securityRole,
        leaveEntryDays,
        password,
        recordLevelAuthority,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/securityRoute/security`,
        sec
      );
      if (response.data.status === 1) {
        alert("Security details saved successfully!");
      } else {
        alert("Error saving security details.");
      }
      console.log("Security data saved:", response.data);
    } catch (error) {
      console.error("Error saving security data:", error);
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
                src={profileImage ? URL.createObjectURL(profileImage) : ""}
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
              <div className="border-b pb-2 mb-4 flex flex-wrap gap-4 text-black justify-start">
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
                <Link to="/employeemanagement/employeement_info">
                  <button className="hover:underline">Employment Info</button>
                </Link>
                <Link to="/employeemanagement/payroll">
                  <button className="hover:underline">Payroll</button>
                </Link>
                <Link to="/employeemanagement/security">
                  <button className="font-bold underline">Security</button>
                </Link>
                <Link to="/employeemanagement/file">
                  <button className="hover:underline">Files</button>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mb-6">
                <div>
                  <label className="block text-gray-600 mb-1">
                    Security Role
                  </label>
                  <select
                    className="w-full p-2 border border-black rounded-md"
                    value={securityRole}
                    onChange={(e) => setSecurityRole(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                    <option value="Guest">Guest</option>
                    <option value="HR">HR</option>
                    <option value="COD">COD</option>
                    <option value="HOD">HOD</option>
                    <option value="Second In">Second In</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Leave Entry Days
                  </label>
                  <input
                    type="text"
                    placeholder="100"
                    className="w-full p-2 border border-black rounded-md"
                    value={leaveEntryDays}
                    onChange={(e) => setLeaveEntryDays(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="wR2323K+duusj6789ggh3"
                    className="w-full p-2 border border-black rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-2">
                  Record Level Authority
                </h2>
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: "COD", name: "cod" },
                    { label: "HR", name: "hr" },
                    { label: "HOD", name: "hod" },
                    { label: "Second In", name: "secondIn" },
                  ].map((item, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={recordLevelAuthority[item.name]}
                        onChange={() => handleCheckboxChange(item.name)}
                      />{" "}
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;
