# Red Baez Website Deployment Guide

This document provides instructions for deploying the Red Baez website.

## Project Structure

The website is built using React and Next.js with the following key technologies:
- React/Next.js for the frontend framework
- Three.js for 3D elements and animations
- GSAP for scroll animations and transitions
- CSS for styling with neon aesthetic

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Local Development

1. Clone the repository
```bash
git clone <repository-url>
cd redbaez-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

1. Build the project
```bash
npm run build
```

2. Start the production server
```bash
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

The easiest way to deploy this Next.js application is to use the [Vercel Platform](https://vercel.com).

1. Create an account on Vercel
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel` from the project directory to deploy

### Option 2: Traditional Hosting

1. Build the project: `npm run build`
2. Export the static files: `npm run export`
3. Upload the contents of the `out` directory to your web server

## Customization

### Updating Content

Most of the website content is contained within the component files in the `components` directory. To update content:

1. Navigate to the relevant component file (e.g., `components/About.js`)
2. Modify the text content as needed
3. Save the file and rebuild the project

### Adding Images

1. Place image files in the `public/images` directory
2. Reference them in your components using the path `/images/filename.jpg`

### Modifying Colors

The color scheme is defined in the `styles/globals.css` file using CSS variables:

```css
:root {
  --primary-red: #FF3D5A;
  --primary-black: #0A0A0A;
  --secondary-black: #1E1E1E;
  --accent-blue: #00F0FF;
  --white: #FFFFFF;
}
```

Update these values to change the color scheme throughout the site.

## Performance Optimization

The website includes several performance optimizations:
- Code splitting via Next.js
- Lazy loading of images
- Optimized 3D rendering
- Responsive design for all device sizes

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

For older browsers, some visual effects may be degraded but core functionality will remain intact.
