import { useState } from "react";
import axios from "axios"
export default function Register() {
const [formData, setFormData] = useState({
firstName: "",
lastName: "",
username: "",
email: "",
phone: "",
gender: "",
password: "",
confirmPassword: "",
});

const [errors, setErrors] = useState({});

const handleChange = (e) => {
setFormData((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));

setErrors((prev) => ({
  ...prev,
  [e.target.name]: "",
}));

};

const validateForm = () => {
const newErrors = {};

if (!formData.firstName.trim()) {
  newErrors.firstName = "First name is required";
}

if (!formData.lastName.trim()) {
  newErrors.lastName = "Last name is required";
}

if (!formData.username.trim()) {
  newErrors.username = "Username is required";
} else if (formData.username.length < 4) {
  newErrors.username =
    "Username must be at least 4 characters";
}

if (!formData.email.trim()) {
  newErrors.email = "Email is required";
} else if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    formData.email
  )
) {
  newErrors.email = "Invalid email";
}

if (!formData.phone.trim()) {
  newErrors.phone = "Phone is required";
} else if (
  !/^[0-9]{10}$/.test(formData.phone)
) {
  newErrors.phone =
    "Phone must contain 10 digits";
}

if (!formData.gender) {
  newErrors.gender = "Please select gender";
}

if (!formData.password) {
  newErrors.password = "Password required";
} else if (formData.password.length < 8) {
  newErrors.password =
    "Password must be at least 8 characters";
}

if (!formData.confirmPassword) {
  newErrors.confirmPassword =
    "Confirm password required";
} else if (
  formData.password !==
  formData.confirmPassword
) {
  newErrors.confirmPassword =
    "Passwords do not match";
}

return newErrors;

};

const handleSubmit = async (e) => {
e.preventDefault();

const validationErrors =
  validateForm();

if (
  Object.keys(validationErrors).length > 0
) {
  setErrors(validationErrors);
  return;
}

try {
  console.log(formData);

  // API CALL

  await axios.post(
    "http://localhost:9876/api/auth/register",
    formData
  );

  alert("Registration Successful");

  setFormData({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
} catch (error) {
  console.log(error);
}

};

return ( <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4"> <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8"> <h1 className="text-3xl font-bold text-center mb-8">
Create Account </h1>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">
            {errors.username}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            Select Gender
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
          <option value="other">
            Other
          </option>
        </select>

        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">
            {errors.gender}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  </div>
</div>

);
}
