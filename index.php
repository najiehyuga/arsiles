<?php
$dataFile = __DIR__ . '/data.json';
$data = [];
if (file_exists($dataFile)) {
    $data = json_decode(file_get_contents($dataFile), true);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>Les Private Ngaji Home Visit bersama Kak Arsil | Belajar Ngaji Mudah & Nyaman di Rumah</title>
  <meta name="description" content="Layanan les private ngaji home visit (guru datang ke rumah) bersama Kak Arsil untuk jenjang Pra TK, SD, hingga SMP/SMA. Bimbingan Al-Qur'an, hafalan, dan calistung dengan sabar, ramah anak, dan telaten.">
  
  <!-- Google Fonts: Outfit & Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Leaflet Map CSS for Interactive Distance Calculation -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
  <link rel="stylesheet" href="css/style.css?v=<?php echo time(); ?>">
</head>
<body>

  <!-- Floating Flower Petals Canvas -->
  <canvas id="petalsCanvas"></canvas>
  <button id="togglePetalsBtn" class="petals-toggle-btn" type="button" aria-pressed="true" title="Nyalakan atau jeda animasi bunga beterbangan">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5"/>
      <path d="M12 22a4 4 0 0 0 4-4c0-1.5-.8-2.8-2-3.5"/>
      <path d="M2 12a4 4 0 0 0 4 4c1.5 0 2.8-.8 3.5-2"/>
      <path d="M22 12a4 4 0 0 0-4-4c-1.5 0-2.8.8-3.5 2"/>
    </svg>
    <span>Efek Bunga: Aktif</span>
  </button>

  <!-- React 18 Application Root -->
  <div id="reactRoot">
    <!-- Server-Side Fallback / Loading (Clean without emojis) -->
    <div style="padding: 100px 20px; text-align: center; color: #B0456E;">
      <h2 style="font-size: 1.4rem; margin-bottom: 6px; font-weight: 700;">Memuat Les Private Kak Arsil...</h2>
      <p style="color: #52434A; font-size: 0.95rem;">Menyiapkan informasi bimbingan belajar terbaik untuk Anda.</p>
    </div>
  </div>

  <!-- Embedded Initial Data for instant hydration -->
  <script>
    window.INITIAL_DATA = <?php echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
  </script>

  <!-- React 18 & Application Scripts (Loaded from local vendor for offline reliability) -->
  <script src="js/vendor/react.min.js"></script>
  <script src="js/vendor/react-dom.min.js"></script>
  <!-- Supabase Cloud Adapter -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="js/supabase-config.js"></script>
  <!-- Leaflet Map Library for Distance Calculation -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <script src="js/petals.js?v=<?php echo time(); ?>"></script>
  <script src="js/app.js?v=<?php echo time(); ?>"></script>
</body>
</html>
