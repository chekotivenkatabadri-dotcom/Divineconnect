import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Flame, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Sun, 
  Moon, 
  MapPin, 
  CheckCircle2,
  Users,
  Compass,
  Landmark,
  Utensils
} from 'lucide-react';
import { 
  TEMPLE_TIMINGS, 
  FESTIVALS, 
  SHLOKAS, 
  TEMPLE_INFO 
} from '../data/templeData';
import DevoteeSevaBar from '../components/DevoteeSevaBar';
import ServiceCard from '../components/ServiceCard';
import EventCard from '../components/EventCard';
import ReceiptModal from '../components/ReceiptModal';

const HomePage = () => {
  const [activeShlokaIdx, setActiveShlokaIdx] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const services = [
    {
      icon: Flame,
      title: "Online Pooja Booking",
      description: "Book sacred Archana, Rudrabhishekam, and Homams with consecrated Vedic priests and receive sanctum prasadam.",
      linkTo: "/pooja-booking",
      btnText: "Book a Seva",
      badge: "Vedic Rituals",
      image: "/images/temple-aarti.png"
    },
    {
      icon: Calendar,
      title: "Festivals & Utsavs",
      description: "Explore the sacred annual calendar of temple celebrations, Brahmotsavams, and celestial weddings with live schedules.",
      linkTo: "/events",
      btnText: "Explore Utsavs",
      badge: "Upcoming Mega Events",
      image: "/images/temple-gopuram.png"
    },
    {
      icon: Utensils,
      title: "E-Hundi & Annadanam",
      description: "Sponsor daily holy food sharing (Annaprasadam) and goshala cow protection with 80G tax-exempt digital certificates.",
      linkTo: "/donation",
      btnText: "Offer Seva",
      badge: "80G Tax Deductible",
      image: "/images/temple-annadanam.png"
    },
    {
      icon: Users,
      title: "Devotee Support & Helpdesk",
      description: "Assistance with accommodation, queue status, special senior citizen darshan, and traditional dress code inquiries.",
      linkTo: "/contact",
      btnText: "Visit Helpdesk",
      badge: "24/7 Seva",
      image: "/images/temple-hero.png"
    }
  ];

  return (
    <div className="home-page-wrapper">
      {/* 1. Large Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay-effects" />

        <div className="container hero-content">
          <div className="hero-badge">
            <span>🛕</span>
            <span>Sri Venkateshwara Swamy Devasthanam • Dammaiguda, Hyderabad</span>
          </div>

          <h1 className="hero-title">
            Welcome to DivineConnect
            <span className="highlight">Connecting Devotees with Divine Experiences</span>
          </h1>

          <p className="hero-subtitle">
            ॥ धर्मो रक्षति रक्षितः ॥
          </p>

          <p className="hero-description">
            Experience the divine grace of Lord Sri Venkateswara Swamy & Sri Gayathri Devi at Dammaiguda, Hyderabad. 
            DivineConnect bridges ancient temple traditions with seamless modern convenience—enabling 
            online Pooja bookings, Brahmotsavam participation, transparent E-Hundi offerings, 
            and complete devotee care.
          </p>

          <div className="hero-cta-group">
            <Link to="/pooja-booking" className="btn btn-gold">
              <Flame size={18} />
              <span>Book a Pooja</span>
            </Link>

            <Link to="/events" className="btn btn-outline-gold">
              <Calendar size={18} />
              <span>Explore Events</span>
            </Link>
          </div>

          {/* Key Sanctum Numbers */}
          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <span className="hero-stat-number">50,000+</span>
              <span className="hero-stat-label">Daily Devotees</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">100%</span>
              <span className="hero-stat-label">Vedic Tradition</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">25,000+</span>
              <span className="hero-stat-label">Free Meals Daily</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">365 Days</span>
              <span className="hero-stat-label">Sanctum Open</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Devotee Interactive Seva Bar (Bell Chime, Light Diya, Panchangam) */}
      <DevoteeSevaBar />

      {/* 3. Temple Timings Section */}
      <section style={{ padding: '5rem 0', background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Clock size={14} />
              <span>Daily Auspicious Schedule</span>
            </div>
            <h2 className="section-title">Temple Darshan & Ritual Timings</h2>
            <div className="sacred-divider">
              <span className="sacred-divider-icon">ॐ</span>
            </div>
            <p className="section-subtitle">
              Plan your spiritual visit. The sanctum gates open with dawn suprabhatam chanting and remain active throughout the day with regular archanas and aartis.
            </p>
          </div>

          <div className="timings-grid">
            {TEMPLE_TIMINGS.map((item, idx) => (
              <div key={idx} className="timing-card">
                <span className="timing-badge">{item.tag}</span>
                <h3 className="timing-slot-title">{item.slot}</h3>
                <div className="timing-slot-time">
                  <Clock size={15} />
                  <span>{item.time}</span>
                </div>
                <p className="timing-slot-desc">{item.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn-outline-brown btn-sm">
              <span>View Special Senior Citizen & NRI Guidelines</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Service Cards Section */}
      <section style={{ padding: '5.5rem 0', background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>Divine Sevas</span>
            </div>
            <h2 className="section-title">Sacred Devotee Services</h2>
            <div className="sacred-divider">
              <span className="sacred-divider-icon">🪔</span>
            </div>
            <p className="section-subtitle">
              Participate in sacred rituals, support noble causes, and stay spiritually connected wherever you are.
            </p>
          </div>

          <div className="services-grid">
            {services.map((s, idx) => (
              <ServiceCard 
                key={idx}
                icon={s.icon}
                title={s.title}
                description={s.description}
                linkTo={s.linkTo}
                btnText={s.btnText}
                badge={s.badge}
                image={s.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Upcoming Festivals Section */}
      <section style={{ padding: '5rem 0', background: 'var(--cream-alt)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Calendar size={14} />
              <span>Auspicious Utsavs</span>
            </div>
            <h2 className="section-title">Upcoming Temple Festivals</h2>
            <div className="sacred-divider">
              <span className="sacred-divider-icon">🚩</span>
            </div>
            <p className="section-subtitle">
              Join thousands of devotees in joyous divine celebrations and grand chariot processions.
            </p>
          </div>

          <div className="festivals-preview-grid">
            {FESTIVALS.slice(0, 3).map((f) => (
              <EventCard 
                key={f.id} 
                event={f} 
                onSelect={(evt) => setSelectedEvent(evt)} 
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.8rem' }}>
            <Link to="/events" className="btn btn-primary">
              <Calendar size={16} />
              <span>View Complete Festival Calendar</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Spiritual Quote / Shloka Section */}
      <section className="shloka-banner-section">
        <div className="container shloka-container">
          <div style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>🕉️</div>

          <p className="shloka-sanskrit">
            {SHLOKAS[activeShlokaIdx].sanskrit}
          </p>

          <p className="shloka-translit">
            "{SHLOKAS[activeShlokaIdx].transliteration}"
          </p>

          <p className="shloka-meaning">
            {SHLOKAS[activeShlokaIdx].meaning}
          </p>

          <div className="shloka-source">
            — {SHLOKAS[activeShlokaIdx].source}
          </div>

          {/* Shloka Selector Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1.8rem' }}>
            {SHLOKAS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveShlokaIdx(i)}
                style={{
                  width: i === activeShlokaIdx ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: i === activeShlokaIdx ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.25s ease'
                }}
                aria-label={`Select Shloka ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section style={{
        padding: '4.5rem 0',
        background: '#FFFFFF',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{
            background: 'var(--cream)',
            border: '2px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.6rem' }}>🙏</span>
            <h3 style={{ fontSize: '1.9rem', color: 'var(--primary-brown)', marginBottom: '0.8rem' }}>
              Seek Divine Blessings with Online Sankalpam
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
              Unable to visit in person? Perform an authorized Vedic Pooja in your family's Gotra and Nakshatra. 
              The sacred sanctum prasadam will be consecrated and mailed with reverence.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/pooja-booking" className="btn btn-primary">
                <span>Book Sankalpam Pooja</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/donation" className="btn btn-outline-brown">
                <span>Sponsor Annadanam</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Quick Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge-temple badge-saffron" style={{ marginBottom: '0.4rem' }}>
                  {selectedEvent.status}
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-brown)' }}>
                  {selectedEvent.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{ fontSize: '1.5rem', color: 'var(--primary-brown)', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              {selectedEvent.description}
            </p>

            <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontWeight: 600 }}>
                <Calendar size={16} color="var(--saffron)" />
                <span>Date: {selectedEvent.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <Clock size={16} color="var(--saffron)" />
                <span>Schedule: {selectedEvent.timing}</span>
              </div>
            </div>

            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-brown)', marginBottom: '0.6rem' }}>
              Special Seva Highlights:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {selectedEvent.highlights.map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="var(--auspicious-green)" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button 
                onClick={() => setSelectedEvent(null)} 
                className="btn btn-outline-brown btn-sm" 
                style={{ flex: 1 }}
              >
                Close
              </button>
              <Link 
                to="/pooja-booking" 
                onClick={() => setSelectedEvent(null)}
                className="btn btn-primary btn-sm" 
                style={{ flex: 2 }}
              >
                Book Festival Special Seva
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
