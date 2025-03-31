import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      // Redirect to the tasks page
      navigate('/tasks');
    } catch (err) {
      console.error('Login error:', err.response || err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600 mr-2">New user?</span>
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
