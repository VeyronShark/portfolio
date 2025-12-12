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

function App() {
  return (
    <div className="App min-h-screen bg-background text-primary selection:bg-accent selection:text-white">
      {/* Noise Texture */}
      <div className="noise-overlay" />

      <Hero data={data.hero} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Projects data={data.projects} />
      
      <footer className="py-24 px-6 md:px-24 border-t border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <h2 className="text-[10vw] font-display font-bold opacity-10 leading-none">LET'S TALK</h2>
        <div className="flex gap-8 mt-12 mb-8">
           {data.socials.map((social) => {
             const Icon = iconMap[social.icon];
             return (
               <a 
                 key={social.id} 
                 href={social.link} 
                 className="group flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm"
               >
                 {Icon && <Icon size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />}
                 <span>{social.label}</span>
               </a>
             );
           })}
        </div>
        <p className="text-secondary/40 text-xs uppercase tracking-widest">© {new Date().getFullYear()} {data.hero.name}</p>
      </footer>
    </div>
  );
}

export default App;
