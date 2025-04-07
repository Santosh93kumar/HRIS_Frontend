import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [formData, setFormData] = useState({
    departmentName: "",
  });

  const getValue = (e) => {
    let obj = { ...formData };
    let InputName = e.target.name;
    let InputValue = e.target.value;
    obj[InputName] = InputValue;
    setFormData(obj);
  };

  const saveData = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.departmentName) {
      toast.error("Please enter a department name!");
      return;
    }

    // Send the POST request to add a new department
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/website/departmentroutes/department`,
        formData
      )
      .then((res) => {
        console.log("Backend Response:", res.data); // Log the response to check if it is correct

        if (res.data.status === 1) {
          toast.success("Department added successfully!");

          // Get the new department from the response
          const newDepartment = res.data.savedData; // Access the correct property from response
          console.log("New Department:", newDepartment); // Log the new department

          // Check if the returned department is valid
          if (newDepartment && newDepartment._id) {
            // Update the department list in the state immediately
            setDepartments((prevDepartments) => [
              ...prevDepartments,
              newDepartment,
            ]);

            // Clear the form data
            setFormData({ departmentName: "" });
          } else {
            toast.error(
              "Error: Invalid department data returned from the server."
            );
          }
        } else {
          toast.error(res.data.msg || "Failed to add department.");
        }
      })
      .catch((err) => {
        console.error("Error during department addition:", err);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/website/departmentroutes/viewdepartment`
      );
      console.log("Departments:", res.data); // Log the departments to check if they are correct
      if (res.data.status === 1) {
        setDepartments(res.data.departments || []);
      } else {
        toast.error("Failed to fetch departments");
      }
    } catch (error) {
      toast.error("Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentDept(null);
  };

  const openModal = (dept = null) => {
    setCurrentDept(dept);
    setEditedName(dept ? dept.departmentName : "");
    setModalIsOpen(true);
  };

  const handleSave = () => {
    if (!editedName) return;

    if (currentDept) {
      // Update the department via backend
      axios
        .put(
          `${
            import.meta.env.VITE_API_URL
          }/website/departmentroutes/editdepartment/${currentDept._id}`,
          {
            departmentName: editedName,
          }
        )
        .then((res) => {
          if (res.data.status === 1) {
            toast.success("Department updated successfully!");
            // Update the department list in the frontend
            setDepartments(
              departments.map((dept) =>
                dept._id === currentDept._id
                  ? { ...dept, departmentName: editedName }
                  : dept
              )
            );
          } else {
            toast.error("Failed to update department");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong!");
          console.error("Error:", err);
        });
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/website/departmentroutes/deletedepartment/${id}`
      );
      if (response.data.status === 1) {
        toast.success(response.data.msg);
        fetchDepartments(); // Refresh the departments list
      } else {
        toast.error(response.data.msg || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during department deletion:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="bg-sky-100 flex flex-col w-full min-h-screen">
     
    <Header/>
      <div className="bg-[#DBF2FF] p-6 rounded-lg flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold px-3 mb-4">
          Department
        </h2>

        <form onSubmit={saveData}>
          <div className="bg-white p-4 rounded-lg flex flex-col md:flex-row md:items-center gap-4">
            <input
              value={formData.departmentName}
              onChange={getValue}
              name="departmentName"
              type="text"
              placeholder="Department Name"
              className="flex-1 border-2 p-3 rounded-md"
            />
            <div className="flex gap-2">
              <button
                className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition"
                type="submit"
              >
                Add New
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : departments.length === 0 ? (
            <p>No departments available.</p>
          ) : (
            <table className="w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-300 text-gray-700 text-left">
                  <th className="py-3 px-6">Department Name</th>
                  <th className="py-3 px-6 text-center">Edit</th>
                  <th className="py-3 px-6 text-center">Delete</th>
                </tr>
              </thead>

              <tbody>
                {departments && departments.length > 0 ? (
                  departments.map((dept) => {
                    if (!dept || !dept._id) return null; // Ensure dept is not undefined or doesn't miss _id field
                    return (
                      <tr key={dept._id} className="border-b border-gray-200">
                        <td className="py-3 px-6">
                          {dept.departmentName || "Unnamed Department"}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <FaEdit
                            className="text-gray-600 cursor-pointer mx-auto hover:text-blue-600 transition"
                            onClick={() => openModal(dept)}
                          />
                        </td>
                        <td className="py-3 px-6 text-center">
                          <FaTrash
                            className="text-gray-600 cursor-pointer hover:text-red-600 transition mx-auto"
                            onClick={() => handleDelete(dept._id)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <RxCross2
            className="absolute top-4 right-4 text-gray-600 cursor-pointer text-2xl hover:text-gray-800 transition"
            onClick={closeModal}
          />
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            {currentDept ? "Edit Department" : "Add Department"}
          </h2>

          <p className="mb-2">Department</p>
          {/* Input field for editing the department */}
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-md mb-4"
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Edit Department Name"
          />

          <div className="flex justify-end space-x-3">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Department;
