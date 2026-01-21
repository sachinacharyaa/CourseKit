import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null); // 'user' or 'admin'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing auth on load
        const token = localStorage.getItem('token');
        const storedUserType = localStorage.getItem('userType');

        if (token && storedUserType) {
            setUser({ token });
            setUserType(storedUserType);
        }
        setLoading(false);
    }, []);

    const login = (token, type) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userType', type);
        setUser({ token });
        setUserType(type);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setUser(null);
        setUserType(null);
    };

    const isAuthenticated = !!user;
    const isUser = userType === 'user';
    const isAdmin = userType === 'admin';

    return (
        <AuthContext.Provider value={{
            user,
            userType,
            loading,
            login,
            logout,
            isAuthenticated,
            isUser,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
