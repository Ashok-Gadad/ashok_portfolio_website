/* ============================================================
   ASHOK GADAD - ADVANCED PORTFOLIO JAVASCRIPT
   Works with the index.html + style.css provided above
============================================================ */

"use strict";


/* ============================================================
   1. DOM SELECTORS
============================================================ */

const body = document.body;

const loader = document.getElementById("loader");

const themeToggle = document.getElementById("theme-toggle");

const menuToggle = document.getElementById("menu-toggle");

const navLinksContainer =
    document.querySelector(".nav-links");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const scrollTopButton =
    document.getElementById("scroll-top");

const typingElement =
    document.getElementById("typing-text");

const contactForm =
    document.getElementById("contact-form");

const currentYear =
    document.getElementById("current-year");

const progressBars =
    document.querySelectorAll(".progress");

const projectCards =
    document.querySelectorAll(".project-card");

const statNumbers =
    document.querySelectorAll(".stat h4");


/* ============================================================
   2. GLOBAL STATE
============================================================ */

const state = {

    currentTheme:
        localStorage.getItem("portfolio-theme") ||
        "dark",

    menuOpen: false,

    isLoaded: false,

    typingIndex: 0,

    typingCharIndex: 0,

    deleting: false,

    lastScrollPosition: 0,

    animationStarted: false

};


/* ============================================================
   3. UTILITY FUNCTIONS
============================================================ */

/**
 * Safely select an element.
 */
function $(selector) {
    return document.querySelector(selector);
}


/**
 * Safely select multiple elements.
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}


/**
 * Debounce function
 */
function debounce(func, delay = 200) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(
            () => func.apply(this, args),
            delay
        );
    };
}


/**
 * Clamp number between min and max.
 */
function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );
}


/* ============================================================
   4. PAGE LOADER
============================================================ */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {

            loader.classList.add("hidden");

        }

        state.isLoaded = true;

        document.body.classList.add("page-loaded");

    }, 700);

});


/* ============================================================
   5. CURRENT YEAR
============================================================ */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ============================================================
   6. DARK / LIGHT MODE
============================================================ */

function applyTheme(theme) {

    if (theme === "light") {

        body.classList.add("light-mode");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fas fa-sun"></i>';

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }

    } else {

        body.classList.remove("light-mode");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fas fa-moon"></i>';

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    }

    state.currentTheme = theme;

    localStorage.setItem(
        "portfolio-theme",
        theme
    );
}


/**
 * Apply saved theme immediately.
 */
applyTheme(state.currentTheme);


/**
 * Theme button.
 */
if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const newTheme =
                body.classList.contains(
                    "light-mode"
                )
                    ? "dark"
                    : "light";

            applyTheme(newTheme);

        }
    );
}


/* ============================================================
   7. MOBILE NAVIGATION
============================================================ */

function toggleMobileMenu(force = null) {

    if (!navLinksContainer || !menuToggle) {
        return;
    }

    const shouldOpen =
        force !== null
            ? force
            : !state.menuOpen;

    state.menuOpen = shouldOpen;

    navLinksContainer.classList.toggle(
        "open",
        shouldOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(shouldOpen)
    );

    menuToggle.innerHTML =
        shouldOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';
}


/**
 * Mobile menu button.
 */
if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            toggleMobileMenu();

        }
    );
}


/**
 * Close menu when link clicked.
 */
navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            toggleMobileMenu(false);

        }
    );

});


/**
 * Close menu when clicking outside.
 */
document.addEventListener(
    "click",
    (event) => {

        if (
            !state.menuOpen ||
            !navLinksContainer ||
            !menuToggle
        ) {
            return;
        }

        const clickedInsideMenu =
            navLinksContainer.contains(
                event.target
            );

        const clickedMenuButton =
            menuToggle.contains(
                event.target
            );

        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            toggleMobileMenu(false);

        }

    }
);


/* ============================================================
   8. TYPING ANIMATION
============================================================ */

const typingWords = [

    "CSE Student",

    "Java Developer",

    "Python Programmer",

    "Web Developer",

    "DSA Enthusiast",

    "Problem Solver"

];


function typeEffect() {

    if (!typingElement) {
        return;
    }

    const currentWord =
        typingWords[
            state.typingIndex
        ];

    if (!state.deleting) {

        state.typingCharIndex++;

        typingElement.textContent =
            currentWord.substring(
                0,
                state.typingCharIndex
            );

        if (
            state.typingCharIndex >=
            currentWord.length
        ) {

            state.deleting = true;

            setTimeout(
                typeEffect,
                1400
            );

            return;
        }

    } else {

        state.typingCharIndex--;

        typingElement.textContent =
            currentWord.substring(
                0,
                state.typingCharIndex
            );

        if (
            state.typingCharIndex <= 0
        ) {

            state.deleting = false;

            state.typingIndex =
                (
                    state.typingIndex + 1
                ) %
                typingWords.length;
        }
    }

    const speed =
        state.deleting
            ? 45
            : 90;

    setTimeout(
        typeEffect,
        speed
    );
}


