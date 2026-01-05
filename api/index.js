/**
 * Vercel Serverless Function - Main Handler
 * This exports the Express app as a serverless function
 */

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Root path - redirect to index.html
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// Create Razorpay Order
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
            amount: amount * 100,
            currency: currency || 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                created_at: new Date().toISOString()
            }
        };

        const order = await razorpay.orders.create(options);

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

// Verify Razorpay Payment
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

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            res.json({
                success: true,
                message: 'Payment verified successfully'
            });
        } else {
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

// Create Razorpay Subscription
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

// Verify Razorpay Subscription Payment
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

        const sign = razorpay_payment_id + '|' + razorpay_subscription_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            res.json({
                success: true,
                message: 'Subscription payment verified successfully'
            });
        } else {
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

// Save to Google Sheets
app.post('/api/save-to-sheet', async (req, res) => {
    try {
        const data = req.body;
        console.log('Saving to Google Sheets:', data);

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

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
    });
});

// Export for Vercel
module.exports = app;
