
import "dotenv/config";

import express from "express";
import cors from "cors"; 
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000; 

const corsOptions = {
  origin: "http://localhost:5173", 
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOptions)); 


app.use(express.json()); 

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
