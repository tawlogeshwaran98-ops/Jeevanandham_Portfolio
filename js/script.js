const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const currentYear = document.getElementById("currentYear");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const cursorGlow = document.getElementById("cursorGlow");

currentYear.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.classList.toggle("active");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  backToTop.classList.toggle("show", window.scrollY > 500);

  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 160;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.13 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const skillsSection = document.getElementById("skills");

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skill-track span").forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);

skillObserver.observe(skillsSection);

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill in all required fields.";
    formStatus.style.color = "#d83b20";
    return;
  }

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message
  ].join("\n");

  const mailtoLink =
    `mailto:jeevananadhamsekar@gmail.com?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  formStatus.textContent = "Opening your email app...";
  formStatus.style.color = "#1f8b55";

  window.location.href = mailtoLink;

  setTimeout(() => {
    contactForm.reset();
    formStatus.textContent =
      "Your email application should now be open. Please review and send the message.";
  }, 700);
});

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}
