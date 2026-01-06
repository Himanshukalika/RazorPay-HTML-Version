# 🔧 Configuration Guide - Change Credentials

## 📋 Complete Guide to Update All Credentials

This guide will help you update all API keys, credentials, and configuration for your own project.

---

## 🎯 What You Need

Before starting, gather these credentials:

1. **Razorpay API Keys** (Live or Test)
2. **Razorpay Plan IDs** (4 plans: Monthly, Quarterly, Half-Yearly, Yearly)
3. **Facebook Pixel ID** (optional)
4. **Google Sheets Web App URL** (optional)
5. **Thank You Page URL** (external redirect)

---

## 📝 Step-by-Step Configuration

### **Step 1: Update Razorpay API Keys**

#### **File 1: `config.js`**

Location: `/config.js` (Line 6)

```javascript
// OLD
RAZORPAY_KEY_ID: 'rzp_live_Rx0dB1g3YMVHI0',

// NEW - Replace with YOUR key
RAZORPAY_KEY_ID: 'rzp_live_YOUR_KEY_ID_HERE',
```

**How to get:**
1. Login to Razorpay Dashboard: https://dashboard.razorpay.com
2. Go to: Settings → API Keys
3. Copy "Key ID"

---

#### **File 2: `php-backend/config.php`**

Location: `/php-backend/config.php` (Lines 10-11)

```php
// OLD
define('RAZORPAY_KEY_ID', 'rzp_live_Rx0dB1g3YMVHI0');
define('RAZORPAY_KEY_SECRET', '917FiE8XMWwrcpG7kzChKObR');

// NEW - Replace with YOUR credentials
define('RAZORPAY_KEY_ID', 'rzp_live_YOUR_KEY_ID_HERE');
define('RAZORPAY_KEY_SECRET', 'YOUR_KEY_SECRET_HERE');
```

**⚠️ IMPORTANT:** Keep Key Secret private! Never commit to Git!

---

#### **File 3: `.env`** (Optional - for reference)

Location: `/.env` (Lines 2-3)

```env
# OLD
RAZORPAY_KEY_ID=rzp_live_Rx0dB1g3YMVHI0
RAZORPAY_KEY_SECRET=917FiE8XMWwrcpG7kzChKObR

# NEW - Replace with YOUR credentials
RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
```

---

### **Step 2: Create Razorpay Subscription Plans**

You need to create 4 plans in Razorpay Dashboard with 5-year validity.

#### **Plan 1: Monthly (₹999)**

1. Go to: Razorpay Dashboard → Subscriptions → Plans
2. Click: "+ New Plan"
3. Fill:
   ```
   Plan Name: Monthly Membership (5 Years)
   Amount: ₹999
   Billing Interval: Every 1 Month
   Total Billing Cycles: 60
   ```
4. Click: "Create Plan"
5. **Copy Plan ID** (e.g., `plan_ABC123XYZ`)

#### **Plan 2: Quarterly (₹2799)**

```
Plan Name: Quarterly Membership (5 Years)
Amount: ₹2799
Billing Interval: Every 3 Months
Total Billing Cycles: 20
```

#### **Plan 3: Half-Yearly (₹5499)**

```
Plan Name: Half-Yearly Membership (5 Years)
Amount: ₹5499
Billing Interval: Every 6 Months
Total Billing Cycles: 10
```

#### **Plan 4: Yearly (₹9999)**

```
Plan Name: Yearly Membership (5 Years)
Amount: ₹9999
Billing Interval: Every 12 Months
Total Billing Cycles: 5
```

---

### **Step 3: Update Razorpay Plan IDs**

#### **File: `config.js`**

Location: `/config.js` (Lines 9-12)

```javascript
// OLD
RAZORPAY_PLAN_ID_MONTHLY: 'plan_RzJBh5GIa5TmkJ',
RAZORPAY_PLAN_ID_QUARTERLY: 'plan_S0S7XoBiJtwYGz',
RAZORPAY_PLAN_ID_HALFYEARLY: 'plan_Rz0FVXFOF2Oy8y',
RAZORPAY_PLAN_ID_YEARLY: 'plan_Rz0GdAGSVQnDCL',

// NEW - Replace with YOUR Plan IDs
RAZORPAY_PLAN_ID_MONTHLY: 'plan_YOUR_MONTHLY_PLAN_ID',
RAZORPAY_PLAN_ID_QUARTERLY: 'plan_YOUR_QUARTERLY_PLAN_ID',
RAZORPAY_PLAN_ID_HALFYEARLY: 'plan_YOUR_HALFYEARLY_PLAN_ID',
RAZORPAY_PLAN_ID_YEARLY: 'plan_YOUR_YEARLY_PLAN_ID',
```

---

### **Step 4: Update Facebook Pixel ID** (Optional)

#### **File 1: `config.js`**

Location: `/config.js` (Line 15)

```javascript
// OLD
FB_PIXEL_ID: '2064676100935063',

// NEW - Replace with YOUR Pixel ID
FB_PIXEL_ID: 'YOUR_PIXEL_ID_HERE',
```

**How to get:**
1. Go to: Facebook Events Manager
2. Select your Pixel
3. Copy Pixel ID

---

#### **File 2: `index.html`**

Location: `/index.html` (Line 26)

```javascript
// OLD
fbq('init', '2064676100935063');

// NEW
fbq('init', 'YOUR_PIXEL_ID_HERE');
```

Also update Line 31:
```html
<!-- OLD -->
<img src="https://www.facebook.com/tr?id=2064676100935063&ev=PageView&noscript=1" alt="">

<!-- NEW -->
<img src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1" alt="">
```

---

### **Step 5: Update Google Sheets URL** (Optional)

