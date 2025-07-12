import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";


export default function Beranda() {
    const courses = [
        {
            id: 1,
            image: "./images/kelas/kelas1.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar1.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 2,
            image: "./images/kelas/kelas2.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar2.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 3,
            image: "./images/kelas/kelas3.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar3.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 4,
            image: "./images/kelas/kelas4.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar4.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 5,
            image: "./images/kelas/kelas5.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar5.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 6,
            image: "./images/kelas/kelas6.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar6.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 7,
            image: "./images/kelas/kelas7.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar7.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 8,
            image: "./images/kelas/kelas8.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar8.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating: "3.5",
            price: "Rp. 300K"
        },
        {
            id: 9,
            image: "./images/kelas/kelas9.png",
            title: "Big 4 Auditor Financial Analyst",
            avatar: "./images/avatar/avatar9.png",
            name: "Jenna Ortega",
            role: "Senior Accountant di Gojek",
            rating      : "3.5",
            price: "Rp. 300K"
        }
    ]
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
                <div className="course-grid">
                    {courses.map((course) => (
                        <CourseCard key={course.id} {...course}/>
                    ))}
                </div>
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