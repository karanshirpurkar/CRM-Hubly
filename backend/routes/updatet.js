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

router.put('/:ticketId', auth, async (req, res, next) => {
    try {
        const ticketId = req.params.ticketId; // Fixed parameter name
        const { T_status } = req.body;


        if (!T_status) {
            // return res.status(400).json({ message: "Missing T_status" });
        const error = new Error("T_status is required");
        error.name = "MissingFieldError";
        throw error;
        }

        // Find the ticket by ID and update it
        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            {
                status: T_status, // Update the status field
            },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        next(error);
    }
});

router.put('/reassign/:ticketId', auth, async (req, res, next) => {
    try {
      const ticketId = req.params.ticketId;
      const { MemberId } = req.body; // You will send new employee ID in body
  
      if (!MemberId) {
        // return res.status(400).json({ message: "newEmployeeId is required" });
        const error = new Error("MemberId is required");
        error.name = "MissingFieldError";
        throw error;
    }
  
      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        { assignedTo: [MemberId] }, // <-- replace entire assignedTo array
        { new: true }
      );
  
      if (!updatedTicket) {
        // return res.status(404).json({ message: "Ticket not found" });
        const error = new Error("Ticket not found");
        error.name = "NotFoundError";
        throw error;
    }
  
      res.status(200).json(updatedTicket);
    } catch (error) {
      next(error);
    }
  });

router.get('/all', async (req, res, next) => {
    try {
        const tickets = await Ticket.find({});
        res.status(200).json(tickets);
    } catch (error) {
        next(error);
    }
});

router.delete("/all", async (req, res) => {
    try {
        const result = await Ticket.deleteMany({});
        res.status(200).json({ message: "All tickets deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tickets", error });
    }
});


module.exports = router;