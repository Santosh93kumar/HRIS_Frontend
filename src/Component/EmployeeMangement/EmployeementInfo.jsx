import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmploymentInfo = () => {
  const [employeeData, setEmployeeData] = useState({
    hireDate: "",
    joiningDate: "",
    basicSalary: "",
    status: "",
    paymentMethod: "",
    employeeType: "",
    bankName: "",
    branch: "",
    accountTitle: "",
    branchCode: "",
    accountNo: "",
    swiftCode: "",
    location: "",
    designation: "",
    department: "",
    cnic: "",
    employeeCode: "",
    separationDate: "",
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchEmployees = async () => {
          setLoading(true);
          setError(null);
          try {
              const response = await axios.get(`${import.meta.env.VITE_API_URL}/website/employeeInfoRoute/employeeinfo`);
              if (response.data.status === 1 && response.data.employees) {
                  console.log(response.data);
                  setEmployees(response.data.employees);
                  console.log("Fetched Employees:", response.data.employees);
              } else {
                  setError("Failed to fetch employee data: " + (response.data.msg || "Unknown error"));
              }
          } catch (err) {
              setError("Error fetching employees: " + err.message);
          } finally {
              setLoading(false);
          }
      };
      fetchEmployees();
  }, []);

  const handleEmployeeSelect = (e) => {
      const selectedEmployeeName = e.target.value;
      setSelectedEmployee(selectedEmployeeName);

      const foundEmployee = employees.find((emp) => emp.name === selectedEmployeeName);
      console.log("Selected Employee Data:", foundEmployee); // Debugging output

      if (foundEmployee) {
        setEmployeeData({
          ...employeeData,
          profileName: foundEmployee.name,
        });
      } else {
        setEmployeeData({
          ...employeeData,
          profileName: "",
        });
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/employementInfoRoute/employementInfo`,
        employeeData,{
          "Content-Type": "application/json", // Ensure JSON format

        }
      );
      if (response.data.status === 1) {
        alert("Employee details saved successfully!");
      } else {
        alert("Error saving employee details.");
      }
    } catch (error) {
      console.error("Error submitting employee data:", error);
    }
  };

  return (
    <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
      <h1 className="font-bold text-xl">Employee Info</h1>

      <div className="bg-white p-4 rounded-lg flex flex-wrap mt-3 gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          {/* Controlled Select Fields
          <select
            name="departmentSelection"
            value={employeeData.departmentSelection}
            onChange={handleChange}
            className="w-full sm:w-60 p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md"
          >
            <option value="">Select Department</option>
            <option value="Officer">Officer</option>
            <option value="Jr. Officer">Jr. Officer</option>
            <option value="Manager">Manager</option>
          </select> */}

          <select
            className="w-full md:w-60 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md"
            value={selectedEmployee}
            onChange={handleEmployeeSelect}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button className="bg-blue-400 text-white px-4 py-2 rounded w-full sm:w-auto">
            Show
          </button>
          <button className="bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto">
            Add New
          </button>
          <button className="bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto">
            Import
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <div className="flex flex-col md:flex-row mt-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
              <img
                src="/placeholder.png"
                alt="Profile"
                className="rounded-full mx-auto w-32 h-32"
              />
              <h3 className="font-semibold mt-2">Employee Name</h3>
              <input
                type="file"
                className="mt-4 border p-2 w-full rounded-md"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 w-full mt-2 rounded"
              >
                Update
              </button>
            </div>

            <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border w-full">
              <div className="border-b pb-2 mb-4 flex flex-wrap gap-4 text-blue-500 justify-start">
                <Link
                to ="/employeemanagement/employee_profile"  
                className="hover:underline">
                  Employee Info
                </Link>
                <Link
                to="/employeemanagement/employee_contact" 
                className="hover:underline">
                  Contact Info
                </Link>
                <Link
                  to="/employeemanagement/employeement_info"
                  className="font-semibold text-gray-900 border-b-2 border-gray-900"
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
                <Link to="/employeemanagement/file">
                  <button className="hover:underline">Files</button>
                </Link>
              </div>

              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                {[
                  { label: "Hire Date", name: "hireDate" },
                  { label: "Joining Date", name: "joiningDate" },
                  { label: "Basic Salary", name: "basicSalary" },
                  { label: "Status", name: "status" },
                  { label: "Payment Method", name: "paymentMethod" },
                  { label: "Employee Type", name: "employeeType" },
                  { label: "Bank Name", name: "bankName" },
                  { label: "Branch", name: "branch" },
                  { label: "Account Title", name: "accountTitle" },
                  { label: "Branch Code", name: "branchCode" },
                  { label: "Account No", name: "accountNo" },
                  { label: "Swift Code", name: "swiftCode" },
                  { label: "Location", name: "location" },
                  { label: "Designation", name: "designation" },
                  { label: "Department", name: "department" },
                  { label: "CNIC", name: "cnic" },
                  { label: "Employee Code", name: "employeeCode" },
                  { label: "Separation Date", name: "separationDate" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-gray-600 font-medium mb-1">
                      {item.label}
                    </label>
                    <input
                      type="text"
                      name={item.name}
                      value={employeeData[item.name]} // Controlled input
                      onChange={handleChange}
                      className="border border-black px-2 py-1 rounded w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmploymentInfo;
