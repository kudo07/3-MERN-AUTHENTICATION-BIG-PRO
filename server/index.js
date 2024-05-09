import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectMongoDB from './db/connectMongoDB.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();
import path from 'path';

//
const __dirname = path.resolve();
// dynamic directory name
// call
const app = express();
// define the static folder for the build in production
// create our static path
app.use(express.static(path.join(__dirname, '/client/dist')));
// find this directory and send it to this file
// in vite dist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
// any place or any thing inside the client side

// any
//
const PORT = process.env.PORT || 3000;
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// example
app.get('/', (req, res) => {
  res.send('server is ready and running backend in index.js');
});
//routes

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.messsage || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// server
app.listen(3000, () => {
  console.log(`server is running in ${PORT}!`);
  connectMongoDB();
});
