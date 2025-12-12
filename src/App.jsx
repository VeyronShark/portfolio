import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import data from './data.json';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const iconMap = {
  Twitter: Twitter,
  Linkedin: Linkedin,
  Github: Github,
  Mail: Mail
};

import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Magnetic from './components/Magnetic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false)
    });
    
    tl.to(".loading-screen", {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      delay: 0.5
    });

    tl.from(".hero-char", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out"
    }, "-=0.8");  // Overlap with loading screen exit
  });

  return (
    <div className="App min-h-screen bg-background text-primary selection:bg-accent selection:text-white">
      {/* Loading Screen */}
      <div className="loading-screen fixed inset-0 bg-[#000] z-[9999] flex items-center justify-center pointer-events-none">
          <div className="text-white font-display text-4xl animate-pulse">LOADING</div>
      </div>

      {/* Noise Texture */}
      <div className="noise-overlay" />
      
      <Navbar />

      <div id="home">
        <Hero data={data.hero} />
      </div>
      <div id="about">
        <About data={data.about} />
      </div>
      <div id="skills">
        <Skills data={data.skills} />
      </div>
      <div id="projects">
        <Projects data={data.projects} />
      </div>
      
      <footer id="contact" className="py-24 px-6 md:px-24 border-t border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <h2 className="text-[10vw] font-display font-bold opacity-10 leading-none">LET'S TALK</h2>
        <div className="flex gap-8 mt-12 mb-8">
           {data.socials.map((social) => {
             const Icon = iconMap[social.icon];
             return (
               <Magnetic key={social.id}>
                 <a 
                   href={social.link} 
                   className="group flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm p-4"
                 >
                   {Icon && <Icon size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />}
                   <span>{social.label}</span>
                 </a>
               </Magnetic>
             );
           })}
        </div>
        <p className="text-secondary/40 text-xs uppercase tracking-widest">© {new Date().getFullYear()} {data.hero.name}</p>
      </footer>
    </div>
  );
}

export default App;
