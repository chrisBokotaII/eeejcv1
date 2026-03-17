import express, { Request, Response, NextFunction } from "express";
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
    throw new Error("❌ MONGODB_URI is missing");
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = db.connections[0].readyState === 1;
  console.log("✅ MongoDB connected");
};

// ================= SCHEMAS =================

// Event
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: String,
  time: String,
  location: String,
  desc: String,
  image: String,
  type: { type: String, default: "general" },
  createdAt: { type: Date, default: Date.now },
});

const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

// Gallery
const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: String,
  createdAt: { type: Date, default: Date.now },
});

const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

// Message
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

// Subscriber
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscriber =
  mongoose.models.Subscriber ||
  mongoose.model("Subscriber", subscriberSchema);

// ================= AUTH =================
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change_me";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (auth === `Bearer ${ADMIN_PASSWORD}`) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
};

// ================= ROUTES =================

// Health check (debugging)
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

// Login
app.post("/api/login", (req: Request, res: Response) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_PASSWORD });
  }

  return res.status(401).json({ error: "Invalid password" });
});

// ================= EVENTS =================

// Get events
app.get("/api/events", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create event
app.post("/api/events", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update event
app.put("/api/events/:id", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete event
app.delete("/api/events/:id", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ================= GALLERY =================

app.get("/api/gallery", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/gallery", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    const image = await Gallery.create(req.body);
    res.status(201).json(image);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/gallery/:id", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ================= MESSAGES =================

app.get("/api/messages", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/messages", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const msg = await Message.create(req.body);
    res.status(201).json(msg);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/messages/:id", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ================= SUBSCRIBERS =================

app.get("/api/subscribers", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/subscribers", async (req: Request, res: Response) => {
  try {
    await connectDB();

    const { email } = req.body;

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Already subscribed" });
    }

    const sub = await Subscriber.create({ email });
    res.status(201).json(sub);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/subscribers/:id", authenticate, async (req: Request, res: Response) => {
  try {
    await connectDB();
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ================= EXPORT =================
export const handler = serverless(app);
export default handler;
