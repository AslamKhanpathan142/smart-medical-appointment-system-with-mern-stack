const express = require('express');
const {bookAppointment, showAllAppointment, showPatientAppointment, showDoctorAppointment, deleteAppointment, cancelAppointment, confirmAppointment, rescheduleAppointment} = require('../controllers/appointmentController');
const protect = require('../middleware/protectPatient')

const router = express.Router();

router.post('/bookAppointment', protect, bookAppointment);
router.get('/showAllAppointment', showAllAppointment);
router.get('/showPatientAppointment', protect, showPatientAppointment);
router.get('/showDoctorAppointment', protect, showDoctorAppointment);
router.delete('/deleteAppointment/:id', deleteAppointment);
router.patch('/cancelAppointment/:id', cancelAppointment);
router.patch('/confirmAppointment/:id', confirmAppointment);
router.patch("/reschedule/:id", rescheduleAppointment);


module.exports = router;