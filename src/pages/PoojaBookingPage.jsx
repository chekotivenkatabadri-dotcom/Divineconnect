import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { POOJAS } from '../data/templeData';
import { playTempleBell } from '../utils/soundEffects';
import ReceiptModal from '../components/ReceiptModal';
import { apiService } from '../services/api';

const PoojaBookingPage = () => {
  const [selectedPoojaId, setSelectedPoojaId] = useState(POOJAS[0].id);
  const [formData, setFormData] = useState({
    devoteeName: '',
    phone: '',
    email: '',
    bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: POOJAS[0].timeSlots[0],
    devoteeCount: 2,
    gotra: 'Kashyapa',
    nakshatra: 'Rohini',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const currentPooja = POOJAS.find((p) => p.id === selectedPoojaId) || POOJAS[0];

  const handlePoojaChange = (poojaId) => {
    setSelectedPoojaId(poojaId);
    const pooja = POOJAS.find((p) => poojaId && p.id === poojaId);
    if (pooja && pooja.timeSlots.length > 0) {
      setFormData((prev) => ({ ...prev, timeSlot: pooja.timeSlots[0] }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.devoteeName.trim()) {
      newErrors.devoteeName = 'Please enter devotee / family name';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address for e-Pass delivery';
    }
    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Please select your preferred date';
    }
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please pick a time slot';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Save to Spring Boot backend if running, otherwise use generated ref
    const randomRef = `DC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const backendResult = await apiService.createBooking({
      devoteeName: formData.devoteeName,
      phone: formData.phone,
      email: formData.email,
      poojaName: currentPooja.name,
      bookingDate: formData.bookingDate,
      timeSlot: formData.timeSlot,
      devoteeCount: formData.devoteeCount,
      gotra: formData.gotra,
      nakshatra: formData.nakshatra,
      specialRequests: formData.specialRequests,
      amount: currentPooja.dakshina,
      status: "Confirmed"
    });

    setIsSubmitting(false);

    // Play sacred bell audio
    playTempleBell();

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#D97706', '#6D2F0C', '#E6B800']
    });

    const bookingRecord = {
      referenceNumber: backendResult?.referenceNumber || randomRef,
      devoteeName: formData.devoteeName,
      phone: formData.phone,
      email: formData.email,
      poojaName: currentPooja.name,
      bookingDate: formData.bookingDate,
      timeSlot: formData.timeSlot,
      devoteeCount: formData.devoteeCount,
      gotra: formData.gotra,
      nakshatra: formData.nakshatra,
      specialRequests: formData.specialRequests,
      amount: currentPooja.dakshina,
      prasadam: currentPooja.prasadam
    };

    setConfirmedBooking(bookingRecord);
    setShowReceiptModal(true);
  };

  return (
    <div className="pooja-booking-page">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-badge">
            <Flame size={14} />
            <span>Authorized Sanctum Sevas</span>
          </div>
          <h1 className="page-hero-title">Online Pooja & Seva Booking</h1>
          <p className="page-hero-subtitle">
            Reserve your sacred ritual slot in advance. Experience divine peace and receive consecrated temple prasadam.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        {/* Success Confirmation Alert Banner if booked */}
        {confirmedBooking && (
          <div style={{
            background: 'rgba(21, 128, 61, 0.08)',
            border: '2px solid #15803D',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem 2rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#15803D',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 style={{ color: '#15803D', fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                  Pooja Confirmed! Pass #{confirmedBooking.referenceNumber}
                </h4>
                <p style={{ color: 'var(--dark-text)', fontSize: '0.9rem' }}>
                  Thank you, <strong>{confirmedBooking.devoteeName}</strong>. Your slot for <strong>{confirmedBooking.poojaName}</strong> on <strong>{confirmedBooking.bookingDate}</strong> is reserved.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowReceiptModal(true)} 
              className="btn btn-primary btn-sm"
            >
              <Printer size={15} />
              <span>View / Print e-Pass</span>
            </button>
          </div>
        )}

        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Direct Sanctum Sankalpam</span>
          </div>
          <h2 className="section-title">Select Pooja & Fill Devotee Particulars</h2>
          <div className="sacred-divider">
            <span className="sacred-divider-icon">🪔</span>
          </div>
          <p className="section-subtitle">
            All rituals are conducted strictly following Shastras and Agamas by trained temple archakas.
          </p>
        </div>

        {/* Quick Pooja Cards Carousel/Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.8rem' }}>
            Choose Pooja Ritual:
          </label>
          <div className="pooja-quick-selector">
            {POOJAS.map((pooja) => {
              const isSelected = pooja.id === selectedPoojaId;
              return (
                <div
                  key={pooja.id}
                  onClick={() => handlePoojaChange(pooja.id)}
                  className={`pooja-select-card ${isSelected ? 'selected' : ''}`}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="pooja-card-name">{pooja.name}</span>
                      {pooja.badge && (
                        <span className="badge-temple badge-gold" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                          {pooja.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem', lineHeight: '1.4' }}>
                      {pooja.description.substring(0, 75)}...
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(109,47,12,0.1)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{pooja.duration}</span>
                    <span className="pooja-card-dakshina">₹ {pooja.dakshina}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form and Live Summary Grid */}
        <div className="booking-layout-grid">
          {/* Booking Form Card */}
          <div className="booking-form-card">
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={20} color="var(--saffron)" />
                <span>Devotee Information</span>
              </h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Primary Devotee Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="devoteeName"
                    value={formData.devoteeName}
                    onChange={handleInputChange}
                    placeholder="E.g., Venkata Subramanian"
                    className="form-input"
                  />
                  {errors.devoteeName && <div className="form-error">{errors.devoteeName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Mobile Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="form-input"
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Email Address (for e-Pass) <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="devotee@example.com"
                    className="form-input"
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Number of Devotees <span className="required">*</span>
                  </label>
                  <select
                    name="devoteeCount"
                    value={formData.devoteeCount}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value={1}>1 Devotee</option>
                    <option value={2}>2 Devotees (Couple)</option>
                    <option value={3}>3 Devotees</option>
                    <option value={4}>4 Devotees (Family)</option>
                    <option value={5}>5 Devotees</option>
                    <option value={6}>6+ Devotees (Joint Family)</option>
                  </select>
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', margin: '1.5rem 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} color="var(--saffron)" />
                <span>Date & Auspicious Slot</span>
              </h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Preferred Booking Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="bookingDate"
                    value={formData.bookingDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="form-input"
                  />
                  {errors.bookingDate && <div className="form-error">{errors.bookingDate}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Available Time Slot <span className="required">*</span>
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {currentPooja.timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.timeSlot && <div className="form-error">{errors.timeSlot}</div>}
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', margin: '1.5rem 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--saffron)" />
                <span>Sankalpam Details (Optional)</span>
              </h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Gotra (Gothram)</label>
                  <input
                    type="text"
                    name="gotra"
                    value={formData.gotra}
                    onChange={handleInputChange}
                    placeholder="E.g., Kashyapa, Bharadwaja, Vashishta"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nakshatra / Janma Star</label>
                  <input
                    type="text"
                    name="nakshatra"
                    value={formData.nakshatra}
                    onChange={handleInputChange}
                    placeholder="E.g., Rohini, Ashwini, Uttara"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Requests / Sankalpam Prayer Intention</label>
                <textarea
                  rows={3}
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="E.g., Wedding anniversary blessings, child's birthday, health recovery, or wheelchair requirement..."
                  className="form-textarea"
                />
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1rem 2rem', fontSize: '1.05rem' }}
                >
                  <Flame size={20} />
                  <span>{isSubmitting ? 'Confirming Sacred Slot...' : 'Submit Booking & Generate Pass'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                <ShieldCheck size={16} color="var(--auspicious-green)" />
                <span>Frontend Demo Flow • Instant confirmation pass without financial lock</span>
              </div>
            </form>
          </div>

          {/* Sticky Live Summary Sidebar */}
          <div className="booking-summary-sidebar">
            <div className="summary-header">
              <span className="badge-temple badge-gold" style={{ marginBottom: '0.5rem' }}>
                Live Booking Summary
              </span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-brown)' }}>
                {currentPooja.name}
              </h3>
              <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                Deity: {currentPooja.deity}
              </span>
            </div>

            <div>
              <div className="summary-row">
                <span className="summary-label">Duration</span>
                <span className="summary-value">{currentPooja.duration}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Preferred Date</span>
                <span className="summary-value">{formData.bookingDate || 'Not selected'}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Time Slot</span>
                <span className="summary-value">{formData.timeSlot}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Devotees</span>
                <span className="summary-value">{formData.devoteeCount} Person(s)</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Primary Devotee</span>
                <span className="summary-value">{formData.devoteeName || 'Devotee'}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Gotra</span>
                <span className="summary-value">{formData.gotra || 'Kashyapa'}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Prasadam Included</span>
                <span className="summary-value" style={{ fontSize: '0.8rem', maxWidth: '60%' }}>
                  {currentPooja.prasadam}
                </span>
              </div>
            </div>

            <div className="summary-total-box">
              <span className="summary-total-label">Dakshina Contribution:</span>
              <span className="summary-total-amt">₹ {currentPooja.dakshina}</span>
            </div>

            <div style={{
              background: 'var(--cream)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginTop: '1.25rem',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: '1.5'
            }}>
              <strong>Temple Guidelines:</strong><br />
              • Please arrive in traditional attire.<br />
              • Electronic devices to be silenced in sanctum.<br />
              • Reporting time: 20 mins before slot.
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Receipt Modal */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        data={confirmedBooking}
        type="booking"
      />
    </div>
  );
};

export default PoojaBookingPage;
