<?php
/**
 * Health Check Endpoint
 * 
 * This file checks if the PHP backend is working
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load configuration
require_once 'config.php';

// Check if Razorpay credentials are configured
$razorpayConfigured = defined('RAZORPAY_KEY_ID') && 
                      defined('RAZORPAY_KEY_SECRET') && 
                      !empty(RAZORPAY_KEY_ID) && 
                      !empty(RAZORPAY_KEY_SECRET);

echo json_encode([
    'status' => 'OK',
    'timestamp' => date('Y-m-d H:i:s'),
    'razorpay_configured' => $razorpayConfigured,
    'php_version' => phpversion(),
    'message' => 'PHP Backend is working!'
]);
?>
