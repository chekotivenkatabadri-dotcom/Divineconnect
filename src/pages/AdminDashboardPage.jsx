import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Calendar, 
  Users, 
  HeartHandshake, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Filter, 
  ArrowUpRight, 
  ShieldCheck,
  TrendingUp,
  Download,
  AlertCircle
} from 'lucide-react';
import { MOCK_ADMIN_DATA, FESTIVALS, POOJAS } from '../data/templeData';
import { playTempleBell } from '../utils/soundEffects';
import { apiService } from '../services/api';

const AdminDashboardPage = () => {
  const [activeSection, setActiveSection] = useState('overview'); // overview, bookings, events, devotees, donations
  const [bookings, setBookings] = useState(MOCK_ADMIN_DATA.recentBookings);
  const [eventsList, setEventsList] = useState(FESTIVALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Add Event Modal State
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEventData, setNewEventData] = useState({
    name: '',
    date: '',
    timing: '08:00 AM - 12:00 PM',
    description: '',
    highlights: 'Vedic Pooja, Prasadam Distribution'
  });

  // Load live data from Spring Boot backend on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const liveBookings = await apiService.getBookings();
        if (liveBookings && liveBookings.length > 0) {
          const formatted = liveBookings.map((b) => ({
            id: b.referenceNumber || `DC-${b.id}`,
            backendId: b.id,
            devoteeName: b.devoteeName,
            phone: b.phone,
            email: b.email,
            pooja: b.poojaName,
            date: b.bookingDate,
            timeSlot: b.timeSlot,
            amount: b.amount,
            status: b.status || 'Confirmed'
          }));
          setBookings(formatted);
        }

        const liveEvents = await apiService.getEvents();
        if (liveEvents && liveEvents.length > 0) {
          const formattedEvents = liveEvents.map((ev) => ({
            id: `event-${ev.id}`,
            backendId: ev.id,
            name: ev.name,
            sanskritTitle: ev.sanskritTitle,
            date: ev.eventDate,
            timing: ev.timing,
            description: ev.description,
            highlights: ev.highlights ? ev.highlights.split(',').map((h) => h.trim()) : [],
            image: ev.imageUrl || '/images/temple-aarti.png',
            status: ev.status || 'Upcoming Festival'
          }));
          setEventsList(formattedEvents);
        }
      } catch (err) {
        console.warn('Backend currently offline, loaded fallback mock records.');
      }
    };

    fetchBackendData();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          if (b.backendId) {
            apiService.updateBookingStatus(b.backendId, newStatus);
          }
          return { ...b, status: newStatus };
        }
        return b;
      })
    );
    playTempleBell();
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEventData.name || !newEventData.date) return;

    const created = {
      id: `event-${Date.now()}`,
      name: newEventData.name,
      date: newEventData.date,
      timing: newEventData.timing,
      description: newEventData.description || 'Special temple ritual and auspicious gathering.',
      highlights: newEventData.highlights.split(',').map((h) => h.trim()),
      image: '/images/temple-aarti.png',
      status: 'Upcoming Festival'
    };

    // Save to Spring Boot backend
    apiService.createEvent({
      name: newEventData.name,
      sanskritTitle: newEventData.name,
      eventDate: newEventData.date,
      timing: newEventData.timing,
      description: newEventData.description,
      highlights: newEventData.highlights,
      status: 'Upcoming Festival',
      imageUrl: '/images/temple-aarti.png'
    });

    setEventsList((prev) => [created, ...prev]);
    setIsAddEventOpen(false);
    setNewEventData({
      name: '',
      date: '',
      timing: '08:00 AM - 12:00 PM',
      description: '',
      highlights: 'Vedic Pooja, Prasadam Distribution'
    });
    playTempleBell();
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.devoteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pooja.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-layout-container">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gold)',
            color: 'var(--primary-brown-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '1.05rem', lineHeight: '1.1' }}>
              Kshetram Admin
            </h4>
            <span style={{ fontSize: '0.72rem', color: '#FFF2A3' }}>Temple Office Portal</span>
          </div>
        </div>

        <ul className="admin-sidebar-menu">
          <li>
            <button
              onClick={() => setActiveSection('overview')}
              className={`admin-menu-item-btn ${activeSection === 'overview' ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} />
              <span>Overview & Stats</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('bookings')}
              className={`admin-menu-item-btn ${activeSection === 'bookings' ? 'active' : ''}`}
            >
              <Flame size={18} />
              <span>Pooja Bookings</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('events')}
              className={`admin-menu-item-btn ${activeSection === 'events' ? 'active' : ''}`}
            >
              <Calendar size={18} />
              <span>Event Management</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('devotees')}
              className={`admin-menu-item-btn ${activeSection === 'devotees' ? 'active' : ''}`}
            >
              <Users size={18} />
              <span>Devotee Directory</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('donations')}
              className={`admin-menu-item-btn ${activeSection === 'donations' ? 'active' : ''}`}
            >
              <HeartHandshake size={18} />
              <span>Donation Hundi</span>
            </button>
          </li>
        </ul>

        <div className="admin-sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#86EFAC', marginBottom: '0.3rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }}></span>
            <span>Frontend Mock Console</span>
          </div>
          <span>College Demo Presentation Mode</span>
        </div>
      </aside>

      {/* Main Admin Content Panel */}
      <main className="admin-main-panel">
        {/* Top Bar */}
        <div className="admin-top-bar">
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-brown)', marginBottom: '0.2rem' }}>
              {activeSection === 'overview' && 'Temple Operations Overview'}
              {activeSection === 'bookings' && 'Pooja Bookings Management'}
              {activeSection === 'events' && 'Festivals & Event Schedules'}
              {activeSection === 'devotees' && 'Registered Devotees & VIP Donors'}
              {activeSection === 'donations' && 'E-Hundi & Charitable Seva Accounts'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Real-time demo administrative console for priests and temple executive officers.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {activeSection === 'events' && (
              <button 
                onClick={() => setIsAddEventOpen(true)} 
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} />
                <span>Add New Festival</span>
              </button>
            )}
            <button 
              onClick={() => alert("Mock export complete: CSV report downloaded.")} 
              className="btn btn-outline-brown btn-sm"
            >
              <Download size={14} />
              <span>Export Records</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="admin-stat-cards-grid">
          <div className="admin-stat-card">
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Pooja Bookings
              </span>
              <div className="admin-stat-number">{MOCK_ADMIN_DATA.stats.totalBookings}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--auspicious-green)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.3rem' }}>
                <TrendingUp size={12} />
                <span>+12.4% from last week</span>
              </div>
            </div>
            <div className="admin-stat-icon-wrap" style={{ background: 'rgba(217, 119, 6, 0.12)', color: 'var(--saffron)' }}>
              <Flame size={24} />
            </div>
          </div>

          <div className="admin-stat-card">
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Hundi Donations (YTD)
              </span>
              <div className="admin-stat-number">{MOCK_ADMIN_DATA.stats.totalHundiDonations}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--auspicious-green)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.3rem' }}>
                <TrendingUp size={12} />
                <span>100% Tax Compliant</span>
              </div>
            </div>
            <div className="admin-stat-icon-wrap" style={{ background: 'rgba(21, 128, 61, 0.12)', color: 'var(--auspicious-green)' }}>
              <HeartHandshake size={24} />
            </div>
          </div>

          <div className="admin-stat-card">
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Registered Devotees
              </span>
              <div className="admin-stat-number">{MOCK_ADMIN_DATA.stats.registeredDevotees}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--saffron-dark)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.3rem' }}>
                <span>Across 18 States</span>
              </div>
            </div>
            <div className="admin-stat-icon-wrap" style={{ background: 'rgba(109, 47, 12, 0.12)', color: 'var(--primary-brown)' }}>
              <Users size={24} />
            </div>
          </div>

          <div className="admin-stat-card">
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Active Festival Utsavs
              </span>
              <div className="admin-stat-number">{eventsList.length}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary-brown)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.3rem' }}>
                <span>Scheduled for 2026</span>
              </div>
            </div>
            <div className="admin-stat-icon-wrap" style={{ background: 'rgba(255, 215, 0, 0.25)', color: 'var(--primary-brown-dark)' }}>
              <Calendar size={24} />
            </div>
          </div>
        </div>

        {/* SECTION: Overview or Bookings -> Recent Bookings Table */}
        {(activeSection === 'overview' || activeSection === 'bookings') && (
          <div className="admin-table-card">
            <div className="table-header-bar">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-brown)' }}>
                Recent Devotee Pooja Bookings
              </h3>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search Devotee, ID, or Pooja..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '0.5rem 0.8rem',
                    border: '1px solid var(--border-gold)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.86rem'
                  }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Pass ID</th>
                    <th>Devotee Name</th>
                    <th>Pooja Ritual</th>
                    <th>Date & Slot</th>
                    <th>Gotra</th>
                    <th>Dakshina</th>
                    <th>Status</th>
                    <th>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 700, color: 'var(--primary-brown)' }}>{b.id}</td>
                      <td>
                        <strong>{b.devoteeName}</strong>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{b.phone}</div>
                      </td>
                      <td>{b.pooja}</td>
                      <td>
                        {b.date}
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{b.slot}</div>
                      </td>
                      <td>{b.gotra}</td>
                      <td style={{ fontWeight: 700, color: 'var(--saffron-dark)' }}>{b.dakshina}</td>
                      <td>
                        <span className={`status-badge status-${b.status.toLowerCase()}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {b.status !== 'Confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'Confirmed')}
                              style={{
                                padding: '0.25rem 0.5rem',
                                background: 'rgba(21, 128, 61, 0.12)',
                                color: '#15803D',
                                border: '1px solid #15803D',
                                borderRadius: '4px',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                              title="Approve pass"
                            >
                              Confirm
                            </button>
                          )}
                          {b.status !== 'Completed' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'Completed')}
                              style={{
                                padding: '0.25rem 0.5rem',
                                background: 'rgba(109, 47, 12, 0.12)',
                                color: 'var(--primary-brown)',
                                border: '1px solid var(--primary-brown)',
                                borderRadius: '4px',
                                fontSize: '0.74rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                              title="Mark ritual completed"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: Events Management */}
        {activeSection === 'events' && (
          <div className="admin-table-card">
            <div className="table-header-bar">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-brown)' }}>
                Active Temple Festivals & Processions
              </h3>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Festival Name</th>
                    <th>Date</th>
                    <th>Timings</th>
                    <th>Key Highlights</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsList.map((e) => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: 700, color: 'var(--primary-brown)' }}>
                        {e.name}
                      </td>
                      <td>{e.date}</td>
                      <td>{e.timing}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {e.highlights?.map((h, i) => (
                            <span key={i} style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem', background: 'var(--cream)', borderRadius: '4px' }}>
                              {h}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setEventsList(eventsList.filter((x) => x.id !== e.id));
                            playTempleBell();
                          }}
                          style={{
                            padding: '0.25rem 0.5rem',
                            background: 'rgba(185, 28, 28, 0.1)',
                            color: '#B91C1C',
                            border: '1px solid #B91C1C',
                            borderRadius: '4px',
                            fontSize: '0.74rem',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: Devotee Directory */}
        {activeSection === 'devotees' && (
          <div className="admin-table-card">
            <div className="table-header-bar">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-brown)' }}>
                Devotee Seva Members & VIP Donors
              </h3>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Devotee ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>City</th>
                    <th>Membership Tier</th>
                    <th>Total Sevas</th>
                    <th>Last Darshan</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ADMIN_DATA.devoteeDirectory.map((dev) => (
                    <tr key={dev.id}>
                      <td style={{ fontWeight: 700 }}>{dev.id}</td>
                      <td style={{ fontWeight: 600, color: 'var(--primary-brown)' }}>{dev.name}</td>
                      <td>
                        {dev.email}
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{dev.phone}</div>
                      </td>
                      <td>{dev.city}</td>
                      <td>
                        <span className={`badge-temple ${dev.tier.includes('VIP') ? 'badge-gold' : 'badge-saffron'}`}>
                          {dev.tier}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>{dev.totalSevas}</td>
                      <td>{dev.lastVisit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION: Donation Hundi */}
        {activeSection === 'donations' && (
          <div className="admin-table-card">
            <div className="table-header-bar">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-brown)' }}>
                Recent E-Hundi Offerings & 80G Dispatches
              </h3>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Transaction Ref</th>
                    <th>Donor Name</th>
                    <th>Seva Cause</th>
                    <th>Contribution Amount</th>
                    <th>Timestamp</th>
                    <th>80G Tax Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ADMIN_DATA.recentDonations.map((d) => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 700 }}>{d.id}</td>
                      <td style={{ fontWeight: 600 }}>{d.donor}</td>
                      <td>{d.cause}</td>
                      <td style={{ fontWeight: 700, color: 'var(--saffron-dark)' }}>{d.amount}</td>
                      <td>{d.date}</td>
                      <td>
                        <span className="badge-temple badge-green">80G Certificate Issued</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add Event Modal */}
      {isAddEventOpen && (
        <div className="modal-overlay" onClick={() => setIsAddEventOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-brown)', marginBottom: '0.4rem' }}>
              Schedule New Temple Festival
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Add a new religious celebration to the DivineConnect festival calendar.
            </p>

            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label className="form-label">Festival / Utsav Name</label>
                <input
                  type="text"
                  value={newEventData.name}
                  onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                  placeholder="E.g., Hanuman Jayanti Mahotsavam"
                  className="form-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    value={newEventData.date}
                    onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ritual Timings</label>
                  <input
                    type="text"
                    value={newEventData.timing}
                    onChange={(e) => setNewEventData({ ...newEventData, timing: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={2}
                  value={newEventData.description}
                  onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                  placeholder="Brief description of the divine significance..."
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Highlights (comma-separated)</label>
                <input
                  type="text"
                  value={newEventData.highlights}
                  onChange={(e) => setNewEventData({ ...newEventData, highlights: e.target.value })}
                  placeholder="Special Abhishekam, Chariot Procession, Annadanam"
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAddEventOpen(false)}
                  className="btn btn-outline-brown btn-sm"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1.5 }}
                >
                  Publish Festival
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
