import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, BookOpen, Users, Award, Target, Lightbulb, Sparkles } from 'lucide-react';
import './Landing.css';

const Landing = () => {
    const { isAuthenticated, isUser, isAdmin } = useAuth();

    return (
        <div className="landing">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-container">
                    <div className="hero-content fade-in">
                        <span className="badge badge-primary">
                            <Rocket size={16} /> Learn from the best
                        </span>
                        <h1 className="hero-title">
                            Master New Skills with
                            <span className="gradient-text"> Premium Courses</span>
                        </h1>
                        <p className="hero-description">
                            Unlock your potential with expert-led courses. From programming to design,
                            we've got everything you need to level up your career.
                        </p>
                        <div className="hero-buttons">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/signup" className="btn btn-primary btn-lg">
                                        Start Learning Free
                                    </Link>
                                    <Link to="/signin" className="btn btn-secondary btn-lg">
                                        Sign In
                                    </Link>
                                </>
                            ) : isUser ? (
                                <Link to="/courses" className="btn btn-primary btn-lg">
                                    Browse Courses
                                </Link>
                            ) : (
                                <Link to="/admin/dashboard" className="btn btn-primary btn-lg">
                                    Go to Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hero-visual fade-in">
                        <div className="hero-card card">
                            <div className="hero-card-icon">
                                <BookOpen size={40} className="text-accent" />
                            </div>
                            <h3>1000+ Courses</h3>
                            <p>Learn anything you want</p>
                        </div>
                        <div className="hero-card card">
                            <div className="hero-card-icon">
                                <Users size={40} className="text-accent" />
                            </div>
                            <h3>Expert Instructors</h3>
                            <p>Learn from industry leaders</p>
                        </div>
                        <div className="hero-card card">
                            <div className="hero-card-icon">
                                <Award size={40} className="text-accent" />
                            </div>
                            <h3>Certifications</h3>
                            <p>Get certified skills</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title">Why Choose <span className="gradient-text">CourseKit?</span></h2>
                    <div className="features-grid grid grid-3">
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <Target size={48} className="text-primary" />
                            </div>
                            <h3>Learn at Your Pace</h3>
                            <p>Access courses anytime, anywhere. Learn on your schedule with lifetime access.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <Lightbulb size={48} className="text-primary" />
                            </div>
                            <h3>Practical Projects</h3>
                            <p>Build real-world projects to apply what you learn and showcase your skills.</p>
                        </div>
                        <div className="feature-card card">
                            <div className="feature-icon">
                                <Sparkles size={48} className="text-primary" />
                            </div>
                            <h3>Quality Content</h3>
                            <p>Hand-picked courses from verified instructors with proven track records.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container cta-container">
                    <div className="cta-content">
                        <h2>Ready to Start Your Learning Journey?</h2>
                        <p>Join thousands of learners already growing their skills with CourseKit.</p>
                        {!isAuthenticated && (
                            <Link to="/signup" className="btn btn-primary btn-lg">
                                Get Started for Free
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
