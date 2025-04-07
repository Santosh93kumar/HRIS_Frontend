import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultimageicon from "../Image/defaultimageicon.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EmployeeProfile = () => {
  const { id } = useParams();
  let [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchEmployee = async () => {
  //         if (id) {
  //             try {
  //                 const response = await axios.get(`http://localhost:8000/website/employeeInfoRoute/employeeinfo/${id}`);
  //                 if (response.data.status === 1) {
  //                     setEmployee(response.data.data);  // Assuming API returns { status:1, data:{...} }
  //                     setPreviewImage(`http://localhost:8000/uploads/EmployeeInfoImage/${response.data.data.profileImage}`);
  //                 } else {
  //                     toast.error("Employee not found");
  //                 }
  //             } catch (error) {
  //                 console.error("Error fetching employee:", error);
  //                 toast.error("Error fetching employee data");
  //             }
  //         }
  //     };

  //     fetchEmployee();
  // }, [id]);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/website/employeeInfoRoute/employeeinfo/${id}`
          );
          console.log("API Response:", response.data.employee);

          if (response.data.status === 1) {
            const fetchedData = response.data.employee;

            // Fill missing fields if backend doesn't send all
            setEmployee({
              name: fetchedData.name || "",
              gender: fetchedData.gender || "",
              departmentName: fetchedData.departmentName || "",
              dateOfBirth: fetchedData.dateOfBirth || "",
              streetAddress: fetchedData.streetAddress || "",
              city: fetchedData.city || "",
              postalCode: fetchedData.postalCode || "",
              country: fetchedData.country || "",
              profileImage: fetchedData.profileImage || null,
              _id: fetchedData._id || null, // also store _id for update
            });

            setPreviewImage(
              `${import.meta.env.VITE_API_URL}/uploads/EmployeeInfoImage/${
                fetchedData.profileImage
              }`
            );
          } else {
            toast.error("Employee not found");
          }
        } catch (error) {
          console.error("Error fetching employee:", error);
          toast.error("Error fetching employee data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const [employee, setEmployee] = useState({
    name: "",
    gender: "",
    departmentName: "",
    dateOfBirth: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
    profileImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEmployee({ ...employee, profileImage: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   Object.keys(employee).forEach((key) => {
  //     formData.append(key, employee[key]);
  //   });

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/website/employeeInfoRoute/employeeinfo`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     if (response.data.status === 1) {
  //       toast.success("Department added successfully!");
  //       setEmployee(
  //         {
  //           name: "",
  //           gender: "",
  //           departmentName: "",
  //           dateOfBirth: "",
  //           streetAddress: "",
  //           city: "",
  //           postalCode: "",
  //           country: "",
  //           profileImage: null,
  //         }
  //       )

  //     } else {
  //       alert("Error saving employee details.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting employee data:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });

    try {
      if (employee._id) {
        // -------------------- Update Employee --------------------
        const response = await axios.put(
          `${
            import.meta.env.VITE_API_URL
          }/website/employeeInfoRoute/employeeinfo/${employee._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.status === 1) {
          toast.success("Employee updated successfully!");
        } else {
          toast.error("Error updating employee.");
        }
      } else {
        // -------------------- Create Employee --------------------
        setLoading(true);
       try{
        const response = await axios.post(
            `${
              import.meta.env.VITE_API_URL
            }/website/employeeInfoRoute/employeeinfo`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          if (response.data.status === 1) {
            toast.success("Employee added successfully!");
          } else {
            toast.error("Error adding employee.");
          }
       }catch(err){
        console.log(err);
       }finally{
        setLoading(false);
       }
      }

      // ✅ Reset form after submit
      setEmployee({
        name: "",
        gender: "",
        departmentName: "",
        dateOfBirth: "",
        streetAddress: "",
        city: "",
        postalCode: "",
        country: "",
        profileImage: null,
      });
    } catch (error) {
      console.error("Error submitting employee data:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#DBF2FF] p-6 rounded-lg min-h-screen">
      <h1 className="font-bold text-xl">Employee Info</h1>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg flex flex-wrap gap-4 items-center justify-between mt-3">
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <select className="w-full md:w-60 p-2 text-gray-600 border-2 border-gray-600 outline-gray-400 rounded-md">
            <option>Select Department</option>
            <option value="hr">Officer</option>
            <option value="it">Jn. Officer</option>
            <option value="finance">Manager</option>
          </select>

          <select className="w-full md:w-60 p-2 border-2 text-gray-600 border-gray-600 outline-gray-400 rounded-md">
            <option>Select Employee</option>
            <option value="paid leave">Saira Khan</option>
            <option value="unpaid leave">Hassan Khan</option>
            <option value="voluntary leave">Nadeem Ur Rahman</option>
            <option value="voluntary leave">Mithali Ade</option>
          </select>
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-center md:justify-start">
          <button className="bg-blue-400 text-white px-4 py-2 rounded">
            Show
          </button>
          <Link to="/employeemanagement/employee_profile">
            <button className="bg-green-700 text-white px-4 py-2 rounded">
              Add New
            </button>
          </Link>
          <button className="bg-red-700 text-white px-4 py-2 rounded">
            Import
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <div className="flex flex-col md:flex-row mt-4 gap-4">
            {/* Profile Image Section */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 text-center">
              <img
                src={previewImage || defaultimageicon}
                alt="Profile"
                className="rounded-full border-none mx-auto w-32 h-32"
              />
              <h3 className="font-semibold mt-2">{employee?.name}</h3>
              <input
                type="file"
                className="mt-4 border p-2 w-full rounded-md border-none px-1 py-0.5 bg-zinc-200"
                onChange={handleImageChange}
              />
            <button
  type="submit"
  className="bg-green-500 text-white px-4 py-2 w-full mt-2 rounded flex items-center justify-center"
  disabled={loading}
>
  {loading ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  ) : (
    employee._id ? "Update" : "Add"
  )}
</button>

            </div>
            {/* Employee Info Section */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto border-b pb-2 mb-4">
                <Link
                  to="/employeemanagement/employee_profile"
                  className="mr-4 font-semibold border-b-2 border-gray-600"
                >
                  Employee Info
                </Link>
                <Link to="/employeemanagement/employee_contact">
                  <button className="text-blue-500 px-4 pb-2">
                    Contact Info
                  </button>
                </Link>
                <Link
                  to="/employeemanagement/employeement_info"
                  className="text-blue-500 px-4 pb-2"
                >
                  Employment Info
                </Link>
                <Link
                  to="/employeemanagement/payroll"
                  className="text-blue-500 px-4 pb-2"
                >
                  Payroll
                </Link>
                <Link
                  to="/employeemanagement/security"
                  className="text-blue-500 px-4 pb-2"
                >
                  Security
                </Link>
                <Link
                  to="/employeemanagement/file"
                  className="text-blue-500 px-4 pb-2"
                >
                  Files
                </Link>
              </div>
              {/* Employee Info Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Gender</label>
                  <div className="flex space-x-4 mt-2">
                    {["Male", "Female", "None"].map((gender) => (
                      <label key={gender}>
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={employee.gender === gender}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {gender}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Department
                  </label>
                  <input
                    type="text"
                    name="departmentName"
                    value={employee.departmentName}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Date of Birth
                  </label>
                  <div className="flex items-center border p-2 rounded-md">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={employee.dateOfBirth}
                      onChange={handleChange}
                      className="w-full outline-none"
                    />
                    <FaCalendarAlt className="text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={employee.streetAddress}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={employee.city}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={employee.postalCode}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={employee.country}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
export default EmployeeProfile;
