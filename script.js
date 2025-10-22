// QR Code Generator Script

let qrCode = null;
let logoImage = null;
let currentQRCanvas = null;
let currentMode = 'text'; // 'text' or 'vcard'

// Preset logo SVG definition
const PRESET_LOGO_SVG = `
<svg viewBox="0 0 45.536 43" xmlns="http://www.w3.org/2000/svg">
    <path fill="#BF9518" d="M22.768 17.803c.93 0 1.785.31 2.456.822L38.572 6.02l-3.766-3.556L28.51 8.41V.003H17.024V8.41l-6.298-5.946L6.96 6.02l13.348 12.604a4.03 4.03 0 0 1 2.457-.822zm0 7.397c-.93 0-1.785-.31-2.457-.822L6.963 36.982l3.766 3.556 6.298-5.946V43h11.485v-8.408l6.297 5.946 3.766-3.556-13.348-12.604a4.03 4.03 0 0 1-2.456.822zm22.77-9.122h-8.904l6.297-5.947-3.766-3.556-13.348 12.604c.545.634.87 1.441.87 2.32a3.56 3.56 0 0 1-.87 2.32l13.348 12.603 3.766-3.556-6.297-5.947h8.904V16.075zM18.851 21.5c0-.878.328-1.685.87-2.32L6.373 6.579l-3.766 3.556 6.298 5.947H0v10.844h8.905l-6.298 5.947 3.766 3.556 13.348-12.604a3.54 3.54 0 0 1-.87-2.32z"/>
</svg>
`;

// Get DOM elements
const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
const downloadSection = document.getElementById('download-section');
const sizeSelect = document.getElementById('size');
const colorInput = document.getElementById('color');
const bgColorInput = document.getElementById('bg-color');

// Mode elements
const modeTextBtn = document.getElementById('mode-text');
const modeVcardBtn = document.getElementById('mode-vcard');
const textInputSection = document.getElementById('text-input-section');
const vcardInputSection = document.getElementById('vcard-input-section');

// vCard form elements
const vcardFirstname = document.getElementById('vcard-firstname');
const vcardLastname = document.getElementById('vcard-lastname');
const vcardPhone = document.getElementById('vcard-phone');
const vcardEmail = document.getElementById('vcard-email');
const vcardCompany = document.getElementById('vcard-company');
const vcardTitle = document.getElementById('vcard-title');
const vcardWebsite = document.getElementById('vcard-website');
const vcardAddress = document.getElementById('vcard-address');
const vcardNote = document.getElementById('vcard-note');

// Logo elements
const usePresetLogo = document.getElementById('use-preset-logo');
const presetLogoPreview = document.getElementById('preset-logo-preview');
const logoUpload = document.getElementById('logo-upload');
const logoPreviewContainer = document.getElementById('logo-preview-container');
const logoPreview = document.getElementById('logo-preview');
const removeLogo = document.getElementById('remove-logo');

// Download buttons
const downloadSvg = document.getElementById('download-svg');
const downloadPng = document.getElementById('download-png');
const downloadJpg = document.getElementById('download-jpg');

