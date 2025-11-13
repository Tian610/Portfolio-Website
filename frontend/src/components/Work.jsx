import React, { useState, useEffect, useRef } from "react";
import ProfileSnippet from "./ProfileSnippet";

const projects = [
    {
        title: "Project Alpha",
        description: "A revolutionary web application that transforms how users interact with digital content through innovative UI/UX design and cutting-edge technology.",
        tech: ["React", "Node.js", "MongoDB", "WebGL"],
        image: "/api/placeholder/400/300",
        link: "#"
    },
    {
        title: "Neural Vision",
        description: "AI-powered image recognition system that processes visual data in real-time, enabling seamless automation across multiple industries.",
        tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
        image: "/api/placeholder/400/300",
        link: "#"
    },
];

function Work() {
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !horizontalRef.current) return;

            const container = containerRef.current;
            const horizontal = horizontalRef.current;
            const containerRect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if work section is in view
            if (containerRect.top <= 0 && containerRect.bottom >= windowHeight) {
                // Calculate scroll progress within the work section
                const scrollableHeight = container.scrollHeight - windowHeight;
                const currentScroll = Math.abs(containerRect.top);
                const progress = Math.min(currentScroll / scrollableHeight, 1);

                // Apply horizontal transform
                const maxTranslateX = horizontal.scrollWidth - window.innerWidth;
                const translateX = progress * maxTranslateX;
                horizontal.style.transform = `translateX(-${translateX}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section 
            id="work" 
            ref={containerRef}
            style={{ height: `${100 + projects.length * 100}vh` }}
        >
            <div className="work-sticky-container">
                <div 
                    ref={horizontalRef}
                    className="work-horizontal-container"
                    style={{ width: `${projects.length * 100}vw` }}
                >
                    <div className="work-intro-panel">
                        <div className="work-intro-content">
                            <div>
                                <h2 className="work-title">Selected Work</h2>
                                <p className="work-subtitle">
                                    A showcase of projects that demonstrate innovation, creativity, and technical excellence.
                                </p>
                                <div className="scroll-indicator">
                                    <span>Scroll to explore</span>
                                    <div className="scroll-arrow">→</div>
                                </div>
                            </div>
                            <div className="vertical-line"></div>
                        </div>
                    </div>
                    
                    {projects.map((project, index) => (
                        <div key={index} className="work-panel">
                            <div className="work-content">
                                <div className="work-image">
                                    <div className="image-placeholder">
                                        <span>{project.title.charAt(0)}</span>
                                    </div>
                                </div>
                                <div className="work-info">
                                    <h3 className="work-title-2">{project.title}</h3>
                                    <p className="work-description">{project.description}</p>
                                    <div className="work-tech">
                                        {project.tech.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                    <a href={project.link} className="work-link">
                                        View Project →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Work;