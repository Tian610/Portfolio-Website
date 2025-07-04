import React from "react";
import { useEffect } from "react";

import './mediaquries.css';
import './background.css';
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import About from "./components/About";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {

  useEffect(() => {
    // Intersection Observer for slide-in
    const observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    const slidingElements = document.querySelectorAll('.slide-in');
    slidingElements.forEach(el => observer.observe(el));

    // 3D tilt effect
    const containers = document.querySelectorAll('.details-container');
    containers.forEach(container => {
      container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        container.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      container.addEventListener('mouseleave', function() {
        container.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });

    // Cleanup
    return () => {
      slidingElements.forEach(el => observer.unobserve(el));
      containers.forEach(container => {
        container.onmousemove = null;
        container.onmouseleave = null;
      });
    };
  }, []);
  
  return (
    
    <>
      <div class="bg"></div>
      <div class="mica-overlay"></div>
      <Navbar />
      <Profile />
      <About />
      <Work />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>

  );
}

export default App;
