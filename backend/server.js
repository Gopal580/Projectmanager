const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const  authRoutes=require('./Routes/authRoutes')
const projectRoutes=require('./Routes/projectRoutes')
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true                
}));
app.use(express.json());

require('dotenv').config();
const PORT=process.env.PORT || 5000
const MONGO_URI=process.env.MONGO_URI
mongoose.connect(MONGO_URI).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));;

app.get('/', (req, res) => {
  res.send('Server is running');
});
// app.use(cookieParser());
app.use('/api/users',authRoutes)
app.use('/api/projects',projectRoutes)
global.otpStore = {};
app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});
