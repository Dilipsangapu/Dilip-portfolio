/* ============================================================
   Portfolio JS — GRAND IMPERIAL EDITION (Enhanced Animations)
   All animation systems: particles, cursor, loader, scroll,
   typewriter, counters, magnetic buttons, tilt, and more.
   ============================================================ */

// ══════════════════════════════════════════
// PAGE LOADER
// ══════════════════════════════════════════

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("loaded");
      document.body.style.overflow = "auto";
      // Trigger hero animations after loader
      initHeroAnimations();
    }, 1800);
  }
});

// Prevent scroll while loading
document.body.style.overflow = "hidden";

// ══════════════════════════════════════════
// CUSTOM CURSOR
// ══════════════════════════════════════════

const cursorFollower = document.getElementById("cursor-follower");
const cursorDot = document.getElementById("cursor-dot");

let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot follows immediately
  if (cursorDot) {
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  }
});

// Smooth follower animation loop
function animateCursor() {
  // Lerp for smooth following
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;

  if (cursorFollower) {
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects on interactive elements
const interactiveElements = document.querySelectorAll(
  'a, button, .btn, .tag, .nav-link, .social-link, .project-card, .feature-card, .skill-card, .experience-card, .certification-card, .contact-card, input, textarea, [role="button"]'
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursorFollower) cursorFollower.classList.add("hover");
    if (cursorDot) cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    if (cursorFollower) cursorFollower.classList.remove("hover");
    if (cursorDot) cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

// Click effect
document.addEventListener("mousedown", () => {
  if (cursorFollower) cursorFollower.classList.add("click");
  if (cursorDot) cursorDot.classList.add("click");
});
document.addEventListener("mouseup", () => {
  if (cursorFollower) cursorFollower.classList.remove("click");
  if (cursorDot) cursorDot.classList.remove("click");
});

// Hide cursor on mobile
function checkCursorVisibility() {
  const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;
  if (cursorFollower) cursorFollower.style.display = isMobile ? "none" : "block";
  if (cursorDot) cursorDot.style.display = isMobile ? "none" : "block";
  if (isMobile) {
    document.body.style.cursor = "auto";
  } else {
    document.body.style.cursor = "none";
  }
}
checkCursorVisibility();
window.addEventListener("resize", checkCursorVisibility);

// ══════════════════════════════════════════
// PARTICLE CANVAS BACKGROUND
// ══════════════════════════════════════════

const canvas = document.getElementById("particle-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.opacitySpeed = Math.random() * 0.008 + 0.002;
      this.opacityDir = 1;

      // Gold, ember, crimson palette
      const colors = [
        { r: 255, g: 215, b: 0 },   // gold
        { r: 255, g: 107, b: 53 },   // ember
        { r: 196, g: 30, b: 58 },    // crimson
        { r: 240, g: 160, b: 48 },   // amber
        { r: 184, g: 134, b: 11 },   // dark gold
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Pulse opacity
      this.opacity += this.opacitySpeed * this.opacityDir;
      if (this.opacity >= 0.6) this.opacityDir = -1;
      if (this.opacity <= 0.05) this.opacityDir = 1;

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.15})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 160, 23, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    animFrameId = requestAnimationFrame(animateParticles);
  }

  // Mouse interaction with particles
  let canvasMouseX = 0,
    canvasMouseY = 0;

  document.addEventListener("mousemove", (e) => {
    canvasMouseX = e.clientX;
    canvasMouseY = e.clientY;

    // Push particles away from mouse
    particles.forEach((p) => {
      const dx = p.x - canvasMouseX;
      const dy = p.y - canvasMouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 2;
        p.y += (dy / dist) * force * 2;
      }
    });
  });

  initParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animFrameId);
    initParticles();
    animateParticles();
  });
}

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const header = document.getElementById("header");

// Mobile menu toggle
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("active");
    if (navToggle) navToggle.classList.remove("active");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");

