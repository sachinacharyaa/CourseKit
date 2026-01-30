import { useState, useEffect } from 'react';
import { getUserPurchases } from '../services/api';
import CourseCard from '../components/CourseCard';
import './MyCourses.css';

const MyCourses = () => {
    const [purchases, setPurchases] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const response = await getUserPurchases();
            setPurchases(response.data.purchases || []);
            setCourses(response.data.coursesData || []);
        } catch (err) {
            console.error('Error fetching purchases:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="my-courses-loading">
                <div className="spinner"></div>
                <p>Loading your courses...</p>
            </div>
        );
    }

    return (
        <div className="my-courses-page">
            <div className="container">
                <div className="my-courses-header fade-in">
                    <h1>My <em>Learning Journey</em></h1>
                    <p>Your purchased courses are ready to explore</p>
                </div>

                {purchases.length === 0 ? (
                    <div className="my-courses-empty fade-in">
                        <span className="empty-icon">🎓</span>
                        <h2>No courses yet</h2>
                        <p>Start your learning journey by purchasing a course!</p>
                        <a href="/courses" className="btn btn-primary">Browse Courses</a>
                    </div>
                ) : (
                    <div className="my-courses-grid grid grid-3 fade-in">
                        {courses.map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                isPurchased={true}
                            />
                        ))}
                    </div>
                )}

                {purchases.length > 0 && courses.length === 0 && (
                    <div className="my-courses-info fade-in">
                        <p>You have {purchases.length} course(s) purchased. Loading course details...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
