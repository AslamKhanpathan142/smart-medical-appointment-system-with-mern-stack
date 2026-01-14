const Feedback = require('../models/Feedback');

const addFeedback = async(req, res) => {
    const { subject, message, rating } = req.body;
    const userId = req.user.id;

    try {
        const feedback = await Feedback.create({
        patientId : userId,
        subject,
        message,
        rating
    })
    res.status(200).json({message : "Send feedback successfully", feedback, success : true})
    } catch (error) {
        res.status(500).json({ message: "Failed to submit feedback. Please try again.", success : false });
    }
}

const showFeedback = async(req, res) => {
    try {
        const feedback = await Feedback.find().populate('patientId', 'name email phone');
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateFeedback = async(req, res) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findById(id)
        if(feedback.visible == true) {
           const updatedFeedback =  await Feedback.findByIdAndUpdate(id,
                {visible: false},
                {new : true},
            )
            return res.json({message: "updated successfully", updatedFeedback})
        }
        else if(feedback.visible == false) {
            const updatedFeedback = await Feedback.findByIdAndUpdate(id, 
                {visible: true},
                {new: true},
            )
            return res.json({message: "updated successfully", updatedFeedback})
        }

         if (!feedback) {
         return res.status(404).json({ message: "Feedback not found" });
    }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {
    addFeedback,
    showFeedback,
    updateFeedback
}