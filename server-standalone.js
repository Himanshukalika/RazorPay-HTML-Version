/**
 * Simple Express Backend for Razorpay Integration
 * 
 * This is a standalone backend server that provides API endpoints
 * for the HTML/CSS/JavaScript frontend.
 * 
 * SETUP:
 * 1. Install dependencies: npm install express razorpay cors dotenv
 * 2. Create a .env file with your Razorpay credentials
 * 3. Run: node server-standalone.js
 */

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ============================================
// API ROUTES
// ============================================

/**
 * Create Razorpay Order (One-time Payment)
 * POST /api/razorpay
 */
app.post('/api/razorpay', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount) {
            return res.status(400).json({
                success: false,
                error: 'Amount is required'
            });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency || 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                created_at: new Date().toISOString()
            }
        };

        const order = await razorpay.orders.create(options);

        console.log('Order created:', order.id);

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create order'
        });
    }
});

/**
 * Verify Razorpay Payment
 * POST /api/razorpay/verify
 */
app.post('/api/razorpay/verify', (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters'
            });
        }

        // Create signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        // Verify signature
        if (razorpay_signature === expectedSign) {
            console.log('Payment verified:', razorpay_payment_id);

            // TODO: Save payment details to database
            // TODO: Send confirmation email
            // TODO: Grant access to user

            res.json({
                success: true,
                message: 'Payment verified successfully'
            });
        } else {
            console.error('Invalid signature');
            res.status(400).json({
                success: false,
                error: 'Invalid signature'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to verify payment'
        });
    }
});

/**
 * Create Razorpay Subscription
 * POST /api/razorpay/subscription
 */
app.post('/api/razorpay/subscription', async (req, res) => {
    try {
        const { planId, totalCount, notes } = req.body;

        if (!planId) {
            return res.status(400).json({
                success: false,
                error: 'Plan ID is required'
            });
        }

        const options = {
            plan_id: planId,
            total_count: totalCount || 12,
            quantity: 1,
            customer_notify: 1,
            notes: notes || {}
        };

        const subscription = await razorpay.subscriptions.create(options);

        console.log('Subscription created:', subscription.id);

        res.json({
            success: true,
            subscriptionId: subscription.id
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create subscription'
        });
    }
});

/**
 * Verify Razorpay Subscription Payment
 * POST /api/razorpay/subscription/verify
 */
app.post('/api/razorpay/subscription/verify', (req, res) => {
    try {
        const {
            razorpay_subscription_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_subscription_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters'
            });
        }

        // Create signature
        const sign = razorpay_payment_id + '|' + razorpay_subscription_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        // Verify signature
        if (razorpay_signature === expectedSign) {
            console.log('Subscription payment verified:', razorpay_payment_id);

            // TODO: Save subscription details to database
            // TODO: Send confirmation email
            // TODO: Grant access to user

            res.json({
                success: true,
                message: 'Subscription payment verified successfully'
            });
        } else {
            console.error('Invalid signature');
            res.status(400).json({
                success: false,
                error: 'Invalid signature'
            });
        }
    } catch (error) {
        console.error('Error verifying subscription:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to verify subscription'
        });
    }
});

/**
 * Save to Google Sheets (Optional)
 * POST /api/save-to-sheet
 */
app.post('/api/save-to-sheet', async (req, res) => {
    try {
        const data = req.body;

        console.log('Saving to Google Sheets:', data);

        // TODO: Implement Google Sheets API integration
        // For now, just log the data

        res.json({
            success: true,
            message: 'Data logged (Google Sheets integration pending)'
        });
    } catch (error) {
        console.error('Error saving to sheet:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to save to sheet'
        });
    }
});

// ============================================
// ROOT PATH - Redirect to index.html
// ============================================

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
    });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Razorpay Backend Server Running                     ║
║                                                           ║
║   📍 URL: http://localhost:${PORT}                        ║
║   🔧 Environment: ${process.env.NODE_ENV || 'development'}                      ║
║   ✅ Razorpay: ${process.env.RAZORPAY_KEY_ID ? 'Configured' : 'NOT CONFIGURED'}                    ║
║                                                           ║
║   📝 Available Endpoints:                                ║
║   - POST /api/razorpay                                   ║
║   - POST /api/razorpay/verify                           ║
║   - POST /api/razorpay/subscription                     ║
║   - POST /api/razorpay/subscription/verify              ║
║   - POST /api/save-to-sheet                             ║
║   - GET  /api/health                                     ║
║                                                           ║
║   🌐 Frontend: http://localhost:${PORT}/index.html        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.warn(`
⚠️  WARNING: Razorpay credentials not configured!
Please create a .env file with:
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
        `);
    }
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    process.exit(0);
});
