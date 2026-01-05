# 📘 Developer Guide - RazorPay HTML Payment Integration

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Project Structure](#project-structure)
5. [Configuration](#configuration)
6. [Running the Project](#running-the-project)
7. [Dependencies](#dependencies)
8. [Architecture](#architecture)
9. [API Endpoints](#api-endpoints)
10. [Frontend Components](#frontend-components)
11. [Payment Flow](#payment-flow)
12. [Testing](#testing)
13. [Deployment](#deployment)
14. [Troubleshooting](#troubleshooting)
15. [Recent Changes](#recent-changes)

---

## 🎯 Project Overview

**Project Name:** MakeUp Mastry Club - Razorpay Payment Integration  
**Type:** Standalone HTML/CSS/JavaScript Application  
**Purpose:** Membership checkout and payment processing with Razorpay integration  
**Version:** 1.0.0  
**License:** ISC  

### Key Features
- ✅ 4 Membership Plans (Monthly, Quarterly, Half-Yearly, Yearly)
- ✅ Razorpay Payment Gateway Integration (One-time & Subscriptions)
- ✅ Facebook Pixel Event Tracking
- ✅ Google Sheets Data Logging
- ✅ Responsive Design (Mobile & Desktop)
- ✅ Form Validation
- ✅ Dynamic Order Summary
- ✅ Thank You Page with Order Details

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
```bash
Node.js: v14.0.0 or higher
npm: v6.0.0 or higher
```

### Check Your Versions
```bash
node --version
npm --version
```

### Required Accounts
1. **Razorpay Account** - [Sign up here](https://razorpay.com)
   - Get API Key ID and Secret
   - Create subscription plans (if using AutoPay)
2. **Facebook Business Account** (Optional) - For Pixel tracking
3. **Google Account** (Optional) - For Google Sheets integration

---

## 📦 Installation & Setup

### Step 1: Clone/Download the Project
```bash
cd /path/to/your/workspace
# If using git
git clone <repository-url>
cd RazorPay-HTML-Version

# Or simply navigate to the project folder
cd RazorPay-HTML-Version
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install the following packages:
- `express` - Web server framework
- `razorpay` - Razorpay SDK for payment processing
- `cors` - Enable Cross-Origin Resource Sharing
- `dotenv` - Environment variable management

### Step 3: Configure Environment Variables
```bash
# Copy the example file
cp env.example.txt .env

# Edit the .env file with your credentials
nano .env  # or use any text editor
```

### Step 4: Update Configuration Files

**Edit `config.js`:**
```javascript
const CONFIG = {
    RAZORPAY_KEY_ID: 'your_razorpay_key_id',
    RAZORPAY_PLAN_ID_MONTHLY: 'your_monthly_plan_id',
    RAZORPAY_PLAN_ID_QUARTERLY: 'your_quarterly_plan_id',
    RAZORPAY_PLAN_ID_HALFYEARLY: 'your_halfyearly_plan_id',
    RAZORPAY_PLAN_ID_YEARLY: 'your_yearly_plan_id',
    FB_PIXEL_ID: 'your_facebook_pixel_id',
    GOOGLE_SHEET_URL: 'your_google_sheets_webhook_url',
};
```

**Edit `.env`:**
```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=3000
NODE_ENV=development
GOOGLE_SHEET_URL=your_google_sheets_webhook_url
```

---

## 📁 Project Structure

```
RazorPay-HTML-Version/
│
├── 📄 Frontend Files
│   ├── index.html              # Main checkout page (23.9 KB)
│   ├── thank-you.html          # Success/confirmation page (18 KB)
│   ├── styles.css              # All CSS styles (13.7 KB)
│   ├── script.js               # Application logic (25.2 KB)
│   └── config.js               # Frontend configuration (1.4 KB)
│
├── 🔧 Backend Files
│   ├── server-standalone.js    # Express server (10 KB)
│   ├── package.json            # Project dependencies
│   └── .env                    # Environment variables (DO NOT COMMIT)
│
├── 📚 Documentation
│   ├── README.md               # Main documentation
│   ├── README_HTML.md          # Complete HTML docs
│   ├── SETUP_GUIDE.md          # Setup instructions
│   ├── QUICK_START.md          # Quick reference
│   ├── CONVERSION_SUMMARY.md   # Technical details
│   ├── CONFIGURATION_COMPLETE.md
│   └── DEVELOPER_GUIDE.md      # This file
│
├── 🖼️ Assets
│   └── public/
│       ├── chair.jpg
│       ├── *.svg files
│       └── images/
│           ├── achievement-*.png
│           ├── founders.jpg
│           └── kavita.png
│
└── 📦 Dependencies
    └── node_modules/           # Installed packages (auto-generated)
```

---

## ⚙️ Configuration

### Environment Variables (.env)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | ✅ Yes | `rzp_test_xxxxx` or `rzp_live_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret | ✅ Yes | `your_secret_key` |
| `PORT` | Server port number | ❌ No | `3000` (default) |
| `NODE_ENV` | Environment mode | ❌ No | `development` or `production` |
| `GOOGLE_SHEET_URL` | Google Sheets webhook | ❌ No | `https://script.google.com/...` |

### Frontend Configuration (config.js)

| Variable | Description | Required |
|----------|-------------|----------|
| `RAZORPAY_KEY_ID` | Public Razorpay key | ✅ Yes |
| `RAZORPAY_PLAN_ID_*` | Subscription plan IDs | ✅ Yes (for subscriptions) |
| `FB_PIXEL_ID` | Facebook Pixel ID | ❌ No |
| `GOOGLE_SHEETS_ENABLED` | Enable/disable sheets | ❌ No |
| `GOOGLE_SHEET_URL` | Sheets webhook URL | ❌ No |

---

## � How to Create and Change Razorpay Plan IDs

### Understanding Razorpay Plans

Razorpay Plans are required for **subscription-based payments (AutoPay)**. Each plan defines:
- **Billing Period** (monthly, quarterly, yearly, etc.)
- **Amount** to be charged
- **Currency** (INR, USD, etc.)
- **Billing Cycle** (how often to charge)

### Step-by-Step: Creating Razorpay Plans

#### Step 1: Login to Razorpay Dashboard

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Login with your credentials
3. Switch to **Test Mode** or **Live Mode** (top-left corner)

#### Step 2: Navigate to Subscriptions

1. Click on **"Subscriptions"** in the left sidebar
2. Click on **"Plans"** tab
3. Click **"Create Plan"** button

#### Step 3: Create a Plan

Fill in the plan details:

**Example: Monthly Plan**
```
Plan Name: Monthly Membership
Plan Description: Monthly access to Makeup Mastry Club
Billing Period: 1 Month
Amount: ₹999
Currency: INR
Setup Fee: ₹0 (optional)
Trial Period: 0 days (optional)
```

**Example: Quarterly Plan (90 Days)**
```
Plan Name: Growth Plan - Quarterly
Plan Description: 90 days access with bonuses
Billing Period: 3 Months
Amount: ₹2799
Currency: INR
Setup Fee: ₹0
Trial Period: 0 days
```

**Example: Half-Yearly Plan**
```
Plan Name: Professional Track - 6 Months
Plan Description: 6 months access with advanced bonuses
Billing Period: 6 Months
Amount: ₹5499
Currency: INR
```

**Example: Yearly Plan**
```
Plan Name: Career Accelerator - Yearly
Plan Description: 1 year access with full business suite
Billing Period: 12 Months
Amount: ₹9999
Currency: INR
```

#### Step 4: Copy Plan IDs

After creating each plan, you'll see a **Plan ID** like:
- `plan_RscL3cabDhgD7Y` (Monthly)
- `plan_Rz0EcoRgJX8iRp` (Quarterly)
- `plan_Rz0FVXFOF2Oy8y` (Half-Yearly)
- `plan_Rz0GdAGSVQnDCL` (Yearly)

**Copy these Plan IDs** - you'll need them in the next step.

### Step-by-Step: Updating Plan IDs in Your Project

#### Step 1: Update `config.js`

Open `config.js` and update the plan IDs:

```javascript
const CONFIG = {
    // Razorpay Configuration
    RAZORPAY_KEY_ID: 'rzp_live_Rx0dB1g3YMVHI0', // Your Key ID
    
    // 🔄 UPDATE THESE PLAN IDs
    RAZORPAY_PLAN_ID_MONTHLY: 'plan_RscL3cabDhgD7Y',      // ← Replace with your Monthly Plan ID
    RAZORPAY_PLAN_ID_QUARTERLY: 'plan_Rz0EcoRgJX8iRp',    // ← Replace with your Quarterly Plan ID
    RAZORPAY_PLAN_ID_HALFYEARLY: 'plan_Rz0FVXFOF2Oy8y',   // ← Replace with your Half-Yearly Plan ID
    RAZORPAY_PLAN_ID_YEARLY: 'plan_Rz0GdAGSVQnDCL',       // ← Replace with your Yearly Plan ID
    
    // Other configurations...
    FB_PIXEL_ID: '2064676100935063',
    GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/xxxxx/exec',
};
```

#### Step 2: Verify Plan Mapping in `script.js`

Check that the plan selection logic uses the correct plan IDs:

```javascript
// In script.js, find the selectPlan function
function selectPlan(planType) {
    let planId;
    
    switch(planType) {
        case 'monthly':
            planId = CONFIG.RAZORPAY_PLAN_ID_MONTHLY;
            break;
        case 'quarterly':
            planId = CONFIG.RAZORPAY_PLAN_ID_QUARTERLY;
            break;
        case 'halfyearly':
            planId = CONFIG.RAZORPAY_PLAN_ID_HALFYEARLY;
            break;
        case 'yearly':
            planId = CONFIG.RAZORPAY_PLAN_ID_YEARLY;
            break;
    }
    
    // Store selected plan ID
    selectedPlanId = planId;
}
```

#### Step 3: Test the Integration

1. **Restart your server:**
```bash
# Stop the server (Ctrl + C)
# Start again
node server-standalone.js
```

2. **Test each plan:**
```bash
# Open in browser
open http://localhost:3000/index.html

# Test flow:
# 1. Select a plan
# 2. Fill form
# 3. Click "Join Now"
# 4. Use test card: 4111 1111 1111 1111
# 5. Verify subscription is created
```

3. **Verify in Razorpay Dashboard:**
   - Go to **Subscriptions** → **All Subscriptions**
   - Check if new subscription appears with correct plan

### Common Plan Configuration Scenarios

#### Scenario 1: Changing Plan Prices

If you want to change the price of a plan:

**❌ DON'T:** Edit the existing plan (Razorpay doesn't allow this)

**✅ DO:** Create a new plan with the new price

```bash
1. Create new plan in Razorpay Dashboard
   Example: "Monthly Membership v2" - ₹1299
   
2. Copy new Plan ID: plan_NewPlanId123

3. Update config.js:
   RAZORPAY_PLAN_ID_MONTHLY: 'plan_NewPlanId123'

4. Update pricing in index.html:
   <div class="price">₹1,299</div>
```

#### Scenario 2: Adding a New Plan

To add a new plan (e.g., "Weekend Plan"):

```javascript
// 1. Create plan in Razorpay Dashboard
// 2. Add to config.js:
const CONFIG = {
    // ... existing plans
    RAZORPAY_PLAN_ID_WEEKEND: 'plan_NewWeekendPlan123',
};

// 3. Add to index.html (membership plans section)
// 4. Update script.js selectPlan function:
case 'weekend':
    planId = CONFIG.RAZORPAY_PLAN_ID_WEEKEND;
    break;
```

#### Scenario 3: Switching Between Test and Live Plans

**For Testing:**
```javascript
// config.js
RAZORPAY_KEY_ID: 'rzp_test_xxxxx',
RAZORPAY_PLAN_ID_MONTHLY: 'plan_test_monthly_id',
```

**For Production:**
```javascript
// config.js
RAZORPAY_KEY_ID: 'rzp_live_xxxxx',
RAZORPAY_PLAN_ID_MONTHLY: 'plan_live_monthly_id',
```

### Plan ID Verification Checklist

Before going live, verify:

- [ ] All 4 plan IDs are created in Razorpay Dashboard
- [ ] Plan IDs are copied correctly (no typos)
- [ ] Plan IDs match the environment (test/live)
- [ ] Plan amounts match the prices shown in HTML
- [ ] Plan billing periods are correct
- [ ] `config.js` is updated with correct IDs
- [ ] Server is restarted after changes
- [ ] Test payment works for each plan
- [ ] Subscriptions appear in Razorpay Dashboard

### Troubleshooting Plan Issues

#### Issue: "Invalid plan_id" Error

**Cause:** Plan ID doesn't exist or is from wrong environment (test/live)

**Solution:**
```bash
1. Check Razorpay Dashboard mode (Test/Live)
2. Verify Plan ID exists in that mode
3. Copy Plan ID again (check for typos)
4. Update config.js
5. Restart server
```

#### Issue: Plan Amount Mismatch

**Cause:** HTML shows different price than Razorpay plan

**Solution:**
```bash
1. Check plan amount in Razorpay Dashboard
2. Update HTML price to match:
   <div class="price">₹2,799</div>
3. Or create new plan with correct amount
```

#### Issue: Subscription Not Created

**Cause:** Plan ID not passed to API

**Solution:**
```javascript
// In script.js, verify plan ID is sent:
console.log('Selected Plan ID:', selectedPlanId);

// Check API request:
const response = await fetch('/api/razorpay/subscription', {
    method: 'POST',
    body: JSON.stringify({
        plan_id: selectedPlanId, // ← Must be present
        // ... other data
    })
});
```

### Quick Reference: Current Plan IDs

**Live Mode Plans:**
```javascript
Monthly:     plan_RscL3cabDhgD7Y  (₹999)
Quarterly:   plan_Rz0EcoRgJX8iRp  (₹2,799)
Half-Yearly: plan_Rz0FVXFOF2Oy8y  (₹5,499)
Yearly:      plan_Rz0GdAGSVQnDCL  (₹9,999)
```

**Files to Update When Changing Plans:**
1. `config.js` - Plan IDs
2. `index.html` - Plan prices (if changed)
3. `script.js` - Plan selection logic (if adding new plans)

---

## �🚀 Running the Project

### Development Mode

#### Option 1: Using Node.js
```bash
# Navigate to project directory
cd /Users/himanshumac/Desktop/RazorPay-HTML-Version

# Start the server
node server-standalone.js
```

#### Option 2: Using npm (if you add a start script)
```bash
# Add to package.json scripts:
# "start": "node server-standalone.js"

npm start
```

### Server Output
When successfully started, you'll see:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Razorpay Backend Server Running                     ║
║                                                           ║
║   📍 URL: http://localhost:3000                          ║
║   🔧 Environment: production                             ║
║   ✅ Razorpay: Configured                                ║
║                                                           ║
║   📝 Available Endpoints:                                ║
║   - POST /api/razorpay                                   ║
║   - POST /api/razorpay/verify                           ║
║   - POST /api/razorpay/subscription                     ║
║   - POST /api/razorpay/subscription/verify              ║
║   - POST /api/save-to-sheet                             ║
║   - GET  /api/health                                     ║
║                                                           ║
║   🌐 Frontend: http://localhost:3000/index.html         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Access the Application
- **Main Checkout Page:** http://localhost:3000/index.html
- **Thank You Page:** http://localhost:3000/thank-you.html
- **Health Check:** http://localhost:3000/api/health

### Stopping the Server
```bash
# Press Ctrl + C in the terminal
```

---

## 📚 Dependencies

### Production Dependencies

#### 1. **express** (v5.2.1)
```bash
npm install express
```
- **Purpose:** Web server framework for Node.js
- **Usage:** Handles HTTP requests, serves static files, API endpoints
- **Documentation:** https://expressjs.com/

#### 2. **razorpay** (v2.9.6)
```bash
npm install razorpay
```
- **Purpose:** Official Razorpay SDK for Node.js
- **Usage:** Create orders, verify payments, manage subscriptions
- **Documentation:** https://razorpay.com/docs/api/

#### 3. **cors** (v2.8.5)
```bash
npm install cors
```
- **Purpose:** Enable Cross-Origin Resource Sharing
- **Usage:** Allow frontend to communicate with backend API
- **Documentation:** https://www.npmjs.com/package/cors

#### 4. **dotenv** (v17.2.3)
```bash
npm install dotenv
```
- **Purpose:** Load environment variables from .env file
- **Usage:** Secure configuration management
- **Documentation:** https://www.npmjs.com/package/dotenv

### Install All Dependencies
```bash
# Install all at once
npm install express razorpay cors dotenv

# Or use the package.json
npm install
```

### Package.json
```json
{
  "name": "razorpay-html-version",
  "version": "1.0.0",
  "description": "Standalone HTML/CSS/JavaScript Razorpay payment integration",
  "main": "config.js",
  "type": "commonjs",
  "scripts": {
    "start": "node server-standalone.js",
    "dev": "NODE_ENV=development node server-standalone.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "razorpay": "^2.9.6"
  }
}
```

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐
│   User Browser  │
│  (index.html)   │
└────────┬────────┘
         │
         │ HTTP Requests
         │
         ▼
┌─────────────────────────────────┐
│   Express Server (Port 3000)    │
│  (server-standalone.js)         │
├─────────────────────────────────┤
│  Static Files: HTML, CSS, JS    │
│  API Routes: /api/*             │
└────────┬────────────────────────┘
         │
         ├──────────────┬──────────────┬──────────────┐
         │              │              │              │
         ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│  Razorpay    │ │ Facebook │ │  Google  │ │   Database   │
│     API      │ │  Pixel   │ │  Sheets  │ │  (Optional)  │
└──────────────┘ └──────────┘ └──────────┘ └──────────────┘
```

### Frontend Architecture

```javascript
// Main Components
├── HTML Structure (index.html)
│   ├── Header Section
│   ├── Membership Plans
│   ├── Order Summary (Sticky)
│   ├── Registration Form
│   ├── Founders Section
│   └── Testimonials
│
├── CSS Styling (styles.css)
│   ├── Global Styles
│   ├── Component Styles
│   ├── Responsive Media Queries
│   └── Animations
│
└── JavaScript Logic (script.js)
    ├── Plan Selection Handler
    ├── Form Validation
    ├── Payment Processing
    ├── Razorpay Integration
    ├── Facebook Pixel Tracking
    └── Google Sheets Integration
```

### Backend Architecture

```javascript
// server-standalone.js
├── Express App Setup
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   └── Static File Serving
│
├── API Routes
│   ├── POST /api/razorpay
│   ├── POST /api/razorpay/verify
│   ├── POST /api/razorpay/subscription
│   ├── POST /api/razorpay/subscription/verify
│   ├── POST /api/save-to-sheet
│   └── GET /api/health
│
└── Error Handling
```

---

## 🔌 API Endpoints

### 1. Create Payment Order
**Endpoint:** `POST /api/razorpay`

**Request Body:**
```json
{
  "amount": 99900,
  "currency": "INR",
  "receipt": "order_rcptid_11",
  "notes": {
    "name": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210"
  }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_xxxxx",
    "amount": 99900,
    "currency": "INR",
    "receipt": "order_rcptid_11"
  }
}
```

### 2. Verify Payment
**Endpoint:** `POST /api/razorpay/verify`

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

### 3. Create Subscription
**Endpoint:** `POST /api/razorpay/subscription`

**Request Body:**
```json
{
  "plan_id": "plan_xxxxx",
  "customer_notify": 1,
  "total_count": 12,
  "notes": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "subscription": {
    "id": "sub_xxxxx",
    "plan_id": "plan_xxxxx",
    "status": "created"
  }
}
```

### 4. Verify Subscription
**Endpoint:** `POST /api/razorpay/subscription/verify`

**Request Body:**
```json
{
  "razorpay_subscription_id": "sub_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_xxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription verified successfully"
}
```

### 5. Save to Google Sheets
**Endpoint:** `POST /api/save-to-sheet`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "country": "India",
  "state": "Maharashtra",
  "plan": "Growth Plan",
  "amount": 2799,
  "orderId": "order_xxxxx",
  "paymentId": "pay_xxxxx"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data saved successfully"
}
```

### 6. Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-05T13:54:18.000Z",
  "razorpay": "configured"
}
```

---

## 🎨 Frontend Components

### 1. Membership Plans Component
**Location:** `index.html` (Lines ~50-150)

**Features:**
- 4 plan options with pricing
- Highlight "Best Choice" plan
- Dynamic selection handling
- Bonus features display

**JavaScript Handler:**
```javascript
// script.js
function selectPlan(planType) {
    // Update selected plan
    // Calculate total amount
    // Update order summary
    // Track Facebook Pixel event
}
```

### 2. Order Summary Component
**Location:** `index.html` (Sidebar)

**Features:**
- Sticky positioning
- Dynamic price updates
- Plan details display
- Responsive design

### 3. Registration Form
**Location:** `index.html` (Form section)

**Fields:**
- First Name & Last Name
- Email Address
- Mobile Number
- Country & State

**Validation:**
```javascript
// script.js
function validateForm() {
    // Email validation
    // Phone validation
    // Required field checks
}
```

### 4. Payment Handler
**Location:** `script.js`

**Flow:**
```javascript
async function handlePayment() {
    // 1. Validate form
    // 2. Create order/subscription
    // 3. Open Razorpay checkout
    // 4. Handle payment response
    // 5. Verify payment
    // 6. Save to Google Sheets
    // 7. Redirect to thank-you page
}
```

---

## 💳 Payment Flow

### One-Time Payment Flow

```
1. User selects plan
   ↓
2. User fills registration form
   ↓
3. User clicks "Join Now"
   ↓
4. Frontend validates form
   ↓
5. Frontend calls POST /api/razorpay
   ↓
6. Backend creates Razorpay order
   ↓
7. Frontend opens Razorpay checkout
   ↓
8. User completes payment
   ↓
9. Razorpay callback with payment details
   ↓
10. Frontend calls POST /api/razorpay/verify
    ↓
11. Backend verifies signature
    ↓
12. Frontend saves to Google Sheets
    ↓
13. Redirect to thank-you.html
```

### Subscription Payment Flow

```
1. User selects plan with AutoPay
   ↓
2. User fills registration form
   ↓
3. Frontend calls POST /api/razorpay/subscription
   ↓
4. Backend creates subscription
   ↓
5. Frontend opens Razorpay checkout
   ↓
6. User completes payment
   ↓
7. Frontend calls POST /api/razorpay/subscription/verify
   ↓
8. Backend verifies subscription
   ↓
9. Save to Google Sheets
   ↓
10. Redirect to thank-you.html
```

---

## 🧪 Testing

### Test Mode Setup

1. **Use Test API Keys:**
```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=test_secret_xxxxx
```

2. **Test Cards:**
```
Success: 4111 1111 1111 1111
Failure: 4111 1111 1111 1234
CVV: Any 3 digits
Expiry: Any future date
```

### Testing Checklist

- [ ] Plan selection updates order summary
- [ ] Form validation works correctly
- [ ] Payment modal opens
- [ ] Test card payment succeeds
- [ ] Payment verification works
- [ ] Google Sheets integration saves data
- [ ] Thank you page displays correct details
- [ ] Facebook Pixel events fire
- [ ] Subscription creation works
- [ ] Mobile responsive design

### Manual Testing

```bash
# 1. Start server
node server-standalone.js

# 2. Open browser
open http://localhost:3000/index.html

# 3. Test payment flow
# - Select a plan
# - Fill form
# - Use test card
# - Verify success page
```

### API Testing with cURL

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test create order
curl -X POST http://localhost:3000/api/razorpay \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 99900,
    "currency": "INR",
    "receipt": "test_receipt_1"
  }'
```

---

## 🚢 Deployment

### Deployment Checklist

- [ ] Update `.env` with production credentials
- [ ] Update `config.js` with production keys
- [ ] Set `NODE_ENV=production`
- [ ] Test all payment flows
- [ ] Enable HTTPS
- [ ] Configure domain
- [ ] Set up monitoring
- [ ] Configure backup

### Deployment Options

#### Option 1: Traditional Hosting (cPanel, Hostinger, etc.)

1. **Upload Files:**
```bash
# Upload all files except:
# - node_modules/ (will install on server)
# - .env (create on server)
# - .git/ (if exists)
```

2. **Install Dependencies on Server:**
```bash
ssh user@your-server.com
cd /path/to/project
npm install
```

3. **Configure Environment:**
```bash
# Create .env file on server
nano .env
# Add production credentials
```

4. **Start Server:**
```bash
# Using PM2 (recommended)
npm install -g pm2
pm2 start server-standalone.js --name razorpay-app
pm2 save
pm2 startup

# Or using node
node server-standalone.js &
```

#### Option 2: Cloud Platforms (Heroku, Railway, Render)

1. **Create `Procfile`:**
```
web: node server-standalone.js
```

2. **Set Environment Variables:**
```bash
# In platform dashboard, add:
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
NODE_ENV=production
```

3. **Deploy:**
```bash
# Heroku example
heroku create your-app-name
git push heroku main
```

#### Option 3: VPS (DigitalOcean, AWS EC2, Linode)

1. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Clone/Upload Project:**
```bash
git clone <your-repo>
cd RazorPay-HTML-Version
npm install
```

3. **Configure Nginx (Reverse Proxy):**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Start with PM2:**
```bash
pm2 start server-standalone.js
pm2 startup
pm2 save
```

### Production Environment Variables

```env
# Production .env
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=live_secret_xxxxx
PORT=3000
NODE_ENV=production
GOOGLE_SHEET_URL=https://script.google.com/macros/s/xxxxx/exec
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Server Won't Start
```bash
# Error: Port already in use
# Solution: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 node server-standalone.js
```

#### 2. Payment Verification Fails
```bash
# Check:
# - API keys match in .env and config.js
# - Signature verification logic
# - Network connectivity

# Debug:
console.log('Order ID:', razorpay_order_id);
console.log('Payment ID:', razorpay_payment_id);
console.log('Signature:', razorpay_signature);
```

#### 3. CORS Errors
```javascript
// Ensure CORS is enabled in server-standalone.js
app.use(cors({
    origin: '*', // Or specify your domain
    methods: ['GET', 'POST']
}));
```

#### 4. Google Sheets Not Saving
```bash
# Check:
# - GOOGLE_SHEET_URL is correct
# - Google Apps Script is deployed
# - Network connectivity

# Test webhook:
curl -X POST "YOUR_GOOGLE_SHEET_URL" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

#### 5. Facebook Pixel Not Tracking
```javascript
// Check:
// - FB_PIXEL_ID is correct in config.js
// - fbq is loaded in HTML
// - Browser console for errors

// Debug:
console.log('FB Pixel ID:', CONFIG.FB_PIXEL_ID);
console.log('fbq available:', typeof fbq !== 'undefined');
```

### Debug Mode

Enable detailed logging:
```javascript
// In script.js, add:
const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log('[DEBUG]', ...args);
}

// Use throughout code:
log('Plan selected:', planType);
log('Order created:', orderData);
```

---

## 📝 Recent Changes

### Version 1.0.0 (Current)

#### Features Added
- ✅ Complete Razorpay integration (one-time + subscriptions)
- ✅ Facebook Pixel tracking
- ✅ Google Sheets integration
- ✅ Responsive design
- ✅ Form validation
- ✅ Thank you page
- ✅ 4 membership plans

#### Configuration Updates
- Updated to LIVE Razorpay credentials
- Added subscription plan IDs
- Configured Facebook Pixel
- Set up Google Sheets webhook

#### Bug Fixes
- Fixed CORS issues
- Improved error handling
- Enhanced form validation
- Fixed mobile responsiveness

#### Known Issues
- None currently

#### Upcoming Features
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Coupon code system

---

## 📞 Support & Contact

### Documentation Files
- `README.md` - Main documentation
- `SETUP_GUIDE.md` - Detailed setup
- `QUICK_START.md` - Quick reference
- `README_HTML.md` - Complete HTML docs
- `DEVELOPER_GUIDE.md` - This file

### External Resources
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Facebook Pixel Setup](https://www.facebook.com/business/help/952192354843755)

### Contact
- **Email:** support@makeupmastryclub.com
- **Website:** https://makeupmastryclub.com

---

## 📄 License

ISC License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Razorpay** - Payment gateway
- **Express.js** - Web framework
- **Facebook** - Pixel tracking
- **Google** - Sheets integration

---

**Last Updated:** January 5, 2026  
**Maintained By:** MakeUp Mastry Club Development Team

---

## 🎓 Quick Commands Reference

```bash
# Installation
npm install

# Run server
node server-standalone.js

# Check health
curl http://localhost:3000/api/health

# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Production deployment
NODE_ENV=production node server-standalone.js

# Using PM2
pm2 start server-standalone.js --name razorpay-app
pm2 logs razorpay-app
pm2 restart razorpay-app
pm2 stop razorpay-app
```

---

**Happy Coding! 🚀**
