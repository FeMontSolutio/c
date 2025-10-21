// QR Code Generator Script

let qrCode = null;

// Get DOM elements
const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const qrCodeContainer = document.getElementById('qr-code-container');
const downloadSection = document.getElementById('download-section');
const sizeSelect = document.getElementById('size');
const colorInput = document.getElementById('color');
const bgColorInput = document.getElementById('bg-color');

// Generate QR code function
function generateQRCode() {
    const text = qrInput.value.trim();

    if (!text) {
        alert('Please enter some text or URL to generate a QR code');
        return;
    }

    // Clear previous QR code
    qrCodeContainer.innerHTML = '';
    qrCodeContainer.classList.remove('has-qr');

    // Get options
    const size = parseInt(sizeSelect.value);
    const colorDark = colorInput.value;
    const colorLight = bgColorInput.value;

    // Create new QR code
    qrCode = new QRCode(qrCodeContainer, {
        text: text,
        width: size,
        height: size,
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Update UI
    qrCodeContainer.classList.add('has-qr');
    downloadSection.style.display = 'block';

    // Add animation
    qrCodeContainer.style.animation = 'none';
    setTimeout(() => {
        qrCodeContainer.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
}

// Download QR code function
function downloadQRCode() {
    const canvas = qrCodeContainer.querySelector('canvas');

    if (!canvas) {
        alert('Please generate a QR code first');
        return;
    }

    // Create download link
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Event listeners
generateBtn.addEventListener('click', generateQRCode);
downloadBtn.addEventListener('click', downloadQRCode);

// Generate QR code on Enter key (Ctrl+Enter for textarea)
qrInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        generateQRCode();
    }
});

// Auto-generate on option change if there's already text
sizeSelect.addEventListener('change', () => {
    if (qrInput.value.trim() && qrCode) {
        generateQRCode();
    }
});

colorInput.addEventListener('change', () => {
    if (qrInput.value.trim() && qrCode) {
        generateQRCode();
    }
});

bgColorInput.addEventListener('change', () => {
    if (qrInput.value.trim() && qrCode) {
        generateQRCode();
    }
});

// Show helpful message on first load
window.addEventListener('load', () => {
    qrInput.focus();
});
