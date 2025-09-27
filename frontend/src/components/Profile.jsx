import React from "react";
import profilePic from "../assets/profile-pic.png";
import linkedinPic from "../assets/linkedin.png";
import githubPic from "../assets/github.png";
import resume from "../assets/Tian Chen Resume.pdf"


function Profile() {
    return (
        <>
            <section id="profile">
                <div class="section__pic-container">
                    <img src={profilePic} alt="Tian Chen Profile Picture" />
                </div>
                <div class="section__text">
                    <p Class="section__text__p1">Hello, I'm</p>
                    <h1 class="title">Tian Chen</h1>
                    <p Class="section__text__p2">UBC Computer Engineering Student</p>
                    
                    {/* <!-- Buttons for Resume and Contact --> */}
                    <div class ="btn-container">
                        <button class ="btn-color-2" onClick={() => window.open(resume)}>Resume/CV</button>

                        <button class ="btn-color-1" onClick={() => window.location.href = "./#contact"}>Contact Info</button>
                    </div>
                    
                    {/* <!-- Socials --> */}
                    <div id ="socials-container">
                        <a href="https://www.linkedin.com/in/tian-chen-bb38092a8/">
                            <img src={linkedinPic} alt="My Linkedin Profile" class ="icon" />
                        </a>

                        <a href="https://github.com/Tian610">
                            <img src={githubPic} alt="My GitHub Profile" class ="icon" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;