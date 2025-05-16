import React, { useEffect, useState } from 'react';
import { FaInbox, FaFileExcel, FaPencilAlt, FaUtensils, FaPaintBrush, FaBriefcase } from 'react-icons/fa';

/* ──────── GIF imports ──────── */
import inboxclipGif from './gifs/inboxclips.gif';
import excelclipGif from './gifs/excelclip.gif';
import essayclipGif from './gifs/essayclip.gif';
import lunchclipGif from './gifs/lunchclip.gif';
import figmaclipGif from './gifs/figmaclip.gif';
import jobclipGif   from './gifs/jobclip.gif';

const gifMap = {
  'inboxclips.gif': inboxclipGif,
  'excelclip.gif' : excelclipGif,
  'essayclip.gif' : essayclipGif,
  'lunchclip.gif' : lunchclipGif,
  'figmaclip.gif' : figmaclipGif,
  'jobclip.gif'   : jobclipGif,
};

const sliderIcons = [
  { icon: FaInbox, value: 1, key: 'inbox' },
  { icon: FaFileExcel, value: 2, key: 'excel' },
  { icon: FaPencilAlt, value: 3, key: 'essay' },
  { icon: FaUtensils, value: 4, key: 'lunch' },
  { icon: FaPaintBrush, value: 5, key: 'figma' },
  { icon: FaBriefcase, value: 6, key: 'job' },
];

/* ──────── Slider ──────── */
function FancySlider({ min, max, step, value, onChange, icons }) {
  const sliderRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMove = clientX => {
      if (!isDragging || !sliderRef.current) return;
      const { left, width } = sliderRef.current.getBoundingClientRect();
      const clampedX = Math.max(0, Math.min(clientX - left, width));
      const ratio = clampedX / width;
      const newValue = Math.round((min + ratio * (max - min)) / step) * step;
      onChange(newValue);
    };

    const mouse  = e => handleMove(e.clientX);
    const touch  = e => e.touches[0] && handleMove(e.touches[0].clientX);
    const endDrag = () => setIsDragging(false);

    window.addEventListener('mousemove', mouse);
    window.addEventListener('mouseup',   endDrag);
    window.addEventListener('touchmove', touch);
    window.addEventListener('touchend',  endDrag);
    window.addEventListener('touchcancel', endDrag);
    return () => {
      window.removeEventListener('mousemove', mouse);
      window.removeEventListener('mouseup',   endDrag);
      window.removeEventListener('touchmove', touch);
      window.removeEventListener('touchend',  endDrag);
      window.removeEventListener('touchcancel', endDrag);
    };
  }, [isDragging, min, max, step, onChange]);

  const ratio = (value - min) / (max - min);
  const iconSize = 20; // Size of the icon for positioning calculations

  return (
    <div style={{ position: 'relative', width: '100%', height: 40 /* Increased height for icons */ }}>
      <div ref={sliderRef} style={{ position:'relative', width:'100%', height:20, marginTop: 15 /* Make space for icons above */ }}>
        <div style={{
          position:'absolute', top:'50%', left:0, transform:'translateY(-50%)',
          width:'100%', height:4, background:'rgba(214,206,186,.3)', borderRadius:2
        }}/>
        <div style={{
          position:'absolute', top:'50%', left:0, transform:'translateY(-50%)',
          width:`${ratio*100}%`, height:4, background:'#d6ceba', borderRadius:2
        }}/>
        <div
          onMouseDown={e => { e.preventDefault(); setIsDragging(true); }}
          onTouchStart={() => setIsDragging(true)}
          style={{
            position:'absolute', top:'50%', left:`calc(${ratio*100}% - 10px)`,
            transform:'translateY(-50%)', width:20, height:20, borderRadius:'50%',
            background:'#d6ceba', cursor:'pointer', zIndex: 2
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 0 }}>
        {icons.map((iconData) => {
          const IconComponent = iconData.icon;
          const iconRatio = (iconData.value - min) / (max - min);
          const isActive = iconData.value === value;
          return (
            <div
              key={iconData.key}
              onClick={() => onChange(iconData.value)}
              style={{
                position: 'absolute',
                left: `calc(${iconRatio * 100}% - ${iconSize / 2}px)`,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 1,
                color: isActive ? '#d6ceba' : 'rgba(214,206,186,.5)',
                fontSize: `${iconSize}px`
              }}
              title={iconData.key.charAt(0).toUpperCase() + iconData.key.slice(1)} // Tooltip for accessibility
            >
              <IconComponent />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────── Left Pane ──────── */
const LeftPane = ({ selectedHour, onTimeChange, activity, gif }) => {
  const gifSrc = gifMap[gif] || inboxclipGif;   // fallback to inbox clip

  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        gap:8,
        paddingTop:24,
        alignItems:'center',
        textAlign:'center',
        width:'100%'
      }}
    >
      {/* Activity clip */}
      <div style={{ width:'100%' }}>
        <img
          src={gifSrc}
          alt={activity}
          style={{ width:'100%', height:'auto', objectFit:'contain', display:'block', margin: '0 auto' }}
        />
        <p style={{ margin:'15px 0 15px', fontSize:16 }}><b>{activity}</b></p>
      </div>

      {/* Hour selector */}
      <div style={{ width:200, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <FancySlider min={1} max={6} step={1} value={selectedHour} onChange={onTimeChange} icons={sliderIcons} />
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
