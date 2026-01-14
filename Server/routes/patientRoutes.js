const protect = require('../middleware/protectPatient');
const {patientProfile,updatePatientProfile} = require('../controllers/patientController')
const express = require('express');

const router = express.Router();

router.get('/patientProfile', protect, patientProfile);
router.put('/updatePatientProfile', protect, updatePatientProfile);

module.exports = router;