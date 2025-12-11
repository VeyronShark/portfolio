import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = ({ data }) => {
  const container = useRef();
  
  useGSAP(() => {
    // Animate profile image
    gsap.from(".hero-img", {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });

    // Animate name letters
    gsap.from(".name-letter", {
      y: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.5
    });

    // Animate roles
    gsap.from(".hero-role", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 1.5,
      ease: "power2.out"
    });

    // Animate bio
    gsap.from(".hero-bio", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 2,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="min-h-screen flex items-center justify-center text-center relative overflow-hidden bg-background">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          maskImage: 'linear-gradient(black 40%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(black 40%, transparent 90%)'
        }}
      />
      
      <div className="relative z-10 max-w-4xl px-4">
        <img 
          src={data.photo} 
          alt={data.name} 
          className="hero-img w-40 h-40 rounded-full border-2 border-primary p-1 object-cover mb-8 shadow-[0_0_20px_rgba(0,229,255,0.15)] transition duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] bg-surface mx-auto" 
        />
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter overflow-hidden">
          {data.name.split("").map((char, index) => (
            <span key={index} className="name-letter inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <div className="flex gap-4 justify-center mb-8 text-lg text-primary font-medium uppercase tracking-widest flex-wrap">
          {data.roles.map((role, index) => (
            <span key={index} className="hero-role flex items-center">
              {role}
              {index < data.roles.length - 1 && (
                <span className="hidden md:inline ml-4 text-gray-500 opacity-50">•</span>
              )}
            </span>
          ))}
        </div>
        <p className="hero-bio text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">{data.bio}</p>
      </div>
    </section>
  );
};

export default Hero;
