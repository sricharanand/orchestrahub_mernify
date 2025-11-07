import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Piece from "../models/Piece.js";

const router = express.Router();
const dir = "uploads/annotations";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Storage setup for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".pdf";
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
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
    const { instrument, userIds } = req.body;

    const piece = await Piece.findById(pieceId);
    const file = piece.files.find(f => f.instrument === instrument);
    if (!file) return res.status(404).json({ msg: "Instrument not found" });

    // avoid duplicates
    file.assignedTo = [...new Set([...file.assignedTo, ...userIds])];
    await piece.save();

    res.json(piece);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Assignment error" });
  }
});

router.post("/upload-annotation/:pieceId", upload.single("file"), async (req, res) => {
  try {
    const { pieceId } = req.params;
    const { userId } = req.body;
    const filePath = req.file.path.replace(/\\/g, "/"); // fix Windows slashes

    const piece = await Piece.findById(pieceId);
    if (!piece) return res.status(404).json({ msg: "Piece not found" });

    // find the right file and attach this user's annotated copy
    for (const f of piece.files) {
      if (f.assignedTo.some(a => a.toString() === userId)) {
        if (!f.annotatedPaths) f.annotatedPaths = {};
        f.annotatedPaths[userId] = filePath;
      }
    }

    await piece.save();
    const updated = await Piece.findById(pieceId);
    res.json({ msg: "Annotated copy uploaded", piece: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload error" });
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