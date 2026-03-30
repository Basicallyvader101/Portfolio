function openMenu() {
    document.body.classList.add("menu-open");
}

function closeMenu() {
    document.body.classList.remove("menu-open");
}

let backgroundShapes = null;
let backgroundTargetX = 0;
let backgroundTargetY = 0;
let backgroundCurrentX = 0;
let backgroundCurrentY = 0;
let backgroundLoopStarted = false;

// Edit this object to update About card content.
const ABOUT_CARD_DATA = {
    title: "About Me",
    subtitle: "Frontend Software Engineer focused on building responsive, user-first web experiences.",
    description: "I build modern interfaces with HTML, CSS, and JavaScript, with a strong focus on clean structure, accessible UX, and polished interaction design. I enjoy taking ideas from concept to production-ready UI and refining the details that make products feel intuitive and professional.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Firebase", "Responsive Design", "Accessibility", "UI Design"]
};

function getBackgroundShapes() {
    if (!backgroundShapes || backgroundShapes.length === 0) {
        backgroundShapes = document.querySelectorAll(".shape");
    }

    return backgroundShapes;
}

function moveBackground(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const centerX = (event.clientX / window.innerWidth) - 0.5;
    const centerY = (event.clientY / window.innerHeight) - 0.5;

    backgroundTargetX = centerX * 14;
    backgroundTargetY = centerY * 14;
}

function animateBackgroundShapes(timestamp) {
    const shapes = getBackgroundShapes();

    backgroundCurrentX += (backgroundTargetX - backgroundCurrentX) * 0.06;
    backgroundCurrentY += (backgroundTargetY - backgroundCurrentY) * 0.06;

    shapes.forEach((shape, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const driftSpeed = 0.00042 + (index * 0.00005);
        const majorRangeX = 34 + (index * 5);
        const majorRangeY = 28 + (index * 4);
        const minorRangeX = 14 + (index * 2);
        const minorRangeY = 10 + (index * 1.5);
        const driftX = (Math.sin((timestamp * driftSpeed) + index) * majorRangeX)
            + (Math.cos((timestamp * driftSpeed * 0.65) + (index * 1.1)) * minorRangeX);
        const driftY = (Math.cos((timestamp * driftSpeed * 1.15) + (index * 1.5)) * majorRangeY)
            + (Math.sin((timestamp * driftSpeed * 0.75) + (index * 0.9)) * minorRangeY);
        const translateX = driftX + (backgroundCurrentX * direction * 1.2);
        const translateY = driftY + (backgroundCurrentY * direction * 1.2);

        shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    window.requestAnimationFrame(animateBackgroundShapes);
}

function startBackgroundAnimation() {
    if (backgroundLoopStarted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const shapes = getBackgroundShapes();
    if (shapes.length === 0) {
        return;
    }

    backgroundLoopStarted = true;
    window.requestAnimationFrame(animateBackgroundShapes);
}

function renderAboutCard() {
    const titleEl = document.getElementById("about__title");
    const subtitleEl = document.getElementById("about__subtitle");
    const descriptionEl = document.getElementById("about__description");
    const chipsEl = document.getElementById("about__chips");

    if (!titleEl || !subtitleEl || !descriptionEl || !chipsEl) {
        return;
    }

    titleEl.textContent = ABOUT_CARD_DATA.title;
    subtitleEl.textContent = ABOUT_CARD_DATA.subtitle;
    descriptionEl.textContent = ABOUT_CARD_DATA.description;

    chipsEl.innerHTML = "";
    ABOUT_CARD_DATA.skills.forEach((skill) => {
        const chip = document.createElement("span");
        chip.textContent = skill;
        chipsEl.appendChild(chip);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    renderAboutCard();
    startBackgroundAnimation();
});

function toggleAboutCard() {
    const backdrop = document.getElementById("about__backdrop");
    backdrop.classList.toggle("about__card--open");
}

function toggleContactCard() {
    const backdrop = document.getElementById("contact__backdrop");
    backdrop.classList.toggle("contact__card--open");
}

function sendContactMessage() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const subject = `New message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoLink = `mailto:erin.hansen1125@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}