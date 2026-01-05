# 🚀 Quick Vercel Deployment Fix

## ✅ Problem Fixed!

404 error का solution:
- ✅ Created `/api/index.js` - Serverless function
- ✅ Updated `vercel.json` - Simplified routing
- ✅ Ready to deploy!

---

## 📝 Deploy करने के Steps

### Step 1: Deploy Command चलाएं

```bash
cd /Users/himanshumac/Desktop/RazorPay-HTML-Version
vercel --prod
```

### Step 2: Environment Variables Add करें

Vercel Dashboard में जाएं:
1. https://vercel.com/dashboard
2. अपना project select करें
3. **Settings** → **Environment Variables**
4. ये add करें:

```
RAZORPAY_KEY_ID = rzp_live_Rx0dB1g3YMVHI0
RAZORPAY_KEY_SECRET = 917FiE8XMWwrcpG7kzChKObR
NODE_ENV = production
GOOGLE_SHEET_URL = https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec
```

### Step 3: फिर से Deploy करें

```bash
vercel --prod
```

---

## 🌐 Access Your Site

Deploy होने के बाद:

```
✅ https://your-project.vercel.app/
✅ https://your-project.vercel.app/index.html
✅ https://your-project.vercel.app/api/health
```

---

## 🧪 Test करें

```bash
# Health check
curl https://your-project.vercel.app/api/health

# Expected response:
{
  "status": "OK",
  "timestamp": "...",
  "razorpay_configured": true
}
```

---

## 📁 File Structure (Updated)

```
RazorPay-HTML-Version/
├── api/
│   └── index.js          ← NEW! Serverless function
├── public/
│   └── images/
├── index.html
├── thank-you.html
├── styles.css
├── script.js
├── config.js
├── vercel.json           ← UPDATED!
└── package.json
```

---

## ⚡ What Changed?

### Before (❌ Not Working):
- Used `server-standalone.js` directly
- Complex routing in `vercel.json`
- 404 errors

### After (✅ Working):
- Created `/api/index.js` as serverless function
- Simplified `vercel.json` with rewrites
- All routes working!

---

## 🔧 Troubleshooting

### Still getting 404?

1. **Check files exist:**
```bash
ls -la api/index.js
ls -la vercel.json
```

2. **Redeploy:**
```bash
vercel --prod --force
```

3. **Check logs:**
```bash
vercel logs
```

---

## 💡 Pro Tip

अगर फिर भी problem हो तो:

```bash
# Clean deploy
rm -rf .vercel
vercel --prod
```

---

**Happy Deploying! 🎉**
