import { Image } from 'lucide-react';
import './CourseCard.css';

const CourseCard = ({ course, onPurchase, isPurchased, showActions, onEdit, onDelete }) => {
    return (
        <div className="course-card card">
            <div className="course-image">
                {course.imageURL ? (
                    <img src={course.imageURL} alt={course.title} />
                ) : (
                    <div className="course-placeholder">
                        <Image size={48} strokeWidth={1.5} className="text-muted" />
                    </div>
                )}
            </div>
            <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-footer">
                    <span className="course-price">${course.price}</span>
                    {isPurchased ? (
                        <span className="badge badge-success">Purchased</span>
                    ) : showActions ? (
                        <div className="course-actions">
                            <button onClick={() => onEdit(course)} className="btn btn-secondary btn-sm">Edit</button>
                            <button onClick={() => onDelete(course._id)} className="btn btn-ghost btn-sm">Delete</button>
                        </div>
                    ) : (
                        <button onClick={() => onPurchase(course._id)} className="btn btn-primary btn-sm">
                            Buy Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
