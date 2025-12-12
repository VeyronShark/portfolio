import React from 'react';

const About = ({ data }) => {
  return (
    <section id="about" className="py-24 md:py-48 px-6 md:px-24 bg-background text-primary relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left Column - Heading */}
        <div className="relative">
          <h2 className="text-[12vw] md:text-[6vw] font-display font-bold leading-[0.85] tracking-tighter uppercase sticky top-24 mix-blend-difference select-none">
            <span className="block text-white">Who</span>
            <span className="block text-stroke text-transparent">I Am</span>
          </h2>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col gap-8">
           <div className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-secondary/90 md:indent-24">
             {data.description}
           </div>
           
           <div className="w-full h-[1px] bg-white/10 mt-12 mb-4"></div>
           
           <div className="flex justify-between items-center text-xs uppercase tracking-widest text-secondary font-medium">
             <span>Based in India</span>
             <span>Open to Remote</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;
