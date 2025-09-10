import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/", formData);

      console.log("Response:", response.data);
      alert(response.data);

      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        console.error("Error Data:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form onSubmit={submitHandler}>
        <div className="w-[800px] bg-white p-6 mx-auto mt-10 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
            Create Your Account
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstname" className="block text-gray-600 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={changeHandler}
                required
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastname" className="block text-gray-600 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={changeHandler}
                required
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 mb-2">
              Choose Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              required
              placeholder="Choose a unique username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password Fields */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              required
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
