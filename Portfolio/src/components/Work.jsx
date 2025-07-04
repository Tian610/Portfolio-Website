import React from "react";
import techblazersImg from "../assets/techblazers.jpg";
import arrowIcon from "../assets/arrow.png";

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
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>

                    <div className="details-container line-right">
                        <div className="right-container">
                            <img src={techblazersImg} alt="Techblazers Academy" className="icon" />
                            <div className="work-details-container">
                                <h2 className="work-title">Robotics Instructor</h2>
                                <p>Techblazers Academy</p>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>

                    <div className="details-container line-left">
                        <div className="left-container">
                            <div className="work-details-container">
                                <h2 className="work-title">Robotics Instructor</h2>
                                <p>Techblazers Academy</p>
                            </div>
                            <img src={techblazersImg} alt="Techblazers Academy" className="icon" />
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
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