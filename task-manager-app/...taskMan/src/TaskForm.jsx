import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Optionally, you can also manage status state if you want to show it in the form
  const status = "pending";
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      // Send a POST request including title, description, and status ("pending")
      await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Clear the form fields and redirect to the tasks page
      setTitle('');
      setDescription('');
      navigate('/tasks');
    } catch (err) {
      console.error('Error creating task:', err.response || err);
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Task</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
          <input
            id="title"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Task description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Optionally, show the default status */}
        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700 mb-2">Status</label>
          <input
            id="status"
            type="text"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            value={status}
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
