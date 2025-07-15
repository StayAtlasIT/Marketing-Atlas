// Mobile menu toggle
// ...
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      // Change icon based on menu state
      const icon = mobileMenuButton.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
      } else {
        icon.classList.remove('ri-menu-line');
        icon.classList.add('ri-close-line');
      }
    });
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-line');
      });
    });
  }

  // Logo smooth scroll to top
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fade-in animation
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });

  // Hero card animation
  const heroCards = document.querySelectorAll('.hero-card');
  heroCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });

  // Marketing icon hover effect
  const marketingIcons = document.querySelectorAll('.marketing-icon');
  marketingIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.classList.add('text-primary');
      this.parentElement.querySelector('h3').classList.add('text-primary');
    });
    icon.addEventListener('mouseleave', function() {
      this.classList.remove('text-primary');
      this.parentElement.querySelector('h3').classList.remove('text-primary');
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  // Modal logic
  const connectUsBtn = document.getElementById('connect-us-btn');
  const mobileConnectUsBtn = document.getElementById('mobile-connect-us-btn');
  const contactModal = document.getElementById('contact-modal');
  const closeModal = document.getElementById('close-modal');
  const modalForm = document.getElementById('modal-contact-form');
  function scrollToContact() {
    const contactSection = document.getElementById('connect');
    if (contactSection) {
      window.scrollTo({ top: contactSection.offsetTop - 70, behavior: 'smooth' });
    }
  }
  function toggleModal(show) {
    if (show) {
      contactModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      contactModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }
  if (connectUsBtn) {
    connectUsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Uncomment the following line to enable modal instead of scroll
      // toggleModal(true);
      scrollToContact();
    });
  }
  if (mobileConnectUsBtn) {
    mobileConnectUsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToContact();
    });
  }
  if (closeModal) {
    closeModal.addEventListener('click', () => toggleModal(false));
  }
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        toggleModal(false);
      }
    });
  }
  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const isValid = validateForm(this);
      if (isValid) {
        // Handle form submission
        toggleModal(false);
        modalForm.reset();
      }
    });
  }
  function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('border-red-500');
        isValid = false;
      } else {
        input.classList.remove('border-red-500');
      }
      if (input.type === 'email' && !input.value.includes('@')) {
        input.classList.add('border-red-500');
        isValid = false;
      }
    });
    return isValid;
  }

  // Contact form validation and success message
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simple validation example
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;
      if (nameInput && !nameInput.value.trim()) {
        nameInput.classList.add('border-red-500');
        isValid = false;
      } else if (nameInput) {
        nameInput.classList.remove('border-red-500');
      }
      if (emailInput && (!emailInput.value.trim() || !emailInput.value.includes('@'))) {
        emailInput.classList.add('border-red-500');
        isValid = false;
      } else if (emailInput) {
        emailInput.classList.remove('border-red-500');
      }
      if (messageInput && !messageInput.value.trim()) {
        messageInput.classList.add('border-red-500');
        isValid = false;
      } else if (messageInput) {
        messageInput.classList.remove('border-red-500');
      }
      if (isValid) {
        // Form submission logic would go here
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
        successMessage.innerHTML = '<strong class="font-bold">Success!</strong> <span class="block sm:inline">Your message has been sent successfully.</span>';
        contactForm.appendChild(successMessage);
        setTimeout(() => {
          successMessage.remove();
          contactForm.reset();
        }, 3000);
      }
    });
  }

  // Custom checkbox
  const customCheckboxes = document.querySelectorAll('.custom-checkbox');
  customCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      const input = this.querySelector('input[type="checkbox"]');
      input.checked = !input.checked;
    });
  });

  // 3D effect for service cards
  const serviceCards = document.querySelectorAll('.service-card-3d');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xRotation = ((y - rect.height / 2) / rect.height) * 10;
      const yRotation = ((x - rect.width / 2) / rect.width) * -10;
      this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseout', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Add to the existing DOMContentLoaded event listener, before the closing });

    // Enhanced Responsive Handling
    function handleResponsive() {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024;

      // Adjust carousel scroll distance based on device
      const scrollDistance = isMobile ? 300 : isTablet ? 350 : 400;
      
      // Update carousel scroll handlers
      const leftArrow = document.querySelector('.absolute.top-1\\/2.-left-4');
      const rightArrow = document.querySelector('.absolute.top-1\\/2.-right-4');
      
      if (leftArrow && rightArrow) {
          leftArrow.replaceWith(leftArrow.cloneNode(true));
          rightArrow.replaceWith(rightArrow.cloneNode(true));
          
          const newLeftArrow = document.querySelector('.absolute.top-1\\/2.-left-4');
          const newRightArrow = document.querySelector('.absolute.top-1\\/2.-right-4');
          
          newLeftArrow.addEventListener('click', function() {
              scrollContainer.scrollBy({
                  left: -scrollDistance,
                  behavior: 'smooth'
              });
          });

          newRightArrow.addEventListener('click', function() {
              scrollContainer.scrollBy({
                  left: scrollDistance,
                  behavior: 'smooth'
              });
          });
      }
  }

  // Touch/Swipe Support for Property Carousel
  let isDown = false;
  let startX;
  let scrollLeft;

  if (scrollContainer) {
      scrollContainer.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - scrollContainer.offsetLeft;
          scrollLeft = scrollContainer.scrollLeft;
          scrollContainer.style.cursor = 'grabbing';
      });

      scrollContainer.addEventListener('mouseleave', () => {
          isDown = false;
          scrollContainer.style.cursor = 'grab';
      });

      scrollContainer.addEventListener('mouseup', () => {
          isDown = false;
          scrollContainer.style.cursor = 'grab';
      });

      scrollContainer.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - scrollContainer.offsetLeft;
          const walk = (x - startX) * 2;
          scrollContainer.scrollLeft = scrollLeft - walk;
      });

      // Touch events for mobile
      scrollContainer.addEventListener('touchstart', (e) => {
          startX = e.touches[0].pageX - scrollContainer.offsetLeft;
          scrollLeft = scrollContainer.scrollLeft;
      });

      scrollContainer.addEventListener('touchmove', (e) => {
          if (!startX) return;
          const x = e.touches[0].pageX - scrollContainer.offsetLeft;
          const walk = (x - startX) * 2;
          scrollContainer.scrollLeft = scrollLeft - walk;
      });
  }

  // Enhanced Form Validation with Better UX
  function validateForm(form) {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
          const errorElement = input.nextElementSibling;
          if (errorElement && errorElement.classList.contains('error-message')) {
              errorElement.remove();
          }
          
          input.classList.remove('border-red-500');
          
          if (!input.value.trim()) {
              isValid = false;
              input.classList.add('border-red-500');
              const errorDiv = document.createElement('div');
              errorDiv.className = 'error-message text-red-500 text-sm mt-1';
              errorDiv.textContent = 'This field is required';
              input.parentNode.insertBefore(errorDiv, input.nextSibling);
          }
      });
      
      return isValid;
  }

  // Loading State Management
  function setLoadingState(button, isLoading) {
      if (isLoading) {
          button.classList.add('loading');
          button.disabled = true;
          button.textContent = 'Sending...';
      } else {
          button.classList.remove('loading');
          button.disabled = false;
          button.textContent = 'Send Message';
      }
  }

  // Enhanced Intersection Observer with Performance
  const enhancedObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Unobserve after animation to improve performance
              enhancedObserver.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  });

  // Re-observe elements with enhanced observer
  document.querySelectorAll('.fade-in').forEach(el => {
      enhancedObserver.observe(el);
  });

  // Responsive handler
  handleResponsive();
  window.addEventListener('resize', debounce(handleResponsive, 250));

  // Performance monitoring
  if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
          // Non-critical animations and effects
          document.querySelectorAll('.service-card, .property-card').forEach(card => {
              card.classList.add('gpu-accelerated');
          });
      });
  }
}); 

