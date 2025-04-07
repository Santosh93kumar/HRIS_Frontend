import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch, FaRegFilePdf, FaUserEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import Header from '../Header'




function EmployeeInfo() {
  const navigate = useNavigate();


  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/website/employeeInfoRoute/employeeinfo`)
      .then((res) => {
        console.log("data",res.data.employees)
        setEmployees(res.data.employees);  // Make sure your API returns an array
      })
      .catch((err) => {
        console.error("Error fetching employees", err);
      });
  }, []);

  const deleteEmployee = async (id) => {
    
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/website/employeeInfoRoute/employeeinfo/${id}`);
          setEmployees(employees.filter(emp => emp._id !== id));
          toast.success("Employee deleted successfully!");
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Error deleting employee.");
        }
    
};

  return (
    <div>
      <Header/>
       <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
      <h1 className="font-bold text-xl">Employee Info</h1>

      
      <div className="bg-white p-4 rounded-lg flex flex-wrap mt-5 gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <select className="w-full sm:w-60 p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md">
            <option>Select Department</option>
            <option value="hr">Officer</option>
            <option value="it">Manager</option>
            <option value="finance">Jr.Officer</option>
          </select>

          <select className="w-full sm:w-60 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md">
            <option>Select Employee</option>
            <option value="paid leave">Saira Khan</option>
            <option value="unpaid leave">Hasaan Khan</option>
            <option value="voluntary leave">Nadeem Ur Rahman</option>
            <option value="voluntary leave">Mithali Ade</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button className="bg-blue-400 text-white px-4 py-2 rounded w-full sm:w-auto">
            Show
          </button>
          <Link to="/employeemanagement/employee_profile">
          <button className="bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto">
            Add New
          </button>
          </Link>
          <button className="bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto">
            Import
          </button>
        </div>
      </div>

    
      <div className="overflow-x-auto bg-white mt-4 rounded p-2">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-sm md:text-base">
            <th className="p-3">Name</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Department</th>
            <th className="p-3">DOB</th>
            <th className="p-3">Address</th>
            <th className="p-3">Profile Image</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Edit</th>
            <th className="p-3">Delete</th>
          </tr>
        </thead>
    
           <tbody>
      {employees.map((emp, index) => (
        <tr key={index} className="text-sm text-center border-t border-gray-200">
          <td className="p-3">{emp.name}</td>
          <td className="p-3">{emp.gender}</td>
          <td className="p-3">{emp.departmentName}</td>
          <td className="p-3">{new Date(emp.dateOfBirth).toLocaleDateString()}</td>
          <td className="p-3">{emp.streetAddress}, {emp.city}, {emp.postalCode}, {emp.country}</td>
          <td className="p-3">
            <img src={`${import.meta.env.VITE_API_URL}/uploads/EmployeeInfoImage/${emp.profileImage}`} alt="Profile" className="w-12 h-12 rounded-full mx-auto" />
          </td>
          <td className="p-3">{new Date(emp.createdAt).toLocaleDateString()}</td>
          <td className="p-3">
            <button 
              onClick={() => navigate(`/employeemanagement/employee_profile/${emp._id}`, { state: emp })} 
              className="bg-yellow-400 px-2 py-1 rounded text-white"
            >
              Edit
            </button>
          </td>
          <td className="p-3">
            <button 
              onClick={() => deleteEmployee(emp._id)} 
              className="bg-red-500 px-2 py-1 rounded text-white"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
      </table>
    </div>
    </div>
    </div>
  )
}

export default EmployeeInfo;





 



