import React from 'react';

const Skills = ({ data }) => {
  return (
    <section className="section container">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {Object.entries(data).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h3 className="skill-title">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="skill-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
