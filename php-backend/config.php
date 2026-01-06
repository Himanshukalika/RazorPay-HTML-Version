<?php
/**
 * Configuration File for Razorpay PHP Backend
 * 
 * IMPORTANT: Keep this file secure!
 * Add to .gitignore to prevent committing to version control
 */

// Razorpay API Credentials
define('RAZORPAY_KEY_ID', 'rzp_live_Rx0dB1g3YMVHI0');
define('RAZORPAY_KEY_SECRET', '917FiE8XMWwrcpG7kzChKObR');

// Google Sheets Configuration (Optional)
define('GOOGLE_SHEET_URL', 'https://script.google.com/macros/s/AKfycbyoWiojkv8uBGseSYxKUmv7Oxi6_2sKR4eUFQko01oDOFkZesqYvkyEwLXMljVl5vy5/exec');

// Environment
define('ENVIRONMENT', 'production'); // 'development' or 'production'

// Error Reporting
if (ENVIRONMENT === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
?>
