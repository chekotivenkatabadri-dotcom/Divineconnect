import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PoojaBookingPage from './pages/PoojaBookingPage';
import EventsPage from './pages/EventsPage';
import DonationPage from './pages/DonationPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Import Styles
import './styles/index.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/home.css';
import './styles/about.css';
import './styles/booking.css';
import './styles/events.css';
import './styles/donation.css';
import './styles/gallery.css';
import './styles/contact.css';
import './styles/auth.css';
import './styles/admin.css';
import './styles/chatbot.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="divine-app-root">
        <Navbar />
        <main className="main-content-flow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pooja-booking" element={<PoojaBookingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/donation" element={<DonationPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
