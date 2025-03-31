require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("Connected to MongoDB");

  const newUser = new User({
    email: "test@example.com",
    password: "password123"
  });

  await newUser.save();
  console.log("User created:", newUser);

  mongoose.connection.close();
}).catch(err => console.error("DB Error:", err));
