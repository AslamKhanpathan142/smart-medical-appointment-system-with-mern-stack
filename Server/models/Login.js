const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'doctor', 'patient'], required: true, default: 'patient' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Login', loginSchema);
