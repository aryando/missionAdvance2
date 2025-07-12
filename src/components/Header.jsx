import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const isBeranda = location.pathname === "/Beranda";
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navigate("/login");
    }

    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }
    return (
        <header className="Header">
            <div className="logo-container">
                <img src="../images/static/Logo.png" alt="Logo" className="Logo" />
            </div>
            <div className="nav-links">
                <button
                    className="category"
                    type="button"
                    onClick={() => navigate("/kategori")}
                >
                    <h4>Kategori</h4>
                </button>
                {!user && (
                    <>
                    <button
                        className="login"
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        <h4>Login</h4>
                    </button>
                    <button
                        className="register"
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        <h4>Register</h4>
                    </button>    
                    </>
                )}
                
            </div>
            {isBeranda && user && (
                <div className="user-menu">
                    <button
                        className="avatar-wrapper"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setDropdownOpen(!dropdownOpen);
                            }
                        }}
                        tabIndex={0}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                    >
                        <img
                            src="/images/user.png"
                            alt="user"
                            className="user-image"
                        />
                    </button>

                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => navigate("/Profil")}>Profil</button>
                                <button onClick={() => alert("Fitur belum tersedia")}>Ganti Password</button>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                        

                </div>
            )}
        </header>
    )
}