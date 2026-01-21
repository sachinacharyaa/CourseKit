import { useState, useEffect } from 'react';
import { getCourses, purchaseCourse, getUserPurchases } from '../services/api';
import CourseCard from '../components/CourseCard';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [purchasedIds, setPurchasedIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [coursesRes, purchasesRes] = await Promise.all([
                getCourses(),
                getUserPurchases()
            ]);
            setCourses(coursesRes.data.courses || []);
            const purchasedCourseIds = (purchasesRes.data.purchases || []).map(p => p.courseId);
            setPurchasedIds(purchasedCourseIds);
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (courseId) => {
        setPurchasing(courseId);
        try {
            await purchaseCourse(courseId);
            setPurchasedIds([...purchasedIds, courseId]);
            showToast('Course purchased successfully!', 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Purchase failed', 'error');
        } finally {
            setPurchasing(null);
        }
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    if (loading) {
        return (
            <div className="courses-loading">
                <div className="spinner"></div>
                <p>Loading courses...</p>
            </div>
        );
    }

    return (
        <div className="courses-page">
            <div className="container">
                <div className="courses-header fade-in">
                    <h1>Explore <span className="gradient-text">Courses</span></h1>
                    <p>Discover amazing courses from expert instructors</p>
                </div>

                {courses.length === 0 ? (
                    <div className="courses-empty fade-in">
                        <span className="empty-icon">📚</span>
                        <h2>No courses available</h2>
                        <p>Check back later for new courses!</p>
                    </div>
                ) : (
                    <div className="courses-grid grid grid-3 fade-in">
                        {courses.map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                onPurchase={handlePurchase}
                                isPurchased={purchasedIds.includes(course._id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default Courses;
