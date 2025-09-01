import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import connectDB from './config/mongodb.js';
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// // const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.VITE_FRONTEND_URL, credentials: true }));

// app.use(cors({origin:'http://localhost:5173', credentials: true }));
// app.use(cors({origin:allowedOrigins, credentials: true }));

// API Endpoints
// app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.use(express.static(join(__dirname, "../client/dist")));

app.get(/.*/, (_, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => console.log(`Server started on PORT:${port}`));