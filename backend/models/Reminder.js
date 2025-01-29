const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    recurrence: { type: String, enum: ['one-time', 'daily', 'weekly', 'monthly', 'yearly'], default: 'one-time' },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    location: { type: String },
    attachments: [{ type: String }] // URLs or paths to attached files
});

module.exports = mongoose.model('Reminder', reminderSchema); 