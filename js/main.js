/* ============================================
   DUNE PORTFOLIO — Main JS
   Sand particles · Panel system · Lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSandParticles();
    initPanelSystem();
    initLightbox();
    initCaseStudyScrollAnimations();
});

/* ============================================
   SAND PARTICLES
   Ambient dust drifting upward — Arrakis air
   ============================================ */
function initSandParticles() {
    const canvas = document.getElementById('sand-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 120;
    const particles = [];

    class Grain {
        constructor(randomY = false) {
            this.reset(randomY);
        }
        reset(randomY = false) {
            this.x    = Math.random() * W;
            this.y    = randomY ? Math.random() * H : H + Math.random() * 80;
            this.r    = Math.random() * 1.1 + 0.2;
            this.vx   = (Math.random() - 0.5) * 0.25;
            this.vy   = -(Math.random() * 0.35 + 0.08);
            this.life = Math.random() * 0.11 + 0.03;  // opacity
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -5) this.reset(false);
            if (this.x < -5) this.x = W + 5;
            if (this.x > W + 5) this.x = -5;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(196, 148, 26, ${this.life})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < COUNT; i++) {
        particles.push(new Grain(true));  // start scattered across screen
    }

    // Mouse interaction: disturb nearby grains
    const mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        // Spawn a burst of 2 extra grains at cursor
        for (let i = 0; i < 2; i++) {
            const g = new Grain(false);
            g.x  = mouse.x + (Math.random() - 0.5) * 20;
            g.y  = mouse.y + (Math.random() - 0.5) * 20;
            g.vy = -(Math.random() * 0.6 + 0.2);
            g.vx = (Math.random() - 0.5) * 0.6;
            g.life = Math.random() * 0.16 + 0.06;
            particles.push(g);
            if (particles.length > COUNT + 80) particles.splice(0, 1);
        }
    });

    function frame() {
        ctx.clearRect(0, 0, W, H);
        for (const g of particles) {
            g.update();
            g.draw();
        }
        requestAnimationFrame(frame);
    }
    frame();
}

/* ============================================
   PANEL SYSTEM
   About / Experience / Contact overlays
   ============================================ */
function initPanelSystem() {
    const backdrop = document.getElementById('panel-backdrop');
    const triggers = document.querySelectorAll('.nav-trigger[data-panel]');
    const panels   = document.querySelectorAll('.panel-overlay');
    const closeBtns = document.querySelectorAll('.panel-close');

    function openPanel(id) {
        closeAll();
        const panel = document.getElementById(`panel-${id}`);
        if (!panel) return;

        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('active');

        // Mark the triggering button active
        triggers.forEach(t => t.classList.toggle('active', t.dataset.panel === id));

        // Trap focus inside panel
        setTimeout(() => {
            const focusable = panel.querySelector('button, a, input, [tabindex]');
            if (focusable) focusable.focus();
        }, 100);
    }

    function closeAll() {
        panels.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('aria-hidden', 'true');
        });
        backdrop.classList.remove('active');
        triggers.forEach(t => t.classList.remove('active'));
    }

    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.panel;
            // Toggle: clicking the same trigger again closes it
            if (btn.classList.contains('active')) {
                closeAll();
            } else {
                openPanel(id);
            }
        });
    });

    closeBtns.forEach(btn => btn.addEventListener('click', closeAll));

    if (backdrop) {
        // Close on backdrop click
        backdrop.addEventListener('click', closeAll);
    }

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAll();
    });
}

/* ============================================
   LIGHTBOX
   For case study images
   ============================================ */
function initLightbox() {
    if (document.querySelector('.lightbox-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const img = document.createElement('img');
    img.className = 'lightbox-img';
    img.alt = '';
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => overlay.classList.remove('active'));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') overlay.classList.remove('active');
    });

    document.querySelectorAll('.project-img, .comparison-img').forEach(el => {
        el.style.cursor = 'zoom-in';
        el.addEventListener('click', e => {
            e.stopPropagation();
            img.src = el.src;
            overlay.classList.add('active');
        });
    });
}

/* ============================================
   CASE STUDY SCROLL ANIMATIONS
   Used on celio.html, north-star.html, etc.
   ============================================ */
function initCaseStudyScrollAnimations() {
    const sections = document.querySelectorAll('.cs-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    sections.forEach(s => observer.observe(s));
}
