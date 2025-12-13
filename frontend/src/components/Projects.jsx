import React, { useRef, useEffect, useState } from "react";
import { useLenis } from "../hooks/useLenis"; // Ensure path is correct
import gradmap from "../assets/gradmap.png";
import de1soc from "../assets/de1soc.jpg";
import github from "../assets/github.png";
import portfolio from "../assets/image.png";

const projects = [
  {
    title: "UBC GradMap",
    description: "A full-stack application facilitating a data-rich, easy way to browse UBC Courses.",
    tech: ["React", "Node.js", "Java", "Spring"],
    image: gradmap,
    link: "https://github.com/Meriadoc-Gradmap/UBCGradMap",
    demo: "https://ubcgradmap.com",
  },
  {
    title: "Custom FPGA CPU",
    description: "A (not really) powerful RISC inspired CPU developed in Verilog.",
    tech: ["FPGA", "Verilog", "Quartus", "Docker"],
    image: de1soc,
    link: "https://github.com/Tian610/CPEN-Year-2/tree/main/CPEN%20211/Labs/Lab%207",
    demo: "#",
  },  
  {
    title: "This Website?",
    description: "A little cheap, perhaps, but this site was one of my favorite projects!",
    tech: ["Azure", "JavaScript", "Vite", "React"],
    image: portfolio,
    link: "https://github.com/Tian610/Portfolio-Website",
    demo: "https://www.tian610.ca",
  },
];

function Projects() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const { lenis } = useLenis();
  const [isMobile, setIsMobile] = useState(false);

  // 1. Detect Screen Size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Diagonal Scroll Animation Logic
  useEffect(() => {
    // If mobile, reset transform and do nothing else
    if (isMobile) {
      if (trackRef.current) {
        trackRef.current.style.transform = "none";
      }
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let metrics = {
      containerTop: 0,
      containerHeight: 0,
      windowHeight: 0,
      windowWidth: 0,
      maxScroll: 0,
    };

    const updateMetrics = () => {
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      metrics.containerTop = rect.top + scrollTop;
      metrics.containerHeight = container.offsetHeight;
      metrics.windowHeight = window.innerHeight;
      metrics.windowWidth = window.innerWidth;
      metrics.maxScroll = metrics.containerHeight - metrics.windowHeight;
    };

    const tick = () => {
      const scrollY = window.scrollY;
      const scrolledInContainer = scrollY - metrics.containerTop;
      let progress = scrolledInContainer / metrics.maxScroll;
      progress = Math.max(0, Math.min(1, progress));

      const xMove = (projects.length * 100 * (metrics.windowWidth / 100)) - metrics.windowWidth;
      const yMove = (projects.length * 100 * (metrics.windowHeight / 100)) - metrics.windowHeight;
      const x = progress * xMove;
      const y = progress * yMove;

      track.style.transform = `translate3d(-${x}px, -${y}px, 0)`;
    };

    let rafId;
    const loop = () => {
      tick();
      rafId = requestAnimationFrame(loop);
    };

    updateMetrics();
    loop();
    const onResize = () => updateMetrics();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [lenis, isMobile]);

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        // On mobile, height is 'auto' to let content flow vertically. 
        // On desktop, it's calculated for the scroll track.
        height: isMobile ? "auto" : `${projects.length * 100}vh`,
        position: "relative",
      }}
    >
      <div
        className="project-sticky-container"
        style={{
          // On mobile, we remove the sticky/fixed behavior
          position: isMobile ? "relative" : "sticky",
          top: 0,
          width: "100%",
          height: isMobile ? "auto" : "100vh",
          overflow: isMobile ? "visible" : "hidden",
        }}
      >
        <div 
          className="title-container project-title" 
          style={{ 
            // On mobile, position normally at the top. On desktop, keep absolute.
            position: isMobile ? "relative" : "absolute", 
            zIndex: 10, 
            top: isMobile ? "auto" : '70vh', 
            left: isMobile ? "0" : '2rem',
            padding: isMobile ? "2rem 1.5rem 0 1.5rem" : "0"
          }}
        >
          <div className="vertical-line"></div>
          <div>
            <h2>Projects</h2>
            <p className="project-subtitle">
              A showcase of my personal and academic projects
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="project-diagonal-track"
          style={{
            // On mobile: relative block. On desktop: absolute huge track.
            position: isMobile ? "relative" : "absolute",
            top: 0,
            left: 0,
            width: isMobile ? "100%" : `${projects.length * 100}vw`,
            height: isMobile ? "auto" : `${projects.length * 100}vh`,
            willChange: isMobile ? "auto" : "transform",
            display: isMobile ? "flex" : "block",
            flexDirection: isMobile ? "column" : "row"
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-panel"
              style={{
                // On mobile: Standard relative block.
                // On desktop: Absolute positioned diagonally (step-ladder).
                position: isMobile ? "relative" : "absolute",
                width: isMobile ? "100%" : "100vw",
                height: isMobile ? "auto" : "100vh",
                left: isMobile ? "auto" : `${index * 100}vw`,
                top: isMobile ? "auto" : `${index * 100}vh`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div className="project-content">
                <div className="work-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                        <div className="project-title-container">
                            <h3 className="project-title-1">{project.title}</h3>
                            <div className="project-links">
                              {project.demo && project.demo !== "#" && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="demo-button">
                                  <span className="demo-button-text">Demo</span>
                                </a>
                              )}
                              <a href={project.link} target="blank">
                                  <img src={github} className="github-icon" alt="github"></img>
                              </a>
                            </div>
                        </div>
                        <p className="project-description">{project.description}</p>
                    <div className="work-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
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