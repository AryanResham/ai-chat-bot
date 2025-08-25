import express from 'express';
import 'dotenv/config';
import connectDB from './connection.js';
import userRoutes from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';


connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})


