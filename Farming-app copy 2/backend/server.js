// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./db');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Fix CORS properly
app.use(cors({
  origin: "http://localhost:5173",  // allow your React app
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


connectDb();


app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.send("Backend running successfully");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
