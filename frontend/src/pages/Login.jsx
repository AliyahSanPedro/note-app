import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider"; // ✅ FIXED import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use the hook correctly

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email, password }
    );

    if (response.data.success) {
      // ✅ Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Optional: store user info in context
      login(response.data.user); 

      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <div className="border shadow p-6 w-80 bg-pink-300">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border shadow bg-pink-200"
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border shadow bg-pink-200"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 hover:bg-pink-700 transition duration-200"
            >
              Login
            </button>
            <p className="text-center mt-2">
              Don't have an account? <Link to="/signup" className="text-pink-600 underline">Signup</Link> {/* ✅ fixed link */}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
