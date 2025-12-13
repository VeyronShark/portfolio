import React, { useRef, useState, useEffect } from 'react';
import { Home, User, Code, FolderGit2, Mail, Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useGSAP(() => {
    // Initial entrance animation
    gsap.from(containerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      delay: 2, // Wait for hero animation
      ease: "power4.out"
    });
  }, { scope: containerRef });

  const toggleNavbar = () => {
    if (isToggling) return;
    setIsToggling(true);
    
    if (isOpen) {
      // Close animation
      const tl = gsap.timeline({
        onComplete: () => {
          setIsOpen(false);
          setIsToggling(false);
        }
      });
      
      tl.to(itemsRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        ease: "power2.in"
      })
      .to(itemsRef.current, {
        width: 0,
        padding: 0,
        margin: 0,
        duration: 0.4,
        ease: "power4.inOut"
      });
      
    } else {
      // Open animation
      setIsOpen(true);
      // We need to wait for render to have the ref available essentially, 
      // but since we keep the ref mounted but with width 0 usually, 
      // let's try a different approach: Always render, just animate.
      // But for performance/cleanliness, state is nice. 
      // Let's stick to: State change triggers effect? No, let's control via state + effect.
    }
  };

  // Dedicated effect for handling open/close animations based on state
  useEffect(() => { // Using useEffect to trigger GSAP after state update/render
    if (isToggling && isOpen) {
       // We just opened it. Animate IN.
       const tl = gsap.timeline({
         onComplete: () => setIsToggling(false)
       });
       
       gsap.set(itemsRef.current, { width: "auto", x: 0, paddingRight: "0.25rem" }); // Auto width measurement hint
       
       gsap.fromTo(itemsRef.current, 
         { width: 0, opacity: 0, paddingRight: 0 },
         { 
           width: "auto", 
           duration: 0.4, 
           ease: "power4.out",
           opacity: 1,
           paddingRight: "0.25rem" // restore gap
         }
       );
    }
  }, [isOpen]);


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
    <div ref={containerRef} className="fixed top-8 left-8 z-50">
      <div className="flex items-center p-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-colors overflow-hidden">
        
        {/* Nav Items Container */}
        <div ref={itemsRef} className="flex gap-1 overflow-hidden pr-1" style={{ width: 'auto' }}>
            {navItems.map((item) => (
            <Magnetic key={item.id}>
                <button
                onClick={() => scrollToSection(item.id)}
                className="p-3 rounded-full hover:bg-white text-white hover:text-black transition-colors duration-300 group relative flex items-center justify-center"
                aria-label={item.label}
                >
                <item.icon size={18} />
                <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                </span>
                </button>
            </Magnetic>
            ))}
        </div>

        {/* Toggle Button */}
        <Magnetic>
            <button
                onClick={toggleNavbar}
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-white/80 transition-colors relative flex items-center justify-center z-10"
                aria-label="Toggle Menu"
            >
                <div className="relative w-[18px] h-[18px]">
                  <Menu 
                    className={`absolute inset-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
                    size={18} 
                  />
                  <X 
                    className={`absolute inset-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
                    size={18} 
                  />
                </div>
            </button>
        </Magnetic>

      </div>
    </div>
  );
};

export default Navbar;
