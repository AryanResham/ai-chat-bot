import express from 'express';
import 'dotenv/config';

import cookieParser from 'cookie-parser';

import connectDB from './connection.js';

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

connectDB();
const app = express();
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})


