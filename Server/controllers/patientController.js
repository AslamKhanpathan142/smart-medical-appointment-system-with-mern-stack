const Login = require('../models/Login');

const patientProfile = async(req, res) => {
    try {
        res.json({
            success: true,
            user : req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

const updatePatientProfile = async(req, res) => {
    try {
        const {name, email, phone} = req.body;
        const userId = req.user.id;
        const updatedPatient = await Login.findByIdAndUpdate(
            userId,
            {name, email, phone},
            { new: true}
        )
       if (!updatedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
}
        res.json({ success: true, user: updatedPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    patientProfile,
    updatePatientProfile,
}
