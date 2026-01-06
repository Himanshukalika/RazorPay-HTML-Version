# 🚀 Subdomain Deployment Guide - Hostinger

## 📋 Subdomain Deployment (e.g., payment.yourdomain.com)

Complete guide to deploy Razorpay subscription system on a subdomain.

---

## 🎯 Example Subdomain

```
Main Domain: yourdomain.com
Subdomain: payment.yourdomain.com
```

---

## 📝 Step-by-Step Deployment

### **Step 1: Create Subdomain in Hostinger**

1. **Login to Hostinger:** https://hpanel.hostinger.com

2. **Go to:** Websites → Select your domain

3. **Click:** "Subdomains" (in left sidebar)

4. **Create Subdomain:**
   ```
   Subdomain: payment
   Domain: yourdomain.com
   Full subdomain: payment.yourdomain.com
   ```

5. **Document Root:** 
   ```
   /public_html/payment
   ```
   (Hostinger will create this folder automatically)

6. **Click:** "Create"

---

### **Step 2: Upload Files to Subdomain Folder**

1. **Open File Manager** in Hostinger

2. **Navigate to:** `/public_html/payment/`

3. **Upload ALL project files:**
   ```
   ✅ index.html
   ✅ thank-you.html
   ✅ styles.css
   ✅ script.js
   ✅ config.js
   ✅ php-backend/ (entire folder with all PHP files)
   ✅ public/ (entire folder with images)
   ```

4. **Final Structure:**
   ```
   /public_html/payment/
   ├── index.html
   ├── thank-you.html
   ├── styles.css
   ├── script.js
   ├── config.js
   ├── php-backend/
   │   ├── .htaccess
   │   ├── config.php
   │   ├── create-order.php
   │   ├── create-subscription.php
   │   ├── verify-payment.php
   │   ├── verify-subscription.php
   │   ├── save-to-sheet.php
   │   └── health.php
   └── public/
       └── images/
           ├── founders.jpg
           ├── achievement-1.png
           ├── achievement-2.png
           ├── achievement-3.png
           ├── achievement-4.png
           └── kavita.png
   ```

---

### **Step 3: Set File Permissions**

In File Manager:

1. **Right-click** on `payment` folder → Permissions → **755**

2. **Right-click** on `php-backend` folder → Permissions → **755**

3. **For each PHP file:**
   - Right-click → Permissions → **644**

4. **For HTML/CSS/JS files:**
   - Permissions → **644**

---

### **Step 4: Configure SSL (HTTPS)**

1. **Go to:** Websites → SSL

2. **Find your subdomain:** `payment.yourdomain.com`

3. **Click:** "Install SSL" (Free Let's Encrypt)

4. **Wait:** 5-10 minutes for SSL to activate

5. **Verify:** Visit `https://payment.yourdomain.com` (should show secure)

---

### **Step 5: Force HTTPS Redirect**

Create `.htaccess` in `/public_html/payment/`:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Hide PHP version
Header unset X-Powered-By
ServerSignature Off

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

---

### **Step 6: Test Backend**

Visit: `https://payment.yourdomain.com/php-backend/health.php`

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-01-06 10:37:00",
  "razorpay_configured": true,
  "php_version": "8.x",
  "message": "PHP Backend is working!"
}
```

✅ If you see this, backend is working!

---

### **Step 7: Test Main Page**

Visit: `https://payment.yourdomain.com/`

Should show:
- ✅ Checkout page with all 4 plans
- ✅ Forms working
- ✅ Images loading
- ✅ No console errors

---

### **Step 8: Test Payment Flow**

1. **Select Quarterly Plan** (₹2799)

2. **Fill Form:**
   ```
   First Name: Test
   Last Name: User
   Email: test@yourdomain.com
   Mobile: 9876543210
   ```

3. **Click:** "Complete Order"

4. **Razorpay Checkout should open** ✅

5. **Complete payment** (use test card if in test mode)

6. **Should redirect to:** `https://payment.yourdomain.com/thank-you.html`

7. **Check validity:** Should show **5 years** (6 Jan 2026 to 6 Jan 2031)

---

## 🔒 Security Configuration

### **1. Protect PHP Backend**

Already done via `.htaccess` in `php-backend/` folder.

### **2. Protect Sensitive Files**

Add to main `.htaccess` in `/public_html/payment/`:

```apache
# Protect .env and config files
<FilesMatch "^\.env|config\.php">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Prevent directory listing
Options -Indexes
```

### **3. Enable Security Headers**

Already included in `.htaccess` above.

