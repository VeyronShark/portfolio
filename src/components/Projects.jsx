import React, { useState } from 'react';

const Projects = ({ data }) => {
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(data.map(item => item.category))];

  const filteredProjects = filter === 'all' 
    ? data 
    : data.filter(project => project.category === filter);

  return (
    <section className="section container">
      <h2 className="section-title">Projects</h2>
      
      <div className="projects-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-img" />
            </div>
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <a href={project.link} className="btn">View Project</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
