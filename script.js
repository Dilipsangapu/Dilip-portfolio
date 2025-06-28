// Navigation functionality
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const header = document.getElementById("header")

// Mobile menu toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact form handling with EmailJS (cleaned & deduplicated)
window.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const submitButton = contactForm.querySelector('button[type="submit"]')

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    if (!firstName || !lastName || !email || !subject || !message) {
      alert("Please fill in all fields")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address")
      return
    }

    const originalText = submitButton.innerHTML
    submitButton.innerHTML = "Sending..."
    submitButton.disabled = true

    emailjs.sendForm("service_oippim9", "template_czbuvn9", contactForm)
      .then(() => {
        alert("Thank you for your message! I'll get back to you soon.")
        contactForm.reset()
      })
      .catch((error) => {
        console.error("EmailJS error:", error)
        alert("Oops! Something went wrong. Please try again.")
      })
      .finally(() => {
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      })
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document
  .querySelectorAll(".feature-card, .skill-card, .project-card, .experience-card, .contact-card")
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

// Hover effects for project images
document.querySelectorAll(".project-image img").forEach((img) => {
  img.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
  })
  img.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    typeWriter(heroTitle, originalText, 50)
  }
})

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBlurs = document.querySelectorAll(".hero-blur")
  heroBlurs.forEach((blur, index) => {
    const speed = 0.5 + index * 0.2
    blur.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Button ripple effect
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)
    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Inject ripple animation style
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)

// EmailJS Init
emailjs.init("rFJyRzT5p4UUoLYJd")
