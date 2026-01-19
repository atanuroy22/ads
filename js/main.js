document.addEventListener('DOMContentLoaded', () => {
    // Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // Word Counter Logic
    const wordInput = document.getElementById('word-input');
    if (wordInput) {
        const wordCountDisplay = document.getElementById('word-count');
        const charCountDisplay = document.getElementById('char-count');
        const paragraphCountDisplay = document.getElementById('paragraph-count');
        const readingTimeDisplay = document.getElementById('reading-time');

        wordInput.addEventListener('input', () => {
            const text = wordInput.value;
            
            // Character count
            charCountDisplay.textContent = text.length;

            // Word count
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            wordCountDisplay.textContent = words.length;

            // Paragraph count
            const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
            paragraphCountDisplay.textContent = paragraphs.length;

            // Reading time (assuming 200 words per minute)
            const minutes = Math.ceil(words.length / 200);
            readingTimeDisplay.textContent = minutes + " min";
        });
    }
});
