import React from "react";
import aboutPic from "../assets/about-pic.png";
import educationIcon from "../assets/education.png";
import experienceIcon from "../assets/experience.png";
import arrowIcon from "../assets/arrow.png";

function About() {
    return (
        <section id="about">
            <p className="section__text__p1">Get To Know More</p>
            <h1 className="title">About Me</h1>

            <div className="section-container">
                <div className="section__pic-container">
                    <img src={aboutPic} alt="Profile Picture" className="about-pic" />
                </div>

                <div className="about-details-container">
                    <div className="about-containers">

                        <div className="details-container slide-in">
                            <img src={educationIcon} alt="Education Icon" className="icon" />
                            <h3>Education</h3>
                            <p>2nd Year Student <br />University of British Columbia</p>
                        </div>
                        
                        <div className="details-container slide-in">
                            <img src={experienceIcon} alt="Experience Icon" className="icon" />
                            <h3>Experience</h3>
                            <p>4+ years <br />Robotics Programmer</p>
                        </div>
                    </div>

                    <div className="text-container">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>

            <img
                src={arrowIcon}
                alt="arrow"
                className="icon arrow"
                onClick={() => (window.location.href = "./#work")}
            />
        </section>
    );
}

export default About;