import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import Register from "./pages/Register";
import Profil from "./pages/Profil";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { Navigate } from "react-router-dom";


export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="beranda" replace />} />
                <Route 
                    path="/beranda"
                    element=
                                {<Beranda/>}
                />
                <Route 
                    path="/login" 
                    element={<GuestRoute>
                                <Login />
                            </GuestRoute>
                    }
                />
                <Route 
                    path="/register" 
                    element={<GuestRoute>
                                <Register />
                            </GuestRoute>
                    } 
                />
                <Route
                    path="/Profil"
                    element={<GuestRoute>
                                <Profil />
                            </GuestRoute>
                    }
                />
            </Routes>
        </Router>
    )
}