const express = require('express');
const Reminder = require('../models/Reminder');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

// Import the bot instance from server.js
const bot = require('../bot');


// Create a new reminder
router.post('/', async (req, res) => {
    const { userId, title, description, date, recurrence, priority, location, attachments } = req.body;
    const newReminder = new Reminder({ userId, title, description, date, recurrence, priority, location, attachments });
    await newReminder.save();
    res.status(201).json(newReminder);
});

// Get all reminders for a user
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }
    try {
        const reminders = await Reminder.find({ userId });
        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a reminder
router.put('/:id', async (req, res) => {
    const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReminder);
});

// Delete a reminder
router.delete('/:id', async (req, res) => {
    const data = await Reminder.findByIdAndDelete(req.params.id);
    res.status(204).json({ data });
});


const teleBot = async (reminder) => {
    try {

        // Function to send alert message to Telegram
        const sendTelegramAlert = async (chatId, reminderTitle) => {
            try {
                const message = `Alert: The reminder \n ${reminderTitle}`;
                await bot.sendMessage(chatId, message);
            } catch (error) {
                throw new Error(`unable to connect to the bot ${error.message}`, error.status)
            }
        };
        const user = await User.findById(reminder.userId)
        if (user?.verified) {
            const { chatId } = user;
            const { title } = reminder;
            sendTelegramAlert(chatId, title);
        }
    } catch (error) {
        throw new Error(`Error in telebot`)
    }
}

// Function to delete expired reminders and handle recurrence
const deleteExpiredReminders = async () => {
    try {
        const now = new Date();
        const expiredReminders = await Reminder.find({ date: { $lt: now } });

        for (const reminder of expiredReminders) {
            if (reminder.recurrence === 'one-time') {
                // Delete one-time reminders
                teleBot(reminder);
                await Reminder.findByIdAndDelete(reminder._id);
                console.log(`Deleted one-time reminder: ${reminder.title}`);
            } else {
                // Update the reminder for its next occurrence
                const nextOccurrence = getNextOccurrence(reminder);
                teleBot(reminder);
                reminder.date = nextOccurrence; // Update the date to the next occurrence
                await reminder.save();
                console.log(`Updated reminder: ${reminder.title} to next occurrence on ${nextOccurrence}`);
            }
        }
    } catch (error) {
        console.error('Error processing reminders:', error.message);
    }
};

// Function to calculate the next occurrence based on the recurrence type
const getNextOccurrence = (reminder) => {
    const { recurrence, date } = reminder;
    const nextDate = new Date(date);

    switch (recurrence) {
        case 'daily':
            nextDate.setDate(nextDate.getDate() + 1);
            break;
        case 'weekly':
            nextDate.setDate(nextDate.getDate() + 7);
            break;
        case 'monthly':
            nextDate.setMonth(nextDate.getMonth() + 1);
            break;
        case 'yearly':
            nextDate.setFullYear(nextDate.getFullYear() + 1);
            break;
        default:
            break;
    }

    return nextDate;
};

// Check for expired reminders every minute
setInterval(deleteExpiredReminders, 60000); // 60000 ms = 1 minute

module.exports = router;