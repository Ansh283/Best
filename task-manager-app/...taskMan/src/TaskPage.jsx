import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      console.log("Token retrieved:", token);
      console.log("Title:", title, "Description:", description);
      // Create a new task, explicitly setting status as 'pending'
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description, status: 'pending' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response from task creation:", response.data);
      // Add the newly created task to the state
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (err) {
      console.error('Error creating task:', err.response || err);
      setError('Failed to create task. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete task');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Back to Home Button */}
      <div className="mb-4">
        <Link 
          to="/" 
          className="inline-block text-blue-600 hover:underline"
        >
          &larr; Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Toggle button to show/hide the new task form */}
      <div className="flex justify-center mb-4">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>
      </div>

      {/* New Task Form */}
      {showForm && (
        <div className="max-w-lg mx-auto mb-6 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold text-center mb-4">Create a New Task</h2>
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
            <div className="mb-6">
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
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Create Task
            </button>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-center col-span-full">No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="mb-1">
                <span className="font-bold">Description:</span> {task.description}
              </p>
              <p className="mb-2">
                <span className="font-bold">Status:</span> {task.status}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/tasks/edit/${task._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskPage;
