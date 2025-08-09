import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courses.js';
import './database.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send('API sedang berjalan...');
});


app.use('/courses', courseRoutes);

const port = process.env.PORT || 5000;;
app.listen(port, () => {
    console.log('server berjalan di port ${PORT}');
});