import React from 'react';

const About = ({ data }) => {
  return (
    <section className="section container">
        <h2 className="section-title">{data.title}</h2>
        <div className="about-content">
          <p>{data.description}</p>
        </div>
    </section>
  );
};

export default About;
