import db from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailer.js';

dotenv.config();

export const registerUser = async (req, res) => {
    const { name, email, jenis_kelamin, no_hp, kata_sandi } = req.body;
    if (!name || !email || !kata_sandi) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }
    if (kata_sandi.length < 6) {
        return res.status(400).json({ message: 'Password harus minimal 6 karakter' });
    }
    try {
        const { name, email, jenis_kelamin, no_hp, kata_sandi } = req.body;
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
            if (err) {
                console.error('Error saat cek email:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'Email sudah terdaftar' });
            }
        })
        const hashedPassword = await bcrypt.hash(kata_sandi, 10);
        const verification_token = uuidv4();
    
        db.query('INSERT INTO users (name, email, jenis_kelamin,no_hp, kata_sandi, verification_token, is_verified) VALUES (?, ?, ?, ?, ?, ?, 0)',
            [name, email, jenis_kelamin, no_hp, hashedPassword, verification_token],
            (err) => {
                if (err) {
                    console.error("Error register:", err);
                    return res.status(500).json({ message: 'Gagal mendaftarkan user' });
                }
                const verifyLink = `${process.env.CLIENT_URL}/verify/${verification_token}`;

                const mailOptions = {
                    from: 'no-reply@demomailtrap.co',
                    to: email,
                    subject: 'Verifikasi Email Anda',
                    html: `<p>Halo ${name},</p>
                            <p>Silakan klik Link berikut untuk memverifikasi email Anda:</p>
                            <a href="${verifyLink}">${verifyLink}</a>`,
                    };
                
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.error('Error saat mengirim email:', err);
                                return res.status(500).json({ message: 'Gagal mengirim email verifikasi' });
                        }
                        res.status(201).json({ message: 'Registrasi berhasil, cek email Anda untuk verifikasi.'});
                    });
                });
            } catch (error) {
                console.error('Gagal registrasi user', error);
                res.status(500).json({ message: 'Terjadi kesalahan pada saat registrasi' });
            }
}

export const verifyUser = (req, res) => {
    const { token } = req.params;

    const sql = "UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?";
    db.query(sql, [token], (err, result) => {
        if (err) {
            console.error('Error saat verifikasi:', err);
            return res.status(500).json({ message: 'Gagal memverifikasi akun'});
        }
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Token tidak valid atau sudah digunakan.'});
        }
        res.status(200).json({ message: ' Akun berhasil diverifikasi! Silakan login.' });
    });
};

export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const [result] = await db.query(
            'UPDATE users SET is_verified = 1 WHERE verification_token = ?',
            [token]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Token tidak valid atau sudah digunakan.' });
        }
        res.json({ message: 'Email berhasil diverifikasi!' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server'});
    }
};

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

        if (!user.is_verified) {
            return res.status(401).json({ message: 'Email belum diverifikasi, silakan cek email Anda.' });
        }
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