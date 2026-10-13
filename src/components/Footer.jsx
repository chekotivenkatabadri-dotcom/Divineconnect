import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ChevronRight, 
  Heart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { TEMPLE_INFO } from '../data/templeData';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="temple-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Kshetram */}
          <div className="footer-brand-col">
            <div className="brand-logo-area">
              <div className="brand-icon-wrapper" style={{ width: '42px', height: '42px' }}>
                <Landmark size={22} />
              </div>
              <div>
                <h3 style={{ color: 'var(--gold)', fontSize: '1.4rem', lineHeight: '1.1' }}>
                  DivineConnect
                </h3>
                <span style={{ color: 'var(--gold-light)', fontSize: '0.74rem', letterSpacing: '0.08em' }}>
                  TEMPLE SERVICE SYSTEM
                </span>
              </div>
            </div>

            <p className="footer-desc">
              Dedicated to upholding centuries of timeless Vedic traditions, enabling sacred pooja bookings, 
              transparent E-Hundi offerings, and connecting millions of devotees worldwide to divine blessings.
            </p>

            <div className="footer-temple-badge">
              <span>🛕</span>
              <span>Sri Venkateshwara Swamy Devasthanam • Dammaiguda, Secunderabad</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-heading">Devotee Services</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/"><ChevronRight size={14} /> Home Sanctum</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about"><ChevronRight size={14} /> Sacred Heritage & Mission</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/pooja-booking"><ChevronRight size={14} /> Online Pooja Booking</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/events"><ChevronRight size={14} /> Festivals & Utsavs</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/donation"><ChevronRight size={14} /> Nitya Annadanam & Hundi</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/gallery"><ChevronRight size={14} /> Darshan Gallery</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact"><ChevronRight size={14} /> Helpdesk & Directions</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/admin"><ChevronRight size={14} /> Temple Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Daily Darshan Timings */}
          <div>
            <h4 className="footer-heading">Darshan Timings</h4>
            <p style={{ fontSize: '0.88rem', color: '#E2CEBE', marginBottom: '0.6rem' }}>
              Open all 365 days of the year
            </p>

            <div className="footer-timings-card">
              <div className="footer-timing-row">
                <span className="footer-timing-label">Suprabhata Seva</span>
                <span className="footer-timing-time">05:00 AM</span>
              </div>
              <div className="footer-timing-row">
                <span className="footer-timing-label">Morning Darshan</span>
                <span className="footer-timing-time">06:00 - 11:30 AM</span>
              </div>
              <div className="footer-timing-row">
                <span className="footer-timing-label">Annadanam Feast</span>
                <span className="footer-timing-time">12:00 - 03:00 PM</span>
              </div>
              <div className="footer-timing-row">
                <span className="footer-timing-label">Evening Aarti</span>
                <span className="footer-timing-time">06:45 - 07:30 PM</span>
              </div>
              <div className="footer-timing-row">
                <span className="footer-timing-label">Ekanta Seva</span>
                <span className="footer-timing-time">09:30 - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Daily Updates */}
          <div>
            <h4 className="footer-heading">Kshetram Address</h4>
            <div className="footer-contact-list">
              <div className="contact-row">
                <MapPin size={18} />
                <span>{TEMPLE_INFO.address}</span>
              </div>
              <div className="contact-row">
                <Phone size={18} />
                <span>{TEMPLE_INFO.phone}</span>
              </div>
              <div className="contact-row">
                <Mail size={18} />
                <span>{TEMPLE_INFO.email}</span>
              </div>
            </div>

            <div className="footer-newsletter-box">
              <span style={{ fontSize: '0.86rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                Receive Daily Panchangam & Utsav Alerts:
              </span>
              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#86EFAC', marginTop: '0.5rem', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Blessings! You are subscribed to daily alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <div>
            © {new Date().getFullYear()} <strong>DivineConnect</strong> – Temple Management & Devotee Service System. All Rights Reserved.
          </div>

          <div className="footer-shloka-banner">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </div>

          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <Link to="/about" style={{ color: '#BF9C82' }}>Temple Bylaws</Link>
            <Link to="/contact" style={{ color: '#BF9C82' }}>Devotee Privacy</Link>
            <Link to="/admin" style={{ color: 'var(--gold)' }}>Priest Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
