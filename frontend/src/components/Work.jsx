import React, { useState, useEffect, useRef } from "react";
import ProfileSnippet from "./ProfileSnippet";
import tntnPhoto from "../assets/tntnPhoto.jpg"
import lumenPhoto from "../assets/lumenPhoto.png"
import blazersPhoto from "../assets/blazersimage.webp"
import lumentum from "../assets/lumentum.png"
import tntn from "../assets/tntn.jpg"
import techblazers from "../assets/techblazers.png"

const projects = [
    {
        company: "Lumentum",
        title: "Embedded Software DevSecOps Engineer",
        description: [
            "Gained hands-on experience with large-scale CI/CD infrastructure, release engineering workflows, and <b>Linux development</b>",
            "Developed a full-stack analytics dashboard integrating with internal build systems and <b>GitHub</b> workflows to visualize release history, test trends, and pipeline statistics beyond standard GitHub capabilities.",
        ],
        tech: ["CI/CD", "GitHub", "React", "AWS/Azure"],
        image: lumenPhoto,
        icon: lumentum,
        link: "https://www.lumentum.com/en"
    },
    {
        company: "TNTN Robotics",
        title: "Team Member and Designer",
        description: [
            "Earned the <b>World Excellence</b>, Tournament Champion, and Robot Skill Champion Awards, recognizing the top global team out of 109 University teams.",
            "Developed real-time odometry systems and autonomous paths in <b>C++</b>, integrating IMUs and Optical Tracking Sensors."
        ],
        tech: ["C++", "CAD", "FPGA", "Control Systems"],
        image: tntnPhoto,
        icon: tntn,
        link: "https://tntnvex.com/"
    },
    {
        company: "TechBlazers",
        title: "Robotics Coach",
        description: [
            "Coached six V5RC Robotics Teams for the 2024-2025 season of <b>VEX Robotics Competition.</b>",
            "Taught hardware design, C++ programming for Robotics, game strategy, and effective documentation and communication strategies.",
            "Coached teams to <b>championship</b> results at provincial and international events."
        ],
        tech: ["Coaching", "Project Management", "Strategy"],
        icon: techblazers,
        image: blazersPhoto,
        link: "https://techblazers.ca/"
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
                                    An overview of my professional experiences
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
                        <div key={index} className="work-panel" >
                            <div className="work-content">
                                <div className="work-image">
                                    <div className="image-area">
                                        <img src={project.image} className="work-image-img" alt={project.title} />
                                    </div>
                                </div>
                                <div className="work-info">
                                    <div>
                                        <h3 className="work-title-3">{project.title}</h3>
                                        <hr className="line" />
                                        <div style={{ display: "flex" }}>
                                            <img src={project.icon} className="work-icon"></img>
                                            <h3 className="company-title">{project.company}</h3>
                                        </div>
                                    </div>
                                    <ul className="work-description">
                                        {project.description.map((item, itemIndex) => (
                                            <li
                                                key={itemIndex}
                                                dangerouslySetInnerHTML={{ __html: item }}
                                            />
                                        ))}
                                    </ul>
                                    <div className="work-tech">
                                        {project.tech.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                    <a href={project.link}  target="blank" className="work-link">
                                        Learn more →
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