import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to Task Manager
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center">
        Manage your tasks efficiently and effectively.
      </p>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="/login"
          className="bg-white text-blue-500 px-4 py-2 sm:px-6 sm:py-3 rounded font-semibold hover:bg-gray-200 transition duration-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
