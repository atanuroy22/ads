document.addEventListener('DOMContentLoaded', () => {
    // ==================== HEADER SCROLL ====================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });

    // ==================== HAMBURGER MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ==================== FLOATING PARTICLES ====================
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        const colors = ['#6c63ff', '#00d4ff', '#8b83ff', '#4f46e5'];
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particlesContainer.appendChild(particle);
        }
    }

    // ==================== COUNTER ANIMATION ====================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 1200;
                    const start = performance.now();
                    const animate = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(target * eased);
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // ==================== BASE64 ENCODER ====================
    const encodeBase64 = (text) => {
        const utf8Bytes = new TextEncoder().encode(text);
        let binary = '';
        utf8Bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
        return btoa(binary);
    };

    const copyTextToClipboard = async (text) => {
        if (!text) return false;
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

    // Cookie Consent
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => { if (cookieBanner) cookieBanner.classList.add('show'); }, 1200);
    }
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // Base64 Encoder
    const base64Input = document.getElementById('base64-input');
    const base64Output = document.getElementById('base64-output');
    const doubleBase64Output = document.getElementById('double-base64-output');
    const encodeBtn = document.getElementById('encode-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBase64Btn = document.getElementById('copy-base64-btn');
    const copyDoubleBtn = document.getElementById('copy-double-btn');
    const encodeStatus = document.getElementById('encode-status');

    const updateEncodeStatus = (message, isError = false) => {
        if (!encodeStatus) return;
        encodeStatus.textContent = message;
        encodeStatus.classList.toggle('error', isError);
    };

    const runEncoding = () => {
        if (!base64Input || !base64Output || !doubleBase64Output) return;
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
        base64Input.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') runEncoding();
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
        if (!button || !outputField) return;
        button.addEventListener('click', async () => {
            try {
                const copied = await copyTextToClipboard(outputField.value);
                updateEncodeStatus(copied ? successMessage : 'Nothing to copy yet.', !copied);
            } catch (error) {
                updateEncodeStatus('Copy failed. Please copy manually.', true);
            }
        });
    };

    wireCopyButton(copyBase64Btn, base64Output, 'Base64 output copied to clipboard.');
    wireCopyButton(copyDoubleBtn, doubleBase64Output, 'Double encoded output copied to clipboard.');

    // Word Counter
    const wordInput = document.getElementById('word-input');
    if (wordInput) {
        const wordCountDisplay = document.getElementById('word-count');
        const charCountDisplay = document.getElementById('char-count');
        const paragraphCountDisplay = document.getElementById('paragraph-count');
        const readingTimeDisplay = document.getElementById('reading-time');

        wordInput.addEventListener('input', () => {
            const text = wordInput.value;
            charCountDisplay.textContent = text.length;
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            wordCountDisplay.textContent = words.length;
            const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
            paragraphCountDisplay.textContent = paragraphs.length;
            const minutes = Math.ceil(words.length / 200);
            readingTimeDisplay.textContent = minutes + ' min';
        });
    }

    // Password Generator
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        const pwdResult = document.getElementById('password-result');
        const pwdLengthInput = document.getElementById('pwd-length');
        const lengthVal = document.getElementById('length-val');
        const incUpper = document.getElementById('inc-uppercase');
        const incLower = document.getElementById('inc-lowercase');
        const incNumbers = document.getElementById('inc-numbers');
        const incSymbols = document.getElementById('inc-symbols');
        const copyPwdBtn = document.getElementById('copy-pwd-btn');

        pwdLengthInput.addEventListener('input', () => {
            lengthVal.textContent = pwdLengthInput.value;
        });

        const generatePassword = () => {
            const length = parseInt(pwdLengthInput.value);
            let charset = '';
            let newPassword = '';
            if (incUpper.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (incLower.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (incNumbers.checked) charset += '0123456789';
            if (incSymbols.checked) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
            if (charset === '') {
                pwdResult.textContent = 'Select at least one character type!';
                pwdResult.style.color = '#f87171';
                return;
            }
            for (let i = 0, n = charset.length; i < length; ++i) {
                newPassword += charset.charAt(Math.floor(Math.random() * n));
            }
            pwdResult.textContent = newPassword;
            pwdResult.style.color = '';
        };

        generateBtn.addEventListener('click', generatePassword);

        if (copyPwdBtn) {
            copyPwdBtn.addEventListener('click', async () => {
                const text = pwdResult.textContent;
                if (text && text !== 'Click Generate' && text !== 'Select at least one character type!') {
                    const copied = await copyTextToClipboard(text);
                    if (copied) {
                        const originalText = copyPwdBtn.textContent;
                        copyPwdBtn.textContent = 'Copied!';
                        setTimeout(() => { copyPwdBtn.textContent = originalText; }, 2000);
                    }
                }
            });
        }
    }

    // JSON Formatter
    const formatJsonBtn = document.getElementById('format-json-btn');
    if (formatJsonBtn) {
        const jsonInput = document.getElementById('json-input');
        const minifyJsonBtn = document.getElementById('minify-json-btn');
        const copyJsonBtn = document.getElementById('copy-json-btn');
        const jsonError = document.getElementById('json-error');

        const processJson = (action) => {
            try {
                if (!jsonInput.value.trim()) return;
                const parsed = JSON.parse(jsonInput.value);
                jsonError.style.display = 'none';
                if (action === 'format') {
                    jsonInput.value = JSON.stringify(parsed, null, 4);
                } else if (action === 'minify') {
                    jsonInput.value = JSON.stringify(parsed);
                }
            } catch (e) {
                jsonError.textContent = 'Invalid JSON: ' + e.message;
                jsonError.style.display = 'block';
            }
        };

        formatJsonBtn.addEventListener('click', () => processJson('format'));
        minifyJsonBtn.addEventListener('click', () => processJson('minify'));

        if (copyJsonBtn) {
            copyJsonBtn.addEventListener('click', async () => {
                if (jsonInput.value) {
                    const copied = await copyTextToClipboard(jsonInput.value);
                    if (copied) {
                        const originalText = copyJsonBtn.textContent;
                        copyJsonBtn.textContent = 'Copied!';
                        setTimeout(() => { copyJsonBtn.textContent = originalText; }, 2000);
                    }
                }
            });
        }
    }

    // ==================== URL ENCODER ====================
    const urlEncodeBtn = document.getElementById('url-encode-btn');
    if (urlEncodeBtn) {
        const urlInput = document.getElementById('url-input');
        const urlOutput = document.getElementById('url-output');
        const urlDecodeBtn = document.getElementById('url-decode-btn');
        const urlClearBtn = document.getElementById('url-clear-btn');
        const copyUrlBtn = document.getElementById('copy-url-btn');
        const urlStatus = document.getElementById('url-status');

        urlEncodeBtn.addEventListener('click', () => {
            try {
                urlOutput.value = encodeURIComponent(urlInput.value);
                if (urlStatus) { urlStatus.textContent = 'Text has been URL encoded.'; urlStatus.classList.remove('error'); }
            } catch (e) {
                if (urlStatus) { urlStatus.textContent = 'Encoding failed.'; urlStatus.classList.add('error'); }
            }
        });

        urlDecodeBtn.addEventListener('click', () => {
            try {
                urlOutput.value = decodeURIComponent(urlInput.value);
                if (urlStatus) { urlStatus.textContent = 'Text has been URL decoded.'; urlStatus.classList.remove('error'); }
            } catch (e) {
                if (urlStatus) { urlStatus.textContent = 'Invalid encoded string.'; urlStatus.classList.add('error'); }
            }
        });

        if (urlClearBtn) urlClearBtn.addEventListener('click', () => {
            urlInput.value = ''; urlOutput.value = ''; if (urlStatus) urlStatus.textContent = '';
            urlInput.focus();
        });
        if (copyUrlBtn) copyUrlBtn.addEventListener('click', async () => {
            if (urlOutput.value) {
                const ok = await copyTextToClipboard(urlOutput.value);
                if (urlStatus) { urlStatus.textContent = ok ? 'Result copied!' : 'Copy failed.'; urlStatus.classList.toggle('error', !ok); }
            }
        });
    }

    // ==================== CASE CONVERTER ====================
    const caseInput = document.getElementById('case-input');
    if (caseInput) {
        const conversions = {
            upper: (t) => t.toUpperCase(),
            lower: (t) => t.toLowerCase(),
            title: (t) => t.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
            camel: (t) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
            snake: (t) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''),
            kebab: (t) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        };

        const updateCases = () => {
            const text = caseInput.value;
            Object.keys(conversions).forEach((key) => {
                const el = document.getElementById('case-' + key);
                if (el) el.value = conversions[key](text);
            });
        };

        caseInput.addEventListener('input', updateCases);

        document.querySelectorAll('[id^="copy-"]').forEach((btn) => {
            const id = btn.id.replace('copy-', 'case-');
            btn.addEventListener('click', async () => {
                const target = document.getElementById(id);
                if (target && target.value) {
                    const ok = await copyTextToClipboard(target.value);
                    if (ok) { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 2000); }
                }
            });
        });

        const caseClearBtn = document.getElementById('case-clear-btn');
        if (caseClearBtn) caseClearBtn.addEventListener('click', () => {
            caseInput.value = ''; updateCases(); caseInput.focus();
        });
    }

    // ==================== LOREM IPSUM ====================
    const loremGenerateBtn = document.getElementById('lorem-generate-btn');
    if (loremGenerateBtn) {
        const loremOutput = document.getElementById('lorem-output');
        const loremCount = document.getElementById('lorem-count');
        const loremClassic = document.getElementById('lorem-classic');
        const loremCopyBtn = document.getElementById('lorem-copy-btn');

        const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

        const generateParagraph = (startWithClassic) => {
            const len = Math.floor(Math.random() * 80) + 60;
            const words = [];
            for (let i = 0; i < len; i++) {
                words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
            }
            return words.join(' ') + '.';
        };

        loremGenerateBtn.addEventListener('click', () => {
            const count = parseInt(loremCount.value) || 5;
            const paragraphs = [];
            for (let i = 0; i < Math.min(count, 50); i++) {
                paragraphs.push(generateParagraph(i === 0 && loremClassic.checked));
            }
            loremOutput.value = paragraphs.join('\n\n');
        });

        if (loremCopyBtn) loremCopyBtn.addEventListener('click', async () => {
            if (loremOutput.value) {
                const ok = await copyTextToClipboard(loremOutput.value);
                if (ok) { loremCopyBtn.textContent = 'Copied!'; setTimeout(() => loremCopyBtn.textContent = 'Copy Text', 2000); }
            }
        });
    }

    // ==================== COLOR PICKER ====================
    const colorPickerInput = document.getElementById('color-picker-input');
    if (colorPickerInput) {
        const colorPreview = document.getElementById('color-preview');
        const colorHex = document.getElementById('color-hex');
        const colorRgb = document.getElementById('color-rgb');
        const colorHsl = document.getElementById('color-hsl');

        const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        };

        const rgbToHsl = (r, g, b) => {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; }
            else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                    case g: h = ((b - r) / d + 2) / 6; break;
                    case b: h = ((r - g) / d + 4) / 6; break;
                }
            }
            return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
        };

        const updateColor = () => {
            const hex = colorPickerInput.value;
            const rgb = hexToRgb(hex);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            if (colorPreview) colorPreview.style.background = hex;
            if (colorHex) colorHex.value = hex;
            if (colorRgb) colorRgb.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            if (colorHsl) colorHsl.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        };

        colorPickerInput.addEventListener('input', updateColor);
        updateColor();

        ['hex', 'rgb', 'hsl'].forEach((key) => {
            const btn = document.getElementById('copy-' + key);
            const field = document.getElementById('color-' + key);
            if (btn && field) btn.addEventListener('click', async () => {
                const ok = await copyTextToClipboard(field.value);
                if (ok) { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 2000); }
            });
        });
    }

    // ==================== HASH GENERATOR ====================
    const hashGenerateBtn = document.getElementById('hash-generate-btn');
    if (hashGenerateBtn) {
        const hashInput = document.getElementById('hash-input');
        const hashAlgorithm = document.getElementById('hash-algorithm');
        const hashOutput = document.getElementById('hash-output');
        const hashClearBtn = document.getElementById('hash-clear-btn');
        const copyHashBtn = document.getElementById('copy-hash-btn');
        const hashStatus = document.getElementById('hash-status');

        hashGenerateBtn.addEventListener('click', async () => {
            const text = hashInput.value;
            if (!text.trim()) { if (hashStatus) { hashStatus.textContent = 'Enter text to hash.'; hashStatus.classList.add('error'); } return; }
            try {
                const encoder = new TextEncoder();
                const data = encoder.encode(text);
                const algorithm = hashAlgorithm.value;
                const hashBuffer = await crypto.subtle.digest(algorithm, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                hashOutput.value = hashHex;
                if (hashStatus) { hashStatus.textContent = `${algorithm} hash generated successfully.`; hashStatus.classList.remove('error'); }
            } catch (e) {
                if (hashStatus) { hashStatus.textContent = 'Failed to generate hash: ' + e.message; hashStatus.classList.add('error'); }
            }
        });

        if (hashClearBtn) hashClearBtn.addEventListener('click', () => {
            hashInput.value = ''; hashOutput.value = ''; if (hashStatus) hashStatus.textContent = '';
            hashInput.focus();
        });
        if (copyHashBtn) copyHashBtn.addEventListener('click', async () => {
            if (hashOutput.value) {
                const ok = await copyTextToClipboard(hashOutput.value);
                if (ok) { hashStatus.textContent = 'Hash copied!'; hashStatus.classList.remove('error'); copyHashBtn.textContent = 'Copied!'; setTimeout(() => copyHashBtn.textContent = 'Copy Hash', 2000); }
            }
        });
    }

    // ==================== HTML ENTITY ENCODER ====================
    const htmlEncodeBtn = document.getElementById('html-encode-btn');
    if (htmlEncodeBtn) {
        const htmlInput = document.getElementById('html-input');
        const htmlOutput = document.getElementById('html-output');
        const htmlDecodeBtn = document.getElementById('html-decode-btn');
        const htmlClearBtn = document.getElementById('html-clear-btn');
        const copyHtmlBtn = document.getElementById('copy-html-btn');
        const htmlStatus = document.getElementById('html-status');

        const entityMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' };
        const reverseEntityMap = Object.fromEntries(Object.entries(entityMap).map(([k, v]) => [v, k]));

        htmlEncodeBtn.addEventListener('click', () => {
            const text = htmlInput.value;
            htmlOutput.value = text.replace(/[&<>"'`/]/g, (c) => entityMap[c]);
            if (htmlStatus) { htmlStatus.textContent = 'HTML entities encoded.'; htmlStatus.classList.remove('error'); }
        });

        htmlDecodeBtn.addEventListener('click', () => {
            const text = htmlInput.value;
            let decoded = text.replace(/&#x[0-9a-fA-F]+;/g, (m) => String.fromCharCode(parseInt(m.slice(3, -1), 16)));
            decoded = decoded.replace(/&#\d+;/g, (m) => String.fromCharCode(parseInt(m.slice(2, -1), 10)));
            decoded = decoded.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#x3D;/g, (m) => reverseEntityMap[m] || m);
            htmlOutput.value = decoded;
            if (htmlStatus) { htmlStatus.textContent = 'HTML entities decoded.'; htmlStatus.classList.remove('error'); }
        });

        if (htmlClearBtn) htmlClearBtn.addEventListener('click', () => {
            htmlInput.value = ''; htmlOutput.value = ''; if (htmlStatus) htmlStatus.textContent = '';
            htmlInput.focus();
        });
        if (copyHtmlBtn) copyHtmlBtn.addEventListener('click', async () => {
            if (htmlOutput.value) {
                const ok = await copyTextToClipboard(htmlOutput.value);
                if (htmlStatus) { htmlStatus.textContent = ok ? 'Result copied!' : 'Copy failed.'; htmlStatus.classList.toggle('error', !ok); }
            }
        });
    }

    // ==================== SMOOTH SECTION LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
