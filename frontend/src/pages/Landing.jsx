import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    BookOpen, 
    ChevronDown, 
    Play, 
    Users, 
    Globe, 
    DollarSign,
    Upload,
    Video,
    FileText,
    CheckCircle2,
    Zap,
    Shield,
    BarChart3
} from 'lucide-react';
import './Landing.css';

const Landing = () => {
    const { isAuthenticated, isUser, isAdmin } = useAuth();
    const [activeAccordion, setActiveAccordion] = useState(0);

    const stats = [
        { value: '200,000+', label: 'Creators Worldwide' },
        { value: '$1.5 Billion+', label: 'Creator Revenue' },
        { value: '5 Million+', label: 'Learners Enrolled' },
        { value: '150+', label: 'Countries Served' },
    ];

    const features = [
        {
            title: 'Choose Your Course Format',
            description: 'Start with how you want to teach. Design courses that fit your teaching style and audience — not rigid templates.',
            bullets: [
                'Self-paced, cohort-based, hybrid, or live-supported courses',
                'Set learning outcomes, duration, and structure upfront',
                'Flexible module and lesson organization'
            ]
        },
        {
            title: 'Upload Any Content Type',
            description: 'Support for videos, PDFs, quizzes, assignments, and more. Create rich learning experiences.',
            bullets: [
                'HD video hosting with adaptive streaming',
                'Interactive quizzes and assessments',
                'Downloadable resources and certificates'
            ]
        },
        {
            title: 'Engage Your Learners',
            description: 'Built-in tools to keep students motivated and coming back for more.',
            bullets: [
                'Discussion forums and community features',
                'Progress tracking and completion certificates',
                'Email notifications and reminders'
            ]
        }
    ];

    return (
        <div className="landing">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    {/* Badge */}
                    <div className="hero-badge">
                        <BookOpen size={16} className="badge-icon" />
                        <span>Online Courses</span>
                    </div>

                    {/* Headline */}
                    <h1 className="hero-title">
                        Create Online Courses That
                        <br />
                        <em>Teach Better and Scale Faster</em>
                    </h1>

                    {/* Description */}
                    <p className="hero-description">
                        CourseKit is an all-in-one platform for coaches, creators, and educators to create 
                        online courses, price them flexibly, sell globally, and scale with ease.
                    </p>

                    {/* Stats */}
                    <div className="hero-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-buttons">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/signup" className="btn btn-primary btn-lg">
                                    Start Your Free Trial
                                </Link>
                                <Link to="/signin" className="btn btn-secondary btn-lg">
                                    Book A Demo
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
            </section>

            {/* Features Section - Create */}
            <section className="features-section">
                <div className="container">
                    {/* Section Badge */}
                    <div className="section-badge">
                        <span className="badge-dot"></span>
                        <span>CREATE</span>
                    </div>

                    {/* Section Title */}
                    <h2 className="section-title">
                        Create & Sell Courses
                        <br />
                        <span className="gradient-text-animated">Faster</span> and <span className="gradient-text-animated">Without Friction</span>
                    </h2>

                    <p className="section-description">
                        Turn your knowledge into structured, engaging courses. Start with an idea. 
                        CourseKit helps you turn it into a professional course experience without technical complexity.
                    </p>

                    {/* Features Layout */}
                    <div className="features-layout">
                        {/* Accordion */}
                        <div className="features-accordion">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className={`accordion-item ${activeAccordion === index ? 'active' : ''}`}
                                    onClick={() => setActiveAccordion(index)}
                                >
                                    <div className="accordion-header">
                                        <h3>{feature.title}</h3>
                                        <ChevronDown 
                                            size={20} 
                                            className={`accordion-icon ${activeAccordion === index ? 'rotated' : ''}`}
                                        />
                                    </div>
                                    {activeAccordion === index && (
                                        <div className="accordion-content">
                                            <p>{feature.description}</p>
                                            <ul className="feature-bullets">
                                                {feature.bullets.map((bullet, i) => (
                                                    <li key={i}>
                                                        <CheckCircle2 size={16} className="bullet-icon" />
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Visual */}
                        <div className="features-visual">
                            <div className="visual-card">
                                <div className="visual-blob"></div>
                                <div className="floating-icon icon-1">
                                    <FileText size={20} />
                                </div>
                                <div className="floating-icon icon-2">
                                    <Video size={20} />
                                </div>
                                <div className="floating-icon icon-3">
                                    <Upload size={20} />
                                </div>
                                <div className="upload-button">
                                    <Upload size={16} />
                                    <span>Upload</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="why-section">
                <div className="container">
                    <div className="section-badge">
                        <span className="badge-dot teal"></span>
                        <span>WHY COURSEKIT</span>
                    </div>

                    <h2 className="section-title">
                        Everything You Need to
                        <br />
                        <em>Succeed as a Creator</em>
                    </h2>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <Zap size={24} />
                            </div>
                            <h3>Lightning Fast Setup</h3>
                            <p>Go from idea to published course in minutes, not weeks. No technical skills required.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <Shield size={24} />
                            </div>
                            <h3>Secure & Reliable</h3>
                            <p>Enterprise-grade security with 99.9% uptime. Your content and data are always protected.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <BarChart3 size={24} />
                            </div>
                            <h3>Powerful Analytics</h3>
                            <p>Track student progress, engagement, and revenue with detailed dashboards.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <Globe size={24} />
                            </div>
                            <h3>Global Reach</h3>
                            <p>Accept payments in 100+ currencies. Reach students anywhere in the world.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Ready to Start Your Creator Journey?</h2>
                        <p>Join thousands of educators already growing their impact with CourseKit.</p>
                        {!isAuthenticated && (
                            <div className="cta-buttons">
                                <Link to="/signup" className="btn btn-primary btn-lg">
                                    Get Started for Free
                                </Link>
                                <Link to="/signin" className="btn btn-secondary btn-lg">
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
