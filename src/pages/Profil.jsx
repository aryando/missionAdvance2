import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profil() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const curentUser = JSON.parse(localStorage.getItem("user"));
        if (!curentUser) {
            navigate("/Login");
            return;
        }
        api.get(`/users/${curentUser.id}`)
        .then(res => {
            const data = res.data;
            setUser(data);
            setName(data.name);
            setEmail(data.email);
            setPhone(data.no_hp);
        })
        .catch(err => {
            console.error("Gagal mengambil data pengguna:", err);
            navigate("/Login");
        })
        .finally(() => setLoading(false)); 
    }, [navigate]);

    const handleSave = () => {
        if (!user?.id) return; 
        
        api.put(`/users/${user.id}`, {name, email, no_hp: phone})
        .then (res => {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            alert("Profil berhasil diperbarui!")
            navigate("/Beranda");
        })
        .catch(err => {
            console.error("Gagal memperbarui profil:",err);
            alert("Gagal memperbarui profil!");
        })
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Header />
            <main className="profil-page">
                <h3>Ubah Profil</h3>
                <p> Ubah data diri Anda</p>
                <div className="profil-header">
                    <h4>Profil Saya</h4>
                    <h4>Kelas Saya</h4>
                    <h4>Pesanan saya</h4>
                </div>
                <div className="profil-card">
                    <img src="./images/user.png" alt="user" className="user-img" />
                    <h4>{user ? user.name : "nama"}</h4>
                    <p>{user ? user.email : "Email"}</p>
                    <label htmlFor="namaLengkap">Nama Lengkap</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
                    />
                    <label htmlFor="noHp">No.Hp</label>
                    <input
                        id="phone"
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Masukkan nomor Hp"
                    />
                    <button className="btn" onClick={handleSave}>Simpan</button>
                </div>
            </main>
            <Footer />
        </>
    )
}