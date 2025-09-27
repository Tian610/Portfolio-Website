import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './mediaquries.css';
import './background.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WIP from "./pages/WIP";
import Gallery from "./pages/Gallery";

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
      <Router>
          <div className="bg"></div>
          <div className="mica-overlay"></div>
          <NavbarWrapper />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/under-construction" element={<WIP />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>

          <Footer />
      </Router>
    </>

  );
}

// Wrapper component to access location inside Router
function NavbarWrapper() {
  const location = useLocation();
  return <Navbar currentPath={location.pathname} />;
}

export default App;
