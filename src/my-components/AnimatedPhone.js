import React, { useState } from 'react';
import './AnimatedPhone.css';


// This feature alows you to click and drag a moble phone around the screen that will spring back to the center when you let it go.
// I had hopped to add more to this but it was tricky just to get this far.


const AniPhone = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    // Calculate the initial offset based on the mouse position within the phone
    setOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
    event.preventDefault(); // Prevent text selection while dragging
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    // Update position based on the offset and current mouse position
    setPosition({
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 }); // Reset position to center
  };

  return (
    <div className="container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <h3 className="titleText">Drag & Release the phone!</h3>
      <div
        className="phone"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseDown={handleMouseDown}
      >
        <div className="home-button"></div>
      </div>
    </div>
  );
};

export default AniPhone;
