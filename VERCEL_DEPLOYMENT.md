# 🚀 Vercel Deployment Guide - RazorPay HTML Version

## 📋 Pre-Deployment Checklist

- [x] `vercel.json` created ✅
- [x] `.vercelignore` created ✅
- [ ] Environment variables ready
- [ ] Razorpay credentials ready
- [ ] Test mode verified

---

## 🔧 Step-by-Step Deployment

### Step 1: Install Vercel CLI (One-time)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Or use without installing
npx vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

यह आपका browser खोलेगा - वहां login करें।

### Step 3: Deploy to Vercel

```bash
# Navigate to project folder
cd /Users/himanshumac/Desktop/RazorPay-HTML-Version

# Deploy (first time)
vercel

# Follow the prompts:
# ? Set up and deploy "~/Desktop/RazorPay-HTML-Version"? [Y/n] Y
# ? Which scope do you want to deploy to? [Select your account]
# ? Link to existing project? [N]
# ? What's your project's name? razorpay-payment
# ? In which directory is your code located? ./
```

### Step 4: Add Environment Variables

Vercel dashboard में जाकर या CLI से:

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/dashboard
2. Select your project: `razorpay-payment`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
RAZORPAY_KEY_ID = rzp_live_Rx0dB1g3YMVHI0
RAZORPAY_KEY_SECRET = 917FiE8XMWwrcpG7kzChKObR
NODE_ENV = production
PORT = 3000
GOOGLE_SHEET_URL = https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec
```

#### Option B: Using CLI

```bash
# Add environment variables
vercel env add RAZORPAY_KEY_ID
# Enter value: rzp_live_Rx0dB1g3YMVHI0

vercel env add RAZORPAY_KEY_SECRET
# Enter value: 917FiE8XMWwrcpG7kzChKObR

vercel env add NODE_ENV
# Enter value: production

vercel env add GOOGLE_SHEET_URL
# Enter value: https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec
```

### Step 5: Redeploy with Environment Variables

```bash
# Deploy to production
vercel --prod
```

---

## 🌐 Access Your Deployed App

After deployment, you'll get URLs like:

```
✅ Preview: https://razorpay-payment-xxxxx.vercel.app
✅ Production: https://razorpay-payment.vercel.app
```

**Main Page:** `https://your-project.vercel.app/index.html`

---

## 🔍 Troubleshooting

### Issue 1: 404 NOT_FOUND Error ❌

**Problem:** यही error आ रहा है जो आपको मिला

**Solution:**

1. Check `vercel.json` exists:
```bash
ls -la vercel.json
```

2. Verify `vercel.json` content:
```bash
cat vercel.json
```

3. Redeploy:
```bash
vercel --prod
```

### Issue 2: Environment Variables Not Working

**Solution:**
```bash
# Check if env vars are set
vercel env ls

# Pull env vars locally (for testing)
vercel env pull
```

### Issue 3: API Routes Not Working

**Check:**
- `/api/health` endpoint
- Browser console for errors
- Vercel function logs

**View Logs:**
```bash
vercel logs
```

Or visit: https://vercel.com/dashboard → Your Project → Deployments → View Logs

### Issue 4: Static Files Not Loading

**Solution:**

Make sure `server-standalone.js` serves static files:
```javascript
app.use(express.static(__dirname));
```

---

## 📝 Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel remove [deployment-url]

# Check environment variables
vercel env ls

# Pull environment variables
vercel env pull
```

---

## 🧪 Testing After Deployment

### 1. Test Health Endpoint
```bash
curl https://your-project.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-05T...",
  "razorpay": "configured"
}
```

### 2. Test Main Page
Visit: `https://your-project.vercel.app/index.html`

### 3. Test Payment Flow
1. Select a plan
2. Fill form
3. Use test card: `4111 1111 1111 1111`
4. Complete payment
5. Verify redirect to thank-you page

---

## 🔒 Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Environment variables set in Vercel dashboard
- [ ] Using LIVE Razorpay keys (not test)
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured properly

---

## 🎯 Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain: `payment.yourdomain.com`
6. Follow DNS configuration instructions

---

## 📊 Monitoring

### View Analytics
- Go to: https://vercel.com/dashboard
- Select your project
- Click **Analytics** tab

### View Function Logs
- Go to: https://vercel.com/dashboard
- Select your project
- Click **Deployments**
- Click on a deployment
- Click **View Function Logs**

---

## 🔄 Update Deployment

When you make changes:

```bash
# Method 1: Automatic (if connected to Git)
git add .
git commit -m "Update payment flow"
git push origin main
# Vercel will auto-deploy

# Method 2: Manual
vercel --prod
```

---

## 💡 Pro Tips

1. **Use Git Integration:**
   - Connect your GitHub/GitLab repo
   - Auto-deploy on push
   - Preview deployments for PRs

2. **Environment-specific configs:**
   ```bash
   # Development
   vercel env add MY_VAR development
   
   # Production
   vercel env add MY_VAR production
   ```

3. **Custom Build Command:**
   Add to `vercel.json`:
   ```json
   {
     "buildCommand": "npm install"
   }
   ```

---

## 🆘 Common Errors & Solutions

### Error: "No such file or directory"
```bash
# Make sure you're in the right directory
cd /Users/himanshumac/Desktop/RazorPay-HTML-Version
pwd
```

### Error: "Failed to build"
```bash
# Check package.json is valid
cat package.json

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Error: "Function timeout"
```bash
# Increase timeout in vercel.json
{
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10
    }
  }
}
```

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/vercel/discussions

---

## ✅ Deployment Success Checklist

After deployment, verify:

- [ ] Main page loads: `/index.html`
- [ ] Thank you page loads: `/thank-you.html`
- [ ] Health endpoint works: `/api/health`
- [ ] Payment creation works: `/api/razorpay`
- [ ] Payment verification works: `/api/razorpay/verify`
- [ ] Subscription creation works: `/api/razorpay/subscription`
- [ ] Google Sheets integration works
- [ ] Facebook Pixel tracking works
- [ ] Mobile responsive design works
- [ ] All images load correctly

---

**Last Updated:** January 5, 2026  
**Deployment Platform:** Vercel  
**Project:** RazorPay HTML Payment Integration

---

## 🎉 You're All Set!

Your payment system is now live on Vercel! 🚀

**Next Steps:**
1. Test all payment flows
2. Monitor logs for errors
3. Set up custom domain (optional)
4. Enable analytics
5. Share the link with users!

Happy Deploying! 💪
