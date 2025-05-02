const mongoose = require('mongoose');
const { create } = require('./admin');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ['Admin', 'Member'],
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
})
module.exports = mongoose.model('Employee', employeeSchema);