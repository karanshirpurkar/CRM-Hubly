const Emoployee = require('../models/employes.model');
const auth = require('../middleware/authhandler');
const Admin = require('../models/admin');
const Bot = require('../models/bot.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
const express = require('express');
const router = express.Router();

const Ticket = require('../models/tickets.model');




router.get('/', async (req, res, next) => {
    try {
        const bot = await Bot.find({});
        res.status(200).json(bot);
    } catch (error) {
        next(error);
    }
}
);
router.put('/', async (req, res, next) => {
    try {
        const {botdata }= req.body;
        const { header, background, prompt, greetings, name, email, phone, missed, welcome } = botdata;

        // Prepare the updated data
        const botData = {
            header,
            background,
            prompt,
            greetings,
            name,
            email,
            phone,
            missed,
            welcome,
        };

        // Update the first matching bot document
        const updatedBot = await Bot.findOneAndUpdate({}, botData, { new: true, upsert: true });

        if (!updatedBot) {
            return res.status(404).json({ message: "Bot not found" });
        }

        res.status(200).json({ message: "Bot updated successfully", data: updatedBot });
    } catch (error) {
        console.error("Error updating bot:", error);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { header, background, prompt, greetings, name, email, phone, missed } = req.body;
        const botData = {
            header,
            background,
            prompt,
            greetings,
            name,
            email,
            phone,
            missed
        };
        const newBot = new Bot(botData);
        await newBot.save();
        res.status(201).json({message: "Bot created successfully"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;