// Function to load preset logo
function loadPresetLogo() {
    const img = new Image();
    const blob = new Blob([PRESET_LOGO_SVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
        logoImage = img;
        URL.revokeObjectURL(url);

        // Regenerate QR code if one exists
        if (qrCode) {
            generateQRCode();
        }
    };

    img.src = url;
}

// Handle preset logo checkbox
usePresetLogo.addEventListener('change', (e) => {
    if (e.target.checked) {
        // Uncheck custom upload
        logoUpload.value = '';
        logoPreviewContainer.style.display = 'none';

        // Load preset logo
        loadPresetLogo();
    } else {
        // Remove logo
        logoImage = null;

        // Regenerate QR code if one exists
        if (qrCode) {
            generateQRCode();
        }
    }
});

// Handle logo upload
logoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        // Uncheck preset logo
        usePresetLogo.checked = false;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                logoImage = img;
                logoPreview.src = event.target.result;
                logoPreviewContainer.style.display = 'flex';

                // Regenerate QR code if one exists
                if (qrCode) {
                    generateQRCode();
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Remove logo
removeLogo.addEventListener('click', () => {
    logoImage = null;
    logoPreview.src = '';
    logoPreviewContainer.style.display = 'none';
    logoUpload.value = '';
    usePresetLogo.checked = false;

    // Regenerate QR code if one exists
    if (qrCode) {
        generateQRCode();
    }
});

// Mode switching
modeTextBtn.addEventListener('click', () => {
    currentMode = 'text';
    modeTextBtn.classList.add('active');
    modeVcardBtn.classList.remove('active');
    textInputSection.style.display = 'block';
    vcardInputSection.style.display = 'none';
});

modeVcardBtn.addEventListener('click', () => {
    currentMode = 'vcard';
    modeVcardBtn.classList.add('active');
    modeTextBtn.classList.remove('active');
    vcardInputSection.style.display = 'block';
    textInputSection.style.display = 'none';
});

// Generate vCard format
function generateVCard() {
    const firstname = vcardFirstname.value.trim();
    const lastname = vcardLastname.value.trim();
    const phone = vcardPhone.value.trim();
    const email = vcardEmail.value.trim();
    const company = vcardCompany.value.trim();
    const title = vcardTitle.value.trim();
    const website = vcardWebsite.value.trim();
    const address = vcardAddress.value.trim();
    const note = vcardNote.value.trim();

    if (!firstname && !lastname) {
        alert('Please enter at least a first name or last name');
        return null;
    }

    // Build vCard 3.0 format
    let vcard = 'BEGIN:VCARD\n';
    vcard += 'VERSION:3.0\n';
    vcard += `N:${lastname};${firstname};;;\n`;
    vcard += `FN:${firstname} ${lastname}\n`;

    if (company) {
        vcard += `ORG:${company}\n`;
    }

    if (title) {
        vcard += `TITLE:${title}\n`;
    }

    if (phone) {
        vcard += `TEL;TYPE=CELL:${phone}\n`;
    }

    if (email) {
        vcard += `EMAIL:${email}\n`;
    }

    if (website) {
        vcard += `URL:${website}\n`;
    }

    if (address) {
        vcard += `ADR;TYPE=WORK:;;${address};;;;\n`;
    }

    if (note) {
        vcard += `NOTE:${note}\n`;
    }

    vcard += 'END:VCARD';

    return vcard;
}

// Generate QR code function
function generateQRCode() {
    let text;

    if (currentMode === 'vcard') {
        text = generateVCard();
        if (!text) {
            return; // vCard generation failed
        }
    } else {
        text = qrInput.value.trim();
        if (!text) {
            alert('Please enter some text or URL to generate a QR code');
            return;
        }
    }

    // Clear previous QR code
    qrCodeContainer.innerHTML = '';
    qrCodeContainer.classList.remove('has-qr');

    // Get options
    const size = parseInt(sizeSelect.value);
    const colorDark = colorInput.value;
    const colorLight = bgColorInput.value;

    // Create temporary container for QR code generation
    const tempContainer = document.createElement('div');
    tempContainer.style.display = 'none';
    document.body.appendChild(tempContainer);

    // Create new QR code
    qrCode = new QRCode(tempContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Wait for QR code to be generated
    setTimeout(() => {
        const tempCanvas = tempContainer.querySelector('canvas');

        if (tempCanvas) {
            // Create final canvas with logo if provided
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = size;
            finalCanvas.height = size;
            const ctx = finalCanvas.getContext('2d');

            // Draw QR code
            ctx.drawImage(tempCanvas, 0, 0);

            // Draw logo if provided
            if (logoImage) {
                const logoSize = size * 0.25; // Logo is 25% of QR code size
                const logoX = (size - logoSize) / 2;
                const logoY = (size - logoSize) / 2;

                // Draw white background circle for logo
                const bgRadius = logoSize / 2 + 5;
                ctx.fillStyle = colorLight;
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, bgRadius, 0, 2 * Math.PI);
                ctx.fill();

                // Draw logo
                ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
            }

            // Store current canvas for downloads
            currentQRCanvas = finalCanvas;

            // Display the final QR code
            qrCodeContainer.appendChild(finalCanvas);
            qrCodeContainer.classList.add('has-qr');
            downloadSection.style.display = 'block';

            // Add animation
            qrCodeContainer.style.animation = 'none';
            setTimeout(() => {
                qrCodeContainer.style.animation = 'fadeIn 0.5s ease-in';
            }, 10);
        }

        // Remove temporary container
        document.body.removeChild(tempContainer);
    }, 100);
}

// Create high-resolution canvas (1000x1000)
function createHighResCanvas() {
    if (!currentQRCanvas) return null;

    const highResCanvas = document.createElement('canvas');
    highResCanvas.width = 1000;
    highResCanvas.height = 1000;
    const ctx = highResCanvas.getContext('2d');

    // Disable image smoothing for crisp QR code
    ctx.imageSmoothingEnabled = false;

    // Draw scaled QR code
    ctx.drawImage(currentQRCanvas, 0, 0, 1000, 1000);

    return highResCanvas;
}

// Generate SVG from QR code
function generateSVG() {
    if (!currentQRCanvas) {
        alert('Please generate a QR code first');
        return;
    }

    const canvas = currentQRCanvas;
    const size = canvas.width;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    // SVG size
    const svgSize = 1000;
    const pixelSize = svgSize / size;

    let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
    <rect width="${svgSize}" height="${svgSize}" fill="${bgColorInput.value}"/>
    <g fill="${colorInput.value}">`;

    // Convert pixels to SVG rectangles
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const index = (y * size + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            // Check if pixel is dark (part of QR code)
            const brightness = (r + g + b) / 3;
            if (brightness < 128) {
                const svgX = x * pixelSize;
                const svgY = y * pixelSize;
                svg += `\n        <rect x="${svgX}" y="${svgY}" width="${pixelSize}" height="${pixelSize}"/>`;
            }
        }
    }

    // Add logo as embedded image if present
    if (logoImage) {
        const logoSize = svgSize * 0.25;
        const logoX = (svgSize - logoSize) / 2;
        const logoY = (svgSize - logoSize) / 2;
        const bgRadius = logoSize / 2 + 5;

        // Add white background circle
        svg += `\n        <circle cx="${svgSize/2}" cy="${svgSize/2}" r="${bgRadius}" fill="${bgColorInput.value}"/>`;

        // Convert logo to base64 and embed
        const logoCanvas = document.createElement('canvas');
        logoCanvas.width = logoSize;
        logoCanvas.height = logoSize;
        const logoCtx = logoCanvas.getContext('2d');
        logoCtx.drawImage(logoImage, 0, 0, logoSize, logoSize);
        const logoDataUrl = logoCanvas.toDataURL('image/png');

        svg += `\n        <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="${logoDataUrl}"/>`;
    }

    svg += `
    </g>
</svg>`;

    return svg;
}

// Download as SVG
downloadSvg.addEventListener('click', () => {
    const svg = generateSVG();
    if (!svg) return;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'qrcode.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
});

// Download as PNG (1000x1000)
downloadPng.addEventListener('click', () => {
    const highResCanvas = createHighResCanvas();
    if (!highResCanvas) {
        alert('Please generate a QR code first');
        return;
    }

    const link = document.createElement('a');
    link.download = 'qrcode_1000x1000.png';
    link.href = highResCanvas.toDataURL('image/png');
    link.click();
});

// Download as JPG (1000x1000)
downloadJpg.addEventListener('click', () => {
    const highResCanvas = createHighResCanvas();
    if (!highResCanvas) {
        alert('Please generate a QR code first');
        return;
    }

    // Create a new canvas with white background for JPG
    const jpgCanvas = document.createElement('canvas');
    jpgCanvas.width = 1000;
    jpgCanvas.height = 1000;
    const ctx = jpgCanvas.getContext('2d');

    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1000, 1000);

    // Draw QR code on top
    ctx.drawImage(highResCanvas, 0, 0);

    const link = document.createElement('a');
    link.download = 'qrcode_1000x1000.jpg';
    link.href = jpgCanvas.toDataURL('image/jpeg', 0.95);
    link.click();
});

// Event listeners
generateBtn.addEventListener('click', generateQRCode);

// Generate QR code on Enter key (Ctrl+Enter for textarea)
qrInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        generateQRCode();
    }
});

// Auto-generate on option change if there's already a QR code
sizeSelect.addEventListener('change', () => {
    if (qrCode) {
        generateQRCode();
    }
});

colorInput.addEventListener('change', () => {
    if (qrCode) {
        generateQRCode();
    }
});

bgColorInput.addEventListener('change', () => {
    if (qrCode) {
        generateQRCode();
    }
});

// Show helpful message on first load
window.addEventListener('load', () => {
    qrInput.focus();

    // Display preset logo icon
    presetLogoPreview.innerHTML = PRESET_LOGO_SVG;
});
