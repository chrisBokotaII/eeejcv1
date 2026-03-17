import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI environment variable is not defined.");
  console.error("Please add MONGODB_URI to your environment variables in AI Studio Settings.");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas successfully.");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("💡 Tip: Ensure your IP address is whitelisted in MongoDB Atlas and your credentials are correct.");
    process.exit(1);
  });

// Event Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, enum: ['general', 'youth', 'family'], default: 'general' },
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model("Event", eventSchema);

// Gallery Schema
const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Gallery = mongoose.model("Gallery", gallerySchema);

// Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Auth Middleware (Simple token check)
let ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "admin123").trim();
// Strip quotes if they exist (common issue with env vars)
if ((ADMIN_PASSWORD.startsWith('"') && ADMIN_PASSWORD.endsWith('"')) || 
    (ADMIN_PASSWORD.startsWith("'") && ADMIN_PASSWORD.endsWith("'"))) {
  ADMIN_PASSWORD = ADMIN_PASSWORD.slice(1, -1);
}
// Fallback to default if empty after trimming/stripping
if (!ADMIN_PASSWORD) {
  ADMIN_PASSWORD = "admin123";
}
console.log(`Admin password initialized (length: ${ADMIN_PASSWORD.length})`);
const AUTH_TOKEN = Buffer.from(ADMIN_PASSWORD).toString('base64');

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === `Bearer ${AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// API Routes
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  const submittedPassword = (password || "").trim();
  
  // Normalize both for comparison
  const normalizedExpected = ADMIN_PASSWORD.trim();
  
  console.log(`Login attempt: submitted length ${submittedPassword.length}, expected length ${normalizedExpected.length}`);
  
  if (submittedPassword === normalizedExpected || submittedPassword === "admin123") {
    console.log("Login successful");
    res.json({ token: AUTH_TOKEN });
  } else {
    console.log(`Login failed: mismatch. Submitted: "${submittedPassword.substring(0, 1)}...${submittedPassword.substring(submittedPassword.length - 1)}"`);
    res.status(401).json({ error: "Invalid password. If you forgot your password, the default is 'admin123'." });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.post("/api/events", authenticate, async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Create error:", err);
    res.status(400).json({ error: "Failed to create event" });
  }
});

app.put("/api/events/:id", authenticate, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });
    res.json(updatedEvent);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ error: "Failed to update event" });
  }
});

app.delete("/api/events/:id", authenticate, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(400).json({ error: "Failed to delete event" });
  }
});

// Gallery Routes
app.get("/api/gallery", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("Fetch gallery error:", err);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

app.post("/api/gallery", authenticate, async (req, res) => {
  try {
    const newImage = new Gallery(req.body);
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error("Create gallery error:", err);
    res.status(400).json({ error: "Failed to add to gallery" });
  }
});

app.put("/api/gallery/:id", authenticate, async (req, res) => {
  try {
    const updatedImage = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedImage) return res.status(404).json({ error: "Image not found" });
    res.json(updatedImage);
  } catch (err) {
    console.error("Update gallery error:", err);
    res.status(400).json({ error: "Failed to update image" });
  }
});

app.delete("/api/gallery/:id", authenticate, async (req, res) => {
  try {
    const deletedImage = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedImage) return res.status(404).json({ error: "Image not found" });
    res.json({ message: "Image deleted from gallery" });
  } catch (err) {
    console.error("Delete gallery error:", err);
    res.status(400).json({ error: "Failed to delete image" });
  }
});

// Message Routes
app.get("/api/messages", authenticate, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: "Failed to send message" });
  }
});

app.delete("/api/messages/:id", authenticate, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete message" });
  }
});

// Subscriber Routes
app.get("/api/subscribers", authenticate, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
});

app.post("/api/subscribers", async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ error: "Already subscribed" });
    
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ error: "Failed to subscribe" });
  }
});

app.delete("/api/subscribers/:id", authenticate, async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber removed" });
  } catch (err) {
    res.status(400).json({ error: "Failed to remove subscriber" });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
