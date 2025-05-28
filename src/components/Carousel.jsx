import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const cards = [
  { id: 1, content: "CHI 2025 Papers", description: "Titles and abstracts for all papers in the main proceedings at CHI 2025", link: "https://knollapp.com/add/ZlRKvCmBesYJ66EQNr7R" },
  { id: 2, content: "Research Elevator Pitches", description:"Advice on how to give research elevator pitches at HCI conferences", link: "https://knollapp.com/add/j4ZTw0UWBE8qCgIbZqbB" },
  { id: 3, content: "CS SoP Writing Tips", description: "Tips on how to write a strong statement of purposes for CS PhD applications" , link: "https://knollapp.com/add/E6kJmHBoarRp8WZqKa6c" },
  { id: 4, content: "Reasoning LLMs", description:"List of recent papers on reasoning in LLMs with a summary of key findings", link: "https://knollapp.com/add/D8bwhoGBBByAksN13XH2"  },
  { id: 5, content: "Yokohama Recommendations", description:"Crowdsourced recommendations for Yokohama, Japan", link: "https://knollapp.com/add/J8Jpo5nuaCFjw4UP4y41"  },
  { id: 6, content: "Welcome to Knoll", description:"Tutorial and FAQ on how to use the Knoll browser extension", link: "https://knollapp.com/add/Owpgm2DXhp0a0dnM1gZa"  },
];

const VISIBLE_COUNT = 3;

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(() => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex + 1 > cards.length - VISIBLE_COUNT ? 0 : prevIndex + 1
  //     );
  //   }, delay);
  //   return () => resetTimeout();
  // }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? cards.length - VISIBLE_COUNT : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 > cards.length - VISIBLE_COUNT ? 0 : prev + 1
    );
  };

  return (
    <div className="carousel-wrapper">
      <button className="arrow" onClick={handlePrev}>
        <FaChevronLeft/>
      </button>

      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${(75 / VISIBLE_COUNT) * currentIndex}%)`,
          }}
        >
          {cards.map((card) => (
            <a className="card-link" href={card.link} target="_blank" rel="noopener noreferrer">
              <div className="carousel-card" key={card.id}>
                <h2 style={{color: "#282828", fontSize: "20px", margin: '0'}}>
                  {card.content}
                </h2>
                <p style={{color: "#282828", fontSize: "16px", margin: '0'}}>
                  {card.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <button className="arrow" onClick={handleNext}>
        <FaChevronRight/>
      </button>
    </div>
  );
}
