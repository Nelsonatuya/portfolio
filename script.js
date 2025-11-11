// --- Configuration and SDK Setup ---
const defaultConfig = {
    full_name: "Nelson Atuya",
    job_title: "Full Stack Developer & Mobile Engineer",
    email: "nelson.atuya@example.com",
    phone: "+254 XXX XXX XXX",
    location: "Nairobi, Kenya",
    hero_tagline: "Building innovative solutions with cutting-edge technology",
    about_intro: "Passionate software engineer with expertise in full-stack development and Android mobile programming. I thrive on creating innovative solutions that bridge the gap between complex technical requirements and user-friendly experiences.",
    background_color: "#f9fafb",
    surface_color: "#ffffff",
    text_color: "#374151",
    primary_color: "#667eea",
    secondary_color: "#764ba2",
    font_family: "Inter",
    font_size: 16
};

/**
 * Updates the DOM based on the new configuration object.
 * @param {object} config - The new configuration object.
 * @param {object} defaults - The default configuration.
 */
function updateDOM(config, defaults) {
    const getVal = (key) => config[key] || defaults[key];

    // Update Text Content
    document.getElementById('nav-name').textContent = getVal('full_name');
    document.getElementById('hero-name').textContent = getVal('full_name');
    document.getElementById('footer-name').textContent = getVal('full_name');
    document.getElementById('hero-title').textContent = getVal('job_title');
    document.getElementById('contact-email').textContent = getVal('email');
    document.getElementById('contact-phone').textContent = getVal('phone');
    document.getElementById('contact-location').textContent = getVal('location');
    document.getElementById('hero-tagline').textContent = getVal('hero_tagline');
    document.getElementById('about-intro').textContent = getVal('about_intro');

    // Update Colors
    const backgroundColor = getVal('background_color');
    const surfaceColor = getVal('surface_color');
    const textColor = getVal('text_color');
    const primaryColor = getVal('primary_color');
    const secondaryColor = getVal('secondary_color');

    document.body.style.backgroundColor = backgroundColor;
    
    // Update elements that need surface color change
    document.querySelectorAll('.bg-white, .project-card').forEach(el => {
        el.style.backgroundColor = surfaceColor;
    });

    // Update elements that need text color change
    document.querySelectorAll('.text-gray-800, .text-gray-700, .text-gray-600').forEach(el => {
        el.style.color = textColor;
    });

    // Update elements that need primary color change (e.g., text-blue-600)
    // NOTE: Tailwind gradient classes need custom CSS for primary/secondary color application
    // This is a partial update for hardcoded classes
    document.querySelectorAll('.text-blue-600, .hover\\:text-blue-600').forEach(el => {
        el.style.color = primaryColor;
    });

    // Update Fonts
    const customFont = getVal('font_family');
    const baseFontStack = 'Arial, sans-serif';
    document.body.style.fontFamily = `'${customFont}', ${baseFontStack}`;

    // Update Font Sizes
    const baseSize = getVal('font_size');
    document.body.style.fontSize = `${baseSize}px`;
    
    document.querySelectorAll('h1, h2, h3, h4').forEach(heading => {
        const tagName = heading.tagName.toLowerCase();
        let multiplier;
        switch(tagName) {
            case 'h1': multiplier = 3.0; break;
            case 'h2': multiplier = 2.0; break;
            case 'h3': multiplier = 1.5; break;
            case 'h4': multiplier = 1.25; break;
            default: multiplier = 1.0;
        }
        heading.style.fontSize = `${baseSize * multiplier}px`;
    });
}

// Initialize Elements SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
            updateDOM(config, defaultConfig);
        },
        mapToCapabilities: (config) => ({
            recolorables: [
                { get: () => config.background_color || defaultConfig.background_color, set: (value) => window.elementSdk.setConfig({ background_color: value }) },
                { get: () => config.surface_color || defaultConfig.surface_color, set: (value) => window.elementSdk.setConfig({ surface_color: value }) },
                { get: () => config.text_color || defaultConfig.text_color, set: (value) => window.elementSdk.setConfig({ text_color: value }) },
                { get: () => config.primary_color || defaultConfig.primary_color, set: (value) => window.elementSdk.setConfig({ primary_color: value }) },
                { get: () => config.secondary_color || defaultConfig.secondary_color, set: (value) => window.elementSdk.setConfig({ secondary_color: value }) }
            ],
            borderables: [],
            fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (value) => window.elementSdk.setConfig({ font_family: value }) },
            fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (value) => window.elementSdk.setConfig({ font_size: value }) }
        }),
        mapToEditPanelValues: (config) => new Map([
            ["full_name", config.full_name || defaultConfig.full_name],
            ["job_title", config.job_title || defaultConfig.job_title],
            ["email", config.email || defaultConfig.email],
            ["phone", config.phone || defaultConfig.phone],
            ["location", config.location || defaultConfig.location],
            ["hero_tagline", config.hero_tagline || defaultConfig.hero_tagline],
            ["about_intro", config.about_intro || defaultConfig.about_intro]
        ])
    });
}

// --- General Site Functionality ---

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('#home .fade-in');
    
    // Function to close mobile menu
    const closeMobileMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('open');
        }
    };

    // Smooth scrolling for navigation links
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
            closeMobileMenu();
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.toggle('open');
            }
        });
    }

    // Scroll animations setup
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    // Use a small timeout to ensure visibility is applied before animation starts
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
                // Once element is visible, stop observing to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('header-animate');
            } else {
                navbar.classList.remove('header-animate');
            }
        }
    });

    // Contact form submission handler
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Function to display an alert message
            const displayAlert = (text, className) => {
                // Remove existing alerts first
                document.querySelectorAll('.form-alert').forEach(alert => alert.remove());

                const alertDiv = document.createElement('div');
                alertDiv.className = `form-alert px-4 py-3 rounded mt-4 ${className}`;
                alertDiv.textContent = text;
                this.appendChild(alertDiv);
                
                // Remove alert after a few seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            };

            // Simple validation
            if (!name || !email || !message) {
                displayAlert('Please fill in all fields.', 'bg-red-100 border border-red-400 text-red-700');
                return;
            }
            
            // Simulate form submission
            // In a real application, you would send this data to a server
            
            // Show success message
            displayAlert("Thank you for your message! I'll get back to you soon.", 'bg-green-100 border border-green-400 text-green-700');
            
            // Reset form
            this.reset();
        });
    }

    // Initialize animations on page load
    if (heroSection) {
        // Trigger initial animation for the hero section immediately
        heroSection.classList.add('visible');
    }
});