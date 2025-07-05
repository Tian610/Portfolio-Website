import React from "react";
import techblazersImg from "../assets/techblazers.jpg";
import arrowIcon from "../assets/arrow.png";
import yorkIcon from "../assets/york.jpg";
import tntnIcon from "../assets/tntn.jpg";

function Work() {
    return (
        <>
            <section id="work">
                <p className="section__text__p1">Learn about my</p>
                <h1 className="title">Work History</h1>

                <div className="timeline">
                    <div className="timeline-line"></div>
                    
                    <div className="details-container line-left">
                        <div className="left-container">
                            <div className="work-details-container">
                                <h2 className="work-title">Robotics Instructor</h2>
                                <p>Techblazers Academy</p>
                            </div>
                            <img src={techblazersImg} alt="Techblazers Academy" className="icon" />
                        </div>
                        <ul className="work-description">
                            <li>Coached six V5RC Robotics Teams through the 2024-2025 competition season.</li>
                            <li>Provided comprehensive instruction on hardware design, C++ programming for robotics, game strategy, and technical documentation.</li>
                            <li>Led teams to <b>win tournaments</b> at the provincial and international level, a significant improvement from their prior performance.</li>
                        </ul>
                    </div>

                    <div className="details-container line-right">
                        <div className="right-container">
                            <img src={tntnIcon} alt="Techblazers Academy" className="icon" />
                            <div className="work-details-container">
                                <h2 className="work-title">Team Member</h2>
                                <p>TNTN Robotic Team</p>
                            </div>
                        </div>
                        <ul className="work-description">
                            <li>Earned the World Excellence, Tournament Champion, and Robot Skill Champion Awards, recognizing the <b>top global team</b> out of 109 University teams.</li>
                            <li>Developed real-time odometry systems and autonomous paths in C++, integrating IMUs and Optical Tracking Sensors.</li>
                            <li>Authored a comprehensive 150-page technical report detailing hardware, software, and performance metrics.</li>
                        </ul>
                    </div>

                    <div className="details-container line-left">
                        <div className="left-container">
                            <div className="work-details-container">
                                <h2 className="work-title">AI Research Intern</h2>
                                <p>York University</p>
                            </div>
                            <img src={yorkIcon} alt="York University" className="icon" />
                        </div>
                        <ul className="work-description">
                            <li>Reinforced research on reinforcement learning for human-like autonomous driving in dynamic traffic environments.</li>
                            <li>Validated models through comparative studies on safety and efficiency, testing them using simulated traffic datasets.</li>
                            <li>Collaborated on creating a high-fidelity ROS-Gazebo simulator for LiDAR simulation, model training, and evaluation.</li>
                            <li>Streamlined lane-changing decisions with the DRQfD algorithm, reducing collision risks by <b>15%</b> in autonomous vehicle testing.</li>
                        </ul>
                    </div>
                </div>

                <img
                    src={arrowIcon}
                    alt="arrow"
                    className="icon arrow"
                    onClick={() => (window.location.href = "./#experience")}
                />
            </section>
        </>
    );
}

export default Work;