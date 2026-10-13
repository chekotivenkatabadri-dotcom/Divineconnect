import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ZoomIn 
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/templeData';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Architecture', 'Pooja', 'Festivals', 'Devotional'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const showPrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const activePhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="gallery-page">
      {/* Banner */}
      <div className="page-hero-banner">
        <div className="container">
          <div className="page-hero-badge">
            <Camera size={14} />
            <span>Sacred Visual Journey</span>
          </div>
          <h1 className="page-hero-title">Divine Temple Gallery</h1>
          <p className="page-hero-subtitle">
            Glimpses into ancient sculpted gopurams, pious pooja rituals, joyous festival processions, and devotional life.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        {/* Category Filter Tabs */}
        <div className="gallery-filter-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="gallery-card-item"
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-card-img"
                onError={(e) => { e.target.src = "/images/temple-hero.png"; }}
              />
              <div className="gallery-overlay-meta">
                <span className="gallery-item-category">{item.category}</span>
                <h4 className="gallery-item-title">{item.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.4rem', color: 'var(--gold)', fontSize: '0.8rem' }}>
                  <ZoomIn size={14} />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close-btn" 
              onClick={closeLightbox}
              aria-label="Close Preview"
            >
              <X size={24} />
            </button>

            <button 
              className="lightbox-nav-btn lightbox-prev" 
              onClick={showPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="lightbox-main-img"
              onError={(e) => { e.target.src = "/images/temple-hero.png"; }}
            />

            <button 
              className="lightbox-nav-btn lightbox-next" 
              onClick={showNext}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            <div className="lightbox-caption-area">
              <span className="badge-temple badge-gold" style={{ marginBottom: '0.4rem' }}>
                {activePhoto.category} • {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 className="lightbox-title">{activePhoto.title}</h3>
              <p className="lightbox-desc">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
