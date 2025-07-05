import React from "react";
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.png";
import project3 from "../assets/project-3.png";
import arrowIcon from "../assets/arrow.png";

function Projects() {
    return (
        <>
            <section id="projects">
                <p className="section__text__p1">Browse My</p>
                <h1 className="title">Projects</h1>
                
                <div className="experience-details-container">
                    <div className="about-containers">
                        <div className="details-container color-container">
                            <div className="article-container">
                                <img src={project1} alt="Project 1" className="project-img" />
                            </div>
                            <h2 className="experience-sub-title project-title">UBC GradMap</h2>
                            <p>A full-stack application to enhance the UBC course selection process.</p>
                            <div className="btn-container">
                                <button className="btn btn-color-2 project-btn" onClick={() => window.location.href='https://github.com/Meriadoc-Gradmap/UBCGradMap'}>GitHub</button>
                                <button className="btn btn-color-2 project-btn" onClick={() => window.location.href='https://www.github.com'}>Demo</button>
                            </div>
                        </div>
                        <div className="details-container color-container">
                            <div className="article-container">
                                <img src={project2} alt="Project 2" className="project-img" />
                            </div>
                            <h2 className="experience-sub-title project-title">TNTN Robotics</h2>
                            <div className="btn-container">
                                <button className="btn btn-color-2 project-btn" onClick={() => window.location.href='https://www.github.com'}>GitHub</button>
                                <button className="btn btn-color-2 project-btn" onClick={() => window.location.href='https://www.github.com'}>Demo</button>
                            </div>
                        </div>
                        <div className="details-container color-container">
                            <div className="article-container">
                                <img src={project3} alt="Project 3" className="project-img" />
                            </div>
                            <h2 className="experience-sub-title project-title">Spoti-Stats</h2>
                            <div className="btn-container">
                                <button className="btn btn-color-2 project-btn" onClick={() => window.location.href='https://www.github.com'}>GitHub</button>
                                <button className="btn btn-color-2 project-btn" onClick={() => window.location.href='https://www.github.com'}>Demo</button>
                            </div>
                        </div>
                    </div>
                </div>

                <img src={arrowIcon} alt="arrow" className="icon arrow" onClick={() => window.location.href='./#contact'} />

            </section>
        </>
    );
}

export default Projects;