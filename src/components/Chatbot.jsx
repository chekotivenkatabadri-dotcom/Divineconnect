import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  X, 
  MessageSquare, 
  Flame, 
  ChevronRight, 
  Calendar, 
  Clock, 
  HeartHandshake, 
  PhoneCall,
  BellRing
} from 'lucide-react';
import { playTempleBell } from '../utils/soundEffects';

const BOT_RESPONSES = [
  {
    keywords: ['time', 'timings', 'darshan', 'open', 'hours', 'schedule', 'aarti'],
    response: "🛕 The Kshetram opens daily at 05:00 AM and closes at 10:00 PM. Morning Sarva Darshan is from 06:00 AM to 11:30 AM, Afternoon Darshan is 03:30 PM to 06:30 PM, and Sandhya Maha Mangala Aarti is held at 06:45 PM.",
    actionLink: { to: '/contact', label: 'View Full Schedule' }
  },
  {
    keywords: ['book', 'booking', 'pooja', 'puja', 'archana', 'abhishekam', 'kalyanotsavam', 'vrath', 'dakshina'],
    response: "🙏 You can easily book sacred poojas online! We offer Sri Maha Rudrabhishekam (₹1,100), Sahasranama Archana (₹500), Nitya Kalyanotsavam (₹2,500), and Satyanarayan Vratham (₹1,500). Devotees receive sacred prasadam and an instant digital e-Pass.",
    actionLink: { to: '/pooja-booking', label: 'Book a Pooja Now' }
  },
  {
    keywords: ['festival', 'festivals', 'event', 'events', 'utsav', 'shivaratri', 'brahmotsavam', 'diwali', 'navami'],
    response: "🚩 Upcoming grand festivals at the temple include: Maha Shivaratri (March 8, 2026), Sri Rama Navami & Sitarama Kalyanam (April 17, 2026), and the 9-Day Salakatla Brahmotsavam (October 2026). Special sevas are open for registration!",
    actionLink: { to: '/events', label: 'Explore Festivals' }
  },
  {
    keywords: ['donate', 'donation', 'hundi', 'annadanam', 'goshala', '80g', 'money', 'contribution', 'fund'],
    response: "🌸 Devotees can offer Seva through our transparent E-Hundi! Offerings for Nitya Annadanam (feeding pilgrims), Sri Krishna Goshala (cow protection), and Veda Patashala are eligible for Section 80G (50% Tax Exemption) with immediate downloadable certificates.",
    actionLink: { to: '/donation', label: 'Offer Seva / E-Hundi' }
  },
  {
    keywords: ['dress', 'code', 'cloth', 'wear', 'costume', 'guideline'],
    response: "✨ Traditional Indian Attire is respectfully required. Gentlemen: Dhoti with Angavastram or Kurta-Pajama. Ladies: Traditional Saree, Half-saree, or Churidar with Dupatta. Western casuals, shorts, and jeans are respectfully avoided in the inner sanctum.",
    actionLink: null
  },
  {
    keywords: ['contact', 'phone', 'address', 'location', 'reach', 'email', 'map'],
    response: "📞 You can reach Sri Venkateshwara Swamy Devasthanam at 077290 75179 or +91 77290 75179. The temple is located at Ayappa Colony, Dammaiguda, Hyderabad, Secunderabad, Telangana - 500083 (Plus Code: FHWV+59).",
    actionLink: { to: '/contact', label: 'View Live Google Map' }
  },
  {
    keywords: ['prasad', 'prasadam', 'food', 'meal', 'lunch', 'dinner', 'laddu'],
    response: "🍚 Sacred Annaprasadam is served free to all pilgrims daily from 12:00 PM to 03:00 PM and 07:30 PM to 09:30 PM at Sri Annapoorna Seva Hall. Sanctum Tirupati Laddus and Panchamritam are provided with all booked sevas.",
    actionLink: { to: '/donation', label: 'Sponsor Annadanam' }
  }
];

const DEFAULT_RESPONSE = {
  response: "🙏 Namaste Devotee! I am the DivineConnect Assistant. I can help you with Pooja Bookings, Temple Timings, Upcoming Festivals, E-Hundi Donations, Dress Code, and Contact Details. Please feel free to ask or pick a suggestion below!",
  actionLink: null
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! Welcome to DivineConnect – Temple Management & Devotee Service System. How may I assist your spiritual visit today? 🙏",
      timestamp: 'Just now',
      actionLink: { to: '/pooja-booking', label: 'Book a Pooja' }
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Formulate bot response
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matched = BOT_RESPONSES.find((item) =>
        item.keywords.some((k) => lowerQuery.includes(k))
      );

      const botReply = matched || DEFAULT_RESPONSE;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink: botReply.actionLink
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const quickChips = [
    { label: "Pooja Timings", query: "What are the temple darshan timings?" },
    { label: "Book Pooja", query: "How to book a pooja online?" },
    { label: "Upcoming Festivals", query: "What are the upcoming festivals?" },
    { label: "Annadanam Donation", query: "Tell me about Annadanam donation and 80G tax benefit" },
    { label: "Temple Dress Code", query: "What is the dress code to enter the temple?" }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => { setIsOpen(true); playTempleBell(); }} 
          className="chatbot-floating-trigger"
          aria-label="Open DivineConnect Assistant"
        >
          <div className="bot-icon-circle">
            <Flame size={20} className="diya-glowing" />
            <span className="bot-ping-badge"></span>
          </div>
          <div className="bot-trigger-text">
            <span className="bot-trigger-title">DivineConnect Assistant</span>
            <span className="bot-trigger-sub">Live Devotee Helpdesk</span>
          </div>
        </button>
      )}

      {/* Chat Drawer */}
      {isOpen && (
        <div className="chatbot-drawer">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chat-header-info">
              <div className="chat-header-avatar">
                <Flame size={20} />
              </div>
              <div className="chat-header-titles">
                <h4>DivineConnect Assistant</h4>
                <div className="chat-header-status">
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }}></span>
                  <span>Online • Temple Seva AI</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)} 
              className="chat-close-btn"
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="chat-chips-container">
            {quickChips.map((chip, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSendMessage(chip.query)}
                className="chat-chip"
              >
                <span>🪔</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="chat-messages-area">
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`chat-bubble ${m.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}
              >
                <p>{m.text}</p>
                {m.actionLink && (
                  <Link 
                    to={m.actionLink.to} 
                    onClick={() => setIsOpen(false)}
                    className="chat-bot-action-link"
                  >
                    <span>{m.actionLink.label}</span>
                    <ChevronRight size={13} />
                  </Link>
                )}
                <span className="chat-timestamp">{m.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleFormSubmit} className="chatbot-input-bar">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about Poojas, Timings, Sevas..."
              className="chat-text-input"
            />
            <button 
              type="submit" 
              className="chat-send-btn" 
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
