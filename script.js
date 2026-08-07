// Initialize AOS Scroll Animation Library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        duration: 900,
        easing: 'ease-out-cubic'
    });
    
    // Dynamic Typing Effect in Subtitle Header
    const subtitleEl = document.querySelector('.subtitle');
    if (subtitleEl) {
        const roles = [
            "ECE Student & Tech Enthusiast",
            "Python & Web Developer",
            "Data Analytics Learner"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                subtitleEl.innerHTML = currentRole.substring(0, charIndex - 1) + '<span class="typed-text"></span>';
                charIndex--;
            } else {
                subtitleEl.innerHTML = currentRole.substring(0, charIndex + 1) + '<span class="typed-text"></span>';
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2200; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 400;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }
});

// Theme Toggle Functionality
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

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Asynchronous Web3Forms Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Thank you! Your message has been sent successfully to Suryavalli.');
                contactForm.reset();
            } else {
                alert('Oops! Something went wrong while sending your message.');
            }
        } catch (error) {
            alert('Error connecting to the server. Please check your network connection.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
