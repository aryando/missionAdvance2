import db from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (req, res) => {
    const { name, email, jenis_kelamin, no_hp, kata_sandi } = req.body;
    if (!name || !email || !kata_sandi) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    if (kata_sandi.length < 6) {
        return res.status(400).json({ message: 'Password harus minimal 6 karakter' });
    }
    try {
        const hashedPassword = await bcrypt.hash(kata_sandi, 10);
    
        db.query('INSERT INTO users (name, email, jenis_kelamin,no_hp, kata_sandi) VALUES (?, ?, ?, ?, ?)',
            [name, email, jenis_kelamin, no_hp, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error("Error saat insert:", err);
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ 
                    message: 'User berhasil dibuat', userId: results.insertId,
                    name, email,
                });
            }
        )
    } catch (error) {
        console.error("Error saat hashing password:", error);
        return res.status(500).json({ message: 'Gagal membuat user' });
    }
}

export const getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

export const loginUser = (req, res) => {
    const { email, kata_sandi } = req.body;
    if (!email || !kata_sandi) {
        return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
        return res.status(401).json({ message: 'Email tidak ditemukan' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(kata_sandi, user.kata_sandi);

        if (!isMatch) {
            return res.status(401).json({ message: 'Kata sandi salah' });
        }
        const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES }
        );
        res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email
            }
        })
    });
};

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid' });
        req.user = decoded;
        next();
    });
};