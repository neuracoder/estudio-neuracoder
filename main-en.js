// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })
  }

  // Language Toggle Functionality
  const langButtons = document.querySelectorAll(".lang-btn")

  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang")

      // Remove active class from all language buttons
      langButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Language switching logic
      if (lang === "es") {
        window.location.href = "index.html"
      } else {
        window.location.href = "index-en.html"
      }
    })
  })

  // Smooth Scrolling for Anchor Links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Contact Form Validation (English version)
  const contactForm = document.getElementById("contact-form-en")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Clear previous errors
      clearErrors()

      // Validate form
      let isValid = true

      // Name validation
      const name = document.getElementById("name")
      if (!name.value.trim()) {
        showError("name", "Name is required")
        isValid = false
      } else if (name.value.trim().length < 2) {
        showError("name", "Name must be at least 2 characters")
        isValid = false
      }

      // Company validation
      const company = document.getElementById("company")
      if (!company.value.trim()) {
        showError("company", "Company is required")
        isValid = false
      }

      // Email validation
      const email = document.getElementById("email")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.value.trim()) {
        showError("email", "Email is required")
        isValid = false
      } else if (!emailRegex.test(email.value)) {
        showError("email", "Please enter a valid email")
        isValid = false
      }

      // Project type validation
      const projectType = document.getElementById("project-type")
      if (!projectType.value) {
        showError("project-type", "Select a project type")
        isValid = false
      }

      // Description validation
      const description = document.getElementById("description")
      if (!description.value.trim()) {
        showError("description", "Project description is required")
        isValid = false
      } else if (description.value.trim().length < 50) {
        showError("description", "Please provide more details (minimum 50 characters)")
        isValid = false
      }

      if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent

        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true

        // Simulate API call
        setTimeout(() => {
          alert("Thank you for your message! We'll respond in less than 24 hours.")
          contactForm.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 2000)
      }
    })

    // Real-time validation
    const formInputs = contactForm.querySelectorAll("input, select, textarea")
    formInputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this)
      })

      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this)
        }
      })
    })
  }

  // Form validation helper functions
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "-error")

    field.classList.add("error")
    field.classList.remove("success")

    if (errorElement) {
      errorElement.textContent = message
    }
  }

  function showSuccess(fieldId) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "-error")

    field.classList.remove("error")
    field.classList.add("success")

    if (errorElement) {
      errorElement.textContent = ""
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message")
    const formFields = document.querySelectorAll(".form-group input, .form-group select, .form-group textarea")

    errorElements.forEach((element) => {
      element.textContent = ""
    })

    formFields.forEach((field) => {
      field.classList.remove("error", "success")
    })
  }

  function validateField(field) {
    const fieldId = field.id
    const value = field.value.trim()

    switch (fieldId) {
      case "name":
        if (!value) {
          showError(fieldId, "Name is required")
        } else if (value.length < 2) {
          showError(fieldId, "Name must be at least 2 characters")
        } else {
          showSuccess(fieldId)
        }
        break

      case "company":
        if (!value) {
          showError(fieldId, "Company is required")
        } else {
          showSuccess(fieldId)
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          showError(fieldId, "Email is required")
        } else if (!emailRegex.test(value)) {
          showError(fieldId, "Please enter a valid email")
        } else {
          showSuccess(fieldId)
        }
        break

      case "project-type":
        if (!field.value) {
          showError(fieldId, "Select a project type")
        } else {
          showSuccess(fieldId)
        }
        break

      case "description":
        if (!value) {
          showError(fieldId, "Project description is required")
        } else if (value.length < 50) {
          showError(fieldId, "Please provide more details (minimum 50 characters)")
        } else {
          showSuccess(fieldId)
        }
        break
    }
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".philosophy-card, .product-card, .capability-item, .testimonial-card, .specialty-card",
  )
  animateElements.forEach((element) => {
    observer.observe(element)
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    }
  })

  // Prevent form submission on Enter key in input fields (except textarea)
  const formInputsExceptTextarea = document.querySelectorAll("input, select")
  formInputsExceptTextarea.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault()
        const form = this.closest("form")
        if (form) {
          const nextInput = getNextInput(form, this)
          if (nextInput) {
            nextInput.focus()
          }
        }
      }
    })
  })

  function getNextInput(form, currentInput) {
    const inputs = Array.from(form.querySelectorAll("input, select, textarea"))
    const currentIndex = inputs.indexOf(currentInput)
    return inputs[currentIndex + 1] || null
  }

  // Add loading state to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.type !== "submit" && this.getAttribute("href") && this.getAttribute("href").startsWith("#")) {
        return // Skip for anchor links
      }

      if (this.type === "submit") {
        return // Form submission is handled separately
      }

      // Add subtle loading effect for other buttons
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })
})

// Utility function to debounce events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const handleScroll = debounce(() => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
}, 10)

window.addEventListener("scroll", handleScroll)
