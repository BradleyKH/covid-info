function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("active");
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const content = section.querySelector(".section-content");
    const icon = section.querySelector(".section-title .question-icon");
    const sectionTitle = section.querySelector(".section-title");

    content.classList.toggle("active");
    icon.textContent = content.classList.contains("active") ? "−" : "+";
    sectionTitle.setAttribute("aria-expanded", content.classList.contains("active"));
}

function toggleQuestion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector(".question-icon");
    const isActive = content.classList.contains("active");

    // Close ALL questions across the entire document
    // const allQuestions = document.querySelectorAll(".question-content");
    // const allIcons = document.querySelectorAll(".question-icon");
    // const allHeaders = document.querySelectorAll(".question-header");

    // allQuestions.forEach((q) => q.classList.remove("active"));
    // allIcons.forEach((i) => (i.textContent = "+"));
    // allHeaders.forEach((h) => h.setAttribute("aria-expanded", "false"));

    // Toggle current question
    if (!isActive) {
        content.classList.add("active");
        icon.textContent = "−";
        header.setAttribute("aria-expanded", "true");

        // Scroll to keep the question header visible with offset for sticky nav
        // const navHeight = document.querySelector('.nav-container').offsetHeight;
        // const offset = navHeight + 20; // Add 20px extra spacing

        // Use setTimeout to ensure all content changes and transitions complete
        // setTimeout(() => {
        //     const headerRect = header.getBoundingClientRect();
        //     const isHeaderVisible = headerRect.top >= navHeight + 20 && headerRect.bottom <= window.innerHeight;

        //     // Only scroll if the header is not visible or would be hidden behind sticky nav
        //     if (!isHeaderVisible || headerRect.top < navHeight + 20) {
        //         const headerPosition = header.offsetTop - offset;
        //         window.scrollTo({
        //             top: headerPosition,
        //             behavior: "smooth"
        //         });
        //     }
        // }, 350);
    } else {
        content.classList.remove("active");
        icon.textContent = "+";
        header.setAttribute("aria-expanded", "false");
    }
}

function handleKeyPress(event, action) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
    }
}

// Smooth scrolling for navigation links with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            // Get the height of the sticky navigation
            const navHeight = document.querySelector(".nav-container").offsetHeight;
            const offset = navHeight + 50; // Add 20px extra spacing

            // Calculate the target position with offset
            const targetPosition = target.offsetTop - offset;

            // Smooth scroll to the calculated position
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            // Close mobile menu if open
            document.getElementById("mobileMenu").classList.remove("active");
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
    const mobileMenu = document.getElementById("mobileMenu");
    const hamburger = document.querySelector(".hamburger");
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove("active");
    }
});

// Add accessibility attributes to all interactive elements
document.addEventListener("DOMContentLoaded", function () {
    // Add attributes to section titles
    document.querySelectorAll(".section-title").forEach((title, index) => {
        if (!title.hasAttribute("tabindex")) {
            title.setAttribute("tabindex", "0");
            title.setAttribute("role", "button");
            title.setAttribute("aria-expanded", "true");
            title.setAttribute("aria-controls", title.parentElement.id + "-content");
            title.addEventListener("keydown", function (e) {
                handleKeyPress(e, () => toggleSection(title.parentElement.id));
            });
        }
    });

    // Add attributes to question headers
    document.querySelectorAll(".question-header").forEach((header, index) => {
        if (!header.hasAttribute("tabindex")) {
            header.setAttribute("tabindex", "0");
            header.setAttribute("role", "button");
            header.setAttribute("aria-expanded", "false");
            header.setAttribute("aria-controls", "question-" + index);
            header.addEventListener("keydown", function (e) {
                handleKeyPress(e, () => toggleQuestion(header));
            });
        }
    });
});
