import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Library } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, isUser, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <Library className="logo-icon" size={28} strokeWidth={2.5} />
                    <span className="logo-text">CourseKit</span>
                </Link>

                <div className="navbar-links">
                    {!isAuthenticated && (
                        <>
                            <Link to="/signin" className="nav-link">Sign In</Link>
                            <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
                            <Link to="/admin/signin" className="nav-link admin-link">Admin</Link>
                        </>
                    )}

                    {isUser && (
                        <>
                            <Link to="/courses" className="nav-link">Browse Courses</Link>
                            <Link to="/my-courses" className="nav-link">My Courses</Link>
                            <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
