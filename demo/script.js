// Add more interactive JavaScript features as needed
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Example of adding more interactive JavaScript features
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('animate__animated', 'animate__pulse');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('animate__animated', 'animate__pulse');
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const preloader = document.querySelector('.preloader');
const productSlider = document.querySelector('.product-slider');
const heroVideo = document.getElementById('hero-video');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// Preloader
window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Product Slider
class ProductSlider {
    constructor(element) {
        this.slider = element;
        this.slides = this.slider.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideWidth = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        this.calculateSlideWidth();
        this.setupEventListeners();
        this.startAutoPlay();
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            this.calculateSlideWidth();
        });
    }

    calculateSlideWidth() {
        this.slideWidth = this.slides[0].offsetWidth;
        this.slider.querySelector('.slider-container').style.width = 
            `${this.slideWidth * this.slides.length}px`;
    }

    setupEventListeners() {
        const prevBtn = this.slider.querySelector('.slider-prev');
        const nextBtn = this.slider.querySelector('.slider-next');

        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        this.slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) this.nextSlide();
            if (touchEndX - touchStartX > 50) this.prevSlide();
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSliderPosition();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSliderPosition();
    }

    updateSliderPosition() {
        const position = -this.currentSlide * this.slideWidth;
        this.slider.querySelector('.slider-container').style.transform = 
            `translateX(${position}px)`;
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
        
        // Pause on hover
        this.slider.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });

        this.slider.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
}

// Initialize Product Slider
if (productSlider) {
    new ProductSlider(productSlider);
}

// 3D Product Viewer
class ProductViewer {
    constructor(container) {
        this.container = container;
        this.images = [];
        this.currentFrame = 0;
        this.isPlaying = false;
        
        this.init();
    }

    async init() {
        await this.loadImages();
        this.setupViewer();
    }

    async loadImages() {
        // Load 360-degree view images
        for (let i = 1; i <= 36; i++) {
            const img = new Image();
            img.src = `images/360/${i}.jpg`;
            this.images.push(img);
        }
    }

    setupViewer() {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;

        this.container.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.pageX;
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            
            currentX = e.pageX;
            const diff = currentX - startX;
            
            if (Math.abs(diff) > 10) {
                this.currentFrame = (this.currentFrame + 1) % 36;
                this.updateFrame();
                startX = currentX;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    updateFrame() {
        const img = this.images[this.currentFrame];
        this.container.style.backgroundImage = `url(${img.src})`;
    }
}

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                await submitForm();
                showSuccessMessage();
            } catch (error) {
                showErrorMessage();
            }
        }
    });
}

function validateForm() {
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            removeError(input);
        }
    });

    return isValid;
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.classList.add('error');
}

function removeError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) errorDiv.remove();
    input.classList.remove('error');
}

async function submitForm() {
    const formData = new FormData(contactForm);
    // Add your form submission logic here
}

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Initialize counters when they come into view
const observers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observers.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.number').forEach(counter => {
    observers.observe(counter);
});

// Mobile Menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.1;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Cube Controls
const cube = document.querySelector('.cube');
const pauseBtn = document.querySelector('.pause-btn');
const rotateBtn = document.querySelector('.rotate-btn');

let isRotating = true;

pauseBtn.addEventListener('click', () => {
    isRotating = !isRotating;
    cube.style.animationPlayState = isRotating ? 'running' : 'paused';
    pauseBtn.innerHTML = isRotating ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
});

rotateBtn.addEventListener('click', () => {
    cube.style.animation = 'none';
    cube.offsetHeight; // Trigger reflow
    cube.style.animation = 'rotateCube 20s infinite linear';
});

// Mobile Detection and Class Addition
function isMobileDevice() {
    return window.innerWidth <= 768;
}

function handleMobileView() {
    const body = document.body;
    if (isMobileDevice()) {
        if (!body.classList.contains('mobile-view')) {
            body.classList.add('mobile-view');
            initMobileFeatures();
        }
    } else {
        body.classList.remove('mobile-view');
        cleanupMobileFeatures();
    }
}

