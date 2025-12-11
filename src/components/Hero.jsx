import React from 'react';

const Hero = ({ data }) => {
  return (
    <section className="hero">
      <div className="hero-content animate-fade-in">
        <img src={data.photo} alt={data.name} className="profile-img" />
        <h1 className="hero-name">{data.name}</h1>
        <div className="hero-roles">
          {data.roles.map((role, index) => (
            <span key={index}>{role}</span>
          ))}
        </div>
        <p className="hero-bio">{data.bio}</p>
      </div>
    </section>
  );
};

export default Hero;
