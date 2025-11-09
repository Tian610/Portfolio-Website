import React, { useState, useEffect } from "react";
import profilePic from "../assets/profile-pic.png";
import linkedinPic from "../assets/linkedin.png";
import githubPic from "../assets/github.png";
import resume from "../assets/Tian Chen Resume.pdf";
import TitleContainer from "./ProfileSnippet";


function Profile() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };    
    
    return (
        <>  
            {/* Navigation Header - appears when scrolled */}
            <nav className={`nav-header ${isScrolled ? 'visible' : ''}`}>
                <h1 onClick={scrollToTop}>Tian Chen</h1>
            </nav>

            <section id="profile">
                    { /* Scrolling*/}
                    <div className={`scrolling-container ${isScrolled ? 'hidden' : ''}`}>
                        <div className="scrolling-line scroll-right">
                            <span>Engineer • Artist • Creator • Innovator • Engineer • Arist • Creator • Innovator • </span>
                            <span>Engineer • Artist • Creator • Innovator • Engineer • Arist • Creator • Innovator • </span>

                        </div>
                        <div className="scrolling-line scroll-left">
                            <span>Frontend • Backend • Fullstack • Mobile • Frontend • Backend • Fullstack • Mobile • </span>
                            <span>Frontend • Backend • Fullstack • Mobile • Frontend • Backend • Fullstack • Mobile • </span>
                        </div>
                    </div>
                    
                    {/* Main Title */}
                    <div className="profile-content">
                        <div className={`main-title ${isScrolled ? 'scrolled' : ''}`}>
                            <h1>Tian Chen</h1>
                            <div className="title-footer">PORTFOLIO 2025</div>
                        </div>
                        
                    </div>
            </section>
        </>
    );
}

export default Profile;