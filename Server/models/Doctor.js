const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  about: { type: String, maxlength: 500 },
  locationDr: { type: String, maxlength: 500 },
  qualification: { type: String },
  availableDays: [{ type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }],
  availableSlots: [
    {
      date: { type: String, required: true }, // YYYY-MM-DD
      slots: [
        {
          start: { type: String, required: true }, // "10:00 AM"
          end: { type: String, required: true }   // "11:00 AM"
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Doctor', doctorSchema);
