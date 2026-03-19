<?php

declare(strict_types=1);

session_start();

header('Content-Type: application/json; charset=utf-8');

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function loadRequest(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function getState(): array
{
    if (!isset($_SESSION['chat_core_state']) || !is_array($_SESSION['chat_core_state'])) {
        $_SESSION['chat_core_state'] = [
            'stage' => 'main_menu',
            'leadSent' => false,
            'leadSentReason' => '',
            'leadLastSentScore' => 0,
            'lead' => [
                'intent' => '',
                'config' => '',
                'phone' => '',
                'countryCode' => '+91',
                'name' => '',
                'email' => '',
            ],
        ];
    }

    return $_SESSION['chat_core_state'];
}

function setState(array $state): void
{
    $_SESSION['chat_core_state'] = $state;
}

function quickMainMenu(): array
{
    return [
        'Pricing & Floor Plans 💸💸',
        'Download Brochure ⬇️',
        'Get The Best Quote 💰',
        'Site Visit Or Virtual Tour 🚁',
        'Pricing on Whatsapp ✅',
        'Get A Call Back 📞',
    ];
}

function quickConfigs(): array
{
    return ['1 BHK', '2 BHK', '3 BHK', '4 BHK'];
}

function normalize(string $value): string
{
    return strtolower(trim(preg_replace('/\s+/', ' ', $value)));
}

function detectIntent(string $text): string
{
    $n = normalize($text);

    $map = [
        'pricing_floor' => ['pricing', 'floor', 'plan', 'price'],
        'brochure' => ['brochure', 'download'],
        'quote' => ['quote', 'best quote'],
        'visit' => ['site visit', 'virtual tour', 'visit'],
        'whatsapp' => ['whatsapp'],
        'callback' => ['call back', 'callback', 'call'],
    ];

    foreach ($map as $intent => $keywords) {
        foreach ($keywords as $keyword) {
            if (strpos($n, $keyword) !== false) {
                return $intent;
            }
        }
    }

    return '';
}

function detectConfig(string $text): string
{
    $n = normalize($text);

    if (preg_match('/\b1\s*bhk\b/', $n)) return '1 BHK';
    if (preg_match('/\b2\s*bhk\b/', $n)) return '2 BHK';
    if (preg_match('/\b3\s*bhk\b/', $n)) return '3 BHK';
    if (preg_match('/\b4\s*bhk\b/', $n)) return '4 BHK';

    return '';
}

function isGreeting(string $text): bool
{
    $n = normalize($text);
    foreach (['hi', 'hello', 'hey', 'good morning', 'good evening'] as $token) {
        if (strpos($n, $token) !== false) {
            return true;
        }
    }
    return false;
}

function validatePhone(string $phone): bool
{
    $digits = preg_replace('/\D+/', '', $phone);
    $len = strlen($digits);
    return $len >= 8 && $len <= 14;
}

function validateName(string $name): bool
{
    return (bool) preg_match('/^[A-Za-z][A-Za-z\s\-]{1,49}$/', trim($name));
}

function validateEmail(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function intentLabel(string $intent): string
{
    $labels = [
        'pricing_floor' => 'Pricing & Floor Plans',
        'brochure' => 'Download Brochure',
        'quote' => 'Best Quote',
        'visit' => 'Site Visit / Virtual Tour',
        'whatsapp' => 'Pricing on Whatsapp',
        'callback' => 'Call Back Request',
    ];

    return $labels[$intent] ?? 'Chatbot Enquiry';
}

function buildProjectName(array $lead): string
{
    $intent = intentLabel((string) ($lead['intent'] ?? ''));
    $config = trim((string) ($lead['config'] ?? ''));

    if ($config !== '') {
        return sprintf('Mantra Properties - %s - %s', $intent, $config);
    }

    return sprintf('Mantra Properties - %s', $intent);
}

function endpointUrl(string $filename): string
{
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');

    if ($basePath === '' || $basePath === '.') {
        return sprintf('%s://%s/%s', $scheme, $host, $filename);
    }

    return sprintf('%s://%s%s/%s', $scheme, $host, $basePath, $filename);
}

function postForm(string $url, array $payload): array
{
    $body = http_build_query($payload);

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        ]);

        $responseBody = curl_exec($ch);
        $statusCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        return [
            'ok' => $responseBody !== false && $statusCode >= 200 && $statusCode < 300,
            'status' => $statusCode,
            'body' => is_string($responseBody) ? $responseBody : '',
            'error' => $curlError,
        ];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $body,
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);

    $responseBody = @file_get_contents($url, false, $context);
    $statusCode = 0;

    if (isset($http_response_header) && is_array($http_response_header) && isset($http_response_header[0])) {
        if (preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
            $statusCode = (int) $m[1];
        }
    }

    return [
        'ok' => $responseBody !== false && $statusCode >= 200 && $statusCode < 300,
        'status' => $statusCode,
        'body' => is_string($responseBody) ? $responseBody : '',
        'error' => $responseBody === false ? 'stream_post_failed' : '',
    ];
}

