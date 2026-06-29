import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const normalizeRole = (role) => String(role || '').trim().toLowerCase();

const defaultPathForRole = (role) => {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole === 'admin') return '/admindashboard';
  if (normalizedRole === 'cms') return '/cmsdashboard';

  return '/';
};

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/20 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(normalizeRole(user.role))) {
    return <Navigate to={defaultPathForRole(user.role)} replace />;
  }

  return children;
}

