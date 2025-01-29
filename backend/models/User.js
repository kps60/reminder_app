const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    chatId: { type: String, unique: true },
    verified: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        theme: { type: String, default: 'light' },
        notificationPreferences: { type: Object, default: {} },
        timeZone: { type: String, default: 'IST' }
    }
});

module.exports = mongoose.model('User', userSchema);
