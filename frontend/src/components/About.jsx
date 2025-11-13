import React, { useState, useEffect } from "react";
import ProfileSnippet from "./ProfileSnippet";

function About() {
    return (
        <section id="about">
            <div className="about-container">
                <ProfileSnippet 
                    title="Who Am I?"
                    titles={[
                        "Academics",
                        "Personal Life"
                    ]}
                    body= {[
                        "I'm a Computer Engineering student at UBC dedicated to improving the world through technology. As a skilled developer versed in C++, Java, Python, and JavaScript, alongside further experience in developing World Champion Robots for VEXU competition, I'm confident in my ability to make a difference.",
                        "Outside of school, you'll probably find me working on my art, writing stories, and enjoying my time with friends. I love meeting new people and and am always open to new ideas! Got new opportunities or just want to chat? Reach out over on my socials or the contact form."
                    ]}
                />
            </div>
        </section>
    );
}

export default About;