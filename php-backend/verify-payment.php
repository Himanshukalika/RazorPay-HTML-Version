<?php
/**
 * Razorpay PHP Backend - Verify Payment
 * 
 * This file verifies the payment signature from Razorpay
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Load configuration
require_once 'config.php';

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['razorpay_order_id']) || 
    !isset($input['razorpay_payment_id']) || 
    !isset($input['razorpay_signature'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required parameters'
    ]);
    exit();
}

$orderId = $input['razorpay_order_id'];
$paymentId = $input['razorpay_payment_id'];
$signature = $input['razorpay_signature'];

// Generate expected signature
$data = $orderId . '|' . $paymentId;
$expectedSignature = hash_hmac('sha256', $data, RAZORPAY_KEY_SECRET);

// Verify signature
if ($signature === $expectedSignature) {
    // Payment is valid
    echo json_encode([
        'success' => true,
        'message' => 'Payment verified successfully'
    ]);
    
    // TODO: Save payment details to database
    // TODO: Send confirmation email
    // TODO: Grant access to user
    
} else {
    // Invalid signature
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid signature'
    ]);
}
?>