function storeLead(array $lead, array $mailResult): void
{
    $entry = [
        'time' => date('Y-m-d H:i:s'),
        'intent' => $lead['intent'] ?? '',
        'config' => $lead['config'] ?? '',
        'countryCode' => $lead['countryCode'] ?? '+91',
        'phone' => $lead['phone'] ?? '',
        'name' => $lead['name'] ?? '',
        'email' => $lead['email'] ?? '',
        'mailOk' => $mailResult['ok'] ?? false,
        'mailStatus' => $mailResult['status'] ?? 0,
        'mailError' => $mailResult['error'] ?? '',
        'mailReason' => $mailResult['reason'] ?? '',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'ua' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    ];

    file_put_contents(__DIR__ . '/chat_leads.log', json_encode($entry, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND | LOCK_EX);
}

function submitLeadToMailFlow(array $lead): array
{
    $payload = [
        'name' => (string) ($lead['name'] ?? ''),
        'phone' => (string) ($lead['phone'] ?? ''),
        'countryCode' => (string) ($lead['countryCode'] ?? '+91'),
        'email' => (string) ($lead['email'] ?? ''),
        'projectName' => buildProjectName($lead),
        'bhk' => (string) ($lead['config'] ?? ''),
    ];

    $url = endpointUrl('phpMailSend.php');
    return postForm($url, $payload);
}

function fallbackName(array $lead): string
{
    $name = trim((string) ($lead['name'] ?? ''));
    if ($name !== '') {
        return $name;
    }

    return 'Chat Visitor';
}

function fallbackEmail(array $lead): string
{
    $email = trim((string) ($lead['email'] ?? ''));
    if ($email !== '' && validateEmail($email)) {
        return $email;
    }

    $digits = preg_replace('/\D+/', '', (string) ($lead['phone'] ?? ''));
    if ($digits === '') {
        $digits = (string) time();
    }

    return sprintf('lead%s@mantralead.local', $digits);
}

function leadProgressScore(array $lead): int
{
    $score = 0;

    if (trim((string) ($lead['phone'] ?? '')) !== '') {
        $score += 1;
    }
    if (trim((string) ($lead['name'] ?? '')) !== '') {
        $score += 1;
    }
    if (trim((string) ($lead['email'] ?? '')) !== '' && validateEmail((string) $lead['email'])) {
        $score += 1;
    }

    return $score;
}

function submitLeadIfEligible(array &$state, string $reason): ?array
{
    $phone = trim((string) ($state['lead']['phone'] ?? ''));
    if ($phone === '') {
        return null;
    }

    $currentScore = leadProgressScore($state['lead']);
    $lastSentScore = (int) ($state['leadLastSentScore'] ?? 0);
    if ($currentScore <= $lastSentScore) {
        return null;
    }

    $leadToSend = $state['lead'];
    $leadToSend['name'] = fallbackName($leadToSend);
    $leadToSend['email'] = fallbackEmail($leadToSend);

    if ($reason !== 'completed') {
        $leadToSend['intent'] = ($leadToSend['intent'] ?? '') === '' ? 'callback' : (string) $leadToSend['intent'];
        $leadToSend['config'] = trim((string) ($leadToSend['config'] ?? ''));
    }

    $mailResult = submitLeadToMailFlow($leadToSend);
    $mailResult['reason'] = $reason;
    storeLead($leadToSend, $mailResult);

    $state['leadSent'] = true;
    $state['leadSentReason'] = $reason;
    $state['leadLastSentScore'] = $currentScore;
    setState($state);

    return $mailResult;
}

function botResponse(array $messages, array $quickReplies = [], ?string $expect = null, ?string $error = null): array
{
    $wrapped = [];
    foreach ($messages as $message) {
        $wrapped[] = ['from' => 'agent', 'text' => $message];
    }

    return [
        'messages' => $wrapped,
        'quickReplies' => $quickReplies,
        'expect' => $expect,
        'error' => $error,
    ];
}

function resetLeadState(array &$state): void
{
    $state['stage'] = 'main_menu';
    $state['leadSent'] = false;
    $state['leadSentReason'] = '';
    $state['leadLastSentScore'] = 0;
    $state['lead'] = [
        'intent' => '',
        'config' => '',
        'phone' => '',
        'countryCode' => '+91',
        'name' => '',
        'email' => '',
    ];
}

$request = loadRequest();
$action = isset($request['action']) ? (string) $request['action'] : 'start';

$state = getState();

if ($action === 'reset') {
    session_unset();
    session_destroy();
    session_start();
    $state = getState();
}

if ($action === 'start') {
    resetLeadState($state);
    setState($state);

    respond(200, botResponse([
        "Hey, I'm Pooja Agarwal! How can I help you understand this project?",
        // 'Select any option below and I will guide you quickly.',
    ], quickMainMenu()));
}

if ($action === 'close') {
    submitLeadIfEligible($state, 'chat_closed');
    setState($state);

    respond(200, ['ok' => true]);
}

if ($action === 'phone') {
    $phone = isset($request['phone']) ? trim((string) $request['phone']) : '';
    $countryCode = isset($request['countryCode']) ? trim((string) $request['countryCode']) : '+91';

    if (!validatePhone($phone)) {
        respond(200, botResponse([
            'Please enter a valid mobile number to continue.',
        ], [], 'phone', 'This field is required'));
    }

    $state['lead']['phone'] = $phone;
    $state['lead']['countryCode'] = $countryCode === '' ? '+91' : $countryCode;
    $state['stage'] = 'awaiting_name';
    setState($state);

    respond(200, botResponse([
        'Thanks, got your mobile number.',
        'May I know your full name?',
    ]));
}

$message = isset($request['message']) ? trim((string) $request['message']) : '';
if ($message === '') {
    respond(200, botResponse([], [], null, 'Message is required'));
}

if ($state['stage'] === 'main_menu') {
    if (isGreeting($message)) {
        respond(200, botResponse([
            'Hello! I can help with prices, brochure, site visit, and callback.',
            'Please choose one option below.',
        ], quickMainMenu()));
    }

    $intent = detectIntent($message);
    if ($intent === '') {
        respond(200, botResponse([
            'Please choose one option so I can help you quickly.',
        ], quickMainMenu()));
    }

    $state['lead']['intent'] = $intent;
    $state['stage'] = 'awaiting_config';
    setState($state);

    respond(200, botResponse([
        'Sure, I will help you with that.',
        'Which configuration are you looking for?',
    ], quickConfigs()));
}

if ($state['stage'] === 'awaiting_config') {
    $config = detectConfig($message);
    if ($config === '') {
        respond(200, botResponse([
            'Please select configuration from the options below.',
        ], quickConfigs()));
    }

    $state['lead']['config'] = $config;
    $state['stage'] = 'awaiting_phone';
    setState($state);

    respond(200, botResponse([
        'Great choice, we have inventory available for this configuration.',
        'Please enter your mobile number to continue.',
    ], [], 'phone'));
}

if ($state['stage'] === 'awaiting_phone') {
    respond(200, botResponse([
        'Please enter your mobile number in the field below.',
    ], [], 'phone'));
}

if ($state['stage'] === 'awaiting_name') {
    if (!validateName($message)) {
        respond(200, botResponse([
            'Please enter a valid name (letters only).',
        ], [], null, 'Please enter your full name'));
    }

    $state['lead']['name'] = $message;
    $state['stage'] = 'awaiting_email';
    setState($state);

    respond(200, botResponse([
        'Thanks! Please share your email address.',
    ]));
}

if ($state['stage'] === 'awaiting_email') {
    if (!validateEmail($message)) {
        respond(200, botResponse([
            'Please enter a valid email address.',
        ], [], null, 'Please enter a valid email'));
    }

    $state['lead']['email'] = $message;
    $state['stage'] = 'completed';
    setState($state);

    $mailResult = submitLeadIfEligible($state, 'completed');
    if ($mailResult === null) {
        $mailResult = ['ok' => true, 'status' => 200];
    }

    $thanksMessage = ($mailResult['ok'] ?? false)
        ? 'Thank you! Our team will contact you shortly with details.'
        : 'Thank you! We captured your details. Our team will still contact you shortly.';

    resetLeadState($state);
    setState($state);

    respond(200, botResponse([
        $thanksMessage,
        'Anything else you want to know right now?',
    ], quickMainMenu()));
}

resetLeadState($state);
setState($state);
respond(200, botResponse([
    'Let us continue. Please choose an option below.',
], quickMainMenu()));
