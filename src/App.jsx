import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import data from './data.json';

import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="App min-h-screen bg-background text-primary selection:bg-accent selection:text-white">
      <CustomCursor />
      
      {/* Noise Texture */}
      <div className="noise-overlay" />

      <Hero data={data.hero} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Projects data={data.projects} />
      
      <footer className="py-24 px-6 md:px-24 border-t border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <h2 className="text-[10vw] font-display font-bold opacity-10 leading-none">LET'S TALK</h2>
        <div className="flex gap-8 mt-12 mb-8">
           <a href="#" className="text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm">Twitter</a>
           <a href="#" className="text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm">LinkedIn</a>
           <a href="#" className="text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm">Email</a>
        </div>
        <p className="text-secondary/40 text-xs uppercase tracking-widest">© {new Date().getFullYear()} {data.hero.name}</p>
      </footer>
    </div>
  );
}

export default App;
