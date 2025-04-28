import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import TaskPage from './TaskPage';
import EditTaskForm from './EditTaskForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/tasks/edit/:id" element={<EditTaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
