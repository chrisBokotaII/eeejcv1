import express from "express";
import mongoose from "mongoose";
import serverless from "serverless-http";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ================= DB CONNECTION (CACHED) =================
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = db.connections[0].readyState;
  console.log("✅ MongoDB connected");
};

// ================= SCHEMAS =================
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  desc: String,
  image: String,
  type: { type: String, default: "general" },
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

// ================= AUTH (FIXED) =================
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth === `Bearer ${ADMIN_PASSWORD}`) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
};

// ================= ROUTES =================

// Login
app.post("/api/login", async (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_PASSWORD });
  }

  return res.status(401).json({ error: "Invalid password" });
});

// Get events
app.get("/api/events", async (req, res) => {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Create event
app.post("/api/events", authenticate, async (req, res) => {
  try {
    await connectDB();
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: "Failed to create event" });
  }
});

// Delete event
app.delete("/api/events/:id", authenticate, async (req, res) => {
  try {
    await connectDB();
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(400).json({ error: "Delete failed" });
  }
});

// ================= EXPORT =================
export const handler = serverless(app);
export default handler;
