import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../useContext/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAdmin, isApproved } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>; 


  if (!user) {
    if (location.pathname.startsWith('/auth')) return children;
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2. Logged in but not an Admin (and trying to access /admin routes)
  if (!isAdmin && location.pathname.startsWith('/admin')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Salesman is logged in but NOT approved
  if (user.role === 'salesman' && !isApproved) {
    return <Navigate to="/auth/success" replace />; 
  }

  return children;
};

export default ProtectedRoute;