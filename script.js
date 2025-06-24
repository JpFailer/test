// ========== NAVEGACIÓN MÓVIL ==========
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== FUNCIÓN DE DESPLAZAMIENTO SUAVE ==========
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========== ENLACE DE NAVEGACIÓN ACTIVO ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Fondo del header al hacer scroll
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Botón de scroll del hero
document.querySelector('.hero__scroll').addEventListener('click', () => {
    scrollToSection('presentacion');
});

// Funcionalidad del reproductor de video
function playVideo() {
    const videoPlayer = document.getElementById('video-player');
    const placeholder = videoPlayer.querySelector('.video__placeholder');
    
    // Crear un efecto de modal o superposición simple
    placeholder.innerHTML = `
        <div style="
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: white;
            text-align: center;
            padding: 2rem;
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem; color: #FFCC00;">
                <i class="fas fa-video"></i>
            </div>
            <h3 style="margin-bottom: 1rem;">Video de Presentación</h3>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 2rem;">
                "El Poder de la Mente Humana: Un Desafío en Venezuela"
            </p>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; backdrop-filter: blur(10px);">
                <p style="font-size: 0.9rem; color: rgba(255,255,255,0.9);">
                    Aquí se reproduciría el video con la locución sobre la salud mental en Venezuela,
                    basado en el contenido proporcionado sobre el poder de la mente humana y los desafíos
                    que enfrentan los venezolanos.
                </p>
            </div>
        </div>
    `;
}

// ========== ANIMACIÓN DE NÚMEROS DE ESTADÍSTICAS ==========
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const number = card.querySelector('.stat__number');
            const targetNumber = parseInt(card.dataset.number) || 0;
            
            if (targetNumber > 0 && !number.textContent.includes('%')) {
                animateNumber(number, 0, targetNumber, 2000);
            }
            
            // Agregar clase de animación
            card.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observar todas las tarjetas de estadísticas
document.querySelectorAll('.stat__card').forEach(card => {
    statsObserver.observe(card);
});

// ========== FUNCIÓN DE ANIMACIÓN DE NÚMEROS ==========
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%');
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Función de suavizado
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        if (isPercentage) {
            element.textContent = current + '%';
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Crear gráficos interactivos
function createCharts() {
    // Gráfico de síntomas (Gráfico circular)
    createPieChart('symptoms-chart', {
        labels: ['Ansiedad', 'Depresión', 'Ambos', 'Otros síntomas'],
        data: [35, 28, 30, 7],
        colors: ['#FFCC00', '#2E86C1', '#5DADE2', '#E8E8E8']
    });
    
    // Gráfico de factores de riesgo (Gráfico de barras)
    createBarChart('risk-factors-chart', {
        labels: ['Economía', 'Migración', 'Pandemia', 'Aislamiento', 'Incertidumbre'],
        data: [90, 85, 75, 70, 80],
        colors: ['#FFCC00', '#2E86C1', '#5DADE2', '#FF8C42', '#9B59B6']
    });
}

// Implementación simple de gráfico circular
function createPieChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const total = data.data.reduce((sum, value) => sum + value, 0);
    let currentAngle = 0;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.style.transform = 'rotate(-90deg)';
    
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    
    data.data.forEach((value, index) => {
        const percentage = (value / total) * 100;
        const angle = (value / total) * 360;
        
        if (percentage > 0) {
            const path = createPieSlice(centerX, centerY, radius, currentAngle, currentAngle + angle);
            path.setAttribute('fill', data.colors[index]);
            path.setAttribute('stroke', '#ffffff');
            path.setAttribute('stroke-width', '2');
            path.style.transition = 'all 0.3s ease';
            path.style.cursor = 'pointer';
            
            // Agregar efecto hover
            path.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transformOrigin = `${centerX}px ${centerY}px`;
            });
            
            path.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            svg.appendChild(path);
            currentAngle += angle;
        }
    });
    
    container.appendChild(svg);
    
    // Crear leyenda
    const legend = document.createElement('div');
    legend.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
        font-size: 0.9rem;
    `;
    
    data.labels.forEach((label, index) => {
        const legendItem = document.createElement('div');
        legendItem.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        const colorBox = document.createElement('div');
        colorBox.style.cssText = `
            width: 12px;
            height: 12px;
            background: ${data.colors[index]};
            border-radius: 2px;
        `;
        
        const text = document.createElement('span');
        text.textContent = `${label} (${data.data[index]}%)`;
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(text);
        legend.appendChild(legendItem);
    });
    
    container.appendChild(legend);
}

// Implementación simple de gráfico de barras
function createBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const maxValue = Math.max(...data.data);
    const chartHeight = 200;
    const chartWidth = 300;
    const barWidth = chartWidth / data.data.length - 10;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${chartWidth + 50} ${chartHeight + 100}`);
    
    data.data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = index * (barWidth + 10) + 25;
        const y = chartHeight - barHeight + 30;
        
        // Crear barra
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', data.colors[index]);
        rect.setAttribute('rx', '4');
        rect.style.transition = 'all 0.3s ease';
        rect.style.cursor = 'pointer';
        
        // Agregar efecto hover
        rect.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'translateY(-5px)';
        });
        
        rect.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });
        
        svg.appendChild(rect);
        
        // Agregar etiqueta de valor
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + barWidth / 2);
        valueText.setAttribute('y', y - 5);
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('font-size', '12');
        valueText.setAttribute('fill', '#333');
        valueText.textContent = value + '%';
        svg.appendChild(valueText);
        
        // Agregar etiqueta
        const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelText.setAttribute('x', x + barWidth / 2);
        labelText.setAttribute('y', chartHeight + 50);
        labelText.setAttribute('text-anchor', 'middle');
        labelText.setAttribute('font-size', '11');
        labelText.setAttribute('fill', '#666');
        labelText.textContent = data.labels[index];
        svg.appendChild(labelText);
    });
    
    container.appendChild(svg);
}

