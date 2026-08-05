// Initialize AOS Scroll Animation Library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-out-cubic'
    });
});

// Theme Toggle Functionality (Dark / Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Mobile Dropdown Menu Toggle
const menuToggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Simple Contact Form submission alert prevent default
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been received.');
        contactForm.reset();
    });
}
