import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditTaskForm() {
  const { id } = useParams(); // Task ID from URL
  const navigate = useNavigate();
  
  // State for task fields and error message
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  // Fetch existing task details on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated.');
          return;
        }
        if (!id) {
          setError('Invalid Task ID.');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data);
        const task = response.data;
        setTitle(task.title);
        console.log(task.title)
        setDescription(task.description);
        setStatus(task.status);
      } catch (err) {
        setError('Failed to load task details.');
      }
    };

   if(id) fetchTask();
  }, [id]);

  // Handle form submission to update the task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { title, description, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Redirect back to the task management page after updating
      navigate('/tasks');
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  return (
    <div key={id} className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Task</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
          <input 
            id="title"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
          <textarea 
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="status" className="block text-gray-700 mb-2">Status</label>
          <select 
            id="status"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button 
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
        >
          Update Task
        </button>
        {error && <p className="text-red-500">{error}</p>}

      </form>
    </div>
  );
}

export default EditTaskForm;
