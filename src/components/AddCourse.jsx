import React, { useState } from "react";
import axios from "axios";

const AddCourse = () => {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [price, setPrice] = useState("");
    const [avatar, setAvatar] = useState("");
    const [rating, setRating] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('name', name);
        formData.append('role', role);
        formData.append('price', price);
        formData.append('avatar', avatar);
        formData.append('rating', rating);
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:5000/courses', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log('Course berhasil ditambahkan:', res.data);
        } catch (err) {
            console.error('Gagal menambahkan course:', err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            <input type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} /> 
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Tambah Course</button>
        </form>
    );
};

export default AddCourse;