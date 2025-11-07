import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  instrument: String,
  filePath: String,
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const pieceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  composer: String,
  files: [fileSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Piece", pieceSchema);