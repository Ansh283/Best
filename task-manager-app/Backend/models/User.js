const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures no duplicate emails
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Skip hashing if password is unchanged

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (err) {
    next(err);
  }
});

// Export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;
