const {addFeedback, showFeedback, updateFeedback} = require('../controllers/feedbackController')
const express = require('express')
const protect =require('../middleware/protectPatient')

const router = express.Router();

router.post('/addFeedback', protect, addFeedback);
router.get('/showFeedback', showFeedback);
router.put('/updatedFeedback/:id', updateFeedback);

module.exports = router