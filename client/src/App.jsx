import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import OrganizerDashboard from './pages/DashboardOrganizer';
import AttendeeDashboard from './pages/DashboardAttendee';
import VendorDashboard from './pages/DashboardVendor';
import SponsorDashboard from './pages/DashboardSponsor';
import Register from './pages/Register';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard/organizer"
          element={
            <PrivateRoute>
              <OrganizerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/attendee"
          element={
            <PrivateRoute>
              <AttendeeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/vendor"
          element={
            <PrivateRoute>
              <VendorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/sponsor"
          element={
            <PrivateRoute>
              <SponsorDashboard />
            </PrivateRoute>
          }
        />

        {/* Redirect any unknown route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
