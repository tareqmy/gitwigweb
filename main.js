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

    // Documentation Auto-scroll to Next/Prev Page
    const docsContainer = document.querySelector('.docs-container');
    if (docsContainer) {
        let isNavigating = false;
        
        const indicator = document.createElement('div');
        indicator.style.position = 'fixed';
        indicator.style.left = '50%';
        indicator.style.transform = 'translateX(-50%)';
        indicator.style.padding = '0.5rem 1.5rem';
        indicator.style.background = 'var(--color-accent)';
        indicator.style.color = '#000';
        indicator.style.borderRadius = '20px';
        indicator.style.fontWeight = '600';
        indicator.style.fontSize = '0.9rem';
        indicator.style.opacity = '0';
        indicator.style.transition = 'all 0.3s ease';
        indicator.style.zIndex = '1000';
        indicator.style.pointerEvents = 'none';
        indicator.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        document.body.appendChild(indicator);

        function triggerNavigation(direction) {
            if (isNavigating) return;
            
            const activeLink = document.querySelector('.sidebar-nav a.active');
            if (!activeLink) return;
            
            const links = Array.from(document.querySelectorAll('.sidebar-nav a:not(.nav-group-title)'));
            const currentIndex = links.indexOf(activeLink);
            
            let targetLink = null;
            if (direction === 'next' && currentIndex < links.length - 1) {
                targetLink = links[currentIndex + 1];
                indicator.innerText = 'Loading next page...';
                indicator.style.bottom = '20px';
                indicator.style.top = 'auto';
            } else if (direction === 'prev' && currentIndex > 0) {
                targetLink = links[currentIndex - 1];
                indicator.innerText = 'Loading previous page...';
                indicator.style.top = '20px';
                indicator.style.bottom = 'auto';
            }
            
            if (targetLink) {
                isNavigating = true;
                indicator.style.opacity = '1';
                
                // Fade out animation
                setTimeout(() => {
                    document.body.style.transition = 'opacity 0.4s ease';
                    document.body.style.opacity = '0';
                    
                    setTimeout(() => {
                        window.location.href = targetLink.href;
                    }, 400);
                }, 500); // Small pause so they see the indicator
            }
        }

        // Desktop wheel handling
        window.addEventListener('wheel', (e) => {
            if (isNavigating) return;
            const isAtTop = window.scrollY <= 0;
            const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2;
            
            if (isAtTop && e.deltaY < -20) {
                triggerNavigation('prev');
            } else if (isAtBottom && e.deltaY > 20) {
                triggerNavigation('next');
            }
        }, { passive: true });

        // Mobile touch handling
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchend', (e) => {
            if (isNavigating) return;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY; // positive means swipe up (scrolling down)
            
            const isAtTop = window.scrollY <= 0;
            const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2;
            
            // Require a significant swipe to trigger
            if (isAtTop && deltaY < -40) {
                triggerNavigation('prev');
            } else if (isAtBottom && deltaY > 40) {
                triggerNavigation('next');
            }
        }, { passive: true });
    }
});
