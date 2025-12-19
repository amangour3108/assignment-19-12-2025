import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// SUBSCRIBE EMAIL
router.post("/", async (req, res) => {
  const subscriber = await Subscriber.create(req.body);
  res.json(subscriber);
});

// VIEW SUBSCRIBERS
router.get("/", async (req, res) => {
  const subscribers = await Subscriber.find();
  res.json(subscribers);
});

export default router;
