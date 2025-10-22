import { Request, Response } from "express";
import Event from "../models/event.model";
import Ticket from "../models/ticket.model";

// --- EVENT CRUD ---
export const createEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, date, location, expectedAttendees, price, description } = req.body;

    const newEvent = await Event.create({
      title,
      date,
      location,
      expectedAttendees,
      price,
      description,
      organizerId: userId,
      attendees: 0,
      status: "pending"
    });

    res.status(201).json({ message: "Event created, pending approval", data: newEvent });
  } catch (error) {
    console.error("Error in createEvent:", error);
    res.status(500).json({ message: "Event creation failed" });
  }
};


//lay tat ca event cua minh
export const getAllEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ organizerId: userId });
    res.status(200).json({ data: events });
  } catch (error) {
    console.error("Error in getAllEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


//lay event pending cua minh
export const getAllPendingEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ organizerId:userId,status: "pending" });
    res.status(200).json({ message: "Pending events fetched", data: events });
  } catch (error) {
    console.error("Error in getAllApprovalEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};  

//lay event da approve cua minh
export const getAllApprovalEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ organizerId:userId,status: "approved" });
    res.status(200).json({ message: "Approved events fetched", data: events });
  } catch (error) {
    console.error("Error in getAllApprovalEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


//lay event cua tat ca moi nguoi tru cua minh (approved)
export const getEvents = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({status:"approved",organizerId:{ $ne: userId }});
    res.status(200).json({ data: events });
  } catch (error) {
    console.error("Error in getAllEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- TICKET CRUD ---
export const bookTicket = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { eventId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const remaining = (event.expectedAttendees || 0) - (event.attendees || 0);
    if (quantity > remaining) return res.status(400).json({ message: "Not enough tickets" });

    const ticket = await Ticket.create({
      userId,
      eventId,
      quantity,
      totalPrice: quantity * event.price,
      status: "booked",
    });

    event.attendees += quantity;
    await event.save();

    res.status(200).json({ message: "Booked successfully", data: ticket });
  } catch (error) {
    console.error("Error in bookTicket:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const cancelTicket = async (req: any, res: Response) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user.id });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    if (ticket.status !== "booked") return res.status(400).json({ message: "Cannot cancel" });

    const event = await Event.findById(ticket.eventId);
    if (event) {
      event.attendees -= ticket.quantity;
      await event.save();
    }

    ticket.status = "cancelled";
    await ticket.save();

    res.status(200).json({ message: "Ticket cancelled", data: ticket });
  } catch (error) {
    console.error("Error in cancelTicket:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTicketById = async (req: any, res: Response) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user.id })
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ data: ticket });
  } catch (error) {
    console.error("Error in getTicketById:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


