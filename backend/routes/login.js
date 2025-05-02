const Emoployee = require('../models/employes.model');
const auth = require('../middleware/authhandler');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
const express = require('express');
const router = express.Router();





router.post('/register', async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            // return res.status(400).json({ message: 'User already exists' });
            const error = new Error("User not found");
            error.name = "NotFoundError";
            throw error;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const newUser = await Emoployee.create({
            firstName,
            lastName,
            email,
            designation: "Admin",
            password: hashedPassword,
            createdby: newAdmin._id,
        });

        await newAdmin.save();
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: '1D' });

        res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Emoployee.findOne({ email });
        if (!existingUser) {
            // return res.status(400).json({ message: 'User already exists' });
            const error = new Error("Invalid password");
            error.name = "UnauthorizedError";
            throw error;
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            const error = new Error("Invalid password");
            error.name = "UnauthorizedError";
            throw error;
        }
        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.SECRET, { expiresIn: '1D' });
        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        next(error);
    }
})

router.get('/getall', async (req, res, next) => {
    try {
        const users = await Emoployee.find().populate('createdby', 'name email');
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});
module.exports = router;