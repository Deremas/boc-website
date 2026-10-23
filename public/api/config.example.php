<?php
/**
 * Copy to config.php on the server (or let GitHub Actions write it during deploy).
 * Never commit config.php with real secrets.
 */
declare(strict_types=1);

return [
  'EMAIL_API_KEY' => '',
  'EMAIL_FROM' => '',
  'EMAIL_TO' => 'coo@blueoceancreatives.com',
  'TELEGRAM_BOT_TOKEN' => '',
  'TELEGRAM_CHAT_ID' => '',
  'TURNSTILE_SECRET_KEY' => '',
];
