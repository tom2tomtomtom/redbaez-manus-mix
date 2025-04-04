# Deployment Instructions for Red Baez Website

This document provides instructions for deploying the Red Baez website to a production environment.

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tom2tomtomtom/redbaez-ai-forge.git
   cd redbaez-ai-forge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **View the website**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest platform for deploying Next.js applications.

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

4. **For production deployment**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy to Netlify**
   ```bash
   netlify deploy
   ```

5. **For production deployment**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Custom Server

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Use a process manager like PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "redbaez" -- start
   ```

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@your-domain.com
```

## Custom Domain Setup

1. Purchase a domain name from a domain registrar
2. Configure DNS settings to point to your hosting provider
3. Set up SSL certificate for secure HTTPS connections

## Performance Optimization

The website is already optimized for performance, but consider:

1. Using a CDN for static assets
2. Implementing image optimization with Next.js Image component
3. Enabling caching headers for static resources

## Maintenance

1. Regularly update dependencies:
   ```bash
   npm update
   ```

2. Monitor website performance using tools like:
   - Google PageSpeed Insights
   - Lighthouse
   - WebPageTest

3. Set up analytics to track user behavior and identify improvement opportunities

## Support

If you encounter any issues during deployment, please contact the development team for assistance.
