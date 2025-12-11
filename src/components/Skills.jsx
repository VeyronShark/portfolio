import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ data }) => {
  const container = useRef();
  const gridRef = useRef();

  useGSAP(() => {
    gsap.from(".skill-title-anim", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: gridRef.current, // Use ref instead of class string
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1, // Faster stagger
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="skill-title-anim text-5xl font-extrabold mb-16 text-center bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent tracking-tight w-full">
          Skills
        </h2>
        <div ref={gridRef} className="skill-grid-anim grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(data).map(([category, skills]) => (
            <div key={category} className="skill-card bg-surface p-8 rounded-xl border border-white/5 transition duration-300 hover:-translate-y-1 hover:border-primary/30 h-full shadow-lg hover:shadow-xl">
              <h3 className="text-xl mb-6 text-white pb-2 block border-b border-white/10 font-bold capitalize">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-white/5 px-3 py-2 rounded-md text-sm text-gray-400 border border-transparent transition duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20">
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
