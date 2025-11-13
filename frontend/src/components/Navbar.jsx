import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };   

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const goToGallery = () => {
        navigate('/gallery');
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <>
            <nav className={`nav-header ${isScrolled ? 'visible' : ''}`}>
                <h1 onClick={scrollToTop}>Tian Chen</h1>
                <div className="nav-links">
                    <button onClick={() => scrollToSection('profile')} className="nav-link">
                        Profile
                    </button>
                    <button onClick={() => scrollToSection('about')} className="nav-link">
                        About
                    </button>
                    <button onClick={goToGallery} className="nav-link">
                        Gallery
                    </button>
                </div>
            </nav>

            <div className={`nav-footer-left ${isScrolled ? 'visible' : ''}`}>
                <div className="title-footer">PORTFOLIO 2025</div>
            </div>

            <div className={`nav-footer-right ${isScrolled ? 'visible' : ''}`}>
                <a href="https://www.github.com/tian610" className="footer-item">
                    <img src={github} className="nav-icon"></img>
                    <div className="Akeila-text">GitHub</div>
                </a>
                <a href="https://www.linkedin.com/in/tianxingchen" className="footer-item">
                    <img src={linkedin} className="nav-icon"></img>
                    <div className="Akeila-text">LinkedIn</div>
                </a>
            </div>
        </>
    );
}

export default Navbar;