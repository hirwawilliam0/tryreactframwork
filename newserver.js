const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Endpoint to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
