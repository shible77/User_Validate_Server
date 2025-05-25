const express = require('express')
import { Request, Response, NextFunction } from 'express';
const app = express()
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')
const cors = require('cors');
import dotenv  from 'dotenv';
dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173', // Front-end URL
  credentials: true,               // Allow sending cookies
}));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((err: SyntaxError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid Request Body', message: err.message });
  }
  next(err); // Pass other errors to the default error handler
});

import userRouter from './routes/userRoutes';
import userValidateRouter from './routes/userValidateRoutes';
app.use('/api', userRouter);
app.use('/api/validate', userValidateRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
