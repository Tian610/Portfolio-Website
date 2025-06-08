function toggleMenu() {
    // targets the icon and menu
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // Use the inbuilt js function toggle to allow us to css with the "open"
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const experiences = [
    {
      title: "Robotics Programming",
      skills: [
        { skill: "C++", level: "Experienced" },
        { skill: "ROS", level: "Intermediate" },
        { skill: "PID Tuning", level: "Experienced" },
        { skill: "C++", level: "Experienced" },
        { skill: "ROS", level: "Intermediate" },
        { skill: "PID Tuning", level: "Experienced" }
      ]
    },
    {
      title: "Computer Engineering",
      skills: [
        { skill: "JavaScript", level: "Experienced" },
        { skill: "React", level: "Intermediate" },
        { skill: "Node.js", level: "Intermediate" },
        { skill: "C++", level: "Experienced" },
        { skill: "ROS", level: "Intermediate" },
        { skill: "PID Tuning", level: "Experienced" }
      ]
    },
    {
      title: "Frontend Development",
      skills: [
        { skill: "Arduino", level: "Experienced" },
        { skill: "Tinkercad", level: "Intermediate" },
        { skill: "Mentoring", level: "Experienced" },
        { skill: "C++", level: "Experienced" },
        { skill: "ROS", level: "Intermediate" },
        { skill: "PID Tuning", level: "Experienced" }
      ]
    }
  ];

  const container = document.getElementById("experience-sections");

  experiences.forEach(({ title, skills }) => {
    // Create section wrapper
    const section = document.createElement("div");
    section.classList.add("about-containers", "slide-in");

    // Build inner HTML
    section.innerHTML = `
      <div class="details-container">
        <h2 class="experience-sub-title">${title}</h2>
        <div class="article-container">
          ${skills.map(skillObj => `
            <article>
              <img src="./assets/checkmark.png" alt="experience" class="icon">
              <div>
                <h3>${skillObj.skill}</h3>
                ${skillObj.level}
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;

    container.appendChild(section);
  });

    // Animate when in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        });
    }, {
        threshold: 0.1
    });

    const slidingElements = document.querySelectorAll('.slide-in');
    slidingElements.forEach(el => observer.observe(el));
});

