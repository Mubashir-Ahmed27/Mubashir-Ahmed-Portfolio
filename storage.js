document.addEventListener('DOMContentLoaded', () => {
    // Load projects from localStorage
    const projectsGrid = document.getElementById('projects-grid');
    const projects = getProjects();
    projectsGrid.innerHTML = projects.map((p, i) => `
                <div class="project-card glass-card reveal-up ${i > 0 ? 'delay-' + i : ''} magnetic-card">
                    <div class="project-image">
                        <div class="placeholder-img ${p.coverStyle}"></div>
                    </div>
                    <div class="project-info">
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        <div class="tags">
                            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${p.liveUrl}" class="project-link magnetic">View Project ↗</a>
                            <a href="${p.githubUrl}" class="project-link magnetic github-link">GitHub Repo</a>
                        </div>
                    </div>
                </div>
            `).join('');

    // Load articles from localStorage
    const articlesGrid = document.getElementById('articles-grid');
    const articles = getArticles();
    articlesGrid.innerHTML = articles.map((a, i) => `
                <div class="article-card glass-card reveal-up ${i > 0 ? 'delay-' + i : ''} magnetic-card">
                    <div class="article-image">
                        <div class="placeholder-img ${a.coverStyle}"></div>
                    </div>
                    <div class="article-content">
                        <span class="article-category tag">${a.category}</span>
                        <h3 class="article-title">${a.title}</h3>
                        <p>${a.summary}</p>
                        <a href="article.html?slug=${a.slug}" class="article-link magnetic">Read More ↗</a>
                    </div>
                </div>
            `).join('');

    // Resume download button
    const resumeBtn = document.getElementById('resume-download-btn');
    const resumeURL = getResumeURL();
    if (resumeURL) {
        resumeBtn.href = resumeURL;
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) return;

        submitContact({ name, email, message });
        contactForm.reset();

        // Show success feedback in terminal style
        const submitLine = contactForm.querySelector('.submit-line');
        const successLine = document.createElement('div');
        successLine.className = 'terminal-line';
        successLine.innerHTML = '<span class="terminal-prompt" style="color:#27c93f;">✓ Message sent successfully!</span>';
        submitLine.after(successLine);
        setTimeout(() => successLine.remove(), 3000);
    });

    // Re-init reveal animations for dynamically added elements
    setTimeout(() => {
        const revealElements = document.querySelectorAll('.reveal-up:not(.active)');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        revealElements.forEach(el => revealObserver.observe(el));
    }, 100);
});