import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const ProjectImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation(); // Prevent potentially triggering other click events
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const hasMultipleImages = images && images.length > 1;

  // If no images or invalid structure, handle gracefully (though data.json should be correct)
  const currentImageSrc = images && images.length > 0 ? images[currentIndex] : "";

  return (
    <div className="w-full md:w-3/5 h-[400px] md:h-full relative overflow-hidden group">
      <div className="absolute inset-0 bg-black/20 z-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
      
      {/* Image */}
      {/* Images - Stacked for transitions */}
      {images.map((imgSrc, idx) => (
        <img 
          key={idx}
          src={imgSrc} 
          alt={`${title} - View ${idx + 1}`} 
          className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-105`} 
        />
      ))}

      {/* Navigation Controls */}
      {hasMultipleImages && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-20"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-20"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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
    <section id="projects" className="py-24 md:py-48 px-6 md:px-24 bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto">
         {/* matched header style */}
        <h2 className="text-[12vw] md:text-[6vw] font-display font-bold leading-[0.85] tracking-tighter uppercase mb-16 mix-blend-difference select-none">
          <span className="block text-white">Selected</span>
          <span className="block text-stroke text-transparent">Works</span>
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat) => (
              <Magnetic key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full border text-sm uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-secondary border-white/20 hover:border-white hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Projects List */}
          <div className="flex flex-col gap-12">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} // Use stable ID instead of index
                className="project-card sticky top-24 min-h-[600px] md:h-[80vh] w-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl origin-top"
                style={{
                    top: `calc(30px + ${index * 20}px)`, // Staggered sticky top based on current list index
                    zIndex: index + 1
                }}
              >
                <div className="h-full flex flex-col md:flex-row">
                  
                  {/* Image Section with Carousel */}
                  <ProjectImageCarousel images={project.images} title={project.title} />

                  {/* Content Section */}
                  <div className="w-full md:w-2/5 flex flex-col h-full"> 
                      <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
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

                      {/* Footer / Button Area */}
                      <div className="p-8 md:p-12 border-t border-white/10 mt-auto bg-[#0a0a0a]">
                        <a 
                          href={project.link}
                          className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-widest group/link hover:text-accent transition-colors"
                          target="_blank"
                        >
                          <span>View Project</span>
                          <span className="text-lg group-hover/link:translate-x-1 transition-transform">→</span>
                        </a>
                      </div>
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