function highlightNavLink() {
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        // Remove active from all
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", highlightNavLink);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ══════════════════════════════════════════
// SCROLL-TRIGGERED ANIMATIONS
// ══════════════════════════════════════════

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute("data-delay")) || 0;

        setTimeout(() => {
          el.classList.add("animated");
        }, delay);

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));
}

// Initialize after loader completes
function initHeroAnimations() {
  initScrollAnimations();
  initTypewriter();
  initCounters();
}

// Also init immediately if loader is missing
if (!document.getElementById("page-loader")) {
  window.addEventListener("DOMContentLoaded", initHeroAnimations);
}

// ══════════════════════════════════════════
// TYPEWRITER EFFECT
// ══════════════════════════════════════════

function initTypewriter() {
  const typewriterEl = document.getElementById("typewriter");
  if (!typewriterEl) return;

  const phrases = [
    "Java Full Stack Developer",
    "Spring Boot Specialist",
    "Backend Engineer",
    "Problem Solver",
    "Creative Thinker",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    // Finished typing
    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    }

    // Finished deleting
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next phrase
    }

    setTimeout(type, typeSpeed);
  }

  // Start after a brief delay
  setTimeout(type, 1000);
}

// ══════════════════════════════════════════
// COUNTER ANIMATION
// ══════════════════════════════════════════

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          animateCounter(counter, target);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const duration = 2000;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    current = Math.floor(easeProgress * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

// ══════════════════════════════════════════
// MAGNETIC BUTTON EFFECT
// ══════════════════════════════════════════

document.querySelectorAll(".btn-magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
    btn.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  });

  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "transform 0.15s ease-out";
  });
});

// ══════════════════════════════════════════
// TILT EFFECT ON CARDS
// ══════════════════════════════════════════

function initTiltEffect() {
  const tiltCards = document.querySelectorAll(
    ".feature-card, .skill-card, .certification-card"
  );

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.transition = "transform 0.1s ease-out";

      // Dynamic shine effect
      const shine = card.querySelector(".certification-shine");
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,215,0,0.15) 0%, transparent 60%)`;
        shine.style.opacity = "1";
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

      const shine = card.querySelector(".certification-shine");
      if (shine) {
        shine.style.opacity = "0";
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", initTiltEffect);

// ══════════════════════════════════════════
// PROJECT CARD PARALLAX ON HOVER
// ══════════════════════════════════════════

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const img = card.querySelector(".project-image img");
    if (img) {
      img.style.transformOrigin = `${x}% ${y}%`;
    }
  });
});

// ══════════════════════════════════════════
// CONTACT FORM FIELD ANIMATIONS
// ══════════════════════════════════════════

document.querySelectorAll(".field input, .message textarea").forEach((field) => {
  // Focus line animation
  field.addEventListener("focus", () => {
    const line = field.parentElement.querySelector(".field-focus-line");
    if (line) {
      line.style.transform = "scaleX(1)";
    }
    field.parentElement.classList.add("focused");
  });

  field.addEventListener("blur", () => {
    const line = field.parentElement.querySelector(".field-focus-line");
    if (line && !field.value) {
      line.style.transform = "scaleX(0)";
    }
    if (!field.value) {
      field.parentElement.classList.remove("focused");
    }
  });

  // Filled state
  field.addEventListener("input", () => {
    if (field.value) {
      field.parentElement.classList.add("filled");
    } else {
      field.parentElement.classList.remove("filled");
    }
  });
});

// ══════════════════════════════════════════
// BUTTON RIPPLE EFFECT
// ══════════════════════════════════════════

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Inject ripple style
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 215, 0, 0.25);
    transform: scale(0);
    animation: ripple-anim 0.7s ease-out;
    pointer-events: none;
    z-index: 10;
  }
  @keyframes ripple-anim {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ══════════════════════════════════════════
// PARALLAX ON SCROLL
// ══════════════════════════════════════════

function initParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    // Hero blurs parallax
    const heroBlurs = document.querySelectorAll(".hero-blur");
    heroBlurs.forEach((blur, index) => {
      const speed = 0.3 + index * 0.15;
      blur.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Hero particles parallax
    const heroParticles = document.querySelector(".hero-particles");
    if (heroParticles) {
      heroParticles.style.transform = `translateY(${scrolled * 0.2}px)`;
    }

    // Profile image subtle float
    const profileImage = document.querySelector(".image-container");
    if (profileImage) {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        if (heroRect.bottom > 0) {
          profileImage.style.transform = `translateY(${scrolled * 0.08}px)`;
        }
      }
    }
  });
}

initParallax();

// ══════════════════════════════════════════
// STAGGERED TAG ANIMATIONS ON SCROLL
// ══════════════════════════════════════════

function initTagAnimations() {
  const tagContainers = document.querySelectorAll(
    ".skill-tags, .project-tags, .experience-tags, .certification-skills"
  );

  const tagObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll(".tag-animated");
          tags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.08 + 0.2}s`;
            tag.classList.add("tag-visible");
          });
          tagObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  tagContainers.forEach((container) => tagObserver.observe(container));
}

