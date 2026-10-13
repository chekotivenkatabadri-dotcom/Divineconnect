import React from 'react';
import { Calendar, Clock, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const EventCard = ({ event, onSelect }) => {
  return (
    <div className="card-temple event-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
        <img 
          src={event.image || '/images/temple-hero.png'} 
          alt={event.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/temple-hero.png";
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(58, 23, 5, 0.85) 0%, transparent 60%)'
        }} />

        {/* Date Badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: 'var(--primary-brown-dark)',
          color: 'var(--gold)',
          border: '1.5px solid var(--gold)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.4rem 0.75rem',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.84rem',
          fontWeight: 700
        }}>
          <Calendar size={14} color="var(--gold)" />
          <span>{event.date}</span>
        </div>

        {/* Days Left Badge */}
        {event.daysLeft !== undefined && (
          <span 
            className="badge-temple badge-saffron"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(217, 119, 6, 0.9)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.4)'
            }}
          >
            {event.daysLeft > 0 ? `${event.daysLeft} Days to go` : 'Today'}
          </span>
        )}

        {/* Sanskrit Title Over Image */}
        {event.sanskritTitle && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            color: 'var(--gold-light)',
            fontFamily: 'var(--font-accent)',
            fontSize: '1.05rem',
            letterSpacing: '0.04em'
          }}>
            {event.sanskritTitle}
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
          <Clock size={14} color="var(--saffron)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {event.timing}
          </span>
        </div>

        <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-brown)', marginBottom: '0.75rem' }}>
          {event.name}
        </h3>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem', flex: 1 }}>
          {event.description}
        </p>

        {event.highlights && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.4rem' }}>
            {event.highlights.slice(0, 2).map((item, idx) => (
              <span key={idx} style={{
                fontSize: '0.76rem',
                padding: '0.25rem 0.6rem',
                background: 'var(--cream)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary-brown)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Sparkles size={11} color="var(--saffron)" />
                {item}
              </span>
            ))}
          </div>
        )}

        <button 
          onClick={() => onSelect(event)} 
          className="btn btn-outline-brown btn-sm"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <span>View Details & Seva</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
