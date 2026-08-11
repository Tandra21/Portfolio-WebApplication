const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');
const backToTop = document.querySelector('.back-to-top');
const projectsGrid = document.getElementById('projects-grid');
const researchGrid = document.getElementById('research-grid');
const writeupsGrid = document.getElementById('writeups-grid');
const projectButtons = document.querySelectorAll('.filter-button');
const researchButtons = document.querySelectorAll('.research-filter-button');
const terminalOutput = document.querySelector('.terminal-output');
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('contact-name');
const emailInput = document.getElementById('contact-email');
const messageInput = document.getElementById('contact-message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formStatus = document.getElementById('form-status');

const projects = [
    {
        title: 'Secure Web App Lab',
        category: 'Web Security',
        description: 'Built a vulnerable web application and documented the process of finding and fixing OWASP Top 10 issues.',
        link: '#',
        tags: ['Web Security', 'OWASP']
    },
    {
        title: 'Network Scan Automation',
        category: 'Networking',
        description: 'Created an automated scanning pipeline using Nmap and Python for network discovery and service enumeration.',
        link: '#',
        tags: ['Networking', 'Python']
    },
    {
        title: 'CTF Challenge Write-up',
        category: 'Programming',
        description: 'Solved a series of Capture The Flag problems focused on binary exploitation, web hacking, and cryptography.',
        link: '#',
        tags: ['CTF', 'Write-up']
    }
];

const researchItems = [
    {
        title: 'Cross-Site Scripting Analysis',
        severity: 'Medium',
        description: 'Examined XSS exploitation techniques in a lab environment and documented remediation controls.',
        link: '#'
    },
    {
        title: 'Unauthorized File Access',
        severity: 'High',
        description: 'Identified an insecure direct object reference (IDOR) issue in a test web app and proposed a secure design.',
        link: '#'
    },
    {
        title: 'Weak Network Authentication',
        severity: 'Critical',
        description: 'Reviewed authentication flows and provided recommendations for stronger network access controls.',
        link: '#'
    }
];

const writeups = [
    {
        title: 'Web App Pentest Write-up',
        description: 'Detailed findings and remediation from a web application penetration testing exercise.',
        link: '#'
    },
    {
        title: 'TryHackMe Room Summary',
        description: 'Notes and solutions from completing a TryHackMe beginner room focused on web exploitation.',
        link: '#'
    },
    {
        title: 'PortSwigger Lab Review',
        description: 'An overview of lessons learned from PortSwigger Web Security Academy labs.',
        link: '#'
    }
];

const terminalLines = [
    '$ sudo nmap -sV 192.168.1.0/24',
    'Starting Nmap 7.80 ( https://nmap.org ) at 2026-08-11 21:00',
    'Host 192.168.1.15 appears to be up.',
    '22/tcp open ssh OpenSSH 8.6p1',
    '80/tcp open http Apache httpd 2.4.51',
    'Finished: 256 IP addresses scanned in 18.42 seconds.'
];

let terminalIndex = 0;

function updateTerminal() {
    terminalOutput.textContent = terminalLines.slice(0, terminalIndex + 1).join('\n');
    terminalIndex = (terminalIndex + 1) % terminalLines.length;
}

function renderCards(items, container, createCard) {
    container.innerHTML = items.map(createCard).join('');
}

function createProjectCard(project) {
    return `
        <article class="project-card">
            <span class="card-tag">${project.category}</span>
            <h3>${project.title}</h3>
            <p class="card-meta">${project.description}</p>
            <div class="card-actions">
                <a class="button button-secondary" href="${project.link}" target="_blank" rel="noreferrer">View details</a>
            </div>
        </article>
    `;
}

function createResearchCard(item) {
    return `
        <article class="research-card">
            <span class="card-tag">${item.severity}</span>
            <h3>${item.title}</h3>
            <p class="card-meta">${item.description}</p>
            <div class="card-actions">
                <a class="button button-secondary" href="${item.link}" target="_blank" rel="noreferrer">Read more</a>
            </div>
        </article>
    `;
}

function createWriteupCard(item) {
    return `
        <article class="writeup-card">
            <h3>${item.title}</h3>
            <p class="card-meta">${item.description}</p>
            <div class="card-actions">
                <a class="button button-secondary" href="${item.link}" target="_blank" rel="noreferrer">Open write-up</a>
            </div>
        </article>
    `;
}

function filterProjects(category) {
    const filtered = category === 'All'
        ? projects
        : projects.filter((project) => project.category === category);
    renderCards(filtered, projectsGrid, createProjectCard);
}

function filterResearch(severity) {
    const filtered = severity === 'All'
        ? researchItems
        : researchItems.filter((item) => item.severity === severity);
    renderCards(filtered, researchGrid, createResearchCard);
}

function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
}

function handleContactSubmit(event) {
    event.preventDefault();
    clearErrors();
    let valid = true;

    if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        valid = false;
    }
    if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email.';
        valid = false;
    }
    if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter a message.';
        valid = false;
    }

    if (!valid) {
        formStatus.textContent = 'Please fix the errors above before sending.';
        return;
    }

    formStatus.textContent = 'Message ready to send. Replace this with a real form handler to submit.';
    contactForm.reset();
}

function initFilters() {
    projectButtons.forEach((button) => {
        button.addEventListener('click', () => {
            projectButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        });
    });

    researchButtons.forEach((button) => {
        button.addEventListener('click', () => {
            researchButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
            filterResearch(button.dataset.filter);
        });
    });
}

function initNavigation() {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        primaryNav.classList.toggle('open');
    });
}

function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 420) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function init() {
    renderCards(projects, projectsGrid, createProjectCard);
    renderCards(researchItems, researchGrid, createResearchCard);
    renderCards(writeups, writeupsGrid, createWriteupCard);
    initFilters();
    initNavigation();
    initBackToTop();
    contactForm.addEventListener('submit', handleContactSubmit);
    updateTerminal();
    setInterval(updateTerminal, 2500);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
