import { NextFunction, Request, Response } from "express";
import eventService from "../services/event.service";

async function getEvents(req: Request, res: Response, next: NextFunction) {
  try {
    const events = await eventService.getEvents();

    res.status(201).json(events);
  } catch (e) {
    next(e);
  }
}

export default {
  getEvents,
};
