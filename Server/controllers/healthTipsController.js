
const HealthTip = require('../models/HealthTips');

const addHealthTips = async (req, res) => {
    const { title, description, } = req.body;
    const doctorId = req.user.id;
    
    try {
        const healthTip = await HealthTip.create({
            title,
            description,
            createdBy : doctorId
        })
        res.status(200).json({message : "HealthTips Add Successfully", healthTip});
    } catch (error) {
        res.status(500).json({ message: "Failed to Add HealthTip. Please try again.", error})
    }
}

const showAllHealthTips = async (req, res) => {
    try {
        const showHealthTips = await HealthTip.find().populate('createdBy', 'name email phone');
        res.status(200).json(showHealthTips)
    } catch (error) {
         res.status(500).json({ message: "Failed to Show All HealthTips. Please try again.", error})
    }
}

const showSpecifyDoctorHealthTips = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const doctorHealthTips = await HealthTip.find({createdBy: doctorId});
        res.status(200).json(doctorHealthTips)
    } catch (error) {
         res.status(500).json({ message: "Failed to Show HealthTips. Please try again.", error})
    }
}

module.exports = {
    addHealthTips,
    showAllHealthTips,
    showSpecifyDoctorHealthTips,
}