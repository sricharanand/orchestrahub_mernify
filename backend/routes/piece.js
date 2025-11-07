import express from "express";
import multer from "multer";
import Piece from "../models/Piece.js";

const router = express.Router();

// Storage setup for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"))
});
const upload = multer({ storage });

// Create a new piece
router.post("/create", upload.array("files"), async (req, res) => {
  try {
    const { title, composer, createdBy } = req.body;
    const files = req.files.map(f => ({
      instrument: f.originalname.split(".")[0],
      filePath: f.path
    }));

    const piece = await Piece.create({ title, composer, files, createdBy });
    res.json(piece);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating piece" });
  }
});

// Assign file to instrumentalists
router.post("/assign/:pieceId", async (req, res) => {
  try {
    const { pieceId } = req.params;
    const { instrument, userIds } = req.body; // array of user IDs

    const piece = await Piece.findById(pieceId);
    const file = piece.files.find(f => f.instrument === instrument);
    if (!file) return res.status(404).json({ msg: "File not found" });

    file.assignedTo.push(...userIds);
    await piece.save();
    res.json(piece);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Assignment error" });
  }
});

// Get all pieces (for admin)
router.get("/", async (req, res) => {
  const pieces = await Piece.find().populate("files.assignedTo", "name instrument");
  res.json(pieces);
});

// Get pieces assigned to a specific user (for instrumentalist)
router.get("/my/:userId", async (req, res) => {
  const pieces = await Piece.find({ "files.assignedTo": req.params.userId });
  res.json(pieces);
});

export default router;