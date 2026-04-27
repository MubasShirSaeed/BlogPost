import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js';
import postRoutes from './routes/posts.js';

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/auth', authRoutes);
app.use('/', postRoutes);

connectDB();
app.listen(port, ()=> console.log(`sever i running on port ${port}`))
