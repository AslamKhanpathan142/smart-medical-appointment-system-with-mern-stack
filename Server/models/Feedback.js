const  mongoose  = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  subject: { type: String },
  message: { type: String, maxlength: 500 },
  rating: { type: Number, min: 1, max: 5, required: true },
  visible : { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
