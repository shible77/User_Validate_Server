"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(cors({
    origin: 'http://localhost:5173', // Front-end URL
    credentials: true, // Allow sending cookies
}));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({ error: 'Invalid Request Body', message: err.message });
    }
    next(err); // Pass other errors to the default error handler
});
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userValidateRoutes_1 = __importDefault(require("./routes/userValidateRoutes"));
app.use('/api', userRoutes_1.default);
app.use('/api/validate', userValidateRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
