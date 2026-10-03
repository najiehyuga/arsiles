<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/data.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($dataFile)) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'File data.json tidak ditemukan']);
        exit;
    }
    echo file_get_contents($dataFile);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (empty($rawInput)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Data masukan kosong']);
        exit;
    }

    $decoded = json_decode($rawInput, true);
    if ($decoded === null) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Format JSON tidak valid']);
        exit;
    }

    // Pastikan struktur penting tersedia
    if (!isset($decoded['teacher']) || !isset($decoded['packages']) || !isset($decoded['levels'])) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => 'Struktur data tidak lengkap']);
        exit;
    }

    // Buat backup data sebelum ditimpa
    if (file_exists($dataFile)) {
        @copy($dataFile, __DIR__ . '/data_backup.json');
    }

    $encoded = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $saved = @file_put_contents($dataFile, $encoded);

    if ($saved === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal menulis file data.json. Periksa izin akses folder.']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Data jadwal, harga, dan ketentuan berhasil diperbarui.',
        'updated_at' => date('Y-m-d H:i:s')
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Metode HTTP tidak diizinkan']);
