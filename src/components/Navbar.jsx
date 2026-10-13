import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  Bell, 
  Phone, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { apiService } from '../services/api';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [currentUser, setCurrentUser] = useState(apiService.getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(apiService.getCurrentUser());
    };
    window.addEventListener('srivari-auth-change', handleAuthChange);
    return () => window.removeEventListener('srivari-auth-change', handleAuthChange);
  }, []);

  const handleRingBell = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 1000);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    apiService.logout();
    closeMobileMenu();
    navigate('/login');
  };

  return (
    <>
      {/* Top Auspicious Strip */}
      <div className="temple-top-strip">
        <div className="container top-strip-inner">
          <div className="strip-item">
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>ॐ</span>
            <span>Sri Venkateshwara Swamy Devasthanam (Gayathri Temple) • Dammaiguda, Hyderabad</span>
          </div>

          <div className="strip-right">
            <button 
              onClick={handleRingBell} 
              className={`bell-audio-btn ${bellRinging ? 'bell-animated' : ''}`}
              title="Click to ring the sacred temple bell"
            >
              <Bell size={13} className={bellRinging ? 'bell-animated' : ''} />
              <span>Ring Temple Bell</span>
            </button>
            
            <div className="strip-item">
              <Phone size={13} color="var(--gold)" />
              <a href="tel:07729075179">077290 75179</a>
            </div>

            <Link to="/admin" className="admin-link-badge">
              <ShieldCheck size={13} />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="navbar-header">
        <div className="container navbar-container">
          {/* Logo with Temple Icon */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <div className="brand-icon-wrapper">
              <Landmark size={24} />
            </div>
            <div className="brand-text-block">
              <span className="brand-title">DivineConnect</span>
              <span className="brand-subtitle">Srivari Devasthanam, Dammaiguda</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="navbar-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/pooja-booking" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Pooja Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/donation" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Donation
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Action Buttons */}
          <div className="navbar-actions">
            {currentUser ? (
              <div className="nav-user-profile-badge">
                <div className="user-info-text">
                  <span className="user-salutation">Namaste,</span>
                  <span className="user-display-name">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'Devotee'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-logout-btn"
                  title="Sign Out of Portal"
                >
                  <LogOut size={13} />
                  <span>Exit</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-login-btn">
                <User size={16} />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          {currentUser && (
            <div className="mobile-logged-user-bar">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-brown)' }}>
                    🙏 Namaste, {currentUser.name || 'Devotee'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {currentUser.phone || currentUser.email} • {currentUser.role || 'DEVOTEE'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline-brown btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                >
                  <LogOut size={12} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          <ul className="mobile-nav-list">
            <li>
              <NavLink to="/" end className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Home</span>
                <span>🛕</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>About</span>
                <span>📜</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/pooja-booking" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Pooja Booking</span>
                <span>🪔</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Events & Festivals</span>
                <span>🚩</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/donation" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Donation (E-Hundi)</span>
                <span>🙏</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Temple Gallery</span>
                <span>🖼️</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Contact & Timings</span>
                <span>📞</span>
              </NavLink>
            </li>
            {!currentUser && (
              <li>
                <NavLink to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>
                  <span>Login</span>
                  <span>👤</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/admin" className="mobile-nav-link" onClick={closeMobileMenu}>
                <span>Admin Dashboard</span>
                <span>⚙️</span>
              </NavLink>
            </li>
          </ul>

          <div className="mobile-drawer-footer">
            <button 
              onClick={handleRingBell} 
              className="btn btn-gold btn-sm"
              style={{ width: '100%' }}
            >
              <Bell size={16} />
              <span>Ring Temple Bell (Ghanta)</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
