document.addEventListener('DOMContentLoaded', () => {
    const encodeBase64 = (text) => {
        const utf8Bytes = new TextEncoder().encode(text);
        let binary = '';

        utf8Bytes.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });

        return btoa(binary);
    };

    const copyTextToClipboard = async (text) => {
        if (!text) {
            return false;
        }

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        tempInput.setAttribute('readonly', 'true');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();

        const copied = document.execCommand('copy');
        document.body.removeChild(tempInput);
        return copied;
    };

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

    // Base64 Encoder Logic
    const base64Input = document.getElementById('base64-input');
    const base64Output = document.getElementById('base64-output');
    const doubleBase64Output = document.getElementById('double-base64-output');
    const encodeBtn = document.getElementById('encode-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBase64Btn = document.getElementById('copy-base64-btn');
    const copyDoubleBtn = document.getElementById('copy-double-btn');
    const encodeStatus = document.getElementById('encode-status');

    const updateEncodeStatus = (message, isError = false) => {
        if (!encodeStatus) {
            return;
        }

        encodeStatus.textContent = message;
        encodeStatus.classList.toggle('error', isError);
    };

    const runEncoding = () => {
        if (!base64Input || !base64Output || !doubleBase64Output) {
            return;
        }

        const inputValue = base64Input.value;

        if (inputValue.length === 0) {
            base64Output.value = '';
            doubleBase64Output.value = '';
            updateEncodeStatus('Enter text to generate Base64 output.', true);
            return;
        }

        const firstEncode = encodeBase64(inputValue);
        const secondEncode = encodeBase64(firstEncode);

        base64Output.value = firstEncode;
        doubleBase64Output.value = secondEncode;
        updateEncodeStatus('Both outputs are ready to copy.');
    };

    if (encodeBtn && base64Input) {
        encodeBtn.addEventListener('click', runEncoding);
        base64Input.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'Enter') {
                runEncoding();
            }
        });
    }

    if (clearBtn && base64Input && base64Output && doubleBase64Output) {
        clearBtn.addEventListener('click', () => {
            base64Input.value = '';
            base64Output.value = '';
            doubleBase64Output.value = '';
            updateEncodeStatus('');
            base64Input.focus();
        });
    }

    const wireCopyButton = (button, outputField, successMessage) => {
        if (!button || !outputField) {
            return;
        }

        button.addEventListener('click', async () => {
            try {
                const copied = await copyTextToClipboard(outputField.value);
                updateEncodeStatus(copied ? successMessage : 'Nothing to copy yet.', !copied);
            } catch (error) {
                updateEncodeStatus('Copy failed. Please copy the text manually.', true);
            }
        });
    };

    wireCopyButton(copyBase64Btn, base64Output, 'Base64 output copied to clipboard.');
    wireCopyButton(copyDoubleBtn, doubleBase64Output, 'Double encoded output copied to clipboard.');

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
