# 🚀 Complete Setup Guide - HTML Version

This guide will help you set up and run the HTML/CSS/JavaScript version of the Razorpay payment integration.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ A Razorpay account ([Sign up here](https://razorpay.com))
- ✅ Razorpay API credentials (Key ID and Key Secret)
- ✅ Node.js installed (v14 or higher) - [Download](https://nodejs.org)
- ✅ A code editor (VS Code, Sublime Text, etc.)
- ✅ Basic knowledge of HTML, CSS, and JavaScript

---

## Quick Start

### Option 1: Using the Standalone Backend (Recommended)

```bash
# 1. Install dependencies
npm install --package-lock-only
npm install express razorpay cors dotenv

# 2. Create .env file
cp env.example.txt .env

# 3. Edit .env and add your Razorpay credentials
# RAZORPAY_KEY_ID=rzp_test_xxxxx
# RAZORPAY_KEY_SECRET=xxxxx

# 4. Update config.js with your Razorpay Key ID
# RAZORPAY_KEY_ID: 'rzp_test_xxxxx'

# 5. Start the server
node server-standalone.js

# 6. Open browser
# http://localhost:3000/index.html
```

### Option 2: Using the Next.js Backend

```bash
# 1. Keep the Next.js server running
npm run dev

# 2. Update config.js
# API_BASE_URL: 'http://localhost:3000/api'

# 3. Open the HTML file in a separate server
python -m http.server 8000

# 4. Open browser
# http://localhost:8000/index.html
```

---

## Detailed Setup

### Step 1: Get Razorpay Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings** → **API Keys**
3. Generate **Test Mode** keys for development
4. Copy your **Key ID** and **Key Secret**

### Step 2: Create Razorpay Plans (For Subscriptions)

1. Go to **Subscriptions** → **Plans** in Razorpay Dashboard
2. Create 4 plans:
   - **Monthly Plan**: ₹999/month
   - **Quarterly Plan**: ₹2799 every 3 months
   - **Half-Yearly Plan**: ₹5499 every 6 months
   - **Yearly Plan**: ₹9999 every 12 months
3. Copy each Plan ID

### Step 3: Configure the Application

#### A. Update `config.js`

```javascript
const CONFIG = {
    // Replace with your actual Razorpay Key ID
    RAZORPAY_KEY_ID: 'rzp_test_xxxxxxxxxxxxx',
    
    // Replace with your Plan IDs
    RAZORPAY_PLAN_ID_MONTHLY: 'plan_xxxxx',
    RAZORPAY_PLAN_ID_QUARTERLY: 'plan_xxxxx',
    RAZORPAY_PLAN_ID_HALFYEARLY: 'plan_xxxxx',
    RAZORPAY_PLAN_ID_YEARLY: 'plan_xxxxx',
    
    // Optional: Facebook Pixel ID
    FB_PIXEL_ID: 'YOUR_FB_PIXEL_ID',
    
    // API endpoint
    API_BASE_URL: '/api',
};
```

#### B. Create `.env` file (for backend)

```bash
# Copy the example file
cp env.example.txt .env

# Edit .env
nano .env
```

Add your credentials:
```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
PORT=3000
NODE_ENV=development
```

### Step 4: Install Backend Dependencies

```bash
# Using npm
npm install express razorpay cors dotenv

# Or using yarn
yarn add express razorpay cors dotenv
```

### Step 5: Start the Server

```bash
# Production
node server-standalone.js

# Development (with auto-reload)
npm install -g nodemon
nodemon server-standalone.js
```

You should see:
```
╔═══════════════════════════════════════════════════════════╗
║   🚀 Razorpay Backend Server Running                     ║
║   📍 URL: http://localhost:3000                          ║
║   ✅ Razorpay: Configured                                ║
╚═══════════════════════════════════════════════════════════╝
```

### Step 6: Open the Application

Open your browser and navigate to:
```
http://localhost:3000/index.html
```

---

## Testing

### Test Mode

Razorpay provides test cards for testing payments:

#### Test Card Details:
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date
- **Name**: Any name

#### Test UPI:
- **UPI ID**: success@razorpay

### Testing Checklist

- [ ] Plan selection works
- [ ] Form validation works
- [ ] Mobile number accepts only 10 digits
- [ ] Email validation works
- [ ] Payment modal opens
- [ ] Test payment succeeds
- [ ] Redirects to thank you page
- [ ] Order details display correctly
- [ ] Facebook Pixel events fire (check console)

### Testing Subscriptions

1. Select a plan (Quarterly recommended)
2. Fill in the form
3. Click "Complete Order"
4. Use test card details
5. Complete payment
6. Check Razorpay Dashboard → Subscriptions

---

## Deployment

### Option 1: Deploy to Netlify (Frontend Only)

```bash
# 1. Build command: (none needed)
# 2. Publish directory: .
# 3. Add environment variables in Netlify dashboard

# Deploy
netlify deploy --prod
```

**Note**: You'll need to deploy the backend separately (e.g., on Heroku, Railway, or Render).

### Option 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Deploy to Traditional Hosting (cPanel)

1. Upload all files via FTP
2. Update `config.js` with production API URL
3. Ensure backend is accessible
4. Test payment flow

### Option 4: Deploy Full Stack (Backend + Frontend)

#### Using Railway:

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Add environment variables
railway variables set RAZORPAY_KEY_ID=rzp_live_xxxxx
railway variables set RAZORPAY_KEY_SECRET=xxxxx

# 5. Deploy
railway up
```

#### Using Heroku:

```bash
# 1. Create Procfile
echo "web: node server-standalone.js" > Procfile

# 2. Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# 3. Create Heroku app
heroku create your-app-name

# 4. Set environment variables
heroku config:set RAZORPAY_KEY_ID=rzp_live_xxxxx
heroku config:set RAZORPAY_KEY_SECRET=xxxxx

# 5. Deploy
git push heroku main
```

### Production Checklist

Before going live:

- [ ] Switch to **Live Mode** Razorpay keys
- [ ] Update all Plan IDs to live plans
- [ ] Test with real payment (small amount)
- [ ] Enable HTTPS
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure Facebook Pixel with live ID
- [ ] Test on multiple devices
- [ ] Set up backup/monitoring
- [ ] Configure email notifications
- [ ] Add Google Analytics (optional)

---

## Troubleshooting

### Issue: "Razorpay SDK not loaded"

**Solution**:
- Check if `checkout.razorpay.com/v1/checkout.js` is accessible
- Check browser console for errors
- Ensure you have internet connection

### Issue: "Failed to create order"

**Solution**:
- Check if backend server is running
- Verify API endpoint in `config.js`
- Check backend console for errors
- Verify Razorpay credentials in `.env`

### Issue: "Invalid signature"

**Solution**:
- Ensure Key Secret matches in backend
- Check if you're using test/live keys consistently
- Verify signature generation logic

### Issue: Payment modal doesn't open

**Solution**:
- Check browser console for errors
- Verify Razorpay Key ID in `config.js`
- Ensure form validation passes
- Check if Razorpay script is loaded

### Issue: CORS errors

**Solution**:
- Ensure `cors` is enabled in backend
- Check if API_BASE_URL is correct
- For production, configure allowed origins

### Issue: Facebook Pixel not tracking

**Solution**:
- Verify FB_PIXEL_ID in `config.js`
- Check browser console for fbq logs
- Install Facebook Pixel Helper extension
- Ensure pixel code is in HTML head

### Issue: Images not loading

**Solution**:
- Check if images exist in `/public/images/`
- Verify image paths are correct
- Check browser console for 404 errors
- Ensure server is serving static files

---

## Advanced Configuration

### Custom Styling

Edit `styles.css` to match your brand:

```css
/* Change primary color */
:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
}

.btn-primary {
    background-color: var(--primary-color);
}

.btn-primary:hover {
    background-color: var(--primary-hover);
}
```

### Adding More Plans

Edit `script.js`:

```javascript
const plans = {
    // ... existing plans
    custom: {
        id: 'custom',
        name: 'Custom Plan',
        price: 4999,
        duration: '3 Months',
        totalMonths: 3,
        // ... other properties
    }
};
```

### Email Notifications

Add email sending in `server-standalone.js`:

```javascript
// Install: npm install nodemailer
const nodemailer = require('nodemailer');

// After successful payment
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

await transporter.sendMail({
    from: 'noreply@makeupmastryclubcom',
    to: customerEmail,
    subject: 'Welcome to MakeUp Mastry Club!',
    html: '<h1>Thank you for joining!</h1>'
});
```

---

## Security Best Practices

1. **Never expose Key Secret** in frontend code
2. **Always verify payments** on backend
3. **Use HTTPS** in production
4. **Validate all inputs** on both sides
5. **Store credentials** in environment variables
6. **Enable rate limiting** on API endpoints
7. **Log all transactions** for audit trail
8. **Set up monitoring** for failed payments
9. **Use CSP headers** to prevent XSS
10. **Keep dependencies updated**

---

## Support & Resources

### Documentation
- [Razorpay Docs](https://razorpay.com/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Facebook Pixel Docs](https://developers.facebook.com/docs/meta-pixel)

### Community
- [Razorpay Support](https://razorpay.com/support/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/razorpay)

### Contact
- Email: support@makeupmastryclubcom
- Phone: [Your phone number]

---

## License

© 2024 MakeUp Mastry Club. All rights reserved.

---

**Happy Coding! 🎉**
