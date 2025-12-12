import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Magnetic from './Magnetic';

const Hero = ({ data }) => {
  const container = useRef();
  
  // Split name into words
  const words = data.name.split(" ");

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate letters - letters handled in App.jsx for sequence
    // But we still need to animate other hero parts after a delay to match
    
    tl.from(".hero-role", {
      opacity: 0,
      x: -20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      delay: 2 // Wait for loader + title
    })
    .from(".hero-status", {
      scale: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.5");

  }, { scope: container });

  return (
    <section ref={container} className="h-screen flex flex-col justify-center px-6 md:px-24 relative overflow-hidden bg-background">
      <div className="absolute top-10 right-10 flex items-center gap-3 hero-status">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs uppercase tracking-widest text-secondary font-medium">Available for work</span>
      </div>

      <div className="max-w-[1400px] z-10 w-full">
        <h1 className="font-display font-extrabold text-[7vw] md:text-[8vw] leading-[0.9] uppercase tracking-tighter mix-blend-difference mb-8 text-white select-none">
          {words.map((word, wordIndex) => (
            <div key={wordIndex} className="overflow-hidden inline-block mr-[2vw] last:mr-0">
               <span className={`block ${wordIndex === 1 ? 'text-stroke text-transparent' : 'text-white'}`}>
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex} className="hero-char inline-block">{char}</span>
                ))}
              </span>
            </div>
          ))}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between mt-12 border-t border-white/10 pt-8">
          <div className="flex gap-4 text-sm md:text-base uppercase tracking-widest font-medium">
            {data.roles.map((role, i) => (
              <span key={i} className="hero-role text-secondary hover:text-white transition-colors cursor-default">
                {role}
              </span>
            ))}
          </div>
          <div className="hero-role max-w-md text-secondary leading-relaxed text-sm md:text-base">
            {data.bio}
          </div>
        </div>
      </div>


      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 mix-blend-difference z-20">
        <Magnetic>
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white text-xs uppercase tracking-widest animate-bounce">
            ↓
          </div>
        </Magnetic>
      </div>
    </section>
  );
};

export default Hero;