// Función auxiliar para crear el path de una porción del gráfico circular
function createPieSlice(centerX, centerY, radius, startAngle, endAngle) {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    const pathData = [
        "M", centerX, centerY,
        "L", x1, y1,
        "A", radius, radius, 0, largeArcFlag, 1, x2, y2,
        "z"
    ].join(" ");
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    
    return path;
}

// Efecto parallax para la sección hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero__brain');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Inicializar gráficos cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Crear gráficos con un retraso para asegurar una carga suave
    setTimeout(createCharts, 500);
    
    // Agregar animaciones de scroll a los elementos
    const animatedElements = document.querySelectorAll('.content__card, .chart__card, .strategy__card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
});

// Ocultar pantalla de carga cuando la página se carga
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    }
});

// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// Gestos táctiles para móvil
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndY < touchStartY - 50) {
        // Deslizar hacia arriba - desplazarse a la siguiente sección
        const currentSection = document.querySelector('section:hover') || document.querySelector('#inicio');
        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (touchEndY > touchStartY + 50) {
        // Deslizar hacia abajo - desplazarse a la sección anterior
        const currentSection = document.querySelector('section:hover') || document.querySelector('#presentacion');
        const prevSection = currentSection.previousElementSibling;
        if (prevSection && prevSection.tagName === 'SECTION') {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Optimización de rendimiento - carga perezosa de animaciones pesadas
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Agregar animaciones intensivas de CPU solo cuando el elemento es visible
            if (element.classList.contains('hero__brain')) {
                element.style.animation = 'pulse 2s infinite';
            }
            
            if (element.classList.contains('stat__card')) {
                element.querySelector('.stat__card::before').style.animation = 'rotate 10s linear infinite';
            }
        }
    });
}, { rootMargin: '50px' });

// Observar elementos que necesitan optimización de rendimiento
document.querySelectorAll('.hero__brain, .stat__card').forEach(el => {
    performanceObserver.observe(el);
});

// ========== CHATBOT EXTERNO (CHATBASE) ========== 
// El chatbot se carga automáticamente desde Chatbase

// Mensaje de bienvenida en consola
console.log(`
🧠 Fundacredesa - Salud Mental Venezuela
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Website creado con HTML, CSS y JavaScript
Enfocado en la concienciación sobre salud mental
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);


// ========== INICIALIZAR TODAS LAS FUNCIONES ==========
document.addEventListener("DOMContentLoaded", function() {
    // El chatbot externo (Chatbase) se carga automáticamente
    console.log('🌐 Script principal cargado correctamente');
});

