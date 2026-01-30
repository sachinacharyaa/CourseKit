import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userSignin } from '../services/api';
import './Auth.css';

const UserSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await userSignin({ email, password });
            if (response.data.token) {
                login(response.data.token, 'user');
                navigate('/courses');
            } else {
                setError(response.data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Signin error:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Something went wrong. Please check if the server is running.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page auth-split">
            {/* Left Side - Form */}
            <div className="auth-form-section">
                <div className="auth-form-container">
                    {/* Logo */}
                    <Link to="/" className="auth-logo">
                        <span>CourseKit</span>
                    </Link>

                    {/* Form Content */}
                    <div className="auth-content">
                        <div className="auth-header">
                            <h1>Welcome back to your learning journey</h1>
                            <p>Sign in to continue where you left off</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && <div className="auth-error">{error}</div>}

                            <div className="input-group">
                                <input
                                    type="email"
                                    id="email"
                                    className="input"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    id="password"
                                    className="input"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                                {loading ? <span className="spinner"></span> : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </p>
                            <p className="auth-admin-link">
                                <Link to="/admin/signin">Sign in as Admin</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="auth-image-section">
                <div className="auth-image-wrapper">
                    <img 
                        src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Welcome back"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserSignin;
