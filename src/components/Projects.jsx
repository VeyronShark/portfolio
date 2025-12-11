import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ data }) => {
  const [filter, setFilter] = useState('all');
  const container = useRef();

  const categories = ['all', ...new Set(data.map(item => item.category))];

  const filteredProjects = filter === 'all' 
    ? data 
    : data.filter(project => project.category === filter);

  useGSAP(() => {
    // Initial scroll trigger animation
    gsap.from(".project-title-anim", {
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

    gsap.from(".filter-btn-anim", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: container });

  // Animate projects when filter changes
  useGSAP(() => {
    gsap.fromTo(".project-card",
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "power2.out", overwrite: "auto" }
    );
  }, { scope: container, dependencies: [filter] });

  return (
    <section ref={container} className="py-32">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="project-title-anim text-5xl font-extrabold mb-16 text-center bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent tracking-tight w-full">
          Projects
        </h2>
        
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn-anim text-sm cursor-pointer px-5 py-2.5 rounded-lg transition duration-200 capitalize font-medium
                ${filter === cat 
                  ? 'bg-primary/10 border border-primary text-primary shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                  : 'bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card bg-surface rounded-xl overflow-hidden border border-white/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/20 flex flex-col h-full group">
              <div className="w-full h-56 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="p-8 flex-grow flex flex-col items-start">
                <span className="text-xs text-secondary uppercase mb-3 font-bold tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-2xl mb-3 text-white font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                <a 
                  href={project.link} 
                  className="inline-block px-6 py-2 bg-transparent border border-primary text-primary rounded-full font-semibold uppercase tracking-wider text-xs transition duration-300 hover:bg-primary hover:text-background hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                >
                  View Project
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
