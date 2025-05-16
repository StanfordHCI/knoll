import React, { useEffect, useState } from 'react';

const AnimatedRow = ({ row, rowIndex }) => {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '15px'
      }}
    >
      <div
        style={{
          display: 'flex',
          animation: 'marquee var(--animation-duration) linear infinite'
        }}
      >
        {row.map((card, i) => {
          const isFirstCardInSecondRow = rowIndex === 1 && i === 0;
          return (
            <div
              key={card.id}
              style={{
                position: 'relative',
                marginRight: '10px',
                flex: '0 0 275px',
                marginLeft: isFirstCardInSecondRow ? '132px' : '0'
              }}
            >
              {/* Proposition-Confidence Label */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                  fontSize: '12px',
                  marginLeft: '6px',
                  marginRight: '6px',
                  color: 'var(--color-main-text)',
                  opacity: 0.7
                }}
              >
                <span>Proposition</span>
                <span>Confidence</span>
              </div>
              {/* Card Content */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-main-text)',
                  borderRadius: '8px',
                  padding: '10px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  paddingRight: '0px',
                  height: '60px',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  style={{
                    width: '220px',
                    color: '#333',
                    fontFamily: 'sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.2',
                    height: '40px',
                    overflow: 'hidden'
                  }}
                >
                  {card.text}
                </div>
                <div
                  style={{
                    width: '1px',
                    backgroundColor: '#888888',
                    height: '40px',
                    margin: '0 2px'
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '17px',
                    color: '#333',
                    textAlign: 'center'
                  }}
                >
                  {card.value}
                </div>
              </div>
            </div>
          );
        })}
        {row.map((card, i) => {
          return (
            <div
              key={`${card.id}-dup`}
              style={{
                position: 'relative',
                marginRight: '10px',
                flex: '0 0 275px'
              }}
            >
              {/* Proposition-Confidence Label */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                  marginLeft: '6px',
                  marginRight: '6px',
                  fontSize: '12px',
                  color: 'var(--color-main-text)',
                  opacity: 0.7
                }}
              >
                <span>Proposition</span>
                <span>Confidence</span>
              </div>
              {/* Card Content */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-main-text)',
                  borderRadius: '8px',
                  padding: '10px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  paddingRight: '0px',
                  height: '60px',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  style={{
                    width: '220px',
                    color: '#333',
                    fontFamily: 'sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.2',
                    height: '40px',
                    overflow: 'hidden'
                  }}
                >
                  {card.text}
                </div>
                <div
                  style={{
                    width: '1px',
                    backgroundColor: '#888888',
                    height: '60px',
                    margin: '0 2px'
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '17px',
                    color: '#333',
                    textAlign: 'center'
                  }}
                >
                  {card.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Carousel = ({ carouselData }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate animation duration based on screen width
  // Smaller screens get faster animation to compensate
  const animationDuration = Math.max(8, screenWidth / 80);
  
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '0px',
        boxSizing: 'border-box',
        '--animation-duration': `${animationDuration}s`
      }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <h3
        style={{
          color: 'var(--color-main-text)',
          textAlign: 'left',
          marginBottom: '12px',
          fontSize: '1.5em',
        }}
      >
        GUMs learn a wide range of preferences from unstructured interaction
      </h3>
      {carouselData.map((row, index) => (
        <AnimatedRow key={index} row={row} rowIndex={index} />
      ))}
    </div>
  );
};

export default Carousel;
