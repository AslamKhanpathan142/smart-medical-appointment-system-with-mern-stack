const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const bookAppointment = async (req, res) => {
  const patientId = req.user.id;
  const { doctorId, appointmentDate, appointmentTime, slotId } = req.body;

  try {
    // 1. Create appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
    });

    // 2. Remove booked slot
    await Doctor.updateOne(
      { _id: doctorId },
      {
        $pull: {
          "availableSlots.$[day].slots": { _id: slotId }
        }
      },
      {
        arrayFilters: [{ "day.date": appointmentDate }]
      }
    );

    // 3. Fetch UPDATED doctor (VERY IMPORTANT)
    const updatedDoctor = await Doctor.findById(doctorId);

    // 4. Return updated doctor to frontend
    res.status(200).json({
      message: "Appointment Booked Successfully",
      appointment,
      updatedDoctor,
    });

  } catch (error) {
    console.error("BookAppointment Error:", error);
    res.status(500).json({ message: error.message });
  }
};


const showAllAppointment = async (req, res) => {
  try {
    const showAllAppointment = await Appointment.find()
      .populate("patientId", "name email phone")
      .populate({
        path: "doctorId",
        select: "userId",
        populate: {
          path: "userId",
          select: "name", // only doctor name
        },
      });

    res.status(200).json({ showAllAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showPatientAppointment = async (req, res) => {
  const patientId = req.user.id;
  try {
    const showPatientAppointment = await Appointment.find({
      patientId,
    }).populate({
      path: "doctorId",
      select: "userId specialization locationDr qualification",
      populate: {
        path: "userId",
        select: "name email phone", // only doctor name
      },
    });
    res.status(200).json({ showPatientAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showDoctorAppointment = async (req, res) => {
  const doctorId = req.user.id;
  try {
    const doctor = await Doctor.findOne({ userId: doctorId });

    const appointments = await Appointment.find({ doctorId: doctor._id })
      .populate("patientId", "name email phone")
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      });

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const deleteAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deleteAppointment)
      return res.status(401).json({ message: "Appointment Not Found" });
    res.status(200).json({ message: "Appointment Delete Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointmentStatus = await Appointment.findById(appointmentId);
    if (!appointmentStatus)
      return res.status(401).json({ message: "Appointment Not Found" });
    if (appointmentStatus.status === "cancelled") {
      return res.status(400).json({ message: "Appointment Already Cancelled" });
    }
    if (appointmentStatus.status === "confirmed") {
      return res
        .status(400)
        .json({ message: "Appointment already confirmed, cannot cancel" });
    }
    appointmentStatus.status = "cancelled";
    await appointmentStatus.save();
    res.status(200).json({ message: "Appointment Cancel Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment Not Found" });
    }

    if (appointment.status === "confirmed") {
      return res.status(400).json({ message: "Appointment already confirmed" });
    }

    if (appointment.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Appointment already cancelled, cannot confirm" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    res.status(200).json({
      message: "Appointment confirmed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /Appointment/reschedule/:id
const rescheduleAppointment = async (req, res) => {
  const { id } = req.params;
  const { appointmentDate, appointmentTime, slotId, doctorId } = req.body;

  try {
    // Step 1: Free the old slot
    const oldAppt = await Appointment.findById(id);
    await Doctor.updateOne(
      { _id: oldAppt.doctorId, "availableSlots.slots._id": oldAppt.slotId },
      { $set: { "availableSlots.$.slots.$[slot].isBooked": false } },
      { arrayFilters: [{ "slot._id": oldAppt.slotId }] }
    );

    // Step 2: Update Appointment
    const updated = await Appointment.findByIdAndUpdate(
      id,
      {
        appointmentDate,
        appointmentTime,
        slotId,
        doctorId
      },
      { new: true }
    );

    // Step 3: Book the new slot
    await Doctor.updateOne(
      { _id: doctorId, "availableSlots.slots._id": slotId },
      { $set: { "availableSlots.$.slots.$[slot].isBooked": true } },
      { arrayFilters: [{ "slot._id": slotId }] }
    );

    res.json({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment: updated
    });

  } catch (err) {
    res.status(500).json({ message: "Error rescheduling appointment", error: err });
  }
};


module.exports = {
  bookAppointment,
  showAllAppointment,
  showPatientAppointment,
  showDoctorAppointment,
  deleteAppointment,
  cancelAppointment,
  confirmAppointment,
  rescheduleAppointment
};
