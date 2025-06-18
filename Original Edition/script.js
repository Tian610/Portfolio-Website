function toggleMenu() {
    // targets the icon and menu
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // Use the inbuilt js function toggle to allow us to css with the "open"
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {

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

document.querySelectorAll('.details-container').forEach(container => {
    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        container.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    container.addEventListener('mouseleave', function() {
        container.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

function sendEmail() {
    
}

