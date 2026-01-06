<?php
/**
 * Razorpay PHP Backend - Create Order
 * 
 * This file creates a Razorpay order for payment processing
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
if (!isset($input['amount']) || empty($input['amount'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Amount is required'
    ]);
    exit();
}

$amount = $input['amount'];
$currency = isset($input['currency']) ? $input['currency'] : 'INR';

// Prepare order data
$orderData = [
    'amount' => $amount * 100, // Convert to paise
    'currency' => $currency,
    'receipt' => 'receipt_' . time(),
    'notes' => [
        'created_at' => date('Y-m-d H:i:s')
    ]
];

// Create Razorpay order using cURL
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.razorpay.com/v1/orders');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode(RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $order = json_decode($response, true);
    
    echo json_encode([
        'success' => true,
        'orderId' => $order['id'],
        'amount' => $order['amount'],
        'currency' => $order['currency']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to create order',
        'details' => json_decode($response, true)
    ]);
}
?>
