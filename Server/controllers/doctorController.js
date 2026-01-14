const Login = require("../models/Login");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");

const addDoctor = async (req, res) => {
  const {
    name,
    email,
    phone,
    specialization,
    experience,
    about,
    locationDr,
    qualification,
    availableDays,
    startTime,
    endTime,
  } = req.body;

  try {
    const autoPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(autoPassword, 10);

    const login = await Login.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "doctor",
    });

    // ✅ parse hours directly from "HH:MM"
    const parseHour = (timeStr) => {
      return parseInt(timeStr.split(":")[0], 10); // e.g. "10:30" → 10
    };

    const startHour = parseHour(startTime);
    const endHour = parseHour(endTime);

    // generate available slots (today + next 3 days)
    const availableSlots = [];
    const now = new Date();

    for (let i = 0; i < 4; i++) {
      // today + 3 days
      const date = new Date(now);
      date.setDate(now.getDate() + i);

      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

      const slots = [];
      for (let h = startHour; h < endHour; h++) {
        const startLabel = `${h.toString().padStart(2, "0")}:00`; // "09:00"
        const endLabel = `${(h + 1).toString().padStart(2, "0")}:00`; // "10:00"

        slots.push({ start: startLabel, end: endLabel });
      }

      availableSlots.push({ date: formattedDate, slots });
    }

    const doctor = await Doctor.create({
      userId: login._id,
      specialization,
      experience,
      about,
      locationDr,
      qualification,
      availableDays,
      availableSlots,
    });

    return res.json({
      message: "Doctor Added Successfully",
      autoPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const showAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "userId",
      "name email phone role"
    );
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ message: "doctor not found" });
    await Login.findByIdAndDelete(doctor.userId);
    await Doctor.findByIdAndDelete(id);
    return res.json({
      message: "Doctor and linked login deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// This controller is used Doctor Panel

const showSpecifyDoctor = async (req, res) => {
  const doctorId = req.user.id;
  try {
    const doctor = await Doctor.findOne({
      userId: doctorId,
    }).populate("userId", "name phone email");
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addDoctor,
  showAllDoctors,
  deleteDoctor,
  showSpecifyDoctor,
};
