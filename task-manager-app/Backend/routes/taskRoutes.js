const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware'); // Import JWT middleware
const mongoose = require('mongoose');
const router = express.Router();

// ✅ POST /tasks - Create a new task (Protected)
router.post('/tasks', authMiddleware, async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Authenticated user:", req.user);
        const { title, description, status } = req.body;
        // Use req.user.userId from your token payload
        const newTask = new Task({ title, description, status, userId: req.user.userId });
        await newTask.save();
        console.log("Task successfully saved:", newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: 'Error creating task' });
    }
});

// ✅ GET /tasks - Get all tasks for authenticated user
router.get('/tasks', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// ✅ GET /tasks/:id - Get a single task by ID (Protected)
router.get('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Task ID' });
        }

        const task = await Task.findOne({ _id: id, userId: req.user.userId });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: 'Error fetching task' });
    }
});

// ✅ PUT /tasks/:id - Update a task (Protected)
router.put('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Task ID' });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.userId }, // Ensure the task belongs to the user
            req.body,
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
        console.log("Task updated successfully:", updatedTask);
        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: 'Error updating task' });
    }
});

// ✅ DELETE /tasks/:id - Delete a task (Protected)
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Task ID' });
        }

        const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
        if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: 'Error deleting task' });
    }
});

module.exports = router;
