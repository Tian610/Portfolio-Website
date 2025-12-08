import React, { useState, useEffect } from "react";

function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate total page scroll progress
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollTop / documentHeight, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        // Initialize on mount
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="scroll-progress global">
            <div 
                className="progress-bar"
                style={{ width: `${scrollProgress * 100}%` }}
            ></div>
        </div>
    );
}

export default ScrollProgress;
