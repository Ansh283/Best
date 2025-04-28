const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // Import auth routes
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// Middleware: parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Register routes: it's a good idea to mount auth routes first to avoid route conflicts.
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

// Connect to MongoDB (no options needed if using Mongoose 6+)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
