/**
 * Supabase Configuration & Data Adapter
 * Mendukung pembacaan dari file maupun localStorage (agar mudah disetting via admin.html).
 */

(function (window) {
  'use strict';

  // Nilai default resmi project Supabase
  var DEFAULT_SUPABASE_URL = 'https://ixfbfegdleolvehjfggc.supabase.co';
  var DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZmJmZWdkbGVvbHZlaGpmZ2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMTA1MzgsImV4cCI6MjEwNjU4NjUzOH0.dtnNfgC7-nQOvM_SA1RK93qzeI5pQKgACBZceLZoFRs';

  var STORAGE_KEY_URL = 'arsil_supabase_url';
  var STORAGE_KEY_KEY = 'arsil_supabase_anon_key';

  function sanitizeUrl(rawUrl) {
    if (!rawUrl) return '';
    var u = String(rawUrl).trim();

    // Jika user copy URL dashboard browser Supabase:
    // Contoh: https://supabase.com/dashboard/project/abcdefghijklmnopqrst
    var dashboardMatch = u.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9_\-]+)/i);
    if (dashboardMatch && dashboardMatch[1]) {
      return 'https://' + dashboardMatch[1] + '.supabase.co';
    }

    // Pastikan prefix https://
    if (!/^https?:\/\//i.test(u)) {
      u = 'https://' + u;
    }

    // Hapus trailing slashes dan subpath API yang tidak sengaja terbawa
    u = u.replace(/\/+$/, '');
    u = u.replace(/\/rest\/v1\/?$/i, '');
    u = u.replace(/\/auth\/v1\/?$/i, '');
    u = u.replace(/\/graphql\/v1\/?$/i, '');
    u = u.replace(/\/storage\/v1\/?$/i, '');

    return u;
  }

  function sanitizeKey(rawKey) {
    if (!rawKey) return '';
    var k = String(rawKey).trim();
    // Hapus tanda petik jika ada
    k = k.replace(/^["']|["']$/g, '');
    return k;
  }

  function getSupabaseUrl() {
    var stored = localStorage.getItem(STORAGE_KEY_URL);
    if (stored && stored.trim()) return sanitizeUrl(stored);
    return sanitizeUrl(DEFAULT_SUPABASE_URL);
  }

  function getSupabaseAnonKey() {
    var stored = localStorage.getItem(STORAGE_KEY_KEY);
    if (stored && stored.trim()) return sanitizeKey(stored);
    return sanitizeKey(DEFAULT_SUPABASE_ANON_KEY);
  }

  var _client = null;

  function setSupabaseConfig(url, key) {
    _client = null; // Reset cached client
    if (url) {
      var cleanedUrl = sanitizeUrl(url);
      localStorage.setItem(STORAGE_KEY_URL, cleanedUrl);
    }
    if (key) {
      var cleanedKey = sanitizeKey(key);
      localStorage.setItem(STORAGE_KEY_KEY, cleanedKey);
    }
  }

  function clearSupabaseConfig() {
    _client = null;
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_KEY);
  }

  function isConfigured() {
    var url = getSupabaseUrl();
    var key = getSupabaseAnonKey();
    return Boolean(url && key && url.indexOf('supabase.co') !== -1);
  }

  function getClient() {
    if (!window.supabase || !isConfigured()) return null;
    var url = getSupabaseUrl();
    var key = getSupabaseAnonKey();
    try {
      if (!_client) {
        _client = window.supabase.createClient(url, key);
      }
      return _client;
    } catch (e) {
      console.error('Error saat inisialisasi Supabase:', e);
      return null;
    }
  }

  // Ambil data website dari tabel site_settings Supabase
  async function fetchSiteData() {
    var client = getClient();
    if (!client) {
      return null;
    }

    try {
      var res = await client
        .from('site_settings')
        .select('content')
        .eq('id', 'arsiles_main')
        .single();

      if (res.data && res.data.content) {
        return res.data.content;
      }
      if (res.error) {
        console.warn('Supabase fetch notice:', res.error.message);
      }
      return null;
    } catch (err) {
      console.error('Gagal mengambil data dari Supabase:', err);
      return null;
    }
  }

  // Simpan data website ke tabel site_settings Supabase
  async function saveSiteData(newContent) {
    var client = getClient();
    if (!client) {
      throw new Error('Supabase belum dikonfigurasi. Harap isi URL dan Anon Key terlebih dahulu.');
    }

    var res = await client
      .from('site_settings')
      .upsert({
        id: 'arsiles_main',
        content: newContent,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (res.error) {
      throw res.error;
    }
    return true;
  }

  window.ArsilSupabase = {
    getUrl: getSupabaseUrl,
    getKey: getSupabaseAnonKey,
    sanitizeUrl: sanitizeUrl,
    sanitizeKey: sanitizeKey,
    setConfig: setSupabaseConfig,
    clearConfig: clearSupabaseConfig,
    isConfigured: isConfigured,
    getClient: getClient,
    fetchSiteData: fetchSiteData,
    saveSiteData: saveSiteData
  };

})(window);