window.addEventListener("DOMContentLoaded", initTagAnimations);

// Inject tag-visible style
const tagStyle = document.createElement("style");
tagStyle.textContent = `
  .tag-animated {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
  .tag-animated.tag-visible {
    animation: tagPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
`;
document.head.appendChild(tagStyle);

// ══════════════════════════════════════════
// SMOOTH REVEAL FOR EXPERIENCE ACHIEVEMENTS
// ══════════════════════════════════════════

function initAchievementAnimations() {
  const achievementLists = document.querySelectorAll(".experience-achievements ul");

  const achievementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll("li");
          items.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(-20px)";
            item.style.transition = `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`;

            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateX(0)";
            }, 50);
          });
          achievementObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  achievementLists.forEach((list) => achievementObserver.observe(list));
}

window.addEventListener("DOMContentLoaded", initAchievementAnimations);

// ══════════════════════════════════════════
// SECTION DIVIDER GLOW ANIMATION
// ══════════════════════════════════════════

function initSectionLineAnimation() {
  const sectionLines = document.querySelectorAll(".section-line");

  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = "6rem";
          entry.target.style.transition = "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }
      });
    },
    { threshold: 0.5 }
  );

  sectionLines.forEach((line) => {
    line.style.width = "0";
    lineObserver.observe(line);
  });
}

window.addEventListener("DOMContentLoaded", initSectionLineAnimation);

// ══════════════════════════════════════════
// TEXT SPLIT ANIMATION FOR SECTION TITLES
// ══════════════════════════════════════════

function initTextSplitAnimation() {
  const titles = document.querySelectorAll(".section-title");

  titles.forEach((title) => {
    // Skip if already processed
    if (title.getAttribute("data-split") === "true") return;
    title.setAttribute("data-split", "true");

    const text = title.innerHTML;
    // We don't split gradient-text spans, they stay as-is
    // This just adds a subtle word-by-word entrance via CSS
    title.style.opacity = "1";
  });
}

window.addEventListener("DOMContentLoaded", initTextSplitAnimation);

// ══════════════════════════════════════════
// CONTACT CARD HOVER GLOW EFFECT
// ══════════════════════════════════════════

document.querySelectorAll(".contact-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(184,134,11,0.12) 0%, rgba(20,8,2,0.88) 60%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "var(--bg-card)";
    card.style.transition = "background 0.5s ease";
  });
});

// ══════════════════════════════════════════
// SOCIAL LINK HOVER ANIMATION
// ══════════════════════════════════════════

document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) rotate(5deg)";
  });
  link.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) rotate(0deg)";
  });
});

// ══════════════════════════════════════════
// SCROLL PROGRESS INDICATOR
// ══════════════════════════════════════════

