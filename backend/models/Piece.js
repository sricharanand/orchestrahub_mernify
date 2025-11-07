import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  instrument: { type: String, required: true },
  filePath: { type: String, required: true },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  annotatedPaths: { type: Object, default: {} }
});

const pieceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  composer: { type: String },
  files: [fileSchema]
});

export default mongoose.model("Piece", pieceSchema);