import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function GuestRoute({ children }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    return !isLoggedIn ? children : <Navigate to="/beranda" />;
}

GuestRoute.propTypes = {
    children: PropTypes.node.isRequired,
};