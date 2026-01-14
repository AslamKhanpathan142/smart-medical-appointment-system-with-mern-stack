const mongoose = require('mongoose');

const healthTipsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Login' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthTips', healthTipsSchema);
