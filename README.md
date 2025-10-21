# QR Code Generator

A beautiful, modern web application for generating QR codes instantly from any text or URL.

## Features

- **Instant QR Code Generation**: Create QR codes from text, URLs, or any data
- **Customizable Options**:
  - Three size options (128px, 256px, 512px)
  - Custom foreground color
  - Custom background color
- **Download Capability**: Save generated QR codes as PNG images
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations
- **No Dependencies Required**: Uses CDN for QR code library

## Usage

### Online

Simply open `index.html` in your web browser to start using the QR code generator.

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd c
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

   Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (with http-server)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## How to Use

1. **Enter Your Content**: Type or paste any text, URL, or data into the text area
2. **Customize (Optional)**:
   - Select a size from the dropdown (Small, Medium, or Large)
   - Choose a custom color for the QR code
   - Choose a custom background color
3. **Generate**: Click the "Generate QR Code" button or press Ctrl+Enter
4. **Download**: Click the "Download QR Code" button to save the image

## Use Cases

- **URLs**: Share website links
- **Contact Information**: vCard format for business cards
- **WiFi Credentials**: Share WiFi access easily
- **Plain Text**: Any text information
- **Social Media**: Links to profiles or posts
- **Event Information**: Calendar events or location data

## Technology Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: QR code generation logic
- **QRCode.js**: Library for generating QR codes (loaded via CDN)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Files Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # Stylesheet for the application
├── script.js       # JavaScript logic for QR code generation
└── README.md       # This file
```

## License

This project is open source and available for anyone to use and modify.

## Credits

QR Code generation powered by [QRCode.js](https://github.com/davidshimjs/qrcodejs)
