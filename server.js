// Server-side: Node.js with Express
// File: server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// In-memory database (for simplicity)
const posts = [];

// Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', upload.single('media'), (req, res) => {
  const { title, content } = req.body;
  const media = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = { id: posts.length + 1, title, content, media };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
