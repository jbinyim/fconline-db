import express from "express";
import eventController from "../controllers/event.controller";

const eventRouter = express.Router();

eventRouter.get("/get", eventController.getEvents);

export default eventRouter;
