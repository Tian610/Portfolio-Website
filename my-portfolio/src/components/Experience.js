import React from "react";
import checkmarkIcon from "../assets/checkmark.png";
import arrowIcon from "../assets/arrow.png";


function Experience() {

    const frontendSkills = [
        { title: "HTML", level: "Experienced" },
        { title: "CSS", level: "Experienced" },
        { title: "JavaScript", level: "Experienced" },
        { title: "React", level: "Intermediate" },
        { title: "TypeScript", level: "Intermediate" },
        { title: "Redux", level: "Intermediate" },
    ];

    const backendSkills = [
        { title: "Node.js", level: "Intermediate" },
        { title: "Express", level: "Intermediate" },
        { title: "MongoDB", level: "Intermediate" },
        { title: "Python", level: "Experienced" },
        { title: "C++", level: "Experienced" },
        { title: "SQL", level: "Intermediate" },
    ];

    return (
        <>
            <section id ="experience">
                <p class ="section__text__p1">Explore My</p>
                <h1 class ="title">Experiences</h1>

                <div class="experience-details-container" id="experience-sections">
                    <div class="about-containers">
                        <div class="details-container">
                            <h2 class="experience-sub-title">Frontend Development</h2>
                            <div className="article-container">
                                {frontendSkills.map((skill, idx) => (
                                    <ExperienceBullet
                                    key={skill.title}
                                    icon={checkmarkIcon}
                                    title={skill.title}
                                    level={skill.level}
                                    />
                                ))}
                            </div>
                        </div>
                        <div class="details-container">
                            <h2 class="experience-sub-title">Backend Development</h2>
                            <div className="article-container">
                                {frontendSkills.map((skill, idx) => (
                                    <ExperienceBullet
                                    key={skill.title}
                                    icon={checkmarkIcon}
                                    title={skill.title}
                                    level={skill.level}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <img src={arrowIcon} alt="arrow" class="icon arrow" onclick="location.href='./#projects'"></img>
                
            </section>
        </>
    );
}

function ExperienceBullet({ icon, title, level }) {
  return (
    <article>
      <img src={icon} alt="checkmark" className="icon" />
      <div>
        <h3>{title}</h3>
        <p>{level}</p>
      </div>
    </article>
  );
}

export default Experience;
