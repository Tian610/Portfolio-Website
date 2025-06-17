import React from "react";

function Navbar() {
    return (
        <>
            <nav id="desktop-nav">
                <div className="logo">Tian Chen</div>
                <div>
                    {/* ul refers to unordered list */}
                    <ul className="nav-links">
                        <li><a href="#about">About</a></li> {/* the # will allow us to link to other parts of the site*/}
                        <li><a href="#work">Work</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav id="hamburger-nav">
                <div className="logo">Tian Chen</div>
                <div className="hamburger-menu">
                    {/* allows us to run js code on click */}
                    <div className="hamburger-icon" onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="menu-links">
                        <li><a href="#about" onClick={toggleMenu}>About</a></li>
                        <li><a href="#work" onClick={toggleMenu}>Work</a></li>
                        <li><a href="#experience" onClick={toggleMenu}>Experience</a></li>
                        <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
                        <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
                    </div>
                </div>
            </nav>
        </>
    );
}

function toggleMenu() {
    // targets the icon and menu
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // Use the inbuilt js function toggle to allow us to css with the "open"
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

export default Navbar;