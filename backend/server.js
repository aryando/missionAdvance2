import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courses.js';
import userRoutes from './routes/user.js';
import bodyParser from 'body-parser';
import './database.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send('API sedang berjalan...');
});



const port = process.env.PORT || 5000;;
app.listen(port, () => {
    console.log('server berjalan di port ${PORT}');
});