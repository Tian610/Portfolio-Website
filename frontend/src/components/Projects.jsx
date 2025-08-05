import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import project1 from "../assets/project-1.png";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.png";
import project4 from "../assets/project-4.png";
import arrowIcon from "../assets/arrow.png";

function Projects() {
    const navigate = useNavigate(); // 2. Initialize the navigate function

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
                                <button className="btn btn-color-2 project-btn" onClick={() => window.open('https://github.com/Meriadoc-Gradmap/UBCGradMap', '_blank')}>GitHub</button>
                                {/* 3. Update the onClick handler */}
                                <button className="btn btn-color-2 project-btn" onClick={() => navigate('/under-construction')}>Demo</button>
                            </div>
                        </div>
                        <div className="details-container color-container">
                            <div className="article-container">
                                <img src={project2} alt="Project 2" className="project-img" />
                            </div>
                            <h2 className="experience-sub-title project-title">TNTN Robotics</h2>
                            <p>2x World Champion VURC competitive robotics team.</p>
                            <div className="btn-container">
                                <button className="btn btn-color-2 project-btn" onClick={() => window.open('https://www.youtube.com/@TNTN-vexu', '_blank')}>Youtube</button>
                                <button className="btn btn-color-2 project-btn" onClick={() => window.open('https://www.tntnvex.com/', '_blank')}>Website</button>
                            </div>
                        </div>
                        <div className="details-container color-container">
                            <div className="article-container">
                                <img src={project3} alt="Project 3" className="project-img" />
                            </div>
                            <h2 className="experience-sub-title project-title">Spotify Tracker</h2>
                            <p>Full Stack Application to track user spotify top songs and statistics.</p>
                            <div className="btn-container">
                                <button className="btn btn-color-2 project-btn" onClick={() => window.open('https://github.com/Tian610/Spotify-Tracker', '_blank')}>GitHub</button>
                                {/* 3. Update the onClick handler */}
                                <button className="btn btn-color-2 project-btn" onClick={() => navigate('/under-construction')}>Demo</button>
                            </div>
                        </div>
                        <div className="details-container color-container">
                            <div className="article-container">
                                <img src={project4} alt="Project 4" className="project-img" />
                            </div>
                            <h2 className="experience-sub-title project-title">FPGA CPU</h2>
                            <p>A RISC inspired CPU developed in SystemVerilog.</p>
                            <div className="btn-container">
                                <button className="btn btn-color-2 project-btn" onClick={() => window.open('https://github.com/Tian610/CPEN-Year-2/tree/main/CPEN%20211/Labs/Lab%207', '_blank')}>GitHub</button>
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