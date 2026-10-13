import React from 'react';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  X, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { TEMPLE_INFO } from '../data/templeData';

const ReceiptModal = ({ isOpen, onClose, data, type = 'booking' }) => {
  if (!isOpen || !data) return null;

  const handlePrint = () => {
    window.print();
  };

  const isBooking = type === 'booking';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '640px', padding: '0' }}
      >
        {/* Decorative Golden Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-brown) 0%, var(--primary-brown-dark) 100%)',
          color: '#FFFFFF',
          padding: '1.75rem 2rem',
          borderBottom: '3px solid var(--gold)',
          position: 'relative'
        }}>
          <button 
            onClick={onClose} 
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              color: '#FFFFFF',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🛕</span>
            <div>
              <h3 style={{ color: 'var(--gold)', fontSize: '1.4rem', lineHeight: '1.1' }}>
                {TEMPLE_INFO.name}
              </h3>
              <span style={{ color: 'var(--gold-light)', fontSize: '0.78rem', letterSpacing: '0.06em' }}>
                SRIVARI GAYATHRI TEMPLE, DAMMAIGUDA • OFFICIAL SEVA PASS
              </span>
            </div>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid #22C55E',
            padding: '0.3rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            color: '#86EFAC',
            marginTop: '0.4rem'
          }}>
            <CheckCircle2 size={15} />
            <span>{isBooking ? 'Pooja Booking Confirmed' : 'E-Hundi Seva Contribution Successful'}</span>
          </div>
        </div>

        {/* Printable Pass Body */}
        <div style={{ padding: '2rem' }} id="printable-receipt-area">
          {/* Reference & Date strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--cream)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.25rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                RECEIPT / PASS NUMBER
              </span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--primary-brown)', letterSpacing: '0.05em' }}>
                {data.referenceNumber || 'DC-2026-CONFIRM'}
              </strong>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                ISSUED ON
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--dark-text)', fontWeight: 600 }}>
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '1.5rem'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
              <tbody>
                <tr style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)', width: '38%' }}>
                    Primary Devotee
                  </td>
                  <td style={{ padding: '0.75rem 1.1rem', fontWeight: 600, color: 'var(--dark-text)' }}>
                    {data.devoteeName || data.donorName}
                  </td>
                </tr>

                {isBooking ? (
                  <>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Pooja Ritual</td>
                      <td style={{ padding: '0.75rem 1.1rem', fontWeight: 600, color: 'var(--primary-brown)' }}>
                        {data.poojaName}
                      </td>
                    </tr>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Date & Slot</td>
                      <td style={{ padding: '0.75rem 1.1rem', fontWeight: 600 }}>
                        {data.bookingDate} • {data.timeSlot}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Gotra & Nakshatra</td>
                      <td style={{ padding: '0.75rem 1.1rem' }}>
                        {data.gotra || 'Kashyapa'} / {data.nakshatra || 'Rohini'}
                      </td>
                    </tr>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Number of Devotees</td>
                      <td style={{ padding: '0.75rem 1.1rem' }}>{data.devoteeCount || 1} Persons</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Dakshina Offering</td>
                      <td style={{ padding: '0.75rem 1.1rem', fontWeight: 700, color: 'var(--saffron-dark)', fontSize: '1.05rem' }}>
                        ₹ {data.amount || '0'}
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Donation Seva Cause</td>
                      <td style={{ padding: '0.75rem 1.1rem', fontWeight: 600, color: 'var(--primary-brown)' }}>
                        {data.causeTitle || data.cause}
                      </td>
                    </tr>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Contribution Amount</td>
                      <td style={{ padding: '0.75rem 1.1rem', fontWeight: 700, color: 'var(--saffron-dark)', fontSize: '1.15rem' }}>
                        ₹ {data.amount}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>Donor Email / Phone</td>
                      <td style={{ padding: '0.75rem 1.1rem' }}>{data.email} • {data.phone || 'N/A'}</td>
                    </tr>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--text-muted)' }}>80G Tax Exemption</td>
                      <td style={{ padding: '0.75rem 1.1rem', color: 'var(--auspicious-green)', fontWeight: 600 }}>
                        PAN: {data.panNumber || 'APXXXX123A'} • Eligible for 80G Deductions
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* QR Code and Instructions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--cream)',
            border: '1px dashed var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--primary-brown)', display: 'block', marginBottom: '0.2rem' }}>
                Instructions for Devotees:
              </strong>
              • Please report at Vaikuntam Queue Complex 30 minutes before slot time.<br />
              • Present this digital or printed pass along with an Aadhaar or photo ID.<br />
              • Traditional Indian dress code is compulsory.
            </div>

            <div style={{
              width: '74px',
              height: '74px',
              background: '#FFFFFF',
              border: '1px solid var(--border-gold)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <QrCode size={48} color="var(--primary-brown)" />
              <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '2px' }}>SCAN AT GATE</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          background: '#FAF7F2',
          padding: '1.25rem 2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button 
            type="button" 
            onClick={onClose} 
            className="btn btn-outline-brown btn-sm"
          >
            Close Window
          </button>

          <button 
            type="button" 
            onClick={handlePrint} 
            className="btn btn-primary btn-sm"
          >
            <Printer size={16} />
            <span>Print / Save e-Pass PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
