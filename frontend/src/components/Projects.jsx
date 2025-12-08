import React, { useRef, useEffect } from "react";
import { useLenis } from "../hooks/useLenis";
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

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Cache metrics to avoid layout thrashing
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
      
      metrics.containerTop = rect.top + scrollTop; // Absolute top position
      metrics.containerHeight = container.offsetHeight;
      metrics.windowHeight = window.innerHeight;
      metrics.windowWidth = window.innerWidth;
      
      // The distance the user can scroll within this component
      metrics.maxScroll = metrics.containerHeight - metrics.windowHeight;
    };

    const tick = () => {
      const scrollY = window.scrollY;

      // Calculate how far we have scrolled PAST the top of the container
      const scrolledInContainer = scrollY - metrics.containerTop;

      // Normalize this to a 0 to 1 value (clamped)
      let progress = scrolledInContainer / metrics.maxScroll;
      progress = Math.max(0, Math.min(1, progress));

      // Calculate the transform
      // We want to move the track so the last project ends up exactly in the viewport
      // Total movement needed = Total Track Dimension - One Viewport
      const xMove = (projects.length * 100 * (metrics.windowWidth / 100)) - metrics.windowWidth;
      const yMove = (projects.length * 100 * (metrics.windowHeight / 100)) - metrics.windowHeight;

      const x = progress * xMove;
      const y = progress * yMove;

      track.style.transform = `translate3d(-${x}px, -${y}px, 0)`;
    };

    // --- Optimization: Animation Loop ---
    let rafId;
    const loop = () => {
      tick();
      rafId = requestAnimationFrame(loop);
    };

    // Initialize
    updateMetrics();
    loop(); // Start the loop

    const onResize = () => updateMetrics();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [lenis]); // Re-bind if lenis instance changes, though usually not strictly necessary if using native scrollY

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        // The scroll track height: Viewport height * number of projects
        height: `${projects.length * 100}vh`,
        position: "relative",
      }}
    >
      {/* Sticky Container: Holds the viewport steady while we scroll the track */}
      <div
        className="project-sticky-container"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="title-container project-title" style={{ position: "absolute", zIndex: 10, top: '70vh', left: '2rem' }}>
          <div className="vertical-line"></div>
          <div>
            <h2>Projects</h2>
            <p className="project-subtitle">
              A showcase of my personal and academic projects
            </p>
          </div>
        </div>

        {/* The Diagonal Track */}
        <div
          ref={trackRef}
          className="project-diagonal-track"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${projects.length * 100}vw`,
            height: `${projects.length * 100}vh`,
            willChange: "transform",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-panel"
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                // Position projects diagonally:
                // P1: 0,0 | P2: 100vw, 100vh | P3: 200vw, 200vh
                left: `${index * 100}vw`,
                top: `${index * 100}vh`,
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
                                  <img src={github} className="github-icon"></img>
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