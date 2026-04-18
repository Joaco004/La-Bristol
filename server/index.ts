import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { initCloudinary } from './config/cloudinary.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import playerRoutes from './routes/players.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/players', playerRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const start = async (): Promise<void> => {
  await connectDB();
  initCloudinary();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};

start().catch(console.error);