---

## 🌐 DNS Configuration (If Custom Subdomain)

If you're using external DNS (Cloudflare, etc.):

1. **Add A Record:**
   ```
   Type: A
   Name: payment
   Value: [Your Hostinger Server IP]
   TTL: Auto
   ```

2. **Wait:** 5-10 minutes for DNS propagation

3. **Verify:** `ping payment.yourdomain.com`

---

## 📊 Subdomain URLs

After deployment, your URLs will be:

```
Main Page:       https://payment.yourdomain.com/
Thank You Page:  https://payment.yourdomain.com/thank-you.html
Backend Health:  https://payment.yourdomain.com/php-backend/health.php
```

---

## 🧪 Testing Checklist

- [ ] Subdomain created in Hostinger
- [ ] All files uploaded to `/public_html/payment/`
- [ ] File permissions set correctly (755/644)
- [ ] SSL certificate installed and active
- [ ] HTTPS redirect working
- [ ] Backend health check passes
- [ ] Main page loads correctly
- [ ] Images loading
- [ ] No console errors
- [ ] Payment flow works
- [ ] Thank you page redirects correctly
- [ ] Subscription validity shows 5 years
- [ ] Facebook Pixel events firing
- [ ] Google Sheets data saving

---

## 🚨 Common Issues & Solutions

### **Issue 1: Subdomain not working**
**Solution:**
- Wait 5-10 minutes after creation
- Clear browser cache
- Check DNS propagation: https://dnschecker.org

### **Issue 2: SSL not working**
**Solution:**
- Wait 10-15 minutes for SSL activation
- Force HTTPS in `.htaccess`
- Contact Hostinger support if still not working

### **Issue 3: 404 Error on PHP files**
**Solution:**
- Check file paths are correct
- Verify PHP files are in `php-backend/` folder
- Check file permissions (644)

### **Issue 4: Images not loading**
**Solution:**
- Verify `public/images/` folder exists
- Check image file names match code
- Set folder permissions to 755

### **Issue 5: Payment fails**
**Solution:**
- Check `php-backend/health.php`
- Verify Razorpay API keys in `php-backend/config.php`
- Check PHP error logs in Hostinger

---

## 📁 File Structure Verification

Your subdomain folder should look exactly like this:

```
/public_html/payment/
│
├── .htaccess                    # Main security config
├── index.html                   # Main checkout page
├── thank-you.html               # Success page
├── styles.css                   # Styling
├── script.js                    # Frontend logic
├── config.js                    # Configuration
│
├── php-backend/                 # PHP Backend
│   ├── .htaccess               # Backend security
│   ├── config.php              # PHP config (PROTECTED)
│   ├── create-order.php        # Create order
│   ├── create-subscription.php # Create subscription
│   ├── verify-payment.php      # Verify payment
│   ├── verify-subscription.php # Verify subscription
│   ├── save-to-sheet.php       # Save to Google Sheets
│   └── health.php              # Health check
│
└── public/                      # Static assets
    └── images/
        ├── founders.jpg
        ├── achievement-1.png
        ├── achievement-2.png
        ├── achievement-3.png
        ├── achievement-4.png
        └── kavita.png
```

---

## 🎯 Quick Deployment Commands

If using FTP/SSH:

```bash
# Navigate to subdomain folder
cd /public_html/payment/

# Set folder permissions
chmod 755 php-backend public public/images

# Set file permissions
chmod 644 *.html *.css *.js
chmod 644 php-backend/*.php

# Verify structure
ls -la
```

---

## 📞 Support

If issues persist:

1. **Check Hostinger PHP Error Logs:**
   - cPanel → Error Logs → Select subdomain

2. **Check Razorpay Dashboard:**
   - https://dashboard.razorpay.com
   - Check for failed payments

3. **Contact Hostinger Support:**
   - Live chat available 24/7

---

## ✅ Deployment Complete!

Your Razorpay subscription system is now live on subdomain! 🎉

**Live URL:** `https://payment.yourdomain.com/`

**Test thoroughly before going live with real payments!**

---

## 🎯 Post-Deployment

1. **Test all 4 plans** with small amounts
2. **Verify 5-year validity** on each plan
3. **Check Google Sheets** data is saving
4. **Monitor Facebook Pixel** events
5. **Check Razorpay Dashboard** for subscriptions

---

**Last Updated:** 6 Jan 2026  
**Version:** 1.0 (Subdomain Deployment)  
**Status:** ✅ Production Ready

🚀 **Happy Deploying!**
