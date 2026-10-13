import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  HeartHandshake, 
  Utensils, 
  Landmark, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Printer,
  Info
} from 'lucide-react';
import { DONATION_CAUSES, TEMPLE_INFO } from '../data/templeData';
import { playTempleBell } from '../utils/soundEffects';
import ReceiptModal from '../components/ReceiptModal';
import { apiService } from '../services/api';

const DonationPage = () => {
  const [selectedCauseId, setSelectedCauseId] = useState(DONATION_CAUSES[0].id);
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedDonation, setConfirmedDonation] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const suggestedAmounts = ['100', '500', '1000', '2000'];
  const currentCause = DONATION_CAUSES.find((c) => c.id === selectedCauseId) || DONATION_CAUSES[0];

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }));
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    setAmount(val);
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!donorName.trim()) newErrors.donorName = 'Please enter your name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please provide a valid email address';
    const finalAmt = parseInt(amount, 10);
    if (!finalAmt || isNaN(finalAmt) || finalAmt < 50) {
      newErrors.amount = 'Please choose or enter an amount (min ₹50)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      playTempleBell();

      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#D97706', '#E6B800', '#15803D']
      });

      const receiptRecord = {
        referenceNumber: `HUNDI-${Math.floor(10000 + Math.random() * 90000)}`,
        donorName: donorName,
        email: email,
        phone: phone || '+91 98765 00000',
        causeTitle: currentCause.title,
        amount: amount,
        panNumber: panNumber || 'XXXXX0000X',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      // Sync donation with Spring Boot backend
      apiService.submitDonation({
        referenceNumber: receiptRecord.referenceNumber,
        donorName: receiptRecord.donorName,
        email: receiptRecord.email,
        phone: receiptRecord.phone,
        causeTitle: receiptRecord.causeTitle,
        amount: parseFloat(receiptRecord.amount),
        panNumber: receiptRecord.panNumber,
        paymentStatus: 'SUCCESS'
      });

      setConfirmedDonation(receiptRecord);
      setShowReceiptModal(true);
    }, 600);
  };

  return (
    <div className="donation-page">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-badge">
            <HeartHandshake size={14} />
            <span>Nitya E-Hundi & Seva Offerings</span>
          </div>
          <h1 className="page-hero-title">Support Our Temple</h1>
          <p className="page-hero-subtitle">
            Every contribution directly supports sacred Annadanam meals, indigenous cow welfare, 
            and heritage restoration. Receive Section 80G tax benefits.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        {/* Notice of Frontend Only Demo Flow */}
        <div style={{
          background: 'rgba(217, 119, 6, 0.08)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '2.5rem'
        }}>
          <Info size={22} color="var(--saffron)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.88rem', color: 'var(--dark-text)' }}>
            <strong>Devotee Notice:</strong> This is a frontend demo interface for college project evaluation. 
            No real payments are collected and no financial transaction takes place. Submitting will simulate 
            an instant official 80G e-Receipt for demonstration purposes.
          </p>
        </div>

        {/* Confirmation banner if submitted */}
        {confirmedDonation && (
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
              <CheckCircle2 size={32} color="#15803D" />
              <div>
                <h4 style={{ color: '#15803D', fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                  E-Hundi Contribution Acknowledged! (Ref: #{confirmedDonation.referenceNumber})
                </h4>
                <p style={{ color: 'var(--dark-text)', fontSize: '0.9rem' }}>
                  Thank you, <strong>{confirmedDonation.donorName}</strong>. Your offering of <strong>₹{confirmedDonation.amount}</strong> toward <strong>{confirmedDonation.causeTitle}</strong> has been registered.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowReceiptModal(true)} 
              className="btn btn-primary btn-sm"
            >
              <Printer size={15} />
              <span>View / Print 80G Receipt</span>
            </button>
          </div>
        )}

        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Pavitra Daanam</span>
          </div>
          <h2 className="section-title">Select Seva Cause & Offering Amount</h2>
          <div className="sacred-divider">
            <span className="sacred-divider-icon">🙏</span>
          </div>
        </div>

        {/* Form and Sidebar */}
        <div className="donation-grid-layout">
          {/* Main Form Panel */}
          <div className="donation-form-panel">
            <form onSubmit={handleDonateSubmit}>
              {/* Step 1: Cause Selection */}
              <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.8rem' }}>
                1. Select Sacred Cause (Seva Purpose):
              </label>
              <div className="causes-selector-grid">
                {DONATION_CAUSES.map((cause) => {
                  const isSelected = cause.id === selectedCauseId;
                  return (
                    <div
                      key={cause.id}
                      onClick={() => setSelectedCauseId(cause.id)}
                      className={`cause-select-box ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="cause-box-title">{cause.title}</div>
                      <div className="cause-box-sanskrit">{cause.sanskrit}</div>
                    </div>
                  );
                })}
              </div>

              {/* Step 2: Suggested & Custom Amount */}
              <div style={{ marginTop: '2rem' }}>
                <label className="form-label" style={{ fontSize: '1rem', marginBottom: '0.8rem' }}>
                  2. Choose Offering Amount (₹ INR):
                </label>
                <div className="amount-chips-group">
                  {suggestedAmounts.map((amt) => {
                    const isSelected = amount === amt && !customAmount;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => handleAmountSelect(amt)}
                        className={`amount-chip-btn ${isSelected ? 'selected' : ''}`}
                      >
                        ₹ {amt}
                      </button>
                    );
                  })}
                </div>

                <div className="form-group">
                  <label className="form-label">Or Enter Custom Amount (₹)</label>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter any amount (e.g., 5000)"
                    className="form-input"
                  />
                  {errors.amount && <div className="form-error">{errors.amount}</div>}
                </div>
              </div>

              {/* Step 3: Donor Particulars */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-brown)', marginBottom: '1.2rem' }}>
                  3. Donor Details
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => {
                      setDonorName(e.target.value);
                      if (errors.donorName) setErrors((prev) => ({ ...prev, donorName: null }));
                    }}
                    placeholder="E.g., Dr. K. Srinivasan"
                    className="form-input"
                  />
                  {errors.donorName && <div className="form-error">{errors.donorName}</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                      }}
                      placeholder="donor@example.com"
                      className="form-input"
                    />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    PAN Number (Optional, for 80G Tax Exemption Certificate)
                  </label>
                  <input
                    type="text"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="form-input"
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                    Required by Income Tax Department under Sec 80G for donation claims.
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '2.5rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
                >
                  <HeartHandshake size={20} />
                  <span>{isSubmitting ? 'Generating 80G Seva Pass...' : `Continue Offering (₹ ${amount || '0'})`}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Sticky Sidebar: Seva Impact Breakdown */}
          <div className="donation-sidebar-panel">
            <span className="badge-temple badge-green" style={{ marginBottom: '0.65rem' }}>
              Tax Deductible
            </span>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', marginBottom: '0.5rem' }}>
              {currentCause.title}
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {currentCause.description}
            </p>

            <div style={{
              background: 'var(--cream)',
              border: '1.5px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--saffron-dark)', fontWeight: 700, marginBottom: '0.35rem' }}>
                <Sparkles size={16} />
                <span>Impact of Your Seva:</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--dark-text)', lineHeight: '1.5' }}>
                {currentCause.impactText}
              </p>
            </div>

            <div style={{
              borderTop: '1px solid rgba(109, 47, 12, 0.1)',
              paddingTop: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.86rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>100% funds directed to sanctum causes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>Instant digital 80G certificate PDF</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--auspicious-green)" />
                <span>Temple trust audited annually</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Explaining How Donations Support Temple Activities */}
        <div style={{ marginTop: '5.5rem' }}>
          <div className="section-header">
            <div className="section-tag">
              <ShieldCheck size={14} />
              <span>Sacred Transparency</span>
            </div>
            <h2 className="section-title">How Donations Support Temple Activities</h2>
            <div className="sacred-divider">
              <span className="sacred-divider-icon">🪔</span>
            </div>
            <p className="section-subtitle">
              The temple functions on the principle of self-sustaining community dharma. Here is how your sacred offerings make a daily difference:
            </p>
          </div>

          <div className="donation-impact-grid">
            <div className="impact-card">
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(217, 119, 6, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--saffron-dark)', marginBottom: '1rem' }}>
                <Utensils size={22} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.4rem' }}>
                25,000+ Daily Pilgrim Meals
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Providing fresh, hot, satvik meals with ghee sambar rice and sweet pongal to every devotee who steps through our gates.
              </p>
            </div>

            <div className="impact-card">
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(217, 119, 6, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--saffron-dark)', marginBottom: '1rem' }}>
                <HeartHandshake size={22} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.4rem' }}>
                Protection of 350+ Cows
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Nourishing pure indigenous Gir and Ongole cows with fresh organic greens, clean water, and dedicated veterinary clinics.
              </p>
            </div>

            <div className="impact-card">
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(217, 119, 6, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--saffron-dark)', marginBottom: '1rem' }}>
                <Landmark size={22} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.4rem' }}>
                Heritage Temple Renovation
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Restoring intricate monolithic granite carvings, brass kalashams, temple pushkarini tanks, and clean pilgrim sanitation facilities.
              </p>
            </div>

            <div className="impact-card">
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(217, 119, 6, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--saffron-dark)', marginBottom: '1rem' }}>
                <GraduationCap size={22} />
              </div>
              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-brown)', marginBottom: '0.4rem' }}>
                Veda Patashala Gurukulam
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Funding free residential Vedic learning for 120 young students undergoing intensive training in Vedas, Agamas, and Sanskrit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        data={confirmedDonation}
        type="donation"
      />
    </div>
  );
};

export default DonationPage;
