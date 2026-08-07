// ==========================================
// Portfolio Interactive Scripts
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS Scroll Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic',
            offset: 100
        });
    }

    // 2. Dynamic Typing Effect
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
                subtitleEl.innerHTML = `${currentRole.substring(0, charIndex - 1)}<span class="typed-text"></span>`;
                charIndex--;
            } else {
                subtitleEl.innerHTML = `${currentRole.substring(0, charIndex + 1)}<span class="typed-text"></span>`;
                charIndex++;
            }

            let typeSpeed = isDeleting ? 35 : 75;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause when word is completely typed
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

    // 3. Theme Toggle with LocalStorage Memory
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        const savedTheme = localStorage.getItem('portfolio-theme');

        // Apply saved theme on load
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');

            // Save preference to LocalStorage
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');

            // Update Icon
            if (themeIcon) {
                if (isLight) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                } else {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }
        });
    }

    // 4. Mobile Dropdown Menu Toggle
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggleBtn && navLinks) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close menu on clicking any link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close menu on clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggleBtn.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // 5. Asynchronous Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send';

            if (submitBtn) {
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
            }

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
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    alert('Oops! Something went wrong while sending your message. Please try again.');
                }
            } catch (error) {
                alert('Connection error. Please check your network connection.');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
});
