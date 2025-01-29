const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const reminderRoutes = require('./routes/reminders');
dotenv.config(); //Load env vars before using.
const app = express();
const bot = require('./bot')

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')

    })
    .catch(err => console.log(err));
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);

});

app.use('/api/auth', authRoutes);

app.use('/api/reminders', reminderRoutes);
// Debug - log env vars.
// console.log(process.env)
// Create the Telegram bot instance OUTSIDE the app.listen callback


