import db from '../database.js';

export const getCourses = (req, res) => {
    const { search, sortBy, role, order } = req.query;

    let sql = 'SELECT * FROM courses WHERE 1=1';
    let params = [];
    
    if (search) {
        sql += " AND (title LIKE ? OR name LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
    }

    if (role) {
        sql += " AND role = ?";
        params.push(role);
    }
    if (sortBy) {
        const orderBy = order === "desc" ? "DESC" : "ASC";
        sql += ` ORDER BY ${sortBy} ${orderBy}`;
    }
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Gagal mengambil data', err });
        }
        res.json(results);
    });
};

export const getCourseById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM courses WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        res.json(results[0]);
    });
};

export const createCourse = (req, res) => {
    try {
        const { title, name, role, price, avatar, rating } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!title || !name || !role || !price || !avatar || !rating) {
            return res.status(400).json({ error: 'Data course tidak lengkap'});
        }
        const sql = 'INSERT INTO courses (title, name, role, price, avatar, rating, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [title, name, role, price, avatar, rating, image], (err, result) => {
                if (err) {
                    console.error('Gagal menambahkan course:', err);
                    return res.status(500).json({ error: "Gagal menambahkan kursus" });
                }
                res.status(201).json({
                    message: 'Kursus berhasil ditambahkan',
                    id: result.insertId,
                    image
                });
            }
        );
    } catch (error) {
        console.error('Error createCourse:', error)
        res.status(500).json({ error: "Terjadi kesalahan pada server", details: error.message });
    }
};

export const updateCourse = (req, res) => {
    const { id } = req.params;
    const { title, name, role, price, avatar, rating } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = image
        ? 'UPDATE courses SET title=?, name=?, role=?, price=?, avatar=?, rating=?, image=? WHERE id=?'
        : 'UPDATE courses SET title=?, name=?, role=?, price=?, avatar=?, rating=? WHERE id=?';

    const params = image
        ? [title, name, role, price, avatar, rating, image, id]
        : [title, name, role, price, avatar, rating, id];

    db.query(sql, params, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'kursus berhasil diperbarui' });
        }
    );
};

export const deleteCourse = (req, res) => {
    const {id } = req.params;
    db.query('DELETE FROM courses WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Kursus berhasil dihapus' });
    });
};