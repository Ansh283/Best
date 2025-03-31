import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });
      // Optionally, if you want to automatically log the user in after sign up:
      // localStorage.setItem('token', response.data.token);
      setSuccess('Registration successful! You can now log in.');
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSignUp}>
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-500 mb-4 text-center">{success}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
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
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
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
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600 mr-2">Already have an account?</span>
          <Link 
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
