const Emoployee = require('../models/employes.model');
const auth = require('../middleware/authhandler');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
const express = require('express');
const router = express.Router();

const Ticket = require('../models/tickets.model');

router.post('/create', async (req, res, next) => {
    try {
        const { name, email, phone, chats } = req.body;
        const admins= await Emoployee.find({designation:'Admin'}).select('_id');
        // console.log("admins",admins);
        const assignedTo = admins.map(admin => admin._id);
        // console.log("assignedTo",assignedTo);
        const missingInfo = false; // Default to false if not provided

        // Create a new ticket using the model
        const ticket = new Ticket({
            name,
            email,
            phone,
            chats, 
            status: 'Unresolved', 
            assignedTo, 
            missingInfo 
        });

        // Save the ticket to the database
        await ticket.save();
        const token = jwt.sign({ id: ticket._id }, process.env.SECRET, { expiresIn: '5D' });
        

        // Respond with the created ticket
        res.status(201).json({
            ticket,
            token,
            message: "Ticket created successfully"
          });   

    } catch (error) {
        // Handle errors
        // res.status(500).json({ message: 'Error creating ticket', error });
        next(error);
    }
});


router.put('/:ticketId', auth, async (req, res, next) => {
    try {
        const ticketId = req.params.ticketId; // Fixed parameter name
        const { userMessage } = req.body;
        const { senderType, message } = userMessage;

        if (!senderType || !message) {
            // return res.status(400).json({ message: 'senderType and message are required' });
            const error = new Error("senderType and message are required");
            error.name = "ValidationError";
            throw error;
          }
        let responseInfo;
        if (senderType==='Member') {
            const check=await Ticket.findById(ticketId)
            if (check.responseInfo===null){
              responseInfo = new Date(); // Set responseInfo to the current date

            }
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
          ticketId,
          {
              $push: {
                  chats: { senderType, message }
              },
              ...(responseInfo && { responseInfo }) // Update responseInfo if provided
          },
          { new: true } // Return the updated document
      );

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        next(error);
    }
});

router.get('/:ticketId',auth ,async (req, res, next) => {
    try {
        const ticket_id = req.params.ticketId; // Fixed parameter name
        // const TicketId = req.params.ticketId; // Fixed parameter name
        // console.log("ticked",ticket_id);
    
  
      const ticket = await Ticket.findById(ticket_id)  // Populate senderId with name, email, and phone
      
  
      if (!ticket) {
        // return res.status(404).json({ message: 'Ticket not found' });
        const error = new Error("Ticket not found");
        error.name = "NotFoundError";
        throw error;
      }
  
      res.status(200).json(ticket); // You can also just send ticket.chats if only chats are needed
    } catch (error) {
      next(error);
    }
  });




router.get('/',auth, async (req, res,next) => {
    try {
        const employeeId = req.user;    
        const tickets = await Ticket.find({ assignedTo: { $in: [employeeId] } });
    
        res.status(200).json(tickets);
      } catch (error) {
        next(error);
      }
    }

    // try {
    //     const employeeId = req.params.employeeId;
    
    //     const tickets = await Ticket.find({ assignedTo: { $in: [employeeId] } });
    
    //     res.status(200).json(tickets);
    //   } catch (error) {
    //     next(error);
    //   }
    // }
);


module.exports = router;