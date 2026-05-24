import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

// Protects routes so unauthenticated users are redirected to login
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/auth" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;