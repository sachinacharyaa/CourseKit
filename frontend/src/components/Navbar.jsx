import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, isUser, isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">CourseKit</span>
                </Link>

                {/* Center Navigation */}
                <div className="navbar-center">
                    {!isAuthenticated && (
                        <>
                            <div className="nav-item has-dropdown">
                                <span className="nav-link">
                                    Products <ChevronDown size={16} />
                                </span>
                            </div>
                            <div className="nav-item has-dropdown">
                                <span className="nav-link">
                                    Resources <ChevronDown size={16} />
                                </span>
                            </div>
                            <Link to="/courses" className="nav-link">Courses</Link>
                        </>
                    )}
                    
                    {isUser && (
                        <>
                            <Link to="/courses" className="nav-link">Browse Courses</Link>
                            <Link to="/my-courses" className="nav-link">My Learning</Link>
                        </>
                    )}

                    {isAdmin && (
                        <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
                    )}
                </div>

                {/* Right Side Actions */}
                <div className="navbar-actions">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/signin" className="nav-link login-link">Login</Link>
                            <Link to="/signup" className="btn btn-outline btn-sm">Sign Up</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="btn btn-outline btn-sm">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
