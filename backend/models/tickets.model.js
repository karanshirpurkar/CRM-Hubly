const { response } = require('express');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: 'user'
    },
    chats: [
        {
            senderType: {
                type: String,
                enum: ['user', 'Member','Bot'], // Specify whether the sender is a user or an admin
                required: true
            },
            message: {
                type: String,
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    status: {
        type: String,
        default: 'Unresolved'
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    missingInfo: {
        type: Boolean,
        default: false
    },
    responseInfo: {
        type: Date, // Change from Boolean to Date
        default: null // Default to null if not provided
    },

})

module.exports = mongoose.model('Ticket', ticketSchema);