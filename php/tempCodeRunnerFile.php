<?php
// ============================================
// CONFIGURATION
// ============================================
$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'Drono';

// ============================================
// ERROR HANDLING SETUP
// ============================================
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/contact_errors.log');

// ============================================
// REQUEST METHOD CHECK (FIXED)
// ============================================
// Check if running from CLI or web
$isCli = (php_sapi_name() === 'cli');

// For web requests, check request method
if (!$isCli) {
    // Set headers for web requests
    header('Content-Type: text/plain; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    
    // Check request method for web requests
    if (!isset($_SERVER['REQUEST_METHOD'])) {
        http_response_code(500);
        exit('SERVER_ERROR: REQUEST_METHOD not set');
    }
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        exit('INVALID_METHOD');
    }
}

// ============================================
// GET INPUT DATA (Works for both CLI and Web)
// ============================================
if ($isCli) {
    // For CLI testing - create test data
    $_POST = [
        'name' => 'CLI Test User',
        'email' => 'cli_test@example.com',
        'phone' => '1234567890',
        'subject' => 'CLI Test',
        'message' => 'This is a test from command line'
    ];
}

// ============================================
// VALIDATE REQUIRED FIELDS
// ============================================
$required = ['name', 'email', 'subject', 'message'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        if (!$isCli) http_response_code(400);
        exit('MISSING_FIELDS');
    }
}

// ============================================
// SANITIZE INPUT
// ============================================
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = trim($_POST['subject']);
$message = trim($_POST['message']);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if (!$isCli) http_response_code(400);
    exit('INVALID_EMAIL');
}

// ============================================
// DATABASE OPERATION
// ============================================
try {
    // Debug log
    error_log("Attempting database connection: host=$DB_HOST, user=$DB_USER, db=$DB_NAME");
    
    // Create database connection
    $conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        if (!$isCli) http_response_code(500);
        exit('DB_CONNECTION_ERROR: ' . $conn->connect_error);
    }
    
    error_log("Database connected successfully");
    
    // Create table if it doesn't exist
    $createTable = "CREATE TABLE IF NOT EXISTS message (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(100) NOT NULL,
        messages TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
    
    if (!$conn->query($createTable)) {
        error_log("Table creation failed: " . $conn->error);
        if (!$isCli) http_response_code(500);
        exit('DB_TABLE_ERROR: ' . $conn->error);
    }
    
    error_log("Table verified/created successfully");
    
    // Prepare and execute insert statement
    $sql = "INSERT INTO message (name, email, phone, subject, messages) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        error_log("Statement preparation failed: " . $conn->error);
        if (!$isCli) http_response_code(500);
        exit('DB_PREPARE_ERROR: ' . $conn->error);
    }
    
    error_log("Preparing to insert: Name=$name, Email=$email, Subject=$subject");
    
    $stmt->bind_param("sssss", $name, $email, $phone, $subject, $message);
    
    if ($stmt->execute()) {
        $insertId = $conn->insert_id;
        error_log("Insert successful! ID: $insertId");
        echo 'SUCCESS';
    } else {
        error_log("Statement execution failed: " . $stmt->error);
        if (!$isCli) http_response_code(500);
        exit('DB_EXECUTE_ERROR: ' . $stmt->error);
    }
    
    // Close connections
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    if (!$isCli) http_response_code(500);
    exit('SERVER_ERROR: ' . $e->getMessage());
}
?>