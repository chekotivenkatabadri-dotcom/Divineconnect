import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Landmark, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCw, 
  User, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';
import { apiService } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();

  // Tab mode: 'login' or 'register'
  const [activeTab, setActiveTab] = useState('login');

  // Login form state (Gmail & Password)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regGotra, setRegGotra] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Status & feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Gmail / Password Sign In
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both your Gmail / Email address and password');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const res = await apiService.login(email.trim(), password.trim());
      if (res && res.success) {
        playTempleBell();
        setLoginSuccess(true);
        const displayName = res.devoteeName || 'Devotee';
        setSuccessMessage(`Namaste, ${displayName}! Signed in successfully.`);

        setTimeout(() => {
          if (res.role === 'ADMIN' || email.toLowerCase().includes('admin')) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1200);
      } else {
        setError(res?.message || 'Invalid Gmail address or password. Please try again.');
      }
    } catch {
      setError('Authentication failed. Please verify your credentials and connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle New Devotee Registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Please provide Name, Gmail address, and Password');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters in length');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const newDevotee = {
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword.trim(),
        phone: regPhone.trim() || '',
        gotra: regGotra.trim() || 'Kashyapa',
        role: 'DEVOTEE',
        membershipTier: 'Bhakta Member',
        city: 'Hyderabad'
      };

      const res = await apiService.register(newDevotee);
      if (res && res.success) {
        playTempleBell();
        setLoginSuccess(true);
        setSuccessMessage(`Welcome to Srivari Portal, ${regName.trim()}! Account created successfully.`);

        setTimeout(() => {
          navigate('/');
        }, 1400);
      } else {
        setError(res?.message || 'Registration failed. Email may already be registered.');
      }
    } catch {
      setError('Registration service currently unavailable. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick 1-Click Demo Fill
  const handleDemoDevotee = () => {
    setActiveTab('login');
    setEmail('devotee@gmail.com');
    setPassword('srivari123');
    setError('');
  };

  const handleDemoAdmin = () => {
    setActiveTab('login');
    setEmail('admin@srivari.org');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        {/* Sacred Temple Header */}
        <div className="auth-card-header">
          <div className="auth-logo-badge">
            <Landmark size={28} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--gold, #D4AF37)', marginBottom: '0.25rem' }}>
            DivineConnect
          </h2>
          <span style={{ fontSize: '0.78rem', color: '#FFF2A3', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            SRIVARI DEVOTEE & SEVA PORTAL
          </span>
        </div>

        {/* Card Body */}
        <div className="auth-card-body">
          {/* Sign In vs Register Tabs */}
          <div className="auth-toggle-tabs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            >
              <User size={16} />
              <span>Sign In with Gmail</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            >
              <Sparkles size={16} />
              <span>New Devotee Register</span>
            </button>
          </div>

          {/* Success Notification */}
          {loginSuccess && (
            <div style={{
              background: 'rgba(21, 128, 61, 0.1)',
              border: '1.5px solid #15803D',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#15803D',
              fontSize: '0.92rem',
              fontWeight: 600
            }}>
              <CheckCircle2 size={22} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgba(220, 38, 38, 0.08)',
              border: '1px solid #DC2626',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: '#DC2626',
              fontSize: '0.88rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 1: GMAIL & PASSWORD SIGN IN                          */}
          {/* ======================================================== */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              {/* Gmail / Email Field */}
              <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                  Gmail / Email Address <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="e.g. devotee@gmail.com"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    autoFocus
                    required
                  />
                  <Mail 
                    size={17} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-muted, #78716C)' 
                    }} 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label className="form-label" style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 0 }}>
                    Password <span className="required">*</span>
                  </label>
                </div>
                <div className="password-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your password"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', paddingRight: '42px' }}
                    required
                  />
                  <Lock 
                    size={17} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-muted, #78716C)' 
                    }} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-eye"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Help */}
              <div className="auth-remember-row" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer', fontSize: '0.86rem', color: 'var(--text-main, #333)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--saffron-dark, #C25E00)' }}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Please contact Temple Support at 077290 75179 or reset via admin@srivari.org')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--saffron-dark, #C25E00)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '1.02rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem'
                }}
              >
                {isSubmitting ? (
                  <>
                    <RotateCw size={18} className="spin-animation" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Switch to Register footer */}
              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted, #78716C)' }}>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setError('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--saffron-dark, #C25E00)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline'
                  }}
                >
                  Register here
                </button>
              </div>

              {/* Quick Demo Credentials */}
              <div className="demo-account-pills">
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-brown, #4A1E07)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ⚡ Quick Demo Login (One-Click Auto-fill)
                </span>
                <div className="demo-pills-grid">
                  <button
                    type="button"
                    onClick={handleDemoDevotee}
                    className="demo-chip-btn"
                  >
                    <span>🙏 Devotee Account</span>
                    <span className="demo-chip-label">devotee@gmail.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDemoAdmin}
                    className="demo-chip-btn"
                  >
                    <span>🛡️ Temple Admin</span>
                    <span className="demo-chip-label">admin@srivari.org</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* TAB 2: NEW DEVOTEE REGISTRATION                          */}
          {/* ======================================================== */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              {/* Full Name */}
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  Full Devotee Name <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="E.g. Suresh Sharma"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                  <User 
                    size={17} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-muted, #78716C)' 
                    }} 
                  />
                </div>
              </div>

              {/* Gmail Address */}
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  Gmail / Email Address <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                  <Mail 
                    size={17} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-muted, #78716C)' 
                    }} 
                  />
                </div>
              </div>

              {/* Gotra & Contact Phone (Two columns) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>
                    Gotra (Optional)
                  </label>
                  <input
                    type="text"
                    value={regGotra}
                    onChange={(e) => setRegGotra(e.target.value)}
                    placeholder="E.g. Kashyapa"
                    className="form-input"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="9876543210"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  Create Password <span className="required">*</span>
                </label>
                <div className="password-input-wrap">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', paddingRight: '42px' }}
                    required
                  />
                  <Lock 
                    size={17} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-muted, #78716C)' 
                    }} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="password-toggle-eye"
                    aria-label="Toggle password visibility"
                  >
                    {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                  Confirm Password <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                  <Lock 
                    size={17} 
                    style={{ 
                      position: 'absolute', 
                      left: '12px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      color: 'var(--text-muted, #78716C)' 
                    }} 
                  />
                </div>
              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '1.02rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem'
                }}
              >
                {isSubmitting ? (
                  <>
                    <RotateCw size={18} className="spin-animation" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Create Devotee Account</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Switch back to Login */}
              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.88rem', color: 'var(--text-muted, #78716C)' }}>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setError('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--saffron-dark, #C25E00)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline'
                  }}
                >
                  Sign In here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
