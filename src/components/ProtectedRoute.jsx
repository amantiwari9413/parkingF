import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const parkingAreaId = localStorage.getItem('parkingAreaId');

  if (!accessToken || !parkingAreaId) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute; 