function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #8b6914, #ffd700, #ff6b35, #c41e3a);
    z-index: 10001;
    transition: width 0.1s linear;
    box-shadow: 0 0 10px rgba(255,215,0,0.5), 0 0 20px rgba(255,107,53,0.3);
  `;
  document.body.prepend(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

initScrollProgress();

// ══════════════════════════════════════════
// BACK TO TOP BUTTON
// ══════════════════════════════════════════

function initBackToTop() {
  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 19V5m0 0l-7 7m7-7l7 7"/>
    </svg>
  `;
  btn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 2px;
    background: rgba(20, 8, 2, 0.9);
    border: 1px solid rgba(184,134,11,0.3);
    color: #ffd700;
    cursor: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.38s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(12px);
  `;
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btn.addEventListener("mouseenter", () => {
    btn.style.borderColor = "#ffd700";
    btn.style.boxShadow = "0 0 28px rgba(255,215,0,0.4)";
    btn.style.transform = "translateY(-3px)";
    if (cursorFollower) cursorFollower.classList.add("hover");
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.borderColor = "rgba(184,134,11,0.3)";
    btn.style.boxShadow = "none";
    btn.style.transform = "translateY(0)";
    if (cursorFollower) cursorFollower.classList.remove("hover");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.style.opacity = "1";
      btn.style.visibility = "visible";
      btn.style.transform = "translateY(0)";
    } else {
      btn.style.opacity = "0";
      btn.style.visibility = "hidden";
      btn.style.transform = "translateY(20px)";
    }
  });
}

initBackToTop();

// ══════════════════════════════════════════
// FORM SUBMISSION ANIMATION
// ══════════════════════════════════════════

const contactForm = document.querySelector('.contact-form-card');
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      const btnText = submitBtn.querySelector('.btn-text');
      const btnArrow = submitBtn.querySelector('.btn-icon-arrow');

      if (btnText) btnText.textContent = "Sending...";
      if (btnArrow) {
        btnArrow.style.animation = "sendArrow 0.6s ease infinite";
      }
      submitBtn.style.pointerEvents = "none";

      // Reset after formspree handles it (or timeout)
      setTimeout(() => {
        if (btnText) btnText.textContent = "Send Message";
        if (btnArrow) btnArrow.style.animation = "";
        submitBtn.style.pointerEvents = "auto";
      }, 4000);
    }
  });
}

// Inject send arrow animation
const sendArrowStyle = document.createElement("style");
sendArrowStyle.textContent = `
  @keyframes sendArrow {
    0% { transform: translateX(0); opacity: 1; }
    50% { transform: translateX(10px); opacity: 0; }
    51% { transform: translateX(-10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(sendArrowStyle);

// ══════════════════════════════════════════
// CERTIFICATION CARD SHINE EFFECT
// ══════════════════════════════════════════

document.querySelectorAll(".certification-card").forEach((card) => {
  const shine = card.querySelector(".certification-shine");
  if (!shine) return;

  // Set shine styles
  shine.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
    border-radius: inherit;
  `;
});

// ══════════════════════════════════════════
// STATUS BADGE PULSE
// ══════════════════════════════════════════

const statusPulseStyle = document.createElement("style");
statusPulseStyle.textContent = `
  .status-pulse {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-gold);
    margin-right: 6px;
    animation: statusPulseAnim 2s ease-in-out infinite;
    vertical-align: middle;
  }
  @keyframes statusPulseAnim {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(255, 215, 0, 0);
    }
  }
`;
document.head.appendChild(statusPulseStyle);

// ══════════════════════════════════════════
// EXPERIENCE TIMELINE ANIMATION
// ══════════════════════════════════════════

function initTimelineAnimation() {
  const timelineLine = document.querySelector(".experience-list");
  if (!timelineLine) return;

  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("timeline-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  lineObserver.observe(timelineLine);
}

// Inject timeline animation style
const timelineStyle = document.createElement("style");
timelineStyle.textContent = `
  .experience-list::before {
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .experience-list.timeline-visible::before {
    transform: scaleY(1);
  }
`;
document.head.appendChild(timelineStyle);

window.addEventListener("DOMContentLoaded", initTimelineAnimation);

// ══════════════════════════════════════════
// KEYBOARD NAVIGATION ENHANCEMENT
// ══════════════════════════════════════════

document.addEventListener("keydown", (e) => {
  // Show normal cursor on tab (for accessibility)
  if (e.key === "Tab") {
    document.body.style.cursor = "auto";
    if (cursorFollower) cursorFollower.style.display = "none";
    if (cursorDot) cursorDot.style.display = "none";
  }
});

document.addEventListener("mousemove", () => {
  const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;
  if (!isMobile) {
    document.body.style.cursor = "none";
    if (cursorFollower) cursorFollower.style.display = "block";
    if (cursorDot) cursorDot.style.display = "block";
  }
});

// ══════════════════════════════════════════
// TAWK.TO LIVE CHAT
// ══════════════════════════════════════════

var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/68652fd5ac5c12190c3ee121/1iv5k5nbn";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();

// ══════════════════════════════════════════
// EASTER EGG: KONAMI CODE
// ══════════════════════════════════════════

let konamiSequence = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener("keydown", (e) => {
  konamiSequence.push(e.keyCode);
  if (konamiSequence.length > konamiCode.length) {
    konamiSequence.shift();
  }
  if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
    activateGoldMode();
  }
});

function activateGoldMode() {
  document.body.style.transition = "filter 1s ease";
  document.body.style.filter = "sepia(0.3) saturate(1.5) brightness(1.1)";

  // Burst of gold particles
  for (let i = 0; i < 50; i++) {
    createBurstParticle();
  }

  setTimeout(() => {
    document.body.style.filter = "";
  }, 3000);
}

function createBurstParticle() {
  const particle = document.createElement("div");
  const size = Math.random() * 8 + 4;
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const duration = Math.random() * 2 + 1;

  particle.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    background: var(--accent-gold);
    border-radius: 50%;
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
    z-index: 100001;
    box-shadow: 0 0 ${size * 2}px rgba(255,215,0,0.6);
    animation: burstFloat ${duration}s ease-out forwards;
  `;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), duration * 1000);
}

// Inject burst animation
const burstStyle = document.createElement("style");
burstStyle.textContent = `
  @keyframes burstFloat {
    0% { transform: scale(1) translateY(0); opacity: 1; }
    100% { transform: scale(0) translateY(-200px) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(burstStyle);

// ══════════════════════════════════════════
// PERFORMANCE: REDUCE MOTION PREFERENCE
// ══════════════════════════════════════════

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReducedMotion.matches) {
  // Disable heavy animations
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
    el.classList.add("animated");
  });

  // Stop particle canvas
  if (canvas) {
    canvas.style.display = "none";
  }

  // Disable cursor effects
  if (cursorFollower) cursorFollower.style.display = "none";
  if (cursorDot) cursorDot.style.display = "none";
  document.body.style.cursor = "auto";
}

// ══════════════════════════════════════════
// INITIALIZATION COMPLETE LOG
// ══════════════════════════════════════════

console.log(
  "%c✦ S Dilip Chowdary — Portfolio Loaded ✦",
  "background: linear-gradient(135deg, #1a0800, #2d1200); color: #ffd700; font-family: Cinzel, serif; font-size: 14px; padding: 12px 24px; border: 1px solid #b8860b; border-radius: 2px;"
);
 (function() {
      const irisL  = document.getElementById('iris-l');
      const irisR  = document.getElementById('iris-r');
      const head   = document.getElementById('avatar-head');
      const browL  = document.getElementById('brow-l');
      const browR  = document.getElementById('brow-r');
      const svg    = document.getElementById('avatar-svg');
      const container = document.getElementById('avatar-container');

      if (!irisL || !irisR || !svg) return;

      // Eye center positions in SVG space (matching the SVG above)
      const EYES = {
        l: { cx: 165, cy: 200 },
        r: { cx: 235, cy: 200 }
      };
      const EYE_RADIUS = 8;   // max iris travel distance
      const HEAD_TILT  = 4;   // max head rotation degrees
      const HEAD_X     = 6;   // max head X translate px

      let targetLX = EYES.l.cx, targetLY = EYES.l.cy;
      let targetRX = EYES.r.cx, targetRY = EYES.r.cy;
      let currentLX = EYES.l.cx, currentLY = EYES.l.cy;
      let currentRX = EYES.r.cx, currentRY = EYES.r.cy;
      let targetRotate = 0, currentRotate = 0;
      let targetTX = 0, currentTX = 0;
      let rafId;

      function getSVGCenter() {
        const rect = svg.getBoundingClientRect();
        return {
          x: rect.left + rect.width  * (165 / 400),  // approx eye midpoint
          y: rect.top  + rect.height * (200 / 400)
        };
      }

      function mapEye(mx, my, eyeCX, eyeCY, svgRect) {
        // Convert mouse to SVG coordinate space
        const svgW = svgRect.width  || 1;
        const svgH = svgRect.height || 1;
        const svgX = ((mx - svgRect.left) / svgW) * 400;
        const svgY = ((my - svgRect.top)  / svgH) * 400;

        const dx = svgX - eyeCX;
        const dy = svgY - eyeCY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 90; // consider anything within 90 SVG units

        const factor = Math.min(dist / maxDist, 1) * EYE_RADIUS;
        if (dist < 0.1) return { x: eyeCX, y: eyeCY };

        return {
          x: eyeCX + (dx / dist) * factor,
          y: eyeCY + (dy / dist) * factor
        };
      }

      function onMouseMove(e) {
        const rect = svg.getBoundingClientRect();
        const svgCenterX = rect.left + rect.width * 0.5;
        const svgCenterY = rect.top  + rect.height * 0.5;

        // Head tilt: map horizontal mouse offset to rotation
        const winW = window.innerWidth;
        const relX = (e.clientX - svgCenterX) / (winW * 0.5); // -1 to 1
        targetRotate = relX * HEAD_TILT;
        targetTX     = relX * HEAD_X;

        // Eyes
        const posL = mapEye(e.clientX, e.clientY, EYES.l.cx, EYES.l.cy, rect);
        const posR = mapEye(e.clientX, e.clientY, EYES.r.cx, EYES.r.cy, rect);
        targetLX = posL.x; targetLY = posL.y;
        targetRX = posR.x; targetRY = posR.y;

        // Eyebrow raise when cursor is near avatar
        const distToCenter = Math.sqrt(
          Math.pow(e.clientX - svgCenterX, 2) + Math.pow(e.clientY - svgCenterY, 2)
        );
        const brows = document.querySelectorAll('#brow-l, #brow-r');
        if (distToCenter < rect.width * 0.8) {
          brows.forEach(b => { b.style.transform = 'translateY(-3px)'; b.style.transition = 'transform 0.3s ease'; });
        } else {
          brows.forEach(b => { b.style.transform = 'translateY(0)'; });
        }
      }

      function lerp(a, b, t) { return a + (b - a) * t; }

      function tick() {
        const SPEED = 0.10;

        currentLX = lerp(currentLX, targetLX, SPEED);
        currentLY = lerp(currentLY, targetLY, SPEED);
        currentRX = lerp(currentRX, targetRX, SPEED);
        currentRY = lerp(currentRY, targetRY, SPEED);
        currentRotate = lerp(currentRotate, targetRotate, SPEED * 0.6);
        currentTX     = lerp(currentTX,     targetTX,     SPEED * 0.6);

        // Move iris groups by translating them relative to their eye center
        irisL.setAttribute('transform',
          `translate(${currentLX - EYES.l.cx}, ${currentLY - EYES.l.cy})`);
        irisR.setAttribute('transform',
          `translate(${currentRX - EYES.r.cx}, ${currentRY - EYES.r.cy})`);

        // Head tilt
        if (head) {
          head.setAttribute('transform',
            `rotate(${currentRotate.toFixed(3)}, 200, 200) translate(${currentTX.toFixed(3)}, 0)`);
        }

        rafId = requestAnimationFrame(tick);
      }

      document.addEventListener('mousemove', onMouseMove);
      tick();

      // On touch: return to neutral
      document.addEventListener('touchstart', () => {
        targetLX = EYES.l.cx; targetLY = EYES.l.cy;
        targetRX = EYES.r.cx; targetRY = EYES.r.cy;
        targetRotate = 0; targetTX = 0;
      });

    })();