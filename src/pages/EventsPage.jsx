import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Flame, 
  MapPin, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { FESTIVALS } from '../data/templeData';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedCalendarMsg, setSavedCalendarMsg] = useState(false);

  const categories = [
    { key: 'all', label: 'All Festivals' },
    { key: 'upcoming', label: 'Upcoming in 60 Days' },
    { key: 'annual', label: 'Annual Brahmotsavam' }
  ];

  const filteredEvents = FESTIVALS.filter((evt) => {
    if (activeTab === 'upcoming') return evt.daysLeft !== undefined && evt.daysLeft <= 60;
    if (activeTab === 'annual') return evt.id.includes('brahmotsavam');
    return true;
  });

  const handleAddToCalendar = () => {
    setSavedCalendarMsg(true);
    setTimeout(() => setSavedCalendarMsg(false), 3000);
  };

  return (
    <div className="events-page">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-badge">
            <Calendar size={14} />
            <span>Divine Celebrations</span>
          </div>
          <h1 className="page-hero-title">Temple Festivals & Utsavs</h1>
          <p className="page-hero-subtitle">
            Immerse yourself in grand celestial weddings, sacred Rathotsavams, and devotional concerts throughout the year.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4.5rem 1.5rem' }}>
        {/* Category Tabs */}
        <div className="events-filter-bar">
          {categories.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`filter-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Events Grid */}
        <div className="events-grid-layout">
          {filteredEvents.map((evt) => (
            <EventCard 
              key={evt.id} 
              event={evt} 
              onSelect={(item) => setSelectedEvent(item)} 
            />
          ))}
        </div>

        {/* Festival Volunteer & Seva Banner */}
        <div style={{
          marginTop: '4.5rem',
          background: 'linear-gradient(135deg, var(--primary-brown-dark) 0%, var(--primary-brown) 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--gold)',
          padding: '3rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ maxWidth: '640px' }}>
            <span className="badge-temple badge-gold" style={{ marginBottom: '0.65rem' }}>
              Utsav Seva Volunteers
            </span>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--gold)', marginBottom: '0.6rem' }}>
              Participate as an Utsav Sevak
            </h3>
            <p style={{ color: '#FFE6CC', fontSize: '0.98rem', lineHeight: '1.6' }}>
              Looking to serve visiting pilgrims during peak festival rush? Volunteer your time in queue management, 
              prasadam distribution, and medical aid counters. Earn divine satisfaction through selfless seva.
            </p>
          </div>

          <Link to="/contact" className="btn btn-gold">
            <Sparkles size={16} />
            <span>Register as Festival Volunteer</span>
          </Link>
        </div>
      </div>

      {/* Full Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge-temple badge-saffron" style={{ marginBottom: '0.4rem' }}>
                  {selectedEvent.status}
                </span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-brown)' }}>
                  {selectedEvent.name}
                </h3>
                {selectedEvent.sanskritTitle && (
                  <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--saffron-dark)', fontSize: '1.1rem' }}>
                    {selectedEvent.sanskritTitle}
                  </span>
                )}
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{ fontSize: '1.5rem', color: 'var(--primary-brown)', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }} 
              onError={(e) => { e.target.src = "/images/temple-hero.png"; }}
            />

            <p style={{ color: 'var(--dark-text)', fontSize: '0.96rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {selectedEvent.description}
            </p>

            <div style={{ background: 'var(--cream)', padding: '1.2rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                <Calendar size={18} color="var(--saffron)" />
                <span>Date: {selectedEvent.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
                <Clock size={18} color="var(--saffron)" />
                <span>Ritual Timings: {selectedEvent.timing}</span>
              </div>
            </div>

            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-brown)', marginBottom: '0.6rem' }}>
              Seva & Ritual Highlights:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedEvent.highlights.map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} color="var(--auspicious-green)" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {savedCalendarMsg ? (
              <div style={{
                background: 'rgba(21, 128, 61, 0.1)',
                border: '1px solid #15803D',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                textAlign: 'center',
                color: '#15803D',
                marginBottom: '1rem',
                fontSize: '0.88rem'
              }}>
                Event added to your devotee reminder calendar! 🙏
              </div>
            ) : null}

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={handleAddToCalendar}
                className="btn btn-outline-brown btn-sm"
                style={{ flex: 1 }}
              >
                <Calendar size={15} />
                <span>Add to Calendar</span>
              </button>

              <Link 
                to="/pooja-booking" 
                onClick={() => setSelectedEvent(null)}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                <Flame size={15} />
                <span>Book Festival Seva</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
