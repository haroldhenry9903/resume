/**
 * Responsive Particle Background Effect
 * Adds interactive particles to the background of .resume-container.
 * Particles move randomly and react to mouse hover.
 * No external dependencies required.
 */

(function () {
    // Configuration
    const PARTICLE_COUNT = window.innerWidth > 900 ? 60 : 30;
    const PARTICLE_COLOR = "#f4b400";
    const PARTICLE_RADIUS = 2.5;
    const LINE_DISTANCE = 120;
    const HOVER_RADIUS = 100;

    // Create canvas
    const container = document.querySelector('.resume-container');
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = 0;
    canvas.style.pointerEvents = 'none';
    canvas.id = 'particles-bg-canvas';

    // Ensure container is positioned
    container.style.position = 'relative';
    container.insertBefore(canvas, container.firstChild);

    let ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
        width = container.offsetWidth;
        height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle object
    function Particle() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = PARTICLE_RADIUS;
    }

    Particle.prototype.move = function () {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    };

    // Create particles
    let particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    // Mouse interaction
    let mouse = { x: null, y: null };
    container.addEventListener('mousemove', function (e) {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw particles
        particles.forEach(p => {
            p.move();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = PARTICLE_COLOR;
            ctx.globalAlpha = 0.8;
            ctx.fill();
            ctx.globalAlpha = 1;
        });

        // Draw lines between close particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < LINE_DISTANCE) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = PARTICLE_COLOR;
                    ctx.globalAlpha = 0.15;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        // Particle hover effect
        if (mouse.x !== null && mouse.y !== null) {
            particles.forEach(p => {
                let dx = p.x - mouse.x;
                let dy = p.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < HOVER_RADIUS) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = "#fffbe6";
                    ctx.globalAlpha = 0.7;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });
        }

        requestAnimationFrame(animate);
    }
    animate();
})();