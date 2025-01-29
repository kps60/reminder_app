const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bot = require('../bot');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ token, message: 'User registered' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
router.post('/verify', async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    console.log(user)
    if (user) {
        bot.onText(/\/start/, async (msg) => {
            const chatId = msg.chat.id;
            const welcomeMessage = `
                Welcome to ReminderBot!
                `;
            bot.sendMessage(chatId, welcomeMessage);
            // console.log(bot.getChatAdministrators(chatId))


            user.verified = true;
            user.chatId = chatId;

            try {
                await user.save();
                bot.sendMessage(chatId, `User ID from database has verified successfully: ${userId}`);
                res.status(200).json({ user });
            } catch (error) {
                res.status(401).json({ message: error.message });
            }

        })
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.get("/", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        res.status(200).json({ user });
    } catch (error) {
        throw new Error("unable to get user by Id");
    }
})

// router.post("/verify", async (req, res) => {
//     Bot()
// })
module.exports = router;
