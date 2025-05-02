const Employee = require('../models/employes.model');
const auth = require('../middleware/authhandler');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
const express = require('express');
const router = express.Router();

router.post('/addmember', auth, async (req, res, next) => {
    const { name, email, designation } = req.body;

    try {
        // Check if user already exists
        const existingUser = await Employee.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.name = "UserExistsError";
            throw error; 
        }
        const admin = await Employee.findById(req.user);
        if (admin.toObject().designation !== "Admin") {
            const error = new Error("You are not authorized to create a member");
            error.name = "UnauthorizedError";
            throw error;
        }

        const [first, last] = name.split(' '); // Handle full name splitting

        const member = new Employee({
            firstName: first,
            lastName: last, // fallback if only one name
            email,
            designation,
            createdby: req.user,
            password: admin.toObject().password, // ideally generate a temp password
        });

        await member.save(); // Don't forget to save

        res.status(201).json({ message: "Member created successfully" });

    } catch (error) {
        next(error);
    }
});

router.get('/all',auth, async (req, res, next) => {
    try {
        const members = await Employee.find();
        res.status(200).json(members);

    } catch (error) {
        next(error);
    }

});

router.get('/update',auth, async(req,res,next)=>{
    const ID= req.user
    const Member = await Employee.findById(ID);
    try{
        if (Member) {
            res.status(201).send(Member);
        }
        else {
            const error = new Error("user not found");
            error.name = "NotFoundError";
            throw error;
    }}
    catch (error){
        next(error)
    }
})

module.exports = router;