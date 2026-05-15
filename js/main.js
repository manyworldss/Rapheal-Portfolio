/* ============================================
   DUNE PORTFOLIO — Main JS
   Sand particles · Panel system · Lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSandParticles();
    initArcParallax();
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    let paused = false;
    let rafId = null;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Pause animation when tab is hidden to save GPU resources
    document.addEventListener('visibilitychange', () => {
        paused = document.hidden;
        if (!paused && !rafId) rafId = requestAnimationFrame(frame);
    });

    const COUNT = 100;
    const MAX   = COUNT + 70;
    const particles = [];

    class Grain {
        constructor(randomY = false) {
            this.reset(randomY);
        }
        reset(randomY = false) {
            this.x    = Math.random() * W;
            this.y    = randomY ? Math.random() * H : H + Math.random() * 80;
            this.r    = Math.random() * 1.4 + 0.3;
            this.vx   = (Math.random() - 0.5) * 0.35;
            this.vy   = -(Math.random() * 0.45 + 0.10);
            this.life = Math.random() * 0.15 + 0.05;
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
        particles.push(new Grain(true));
    }

    // Throttle mousemove to one spawn per animation frame
    let mousePending = false;
    const mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mousePending = true;
    }, { passive: true });

    function spawnFromMouse() {
        if (!mousePending) return;
        mousePending = false;
        if (particles.length >= MAX) return;
        const g = new Grain(false);
        g.x  = mouse.x + (Math.random() - 0.5) * 28;
        g.y  = mouse.y + (Math.random() - 0.5) * 28;
        g.vy = -(Math.random() * 0.8 + 0.3);
        g.vx = (Math.random() - 0.5) * 0.8;
        g.r  = Math.random() * 1.6 + 0.4;
        g.life = Math.random() * 0.22 + 0.08;
        particles.push(g);
        if (particles.length > MAX) particles.splice(0, 1);
    }

    function frame() {
        rafId = null;
        if (paused) return;
        spawnFromMouse();
        ctx.clearRect(0, 0, W, H);
        for (const g of particles) {
            g.update();
            g.draw();
        }
        rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);
}

/* ============================================
   ARC PARALLAX
   Dune ridge circles follow the cursor at
   different depths — outer ring moves less
   (far dune), inner ring moves more (near dune)
   ============================================ */
function initArcParallax() {
    const heroSide = document.querySelector('.hero-side');
    if (!heroSide) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', e => {
        // Normalize to –1 … +1 relative to viewport center
        targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function tick() {
        // Lerp smoothly toward mouse target (~0.55s settling time)
        currentX += (targetX - currentX) * 0.055;
        currentY += (targetY - currentY) * 0.055;

        heroSide.style.setProperty('--arc-far-x',   `${currentX *  7}px`);
        heroSide.style.setProperty('--arc-far-y',   `${currentY *  4}px`);
        heroSide.style.setProperty('--arc-outer-x', `${currentX * 14}px`);
        heroSide.style.setProperty('--arc-outer-y', `${currentY *  9}px`);
        heroSide.style.setProperty('--arc-inner-x', `${currentX * 24}px`);
        heroSide.style.setProperty('--arc-inner-y', `${currentY * 16}px`);
        heroSide.style.setProperty('--arc-close-x', `${currentX * 36}px`);
        heroSide.style.setProperty('--arc-close-y', `${currentY * 24}px`);

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
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

        // Prime the compositing layer only for the slide-in animation
        panel.style.willChange = 'transform';
        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
        backdrop.classList.add('active');

        // Release the compositing layer once animation completes so text renders crisply
        panel.addEventListener('transitionend', () => {
            panel.style.willChange = 'auto';
        }, { once: true });

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
            if (p.classList.contains('active')) {
                // Re-enable compositing layer for the slide-out animation
                p.style.willChange = 'transform';
                p.addEventListener('transitionend', () => {
                    p.style.willChange = 'auto';
                }, { once: true });
            }
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
        // Stagger sections that enter the viewport in the same callback batch
        let batchDelay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${batchDelay}ms`;
                entry.target.classList.add('visible');
                // Clear the delay after the animation completes so it doesn't linger
                const clearDelay = batchDelay + 750;
                setTimeout(() => { entry.target.style.transitionDelay = ''; }, clearDelay);
                batchDelay += 110;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    sections.forEach(s => observer.observe(s));
}
