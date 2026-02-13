<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    $con = new mysqli("127.0.0.1", "root", "", "Drono");

    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }

    $stmt = $con->prepare(
        "INSERT INTO contact_form (name, email, phone, subject, message)
         VALUES (?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("sssss", $name, $email, $phone, $subject, $message);
    $stmt->execute();

    $stmt->close();
    $con->close();

    $success = true;
}
?>
