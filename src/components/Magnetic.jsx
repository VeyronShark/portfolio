import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children }) => {
    const magnetRef = useRef(null);

    useEffect(() => {
        const magnet = magnetRef.current;
        if (!magnet) return;

        const xTo = gsap.quickTo(magnet, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnet, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnet.getBoundingClientRect();
            
            // Calculate center of element
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Distance from center
            const x = clientX - centerX;
            const y = clientY - centerY;

            // Move the element towards mouse (magnetic strength)
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        magnet.addEventListener("mousemove", handleMouseMove);
        magnet.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            magnet.removeEventListener("mousemove", handleMouseMove);
            magnet.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // We clone the child to attach the ref, ensuring we don't add an extra wrapper div if not needed
    // But wrapping in a div is safer for layout.
    return (
        <div ref={magnetRef} className="inline-block">
            {children}
        </div>
    );
};

export default Magnetic;
