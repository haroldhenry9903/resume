document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".circle");

    circles.forEach(circle => {
        circle.addEventListener("click", () => {
            // Remove clicked class from others
            circles.forEach(c => c.classList.remove("clicked"));
            circle.classList.add("clicked");

            const skillName = circle.querySelector(".skill-label").innerText;
            const description = circle.getAttribute("data-description");

            // Create overlay
            const overlay = document.createElement("div");
            overlay.className = "skill-popup-overlay active";

            // Create popup box
            overlay.innerHTML = `
                <div class="skill-popup">
                    <h3>${skillName}</h3>
                    <p>${description}</p>
                    <button class="close-btn">Close</button>
                </div>
            `;

            // Append to body
            document.body.appendChild(overlay);

            // Close on button click
            overlay.querySelector(".close-btn").addEventListener("click", () => {
                overlay.classList.remove("active");
                circle.classList.remove("clicked");
                setTimeout(() => overlay.remove(), 300);
            });

            // Close on overlay click
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove("active");
                    circle.classList.remove("clicked");
                    setTimeout(() => overlay.remove(), 300);
                }
            });
        });
    });
});

