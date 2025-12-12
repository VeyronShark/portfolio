import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ data }) => {
  const container = useRef();
  
  const categories = Object.entries(data);

  useGSAP(() => {
    gsap.from(".skill-category", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 md:py-40 px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[12vw] md:text-[6vw] font-display font-bold leading-[0.85] tracking-tighter uppercase mb-16 mix-blend-difference select-none">
          <span className="block text-white">Core</span>
          <span className="block text-stroke text-transparent">Skills</span>
        </h2>

        {/* Carousel / Grid Container */}
        {/* Using a flex container that acts as a slider if content overflows, but fits 3 perfectly now */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {categories.map(([category, skillList], index) => (
            <div 
              key={index} 
              className="skill-category bg-surface border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col gap-8 hover:border-white/20 transition-colors group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-4">
                <span className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300"></span>
                <h3 className="text-2xl font-display font-medium uppercase tracking-wide text-white">
                  {category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-3">
                {skillList.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-sm md:text-base text-secondary hover:text-white hover:bg-white/10 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
