import React, { useState, useEffect } from "react";
import ProfileSnippet from "./ProfileSnippet";

function About() {
    return (
        <>
            <div className="about-container">
                    <ProfileSnippet 
                        title="Who Am I?"
                        body= "I'm a Computer Engineering student at UBC dedicated to improving the world through technology.
                            As a skilled developer versed in C++, Java, Python, and JavaScript, alongside further experience
                            in developing World Champion Robots for VEXU competition, I'm confident in my ability to make a difference."
                    />
            </div>
        </>
    );
}

export default About;