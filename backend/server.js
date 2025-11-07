import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import pieceRoutes from "./routes/piece.js";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/piece", pieceRoutes);

// maintain the admin email ID
async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const existing = await User.findOne({ email: adminEmail });
  if (!existing) 
  {
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const admin = new User({
      name: "Admin",
      email: adminEmail,
      password: hashed,
      role: "admin",
      instrument: "Conductor"
    });
    await admin.save();
    console.log("👑 Admin user created:", adminEmail, "(password: admin123)");
  } 
  else
    console.log("👑 Admin already exists.");
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedAdmin(); // <---- add this
  })
  .catch(err => console.error("❌ Mongo error:", err));


app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
);