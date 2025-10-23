import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix for ES Modules (__dirname not defined)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// ✅ Serve frontend build files
app.use(express.static(path.join(__dirname, "../pclient/dist")));

// ✅ Catch-all — send index.html for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../pclient/dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
