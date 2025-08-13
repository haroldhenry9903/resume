/**
 * Expandable Project Details
 * This script enables click-to-expand/collapse for project items.
 * Each project title toggles the visibility of its details.
 * 
 * Usage: 
 * - Add the 'expandable-project' class to each <li> in the projects list.
 * - Place the extra details in a <div class="project-details"> inside the <li>.
 */

document.addEventListener("DOMContentLoaded", function () {
    const projectItems = document.querySelectorAll('.expandable-project');

    projectItems.forEach(item => {
        const title = item.querySelector('.project-title');
        const details = item.querySelector('.project-details');

        // Hide details by default
        details.style.display = 'none';

        title.style.cursor = 'pointer';
        title.addEventListener('click', function () {
            const isVisible = details.style.display === 'block';
            details.style.display = isVisible ? 'none' : 'block';
            title.querySelector('.toggle-icon').textContent = isVisible ? '+' : '–';
        });
    });
});