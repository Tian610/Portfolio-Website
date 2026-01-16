import React from "react";
import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';

import Home from "./pages/Home";
import WIP from "./pages/WIP";
import Gallery from "./pages/Gallery";
import PerlinBackground from "./components/PerlinBackground";
import ScrollProgress from "./components/ScrollProgress";

function App() {
  // Initialize Lenis smooth scrolling
  const { lenis, scrollTo, scrollToTop, scrollToElement } = useLenis();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="app-container">
      <div className="gradient-background"></div>
  {!isMobile && <PerlinBackground />}
      <ScrollProgress />
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/under-construction" element={<WIP />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
