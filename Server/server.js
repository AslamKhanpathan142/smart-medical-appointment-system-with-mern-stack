const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const authRoute = require('./routes/authRoutes')
const patientRoute = require('./routes/patientRoutes')
const doctorRoute = require('./routes/doctorRoutes')
const feedbackRoute = require('./routes/feedbackRoutes')
const HealthTipRoute = require('./routes/healthTipsRoutes')
const AppointmentRoute = require('./routes/appointmentRoutes')
// const bcrypt = require('bcryptjs')
// const Login = require('./models/Login')


const app = express()

dotenv.config()
connectDB()

// Middleware
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/' , patientRoute);
app.use('/patient', authRoute);
app.use('/doctor', doctorRoute);
app.use('/feedback', feedbackRoute);
app.use('/healthTips', HealthTipRoute);
app.use('/Appointment', AppointmentRoute);

app.get('/user', (req, res) => {
   return res.json({user: "Aslam Khan", age: "20", email: "aslam@gmail.com"})
})

// Admin create
// app.post('/admin', async(req, res) => {
//     const {name, email, phone, password, role} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await Login.create({
//         name,
//         email,
//         phone,
//         password: hashedPassword,
//         role,
//     })
//     res.json({message: 'Admin create successfully'});
// })


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is Started: ${PORT}`)
})