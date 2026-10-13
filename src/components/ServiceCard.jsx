import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, linkTo, btnText, badge, image }) => {
  return (
    <div className="card-temple service-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {image && (
        <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
          <img 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
            className="card-hover-zoom"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/temple-hero.png";
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(58, 23, 5, 0.75) 0%, transparent 60%)'
          }} />
          {badge && (
            <span 
              className="badge-temple badge-gold" 
              style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 2 }}
            >
              {badge}
            </span>
          )}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--gold)',
            color: 'var(--primary-brown-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <Icon size={20} />
          </div>
        </div>
      )}

      <div style={{ padding: '1.6rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!image && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(217, 119, 6, 0.12)',
              border: '1px solid var(--border-gold)',
              color: 'var(--saffron-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={24} />
            </div>
            {badge && <span className="badge-temple badge-gold">{badge}</span>}
          </div>
        )}

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem', color: 'var(--primary-brown)' }}>
          {title}
        </h3>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.4rem', flex: 1, lineHeight: '1.6' }}>
          {description}
        </p>

        <Link 
          to={linkTo} 
          className="btn btn-outline-brown btn-sm"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <span>{btnText || 'Explore Service'}</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
