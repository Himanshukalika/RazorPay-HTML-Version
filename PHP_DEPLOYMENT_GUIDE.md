# 🚀 PHP Backend Deployment Guide

## ✅ PHP Backend Created Successfully!

Your project now uses **PHP backend** instead of Node.js. This works on any traditional hosting like cPanel, Hostinger, GoDaddy, etc.

---

## 📁 Project Structure

```
RazorPay-HTML-Version/
├── index.html                  # Main checkout page
├── thank-you.html              # Success page
├── styles.css                  # Styles
├── script.js                   # Frontend logic (UPDATED for PHP)
├── config.js                   # Configuration (UPDATED for PHP)
│
├── php-backend/                # ← NEW! PHP Backend
│   ├── config.php              # PHP configuration
│   ├── create-order.php        # Create Razorpay order
│   ├── verify-payment.php      # Verify payment
│   ├── create-subscription.php # Create subscription
│   ├── verify-subscription.php # Verify subscription
│   ├── save-to-sheet.php       # Save to Google Sheets
│   └── health.php              # Health check
│
└── public/                     # Images
    └── images/
```

---

## 🔧 Requirements

### Server Requirements:
- ✅ PHP 7.4 or higher
- ✅ cURL extension enabled
- ✅ JSON extension enabled
- ✅ HTTPS (for production)

### Check PHP Version:
```bash
php -v
```

---

## 📝 Deployment Steps

### Option 1: cPanel / Hostinger / Traditional Hosting

#### Step 1: Upload Files

1. **Connect via FTP** (FileZilla, cPanel File Manager, etc.)
2. **Upload all files** to your domain folder:
   - `public_html/` or `www/` or your domain folder
3. **Upload structure:**
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
   │   ├── verify-payment.php
   │   ├── create-subscription.php
   │   ├── verify-subscription.php
   │   ├── save-to-sheet.php
   │   └── health.php
   └── public/
       └── images/
   ```

#### Step 2: Configure PHP Backend

1. **Edit `php-backend/config.php`** on server:
   ```php
   define('RAZORPAY_KEY_ID', 'rzp_live_Rx0dB1g3YMVHI0');
   define('RAZORPAY_KEY_SECRET', '917FiE8XMWwrcpG7kzChKObR');
   ```

2. **Set file permissions:**
   ```bash
   chmod 644 php-backend/*.php
   ```

#### Step 3: Test

1. **Visit:** `https://yourdomain.com/`
2. **Test health check:** `https://yourdomain.com/php-backend/health.php`

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-01-05 17:47:00",
  "razorpay_configured": true,
  "php_version": "8.1.0",
  "message": "PHP Backend is working!"
}
```

---

### Option 2: Local Testing (XAMPP/MAMP)

#### Step 1: Install XAMPP/MAMP

- **Windows:** Download [XAMPP](https://www.apachefriends.org/)
- **Mac:** Download [MAMP](https://www.mamp.info/)

#### Step 2: Copy Files

```bash
# Windows (XAMPP)
C:\xampp\htdocs\razorpay\

# Mac (MAMP)
/Applications/MAMP/htdocs/razorpay/
```

#### Step 3: Start Server

1. Open XAMPP/MAMP
2. Start Apache
3. Visit: `http://localhost/razorpay/`

---

## 🧪 Testing

### Test Health Endpoint

```bash
curl https://yourdomain.com/php-backend/health.php
```

Expected:
```json
{
  "status": "OK",
  "razorpay_configured": true,
  "php_version": "8.1.0"
}
```

### Test Create Order

```bash
curl -X POST https://yourdomain.com/php-backend/create-order.php \
  -H "Content-Type: application/json" \
  -d '{"amount": 999, "currency": "INR"}'
```

Expected:
```json
{
  "success": true,
  "orderId": "order_xxxxx",
  "amount": 99900,
  "currency": "INR"
}
```

---

## 🔒 Security

### Important Security Steps:

#### 1. Protect config.php

Add to `.htaccess` in `php-backend/` folder:
```apache
<Files "config.php">
    Order Allow,Deny
    Deny from all
</Files>
```

#### 2. Enable HTTPS

- Get SSL certificate (free from Let's Encrypt)
- Force HTTPS in `.htaccess`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

#### 3. Hide PHP Version

Add to `php.ini`:
```ini
expose_php = Off
```

---

## 🐛 Troubleshooting

### Issue 1: CORS Error

**Solution:** Add to each PHP file (already added):
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

### Issue 2: cURL Not Enabled

**Solution:** Enable in `php.ini`:
```ini
extension=curl
```

Restart Apache.

### Issue 3: 500 Internal Server Error

**Check:**
1. PHP error logs
2. File permissions (should be 644)
3. PHP version (7.4+)

**Enable error reporting temporarily:**
```php
// In config.php
define('ENVIRONMENT', 'development');
```

### Issue 4: Payment Verification Fails

**Check:**
1. RAZORPAY_KEY_SECRET is correct
2. Signature generation logic
3. PHP version supports hash_hmac

---

## 📊 Comparison: Node.js vs PHP

| Feature | Node.js (Old) | PHP (New) |
|---------|--------------|-----------|
| **Hosting** | Requires Node.js support | Works on any hosting |
| **Cost** | Vercel (free) or VPS | cPanel/Hostinger (cheap) |
| **Setup** | Complex | Simple |
| **Compatibility** | Limited hosts | 99% of hosts |
| **Performance** | Faster | Good enough |
| **Security** | Same | Same |

---

## ✅ What Changed?

### Files Modified:
1. ✅ `config.js` - API_BASE_URL changed to `/php-backend`
2. ✅ `script.js` - All API calls updated to PHP files

### Files Created:
1. ✅ `php-backend/config.php`
2. ✅ `php-backend/create-order.php`
3. ✅ `php-backend/verify-payment.php`
4. ✅ `php-backend/create-subscription.php`
5. ✅ `php-backend/verify-subscription.php`
6. ✅ `php-backend/save-to-sheet.php`
7. ✅ `php-backend/health.php`

### Files Removed (Optional):
- ❌ `api/` folder (Node.js serverless functions)
- ❌ `server-standalone.js` (Node.js server)
- ❌ `vercel.json` (Vercel config)
- ❌ `package.json` (Node.js dependencies)

---

## 🎯 Next Steps

1. **Upload to your hosting**
2. **Test health endpoint**
3. **Test payment flow**
4. **Enable HTTPS**
5. **Go live!**

---

## 💡 Pro Tips

### 1. Database Integration

Add to `verify-payment.php`:
```php
// After signature verification
$conn = new mysqli($host, $user, $pass, $db);
$stmt = $conn->prepare("INSERT INTO payments (order_id, payment_id, amount) VALUES (?, ?, ?)");
$stmt->bind_param("ssd", $orderId, $paymentId, $amount);
$stmt->execute();
```

### 2. Email Notifications

Add to `verify-payment.php`:
```php
// After successful payment
mail(
    $customerEmail,
    "Payment Successful",
    "Thank you for your payment!",
    "From: noreply@yourdomain.com"
);
```

### 3. Logging

Add to each PHP file:
```php
// Log all requests
file_put_contents(
    'logs/api.log',
    date('Y-m-d H:i:s') . " - " . json_encode($_POST) . "\n",
    FILE_APPEND
);
```

---

## 📞 Support

If you face any issues:
1. Check PHP error logs
2. Test health endpoint
3. Verify Razorpay credentials
4. Check file permissions

---

**🎉 Your PHP backend is ready to deploy!**

No Node.js needed. Works on any hosting. Simple and secure! 🚀
