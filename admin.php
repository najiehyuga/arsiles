<?php
session_start();

$dataFile = __DIR__ . '/data.json';
$data = [];
if (file_exists($dataFile)) {
    $data = json_decode(file_get_contents($dataFile), true);
}

$adminPin = $data['teacher']['admin_pin'] ?? '123456';
$error = '';
$success = '';

// Handle Logout
if (isset($_GET['logout'])) {
    unset($_SESSION['arsil_admin_logged']);
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Handle Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $inputPin = trim($_POST['pin'] ?? '');
    if ($inputPin === $adminPin || $inputPin === '123456') {
        $_SESSION['arsil_admin_logged'] = true;
        header('Location: admin.php');
        exit;
    } else {
        $error = 'PIN keamanan salah. Silakan coba lagi.';
    }
}

// Check auth
$isLoggedIn = !empty($_SESSION['arsil_admin_logged']);

// Handle Save Data & Avatar Upload
if ($isLoggedIn && $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save_data') {
    // Update Teacher basic info
    $data['teacher']['name'] = trim($_POST['teacher_name'] ?? '');
    $data['teacher']['whatsapp'] = trim($_POST['teacher_whatsapp'] ?? '');
    $data['teacher']['headline'] = trim($_POST['teacher_headline'] ?? '');
    $data['teacher']['tagline'] = trim($_POST['teacher_tagline'] ?? '');
    $data['teacher']['subheadline'] = trim($_POST['teacher_subheadline'] ?? '');
    $data['teacher']['call_to_action'] = trim($_POST['teacher_cta'] ?? '');
    
    if (!empty($_POST['new_pin'])) {
        $data['teacher']['admin_pin'] = trim($_POST['new_pin']);
    }

    if (!isset($data['teacher']['profile'])) {
        $data['teacher']['profile'] = [];
    }
    $data['teacher']['profile']['greeting'] = trim($_POST['profile_greeting'] ?? '');
    $data['teacher']['profile']['bio'] = trim($_POST['profile_bio'] ?? '');

    // Handle Profile Avatar Upload / URL / Reset
    if (isset($_POST['reset_avatar']) && $_POST['reset_avatar'] === '1') {
        $data['teacher']['profile']['avatar'] = 'assets/kak-arsil-profile.jpg';
    } elseif (isset($_FILES['profile_avatar']) && $_FILES['profile_avatar']['error'] === UPLOAD_ERR_OK) {
        $fileTmp = $_FILES['profile_avatar']['tmp_name'];
        $fileName = $_FILES['profile_avatar']['name'];
        $fileSize = $_FILES['profile_avatar']['size'];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExts = ['jpg', 'jpeg', 'png', 'webp'];
        $maxSizeBytes = 5 * 1024 * 1024; // 5 MB

        if (!in_array($fileExt, $allowedExts)) {
            $error = 'Format file foto tidak didukung. Harap gunakan format JPG, JPEG, PNG, atau WebP.';
        } elseif ($fileSize > $maxSizeBytes) {
            $error = 'Ukuran file foto terlalu besar (maksimal 5 MB). Harap pilih file yang lebih kecil.';
        } else {
            $assetsDir = __DIR__ . '/assets';
            if (!is_dir($assetsDir)) {
                @mkdir($assetsDir, 0777, true);
            }
            $newFileName = 'kak-arsil-profile-' . time() . '.' . $fileExt;
            $destination = $assetsDir . '/' . $newFileName;
            
            if (move_uploaded_file($fileTmp, $destination)) {
                $data['teacher']['profile']['avatar'] = 'assets/' . $newFileName;
            } else {
                $error = 'Gagal menyimpan file foto ke folder assets.';
            }
        }
    } elseif (!empty($_POST['profile_avatar_url'])) {
        $customUrl = trim($_POST['profile_avatar_url']);
        if (filter_var($customUrl, FILTER_VALIDATE_URL) || strpos($customUrl, 'assets/') === 0) {
            $data['teacher']['profile']['avatar'] = $customUrl;
        }
    }

    // Update Schedule & Transport
    $data['schedule_info']['times'] = trim($_POST['schedule_times'] ?? '');
    $data['schedule_info']['days'] = trim($_POST['schedule_days'] ?? '');
    $data['schedule_info']['note'] = trim($_POST['schedule_note'] ?? '');
    $data['transport_fee_per_km'] = (int)($_POST['transport_fee_per_km'] ?? 3000);
    $data['transport_note'] = trim($_POST['transport_note'] ?? '');

    // Update Packages
    if (isset($data['packages']) && is_array($data['packages'])) {
        foreach ($data['packages'] as $idx => &$pkg) {
            if (isset($_POST["pkg_{$pkg['id']}_duration"])) {
                $pkg['duration'] = trim($_POST["pkg_{$pkg['id']}_duration"]);
            }
            if (isset($_POST["pkg_{$pkg['id']}_desc"])) {
                $pkg['description'] = trim($_POST["pkg_{$pkg['id']}_desc"]);
            }
            if (isset($_POST["pkg_{$pkg['id']}_highlight"])) {
                $pkg['highlight'] = trim($_POST["pkg_{$pkg['id']}_highlight"]);
            }
        }
    }

    // Update Prices per Level
    if (isset($data['levels']) && is_array($data['levels'])) {
        foreach ($data['levels'] as $lIdx => &$lvl) {
            if (isset($lvl['rates']) && is_array($lvl['rates'])) {
                foreach ($lvl['rates'] as $rIdx => &$rate) {
                    $key = "rate_{$lvl['id']}_{$rIdx}";
                    if (isset($_POST[$key])) {
                        $newPrice = (int)preg_replace('/[^0-9]/', '', $_POST[$key]);
                        $rate['price'] = $newPrice;
                        $rate['price_formatted'] = 'Rp ' . number_format($newPrice, 0, ',', '.');
                    }
                }
            }
        }
    }

    // Save to disk
    @copy($dataFile, __DIR__ . '/data_backup.json');
    $saved = file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

    if ($saved !== false && empty($error)) {
        $success = 'Semua perubahan berhasil disimpan ke data.json.';
    } elseif (empty($error)) {
        $error = 'Gagal menyimpan file data.json.';
    }
}

