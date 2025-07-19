import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListView from "../components/ListView";


export default function Beranda() {
   
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.courses);


    return (
        <>
        <Header  />
        <main>
            <section className="hero-section">
                <h1>Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Interaktif!</h1>
                <p>Temukan ilmu baru yang menarik dan mendalam melalui koleksi vidio pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman anda.</p>
                <button type="button" className="btn-cta">Temukan Video Course untuk Dipelajari!</button> 
            </section>
            <section className="courses">
                <h3>Koleksi Video Pembelajaaran Unggulan</h3>
                <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                <nav className="category-menu">
                    <button type="button" className="category-link">Semua Kelas</button>
                    <button type="button" className="category-link">Pemasaran</button>
                    <button type="button" className="category-link">Desain</button>
                    <button type="button" className="category-link">Pengembangan Diri</button>
                    <button type="button" className="category-link">Bisnis</button>
                </nav>
                <ListView />
            </section>
        <section className="news-letter">
            <h5>NEWSLETTER</h5>
            <h3>Mau Belajar Lebih Banyak?</h3>
            <p>daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id</p>
            <form className="subscribe">
                <input type="email" placeholder="Masukkan Emailmu" required />
                <button type="submit" className="btn">Subscribe</button>
            </form>
        </section>
        </main>
        <Footer />
        </>
    )
}