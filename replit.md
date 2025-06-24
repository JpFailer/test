# Fundacredesa - Mental Health Platform

## Overview

This is a presentation website for Fundacredesa, a Venezuelan organization focused on mental health awareness. The platform presents statistical data and educational content about mental health challenges in Venezuela, with a modern, minimalist design built using pure HTML, CSS and JavaScript.

## System Architecture

### Frontend Architecture
- **Framework**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Animations**: Pure CSS animations with JavaScript interactions
- **Charts**: Custom SVG-based charts with JavaScript
- **Icons**: Font Awesome for consistent iconography
- **Fonts**: Google Fonts (Poppins and Inter)

### Project Structure
```
├── index.html       # Main HTML file
├── styles.css       # All CSS styles and animations
├── script.js        # JavaScript functionality
└── attached_assets/ # Static content and documentation
```

## Key Components

### HTML Structure
- **Header**: Fixed navigation with smooth scrolling and mobile menu
- **Hero Section**: Landing area with animated brain icon and call-to-action buttons
- **Video Section**: Presentation area with interactive video placeholder
- **Statistics Section**: Data visualization with animated counters and custom SVG charts
- **Mission Section**: Organization goals with animated elements
- **Footer**: Branding and copyright information

### Styling System
- **Brand Colors**: 
  - Fundacredesa Yellow: `#FFCC00`
  - Fundacredesa Blue: `#2E86C1`
  - Fundacredesa Celeste: `#5DADE2`
- **Design**: Minimalist and modern with smooth animations
- **Typography**: Poppins and Inter fonts from Google Fonts
- **Layout**: Responsive design using CSS Grid and Flexbox

### Interactive Features
- **Smooth Scrolling**: Navigation between sections
- **Animated Statistics**: Numbers animate when scrolled into view
- **Custom Charts**: SVG-based pie and bar charts
- **Mobile Navigation**: Collapsible menu for mobile devices
- **Hover Effects**: Interactive elements with smooth transitions

## How to Run Locally

### Method 1: Python HTTP Server (Recommended)
```bash
python3 -m http.server 5000
```
Then open: http://localhost:5000

### Method 2: Custom Python Server
```bash
python3 run_server.py
```

### Method 3: Direct File Opening
Double-click `index.html` to open in browser (some features may not work without server)

## External Dependencies

### CDN Resources
- **Icons**: Font Awesome 6.0.0 from CDN
- **Fonts**: Google Fonts (Poppins and Inter)

### No Local Dependencies
- Pure HTML5, CSS3, and JavaScript
- No package managers or build tools required
- No installation needed

## Deployment Strategy

### Simple Static Hosting
- Any web server that can serve static files
- No build process required
- No environment variables needed
- Copy files to web server directory

## Changelog

- June 24, 2025: Initial setup with React/TypeScript stack
- June 24, 2025: Complete rewrite to pure HTML, CSS, JavaScript per user request
- June 24, 2025: Cleaned all Node.js/TypeScript dependencies
- June 24, 2025: Added extensive new animations and visual effects:
  * Floating particle elements in hero section
  * Typing animation for main title
  * Enhanced button hover effects with glow
  * Progress bars with shimmer animation for statistics
  * Magic brain hover effects with color cycling
  * Parallax background scrolling
  * Card hover animations with wave borders
  * Scroll-triggered animations for all sections
- June 24, 2025: Code organization and cleanup:
  * Organized code into clear sections (Inicio, Presentación, Estadísticas, Misión)
  * Translated all comments and section headers to Spanish
  * Separated animations into dedicated CSS and JS files
  * Improved code structure and maintainability
  * Replaced brain icons with official Fundacredesa logo
- June 24, 2025: Added simple chatbot interface:
  * Created floating chatbot bubble in bottom-right corner
  * Simple expandable window with "Bot Fundacredesa" header
  * Basic frontend structure ready for custom AI integration
  * Minimal code for easy customization

## User Preferences

Preferred communication style: Simple, everyday language.