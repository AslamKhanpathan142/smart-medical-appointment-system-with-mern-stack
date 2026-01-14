const express = require("express");
const {addHealthTips, showAllHealthTips, showSpecifyDoctorHealthTips} = require('../controllers/healthTipsController');
const protect = require('../middleware/protectPatient');

const router = express.Router()

router.post('/addHealthTip', protect, addHealthTips);
router.get('/showSpecifyDoctorHealthTips', protect, showSpecifyDoctorHealthTips);
router.get('/showAllHealthTips', showAllHealthTips);

module.exports = router;