#### **File 1: `config.js`**

Location: `/config.js` (Lines 21-22)

```javascript
// OLD
GOOGLE_SHEETS_ENABLED: true,
GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec',

// NEW
GOOGLE_SHEETS_ENABLED: true,  // Set to false to disable
GOOGLE_SHEET_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
```

**How to create Google Sheets integration:**
1. Create a Google Sheet
2. Go to: Extensions → Apps Script
3. Paste this code:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     
     sheet.appendRow([
       new Date(),
       data.firstName,
       data.lastName,
       data.email,
       data.mobile,
       data.plan,
       data.amount,
       data.subscriptionId || data.orderId,
       data.paymentId
     ]);
     
     return ContentService.createTextOutput(JSON.stringify({success: true}));
   }
   ```
4. Deploy as Web App
5. Copy Web App URL

---

#### **File 2: `php-backend/config.php`**

Location: `/php-backend/config.php` (Line 14)

```php
// OLD
define('GOOGLE_SHEET_URL', 'https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec');

// NEW
define('GOOGLE_SHEET_URL', 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE');
```

---

### **Step 6: Update Thank You Page URL**

#### **File: `script.js`**

Location: `/script.js` (Lines 545 & 648)

**Subscription Payment Redirect (Line 545):**
```javascript
// OLD
window.location.href = `https://membership.hsmschoolmakeup.in/thank-you-asa/?${params.toString()}`;

// NEW
window.location.href = `https://YOUR-DOMAIN.com/thank-you/?${params.toString()}`;
```

**One-Time Payment Redirect (Line 648):**
```javascript
// OLD
window.location.href = `https://membership.hsmschoolmakeup.in/thank-you-asa/?${params.toString()}`;

// NEW
window.location.href = `https://YOUR-DOMAIN.com/thank-you/?${params.toString()}`;
```

---

### **Step 7: Update Plan Prices & Names** (Optional)

#### **File: `script.js`**

Location: `/script.js` (Lines 19-102)

```javascript
// Example: Monthly Plan
monthly: {
    id: 'monthly',
    name: 'Monthly Membership',        // Change name
    price: 999,                        // Change price
    duration: '1 Month',
    totalMonths: 60,                   // Keep 60 for 5 years
    savings: null,
    popular: false,
    description: 'Try it out',         // Change description
    subtitle: 'Suitable for dabblers', // Change subtitle
    razorpayPlanId: CONFIG.RAZORPAY_PLAN_ID_MONTHLY,
}
```

**Update all 4 plans:**
- Monthly (Lines 20-34)
- Quarterly (Lines 35-59)
- Half-Yearly (Lines 60-80)
- Yearly (Lines 81-101)

---

## 🔒 Security Checklist

After updating credentials:

- [ ] Never commit `.env` file to Git
- [ ] Add `.env` to `.gitignore`
- [ ] Keep Razorpay Key Secret private
- [ ] Use HTTPS in production
- [ ] Test with small amounts first
- [ ] Verify all Plan IDs are correct
- [ ] Check Google Sheets integration
- [ ] Test Facebook Pixel events

---

## 🧪 Testing After Configuration

### **1. Test Backend Health**

Visit: `http://localhost:8000/php-backend/health.php`

Expected:
```json
{
  "status": "OK",
  "razorpay_configured": true,
  "php_version": "8.x"
}
```

### **2. Test Payment Flow**

1. Fill form with test data
2. Select any plan
3. Click "Complete Order"
4. Razorpay checkout should open
5. Complete payment
6. Should redirect to your thank you page
7. Check Google Sheets for data
8. Check Facebook Pixel events in browser console

---

## 📋 Quick Reference - Files to Update

| File | What to Update | Lines |
|------|---------------|-------|
| `config.js` | Razorpay Keys, Plan IDs, Pixel ID, Sheets URL | 6, 9-12, 15, 22 |
| `php-backend/config.php` | Razorpay Keys, Sheets URL | 10-11, 14 |
| `index.html` | Facebook Pixel ID | 26, 31 |
| `script.js` | Thank You URL, Plan Details | 545, 648, 19-102 |
| `.env` | Razorpay Keys, Sheets URL | 2-3, 10 |

---

## 🚨 Common Mistakes to Avoid

1. ❌ Using Test keys in production
2. ❌ Wrong Plan IDs (must match Razorpay dashboard)
3. ❌ Forgetting to update both `config.js` AND `php-backend/config.php`
4. ❌ Not setting correct billing cycles (60, 20, 10, 5)
5. ❌ Committing sensitive keys to Git
6. ❌ Not testing before going live

---

## ✅ Configuration Complete Checklist

- [ ] Razorpay API Keys updated in `config.js`
- [ ] Razorpay API Keys updated in `php-backend/config.php`
- [ ] 4 Subscription Plans created in Razorpay
- [ ] Plan IDs updated in `config.js`
- [ ] Facebook Pixel ID updated (if using)
- [ ] Google Sheets URL updated (if using)
- [ ] Thank You Page URL updated
- [ ] Plan prices/names customized (if needed)
- [ ] Backend health check passes
- [ ] Test payment successful
- [ ] Tracking events working
- [ ] Google Sheets receiving data
- [ ] Ready for deployment

---

## 📞 Support

If you face issues:

1. Check all credentials are correct
2. Verify Plan IDs match Razorpay dashboard
3. Test backend health endpoint
4. Check browser console for errors
5. Verify PHP version (7.4+)

---

## 🎉 You're Ready!

After updating all credentials, your payment system is ready to deploy!

**Test thoroughly before going live!**

---

**Last Updated:** 6 Jan 2026  
**Version:** 1.0  
**For:** Developer Configuration Guide