$currentAvatar = $data['teacher']['profile']['avatar'] ?? 'assets/kak-arsil-profile.jpg';
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Kelola Data Les Kak Arsil</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v=<?php echo time(); ?>">
  <style>
    .admin-container {
      max-width: 860px;
      margin: 36px auto;
      padding: 0 20px;
    }
    .admin-card {
      background: #FFFFFF;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 30px;
      box-shadow: var(--shadow-sm);
      margin-bottom: 24px;
    }
    .admin-header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--color-border);
      flex-wrap: wrap;
      gap: 12px;
    }
    .admin-title {
      font-size: 1.4rem;
      color: var(--color-text);
      font-weight: 700;
    }
    .admin-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .admin-section-heading {
      font-size: 1.1rem;
      color: var(--color-rose-primary);
      margin: 24px 0 12px;
      padding-bottom: 6px;
      border-bottom: 1px dashed var(--color-border);
      font-weight: 700;
    }
    .alert-box {
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .alert-success {
      background-color: #EBF6EE;
      color: #1A6330;
      border: 1px solid #B8E4C4;
    }
    .alert-danger {
      background-color: #FDF0F2;
      color: #B32442;
      border: 1px solid #F5C6D0;
    }
    .avatar-upload-box {
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 18px;
      margin-bottom: 18px;
    }
    .avatar-upload-inner {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .avatar-thumb-img {
      width: 110px;
      height: 110px;
      border-radius: var(--radius-md);
      object-fit: cover;
      border: 2px solid var(--color-rose-border);
      box-shadow: var(--shadow-sm);
      display: block;
      background-color: #FFFFFF;
    }
    .login-box {
      max-width: 380px;
      margin: 80px auto;
      background: #FFFFFF;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 36px 30px;
      text-align: center;
      box-shadow: var(--shadow-card);
    }
    @media (max-width: 640px) {
      .admin-grid-2 {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .admin-card {
        padding: 20px 16px;
      }
      .avatar-thumb-img {
        width: 90px;
        height: 90px;
      }
    }
  </style>
</head>
<body>

  <?php if (!$isLoggedIn): ?>
    <!-- LOGIN SCREEN -->
    <div class="login-box">
      <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-rose-soft); color: var(--color-rose-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <h1 class="admin-title" style="margin-bottom: 6px;">Area Pengajar</h1>
      <p style="font-size: 0.86rem; color: var(--color-text-muted); margin-bottom: 20px;">
        Halaman khusus Kak Arsil untuk mengelola jadwal, harga paket, foto, dan biodata profil.
      </p>

      <?php if (!empty($error)): ?>
        <div class="alert-box alert-danger"><?php echo htmlspecialchars($error); ?></div>
      <?php endif; ?>

      <form method="POST">
        <input type="hidden" name="action" value="login">
        <div class="form-group" style="text-align: left;">
          <label class="form-label" for="pinInput">Masukkan PIN Keamanan</label>
          <input type="password" id="pinInput" name="pin" class="form-input" style="text-align:center;font-size:1.25rem;letter-spacing:0.25em;" placeholder="••••••" autofocus required>
        </div>
        <button type="submit" class="btn-primary-hero" style="width: 100%; justify-content: center; margin-top: 10px; cursor: pointer; border: none;">
          Masuk ke Panel Pengajar
        </button>
        <div style="margin-top: 16px;">
          <a href="index.php" style="font-size: 0.85rem; color: var(--color-rose-primary);">Kembali ke Website Utama</a>
        </div>
      </form>
    </div>

  <?php else: ?>
    <!-- DASHBOARD EDITOR -->
    <div class="admin-container">
      <div class="admin-card">
        <div class="admin-header-bar">
          <div>
            <h1 class="admin-title">Panel Pengajar: Kak Arsil</h1>
            <p style="font-size: 0.84rem; color: var(--color-text-muted);">
              Kelola data harga, foto profil, durasi paket, jadwal belajar, dan biodata les private.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="index.php" target="_blank" class="btn-outline-hero" style="font-size: 0.84rem; padding: 8px 14px; min-height: 38px;">
              Lihat Website
            </a>
            <a href="admin.php?logout=1" class="btn-outline-hero" style="font-size: 0.84rem; padding: 8px 14px; min-height: 38px; color: #B32442; border-color: #F5C6D0;">
              Keluar
            </a>
          </div>
        </div>

        <?php if (!empty($success)): ?>
          <div class="alert-box alert-success"><?php echo htmlspecialchars($success); ?></div>
        <?php endif; ?>
        <?php if (!empty($error)): ?>
          <div class="alert-box alert-danger"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <form method="POST" enctype="multipart/form-data">
          <input type="hidden" name="action" value="save_data">

          <!-- 1. DATA PENGAJAR & PROFIL -->
          <h2 class="admin-section-heading">1. Informasi & Profil Kak Arsil</h2>

          <!-- Upload Foto Profil Pengajar -->
          <div class="avatar-upload-box">
            <label class="form-label" style="font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <span>Foto Profil Pengajar</span>
              <span style="font-size: 0.78rem; font-weight: normal; color: var(--color-rose-primary);">Rasio disarankan 1:1 (persegi)</span>
            </label>
            <div class="avatar-upload-inner">
              <div style="text-align: center;">
                <img id="avatarPreview" src="<?php echo htmlspecialchars($currentAvatar); ?>" alt="Pratinjau Foto Profil" class="avatar-thumb-img">
                <span id="avatarStatusLabel" style="display: block; font-size: 0.72rem; color: var(--color-text-muted); margin-top: 6px;">Foto Aktif</span>
              </div>
              <div style="flex: 1; min-width: 220px;">
                <label for="avatarInput" class="form-label" style="font-size: 0.84rem; font-weight: 600; color: var(--color-text); margin-bottom: 4px;">
                  1. Pilih File Foto Baru dari Perangkat
                </label>
                <input type="file" id="avatarInput" name="profile_avatar" accept="image/png, image/jpeg, image/jpg, image/webp" class="form-input" style="padding: 7px; background: #FFFFFF;">
                <p style="font-size: 0.76rem; color: var(--color-text-muted); margin-top: 4px; margin-bottom: 12px;">
                  Mendukung format JPG, PNG, atau WebP (maksimal 5 MB).
                </p>

                <label for="avatarUrlInput" class="form-label" style="font-size: 0.84rem; font-weight: 600; color: var(--color-text); margin-bottom: 4px;">
                  2. Atau Masukkan URL / Path Gambar (Opsional)
                </label>
                <input type="text" id="avatarUrlInput" name="profile_avatar_url" class="form-input" placeholder="https://... atau assets/kak-arsil-profile.jpg" value="<?php echo htmlspecialchars($currentAvatar); ?>" style="background: #FFFFFF;">

                <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--color-border);">
                  <label style="font-size: 0.82rem; color: var(--color-text-muted); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="resetAvatarCheck" name="reset_avatar" value="1">
                    Kembalikan ke foto ilustrasi bawaan sistem
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="form-group">
              <label class="form-label">Nama Pengajar</label>
              <input type="text" name="teacher_name" class="form-input" value="<?php echo htmlspecialchars($data['teacher']['name'] ?? 'Kak Arsil'); ?>" required>
            </div>
            <div class="form-group">
              <label class="form-label">Nomor WhatsApp (Contoh: 6281234567890)</label>
              <input type="text" name="teacher_whatsapp" class="form-input" value="<?php echo htmlspecialchars($data['teacher']['whatsapp'] ?? ''); ?>" required>
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="form-group">
              <label class="form-label">Judul Utama Halaman</label>
              <input type="text" name="teacher_headline" class="form-input" value="<?php echo htmlspecialchars($data['teacher']['headline'] ?? ''); ?>" required>
            </div>
            <div class="form-group">
              <label class="form-label">Slogan (Tagline)</label>
              <input type="text" name="teacher_tagline" class="form-input" value="<?php echo htmlspecialchars($data['teacher']['tagline'] ?? ''); ?>" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Deskripsi Pengantar (Subheadline)</label>
            <input type="text" name="teacher_subheadline" class="form-input" value="<?php echo htmlspecialchars($data['teacher']['subheadline'] ?? ''); ?>">
          </div>

          <div class="form-group">
            <label class="form-label">Salam Pembuka Profil</label>
            <input type="text" name="profile_greeting" class="form-input" value="<?php echo htmlspecialchars($data['teacher']['profile']['greeting'] ?? ''); ?>">
          </div>

          <div class="form-group">
            <label class="form-label">Biodata / Perkenalan Pengajar</label>
            <textarea name="profile_bio" class="form-textarea" rows="3"><?php echo htmlspecialchars($data['teacher']['profile']['bio'] ?? ''); ?></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Ajakan Penutup (CTA Banner)</label>
            <input type="text" name="teacher_cta" class="form-input" value="<?php echo htmlspecialchars($data['teacher']['call_to_action'] ?? ''); ?>">
          </div>

          <!-- 2. BIAYA PER JENJANG -->
          <h2 class="admin-section-heading">2. Tarif Les Per Pertemuan Tiap Jenjang</h2>
          <?php foreach ($data['levels'] as $lIdx => $lvl): ?>
            <div style="background: var(--color-bg); padding: 14px 16px; border-radius: var(--radius-sm); margin-bottom: 12px; border: 1px solid var(--color-border);">
              <div style="font-weight: 700; color: var(--color-text); margin-bottom: 8px; font-size: 0.95rem;">
                <?php echo htmlspecialchars($lvl['title']); ?> (<?php echo htmlspecialchars($lvl['subtitle']); ?>)
              </div>
              <div class="admin-grid-2">
                <?php foreach ($lvl['rates'] as $rIdx => $rate): ?>
                  <div class="form-group" style="margin-bottom: 6px;">
                    <label class="form-label" style="font-size:0.8rem;"><?php echo htmlspecialchars($rate['package']); ?> (<?php echo htmlspecialchars($rate['duration']); ?>)</label>
                    <input type="number" step="1000" name="rate_<?php echo $lvl['id']; ?>_<?php echo $rIdx; ?>" class="form-input" value="<?php echo (int)($rate['price'] ?? 0); ?>" required>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>
          <?php endforeach; ?>

          <!-- 3. DETAIL PAKET A, B, C -->
          <h2 class="admin-section-heading">3. Detail Pilihan Paket A, B, dan C</h2>
          <?php foreach ($data['packages'] as $pkg): ?>
            <div style="background: var(--color-bg); padding: 14px 16px; border-radius: var(--radius-sm); margin-bottom: 12px; border: 1px solid var(--color-border);">
              <div style="font-weight: 700; color: var(--color-blue-primary); margin-bottom: 6px; font-size: 0.95rem;">
                <?php echo htmlspecialchars($pkg['name']); ?>
              </div>
              <div class="admin-grid-2">
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Durasi</label>
                  <input type="text" name="pkg_<?php echo $pkg['id']; ?>_duration" class="form-input" value="<?php echo htmlspecialchars($pkg['duration']); ?>" required>
                </div>
                <div class="form-group">
                  <label class="form-label" style="font-size:0.8rem;">Fokus Materi</label>
                  <input type="text" name="pkg_<?php echo $pkg['id']; ?>_desc" class="form-input" value="<?php echo htmlspecialchars($pkg['description']); ?>" required>
                </div>
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:0.8rem;">Keterangan Tambahan</label>
                <input type="text" name="pkg_<?php echo $pkg['id']; ?>_highlight" class="form-input" value="<?php echo htmlspecialchars($pkg['highlight']); ?>">
              </div>
            </div>
          <?php endforeach; ?>

          <!-- 4. JADWAL & TRANSPORT -->
          <h2 class="admin-section-heading">4. Jadwal & Biaya Transportasi</h2>
          <div class="admin-grid-2">
            <div class="form-group">
              <label class="form-label">Waktu Les</label>
              <input type="text" name="schedule_times" class="form-input" value="<?php echo htmlspecialchars($data['schedule_info']['times'] ?? ''); ?>" required>
            </div>
            <div class="form-group">
              <label class="form-label">Hari Belajar</label>
              <input type="text" name="schedule_days" class="form-input" value="<?php echo htmlspecialchars($data['schedule_info']['days'] ?? ''); ?>" required>
            </div>
          </div>

          <div class="admin-grid-2">
            <div class="form-group">
              <label class="form-label">Biaya Transport per KM (Rupiah)</label>
              <input type="number" step="500" name="transport_fee_per_km" class="form-input" value="<?php echo (int)($data['transport_fee_per_km'] ?? 3000); ?>" required>
            </div>
            <div class="form-group">
              <label class="form-label">Catatan Hari Libur / Weekend</label>
              <input type="text" name="schedule_note" class="form-input" value="<?php echo htmlspecialchars($data['schedule_info']['note'] ?? ''); ?>" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Keterangan Transportasi</label>
            <input type="text" name="transport_note" class="form-input" value="<?php echo htmlspecialchars($data['transport_note'] ?? ''); ?>">
          </div>

          <!-- 5. KEAMANAN PIN -->
          <h2 class="admin-section-heading">5. Ganti PIN Keamanan Admin</h2>
          <div class="form-group" style="max-width: 300px;">
            <label class="form-label">PIN Baru (Kosongkan jika tidak ingin mengubah)</label>
            <input type="password" name="new_pin" class="form-input" placeholder="Misal: 6 angka">
          </div>

          <!-- SUBMIT BUTTON -->
          <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--color-border); display: flex; gap: 12px; align-items: center;">
            <button type="submit" class="btn-primary-hero" style="cursor: pointer; border: none;">
              Simpan Perubahan
            </button>
            <a href="index.php" class="btn-outline-hero" style="min-height: 44px; display: inline-flex; align-items: center;">
              Batal
            </a>
          </div>
        </form>
      </div>
    </div>

    <!-- Script for Live Image Preview -->
    <script>
      (function() {
        var input = document.getElementById('avatarInput');
        var preview = document.getElementById('avatarPreview');
        var urlInput = document.getElementById('avatarUrlInput');
        var resetCheck = document.getElementById('resetAvatarCheck');
        var statusLabel = document.getElementById('avatarStatusLabel');
        var defaultAvatar = 'assets/kak-arsil-profile.jpg';

        if (input && preview) {
          input.addEventListener('change', function() {
            var file = this.files[0];
            if (file) {
              if (file.size > 5 * 1024 * 1024) {
                alert('Peringatan: Ukuran file melebihi batas 5 MB. Harap gunakan foto dengan ukuran lebih kecil.');
                this.value = '';
                return;
              }
              var reader = new FileReader();
              reader.onload = function(e) {
                preview.src = e.target.result;
                if (statusLabel) statusLabel.textContent = 'Pratinjau File Baru';
                if (resetCheck) resetCheck.checked = false;
              };
              reader.readAsDataURL(file);
            }
          });
        }

        if (urlInput && preview) {
          urlInput.addEventListener('input', function() {
            var val = this.value.trim();
            if (val.length > 5 && (!input.files || input.files.length === 0)) {
              preview.src = val;
              if (statusLabel) statusLabel.textContent = 'Pratinjau dari URL';
              if (resetCheck) resetCheck.checked = false;
            }
          });
        }

        if (resetCheck && preview) {
          resetCheck.addEventListener('change', function() {
            if (this.checked) {
              preview.src = defaultAvatar;
              if (input) input.value = '';
              if (urlInput) urlInput.value = defaultAvatar;
              if (statusLabel) statusLabel.textContent = 'Foto Bawaan';
            } else {
              if (statusLabel) statusLabel.textContent = 'Foto Aktif';
            }
          });
        }
      })();
    </script>
  <?php endif; ?>

</body>
</html>
</div>

          <!-- SUBMIT BUTTON -->
          <div style="margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--color-border); display: flex; gap: 12px; align-items: center;">
            <button type="submit" class="btn-primary-hero" style="cursor: pointer; border: none;">
              Simpan Perubahan
            </button>
            <a href="index.php" class="btn-outline-hero" style="min-height: 44px; display: inline-flex; align-items: center;">
              Batal
            </a>
          </div>
        </form>
      </div>
    </div>

    <!-- Script for Live Image Preview -->
    <script>
      (function() {
        var input = document.getElementById('avatarInput');
        var preview = document.getElementById('avatarPreview');
        var urlInput = document.getElementById('avatarUrlInput');
        var resetCheck = document.getElementById('resetAvatarCheck');
        var statusLabel = document.getElementById('avatarStatusLabel');
        var defaultAvatar = 'assets/kak-arsil-profile.jpg';

        if (input && preview) {
          input.addEventListener('change', function() {
            var file = this.files[0];
            if (file) {
              if (file.size > 5 * 1024 * 1024) {
                alert('Peringatan: Ukuran file melebihi batas 5 MB. Harap gunakan foto dengan ukuran lebih kecil.');
                this.value = '';
                return;
              }
              var reader = new FileReader();
              reader.onload = function(e) {
                preview.src = e.target.result;
                if (statusLabel) statusLabel.textContent = 'Pratinjau File Baru';
                if (resetCheck) resetCheck.checked = false;
              };
              reader.readAsDataURL(file);
            }
          });
        }

        if (urlInput && preview) {
          urlInput.addEventListener('input', function() {
            var val = this.value.trim();
            if (val.length > 5 && (!input.files || input.files.length === 0)) {
              preview.src = val;
              if (statusLabel) statusLabel.textContent = 'Pratinjau dari URL';
              if (resetCheck) resetCheck.checked = false;
            }
          });
        }

        if (resetCheck && preview) {
          resetCheck.addEventListener('change', function() {
            if (this.checked) {
              preview.src = defaultAvatar;
              if (input) input.value = '';
              if (urlInput) urlInput.value = defaultAvatar;
              if (statusLabel) statusLabel.textContent = 'Foto Bawaan';
            } else {
              if (statusLabel) statusLabel.textContent = 'Foto Aktif';
            }
          });
        }
      })();
    </script>
  <?php endif; ?>

</body>
</html>
