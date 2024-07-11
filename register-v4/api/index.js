import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API is working!',
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
