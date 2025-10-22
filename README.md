# QR Code Generator

A beautiful, modern web application for generating QR codes instantly from any text or URL.

## Features

- **Instant QR Code Generation**: Create QR codes from text, URLs, or any data
- **Logo Integration**: Upload and embed your logo in the center of the QR code
- **Customizable Options**:
  - Three size options (128px, 256px, 512px)
  - Custom foreground color
  - Custom background color
  - Optional logo overlay (25% of QR code size with protective white background)
- **Multiple Download Formats**:
  - SVG (vector format, scalable to any size)
  - PNG (1000x1000px, high-resolution raster)
  - JPG (1000x1000px, optimized for sharing)
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
   - Upload a logo image (PNG, JPG, etc.) to embed in the center
3. **Generate**: Click the "Generate QR Code" button or press Ctrl+Enter
4. **Download**: Choose your preferred format:
   - **SVG**: Best for printing and scaling (vector format)
   - **PNG**: High-quality raster image with transparency
   - **JPG**: Compressed format, ideal for web sharing

## Use Cases

- **URLs**: Share website links with your brand logo
- **Business Cards**: vCard format with company branding
- **WiFi Credentials**: Share WiFi access with venue logo
- **Marketing Materials**: Branded QR codes for campaigns
- **Product Packaging**: Link to product info with brand identity
- **Social Media**: Links to profiles with custom branding
- **Event Tickets**: Event information with event logo
- **Restaurant Menus**: Digital menus with restaurant branding

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
