import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Authorization from './Pages/Authorization/Auth'
import Signin from "./components/auth/Login";
import SignUp from "./components/auth/Register";
import RolesCheck from './components/auth/RolesCheck';
import SuccessPage from './components/auth/success';
import SalesmanSignin from './components/auth/SalesmanLogin';
import Unauthorized from './components/alerts/Unauthorized';
import Dashboard from './Pages/AdminPages/Dashboard';
import AdminLayout from './Layout/AdminLayout';
import Audits from './Pages/AdminPages/Audits';
import Employees from './Pages/AdminPages/Employees';
import Applications from './Pages/AdminPages/Applications';
import ProtectedRoute from './routesProtector/authProtector.jsx';
import SalesmanLayout from './Layout/SalesmanLayout.jsx';
// ... other imports

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<Authorization />}>
        <Route index element={<RolesCheck />} />
        <Route path="admin-login" element={<Signin />} />
        <Route path="salesman-login" element={<SalesmanSignin />} />
        <Route path="register" element={<SignUp />} />
        <Route path="success" element={<SuccessPage />} />
      </Route>

      {/* Admin Routes wrapped in AdminLayout and ProtectedRoute */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="applications" element={<Applications />} />
        <Route path="employees" element={<Employees />} />
        <Route path="audits" element={<Audits />} />
      </Route>

      <Route path="/salesman" element={<ProtectedRoute><SalesmanLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"  />
        <Route path="applications"  />
        <Route path="employees" />
        <Route path="audits"  />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;