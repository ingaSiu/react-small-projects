import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js';
import dontenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';

dontenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
