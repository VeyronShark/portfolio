import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ data }) => {
  const container = useRef();

  useGSAP(() => {
    // Parallax effect for cards
    const cards = gsap.utils.toArray('.project-card-premium');
    
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
        y: 100,
        opacity: 0, 
        scale: 0.9,
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-base text-secondary uppercase tracking-widest font-medium mb-16">Selected Works</h2>

        <div className="flex flex-col gap-32">
          {data.map((project, index) => (
            <div 
              key={index} 
              className={`project-card-premium flex flex-col md:flex-row gap-12 md:gap-24 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image side */}
              <div className="w-full md:w-3/5 group cursor-none">
                <div className="overflow-hidden rounded-2xl relative">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:opacity-0 transition-opacity duration-500" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                  />
                  
                  {/* Floating View Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="text-sm uppercase font-bold tracking-widest">View</span>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="w-full md:w-2/5 flex flex-col items-start">
                <span className="text-accent text-sm md:text-base font-medium mb-4 uppercase tracking-widest px-3 py-1 border border-accent/20 rounded-full">
                  {project.category}
                </span>
                <h3 className="text-4xl md:text-5xl font-display font-medium mb-6">
                  {project.title}
                </h3>
                <p className="text-secondary text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                <a 
                  href={project.link}
                  className="text-white text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors"
                >
                  See Case Study
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
