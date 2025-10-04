import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import OrganizerDashboard from './pages/DashboardOrganizer';
import AttendeeDashboard from './pages/DashboardAttendee';
import VendorDashboard from './pages/DashboardVendor';
import SponsorDashboard from './pages/DashboardSponsor';
import Register from './pages/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
                <Route path="/dashboard/attendee" element={<AttendeeDashboard />} />
                <Route path="/dashboard/vendor" element={<VendorDashboard />} />
                <Route path="/dashboard/sponsor" element={<SponsorDashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
