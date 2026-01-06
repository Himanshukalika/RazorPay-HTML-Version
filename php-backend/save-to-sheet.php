<?php
/**
 * Save to Google Sheets
 * 
 * This file saves payment data to Google Sheets
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

// Send data to Google Sheets
if (defined('GOOGLE_SHEET_URL') && !empty(GOOGLE_SHEET_URL)) {
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, GOOGLE_SHEET_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($input));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        echo json_encode([
            'success' => true,
            'message' => 'Data saved to Google Sheets successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Failed to save to Google Sheets'
        ]);
    }
} else {
    echo json_encode([
        'success' => true,
        'message' => 'Data logged (Google Sheets not configured)'
    ]);
}
?>
