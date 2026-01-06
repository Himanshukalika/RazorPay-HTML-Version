<?php
/**
 * Razorpay PHP Backend - Create Subscription
 * 
 * This file creates a Razorpay subscription
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
if (!isset($input['planId']) || empty($input['planId'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Plan ID is required'
    ]);
    exit();
}

$planId = $input['planId'];
$totalCount = isset($input['totalCount']) ? $input['totalCount'] : 12;
$notes = isset($input['notes']) ? $input['notes'] : [];

// Prepare subscription data
$subscriptionData = [
    'plan_id' => $planId,
    'total_count' => (int)$totalCount,
    'quantity' => 1,
    'customer_notify' => 1,
    'notes' => $notes
];

// Create Razorpay subscription using cURL
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.razorpay.com/v1/subscriptions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($subscriptionData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode(RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $subscription = json_decode($response, true);
    
    // Log for debugging
    error_log("Subscription created: " . json_encode($subscription));
    error_log("Total count sent: " . $totalCount);
    
    echo json_encode([
        'success' => true,
        'subscriptionId' => $subscription['id'],
        'debug' => [
            'total_count_sent' => (int)$totalCount,
            'subscription_data' => $subscription
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to create subscription',
        'details' => json_decode($response, true)
    ]);
}
?>
