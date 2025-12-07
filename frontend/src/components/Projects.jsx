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
        const container = containerRef.current;
        const horizontal = horizontalRef.current;
        if (!container || !horizontal) return;

        // Precompute ranges and keep them fresh on resize
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        let scrollableHeight = Math.max(1, container.scrollHeight - windowHeight);
        let maxTranslateX = Math.max(0, horizontal.scrollWidth - windowWidth);
        let maxTranslateY = Math.round(windowHeight * 0.3);

        const recompute = () => {
            windowHeight = window.innerHeight;
            windowWidth = window.innerWidth;
            scrollableHeight = Math.max(1, container.scrollHeight - windowHeight);
            maxTranslateX = Math.max(0, horizontal.scrollWidth - windowWidth);
            maxTranslateY = Math.round(windowHeight * 0.3);
        };

        const onResize = () => {
            recompute();
            tick();
        };
        window.addEventListener('resize', onResize);

        let lastX = null;
        let lastY = null;
        const apply = (x, y) => {
            if (x === lastX && y === lastY) return;
            horizontal.style.transform = `translate3d(-${x}px, -${y}px, 0)`;
            lastX = x;
            lastY = y;
        };

        const tick = () => {
            const rect = container.getBoundingClientRect();
            const inView = rect.top <= 0 && rect.bottom >= windowHeight;

            if (inView) {
                const currentScroll = Math.max(0, -rect.top);
                const progress = Math.max(0, Math.min(1, currentScroll / scrollableHeight));
                const x = Math.round(progress * maxTranslateX);
                const y = Math.round(progress * maxTranslateY);
                apply(x, y);
            } else if (rect.top > windowHeight) {
                apply(0, 0);
            } else if (rect.bottom < 0) {
                apply(maxTranslateX, maxTranslateY);
            }
        };

        // Wire up to Lenis if available, else use scroll + rAF fallback
        let rafId = null;
        const start = () => {
            if (lenis && typeof lenis.on === 'function') {
                lenis.on('scroll', tick);
            } else {
                const loop = () => {
                    tick();
                    rafId = requestAnimationFrame(loop);
                };
                rafId = requestAnimationFrame(loop);
                window.addEventListener('scroll', tick, { passive: true });
            }
            // initial paint
            tick();
        };
        const stop = () => {
            if (lenis && typeof lenis.off === 'function') {
                lenis.off('scroll', tick);
            }
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            window.removeEventListener('scroll', tick);
            window.removeEventListener('resize', onResize);
        };

        // Defer start until next frame to ensure layout is settled on hard reloads
        let startTimeout = null;
        const startAfterReady = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    start();
                });
            });
        };
        const onLoad = () => {
            recompute();
            tick();
        };
        window.addEventListener('load', onLoad, { once: true });

        startAfterReady();
        startTimeout = setTimeout(() => {
            recompute();
            tick();
        }, 50);

        return () => {
            stop();
            if (startTimeout) clearTimeout(startTimeout);
            window.removeEventListener('load', onLoad);
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