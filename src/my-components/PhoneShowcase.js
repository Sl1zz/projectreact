import React, { useState, useEffect } from 'react';

// A slide show showcasing some phones for sale from our website

const PhoneShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // phones on display
  const phones = [
    {
      name: "iPhone 16 Pro",
      price: "$1,999",
      features: ["A18 Pro chip", "48MP camera", "Titanium design"],
      image: "https://www.pbtech.co.nz/imgprod/M/P/MPHAPP216200__1.jpg?h=3724342597"
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      price: "$1,932",
      features: ["200MP camera", "Snapdragon 8 Gen 3", "6.8\" QHD+ display"],
      image: "https://www.pbtech.co.nz/imgprod/M/P/MPHSAM0092802__1.jpg?h=2437812802"
    },
    {
      name: "Samsung Galaxy Z Fold",
      price: "$3,049",
      features: ["Snapdragon 8 Gen 3", "50MP triple camera", "7.6\" Infinity Flex Dynamic AMOLED display"],
      image: "https://www.pbtech.co.nz/imgprod/M/P/MPHSAM0495609__1.jpg?h=3593449955"
    },
    {
      name: "OnePlus Nord 3",
      price: "$898",
      features: ["MediaTek Dimensity 9000 CPU", "50MP triple camera", "5000mAh battery"],
      image: "https://www.pbtech.co.nz/imgprod/M/P/MPHOPL013000__1.jpg?h=1641172542"
    }
  ];

  // Open a popup to display clicked phone
  useEffect(() => {
    if (!isModalOpen) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % phones.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isModalOpen, phones.length]);

  //Slide change
  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % phones.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + phones.length) % phones.length);
  };

  //Phone pop up 
  const ImageModal = () => {
    if (!isModalOpen) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => setIsModalOpen(false)}
      >
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '40%',
          maxHeight: '120vh',
          position: 'center'
        }}>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              border: 'none',
              background: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
          <img
            src={phones[currentSlide].image}
            alt={phones[currentSlide].name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{phones[currentSlide].name}</h3>
            <p style={{ color: '#2563eb', fontWeight: '600' }}>{phones[currentSlide].price}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      width: '80vw',
      height: '100vh',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
      backgroundColor: 'floralwhite'
    }}>
      {/* Header */}
      <header style={{
        height: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px 0',
        fontSize: 'min(4vw, 48px)',
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      }}>
        Phone Showcase
      </header>

      <div style={{
        height: '85%',
        width: '100%',
        position: 'relative',
        marginTop: '2vh'
      }}>
        <div style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5vw',
          backgroundColor: 'White',
          borderRadius: '15px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        }}>
          {/* Phone Info */}
          <div style={{
            margin: '4px',
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '1px 8px 12px 1px rgba(0, 0, 0, 0.5)',
          }}>
            <h2 style={{
              fontSize: 'min(4vw, 48px)',
              fontWeight: 'bold',
              marginBottom: '10px',
              textAlign: 'center',
            }}>{phones[currentSlide].name}</h2>
            <p style={{
              fontSize: 'min(3vw, 36px)',
              color: '#2563eb',
              fontWeight: '600',
              marginBottom: '3vh',
              paddingLeft: 20
            }}>{phones[currentSlide].price}</p>
            <ul style={{
              listStyle: 'none',
              paddingLeft: 20,
              fontSize: 'min(2vw, 24px)'
            }}>
              {phones[currentSlide].features.map((feature, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2vh',
                  color: '#374151'
                }}>
                  <span style={{
                    width: '0.8em',
                    height: '0.8em',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    marginRight: '1em'
                  }}></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Phone Image */}
          <div style={{
            width: '45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={phones[currentSlide].image}
              alt={phones[currentSlide].name}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '1px 8px 12px 1px rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                transform: 'scale(1)',
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

      {/* Navigation Arrows */}
      <button // left button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '2vw',
          bottom: '15vh',
          backgroundImage: 'linear-gradient(135deg, #b0b0b0, #d3d3d3)',
          border: 'none',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: '#333333', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
        }}
      >
        ←
      </button>

      <button // right button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '2vw',
          bottom: '15vh',
          backgroundImage: 'linear-gradient(135deg, #b0b0b0, #d3d3d3)',
          border: 'none',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: '#333333', // Dark grey for arrow color
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
        }}
      >
        →
      </button>


        {/* Dot Navigation */}
        <div style={{
          position: 'absolute',
          bottom: '4vh',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px'
        }}>
          {phones.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? '24px' : '12px',
                height: '12px',
                borderRadius: '9999px',
                backgroundColor: currentSlide === index ? '#2563eb' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      <ImageModal />
    </div>
  );
};

export default PhoneShowcase;
