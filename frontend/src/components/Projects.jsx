import React, { useState, useEffect, useRef } from "react";
import ProfileSnippet from "./ProfileSnippet";
import { useLenis } from "../hooks/useLenis";

const projects = [
    {
        title: "aroject Alpha",
        description: "A revolutionary web application that transforms how users interact with digital content through innovative UI/UX design and cutting-edge technology.",
        tech: ["React", "Node.js", "MongoDB", "WebGL"],
        image: "/api/placeholder/400/300",
        link: "#"
    },
    {
        title: "beural Vision",
        description: "AI-powered image recognition system that processes visual data in real-time, enabling seamless automation across multiple industries.",
        tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
        image: "/api/placeholder/400/300",
        link: "#"
    },
    {
        title: "ceural Vision",
        description: "AI-powered image recognition system that processes visual data in real-time, enabling seamless automation across multiple industries.",
        tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
        image: "/api/placeholder/400/300",
        link: "#"
    },
    {
        title: "deural Vision",
        description: "AI-powered image recognition system that processes visual data in real-time, enabling seamless automation across multiple industries.",
        tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
        image: "/api/placeholder/400/300",
        link: "#"
    },
];

function Projects() {
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);
    const { lenis } = useLenis();

    useEffect(() => { 
        if (!lenis) return;

        const handleScroll = () => {
            if (!containerRef.current || !horizontalRef.current) return;

            const container = containerRef.current;
            const horizontal = horizontalRef.current;
            const containerRect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if projects section is in view
            if (containerRect.top <= 0 && containerRect.bottom >= windowHeight) {
                // Calculate smooth scroll progress using Lenis scroll position
                const scrollableHeight = container.scrollHeight - windowHeight;
                const currentScroll = Math.max(0, -containerRect.top);
                const progress = Math.min(Math.max(currentScroll / scrollableHeight, 0), 1);

                // Apply horizontal transform with hardware acceleration
                const maxTranslateX = horizontal.scrollWidth - window.innerWidth;
                const translateX = progress * maxTranslateX;
                
                // Use transform3d for smooth GPU-accelerated diagonal scrolling
                horizontal.style.transform = `translate3d(-${translateX}px, 0, 0)`;
            } else if (containerRect.top > windowHeight) {
                // Reset when above section
                horizontal.style.transform = `translate3d(0, 0, 0)`;
            }
        };

        // Listen to Lenis scroll events for ultra-smooth scrolling
        lenis.on('scroll', handleScroll);
        
        // Initial call
        handleScroll();
        
        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis]);

    return (
        <section id="projects" 
            ref={containerRef}
            style={{ height: `${projects.length * 100}vh` }}
        >
            <div className="project-sticky-container">
                <div 
                    ref={horizontalRef}
                    className="project-horizontal-container"
                    style={{ width: `${projects.length * 100}vw`,
                             height: `${projects.length * 100}vh`
                    }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={index} 
                            className="project-panel"
                            style={{ width: `100vw`,
                                     height: `100vh`,
                                     transform: `translateY(${index * 100}vh)`
                                  }}
                        >
                            <div className="project-content">
                                <div className="work-image">
                                    <div className="image-placeholder">
                                        <span>{project.title.charAt(0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;