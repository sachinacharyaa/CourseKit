import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminSignin } from '../services/api';
import './Auth.css';

const AdminSignin = () => {
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
            const response = await adminSignin({ email, password });
            if (response.data.token) {
                login(response.data.token, 'admin');
                navigate('/admin/dashboard');
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
        <div className="auth-page admin-auth">
            <div className="auth-container">
                <div className="auth-card card fade-in">
                    <div className="auth-header">
                        <span className="auth-badge badge badge-primary">Admin Portal</span>
                        <h1>Admin Sign In</h1>
                        <p>Access your creator dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && <div className="auth-error">{error}</div>}

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="input"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                            {loading ? <span className="spinner"></span> : 'Sign In as Admin'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an admin account? <Link to="/admin/signup">Register</Link>
                        </p>
                        <p className="auth-admin-link">
                            <Link to="/signin">Sign in as User</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignin;