function initMobileFeatures() {
    if (!document.querySelector('.mobile-journey-carousel')) {
        initMobileCarousel();
    }
    initMobileAnimations();
}

function cleanupMobileFeatures() {
    // Remove mobile-specific elements when switching to desktop
    const mobileCarousel = document.querySelector('.mobile-journey-carousel');
    if (mobileCarousel) {
        mobileCarousel.remove();
    }
}

// Initialize and handle resize
document.addEventListener('DOMContentLoaded', handleMobileView);
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleMobileView, 250); // Debounce resize events
});

// Mobile Carousel for Journey Section (replaces cube)
function initMobileCarousel() {
    const journeyContent = document.querySelector('.journey-content');
    if (!journeyContent) return;

    const mobileCarousel = document.createElement('div');
    mobileCarousel.className = 'mobile-journey-carousel';
    
    // Create mobile-friendly slides from cube faces
    const slides = Array.from(document.querySelectorAll('.cube-face')).map(face => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = face.innerHTML;
        return slide;
    });

    mobileCarousel.append(...slides);
    journeyContent.prepend(mobileCarousel);

    // Initialize Swiper for smooth mobile scrolling
    new Swiper('.mobile-journey-carousel', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
}

// Mobile-specific animations
function initMobileAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        element.setAttribute('data-aos-duration', '800');
        element.setAttribute('data-aos-offset', '0');
    });
}

// Simplified JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Debug log

    // Get elements
    const productsBtn = document.getElementById('productsBtn');
    const popup = document.getElementById('productsPopup');
    const closeBtn = document.getElementById('closePopup');

    console.log('Products button:', productsBtn); // Debug log
    console.log('Popup:', popup); // Debug log
    console.log('Close button:', closeBtn); // Debug log

    if (productsBtn && popup && closeBtn) {
        // Open popup
        productsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Products button clicked'); // Debug log
            popup.classList.add('show');
        });

        // Close popup
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked'); // Debug log
            popup.classList.remove('show');
        });

        // Close on outside click
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('show');
            }
        });
    }

    // Bottom nav active states
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.id !== 'productsBtn') {
            item.addEventListener('click', function() {
                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        }
    });
});

// Clean Mobile Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuItems = document.querySelectorAll('.menu-items a');

    if (menuBtn && mobileMenu) {
        // Toggle menu
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Debug
            console.log('Menu toggled');
        });

        // Close menu when clicking links
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !menuBtn.contains(e.target)) {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

// Mobile Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdownContent = document.querySelector('.dropdown-content');
    const navLinks = document.querySelectorAll('.nav-link');

    if (dropdownTrigger && dropdownContent) {
        // Toggle dropdown
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            dropdownContent.classList.toggle('show');
            
            // Debug
            console.log('Dropdown toggled');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownTrigger.contains(e.target)) {
                dropdownTrigger.classList.remove('active');
                dropdownContent.classList.remove('show');
            }
        });
    }

    // Active state for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('dropdown-trigger')) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
});

// Original Desktop Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    // Only add scrolled class for background change
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-navbar')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'none' ? 'block' : 'none';
        mobileNav.classList.toggle('show');
        mobileToggle.classList.toggle('active');
        toggleIcon.classList.toggle('fa-bars');
        toggleIcon.classList.toggle('fa-times');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileNav.classList.remove('show');
            mobileToggle.classList.remove('active');
            toggleIcon.classList.add('fa-bars');
            toggleIcon.classList.remove('fa-times');
            setTimeout(() => {
                if (!mobileNav.classList.contains('show')) {
                    mobileNav.style.display = 'none';
                }
            }, 300);
        }
    });
});

/* Add this JavaScript to make sections animate when they come into view */
const sections = document.querySelectorAll('.hero-section, .about-section, .process-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'revealSection 1s ease forwards';
        }
    });
}, { threshold: 0.1 });

sections.forEach((section) => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Add this at the end of your script.js file
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // Debug log to check if elements are found
        console.log('Toggle and menu found:', navToggle, navMenu);
        
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            console.log('Toggle clicked!'); // Debug log
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    } else {
        console.log('Toggle or menu not found!'); // Debug log
    }
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
});