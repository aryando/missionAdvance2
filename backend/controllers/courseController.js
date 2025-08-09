import db from '../database.js';

export const getCourses = (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
        if (err) return res.status(500).json({ error: err});
            res.json(results)
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
    const { title, name, role, price, image, avatar, rating } = req.body;
    db.query('INSERT INTO courses (title, name, role, price, image, avatar, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, name, role, price, image, avatar, rating],
        (err, results) => {
            res.json({ message: 'kursus berhasil ditambahkan', id: results.insertId });
        }
    );
};

export const updateCourse = (req, res) => {
    const { id } = req.params;
    const { title, name, role, price, image, avatar, rating } = req.body;
    db.query(
        'UPDATE courses SET title =?, name=?, role=?, price=?, iimage=?, avatar=?, rating=? WHERE id= ?',
        [title, name, role, price, image, avatar, rating, id],
        (err) => {
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