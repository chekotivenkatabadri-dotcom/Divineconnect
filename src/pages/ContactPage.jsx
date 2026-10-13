import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle,
  Compass
} from 'lucide-react';
import { TEMPLE_INFO, FAQS } from '../data/templeData';
import { playTempleBell } from '../utils/soundEffects';
import { apiService } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a message subject';
    if (!formData.message.trim()) errs.message = 'Please provide details of your inquiry';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Sync inquiry to Spring Boot backend
    apiService.submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    });

    setTimeout(() => {
      setIsSubmitting(false);
      playTempleBell();
      setSubmittedSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 600);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="contact-page">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-badge">
            <Phone size={14} />
            <span>Devotee Assistance & Information</span>
          </div>
          <h1 className="page-hero-title">Contact & Temple Information</h1>
          <p className="page-hero-subtitle">
            Have questions regarding Darshan queues, specialized pooja arrangements, or temple accommodation? We are here to assist.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="contact-layout-grid">
          {/* Left Column: Sample Contact Details */}
          <div className="contact-info-panel">
            <div className="info-card-item">
              <div className="info-icon-wrapper">
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.3rem' }}>
                  Temple Kshetram Address
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Ayappa Colony, Ayyappa Colony, Dammaiguda, Hyderabad, Secunderabad, Telangana - 500083
                </p>
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', background: 'var(--cream)', border: '1px solid var(--border-gold)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--primary-brown)', fontWeight: 600 }}>
                    📍 Plus Code: FHWV+59 Dammaiguda
                  </span>
                  <span style={{ fontSize: '0.78rem', background: '#FEF3C7', border: '1px solid #F59E0B', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#B45309', fontWeight: 600 }}>
                    ⭐ 4.8 Rating (346+ Devotee Reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-wrapper">
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.3rem' }}>
                  Devotee Helpline & Seva Desk
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Direct Mobile: <a href="tel:07729075179" style={{ color: 'var(--saffron-dark)', fontWeight: 700 }}>077290 75179</a><br />
                  Office Helpline: <a href="tel:+917729075179" style={{ color: 'var(--saffron-dark)', fontWeight: 700 }}>+91 77290 75179</a>
                </p>
                <span style={{ fontSize: '0.8rem', color: 'var(--auspicious-green)', fontWeight: 600, marginTop: '0.4rem', display: 'block' }}>
                  Devotee call lines active daily (06:00 AM – 09:30 PM)
                </span>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-wrapper">
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.3rem' }}>
                  Electronic Inquiries
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  General Seva: {TEMPLE_INFO.email}<br />
                  Devasthanam Trust: trust@srivaritemple-dammaiguda.org
                </p>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-wrapper">
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.3rem' }}>
                  Darshan Hours
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Morning Darshan: 06:00 AM – 11:30 AM<br />
                  Evening Darshan Reopens: <strong>05:30 PM – 09:30 PM</strong>
                </p>
                <span style={{ fontSize: '0.78rem', color: 'var(--saffron-dark)', fontWeight: 600, marginTop: '0.3rem', display: 'block' }}>
                  Opens promptly at 5:30 PM for Evening Aarti
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-panel">
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>
              Send an Inquiry or Prayer Request
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.8rem' }}>
              Our temple administrative team will respond within 24 to 48 hours.
            </p>

            {submittedSuccess ? (
              <div style={{
                background: 'rgba(21, 128, 61, 0.08)',
                border: '2px solid #15803D',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                textAlign: 'center',
                color: '#15803D',
                animation: 'fadeIn 0.3s ease'
              }}>
                <CheckCircle2 size={44} style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Message Received with Reverence!
                </h4>
                <p style={{ color: 'var(--dark-text)', fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                  Thank you for writing to DivineConnect. A member of our Seva helpdesk has received your query and will assist you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedSuccess(false)}
                  className="btn btn-outline-brown btn-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label">
                      Your Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="E.g., Ananya Deshmukh"
                      className="form-input"
                    />
                    {formErrors.name && <div className="form-error">{formErrors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ananya@example.com"
                      className="form-input"
                    />
                    {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Subject / Topic <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="E.g., Senior Citizen Darshan"
                      className="form-input"
                    />
                    {formErrors.subject && <div className="form-error">{formErrors.subject}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Your Message / Question <span className="required">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your inquiry, preferred dates, or special accommodations needed..."
                    className="form-textarea"
                  />
                  {formErrors.message && <div className="form-error">{formErrors.message}</div>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Sending to Temple Helpdesk...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Location / Real Google Map Frame */}
        <div className="temple-map-frame">
          <div className="map-header-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} color="var(--gold)" />
              <strong style={{ color: 'var(--gold-light)' }}>
                Sri Venkateshwara Swamy Devasthanam • Live Map & Directions
              </strong>
            </div>
            <a 
              href="https://www.google.com/maps/place/500083,+Dammaiguda+Rd/@17.4972087,78.5880938,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
            >
              <MapPin size={14} />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div style={{ position: 'relative' }}>
            <iframe
              title="Sri Venkateshwara Swamy Devasthanam Dammaiguda Google Map"
              src="https://maps.google.com/maps?q=17.4972087,78.5880938&z=16&output=embed"
              width="100%"
              height="360"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen=""
            />

            <div style={{
              background: '#FFFFFF',
              borderTop: '2px solid var(--border-gold)',
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-brown)', display: 'block' }}>
                  Sri Venkateshwara Swamy Devasthanam (Gayathri Temple)
                </strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Ayappa Colony, Dammaiguda, Hyderabad, Secunderabad, Telangana 500083 • Phone: 077290 75179
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a 
                  href="https://www.google.com/maps/dir//17.4972087,78.5880938"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Compass size={14} />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: '5.5rem' }}>
          <div className="section-header">
            <div className="section-tag">
              <HelpCircle size={14} />
              <span>Devotee Assistance</span>
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="sacred-divider">
              <span className="sacred-divider-icon">ॐ</span>
            </div>
            <p className="section-subtitle">
              Quick answers regarding darshan entry, dress code etiquette, and online bookings.
            </p>
          </div>

          <div className="faq-list-container">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="faq-item-card">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="faq-question-btn"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--saffron)" /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
