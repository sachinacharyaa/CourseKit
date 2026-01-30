import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../services/api';
import './Auth.css';

const UserSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await userSignup(formData);
            if (response.data.message === 'User signed up successfully') {
                navigate('/signin');
            } else {
                setError(response.data.message || 'Signup failed');
            }
        } catch (err) {
            console.error('Signup error:', err);
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
                            <h1>AI first platform to help you monetize your business</h1>
                            <p>Create, organize and expand your online presence</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && <div className="auth-error">{error}</div>}

                            <div className="input-group">
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    className="input"
                                    placeholder="Enter Your Name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="input"
                                    placeholder="Enter Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="input"
                                    placeholder="Create a Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                                {loading ? <span className="spinner"></span> : 'Continue'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Already have an account? <Link to="/signin">Log in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="auth-image-section">
                <div className="auth-image-wrapper">
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                        alt="Students learning together"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserSignup;
