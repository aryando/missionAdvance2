import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database:', err);
    } else {
        console.log('Berhasil terhubung ke database');
    }
});

export default db;