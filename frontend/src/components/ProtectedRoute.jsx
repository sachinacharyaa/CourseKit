import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, type }) => {
    const { isAuthenticated, isUser, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={type === 'admin' ? '/admin/signin' : '/signin'} replace />;
    }

    if (type === 'user' && !isUser) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (type === 'admin' && !isAdmin) {
        return <Navigate to="/courses" replace />;
    }

    return children;
};

export default ProtectedRoute;
