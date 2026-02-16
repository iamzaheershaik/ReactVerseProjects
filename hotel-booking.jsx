import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Star, Heart, Eye, TrendingUp, Award, Shield, Wifi, Coffee, Dumbbell, Wind, Car, Waves } from 'lucide-react';

const LuxuryHotelBooking = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Simulated hotel data with international flair
  const hotels = [
    {
      id: 1,
      name: "The Grand Meridien",
      location: "Paris, France",
      price: 320,
      rating: 4.8,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      amenities: ["Wifi", "Pool", "Spa", "Restaurant", "Gym", "Bar"],
      deal: "Early Bird -25%",
      verified: true,
      instantBook: true,
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    {
      id: 2,
      name: "Sakura Imperial Suite",
      location: "Tokyo, Japan",
      price: 450,
      rating: 4.9,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      amenities: ["Wifi", "Onsen", "Restaurant", "Garden", "Tea Room"],
      deal: "Limited Time -30%",
      verified: true,
      instantBook: true,
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    {
      id: 3,
      name: "Villa Serena Toscana",
      location: "Florence, Italy",
      price: 280,
      rating: 4.7,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      amenities: ["Wifi", "Pool", "Vineyard", "Restaurant", "Spa"],
      deal: "Flash Sale -20%",
      verified: true,
      instantBook: false,
      coordinates: { lat: 43.7696, lng: 11.2558 }
    },
    {
      id: 4,
      name: "Burj Sky Residence",
      location: "Dubai, UAE",
      price: 580,
      rating: 5.0,
      reviews: 1523,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      amenities: ["Wifi", "Pool", "Spa", "Restaurant", "Gym", "Helipad"],
      deal: "Luxury Deal -15%",
      verified: true,
      instantBook: true,
      coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    {
      id: 5,
      name: "The Balinese Sanctuary",
      location: "Ubud, Bali",
      price: 195,
      rating: 4.6,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      amenities: ["Wifi", "Pool", "Spa", "Yoga", "Restaurant"],
      deal: "Wellness -18%",
      verified: true,
      instantBook: true,
      coordinates: { lat: -8.5069, lng: 115.2625 }
    },
    {
      id: 6,
      name: "Nordic Aurora Lodge",
      location: "Tromsø, Norway",
      price: 340,
      rating: 4.8,
      reviews: 723,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      amenities: ["Wifi", "Sauna", "Restaurant", "Aurora View", "Fireplace"],
      deal: "Winter Special -22%",
      verified: true,
      instantBook: true,
      coordinates: { lat: 69.6492, lng: 18.9553 }
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const amenityIcons = {
    "Wifi": <Wifi size={16} />,
    "Pool": <Waves size={16} />,
    "Spa": <Wind size={16} />,
    "Restaurant": <Coffee size={16} />,
    "Gym": <Dumbbell size={16} />,
    "Bar": <Coffee size={16} />,
    "Onsen": <Waves size={16} />,
    "Garden": <Wind size={16} />,
    "Tea Room": <Coffee size={16} />,
    "Vineyard": <Coffee size={16} />,
    "Helipad": <Car size={16} />,
    "Yoga": <Dumbbell size={16} />,
    "Sauna": <Wind size={16} />,
    "Aurora View": <Eye size={16} />,
    "Fireplace": <Wind size={16} />
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(218,165,32,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 20s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(70,130,180,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        animation: 'float 25s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hotel-card {
          animation: slideUp 0.6s ease-out forwards;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hotel-card:hover {
          transform: translateY(-12px);
        }
        
        .deal-badge {
          background: linear-gradient(135deg, #DAA520 0%, #FFD700 100%);
          animation: shimmer 3s infinite linear;
          background-size: 2000px 100%;
        }
        
        .verified-badge {
          animation: pulse 2s ease-in-out infinite;
        }

        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(218,165,32,0.3);
        }

        .filter-chip {
          transition: all 0.3s ease;
        }

        .filter-chip:hover {
          transform: scale(1.05);
        }

        *::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        *::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }

        *::-webkit-scrollbar-thumb {
          background: rgba(218,165,32,0.5);
          border-radius: 4px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background: rgba(218,165,32,0.7);
        }
      `}</style>

      {/* Header */}
      <header style={{
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(20px)',
        background: 'rgba(26, 26, 46, 0.7)',
        borderBottom: '1px solid rgba(218,165,32,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        animation: 'slideUp 0.8s ease-out'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a1a2e',
            boxShadow: '0 8px 24px rgba(218,165,32,0.4)'
          }}>
            L
          </div>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: 0,
              letterSpacing: '1px',
              background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              LuxeStay
            </h1>
            <p style={{
              margin: 0,
              fontSize: '11px',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)'
            }}>
              Curated Luxury Worldwide
            </p>
          </div>
        </div>
        
        <nav style={{
          display: 'flex',
          gap: '32px',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '14px'
        }}>
          {['Discover', 'Destinations', 'Offers', 'Rewards'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.toLowerCase() ? '#DAA520' : 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                position: 'relative',
                padding: '8px 0',
                transition: 'color 0.3s ease'
              }}
            >
              {item}
              {activeTab === item.toLowerCase() && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #DAA520 0%, #FFD700 100%)',
                  animation: 'slideUp 0.3s ease-out'
                }} />
              )}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(218,165,32,0.3)',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#fff',
            cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(218,165,32,0.2)';
            e.target.style.borderColor = '#DAA520';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.borderColor = 'rgba(218,165,32,0.3)';
          }}>
            Sign In
          </button>
          <button style={{
            background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 100%)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 20px',
            color: '#1a1a2e',
            cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 4px 16px rgba(218,165,32,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(218,165,32,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(218,165,32,0.3)';
          }}>
            Join Rewards
          </button>
        </div>
      </header>

      {/* Hero Search Section */}
      <section style={{
        padding: '64px 48px 48px',
        maxWidth: '1400px',
        margin: '0 auto',
        animation: 'slideUp 1s ease-out 0.2s backwards'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h2 style={{
            fontSize: '56px',
            fontWeight: '700',
            marginBottom: '16px',
            letterSpacing: '2px',
            lineHeight: '1.2'
          }}>
            Discover Your Perfect Stay
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: "'Montserrat', sans-serif",
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Handpicked luxury accommodations from around the world
          </p>
        </div>

        {/* Advanced Search Bar */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '12px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
          gap: '12px',
          alignItems: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(218,165,32,0.2)'
        }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <MapPin style={{ position: 'absolute', left: '16px', color: '#DAA520' }} size={20} />
            <input
              type="text"
              placeholder="Where are you going?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: "'Montserrat', sans-serif",
                background: 'rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Calendar style={{ position: 'absolute', left: '16px', color: '#DAA520' }} size={20} />
            <input
              type="text"
              placeholder="Check-in"
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: "'Montserrat', sans-serif",
                background: 'rgba(0,0,0,0.03)',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Calendar style={{ position: 'absolute', left: '16px', color: '#DAA520' }} size={20} />
            <input
              type="text"
              placeholder="Check-out"
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: "'Montserrat', sans-serif",
                background: 'rgba(0,0,0,0.03)',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Users style={{ position: 'absolute', left: '16px', color: '#DAA520' }} size={20} />
            <select style={{
              width: '100%',
              padding: '16px 16px 16px 48px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontFamily: "'Montserrat', sans-serif",
              background: 'rgba(0,0,0,0.03)',
              cursor: 'pointer',
              appearance: 'none'
            }}>
              <option>2 Guests</option>
              <option>1 Guest</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>

          <button style={{
            background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 100%)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            color: '#1a1a2e',
            cursor: 'pointer',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '15px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(218,165,32,0.4)',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 12px 32px rgba(218,165,32,0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 8px 24px rgba(218,165,32,0.4)';
          }}>
            <Search size={20} />
            Search
          </button>
        </div>

        {/* Quick Filters */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {['Instant Book', 'Free Cancellation', 'Pool', 'Spa', 'Beach Access', 'Pet Friendly'].map((filter) => (
            <button
              key={filter}
              className="filter-chip"
              onClick={() => {
                setSelectedFilters(prev =>
                  prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
                );
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '24px',
                border: selectedFilters.includes(filter) 
                  ? '2px solid #DAA520' 
                  : '2px solid rgba(255,255,255,0.2)',
                background: selectedFilters.includes(filter)
                  ? 'rgba(218,165,32,0.2)'
                  : 'rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                fontWeight: '500',
                backdropFilter: 'blur(10px)'
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{
        background: 'rgba(218,165,32,0.1)',
        borderTop: '1px solid rgba(218,165,32,0.2)',
        borderBottom: '1px solid rgba(218,165,32,0.2)',
        padding: '32px 48px',
        animation: 'slideUp 1.2s ease-out 0.4s backwards'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '48px'
        }}>
          {[
            { icon: <Award size={32} />, value: '2,500+', label: 'Luxury Properties' },
            { icon: <MapPin size={32} />, value: '180', label: 'Countries' },
            { icon: <Star size={32} />, value: '4.8/5.0', label: 'Average Rating' },
            { icon: <Shield size={32} />, value: '100%', label: 'Secure Booking' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ color: '#DAA520', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Montserrat', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Listings */}
      <section style={{
        padding: '64px 48px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h3 style={{
              fontSize: '36px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              letterSpacing: '1px'
            }}>
              Featured Properties
            </h3>
            <p style={{
              margin: 0,
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              {hotels.length} exceptional stays available
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(218,165,32,0.3)',
                background: viewMode === 'grid' ? 'rgba(218,165,32,0.2)' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid rgba(218,165,32,0.3)',
                background: viewMode === 'list' ? 'rgba(218,165,32,0.2)' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              List View
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(380px, 1fr))' : '1fr',
          gap: '32px'
        }}>
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="hotel-card"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(218,165,32,0.2)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                cursor: 'pointer',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => setSelectedHotel(hotel)}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                {/* Badges Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    {hotel.deal && (
                      <div className="deal-badge" style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        fontFamily: "'Montserrat', sans-serif",
                        color: '#1a1a2e',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        {hotel.deal}
                      </div>
                    )}
                    {hotel.verified && (
                      <div className="verified-badge" style={{
                        background: 'rgba(34,139,34,0.95)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        fontFamily: "'Montserrat', sans-serif",
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        <Shield size={12} />
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(hotel.id);
                    }}
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <Heart
                      size={20}
                      fill={favorites.includes(hotel.id) ? '#DAA520' : 'none'}
                      color={favorites.includes(hotel.id) ? '#DAA520' : '#fff'}
                    />
                  </button>
                </div>

                {/* Instant Book Badge */}
                {hotel.instantBook && (
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: 'rgba(218,165,32,0.95)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#1a1a2e',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <TrendingUp size={14} />
                    Instant Book
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      margin: '0 0 8px 0',
                      letterSpacing: '0.5px'
                    }}>
                      {hotel.name}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: "'Montserrat', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <MapPin size={14} />
                      {hotel.location}
                    </p>
                  </div>

                  <div style={{
                    background: 'rgba(218,165,32,0.2)',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(218,165,32,0.3)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginBottom: '4px'
                    }}>
                      <Star size={16} fill="#DAA520" color="#DAA520" />
                      <span style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#DAA520'
                      }}>
                        {hotel.rating}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: "'Montserrat', sans-serif"
                    }}>
                      {hotel.reviews} reviews
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  margin: '16px 0'
                }}>
                  {hotel.amenities.slice(0, 5).map((amenity) => (
                    <div
                      key={amenity}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(218,165,32,0.2)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontFamily: "'Montserrat', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'rgba(255,255,255,0.8)'
                      }}
                    >
                      {amenityIcons[amenity]}
                      {amenity}
                    </div>
                  ))}
                  {hotel.amenities.length > 5 && (
                    <div style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(218,165,32,0.2)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily: "'Montserrat', sans-serif",
                      color: 'rgba(255,255,255,0.8)'
                    }}>
                      +{hotel.amenities.length - 5} more
                    </div>
                  )}
                </div>

                {/* Price and CTA */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(218,165,32,0.2)'
                }}>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: "'Montserrat', sans-serif",
                      marginBottom: '4px'
                    }}>
                      From
                    </div>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#DAA520',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '4px'
                    }}>
                      ${hotel.price}
                      <span style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: "'Montserrat', sans-serif"
                      }}>
                        /night
                      </span>
                    </div>
                  </div>

                  <button style={{
                    background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 28px',
                    color: '#1a1a2e',
                    cursor: 'pointer',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: '0 4px 16px rgba(218,165,32,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(218,165,32,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(218,165,32,0.3)';
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(218,165,32,0.2)',
        padding: '48px 48px 24px',
        marginTop: '64px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '48px',
          marginBottom: '32px'
        }}>
          {[
            {
              title: 'Company',
              links: ['About Us', 'Careers', 'Press', 'Blog']
            },
            {
              title: 'Support',
              links: ['Help Center', 'Safety', 'Cancellation', 'COVID-19']
            },
            {
              title: 'Explore',
              links: ['Destinations', 'Collections', 'Gift Cards', 'Sitemap']
            },
            {
              title: 'Partner',
              links: ['List Property', 'Affiliate', 'Corporate', 'Travel Agent']
            }
          ].map((section) => (
            <div key={section.title}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px',
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {section.title}
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {section.links.map((link) => (
                  <li key={link} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: "'Montserrat', sans-serif",
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#DAA520'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(218,165,32,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)'
        }}>
          <p style={{ margin: 0 }}>
            © 2026 LuxeStay. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuxuryHotelBooking;