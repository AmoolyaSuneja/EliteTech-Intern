// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fade-in').forEach((element) => {
    observer.observe(element);
  });

  initializeHoverEffects();
  initializeThemeToggle();
});

// Initialize hover effects and parallax
function initializeHoverEffects() {
  const heroContent = document.querySelector('.hero-content');
  const nameTitle = document.querySelector('.name-title');

  // Subtle parallax effect on hero content
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    const depth = 20; // Adjust for more/less movement

    if (heroContent) {
      heroContent.style.transform = `translate(${mouseX * depth}px, ${mouseY * depth}px)`;
    }
  });

  // Smooth reset when mouse leaves
  document.addEventListener('mouseleave', () => {
    if (heroContent) {
      heroContent.style.transform = 'translate(0, 0)';
    }
  });
}

// Theme toggle with smooth transition
function initializeThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial theme based on user's system preference
  if (prefersDarkScheme.matches) {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Add subtle scale animation
    toggleBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      toggleBtn.style.transform = 'scale(1)';
    }, 100);
  });
}

// Add smooth scrolling for navigation
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
