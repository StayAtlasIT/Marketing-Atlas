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
  });
});

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your interest! We will contact you within 24 hours.');
});

// Intersection Observer for animations
const observeElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .scale-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
    }
  });
});

observeElements.forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});