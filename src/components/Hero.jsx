import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = ({ data }) => {
  const container = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(".hero-line", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.5
    })
    .from(".hero-role", {
      opacity: 0,
      x: -20,
      duration: 0.8,
      stagger: 0.2
    }, "-=0.5")
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

      <div className="max-w-[1400px]">
        <h1 className="font-display font-extrabold text-[12vw] leading-[0.9] uppercase tracking-tighter mix-blend-difference mb-8">
          <div className="overflow-hidden"><span className="hero-line block">Varun</span></div>
          <div className="overflow-hidden"><span className="hero-line block text-stroke">Satapathy</span></div>
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

      {/* Background Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default Hero;
