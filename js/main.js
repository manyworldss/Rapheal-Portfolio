/* Main JavaScript - Cyberpunk Terminal Aesthetic */
document.addEventListener('DOMContentLoaded', () => {
    console.log('System initialized. Awaiting commands...');

    const canvas = document.getElementById('mouse-trail');
    if (canvas) {
        initMouseTrail();
    }

    initScrollAnimations();
    initCheekyMenu();
    initLightbox();
    initDecryptionReveal();
});

/* ============================================
   MOUSE TRAIL - Electric Blue Particles
   ============================================ */
function initMouseTrail() {
    const canvas = document.getElementById('mouse-trail');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    const particles = [];
    const mouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        for (let i = 0; i < 2; i++) {
            particles.push({
                x: mouse.x + (Math.random() - 0.5) * 4,
                y: mouse.y + (Math.random() - 0.5) * 4,
                size: Math.random() * 2 + 1,
                life: 1,
                color: '#00d4ff' // Electric blue match
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.life * 0.8})`; 
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00d4ff';
            ctx.fill();

            p.life -= 0.03;
            p.size *= 0.96;
            
            p.x += (Math.random() - 0.5) * 1;
            p.y -= Math.random() * 2; // Drift up like spark/smoke

            if (p.life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ============================================
   SCROLL ANIMATIONS (Terminal Boot Reveal)
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If this is the terminal reveal, trigger text cascade
                if (entry.target.classList.contains('terminal-reveal')) {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        p.style.opacity = '0';
                        p.style.transform = 'translateY(10px)';
                        p.style.transition = `all 0.4s ease ${index * 0.3}s`;
                        
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, 50);
                    });
                    
                    const dataBlocks = entry.target.querySelectorAll('.data-block');
                    dataBlocks.forEach((block, index) => {
                        block.style.opacity = '0';
                        block.style.transform = 'scale(0.95)';
                        block.style.transition = `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${(paragraphs.length * 0.3) + (index * 0.2)}s`;
                        
                        setTimeout(() => {
                            block.style.opacity = '1';
                            block.style.transform = 'scale(1)';
                        }, 50);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .hero-content, .fade-in-section, .terminal-reveal, .cs-section').forEach(el => {
        observer.observe(el);
    });
}

/* ============================================
   COMMAND PALETTE NAVIGATION
   ============================================ */
function initCheekyMenu() {
    const menu = document.getElementById('bookmark-nav');
    const toggle = document.querySelector('.menu-toggle');

    if (menu && toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('expanded');
            
            if (menu.classList.contains('expanded')) {
                toggle.textContent = '[ CLOSE_SYS ]';
            } else {
                toggle.textContent = '< SYS_NAV >';
            }
        });

        document.addEventListener('click', function (e) {
            if (menu.classList.contains('expanded') && !menu.contains(e.target)) {
                menu.classList.remove('expanded');
                toggle.textContent = '< SYS_NAV >';
            }
        });

        menu.addEventListener('click', function (e) {
            e.stopPropagation();
        });
        
        // Ensure starting text is correct
        toggle.textContent = '< SYS_NAV >';
    }
}

/* ============================================
   LIGHTBOX 
   ============================================ */
function initLightbox() {
    if (!document.querySelector('.lightbox-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        const img = document.createElement('img');
        img.className = 'lightbox-img';
        overlay.appendChild(img);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function () {
            overlay.classList.remove('active');
        });
    }

    const overlay = document.querySelector('.lightbox-overlay');
    const lightboxImg = overlay.querySelector('.lightbox-img');
    const zoomableImages = document.querySelectorAll('.project-img, .comparison-img, img[style*="cursor: zoom-in"]');

    zoomableImages.forEach(img => {
        img.style.cursor = 'crosshair'; // Cyberpunk touch instead of zoom-in
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            overlay.classList.add('active');
        });
    });
}

/* ============================================
   DECRYPTION REVEAL ANIMATION
   ============================================ */
function initDecryptionReveal() {
    const spineElement = document.querySelector('.author-spine');
    if (!spineElement) return;
    
    // Setup for decryption
    const originalText = 'RAPHEAL MANWELL SUBER';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()<>{}[]';
    let currentIteration = 0;
    const maxIterations = 20; 
    
    // First clear and set a fixed width so it doesn't jump around
    spineElement.textContent = originalText;
    
    const intervalId = setInterval(() => {
        spineElement.textContent = originalText.split('').map((char, index) => {
            if (index < currentIteration) {
                return originalText[index]; // Resolved letter
            }
            if (originalText[index] === ' ') {
                return ' '; // Keep spaces
            }
            return chars[Math.floor(Math.random() * chars.length)]; // Random cypher
        }).join('');
        
        if (currentIteration >= originalText.length) {
            clearInterval(intervalId);
            // Add a completion flash class if desired
            spineElement.style.textShadow = '0 0 20px #00d4ff, 0 0 40px #00d4ff';
            setTimeout(() => {
                spineElement.style.textShadow = ''; // Return to CSS default
            }, 300);
        }
        
        currentIteration += 1/3; // Speed controller (lower = slower reveal per letter)
        
    }, 40); // 40ms per frame
}
