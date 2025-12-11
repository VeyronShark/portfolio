import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ data }) => {
  const container = useRef();

  useGSAP(() => {
    gsap.from(".bento-item", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-base text-secondary uppercase tracking-widest font-medium mb-12">Who I Am</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full h-auto md:h-[600px]">
          {/* Main Bio Card */}
          <div className="bento-item md:col-span-8 bg-surface rounded-3xl p-10 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/30 transition-colors duration-500"/>
            
            <h3 className="text-4xl md:text-5xl font-display font-medium leading-tight relative z-10">
              {data.description}
            </h3>
            <div className="mt-8 flex gap-4">
              <span className="px-4 py-2 rounded-full border border-white/20 text-sm uppercase tracking-wide">Developer</span>
              <span className="px-4 py-2 rounded-full border border-white/20 text-sm uppercase tracking-wide">Designer</span>
            </div>
          </div>

          {/* Side Stats Card */}
          <div className="bento-item md:col-span-4 flex flex-col gap-6 h-full">
            <div className="bg-surface rounded-3xl p-8 border border-white/5 flex-grow flex flex-col justify-center items-center text-center group hover:border-white/10 transition-colors">
              <span className="text-6xl font-display font-bold text-accent mb-2">3+</span>
              <span className="text-secondary uppercase tracking-widest text-sm">Years Experience</span>
            </div>
            <div className="bg-surface rounded-3xl p-8 border border-white/5 flex-grow flex flex-col justify-center items-center text-center group hover:border-white/10 transition-colors">
              <span className="text-6xl font-display font-bold text-white mb-2">20+</span>
              <span className="text-secondary uppercase tracking-widest text-sm">Projects Shipped</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
