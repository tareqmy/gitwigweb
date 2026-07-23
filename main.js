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

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (themeToggle && sunIcon && moonIcon) {
        // Check saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
            document.body.classList.add('light-theme');
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

    // Documentation Auto-scroll to Next Page
    const docsContainer = document.querySelector('.docs-container');
    if (docsContainer) {
        let isNavigating = false;
        
        window.addEventListener('scroll', () => {
            if (isNavigating) return;
            
            // Trigger when hitting the very bottom (allowing a 2px margin for subpixel rendering)
            if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
                const activeLink = document.querySelector('.sidebar-nav a.active');
                if (activeLink) {
                    const links = Array.from(document.querySelectorAll('.sidebar-nav a:not(.nav-group-title)'));
                    const currentIndex = links.indexOf(activeLink);
                    
                    if (currentIndex !== -1 && currentIndex < links.length - 1) {
                        const nextLink = links[currentIndex + 1];
                        isNavigating = true;
                        window.location.href = nextLink.href;
                    }
                }
            }
        });
    }
});
