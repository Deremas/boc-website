<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
  exit;
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Contact API is not configured.']);
  exit;
}

/** @var array<string, string> $config */
$config = require $configFile;

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '[]', true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Invalid request.']);
  exit;
}

function text($value, int $max): string {
  if (!is_string($value)) return '';
  return mb_substr(trim($value), 0, $max);
}

$enquiry = [
  'name' => text($data['name'] ?? '', 120),
  'company' => text($data['company'] ?? '', 160),
  'phone' => text($data['phone'] ?? '', 40),
  'email' => text($data['email'] ?? '', 160),
  'interest' => text($data['interest'] ?? '', 80),
  'preferredContact' => text($data['preferredContact'] ?? '', 40),
  'message' => text($data['message'] ?? '', 2000),
  'website' => text($data['website'] ?? '', 200),
  'turnstileToken' => text($data['turnstileToken'] ?? '', 2048),
];

$interests = [
  'Digital marketing',
  'Blue Ocean ERP demo',
  'Odoo',
  'Stock management',
  'Custom software',
  'Training',
  'Other',
];
$preferences = ['Phone', 'Telegram', 'Email', ''];

if ($enquiry['website'] !== '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Rejected.']);
  exit;
}

if ($enquiry['name'] === '' || $enquiry['company'] === '' || $enquiry['phone'] === '' || $enquiry['interest'] === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Required fields are missing.']);
  exit;
}

if (!in_array($enquiry['interest'], $interests, true)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Please choose a valid interest.']);
  exit;
}

if (!in_array($enquiry['preferredContact'], $preferences, true)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Please choose a valid contact preference.']);
  exit;
}

if ($enquiry['email'] !== '' && !filter_var($enquiry['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Please enter a valid email.']);
  exit;
}

if (strlen(preg_replace('/\D+/', '', $enquiry['phone']) ?? '') < 7) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Please enter a valid phone number.']);
  exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$turnstileSecret = $config['TURNSTILE_SECRET_KEY'] ?? '';
if ($turnstileSecret !== '') {
  if ($enquiry['turnstileToken'] === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please confirm you are not a robot.']);
    exit;
  }
  $verify = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
  curl_setopt_array($verify, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
      'secret' => $turnstileSecret,
      'response' => $enquiry['turnstileToken'],
      'remoteip' => $ip,
    ]),
  ]);
  $verifyBody = curl_exec($verify);
  curl_close($verify);
  $verifyJson = json_decode($verifyBody ?: '{}', true);
  if (!($verifyJson['success'] ?? false)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please confirm you are not a robot.']);
    exit;
  }
}

function escape_html(string $value): string {
  return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$emailOk = false;
$apiKey = $config['EMAIL_API_KEY'] ?? '';
$from = $config['EMAIL_FROM'] ?? '';
$to = $config['EMAIL_TO'] ?? 'coo@blueoceancreatives.com';

if ($apiKey !== '' && $from !== '') {
  $text = implode("\n", [
    'New website enquiry',
    '',
    'Name: ' . $enquiry['name'],
    'Company: ' . $enquiry['company'],
    'Phone: ' . $enquiry['phone'],
    'Email: ' . ($enquiry['email'] !== '' ? $enquiry['email'] : '-'),
    'Interested in: ' . $enquiry['interest'],
    'Preferred contact: ' . ($enquiry['preferredContact'] !== '' ? $enquiry['preferredContact'] : '-'),
    '',
    $enquiry['message'] !== '' ? $enquiry['message'] : '-',
  ]);
  $payload = [
    'from' => $from,
    'to' => [$to],
    'subject' => 'Website enquiry — ' . $enquiry['interest'],
    'text' => $text,
  ];
  if ($enquiry['email'] !== '') $payload['reply_to'] = $enquiry['email'];

  $mail = curl_init('https://api.resend.com/emails');
  curl_setopt_array($mail, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
      'Authorization: Bearer ' . $apiKey,
      'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
  ]);
  $mailBody = curl_exec($mail);
  $mailCode = (int) curl_getinfo($mail, CURLINFO_HTTP_CODE);
  curl_close($mail);
  $emailOk = $mailCode >= 200 && $mailCode < 300;
}

$telegramOk = false;
$token = $config['TELEGRAM_BOT_TOKEN'] ?? '';
$chatId = $config['TELEGRAM_CHAT_ID'] ?? '';
if ($token !== '' && $chatId !== '') {
  $message = implode("\n", [
    '<b>📩 NEW WEBSITE ENQUIRY</b>',
    '',
    '<b>Blue Ocean Creatives</b>',
    '',
    '<b>Name:</b> ' . escape_html($enquiry['name']),
    '<b>Company:</b> ' . escape_html($enquiry['company']),
    '<b>Phone:</b> ' . escape_html($enquiry['phone']),
    '<b>Email:</b> ' . escape_html($enquiry['email'] !== '' ? $enquiry['email'] : '-'),
    '<b>Interested in:</b> ' . escape_html($enquiry['interest']),
    '<b>Preferred contact:</b> ' . escape_html($enquiry['preferredContact'] !== '' ? $enquiry['preferredContact'] : '-'),
    '<b>Message:</b>',
    '',
    escape_html($enquiry['message'] !== '' ? $enquiry['message'] : '-'),
  ]);
  $tg = curl_init('https://api.telegram.org/bot' . rawurlencode($token) . '/sendMessage');
  curl_setopt_array($tg, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
      'chat_id' => $chatId,
      'text' => $message,
      'parse_mode' => 'HTML',
    ]),
  ]);
  $tgBody = curl_exec($tg);
  $tgCode = (int) curl_getinfo($tg, CURLINFO_HTTP_CODE);
  curl_close($tg);
  $telegramOk = $tgCode >= 200 && $tgCode < 300;
}

if (!$emailOk && !$telegramOk) {
  http_response_code(502);
  echo json_encode(['success' => false, 'message' => 'Could not send your message. Please try again or call us.']);
  exit;
}

echo json_encode(['success' => true, 'message' => 'Thanks — we will reply within one working day.']);
