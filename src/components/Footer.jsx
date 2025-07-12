
export default function Footer() {
    return (
         <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="../images/static/Logo.png" alt="Logo" className="logo-footer"/>
                </div>
                    <div className="footer-text">
                        <h6>Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</h6>
                        <p>Jl. Usman effendi No.50 Lowokwaru, Malang</p>
                        <p>+62-877-7123-1234</p>
                    </div>
            </div>
            <div className="links">
                <div className="product">
                    <h5>Kategori</h5>
                    <ul>
                        <li><button type="button" className="product-link">Digital & Teknologi</button></li>
                        <li><button type="button" className="product-link">Pemasaran</button></li>
                        <li><button type="button" className="product-link">Manajemen Bisnis</button></li>
                        <li><button type="button" className="product-link">Pengembangan Diri</button></li>
                        <li><button type="button" className="product-link">Desain</button></li>
                    </ul>
                </div>
                <div className="company">
                    <h5>Perusahaan</h5>
                    <ul>
                        <li><button type="button" className="company-link">Tentang Kami</button></li>
                        <li><button type="button" className="company-link">FAQ</button></li>
                        <li><button type="button" className="company-link">Ketentuan Layanan</button></li>
                        <li><button type="button" className="company-link">Bantuan</button></li>
                    </ul>
                </div>
                <div className="comunity">
                    <h5>Komunitas</h5>
                    <ul>
                        <li><button type="button" className="comunity-link">Tips Sukses</button></li>
                        <li><button type="button" className="comunity-link">Blog</button></li>
                    </ul>
                </div>
            </div>
            <div className="social-media">
                <button type="button" className="btn-sc"><i className="fa-brands fa-linkedin-in"></i></button>
                <button type="button" className="btn-sc"><i className="fa-brands fa-facebook-f"></i></button>
                <button type="button" className="btn-sc"><i className="fa-brands fa-instagram"></i></button>
                <button type="button" className="btn-sc"><i className="fa-brands fa-twitter"></i></button>
            </div>
            <p className="copyright">©2023 Gerobak Sayur All rights reserved.</p>  
        </footer>
    )
}