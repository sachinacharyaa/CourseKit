import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import UserSignin from './pages/UserSignin';
import UserSignup from './pages/UserSignup';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import AdminSignin from './pages/AdminSignin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="signin" element={<UserSignin />} />
            <Route path="signup" element={<UserSignup />} />
            <Route path="admin/signin" element={<AdminSignin />} />
            <Route path="admin/signup" element={<AdminSignup />} />
            <Route
              path="courses"
              element={
                <ProtectedRoute type="user">
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-courses"
              element={
                <ProtectedRoute type="user">
                  <MyCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute type="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
