import mongoose from "mongoose";

const annotationSchema = new mongoose.Schema({
  pieceId: { type: mongoose.Schema.Types.ObjectId, ref: "Piece" },
  filePath: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["text", "draw"], default: "text" },
  content: String, // for text or serialized drawing data
  x: Number,
  y: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Annotation", annotationSchema);