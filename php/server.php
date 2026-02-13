<?php
$db_server = "127.0.0.1";
$db_user = "root";
$db_pass = "";
$db_name = "Drono";
$con = ""; // Use null instead of empty string

$con = mysqli_connect($db_server, $db_user, $db_pass,$db_name);
if (!$con) {
    die("Failed to connect to MySQL: " ) ;
}
echo "Connected to database successfully!";

?>
