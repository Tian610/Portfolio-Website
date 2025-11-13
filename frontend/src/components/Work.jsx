import React, { useState, useEffect } from "react";
import ProfileSnippet from "./ProfileSnippet";

function Work() {
    const projects = [
        {
            title: "Project 1",
            description: "Description of your first project with technologies used and achievements.",
            tech: ["React", "Node.js", "MongoDB"]
        },
        {
            title: "Project 2", 
            description: "Description of your second project with technologies used and achievements.",
            tech: ["Vue.js", "Python", "PostgreSQL"]
        },
        {
            title: "Project 3",
            description: "Description of your third project with technologies used and achievements.",
            tech: ["Angular", "Java", "MySQL"]
        },
        {
            title: "Project 2", 
            description: "Description of your second project with technologies used and achievements.",
            tech: ["Vue.js", "Python", "PostgreSQL"]
        },
        {
            title: "Project 3",
            description: "Description of your third project with technologies used and achievements.",
            tech: ["Angular", "Java", "MySQL"]
        },
        {
            title: "Project 2", 
            description: "Description of your second project with technologies used and achievements.",
            tech: ["Vue.js", "Python", "PostgreSQL"]
        },
        {
            title: "Project 3",
            description: "Description of your third project with technologies used and achievements.",
            tech: ["Angular", "Java", "MySQL"]
        },
        {
            title: "Project 2", 
            description: "Description of your second project with technologies used and achievements.",
            tech: ["Vue.js", "Python", "PostgreSQL"]
        },
        {
            title: "Project 3",
            description: "Description of your third project with technologies used and achievements.",
            tech: ["Angular", "Java", "MySQL"]
        },
    ];

    return (
        <section id="work">
            <div className="work-container">
                <div className="work-header">
                    <div className="title-container">
                        <div className="vertical-line"></div>
                        <h2>My Work</h2>
                    </div>
                </div>
                
                <div className="horizontal-scroll-section">
                    {projects.map((project, index) => (
                        <div key={index} className="work-card">
                            <h3 className="work-title">{project.title}</h3>
                            <p className="work-description">{project.description}</p>
                            <div className="tech-stack">
                                {project.tech.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Work;