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
});
