import { useState, useEffect } from 'react';
import { getAdminCourses, createCourse, deleteCourse, editCourse } from '../services/api';
import { LayoutDashboard, BookOpen, DollarSign, Plus, X } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        imageURL: '',
    });
    const [formLoading, setFormLoading] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await getAdminCourses();
            setCourses(response.data.courses || []);
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.name === 'price' ? Number(e.target.value) : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            if (editingCourse) {
                await editCourse({
                    courseId: editingCourse._id,
                    ...formData
                });
                showToast('Course updated successfully!', 'success');
            } else {
                await createCourse(formData);
                showToast('Course created successfully!', 'success');
            }
            setShowModal(false);
            resetForm();
            fetchCourses();
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to save course', 'error');
            console.error(err);
        } finally {
            setFormLoading(false);
        }
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            price: course.price,
            imageURL: course.imageURL || '', // Normalized
        });
        setShowModal(true);
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;

        try {
            await deleteCourse({ courseId });
            showToast('Course deleted successfully!', 'success');
            setCourses(courses.filter(c => c._id !== courseId));
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to delete course', 'error');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', price: '', imageURL: '' });
        setEditingCourse(null);
    };

    const openCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="container">
                <div className="dashboard-header fade-in">
                    <div className="dashboard-title">
                        <h1>Creator <em>Dashboard</em></h1>
                        <p>Manage your courses and track your growth</p>
                    </div>
                    <button onClick={openCreateModal} className="btn btn-primary">
                        <Plus size={18} /> Create Course
                    </button>
                </div>

                <div className="dashboard-stats fade-in">
                    <div className="stat-card card">
                        <div className="stat-icon text-accent">
                            <BookOpen size={32} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">{courses.length}</span>
                            <span className="stat-label">Total Courses</span>
                        </div>
                    </div>
                    <div className="stat-card card">
                        <div className="stat-icon text-success">
                            <DollarSign size={32} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">${courses.reduce((acc, c) => acc + (c.price || 0), 0)}</span>
                            <span className="stat-label">Total Value</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-section fade-in">
                    <h2>Your Courses</h2>
                    {courses.length === 0 ? (
                        <div className="dashboard-empty">
                            <div className="empty-icon text-muted" style={{ display: 'flex', justifyContent: 'center' }}>
                                <LayoutDashboard size={64} />
                            </div>
                            <h3>No courses yet</h3>
                            <p>Create your first course to get started!</p>
                            <button onClick={openCreateModal} className="btn btn-primary">
                                Create Your First Course
                            </button>
                        </div>
                    ) : (
                        <div className="dashboard-grid grid grid-3">
                            {courses.map((course) => (
                                <CourseCard
                                    key={course._id}
                                    course={course}
                                    showActions={true}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="input-group">
                                <label htmlFor="title">Course Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="input"
                                    placeholder="e.g., Complete React Course"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="input textarea"
                                    placeholder="Describe your course..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label htmlFor="price">Price ($)</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        className="input"
                                        placeholder="99"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="imageURL">Image URL</label>
                                    <input
                                        type="text"
                                        id="imageURL"
                                        name="imageURL"
                                        className="input"
                                        placeholder="Paste any image URL here"
                                        value={formData.imageURL}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                                    {formLoading ? <span className="spinner"></span> : (editingCourse ? 'Update Course' : 'Create Course')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
