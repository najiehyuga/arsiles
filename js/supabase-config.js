/**
 * Supabase Configuration & Data Adapter
 * Mendukung pembacaan dari file maupun localStorage (agar mudah disetting via admin.html).
 */

(function (window) {
  'use strict';

  // Nilai default (dapat Anda isi di sini atau disimpan lewat formulir pengaturan di admin.html)
  var DEFAULT_SUPABASE_URL = '';
  var DEFAULT_SUPABASE_ANON_KEY = '';

  var STORAGE_KEY_URL = 'arsil_supabase_url';
  var STORAGE_KEY_KEY = 'arsil_supabase_anon_key';

  function getSupabaseUrl() {
    var stored = localStorage.getItem(STORAGE_KEY_URL);
    if (stored && stored.trim()) return stored.trim();
    return DEFAULT_SUPABASE_URL;
  }

  function getSupabaseAnonKey() {
    var stored = localStorage.getItem(STORAGE_KEY_KEY);
    if (stored && stored.trim()) return stored.trim();
    return DEFAULT_SUPABASE_ANON_KEY;
  }

  function setSupabaseConfig(url, key) {
    if (url) localStorage.setItem(STORAGE_KEY_URL, url.trim());
    if (key) localStorage.setItem(STORAGE_KEY_KEY, key.trim());
  }

  function clearSupabaseConfig() {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_KEY);
  }

  function isConfigured() {
    var url = getSupabaseUrl();
    var key = getSupabaseAnonKey();
    return Boolean(url && key && url.indexOf('supabase.co') !== -1);
  }

  var _client = null;
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
    setConfig: setSupabaseConfig,
    clearConfig: clearSupabaseConfig,
    isConfigured: isConfigured,
    getClient: getClient,
    fetchSiteData: fetchSiteData,
    saveSiteData: saveSiteData
  };

})(window);
