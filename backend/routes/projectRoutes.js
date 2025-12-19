import express from "express";
import multer from "multer";
import Project from "../models/Project.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ADD PROJECT
router.post("/", upload.single("image"), async (req, res) => {
  const project = await Project.create({
    name: req.body.name,
    description: req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : ""
  });

  res.json(project);
});

// GET PROJECTS
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

export default router;
