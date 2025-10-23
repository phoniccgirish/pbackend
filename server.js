import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();
// Render sets the PORT environment variable automatically. Use that.
const PORT = process.env.PORT || 3000;

// --- FIX: Remove specific corsOptions ---
// This allows requests from ANY origin (like localhost AND your Vercel site)
app.use(cors());
// --- End of Fix ---

app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", apiRoutes);

// Start server
app.listen(PORT, () => {
  // Use 0.0.0.0 to listen on all available network interfaces, required by Render
  console.log(`Server running on port ${PORT}`);
});

// Optional: Add a basic root route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
