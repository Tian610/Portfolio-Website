import React, { useState, useEffect } from "react";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };   

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
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
                </div>
            </nav>
        </>
    );
}

export default Navbar;