// ========== ANIMACIONES MEJORADAS FUNDACREDESA ==========

// ========== OBSERVADOR DE SCROLL PARA ANIMACIONES ==========
function initializeScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animar barras de progreso
                const progressBar = entry.target.querySelector('.stat__progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar todos los elementos con animación al scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========== AGREGAR EFECTO PARALLAX AL FONDO ==========
function initializeParallax() {
    const parallaxElement = document.createElement('div');
    parallaxElement.className = 'parallax-bg';
    document.body.appendChild(parallaxElement);
    
    // Efecto de scroll parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxElement.style.transform = `translateY(${rate}px)`;
    });
}

// ========== AGREGAR EFECTO DE BRILLO A TEXTO IMPORTANTE ==========
function addGlowEffects() {
    // Agregar brillo al título principal
    const mainTitle = document.querySelector('.hero__title');
    if (mainTitle) {
        mainTitle.classList.add('glow-text');
    }
    
    // Agregar pulso a los iconos
    const icons = document.querySelectorAll('.fas');
    icons.forEach(icon => {
        icon.classList.add('pulsing-icon');
    });
}

// ========== AGREGAR EFECTOS DE HOVER A TARJETAS ==========
function enhanceCardAnimations() {
    const cards = document.querySelectorAll('.stat__card, .chart__card');
    cards.forEach(card => {
        card.classList.add('wave-border');
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'cardHoverGlow 0.3s ease-in-out';
        });
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
    });
}

// ========== AGREGAR EFECTO DE ROTACIÓN AL LOGO ========// Archivo simplificado - sin animaciones problemáticasons;
}