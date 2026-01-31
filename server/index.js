const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env variables
dotenv.config();

// Import DB connection
const connectDB = require("./src/config/db");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// app.post("/ping", (req, res) => {
//   res.json({
//     message: "pong",
//     body: req.body,
//   });
// });


// 🔹 Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/tasks", require("./src/routes/taskRoutes"));

// 🔹 404 handler (so we SEE errors instead of hanging)
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Server start
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
