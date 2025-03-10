/* eslint-disable no-undef */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();
const connectDB = require("./config/db");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/" ).html("HI");

app.use("/api/questions", questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// PS D:\TestPlatform\backend> netstat -ano | findstr :5000
// >> 
//   TCP    0.0.0.0:5000           0.0.0.0:0              LISTENING       25512
//   TCP    [::]:5000              [::]:0                 LISTENING       25512
// PS D:\TestPlatform\backend> netstat -ano | findstr :5000
// taskkill /PID 23996 /F

// SUCCESS: The process with PID 25512 has been terminated.
// PS D:\TestPlatform\backend> npm start