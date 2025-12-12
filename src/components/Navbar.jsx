import React, { useRef } from 'react';
import { Home, User, Code, FolderGit2, Mail } from 'lucide-react';
import Magnetic from './Magnetic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 2, // Wait for hero animation
      ease: "power4.out"
    });
  }, { scope: containerRef });

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: FolderGit2, label: 'Work' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
        {navItems.map((item) => (
          <Magnetic key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="p-3 rounded-full hover:bg-white text-white hover:text-black transition-colors duration-300 group relative flex items-center justify-center"
              aria-label={item.label}
            >
              <item.icon size={20} />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </button>
          </Magnetic>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
