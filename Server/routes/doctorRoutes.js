const {addDoctor,showAllDoctors, deleteDoctor, showSpecifyDoctor} = require('../controllers/doctorController');
const express = require('express');
const protect = require('../middleware/protectPatient')

const router = express.Router()

router.post('/addDoctor', addDoctor);
router.get('/showAllDoctors', showAllDoctors);
router.delete('/deleteDoctor/:id', deleteDoctor);
router.get('/showSpecifyDoctor', protect, showSpecifyDoctor);

module.exports = router;