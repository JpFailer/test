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
const heroScrollBtn = document.querySelector('.hero__scroll');
if (heroScrollBtn) {
    heroScrollBtn.addEventListener('click', () => {
        scrollToSection('presentacion');
    });
}

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
    const isPercentage = /%/.test(element.textContent);
    // Limpiar el contenido antes de animar
    element.textContent = isPercentage ? start + '%' : start;
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
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
        labels: ['Ansiedad', 'Depresión', 'Ambos', 'Otros'],
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

// Implementación simple de gráfico de barras
function createBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    let labels = [...data.labels];
    let values = [...data.data];
    let colors = [...data.colors];
    // Quitar duplicados de "Incertidumbre"
    const incIndex = labels.findIndex(l => l.toLowerCase() === 'incertidumbre');
    const incLastIndex = labels.lastIndexOf('Incertidumbre');
    if (incIndex !== -1 && incLastIndex !== incIndex) {
        labels.splice(incLastIndex, 1);
        values.splice(incLastIndex, 1);
        colors.splice(incLastIndex, 1);
    }

    const maxValue = Math.max(...values);
    const chartHeight = 200;
    const barWidth = 48; // Más ancho para mejor visibilidad
    const minBarGap = 80; // Más separación entre barras
    // Ajustar tamaño de fuente y separación para legibilidad
    const labelFontSize = 18; // Tamaño legible pero no excesivo
    const chartWidth = (barWidth + minBarGap) * labels.length + minBarGap;

    // Ajustar el viewBox para dejar más espacio arriba (antes era chartHeight + 120)
    const extraTop = 40; // Espacio extra arriba para los valores
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight + 120 + extraTop}`);

    labels.forEach((label, index) => {
        const value = values[index];
        const color = colors[index];
        const barHeight = (value / maxValue) * chartHeight;
        const x = minBarGap + index * (barWidth + minBarGap);
        const y = chartHeight - barHeight + 30 + extraTop;
        // Barra
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', color);
        rect.setAttribute('rx', '8');
        rect.style.transition = 'all 0.3s ease';
        rect.style.cursor = 'pointer';
        rect.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'translateY(-5px)';
        });
        rect.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });
        svg.appendChild(rect);
        // Valor (porcentaje) - subirlo más para que no se corte
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + barWidth / 2);
        valueText.setAttribute('y', y - 24); // antes era y - 16, ahora más arriba
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('font-size', '24');
        valueText.setAttribute('font-weight', 'bold');
        valueText.setAttribute('fill', '#222');
        valueText.textContent = value + '%';
        svg.appendChild(valueText);
        // Etiqueta
        const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelText.setAttribute('x', x + barWidth / 2);
        labelText.setAttribute('y', chartHeight + 95 + extraTop);
        labelText.setAttribute('text-anchor', 'middle');
        labelText.setAttribute('font-size', labelFontSize);
        labelText.setAttribute('fill', '#444');
        labelText.setAttribute('alignment-baseline', 'middle');
        labelText.textContent = label;
        svg.appendChild(labelText);
    });
    container.appendChild(svg);
}

// Implementación simple de gráfico circular
function createPieChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    // Limpiar el contenedor antes de dibujar
    container.innerHTML = '';
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
    // Eliminar textos de porcentaje dentro del pastel
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
            // Tooltip para porciones pequeñas
            if (percentage < 10) {
                path.addEventListener('mouseenter', function(e) {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'pie-tooltip';
                    tooltip.style.position = 'fixed';
                    tooltip.style.background = '#fff';
                    tooltip.style.color = '#222';
                    tooltip.style.padding = '4px 10px';
                    tooltip.style.borderRadius = '6px';
                    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                    tooltip.style.fontSize = '13px';
                    tooltip.style.pointerEvents = 'none';
                    tooltip.textContent = `${data.labels[index]} (${data.data[index]}%)`;
                    document.body.appendChild(tooltip);
                    function moveTooltip(ev) {
                        tooltip.style.left = (ev.clientX + 10) + 'px';
                        tooltip.style.top = (ev.clientY - 10) + 'px';
                    }
                    moveTooltip(e);
                    window.addEventListener('mousemove', moveTooltip);
                    path.addEventListener('mouseleave', function() {
                        tooltip.remove();
                        window.removeEventListener('mousemove', moveTooltip);
                    }, { once: true });
                });
            }
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
    // Ya no se dibujan textos dentro del pastel
    container.appendChild(svg);
    // Crear leyenda SIEMPRE recorriendo todos los labels
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

// ========== MOSTRAR SOLO UNA SECCIÓN A LA VEZ CON ANIMACIÓN UNIVERSAL ==========
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            // Si ya está visible y opaca, no hacer nada
            if (section.style.display === 'none' || section.style.opacity === '0' || getComputedStyle(section).display === 'none') {
                section.style.display = '';
                section.style.transition = 'opacity 0.5s';
                section.style.opacity = 0;
                setTimeout(() => {
                    section.style.opacity = 1;
                }, 10);
            }
        } else {
            if (section.style.display !== 'none' && getComputedStyle(section).display !== 'none') {
                section.style.transition = 'opacity 0.5s';
                section.style.opacity = 0;
                setTimeout(() => {
                    section.style.display = 'none';
                }, 500);
            }
        }
    });
}

// Mostrar solo la sección de inicio al cargar
window.addEventListener('DOMContentLoaded', () => {
    showSection('inicio');
});

// Manejar clics en la barra de navegación para mostrar solo la sección correspondiente
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').replace('#', '');
        showSection(targetId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Opcional: cerrar menú móvil si está abierto
        navMenu.classList.remove('active');
        // Prevenir el scroll automático por defecto
        e.preventDefault();
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
            // Eliminar la siguiente línea porque no se puede manipular pseudoelementos desde JS
            // if (element.classList.contains('stat__card')) {
            //     element.querySelector('.stat__card::before').style.animation = 'rotate 10s linear infinite';
            // }
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
// Información de los estados de Venezuela para el mapa interactivo
const estadosVenezuela = {
"VE-A": { nombre: "Distrito Capital", info: "Se abordó el cuestionario digital en los siguientes lugares: Superintendencia de la Seguridad Social, Casa Petra Barreto de la Vega, Centro de Diagnóstico Integral (CDI) Pedro Fontes de Montalbán, Universidad Bolivariana de Venezuela (UBV), Instituto Nacional de Servicios Sociales (INASS), Unidad Educativa Nacional Pedro Fontes y Universidad Nacional de la Seguridad (UNES)." },
"VE-B": { nombre: "Anzoátegui", info: "Investigación próxima a realizar." },
"VE-C": { nombre: "Apure", info: "Investigación próxima a realizar." },
"VE-D": { nombre: "Aragua", info: "Investigación próxima a realizar." },
"VE-E": { nombre: "Barinas", info: "Investigación próxima a realizar." },
"VE-F": { nombre: "Bolívar", info: "Investigación próxima a realizar.." },
"VE-G": { nombre: "Carabobo", info: "durante el mes de noviembre del año 2024 se desarrollaron varias visitas y acuerdos, principalmente en las instalaciones de FONDECO con la Presidenta de la institución, representantes de la comunidad entre ellos las Brigadas de Articulación Comunal (BRAC) se decidió levantar la información en la comunidad Charneca. Posteriormente, en el mes de diciembre se desarrolló un taller vivencial a los trabajadoras y trabajadores de la institución, así como a algunos integrantes de los BRAC. En este mes de diciembre también se aplicó el cuestionario digital a los trabajadoras y trabajadores del IPASME de Valencia. A partir del mes de enero del presente año se ejecutó la inducción al cuestionario digital a dos representantes del Movimiento de Mujeres Manuelitas Sanz con el compromiso de hacer la distribución a Bolipuertos, instituciones relacionadas al transportes terrestres y acuáticos de los estados: La Guaica, Distrito Capital y Miranda. " },
"VE-H": { nombre: "Cojedes", info: "Investigación próxima a realizar." },
"VE-I": { nombre: "Falcón", info: "Investigación próxima a realizar." },
"VE-J": { nombre: "Guárico", info: "Investigación próxima a realizar." },
"VE-K": { nombre: "Lara", info: "Investigación próxima a realizar." },
"VE-L": { nombre: "Mérida", info: "Investigación próxima a realizar." },
"VE-M": { nombre: "Miranda", info: "En el estado Miranda, municipio Cristóbal Rojas (Charallave) antes del levantamiento de la información durante el mes de noviembre del año 2024 se desarrollaron algunas reuniones entre ellas el primer encuentro para la presentación del proyecto e inducción sobre el cuestionario digital en la Sede del del PSUV con diferentes representantes de enlace de la comunidad de Charallave. Durante este mes continuamos con la visita casa a casa de la comunidad: indios de Charallave, seguidamente se efectuó el taller vivencial en la sede del partido PSUV a representantes regionales y sectoriales. Para diciembre del mismo año se continuo con la visita casa a casa a las siguientes comunidades de este municipio: Comunidad Milagro de Dios, Comunidad de Jabillito, Sector D, Jabillito, Barrio Nuevo. Durante el mes de enero del año 2025 se levantó la información del cuestionario digital en las comunidades: Las Aguitas Vaquera y Ferrenorte, en esta última comunidad se observó un alto porcentaje de vulnerabilidad, lo cual se evidenció las malas condiciones de las viviendas y la baja situación económica de los habitantes entrevistados.   Continuando con el desarrollo de los cuestionarios digitales a través de las visitas casa a casa durante el mes enero del año 2025 en la comunidad Macarena Sur del municipio Guaicaipuro se observaron diferentes sectores con distintas condiciones de vivienda y acceso a servicios (Los Teques). En el estado Aragua se desarrolló la aplicación del cuestionario digital con el apoyo de la Alcaldía del municipio Santos Michelena a través de dos días de abordajes durante el mes de enero del año 2025 en los sectores Bucaral, Bucaral 2 y Brisas de Aragua parte baja." },
"VE-N": { nombre: "Monagas", info: "Investigación próxima a realizar." },
"VE-O": { nombre: "Nueva Esparta", info: "Investigación próxima a realizar.." },
"VE-P": { nombre: "Portuguesa", info: "Investigación próxima a realizar." },
"VE-R": { nombre: "Sucre", info: "Investigación próxima a realizar.." },
"VE-S": { nombre: "Táchira", info: "Investigación próxima a realizar." },
"VE-T": { nombre: "Trujillo", info: "Investigación próxima a realizar." },
"VE-U": { nombre: "Yaracuy", info: "Investigación próxima a realizar.." },
"VE-V": { nombre: "Zulia", info: "Investigación próxima a realizar." },
"VE-W": { nombre: "Dependencias Federales", info: "Investigación próxima a realizar." },
"VE-X": { nombre: "Vargas (La Guaira)", info: "El abordaje en el estado La Guaira se inicio en el mes de noviembre del año 2024, gracias al apoyo de los representantes de la Comuna Guaicamacuto, en esta oportunidad se visitó a diferentes casas de la Comuna, específicamente en el sector parte baja del teleférico." },
"VE-Y": { nombre: "Delta Amacuro", info: "Investigación próxima a realizar." },
"VE-Z": { nombre: "Amazonas", info: "Investigación próxima a realizar" }
};

// Interactividad del mapa de Venezuela
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el contenedor donde se mostrará la info
    const infoEstado = document.getElementById('info-estado');
    // Recorre todos los estados definidos en el objeto
    Object.keys(estadosVenezuela).forEach(id => {
        const estadoPath = document.getElementById(id);
        if (estadoPath) {
            // Accesibilidad: cursor pointer y focusable
            estadoPath.style.cursor = 'pointer';
            estadoPath.setAttribute('tabindex', '0');
            // Evento click/tap
            estadoPath.addEventListener('click', function() {
                mostrarInfoEstado(id);
            });
            // Evento teclado (Enter/Espacio)
            estadoPath.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    mostrarInfoEstado(id);
                }
            });
            // Efecto hover
            estadoPath.addEventListener('mouseenter', function() {
                estadoPath.style.filter = 'brightness(1.2) drop-shadow(0 0 6px #FFCC00)';
            });
            estadoPath.addEventListener('mouseleave', function() {
                estadoPath.style.filter = '';
            });
        }
    });

    function mostrarInfoEstado(id) {
        const estado = estadosVenezuela[id];
        if (estado && infoEstado) {
            infoEstado.innerHTML = `
                <h3>${estado.nombre}</h3>
                <p>${estado.info}</p>
            `;
            // Opcional: scroll al contenedor en móvil
            infoEstado.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// ========== INICIALIZAR TODAS LAS FUNCIONES ==========
document.addEventListener("DOMContentLoaded", function() {
    // El chatbot externo (Chatbase) se carga automáticamente
    console.log('🌐 Script principal cargado correctamente');
});

