import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// SUBMIT CONTACT FORM
router.post("/", async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
});

// VIEW CONTACTS (ADMIN)
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

export default router;
