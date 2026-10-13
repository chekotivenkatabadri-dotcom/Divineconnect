import React, { useState } from 'react';
import { Bell, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { playTempleBell, playDiyaGlowSound } from '../utils/soundEffects';

const DevoteeSevaBar = () => {
  const [bellRinging, setBellRinging] = useState(false);
  const [diyaCount, setDiyaCount] = useState(1048);
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [wishPrayer, setWishPrayer] = useState('');
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  const handleRing = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 1200);
  };

  const handleLightDiya = () => {
    playDiyaGlowSound();
    if (!isDiyaLit) {
      setIsDiyaLit(true);
      setDiyaCount((prev) => prev + 1);
    }
    setShowPrayerModal(true);
  };

  const handlePrayerSubmit = (e) => {
    e.preventDefault();
    setPrayerSubmitted(true);
    playTempleBell();
    setTimeout(() => {
      setShowPrayerModal(false);
      setPrayerSubmitted(false);
      setWishPrayer('');
    }, 2400);
  };

  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-brown-dark) 0%, var(--primary-brown) 100%)',
        borderTop: '2px solid var(--gold)',
        borderBottom: '2px solid var(--gold)',
        padding: '1.25rem 0',
        color: '#FFFFFF'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.2rem'
        }}>
          {/* Daily Panchangam snippet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255, 215, 0, 0.15)',
              border: '1px solid var(--gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              🕉️
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Today's Sacred Panchangam
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#FFFFFF' }}>
                Shukla Ekadashi • Rohini Nakshatra • Abhijit Muhurat: 11:45 AM - 12:35 PM
              </div>
            </div>
          </div>

          {/* Interactive Seva Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
            {/* Bell trigger */}
            <button
              onClick={handleRing}
              className={`btn btn-sm ${bellRinging ? 'bell-animated' : ''}`}
              style={{
                background: 'rgba(255, 215, 0, 0.15)',
                border: '1.5px solid var(--gold)',
                color: 'var(--gold)',
                fontWeight: 600
              }}
              title="Click to hear the bronze temple bell"
            >
              <Bell size={16} className={bellRinging ? 'bell-animated' : ''} />
              <span>Ring Virtual Ghanta</span>
            </button>

            {/* Diya Lighting trigger */}
            <button
              onClick={handleLightDiya}
              className="btn btn-gold btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
            >
              <Flame size={16} className={isDiyaLit ? 'diya-glowing' : ''} />
              <span>{isDiyaLit ? 'Diya Lit 🙏 (Offer Prayer)' : `Light a Diya (${diyaCount})`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prayer Offering Modal */}
      {showPrayerModal && (
        <div className="modal-overlay" onClick={() => setShowPrayerModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '480px' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 1rem auto',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--gold) 0%, var(--saffron) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
              }}>
                <Flame size={32} color="var(--primary-brown-dark)" className="diya-glowing" />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', marginBottom: '0.4rem' }}>
                Sacred Deepam Lit at the Sanctum
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Your virtual oil lamp has been placed before the deities. You may offer your silent prayer or family intention below.
              </p>
            </div>

            {prayerSubmitted ? (
              <div style={{
                background: 'rgba(21, 128, 61, 0.1)',
                border: '1px solid #15803D',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center',
                color: '#15803D'
              }}>
                <CheckCircle2 size={36} style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontWeight: 700, marginBottom: '0.2rem' }}>Prayer Consecrated!</h4>
                <p style={{ fontSize: '0.85rem' }}>
                  May the Lord bestow good health, peace, and abundance upon you and your loved ones.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePrayerSubmit}>
                <div className="form-group">
                  <label className="form-label">Devotee / Family Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g., Ramesh & Family" 
                    className="form-input" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Sankalpam / Prayer Wish (Optional)</label>
                  <textarea 
                    rows={3} 
                    value={wishPrayer} 
                    onChange={(e) => setWishPrayer(e.target.value)}
                    placeholder="Enter your prayer for health, peace, exams, or prosperity..." 
                    className="form-textarea" 
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowPrayerModal(false)} 
                    className="btn btn-outline-brown btn-sm"
                    style={{ flex: 1 }}
                  >
                    Close
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-sm"
                    style={{ flex: 2 }}
                  >
                    <span>Offer Sankalpam</span>
                    <Sparkles size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DevoteeSevaBar;
