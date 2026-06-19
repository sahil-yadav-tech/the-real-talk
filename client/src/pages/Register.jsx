import React, { useState } from "react";

const Register = () => {
  const [showForm, setShowForm] = useState(true);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "",
    role: "",
  });

  const HandleChanges = (e) => {
    const { name, value } = e.target;

    console.log(name, value, "name value");

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputStyle =
    "w-full bg-[#1F1F1F] text-white px-5 py-4 rounded-2xl outline-none border border-transparent focus:border-[#FABD02] transition-all duration-300 placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
        <div className="max-w-xl">
          <img
            src="./registerlogoreal.png"
            alt="Video Call"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#1F1F1F] p-1 rounded-full flex">
              <button
                className={`px-8 py-3 rounded-full transition-all duration-300 ${
                  showForm
                    ? "bg-[#FABD02] text-black font-semibold shadow-[0_0_20px_rgba(250,189,2,0.5)]"
                    : "text-gray-400"
                }`}
                onClick={() => setShowForm(true)}
              >
                Sign Up
              </button>

              <button
                className={`px-8 py-3 rounded-full transition-all duration-300 ${
                  !showForm
                    ? "bg-[#FABD02] text-black font-semibold shadow-[0_0_20px_rgba(250,189,2,0.5)]"
                    : "text-gray-400"
                }`}
                onClick={() => setShowForm(false)}
              >
                Log In
              </button>
            </div>
          </div>

          {/* Form */}
          <h2 className="text-center text-5xl font-semibold mb-10">
            Create An Account
          </h2>
          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={HandleChanges}
              className={inputStyle}
              value={userData.firstName}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={HandleChanges}
              className={inputStyle}
              value={userData.lastName}
            />
          </div>

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={HandleChanges}
            className={`${inputStyle} mb-4`}
            value={userData.username}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={HandleChanges}
            className={`${inputStyle} mb-4`}
            value={userData.email}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={HandleChanges}
            className={`${inputStyle} mb-4`}
            value={userData.password}
          />  



          {/* Gender */}
          <select
            name="gender"
            onChange={HandleChanges}
            className={`${inputStyle} mb-4`}
            value={userData.gender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Phone Number */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={HandleChanges}
            className={`${inputStyle} mb-4`}
            value={userData.phoneNumber}
          />

          {/* Role */}
          <select
            name="role"
            onChange={HandleChanges}
            className={`${inputStyle} mb-8`}
            value={userData.role}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Button */}
          <button
            className="
    w-full
    bg-[#FABD02]
    text-black
    font-semibold
    py-4
    rounded-2xl
    transition-all
    duration-300
    hover:scale-[1.02]
    shadow-[0_0_25px_rgba(250,189,2,0.6)]
  "
          >
            Create an Account
          </button>
          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-[1px] bg-gray-800"></div>
            <span className="px-4 text-gray-400">Or</span>
            <div className="flex-1 h-[1px] bg-gray-800"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button className="bg-[#1F1F1F] py-4 rounded-2xl hover:bg-[#2a2a2a] transition">
              Google
            </button>

            <button className="bg-[#1F1F1F] py-4 rounded-2xl hover:bg-[#2a2a2a] transition">
              Facebook
            </button>

            <button className="bg-[#1F1F1F] py-4 rounded-2xl hover:bg-[#2a2a2a] transition">
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
