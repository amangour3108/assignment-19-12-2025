import express from "express";
import multer from "multer";
import Client from "../models/Client.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ADD CLIENT
router.post("/", upload.single("image"), async (req, res) => {
  const client = await Client.create({
    name: req.body.name,
    description: req.body.description,
    designation: req.body.designation,
    image: req.file ? `/uploads/${req.file.filename}` : ""
  });

  res.json(client);
});

// GET CLIENTS
router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

export default router;
