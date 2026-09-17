/* RehabNest Occupational Therapy - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileMenu();
  initScrollAnimations();
  initCounters();
  initModals();
  initBackToTop();
});

function initBackToTop() {
  const topBtns = document.querySelectorAll('.back-to-top-btn, [data-scroll-top]');
  topBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* Theme Switcher (Light / Dark Mode) */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
  const savedTheme = localStorage.getItem('rehabnest_theme') || 'light';
  
  setTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('rehabnest_theme', theme);
  
  const themeToggleIcons = document.querySelectorAll('#theme-toggle i, .theme-toggle-btn i');
  themeToggleIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* RTL Switcher */
function initRTL() {
  const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
  const savedRTL = localStorage.getItem('rehabnest_rtl') || 'false';
  
  setRTL(savedRTL === 'true');

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      setRTL(!isRTL);
    });
  });
}

function setRTL(isRTL) {
  if (isRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
    localStorage.setItem('rehabnest_rtl', 'true');
  } else {
    document.documentElement.removeAttribute('dir');
    localStorage.setItem('rehabnest_rtl', 'false');
  }
}

/* Mobile Header Navigation Menu */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    const navLinks = navMenu.querySelectorAll('.nav-link');
    
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
        document.body.style.overflow = 'hidden';
      } else {
        icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
      }
    });

    // Close menu and unlock scroll when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
      });
    });

    // Close menu and unlock scroll when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
        document.body.style.overflow = '';
      }
    });
  }
}

/* Scroll Entrance Animations */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
}

/* Animated Counters */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'), 10);
        let count = 0;
        const speed = Math.ceil(countTo / 50);

        const updateCount = () => {
          count += speed;
          if (count < countTo) {
            target.innerText = count;
            setTimeout(updateCount, 30);
          } else {
            target.innerText = countTo + (target.getAttribute('data-suffix') || '');
          }
        };
        updateCount();
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* Modal Windows (Appointment Booking) */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}
