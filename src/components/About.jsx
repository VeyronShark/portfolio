import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ data }) => {
  const container = useRef();

  useGSAP(() => {
    gsap.from(".about-title", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="about-title text-5xl font-extrabold mb-16 text-center bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent tracking-tight w-full">
                {data.title}
            </h2>
            <div className="about-text bg-surface p-8 md:p-12 rounded-xl border border-white/5 max-w-3xl mx-auto text-lg text-gray-400 text-center leading-loose shadow-lg">
                <p>{data.description}</p>
            </div>
        </div>
    </section>
  );
};

export default About;
