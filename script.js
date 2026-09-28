// ============================
// Theme Toggle
// ============================
const themeToggle = document.getElementById('themeToggle');
const aboutMeImage = document.getElementById('aboutMeImage');
const savedTheme = localStorage.getItem('theme');

const darkModeImage = 'https://i.ibb.co.com/bRWkd5V0/Whats-App-Image-2026-09-02-at-20-59-26-1-1.png';
const lightModeImage = 'https://i.ibb.co.com/ddxCxLz/Whats-App-Image-2026-09-02-at-20-59-26-2.jpg';

if (savedTheme === 'light') {
    document.documentElement.dataset.theme = 'light';
} else {
    document.documentElement.dataset.theme = 'dark';
}

function updateAboutMeImage() {
    if (!aboutMeImage) return;

    const isLight = document.documentElement.dataset.theme === 'light';
    aboutMeImage.src = isLight ? lightModeImage : darkModeImage;
    aboutMeImage.alt = isLight ? 'Foto profil About Me mode terang' : 'Foto profil About Me mode gelap';
}

function updateThemeToggle() {
    const isLight = document.documentElement.dataset.theme === 'light';
    const label = isLight ? 'Aktifkan mode gelap' : 'Aktifkan mode terang';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
    updateAboutMeImage();
}

themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
    updateThemeToggle();
});

updateThemeToggle();

// ============================
// Typing Effect
// ============================
const roles = ['Web Developer', 'Frontend Dev', 'SMK RPL Student'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typedText');

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// ============================
// Navbar Scroll Effect
// ============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================
// Mobile Navigation
// ============================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ============================
// Active Nav Link on Scroll
// ============================
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================
// Hero Particles
// ============================
const particlesContainer = document.getElementById('heroParticles');

function createParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================
// Counter Animation
// ============================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * easeProgress);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// ============================
// Scroll Reveal & Skill Bars
// ============================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
            });

            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply reveal to sections
const hasSeenSectionReveal = localStorage.getItem('sectionRevealSeen') === 'true';
const revealSections = document.querySelectorAll('.section');

revealSections.forEach(section => {
    if (hasSeenSectionReveal) {
        section.classList.add('visible');
        section.querySelectorAll('.skill-bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width') + '%';
        });
        return;
    }

    section.classList.add('reveal');
    revealObserver.observe(section);
});

if (!hasSeenSectionReveal) {
    localStorage.setItem('sectionRevealSeen', 'true');
}

// Counter observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ============================
// Smooth scroll for anchor links
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const bootcampToggle = document.getElementById('bootcampToggle');
const bootcampDetails = document.getElementById('bootcampDetails');
const bootcampToggleIcon = bootcampToggle.querySelector('.bootcamp-toggle-icon');

bootcampToggle.addEventListener('click', () => {
    const isExpanded = bootcampToggle.getAttribute('aria-expanded') === 'true';
    bootcampToggle.setAttribute('aria-expanded', String(!isExpanded));
    bootcampDetails.hidden = isExpanded;
    bootcampToggleIcon.textContent = isExpanded ? '+' : '-';
});

// Certificate preview modal
const certificateModal = document.getElementById('certificateModal');
const certificateModalTitle = document.getElementById('certificateModalTitle');
const certificateModalDetail = document.getElementById('certificateModalDetail');
const certificateModalImage = document.getElementById('certificateModalImage');
const certificateGrid = document.getElementById('certificateGrid');
const certificateViewport = document.querySelector('.certificate-viewport');
const certificatePrevious = document.getElementById('certificatePrevious');
const certificatePageIndicator = document.getElementById('certificatePage');
const certificateNext = document.getElementById('certificateNext');

let certificatePage = 0;

function updateCertificateCarousel() {
    const certificateColumns = Number.parseInt(getComputedStyle(certificateGrid).getPropertyValue('--certificate-columns'), 10);
    const pageCount = Math.ceil(certificateGrid.children.length / certificateColumns);
    certificatePage = Math.min(certificatePage, pageCount - 1);
    const pageDistance = certificateViewport.clientWidth + 24;
    certificateGrid.style.transform = `translateX(-${certificatePage * pageDistance}px)`;
    certificatePageIndicator.textContent = `${certificatePage + 1}/${pageCount}`;
    certificatePrevious.disabled = certificatePage === 0;
    certificateNext.disabled = certificatePage >= pageCount - 1;
}

certificatePrevious.addEventListener('click', () => {
    certificatePage--;
    updateCertificateCarousel();
});

certificateNext.addEventListener('click', () => {
    certificatePage++;
    updateCertificateCarousel();
});

window.addEventListener('resize', updateCertificateCarousel);
updateCertificateCarousel();

const projectsGrid = document.getElementById('projectsGrid');
const projectsViewport = document.querySelector('.projects-viewport');
const projectPrevious = document.getElementById('projectPrevious');
const projectPageIndicator = document.getElementById('projectPage');
const projectNext = document.getElementById('projectNext');
let projectPage = 0;

function updateProjectCarousel() {
    const projectColumns = Number.parseInt(getComputedStyle(projectsGrid).getPropertyValue('--project-columns'), 10);
    const pageCount = Math.ceil(projectsGrid.children.length / projectColumns);
    projectPage = Math.min(projectPage, pageCount - 1);
    const pageDistance = projectsViewport.clientWidth + 28;
    projectsGrid.style.transform = `translateX(-${projectPage * pageDistance}px)`;
    projectPageIndicator.textContent = `${projectPage + 1}/${pageCount}`;
    projectPrevious.disabled = projectPage === 0;
    projectNext.disabled = projectPage >= pageCount - 1;
}

projectPrevious.addEventListener('click', () => {
    projectPage--;
    updateProjectCarousel();
});

projectNext.addEventListener('click', () => {
    projectPage++;
    updateProjectCarousel();
});

window.addEventListener('resize', updateProjectCarousel);
updateProjectCarousel();

function closeCertificateModal() {
    certificateModal.classList.remove('open');
    certificateModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', () => {
        certificateModalTitle.textContent = card.dataset.certificateTitle;
        certificateModalDetail.textContent = card.dataset.certificateDetail;
        certificateModalImage.src = card.dataset.certificateImage;
        certificateModalImage.alt = `${card.dataset.certificateTitle} preview`;
        certificateModal.classList.add('open');
        certificateModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('[data-close-certificate]').forEach(closeButton => {
    closeButton.addEventListener('click', closeCertificateModal);
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && certificateModal.classList.contains('open')) {
        closeCertificateModal();
    }
});

// ============================
// Scroll indicator hide
// ============================
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});