// Add at the end of the file, outside the DOMContentLoaded event

// Advanced Performance Optimizations
const performanceOptimizations = {
  // Lazy load images
  lazyLoadImages: function() {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                  imageObserver.unobserve(img);
              }
          });
      });

      images.forEach(img => imageObserver.observe(img));
  },

  // Preload critical resources
  preloadResources: function() {
      const criticalImages = [
          'https://static.readdy.ai/image/27783f40f8c8c9957915a346071430ca/d333c0207308ce7b94a91f6b5db54485.png'
      ];

      criticalImages.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = src;
          link.as = 'image';
          document.head.appendChild(link);
      });
  },

  // Optimize scroll performance
  optimizeScrollPerformance: function() {
      let ticking = false;
      
      function updateScrollEffects() {
          // Batch DOM reads and writes
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          // Update header opacity
          const header = document.querySelector('header');
          if (header) {
              const opacity = Math.min(scrollY / 100, 1);
              header.style.backgroundColor = `rgba(255, 255, 255, ${0.95 + opacity * 0.05})`;
          }
          
          ticking = false;
      }
      
      window.addEventListener('scroll', () => {
          if (!ticking) {
              requestAnimationFrame(updateScrollEffects);
              ticking = true;
          }
      });
  }
};

// Initialize optimizations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
      performanceOptimizations.preloadResources();
      performanceOptimizations.lazyLoadImages();
      performanceOptimizations.optimizeScrollPerformance();
  });
} else {
  performanceOptimizations.preloadResources();
  performanceOptimizations.lazyLoadImages();
  performanceOptimizations.optimizeScrollPerformance();
}

// Animate-on-scroll functionality
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
  if (entry.isIntersecting) {
  entry.target.classList.add('animate');
  }
  });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
  });
  });

  