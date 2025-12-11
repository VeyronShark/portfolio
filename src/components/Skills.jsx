import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ data }) => {
  const container = useRef();
  const marqueeRef = useRef();

  useGSAP(() => {
    // Reveal animation
    gsap.from(".skills-title", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Infinite Marquee
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(marqueeRef.current, {
      xPercent: -50,
      duration: 20,
      ease: "none",
    });

  }, { scope: container });

  // Flatten all skills into a single array for the marquee
  const allSkills = Object.values(data).flat();

  return (
    <section ref={container} className="py-40 overflow-hidden relative border-b border-white/5">
      <div className="px-6 md:px-24 mb-16">
        <h2 className="skills-title text-base text-secondary uppercase tracking-widest font-medium mb-4">Core Competencies</h2>
      </div>

      <div className="relative flex overflow-hidden whitespace-nowrap py-10">
        <div ref={marqueeRef} className="flex gap-16 items-center">
          {/* Duplicate list for infinite effect - 4 sets to be safe */}
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-16 items-center">
              {allSkills.map((skill, index) => (
                <span 
                  key={`${setIndex}-${index}`} 
                  className="text-6xl md:text-8xl font-display font-bold uppercase text-transparent stroke-text opacity-50 hover:opacity-100 transition-opacity duration-300"
                  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
