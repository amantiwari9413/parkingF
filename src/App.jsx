import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ParkingAreas from './components/ParkingAreas';
import ParkingSlots from './components/ParkingSlots';
import QRCodeScanner from './components/QRCodeScanner';
import AdminAuth from './components/AdminAuth';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parking-areas/:city" element={<ParkingAreas />} />
        <Route path="/parking-slots/:parkingId" element={<ParkingSlots />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/scanner"
          element={
            <ProtectedRoute>
              <QRCodeScanner />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
