import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <div className="container">
                    <p> Made with ❤️ by Sachin © 2026 CourseKit. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
