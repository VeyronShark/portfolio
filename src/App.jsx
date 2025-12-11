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
      
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p>© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
