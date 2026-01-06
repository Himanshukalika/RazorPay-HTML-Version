# 🎉 MakeUp Mastry Club - Razorpay Subscription System

## ✅ Production Ready - Version 1.0

Complete Razorpay subscription payment system with 5-year validity plans.

---

## 🚀 Features

✅ **4 Subscription Plans** (Monthly, Quarterly, Half-Yearly, Yearly)  
✅ **5-Year Validity** for all plans  
✅ **Razorpay Live Integration** (One-time & Recurring payments)  
✅ **Facebook Pixel Tracking** (All conversion events)  
✅ **Google Sheets Integration** (Automatic data logging)  
✅ **Mobile-Responsive Design**  
✅ **Secure PHP Backend**  
✅ **Thank You Page** with order details  

---

## 📋 Subscription Plans

| Plan | Price | Billing | Cycles | Total Duration |
|------|-------|---------|--------|----------------|
| Monthly | ₹999 | Every 1 month | 60 | 5 years |
| Quarterly | ₹2,799 | Every 3 months | 20 | 5 years |
| Half-Yearly | ₹5,499 | Every 6 months | 10 | 5 years |
| Yearly | ₹9,999 | Every 12 months | 5 | 5 years |

---

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** PHP 8.x
- **Payment Gateway:** Razorpay (Live Mode)
- **Analytics:** Facebook Pixel
- **Data Storage:** Google Sheets
- **Hosting:** Hostinger / cPanel / Any PHP hosting

---

## 📁 Project Structure

```
RazorPay-HTML-Version/
├── index.html              # Main checkout page
├── thank-you.html          # Success page
├── styles.css              # Styling
├── script.js               # Frontend logic
├── config.js               # Configuration
│
├── php-backend/            # PHP Backend
│   ├── .htaccess          # Security config
│   ├── config.php         # PHP configuration
│   ├── create-order.php   # Create Razorpay order
│   ├── create-subscription.php  # Create subscription
│   ├── verify-payment.php # Verify payment
│   ├── verify-subscription.php  # Verify subscription
│   ├── save-to-sheet.php  # Save to Google Sheets
│   └── health.php         # Health check
│
└── public/                # Static assets
    └── images/
```

---

## 🌐 Deployment

See **[HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md)** for complete deployment guide.

**Quick Steps:**
1. Upload all files to `public_html/`
2. Set file permissions (755 for folders, 644 for files)
3. Test backend: `https://yourdomain.com/php-backend/health.php`
4. Test payment flow
5. Go live! 🎉

---

## 🔒 Security

- ✅ Config files protected via `.htaccess`
- ✅ HTTPS enforced
- ✅ API keys secured in PHP config
- ✅ CORS headers configured
- ✅ Input validation on all endpoints

---

## 🧪 Testing

**Local Testing:**
```bash
php -S localhost:8000
```

**Production Testing:**
1. Health check: `https://yourdomain.com/php-backend/health.php`
2. Test each plan with small amount
3. Verify 5-year validity
4. Check Google Sheets data
5. Verify Facebook Pixel events

---

## 📊 Configuration

### Razorpay Plans (LIVE)
```
Monthly:     plan_RzJBh5GIa5TmkJ
Quarterly:   plan_S0S7XoBiJtwYGz
Half-Yearly: plan_Rz0FVXFOF2Oy8y
Yearly:      plan_Rz0GdAGSVQnDCL
```

### API Keys
- Razorpay Key ID: `rzp_live_Rx0dB1g3YMVHI0`
- Facebook Pixel: `2064676100935063`

---

## 📝 Important Notes

⚠️ **LIVE MODE:** All payments are real!  
⚠️ **Backup:** Keep backups before deployment  
⚠️ **SSL:** HTTPS is mandatory  
⚠️ **PHP 7.4+:** Required with cURL extension  

---

## 🎯 Features Breakdown

### Payment Flow
1. User selects plan
2. Fills form (validated)
3. Creates Razorpay subscription
4. Opens Razorpay checkout
5. User completes payment
6. Backend verifies signature
7. Saves to Google Sheets
8. Redirects to thank you page
9. Tracks conversion events

### Facebook Pixel Events
- PageView
- InitiateCheckout
- FormProgress
- AddToCart
- Subscribe
- Purchase
- Lead
- CompleteRegistration

---

## 🚨 Troubleshooting

**Payment fails:**
- Check Razorpay dashboard
- Verify API keys in `php-backend/config.php`

**Wrong validity:**
- Verify billing cycles in Razorpay dashboard
- Check `totalMonths` in `script.js`

**CORS errors:**
- Check `.htaccess` in `php-backend/`
- Verify CORS headers in PHP files

---

## 📞 Support

For issues:
1. Check PHP error logs
2. Check Razorpay dashboard
3. Verify all Plan IDs match

---

## ✅ Production Checklist

- [x] All plans configured (5-year validity)
- [x] Razorpay Live keys configured
- [x] Facebook Pixel configured
- [x] Google Sheets configured
- [x] Mobile number format fixed (+91)
- [x] Debug code removed
- [x] Security configured (.htaccess)
- [x] Tested locally
- [x] Ready for deployment

---

**Version:** 1.0 (Production Ready)  
**Last Updated:** 6 Jan 2026  
**Status:** ✅ Ready to Deploy

🎉 **Your subscription system is production-ready!**
