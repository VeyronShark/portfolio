import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3, 
      });
    };

    window.addEventListener('mousemove', moveCursor);
    
    // Add hover effect listeners
    const handleHover = () => {
      gsap.to(cursor, { scale: 0.5 });
      gsap.to(follower, { scale: 3, opacity: 0.5, mixBlendMode: 'difference' });
    };
    
    const handleUnhover = () => {
      gsap.to(cursor, { scale: 1 });
      gsap.to(follower, { scale: 1, opacity: 1, mixBlendMode: 'normal' });
    };

    const links = document.querySelectorAll('a, button, .hover-trigger');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleHover);
      link.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleHover);
        link.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-transform" 
      />
    </>
  );
};

export default CustomCursor;
