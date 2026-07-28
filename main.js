document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copyBtn');
    const commandText = 'curl -fsSL https://raw.githubusercontent.com/tareqmy/gitwig/master/scripts/install.sh | sh';

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(commandText);
                
                // Show success state
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    }

    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.feature-card, .section-title');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (themeToggle && sunIcon && moonIcon) {
        // Initial icon setup based on the inline script
        if (document.body.classList.contains('light-theme')) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        });
    }

    // GitHub Stars Fetcher with localStorage Caching
    async function fetchGitHubStars() {
        const cacheKey = 'gitwig_github_stars';
        const cacheTimeKey = 'gitwig_github_stars_time';
        const CACHE_DURATION = 3600 * 1000; // 1 hour

        const updateStarUI = (count) => {
            const formatted = typeof count === 'number'
                ? (count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString())
                : count;

            const navStarCount = document.querySelector('#github-stars-nav .star-count');
            if (navStarCount) navStarCount.textContent = formatted;
        };

        const cachedCount = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);

        if (cachedCount && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION)) {
            updateStarUI(parseInt(cachedCount, 10));
            return;
        }

        try {
            const res = await fetch('https://api.github.com/repos/tareqmy/gitwig');
            if (res.ok) {
                const data = await res.json();
                if (typeof data.stargazers_count === 'number') {
                    localStorage.setItem(cacheKey, data.stargazers_count.toString());
                    localStorage.setItem(cacheTimeKey, Date.now().toString());
                    updateStarUI(data.stargazers_count);
                }
            } else if (cachedCount) {
                updateStarUI(parseInt(cachedCount, 10));
            }
        } catch (err) {
            console.warn('Could not fetch GitHub stars:', err);
            if (cachedCount) {
                updateStarUI(parseInt(cachedCount, 10));
            }
        }
    }

    fetchGitHubStars();

    // Crates.io Crate Stats Fetcher
    async function fetchCratesStats() {
        const cacheKey = 'gitwig_crates_metrics';
        const cacheTimeKey = 'gitwig_crates_metrics_time';
        const CACHE_DURATION = 3600 * 1000; // 1 hour

        const updateMetricsUI = (crateData) => {
            const totalDl = document.getElementById('stat-total-downloads');
            const recentDl = document.getElementById('stat-recent-downloads');
            const version = document.getElementById('stat-version');

            if (totalDl) totalDl.textContent = (crateData.downloads || 0).toLocaleString();
            if (recentDl) recentDl.textContent = (crateData.recent_downloads || 0).toLocaleString();
            if (version) version.textContent = `v${crateData.max_version || '0.0.0'}`;
        };

        const cachedData = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);

        if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION)) {
            try {
                const crateData = JSON.parse(cachedData);
                if (crateData) {
                    updateMetricsUI(crateData);
                    return;
                }
            } catch (e) {
                console.warn('Stale metrics cache parse error:', e);
            }
        }

        try {
            const headers = { 'User-Agent': 'gitwig-website (https://gitwig.dev)' };
            const res = await fetch('https://crates.io/api/v1/crates/gitwig', { headers });

            if (res.ok) {
                const json = await res.json();
                const crateData = json.crate;
                if (crateData) {
                    updateMetricsUI(crateData);
                    localStorage.setItem(cacheKey, JSON.stringify(crateData));
                    localStorage.setItem(cacheTimeKey, Date.now().toString());
                }
            }
        } catch (err) {
            console.warn('Could not fetch crates.io metrics:', err);
        }
    }

    fetchCratesStats();
});
