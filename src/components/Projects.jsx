import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ data }) => {
  const container = useRef();
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Extract unique categories from projects data
  const categories = useMemo(() => {
    const defaultCategories = ["all"];
    const projectCategories = [...new Set(data.map(project => project.category))];
    return [...defaultCategories, ...projectCategories];
  }, [data]);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return data;
    return data.filter(project => project.category === activeCategory);
  }, [activeCategory, data]);
  
  useGSAP(() => {
    // Kill previous ScrollTriggers to prevent conflicts when list changes
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    // Refresh ScrollTrigger to recalculate positions correctly
    ScrollTrigger.refresh();

    const cards = gsap.utils.toArray(".project-card");
    
    cards.forEach((card, i) => {

      
       // Scale down effect for cards
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.5,
        scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
      })
    });
    
  }, { scope: container, dependencies: [filteredProjects] }); // Re-run when filtered list changes

  return (
    <section ref={container} className="py-24 md:py-48 px-6 md:px-24 bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto">
         {/* matched header style */}
        <h2 className="text-[12vw] md:text-[6vw] font-display font-bold leading-[0.85] tracking-tighter uppercase mb-16 mix-blend-difference select-none">
          <span className="block text-white">Selected</span>
          <span className="block text-stroke text-transparent">Works</span>
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border text-sm uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-secondary border-white/20 hover:border-white hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-12">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} // Use stable ID instead of index
              className="project-card sticky top-24 min-h-[600px] md:h-[80vh] w-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl origin-top"
              style={{
                  top: `calc(100px + ${index * 20}px)`, // Staggered sticky top based on current list index
                  zIndex: index + 1
              }}
            >
              <div className="h-full flex flex-col md:flex-row">
                
                {/* Image Section */}
                <div className="w-full md:w-3/5 h-[400px] md:h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/20 z-10 group-hover:opacity-0 transition-opacity duration-500" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-secondary text-sm uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">{project.category}</span>
                            <span className="text-secondary/50 font-display text-4xl font-bold">0{index + 1}</span>
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-display font-medium mb-6 leading-tight">
                            {project.title}
                        </h3>
                        
                        <p className="text-secondary/80 text-lg leading-relaxed mb-8">
                            {project.description}
                        </p>
                    </div>

                    <a 
                      href={project.link}
                      className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-widest group/link hover:text-accent transition-colors"
                    >
                      <span>View Project</span>
                      <span className="text-lg group-hover/link:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
