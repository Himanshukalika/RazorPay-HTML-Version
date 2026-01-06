// Configuration File
// Live API Credentials - MakeUp Mastry Club

const CONFIG = {
    // Razorpay Configuration (LIVE MODE)
    RAZORPAY_KEY_ID: 'rzp_live_Rx0dB1g3YMVHI0',

    // Razorpay Plan IDs for subscriptions (LIVE)
    RAZORPAY_PLAN_ID_MONTHLY: 'plan_RzJBh5GIa5TmkJ',
    RAZORPAY_PLAN_ID_QUARTERLY: 'plan_S0S7XoBiJtwYGz',
    RAZORPAY_PLAN_ID_HALFYEARLY: 'plan_Rz0FVXFOF2Oy8y',
    RAZORPAY_PLAN_ID_YEARLY: 'plan_Rz0GdAGSVQnDCL',

    // Facebook Pixel ID
    FB_PIXEL_ID: '2064676100935063',

    // API Endpoints (PHP Backend)
    API_BASE_URL: '/php-backend',

    // Google Sheets Configuration
    GOOGLE_SHEETS_ENABLED: true,
    GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec',
};

// Facebook Pixel Helper Functions
const FacebookPixel = {
    trackEvent: function (eventName, data = {}) {
        if (typeof fbq !== 'undefined' && CONFIG.FB_PIXEL_ID !== 'YOUR_FB_PIXEL_ID') {
            fbq('track', eventName, data);
            console.log('FB Pixel Event:', eventName, data);
        }
    },

    trackCustomEvent: function (eventName, data = {}) {
        if (typeof fbq !== 'undefined' && CONFIG.FB_PIXEL_ID !== 'YOUR_FB_PIXEL_ID') {
            fbq('trackCustom', eventName, data);
            console.log('FB Pixel Custom Event:', eventName, data);
        }
    }
};