/**
 * Start typing animation.
 */
if (typingElement) {

    setTimeout(
        typeEffect,
        1000
    );

}


/* ============================================================
   9. HEADER SCROLL EFFECT
============================================================ */

function updateHeader() {

    const header =
        document.querySelector(
            ".header"
        );

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );
    }
}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* ============================================================
   10. ACTIVE NAVIGATION
============================================================ */

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

        const href =
            link.getAttribute("href");

        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );
        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* ============================================================
   11. SCROLL PROGRESS BAR
============================================================ */

function createScrollProgress() {

    const progress =
        document.createElement("div");

    progress.id =
        "scroll-progress";

    progress.style.position =
        "fixed";

    progress.style.top =
        "0";

    progress.style.left =
        "0";

    progress.style.height =
        "3px";

    progress.style.width =
        "0%";

    progress.style.zIndex =
        "99999";

    progress.style.background =
        "linear-gradient(90deg,#6366f1,#06b6d4,#8b5cf6)";

    progress.style.transition =
        "width 0.1s linear";

    document.body.appendChild(
        progress
    );

    return progress;
}


const scrollProgress =
    createScrollProgress();


function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${percentage}%`;
}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


/* ============================================================
   12. SCROLL TO TOP
============================================================ */

function updateScrollTopButton() {

    if (!scrollTopButton) {
        return;
    }

    if (window.scrollY > 500) {

        scrollTopButton.classList.add(
            "show"
        );

    } else {

        scrollTopButton.classList.remove(
            "show"
        );
    }
}


window.addEventListener(
    "scroll",
    updateScrollTopButton,
    { passive: true }
);


if (scrollTopButton) {

    scrollTopButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ============================================================
   13. INTERSECTION OBSERVER
============================================================ */

const observerOptions = {

    threshold: 0.15,

    rootMargin:
        "0px 0px -50px 0px"
};


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }

                entry.target.classList.add(
                    "revealed"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        observerOptions
    );


/**
 * Add reveal animation to sections.
 */
const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-image, " +
        ".about-content, " +
        ".skill-category, " +
        ".project-card, " +
        ".timeline-item, " +
        ".achievement-card, " +
        ".coding-card, " +
        ".contact-info, " +
        ".contact-form-wrapper"
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        revealObserver.observe(
            element
        );

    }
);


/* ============================================================
   14. REVEAL CSS CLASS
============================================================ */

const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .header.scrolled {
        box-shadow:
            0 10px 40px rgba(0,0,0,0.15);
    }

`;

document.head.appendChild(
    revealStyle
);


/* ============================================================
   15. SKILL BAR ANIMATION
============================================================ */

const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }

                const progress =
                    entry.target;

                const target =
                    progress.dataset.progress ||
                    "0";

                progress.style.width =
                    `${clamp(
                        Number(target),
                        0,
                        100
                    )}%`;

                skillObserver.unobserve(
                    progress
                );

            });

        },
        {
            threshold: 0.5
        }
    );


progressBars.forEach(
    progress => {

        skillObserver.observe(
            progress
        );

    }
);


/* ============================================================
   16. NUMBER COUNTER ANIMATION
============================================================ */

function animateNumber(
    element,
    target,
    duration = 1500
) {

    const startTime =
        performance.now();

    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 -
            Math.pow(
                1 - progress,
                4
            );

        const current =
            Math.floor(
                eased * target
            );

        element.textContent =
            `${current}+`;

        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                `${target}+`;
        }
    }

    requestAnimationFrame(
        update
    );
}


/**
 * Parse numbers like:
 *
 * 10+
 * 100+
 * 3+
 */
function parseStatNumber(text) {

    const match =
        text.match(
            /(\d+)/
        );

    return match
        ? Number(match[1])
        : 0;
}


const statObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }

                const element =
                    entry.target;

                const original =
                    element.textContent.trim();

                const number =
                    parseStatNumber(
                        original
                    );

                if (number > 0) {

                    animateNumber(
                        element,
                        number
                    );
                }

                statObserver.unobserve(
                    element
                );

            });

        },
        {
            threshold: 0.8
        }
    );


statNumbers.forEach(
    number => {

        statObserver.observe(
            number
        );

    }
);


/* ============================================================
   17. PROJECT CARD TILT EFFECT
============================================================ */

projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 900
            ) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (
                    (y - centerY) /
                    centerY
                ) * -3;

            const rotateY =
                (
                    (x - centerX) /
                    centerX
                ) * 3;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* ============================================================
   18. MAGNETIC BUTTON EFFECT
============================================================ */

const magneticButtons =
    document.querySelectorAll(
        ".btn, .social-links a"
    );


magneticButtons.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 900
            ) {
                return;
            }

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(
                    ${x * 0.08}px,
                    ${y * 0.08}px
                )`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "";

        }
    );

});


/* ============================================================
   19. SMOOTH ANCHOR SCROLLING
============================================================ */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );

        if (!link) {
            return;
        }

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(
                targetId
            );

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            document.querySelector(
                ".header"
            )?.offsetHeight || 0;

        const targetPosition =
            target.getBoundingClientRect()
                .top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top:
                targetPosition,

            behavior:
                "smooth"

        });

    }
);


/* ============================================================
   20. CONTACT FORM VALIDATION
============================================================ */

function showFormMessage(
    message,
    type = "success"
) {

    let messageElement =
        document.getElementById(
            "form-message"
        );

    if (!messageElement) {

        messageElement =
            document.createElement(
                "div"
            );

        messageElement.id =
            "form-message";

        messageElement.style.marginTop =
            "15px";

        messageElement.style.padding =
            "12px 15px";

        messageElement.style.borderRadius =
            "10px";

        messageElement.style.fontSize =
            "13px";

        contactForm?.appendChild(
            messageElement
        );
    }

    messageElement.textContent =
        message;

    if (type === "success") {

        messageElement.style.background =
            "rgba(34,197,94,0.1)";

        messageElement.style.color =
            "#4ade80";

    } else {

        messageElement.style.background =
            "rgba(239,68,68,0.1)";

        messageElement.style.color =
            "#f87171";
    }
}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    ?.value.trim();

            const email =
                document
                    .getElementById("email")
                    ?.value.trim();

            const subject =
                document
                    .getElementById("subject")
                    ?.value.trim();

            const message =
                document
                    .getElementById("message")
                    ?.value.trim();


            if (!name) {

                showFormMessage(
                    "Please enter your name.",
                    "error"
                );

                return;
            }


            if (!validateEmail(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            if (!subject) {

                showFormMessage(
                    "Please enter a subject.",
                    "error"
                );

                return;
            }


            if (message.length < 10) {

                showFormMessage(
                    "Message should contain at least 10 characters.",
                    "error"
                );

                return;
            }


            showFormMessage(
                "Message validated successfully! Connect this form to a backend or email service to receive messages.",
                "success"
            );


            contactForm.reset();

        }
    );

}


/* ============================================================
   21. KEYBOARD SHORTCUTS
============================================================ */

document.addEventListener(
    "keydown",
    event => {

        /**
         * Press "/" to focus contact form
         */
        if (
            event.key === "/" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            event.preventDefault();

            const nameInput =
                document.getElementById(
                    "name"
                );

            if (nameInput) {

                document
                    .getElementById(
                        "contact"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

                setTimeout(
                    () => nameInput.focus(),
                    500
                );
            }
        }


        /**
         * Press Escape to close menu
         */
        if (
            event.key === "Escape"
        ) {

            toggleMobileMenu(false);

        }


        /**
         * Press T to go top
         */
        if (
            event.key.toLowerCase() ===
                "t" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    }
);


/* ============================================================
   22. IMAGE LAZY LOADING
============================================================ */

const images =
    document.querySelectorAll(
        "img"
    );


images.forEach(
    image => {

        image.loading =
            "lazy";

        image.addEventListener(
            "error",
            () => {

                image.style.opacity =
                    "0.5";

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    }
);


/* ============================================================
   23. PROJECT IMAGE FALLBACK
============================================================ */

images.forEach(image => {

    image.addEventListener(
        "error",
        function () {

            if (
                this.dataset.fallbackApplied
            ) {
                return;
            }

            this.dataset.fallbackApplied =
                "true";

            this.src =
                "data:image/svg+xml," +
                encodeURIComponent(`
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="800"
                        height="500"
                        viewBox="0 0 800 500">

                        <rect
                            width="800"
                            height="500"
                            fill="#0f172a"/>

                        <text
                            x="400"
                            y="250"
                            text-anchor="middle"
                            fill="#818cf8"
                            font-size="32"
                            font-family="Arial">

                            Project Image

                        </text>

                    </svg>
                `);

        }
    );

});


/* ============================================================
   24. PARALLAX EFFECT
============================================================ */

const heroProfile =
    document.querySelector(
        ".hero-profile"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            !heroProfile ||
            window.innerWidth < 900
        ) {
            return;
        }

        const scroll =
            window.scrollY;

        const movement =
            clamp(
                scroll * 0.08,
                0,
                50
            );

        heroProfile.style.transform =
            `translateY(${movement}px)`;

    },
    { passive: true }
);


/* ============================================================
   25. CURSOR GLOW
============================================================ */

const cursorGlow =
    document.createElement(
        "div"
    );

cursorGlow.id =
    "cursor-glow";

cursorGlow.style.position =
    "fixed";

cursorGlow.style.width =
    "250px";

cursorGlow.style.height =
    "250px";

cursorGlow.style.borderRadius =
    "50%";

cursorGlow.style.pointerEvents =
    "none";

cursorGlow.style.zIndex =
    "-1";

cursorGlow.style.background =
    "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)";

cursorGlow.style.transform =
    "translate(-50%, -50%)";

cursorGlow.style.transition =
    "opacity 0.3s ease";

cursorGlow.style.opacity =
    "0";

document.body.appendChild(
    cursorGlow
);


document.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 900
        ) {
            return;
        }

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

        cursorGlow.style.opacity =
            "1";

    }
);


/* ============================================================
   26. HOVER SOUND-LIKE MICRO INTERACTION
   ============================================================ */

const interactiveElements =
    document.querySelectorAll(
        "a, button, .project-card, .skill-category, .achievement-card"
    );


interactiveElements.forEach(
    element => {

        element.addEventListener(
            "mouseenter",
            () => {

                element.classList.add(
                    "interactive-hover"
                );

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                element.classList.remove(
                    "interactive-hover"
                );

            }
        );

    }
);


/* ============================================================
   27. DETECT ONLINE / OFFLINE STATUS
============================================================ */

function showConnectionStatus(
    online
) {

    let status =
        document.getElementById(
            "connection-status"
        );

    if (!status) {

        status =
            document.createElement(
                "div"
            );

        status.id =
            "connection-status";

        status.style.position =
            "fixed";

        status.style.bottom =
            "20px";

        status.style.left =
            "20px";

        status.style.zIndex =
            "9999";

        status.style.padding =
            "10px 15px";

        status.style.borderRadius =
            "10px";

        status.style.fontSize =
            "12px";

        status.style.fontWeight =
            "600";

        status.style.backdropFilter =
            "blur(10px)";

        document.body.appendChild(
            status
        );
    }


    if (online) {

        status.textContent =
            "● Back online";

        status.style.background =
            "rgba(34,197,94,0.15)";

        status.style.color =
            "#4ade80";

    } else {

        status.textContent =
            "● You are offline";

        status.style.background =
            "rgba(239,68,68,0.15)";

        status.style.color =
            "#f87171";
    }


    setTimeout(
        () => {

            status.style.opacity =
                "0";

        },
        2500
    );
}


window.addEventListener(
    "online",
    () => showConnectionStatus(true)
);

window.addEventListener(
    "offline",
    () => showConnectionStatus(false)
);


/* ============================================================
   28. PERFORMANCE OPTIMIZATION
============================================================ */

const optimizedScrollHandler =
    debounce(
        () => {

            updateHeader();

            updateActiveNavigation();

            updateScrollTopButton();

        },
        20
    );


window.addEventListener(
    "scroll",
    optimizedScrollHandler,
    {
        passive: true
    }
);


/* ============================================================
   29. RESIZE HANDLER
============================================================ */

window.addEventListener(
    "resize",
    debounce(
        () => {

            if (
                window.innerWidth > 768 &&
                state.menuOpen
            ) {

                toggleMobileMenu(false);

            }

        },
        200
    )
);


/* ============================================================
   30. INITIALIZE EVERYTHING
============================================================ */

function initializePortfolio() {

    updateHeader();

    updateActiveNavigation();

    updateScrollTopButton();

    updateScrollProgress();

    console.log(
        "%c🚀 Ashok Gadad Portfolio",
        "font-size:20px;font-weight:bold;color:#6366f1;"
    );

    console.log(
        "%cPortfolio initialized successfully.",
        "color:#06b6d4;font-size:14px;"
    );

}


initializePortfolio();


/* ============================================================
   31. EASTER EGG
============================================================ */

let secretCode = [];

const secretSequence = [
    "a",
    "s",
    "h",
    "o",
    "k"
];


document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();

        secretCode.push(key);

        if (
            secretCode.length >
            secretSequence.length
        ) {

            secretCode.shift();

        }

        if (
            secretCode.join("") ===
            secretSequence.join("")
        ) {

            document.body.classList.add(
                "secret-mode"
            );

            console.log(
                "🔥 You found the secret mode!"
            );

            setTimeout(
                () => {

                    document.body.classList.remove(
                        "secret-mode"
                    );

                },
                5000
            );

            secretCode = [];

        }

    }
);


/* ============================================================
   END OF SCRIPT
============================================================ */