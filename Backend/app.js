const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
const captainRoutes = require('./routes/captain.routes');
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Use Routes
app.use('/user', userRoutes);
app.use('/captains', captainRoutes);
module.exports = app;