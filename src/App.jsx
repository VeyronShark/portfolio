import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import data from './data.json';

function App() {
  return (
    <div className="App">
      <Hero data={data.hero} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Projects data={data.projects} />
      
      <footer className="text-center p-8 text-gray-400 mt-16 border-t border-white/5">
        <p>© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
