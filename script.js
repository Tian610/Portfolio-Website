function toggleMenu() {
    // targets the icon and menu
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // Use the inbuilt js function toggle to allow us to css with the "open"
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}