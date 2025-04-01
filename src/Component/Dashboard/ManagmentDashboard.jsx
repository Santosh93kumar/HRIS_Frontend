import axios from "axios";
import React, { useState } from "react";


function ManagmentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [preview, setPreview] = useState("https://www.shutterstock.com/image-illustration/no-thumbnail-image-placeholder-forums-260nw-1401095468.jpg");
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState(null);

  const saveData = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    let formData = new FormData();
    formData.append("employeeFile", selectedFile); // ✅ Match input name="employeeFile"
    formData.append("name", "Ibad ur Rahman"); // ✅ Extra field (optional)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/website/homepage/employeedashboard`, // ✅ Make sure backend route is correct
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    } else {
      setFileName("No file chosen");
      setPreview("https://www.shutterstock.com/image-illustration/no-thumbnail-image-placeholder-forums-260nw-1401095468.jpg");
    }
  };

  return (

    <div className="flex flex-col md:flex-row bg-sky-100 w-full min-h-screen">
      <div className="md:hidden p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div className="w-full">
        <div className="p-4 bg-[#dbf2ff]">
          <div className="grid grid-cols-1 md:grid-cols-[40%_auto] gap-4 mt-5 w-full">
            <div className="bg-white p-6 text-center rounded-xl">
              <form onSubmit={saveData}>
                <img src={preview} alt="Profile" className="w-32 h-32 mx-auto rounded-full object-cover" />
                <p className="font-[700] text-[18px] md:text-[20px] text-[#636363] mt-3">
                  Ibad ur Rahman
                </p>

                <div className="border border-[#D6D6D6] flex justify-between items-center px-3 py-2 mt-4 rounded-lg">
                  <input type="file" id="fileInput" name="employeeFile" className="hidden" onChange={handleFileChange} accept="image/*" />
                  <label htmlFor="fileInput" className="text-gray-600 cursor-pointer">
                    {fileName}
                  </label>
                  <label htmlFor="fileInput" className="bg-[#ECECEC] text-[#676767] px-4 py-2 rounded-lg cursor-pointer">
                    Browse
                  </label>
                </div>

                <button type="submit" className="cursor bg-[#2EAEA5] px-6 py-2 mt-4 text-white rounded-lg font-[600] text-[14px] md:text-[15px]">
                  Update
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    </div>

    +
    6
  );
}

export default ManagmentDashboard;
