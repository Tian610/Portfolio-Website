import React from "react";
import aboutPic from "../assets/about-pic.png";
import educationIcon from "../assets/education.png";
import experienceIcon from "../assets/experience.png";
import arrowIcon from "../assets/arrow.png";
import { Canvas } from "@react-three/fiber";
import Terrain from "./Terrain";
import Lights from "./Lights";
import { OrbitControls } from "@react-three/drei";

function ThreeCanvas() {
  return (
    <div style={{ width: "400px", height: "400px"}}>
        <Canvas 
          camera={{ position: [0, 25, 25], fov: 55 }}
          // 1. Enable transparency on the renderer
          gl={{ alpha: true }}
          // 2. Tell the scene to use a transparent background
          onCreated={({ scene }) => {
            scene.background = null;
          }}
        >
          <>
            <OrbitControls /> 
            <Lights />
            <Terrain />
          </>
        </Canvas>
      </div>
  );
}

function About() {
    return (
        <section id="about">
            <p className="section__text__p1">Get To Know More</p>
            <h1 className="title">About Me</h1>

            <div className="section-container">
                <div className="section__pic-container">
                      <ThreeCanvas />
                </div>

                <div className="about-details-container">
                    <div className="about-containers">

                        <div className="details-container slide-in">
                            <img src={educationIcon} alt="Education Icon" className="icon" />
                            <h3>Education</h3>
                            <p>3rd Year Student <br />University of British Columbia</p>
                        </div>
                        
                        <div className="details-container slide-in">
                            <img src={experienceIcon} alt="Experience Icon" className="icon" />
                            <h3>Experience</h3>
                            <p>VEXU Robotics<br />World Champion</p>
                        </div>
                    </div>

                    <div className="text-container">
                        <p>
                            I'm a <b>Computer Engineering</b> student at UBC dedicated to improving the world through technology. As a skilled developer versed in C++, Java, Python,
                            and JavaScript, alongside further experience in developing <b>World Champion</b> Robots for VEXU competition, I'm confident in my ability to make 
                            a difference.
                        </p>

                        <hr className="text-divider" />

                        <p>
                            Outside of school, you'll probably find me working on my <b>art</b>, writing stories, and enjoying my time with friends. I love meeting new people and
                            and am always open to new ideas! Please don't hesitate to reach out with news about new opportunities, or if you just want to chat!
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
