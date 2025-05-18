import React, { useEffect, useRef, useState } from 'react';
import {
  FaInbox,
  FaFileExcel,
  FaPencilAlt,
  FaUtensils,
  FaPaintBrush,
  FaBriefcase,
} from 'react-icons/fa';

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
  { icon: FaInbox,      value: 1, key: 'inbox' },
  { icon: FaFileExcel,  value: 2, key: 'excel' },
  { icon: FaPencilAlt,  value: 3, key: 'essay' },
  { icon: FaUtensils,   value: 4, key: 'lunch' },
  { icon: FaPaintBrush, value: 5, key: 'figma' },
  { icon: FaBriefcase,  value: 6, key: 'job'   },
];

/* ──────── Slider ──────── */
function FancySlider({ min, max, step, value, onChange, icons }) {
  const trackRef   = useRef(null);
  const [dragging, setDragging] = useState(false);

  /* -------- pointer handlers -------- */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const move = (clientX) => {
      const { left, width } = track.getBoundingClientRect();
      const clamped = Math.max(0, Math.min(clientX - left, width));
      const ratio   = clamped / width;
      const newVal  = Math.round((min + ratio * (max - min)) / step) * step;
      if (newVal !== value) onChange(newVal);
    };

    const handlePointerMove = (e) => {
      if (!dragging) return;
      e.preventDefault();
      move(e.clientX);
    };

    const handlePointerUp = () => setDragging(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup',   handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup',   handlePointerUp);
    };
  }, [dragging, min, max, step, onChange, value]);

  /* -------- slider visuals -------- */
  const ratio     = (value - min) / (max - min);
  const iconSize  = 20;

  return (
    <div
      style={{ position: 'relative', width: '100%', height: 40 }}
    >
      {/* TRACK */}
      <div
        ref={trackRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 20,
          marginTop: 15,
          touchAction: 'none',          // disable browser gestures
          overscrollBehaviorY: 'contain'
        }}
        onPointerDown={(e) => {
          setDragging(true);
          e.target.setPointerCapture(e.pointerId);
          e.preventDefault();
          move(e.clientX);
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            width: '100%',
            height: 4,
            background: 'rgba(214,206,186,.3)',
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            width: `${ratio * 100}%`,
            height: 4,
            background: '#d6ceba',
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `calc(${ratio * 100}% - 10px)`,
            transform: 'translateY(-50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#d6ceba',
            cursor: 'pointer',
            zIndex: 2,
          }}
        />
      </div>

      {/* ICONS */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          position: 'absolute',
          top: 0,
          pointerEvents: 'none',        // icons themselves don’t intercept drag
        }}
      >
        {icons.map(({ icon: Icon, value: v, key }) => {
          const iconRatio = (v - min) / (max - min);
          const active    = v === value;
          return (
            <div
              key={key}
              onPointerDown={(e) => {      // allow tap-to-jump
                e.preventDefault();
                onChange(v);
              }}
              style={{
                position: 'absolute',
                left: `calc(${iconRatio * 100}% - ${iconSize / 2}px)`,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: iconSize,
                color: active ? '#d6ceba' : 'rgba(214,206,186,.5)',
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────── Left Pane ──────── */
const LeftPane = ({ selectedHour, onTimeChange, activity, gif }) => {
  const gifSrc = gifMap[gif] || inboxclipGif; // fallback

  return (
    <div className="leftpane-container">
      {/* Activity clip */}
      <div style={{ width: '100%' }}>
        <img
          src={gifSrc}
          alt={activity}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
        <p style={{ margin: '15px 0', fontSize: 16 }}>
          <b>{activity}</b>
        </p>
      </div>

      {/* Hour selector */}
      <div style={{ width: 200, margin: '0 auto' }}>
        <FancySlider
          min={1}
          max={6}
          step={1}
          value={selectedHour}
          onChange={onTimeChange}
          icons={sliderIcons}
        />
      </div>
    </div>
  );
};

export default LeftPane;
