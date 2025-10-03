import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import WelcomePage from './Pages/WelcomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

// Organizer Pages
import CreateEvent from './Pages/organiser/CreateEvent';
import AIPlan from './Pages/organiser/AIPlan';
import Dashboard from './Pages/organiser/OrgDashboard';

// Attendee Pages
import AttendeeOnboarding from './Pages/attendee/AttendeeOnboard';
import AttendeeAgenda from './Pages/attendee/AttendeeAgenda';

// Vendor Pages
import VendorDashboard from './Pages/vendor/vendorDashboard';

// Sponsor Pages
import SponsorInsights from './Pages/sponsor/SponsorDashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Organizer Routes */}
          <Route path="/organizer/dashboard" element={
            <ProtectedRoute allowedRoles={['organizer']}><Dashboard /></ProtectedRoute>
          }/>
          <Route path="/organizer/create-event" element={
            <ProtectedRoute allowedRoles={['organizer']}><CreateEvent /></ProtectedRoute>
          }/>
          <Route path="/organizer/ai-plan" element={
            <ProtectedRoute allowedRoles={['organizer']}><AIPlan /></ProtectedRoute>
          }/>

          {/* Attendee Routes */}
          <Route path="/attendee/onboarding" element={
            <ProtectedRoute allowedRoles={['attendee']}><AttendeeOnboarding /></ProtectedRoute>
          }/>
          <Route path="/attendee/agenda" element={
            <ProtectedRoute allowedRoles={['attendee']}><AttendeeAgenda /></ProtectedRoute>
          }/>

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={
            <ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>
          }/>

          {/* Sponsor Routes */}
          <Route path="/sponsor/insights" element={
            <ProtectedRoute allowedRoles={['sponsor']}><SponsorInsights /></ProtectedRoute>
          }/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
