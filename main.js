// ==========================================
//  MOHAMED EBEID PORTFOLIO — main.js
//  Features: Navbar scroll, mobile menu,
//  dark/light mode, back to top, form
//  validation, project filter, scroll reveal,
//  skill bar animation
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // --NavBar Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backTop.classList.toggle('visible', window.scrollY > 400);
  });

  // --MOBILE MENU TOGGLE
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ---BACK TO TOP---
  const backTop = document.getElementById('backTop');
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // dark/light mode 
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');

    function updateIcon() {
      if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }

    updateIcon();

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateIcon();
    });
  }

  // scroll
  const revealEls = document.querySelectorAll(
    '.service-card, .project-card, .skill-item, .contact-card, .about-grid, .cta-box, .section-title'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ---Skill bar
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(fill => skillObserver.observe(fill));
  }



  // form validition--
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fields = [
        { id: 'name',    errId: 'nameErr',    msg: 'Please enter your name.' },
        { id: 'email',   errId: 'emailErr',   msg: 'Please enter a valid email.',  isEmail: true },
        { id: 'subject', errId: 'subjectErr', msg: 'Please enter a subject.' },
        { id: 'message', errId: 'messageErr', msg: 'Please write a message.' },
      ];

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const err   = document.getElementById(f.errId);
        input.classList.remove('error');
        err.textContent = '';

        if (!input.value.trim()) {
          input.classList.add('error');
          err.textContent = f.msg;
          valid = false;
        } else if (f.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          input.classList.add('error');
          err.textContent = f.msg;
          valid = false;
        }
      });

      if (valid) {
        const successMsg = document.getElementById('successMsg');
        successMsg.classList.remove('hidden');
        form.reset();
        setTimeout(() => successMsg.classList.add('hidden'), 5000);
      }
    });
  }

  // --Typing effect
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    const text = heroSub.textContent;
    heroSub.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroSub.textContent += text[i++];
        setTimeout(type, 28);
      }
    };
    setTimeout(type, 600);
  }

});