<?php

require 'src/PHPMailer.php';
require 'src/SMTP.php';
require 'src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: text/plain; charset=utf-8');

function fail_request($statusCode, $message, $errorInfo = '')
{
    http_response_code($statusCode);
    $logLine = sprintf(
        "[%s] %s | %s | IP: %s | UA: %s\n",
        date('Y-m-d H:i:s'),
        $message,
        $errorInfo,
        isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown',
        isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'unknown'
    );
    error_log($logLine, 3, __DIR__ . '/mail_error.log');
    exit($message);
}

function get_client_ip()
{
    $forwarded = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? trim($_SERVER['HTTP_X_FORWARDED_FOR']) : '';
    if ($forwarded !== '') {
        $parts = explode(',', $forwarded);
        return trim($parts[0]);
    }

    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return trim($_SERVER['HTTP_CLIENT_IP']);
    }

    return isset($_SERVER['REMOTE_ADDR']) ? trim($_SERVER['REMOTE_ADDR']) : 'unknown';
}

$name = isset($_REQUEST['name']) ? trim($_REQUEST['name']) : '';
$phone = isset($_REQUEST['phone']) ? trim($_REQUEST['phone']) : '';
$countryCode = isset($_REQUEST['countryCode']) ? trim($_REQUEST['countryCode']) : '';
if ($countryCode === '' && isset($_REQUEST['country_code'])) {
    $countryCode = trim($_REQUEST['country_code']);
}
$email = isset($_REQUEST['email']) ? trim($_REQUEST['email']) : '';
$projectName = isset($_REQUEST['projectName']) ? trim($_REQUEST['projectName']) : '';
$bhk = isset($_REQUEST['bhk']) ? trim($_REQUEST['bhk']) : '';

if ($projectName === '' && $bhk !== '') {
    $projectName = $bhk;
}
if ($projectName === '') {
    $projectName = 'Chatbot Enquiry';
}

if ($name === '' || $phone === '' || $email === '') {
    fail_request(400, 'Error: Missing required fields (name, phone, or email).');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail_request(400, 'Error: Invalid email format.');
}

$normalizedCountryCode = str_replace(' ', '', $countryCode);
if ($normalizedCountryCode !== '' && strpos($normalizedCountryCode, '+') !== 0) {
    $normalizedCountryCode = '+' . $normalizedCountryCode;
}

$phoneDigits = preg_replace('/\D+/', '', $phone);
$fullPhone = preg_replace('/\s+/', '', $phone);
if ($normalizedCountryCode !== '' && strpos($fullPhone, '+') !== 0) {
    $fullPhone = $normalizedCountryCode . $phoneDigits;
} else {
    $fullPhone = '+' . ltrim(preg_replace('/[^\d+]/', '', $fullPhone), '+');
}

$clientIp = get_client_ip();

$toAddresses = [
    'contactrkrealtysolutions@gmail.com',
    'rkrealty.sales@gmail.com',
    'rkpro8899@gmail.com',
    'abhijitsarvade39@gmail.com',
];
$subject = "Mantra-home inquiry by $name";

$body = "You have received a new inquiry:\n"
    . "- Name: $name\n"
    . "- Phone: $fullPhone\n"
    . "- Email: $email\n"
    . "- Project Name: $projectName\n"
    . "- IP Address: $clientIp\n";

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@mantraproperty.in';
    $mail->Password = 'Infopune@1234';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->Timeout = 30;
    $mail->SMTPKeepAlive = false;
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ];

    $mail->setFrom('info@mantraproperty.in', 'Mantra-home');
    foreach ($toAddresses as $address) {
        $mail->addAddress($address);
    }
    $mail->addReplyTo($email, $name);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->SMTPDebug = 0;

    if ($mail->send()) {
        echo 'Email sent successfully.';
    } else {
        fail_request(500, 'Failed to send email.', $mail->ErrorInfo);
    }
} catch (Exception $e) {
    fail_request(500, 'Error sending email.', isset($mail) ? $mail->ErrorInfo : $e->getMessage());
}
