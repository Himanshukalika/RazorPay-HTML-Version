# 🚀 Production Deployment Guide - Hostinger

## ✅ Pre-Deployment Checklist

- [x] All subscription plans configured (5-year validity)
- [x] Razorpay Live API keys configured
- [x] Facebook Pixel configured
- [x] Google Sheets integration configured
- [x] Mobile number format fixed (+91 prefix)
- [x] Debug code removed
- [x] All plans tested locally

---

## 📋 Razorpay Plan IDs (LIVE)

```
Monthly (₹999):      plan_RzJBh5GIa5TmkJ
Quarterly (₹2799):   plan_S0S7XoBiJtwYGz
Half-Yearly (₹5499): plan_Rz0FVXFOF2Oy8y
Yearly (₹9999):      plan_Rz0GdAGSVQnDCL
```

**Billing Cycles:**
- Monthly: 60 cycles × 1 month = 60 months (5 years)
- Quarterly: 20 cycles × 3 months = 60 months (5 years)
- Half-Yearly: 10 cycles × 6 months = 60 months (5 years)
- Yearly: 5 cycles × 12 months = 60 months (5 years)

---

## 🌐 Hostinger Deployment Steps

### Step 1: Login to Hostinger

1. Go to: https://hpanel.hostinger.com
2. Login with your credentials
3. Select your domain/hosting

### Step 2: Upload Files via File Manager

1. **Open File Manager** in Hostinger
2. **Navigate to:** `public_html/` (or your domain folder)
3. **Upload ALL files:**
   ```
   ✅ index.html
   ✅ thank-you.html
   ✅ styles.css
   ✅ script.js
   ✅ config.js
   ✅ php-backend/ (entire folder)
   ✅ public/ (entire folder)
   ```

### Step 3: Verify File Structure

Your hosting should look like:
```
public_html/
├── index.html
├── thank-you.html
├── styles.css
├── script.js
├── config.js
├── php-backend/
│   ├── config.php
│   ├── create-order.php
│   ├── create-subscription.php
│   ├── verify-payment.php
│   ├── verify-subscription.php
│   ├── save-to-sheet.php
│   └── health.php
└── public/
    └── images/
```

### Step 4: Set File Permissions

In File Manager:
1. Right-click on `php-backend` folder
2. **Permissions:** 755
3. Right-click on each `.php` file
4. **Permissions:** 644

### Step 5: Test Backend

Visit: `https://yourdomain.com/php-backend/health.php`

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-01-06 09:43:00",
  "razorpay_configured": true,
  "php_version": "8.x",
  "message": "PHP Backend is working!"
}
```

### Step 6: Test Main Page

Visit: `https://yourdomain.com/`

Should show the checkout page with all plans.

---

## 🔒 Security Configuration

### 1. Protect Sensitive Files

Create `.htaccess` in `php-backend/` folder:

```apache
# Protect config.php
<Files "config.php">
    Order Allow,Deny
    Deny from all
</Files>

# Allow only PHP files to be accessed
<FilesMatch "\.(php)$">
    Order Allow,Deny
    Allow from all
</FilesMatch>
```

### 2. Force HTTPS

Add to main `.htaccess` in `public_html/`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 3. Hide PHP Version

Add to `.htaccess`:

```apache
# Hide PHP version
Header unset X-Powered-By
ServerSignature Off
```

---

## 🧪 Testing Checklist

After deployment, test:

- [ ] Main page loads: `https://yourdomain.com/`
- [ ] Backend health: `https://yourdomain.com/php-backend/health.php`
- [ ] Select Monthly plan and test payment
- [ ] Select Quarterly plan and test payment
- [ ] Select Half-Yearly plan and test payment
- [ ] Select Yearly plan and test payment
- [ ] Check validity shows 5 years
- [ ] Thank you page redirects correctly
- [ ] Facebook Pixel events fire
- [ ] Google Sheets data saves

---

## 📊 Live Configuration

### Razorpay (LIVE MODE)
```
Key ID: rzp_live_Rx0dB1g3YMVHI0
Key Secret: 917FiE8XMWwrcpG7kzChKObR
```

### Facebook Pixel
```
Pixel ID: 2064676100935063
```

### Google Sheets
```
Enabled: Yes
URL: https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec
```

---

## 🚨 Important Notes

1. **LIVE MODE:** All payments are REAL! Test with small amounts first.
2. **Backup:** Keep a backup of all files before deployment.
3. **SSL Required:** HTTPS is mandatory for Razorpay payments.
4. **PHP Version:** Ensure hosting has PHP 7.4+ with cURL enabled.
5. **Plan IDs:** Don't change Plan IDs after deployment.

---

## 🔧 Troubleshooting

### Issue: Payment fails
**Solution:** Check `php-backend/health.php` - ensure Razorpay keys are correct

### Issue: CORS error
**Solution:** Already handled in PHP files with CORS headers

### Issue: 500 Error
**Solution:** Check PHP error logs in Hostinger cPanel

### Issue: Subscription validity wrong
**Solution:** Verify plan billing cycles in Razorpay dashboard

---

## 📞 Support

If issues persist:
1. Check Hostinger PHP error logs
2. Check Razorpay dashboard for failed payments
3. Verify all Plan IDs match Razorpay dashboard

---

## ✅ Deployment Complete!

Your Razorpay subscription system is now LIVE! 🎉

**Test URL:** https://yourdomain.com/
**Backend Health:** https://yourdomain.com/php-backend/health.php

---

**Last Updated:** 6 Jan 2026
**Version:** 1.0 (Production Ready)
