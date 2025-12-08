/* Main JavaScript */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded.');

    // Only init mouse trail if canvas exists (home page)
    const canvas = document.getElementById('mouse-trail');
    if (canvas) {
        initMouseTrail();
    }

    initScrollAnimations();
    initCheekyMenu();
});

/* Mouse Trail Animation - "Burgundy Ink" Style */
function initMouseTrail() {
    const canvas = document.getElementById('mouse-trail');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Handle resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    const particles = [];
    const mouse = { x: 0, y: 0 };

    // Track mouse
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        for (let i = 0; i < 2; i++) {
            particles.push({
                x: mouse.x + (Math.random() - 0.5) * 2,
                y: mouse.y + (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 2,
                life: 1,
                color: '#7B1E1E'
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(123, 30, 30, ${p.life})`;
            ctx.fill();

            p.life -= 0.02;
            p.size *= 0.95;

            if (p.life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* Scroll Animations (Intersection Observer) */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .about-inner, .hero-content, .hobby-group, .cs-section').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
}

/* Cheeky Menu Toggle - Bookmark Style */
function initCheekyMenu() {
    const menu = document.getElementById('bookmark-nav');
    const toggle = document.querySelector('.menu-toggle');

    if (menu && toggle) {
        // Use both onclick and addEventListener for maximum compatibility
        toggle.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('expanded');
            console.log('Menu toggled:', menu.classList.contains('expanded'));
        };

        // Also add touchstart for mobile
        toggle.addEventListener('touchstart', function (e) {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('expanded');
        }, { passive: false });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (menu.classList.contains('expanded') && !menu.contains(e.target)) {
                menu.classList.remove('expanded');
            }
        });
    }
}

/* Lightbox Functionality */
function initLightbox() {
    // Create lightbox elements if they don't exist
    if (!document.querySelector('.lightbox-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        const img = document.createElement('img');
        img.className = 'lightbox-img';
        overlay.appendChild(img);
        document.body.appendChild(overlay);

        // Close on click
        overlay.addEventListener('click', function () {
            overlay.classList.remove('active');
        });
    }

    const overlay = document.querySelector('.lightbox-overlay');
    const lightboxImg = overlay.querySelector('.lightbox-img');

    // Attach click listeners to zoomable images
    const zoomableImages = document.querySelectorAll('.project-img, .comparison-img, img[style*="cursor: zoom-in"]');

    zoomableImages.forEach(img => {
        img.style.cursor = 'zoom-in'; // Enforce cursor
        img.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent bubbling
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            overlay.classList.add('active');
        });
    });
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
    initMouseTrail();
    initScrollAnimations();
    initCheekyMenu();
    initLightbox();
});
