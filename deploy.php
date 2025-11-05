<?php
/**
 * GitHub Webhook Auto-Deploy Script
 *
 * Configurar en GitHub:
 * Settings → Webhooks → Add webhook
 * Payload URL: https://neuracoder.com/deploy.php
 * Content type: application/json
 * Secret: [usa la misma clave que defines abajo]
 * Events: Just the push event
 */

// IMPORTANTE: Cambia esto por una clave secreta segura
// Usa la misma clave en GitHub Webhook Settings
$secret = "Pelu1957*.*";

// Log file para debugging
$logFile = __DIR__ . '/deploy.log';

// Función para escribir en el log
function writeLog($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

// Verificar que la petición viene de GitHub
if (!isset($_SERVER['HTTP_X_HUB_SIGNATURE'])) {
    http_response_code(403);
    writeLog("ERROR: No signature header found");
    die('Forbidden - No signature');
}

// Obtener el payload
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

// Validar la firma
$expectedSignature = 'sha1=' . hash_hmac('sha1', $payload, $secret);

if (!hash_equals($expectedSignature, $signature)) {
    http_response_code(403);
    writeLog("ERROR: Invalid signature");
    die('Forbidden - Invalid signature');
}

// Decodificar el payload
$data = json_decode($payload, true);

// Verificar que es un push a la rama main
if (isset($data['ref']) && $data['ref'] === 'refs/heads/main') {
    writeLog("=== Deploy triggered by push to main ===");

    // Ejecutar git pull
    $output = [];
    $returnCode = 0;

    // Cambiar al directorio correcto
    $dir = '/home/u777479293/domains/neuracoder.com/public_html';
    $cmd = "cd $dir && git pull origin main 2>&1";

    writeLog("Executing command: $cmd");
    exec($cmd, $output, $returnCode);

    // Log del resultado
    $outputStr = implode("\n", $output);
    writeLog("Git pull output:\n$outputStr");
    writeLog("Return code: $returnCode");

    // Si exec no funciona, intentar con shell_exec
    if (empty($output)) {
        writeLog("exec() returned empty, trying shell_exec...");
        $shellOutput = shell_exec($cmd);
        writeLog("shell_exec output: " . ($shellOutput ?: "empty"));
    }

    if ($returnCode === 0) {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'Deploy completed successfully',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        writeLog("=== Deploy completed successfully ===");
    } else {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Deploy failed',
            'output' => $outputStr
        ]);
        writeLog("=== Deploy failed ===");
    }
} else {
    writeLog("INFO: Push to non-main branch, skipping deploy");
    echo json_encode([
        'status' => 'skipped',
        'message' => 'Not a push to main branch'
    ]);
}
?>
