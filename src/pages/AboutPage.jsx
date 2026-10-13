import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Target, 
  Eye, 
  Sparkles, 
  ScrollText, 
  Cpu, 
  ShieldCheck, 
  HeartHandshake, 
  Flame, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { TEMPLE_INFO } from '../data/templeData';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-badge">
            <Landmark size={14} />
            <span>Centuries of Spiritual Sanctity</span>
          </div>
          <h1 className="page-hero-title">About DivineConnect</h1>
          <p className="page-hero-subtitle">
            Harmonizing ancient Vedic traditions with thoughtful modern technology to serve pilgrims worldwide.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '4.5rem 1.5rem' }}>
        {/* Intro */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Our Sacred Foundation</span>
          </div>
          <h2 className="section-title">The Essence of DivineConnect</h2>
          <div className="sacred-divider">
            <span className="sacred-divider-icon">ॐ</span>
          </div>
          <p className="section-subtitle">
            DivineConnect was envisioned to bridge geographical distances for devotees across India and the globe. 
            Whether you reside in nearby villages or overseas, the temple gates, priest rituals, and holy prasadams 
            remain intimately within your reach.
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="mission-vision-grid">
          <div className="mv-card">
            <div className="mv-icon-box">
              <Target size={28} />
            </div>
            <h3 className="mv-title">Our Sacred Mission</h3>
            <p className="mv-text">
              To preserve, cultivate, and perpetuate ancient Vedic rituals while creating a transparent, 
              dignified, and stress-free temple experience for every pilgrim. We are committed to ensuring 
              that holy Annadanam, cow protection, and Vedic education flourish uninterrupted for generations to come.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>Zero queue chaos through structured digital slot bookings</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>100% accountable E-Hundi management with instant 80G tax receipts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>Equal access for seniors, differently-abled, and outstation bhaktas</span>
              </li>
            </ul>
          </div>

          <div className="mv-card">
            <div className="mv-icon-box">
              <Eye size={28} />
            </div>
            <h3 className="mv-title">Our Divine Vision</h3>
            <p className="mv-text">
              To be the premier benchmark of spiritual temple governance in India—where timeless Vedic 
              purity meets contemporary ease. A holistic haven of peace, meditation, Sanatana Dharma values, 
              and selfless community service (Seva).
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>Global outreach connecting 1 Million+ devotees to daily satsang</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>Eco-friendly, plastic-free temple premises powered by solar energy</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>Preservation of rare ancient palm-leaf Agamic manuscripts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Story Section 1: Sacred Heritage & Architecture */}
        <div className="story-split-section">
          <div className="story-image-wrap">
            <img 
              src="/images/temple-gopuram.png" 
              alt="Temple Gopuram Architecture"
              onError={(e) => { e.target.src = "/images/temple-hero.png"; }}
            />
            <div className="story-caption-badge">
              <strong>Sanctum of Srivari & Sri Gayathri Devi</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>
                Ayappa Colony, Dammaiguda, Hyderabad • Rated 4.8★ (346+ Reviews)
              </div>
            </div>
          </div>

          <div className="story-content">
            <div className="section-tag" style={{ marginBottom: '0.8rem' }}>
              <ScrollText size={14} />
              <span>Timeless Heritage</span>
            </div>
            <h3>The Sanctity of Srivari Temple Traditions</h3>
            <p>
              Temples in Sanatana Dharma are living energy centers (Chit-Kshetrams) consecrated according to sacred Agamic scriptures. 
              At Sri Venkateshwara Swamy Devasthanam in Dammaiguda, the divine presence of Lord Venkateswara alongside 
              Sri Gayathri Devi creates a haven of spiritual tranquility for the entire Secunderabad and Hyderabad devotee community.
            </p>
            <p>
              Every ritual—from dawn Suprabhata Seva and daily Sahasranama Archana to evening Deeparadhana and the grand 
              Annual Srivari Brahmotsavams—is performed with Vedic sanctity by dedicated priests.
            </p>
            <Link to="/gallery" className="btn btn-outline-brown btn-sm">
              <span>View Devasthanam Gallery</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Story Section 2: How Technology Simplifies Devotee Services */}
        <div className="story-split-section" style={{ direction: 'rtl' }}>
          <div className="story-image-wrap" style={{ direction: 'ltr' }}>
            <img 
              src="/images/temple-aarti.png" 
              alt="Vedic Aarti and Devotees"
              onError={(e) => { e.target.src = "/images/temple-hero.png"; }}
            />
            <div className="story-caption-badge">
              <strong>Vedic Sevas & Modern Order</strong>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>
                Devotees experience smooth darshan without long serpentine queues
              </div>
            </div>
          </div>

          <div className="story-content" style={{ direction: 'ltr' }}>
            <div className="section-tag" style={{ marginBottom: '0.8rem' }}>
              <Cpu size={14} />
              <span>Digital Seva</span>
            </div>
            <h3>How Digital Technology Simplifies Temple Visits</h3>
            <p>
              Historically, pilgrims travelled for days only to face unpredictable queue delays, overcrowded counters, 
              and lack of transparent seva information. DivineConnect eliminates these friction points while keeping 
              the sanctum atmosphere strictly traditional and peaceful.
            </p>
            <p>
              Through our unified portal, devotees select specific pooja timings, register Gotra and Nakshatra, 
              generate verifiable digital passes with QR codes, and contribute directly to community Annadanam 
              with instantaneous receipts.
            </p>
            <Link to="/pooja-booking" className="btn btn-primary btn-sm">
              <span>Book Your First Pooja</span>
              <Flame size={14} />
            </Link>
          </div>
        </div>

        {/* 4 Pillars of DivineConnect */}
        <div style={{ marginTop: '5rem' }}>
          <div className="section-header">
            <h2 className="section-title">The Pillars of DivineConnect</h2>
            <div className="sacred-divider">
              <span className="sacred-divider-icon">🪔</span>
            </div>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-num">01</div>
              <h4 className="pillar-title">Spiritual Integrity</h4>
              <p className="pillar-desc">
                We strictly adhere to Pancharatra and Vaikhanasa Agama canons. Modern tools only facilitate convenience—rituals remain 100% sacred and unchanged.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">02</div>
              <h4 className="pillar-title">Complete Transparency</h4>
              <p className="pillar-desc">
                Every rupee offered in the E-Hundi is accounted for and channeled directly into free pilgrim meals (Annadanam), cow care, and heritage repairs.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">03</div>
              <h4 className="pillar-title">Devotee Convenience</h4>
              <p className="pillar-desc">
                Effortless slot reservations, minimal queue standing, instant confirmations, and supportive devotee helpline available 7 days a week.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">04</div>
              <h4 className="pillar-title">Global Connectivity</h4>
              <p className="pillar-desc">
                Empowering the worldwide Indian diaspora to perform sacred rituals in their ancestral family names and receive sanctum blessings anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
