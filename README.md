# QR Code Generator

A beautiful, modern web application for generating QR codes instantly from text, URLs, or contact information (vCard).

## Features

- **Instant QR Code Generation**: Create QR codes from text, URLs, or any data
- **vCard/Contact Support**: Generate QR codes for mobile contacts that can be saved directly to phones
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
- **Modern UI**: Beautiful orange-to-green gradient design with smooth animations
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

### For Text/URL QR Codes:
1. **Select Mode**: Click "Text / URL" button (default)
2. **Enter Your Content**: Type or paste any text, URL, or data into the text area
3. **Customize (Optional)**:
   - Select a size from the dropdown (Small, Medium, or Large)
   - Choose a custom color for the QR code
   - Choose a custom background color
   - Upload a logo image (PNG, JPG, etc.) to embed in the center
4. **Generate**: Click the "Generate QR Code" button or press Ctrl+Enter
5. **Download**: Choose your preferred format:
   - **SVG**: Best for printing and scaling (vector format)
   - **PNG**: High-quality raster image with transparency
   - **JPG**: Compressed format, ideal for web sharing

### For Contact/vCard QR Codes:
1. **Select Mode**: Click "Contact (vCard)" button
2. **Fill Contact Information**:
   - First Name and Last Name (required)
   - Phone number
   - Email address
   - Company and Job Title
   - Website URL
   - Physical address
   - Additional notes
3. **Customize & Generate**: Same as above - customize colors, size, logo, then generate
4. **Scan with Mobile**: When scanned with a phone, the contact can be saved directly to the device

## Use Cases

### Text/URL QR Codes:
- **Website Links**: Share URLs with your brand logo
- **WiFi Credentials**: Share WiFi access information
- **Marketing Campaigns**: Branded QR codes for promotions
- **Product Packaging**: Link to product info with brand identity
- **Social Media**: Links to profiles with custom branding
- **Event Information**: Details with event logo
- **Digital Menus**: Restaurant or bar menus

### Contact vCard QR Codes:
- **Business Cards**: Digital business cards that save directly to phones
- **Networking Events**: Quick contact sharing at conferences
- **Real Estate Agents**: Easy contact saving for potential clients
- **Sales Teams**: Instant contact information for leads
- **Service Providers**: Contractors, consultants sharing contact info
- **Event Staff**: Quick contact sharing with attendees
- **Trade Shows**: Booth representatives sharing contact details

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
