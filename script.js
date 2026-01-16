// Menú móvil
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Formulario de contacto con Formspree
const contactForm = document.getElementById('contactForm');

// Configuración de Formspree
// IMPORTANTE: Cambia 'tucorreo@gmail.com' por tu email real
const FORMSPREE_URL = 'https://formspree.io/f/xkoogeky';

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const eventType = document.getElementById('eventType').value;
    const message = document.getElementById('message').value;
    
    // Validación simple
    if (!name || !email || !eventType || !message) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    // Mostrar indicador de carga
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Preparar datos para Formspree
    const formData = new FormData(contactForm);
    
    // Enviar a Formspree
    fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Éxito
            const eventTypeText = {
                'wedding': 'boda',
                'birthday': 'cumpleaños/fiesta',
                'corporate': 'evento corporativo',
                'other': 'evento'
            }[eventType] || 'evento';
            
            alert(`¡Gracias ${name}! Hemos recibido tu solicitud para un ${eventTypeText}. Te contactaremos en ${email} en las próximas 24 horas.`);
            
            // Resetear formulario
            contactForm.reset();
        } else {
            // Error del servidor
            return response.json().then(data => {
                if (data.errors) {
                    alert('Error: ' + data.errors.map(error => error.message).join(', '));
                } else {
                    alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
                }
            });
        }
    })
    .catch(error => {
        // Error de red
        console.error('Error:', error);
        alert('Hubo un problema de conexión. Por favor, verifica tu internet e intenta nuevamente.');
    })
    .finally(() => {
        // Restaurar botón
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
});

// Efecto de scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Animación para elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.service-card, .portfolio-item, .process-step, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Añadir estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    .service-card, .portfolio-item, .process-step, .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .service-card.animate-in, 
    .portfolio-item.animate-in, 
    .process-step.animate-in, 
    .testimonial-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .process-step:nth-child(1) { transition-delay: 0.1s; }
    .process-step:nth-child(2) { transition-delay: 0.2s; }
    .process-step:nth-child(3) { transition-delay: 0.3s; }
    .process-step:nth-child(4) { transition-delay: 0.4s; }
    
    .service-card:nth-child(1) { transition-delay: 0.1s; }
    .service-card:nth-child(2) { transition-delay: 0.2s; }
    .service-card:nth-child(3) { transition-delay: 0.3s; }
    
    .portfolio-item:nth-child(1) { transition-delay: 0.1s; }
    .portfolio-item:nth-child(2) { transition-delay: 0.2s; }
    .portfolio-item:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);