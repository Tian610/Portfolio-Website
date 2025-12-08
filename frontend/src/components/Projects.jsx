import React, { useState, useEffect, useRef } from "react";
import ProfileSnippet from "./ProfileSnippet";
import { useLenis } from "../hooks/useLenis";
import tntnPhoto from "../assets/tntnPhoto.jpg"

const projects = [
    {
        title: "aroject Alpha",
        description: "A revolutionary web application that transforms how users interact with digital content through innovative UI/UX design and cutting-edge technology.",
        tech: ["React", "Node.js", "MongoDB", "WebGL"],
        image: tntnPhoto,
        link: "#"
    },
    {
        title: "beural Vision",
        description: "AI-powered image recognition system that processes visual data in real-time, enabling seamless automation across multiple industries.",
        tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
        image: tntnPhoto,
        link: "#"
    },
    {
        title: "ceural Vision",
        description: "AI-powered image recognition system that processes visual data in real-time, enabling seamless automation across multiple industries.",
        tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
        image: tntnPhoto,
        link: "#"
    },
    {
        title: "deural Vision",
        description: "AI-powered image recognition system that processes visual data in real-time, enabling seamless automation across multiple industries.",
        tech: ["Python", "TensorFlow", "OpenCV", "Docker"],
        image: tntnPhoto,
        link: "#"
    },
];

function Projects() {
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);
    const { lenis } = useLenis();

    useEffect(() => { 
        const container = containerRef.current;
        const horizontal = horizontalRef.current;
        if (!container || !horizontal) return;

        // Hint the browser we will animate transforms
        horizontal.style.willChange = 'transform';

        // Precompute ranges and keep them fresh on resize
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        let containerTop = container.offsetTop;
        let containerHeight = container.offsetHeight;
        let scrollableHeight = Math.max(1, containerHeight - windowHeight);

        // Make horizontal movement faster than vertical for a steeper diagonal
        const horizontalSpeedFactor = 1.1; // increase for faster horizontal translation
        let maxTranslateX = Math.max(0, (horizontal.scrollWidth - windowWidth) * horizontalSpeedFactor);
        let maxTranslateY = Math.round(windowHeight * 0.7);

        const recompute = () => {
            windowHeight = window.innerHeight;
            windowWidth = window.innerWidth;
            containerTop = container.offsetTop;
            containerHeight = container.offsetHeight;
            scrollableHeight = Math.max(1, containerHeight - windowHeight);
            maxTranslateX = Math.max(0, (horizontal.scrollWidth - windowWidth) * horizontalSpeedFactor);
            maxTranslateY = Math.round(windowHeight * 0.7);
        };

        let lastX = null;
        let lastY = null;
        const apply = (x, y) => {
            if (x === lastX && y === lastY) return;
            horizontal.style.transform = `translate3d(-${x}px, -${y}px, 0)`;
            lastX = x;
            lastY = y;
        };

        const tick = () => {
            const scrollY = window.scrollY;
            const start = containerTop;
            const end = containerTop + containerHeight;
            const inView = scrollY >= start && scrollY <= end - windowHeight;

            if (inView) {
                const currentScroll = Math.max(0, scrollY - start);
                const progress = Math.max(0, Math.min(1, currentScroll / scrollableHeight));
                const x = Math.round(progress * maxTranslateX);
                const y = Math.round(progress * maxTranslateY);
                apply(x, y);
            } else if (scrollY < start) {
                apply(0, 0);
            } else if (scrollY > end) {
                apply(maxTranslateX, maxTranslateY);
            }
        };

        // rAF-scheduled updates to avoid multiple ticks per frame
        let isTicking = false;
        const requestTick = () => {
            if (isTicking) return;
            isTicking = true;
            requestAnimationFrame(() => {
                tick();
                isTicking = false;
            });
        };

        // Event wiring: prefer Lenis, else scroll/resize with passive
        const onResize = () => {
            recompute();
            requestTick();
        };
        window.addEventListener('resize', onResize, { passive: true });

        if (lenis && typeof lenis.on === 'function') {
            lenis.on('scroll', requestTick);
        } else {
            window.addEventListener('scroll', requestTick, { passive: true });
        }

        // initial paint
        recompute();
        requestTick();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', requestTick);
            if (lenis && typeof lenis.off === 'function') {
                lenis.off('scroll', requestTick);
            }
        };
    }, [lenis]);
    return (
        <section id="projects" 
            ref={containerRef}
            style={{ height: `${projects.length * 100}vh` }}
        >
            <div className="title-container project-title">
                <div className="vertical-line"></div>
                <div>
                    <h2>Projects</h2>
                    <p className="project-subtitle">A showcase of my personal and academic projects</p>
                </div>
            </div>
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
                                    <img src={project.image}></img>
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