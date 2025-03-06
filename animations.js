// Import GSAP
import gsap from 'https://cdn.skypack.dev/gsap';

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        document.body.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.height) particle.speedY *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem();

    // Typing animation for hero text
    const text = document.querySelector('.hero-content h1');
    const originalText = text.textContent;
    text.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();

    // Skill cards animation
    gsap.from('.skill-card', {
        duration: 0.8,
        scale: 0.5,
        opacity: 0,
        delay: 0.5,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top center'
        }
    });

    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(card, {
                duration: 0.5,
                rotationY: ((x - rect.width / 2) / 10),
                rotationX: -((y - rect.height / 2) / 10),
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotationY: 0,
                rotationX: 0,
                ease: 'power2.out'
            });
        });
    });
});