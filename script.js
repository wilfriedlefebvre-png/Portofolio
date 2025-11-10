// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe project cards (skills stay static)
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Fade-in animation for sections on scroll
const sectionObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, sectionObserverOptions);

// Observe all sections except home (which should be visible immediately)
document.querySelectorAll('section:not(#home)').forEach(section => {
    sectionObserver.observe(section);
});

// Unforgettable About Me reveal
const aboutContainer = document.querySelector('.about-text-3d');
const aboutParagraphs = document.querySelectorAll('.about-text-3d p');

if (aboutContainer && aboutParagraphs.length) {
    aboutParagraphs.forEach((paragraph, paragraphIndex) => {
        const words = paragraph.textContent.trim().split(/\s+/);
        paragraph.innerHTML = '';

        words.forEach((word, wordIndex) => {
            const span = document.createElement('span');
            span.className = 'about-word';
            span.textContent = word;

            const staggerDelay = (wordIndex * 0.12) + (paragraphIndex * 0.9);
            const randomTilt = (Math.random() * 30 - 15).toFixed(2);
            const randomSkew = (Math.random() * 10 - 5).toFixed(2);

            span.style.setProperty('--word-delay', `${staggerDelay.toFixed(2)}s`);
            span.style.setProperty('--word-tilt', `${randomTilt}deg`);
            span.style.setProperty('--word-skew', `${randomSkew}deg`);

            paragraph.appendChild(span);

            if (wordIndex !== words.length - 1) {
                paragraph.appendChild(document.createTextNode(' '));
            }
        });
    });

    const aboutRevealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('about-ignite');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.45
    });

    aboutRevealObserver.observe(aboutContainer);
}
