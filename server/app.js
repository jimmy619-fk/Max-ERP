const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const shiftRoutes = require("./routes/shifts");
const employeeRoutes = require("./routes/employees");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/shifts", shiftRoutes);
app.use("/api/employees", employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
