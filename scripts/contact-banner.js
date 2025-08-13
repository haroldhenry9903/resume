document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector(".contact-banner-content");

    // Pause animation on hover
    banner.addEventListener("mouseenter", () => {
        banner.style.animationPlayState = "paused";
    });

    banner.addEventListener("mouseleave", () => {
        banner.style.animationPlayState = "running";
    });
});