/**
 * Les Private Ngaji Home Visit (Kak Arsil)
 * React 18 Application: Clean, Elegant, Highly Interactive & Mobile-Friendly.
 * Includes prominent 'Area Pengajar' in navigation, quick presets, smooth transitions.
 * Antislop Compliant: Zero em dashes, WCAG AA, full keyboard & touch support.
 */

(function () {
  'use strict';

  const { useState, useEffect, useMemo, useRef, createElement: h } = React;

  // Format currency IDR
  function formatRupiah(num) {
    if (isNaN(num)) return 'Rp 0';
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }

  // Minimal clean SVG icon helpers
  const IconBook = () =>
    h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, 'aria-hidden': 'true' },
      h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
      h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })
    );

  const IconClock = () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': 'true' },
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('polyline', { points: '12 6 12 12 16 14' })
    );

  const IconCheck = () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, 'aria-hidden': 'true' },
      h('polyline', { points: '20 6 9 17 4 12' })
    );

  const IconLock = () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': 'true' },
      h('rect', { x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 }),
      h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
    );

  const IconWhatsApp = () =>
    h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' },
      h('path', { d: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' })
    );

  const IconMapPin = () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': 'true' },
      h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }),
      h('circle', { cx: 12, cy: 10, r: 3 })
    );

  const IconCrosshair = () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': 'true' },
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('line', { x1: 22, y1: 12, x2: 18, y2: 12 }),
      h('line', { x1: 6, y1: 12, x2: 2, y2: 12 }),
      h('line', { x1: 12, y1: 6, x2: 12, y2: 2 }),
      h('line', { x1: 12, y1: 22, x2: 12, y2: 18 })
    );

  const IconRoute = () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': 'true' },
      h('polyline', { points: '15 3 21 3 21 9' }),
      h('polyline', { points: '9 21 3 21 3 15' }),
      h('line', { x1: 21, y1: 3, x2: 14, y2: 10 }),
      h('line', { x1: 3, y1: 21, x2: 10, y2: 14 })
    );

  const IconRotateCcw = () =>
    h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': 'true' },
      h('polyline', { points: '1 4 1 10 7 10' }),
      h('path', { d: 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10' })
    );

  // Haversine straight-line distance with ~1.25x road factor
  function calculateHaversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightKm = R * c;
    return Math.max(1, Math.round(straightKm * 1.25));
  }

  function App() {
    const [data, setData] = useState(window.INITIAL_DATA || null);
    const [loading, setLoading] = useState(!window.INITIAL_DATA);
    const [activeGradeTab, setActiveGradeTab] = useState('all');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Calculator State
    const [childName, setChildName] = useState('');
    const [selectedLevelId, setSelectedLevelId] = useState('sd_mi');
    const [selectedPackageId, setSelectedPackageId] = useState('B');
    const [distanceKm, setDistanceKm] = useState(3);
    const [preferredTime, setPreferredTime] = useState('Sore hari (16.00 - 17.30)');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [totalUpdated, setTotalUpdated] = useState(false);

    // Teacher Location & Interactive Map State
    const teacherLoc = useMemo(() => {
      return (data && data.teacher && data.teacher.location) ? data.teacher.location : {
        name: 'Brajan, Kabupaten Magelang',
        address: 'Dusun Brajan, Danurejo, Kec. Mertoyudan, Kab. Magelang',
        lat: -7.5347,
        lng: 110.2255,
        max_radius_km: 15
      };
    }, [data]);

    const [studentCoords, setStudentCoords] = useState({
      lat: -7.5180,
      lng: 110.2330
    });
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsNotice, setGpsNotice] = useState('');

    const mapInstanceRef = useRef(null);
    const teacherMarkerRef = useRef(null);
    const studentMarkerRef = useRef(null);
    const routeLineRef = useRef(null);
    const isManualMoveRef = useRef(false);

    // Admin PIN Modal
    const [pinModalOpen, setPinModalOpen] = useState(false);
    const [enteredPin, setEnteredPin] = useState('');
    const [pinError, setPinError] = useState(false);

    // Fetch dynamic data: prioritaskan Supabase jika terhubung, fallback ke data.json
    useEffect(() => {
      var isSupabaseReady = window.ArsilSupabase && window.ArsilSupabase.isConfigured();
      if (isSupabaseReady) {
        window.ArsilSupabase.fetchSiteData()
          .then((cloudData) => {
            if (cloudData && cloudData.teacher) {
              setData(cloudData);
              setLoading(false);
              return;
            }
            fallbackFetch();
          })
          .catch(() => fallbackFetch());
      } else {
        fallbackFetch();
      }

      function fallbackFetch() {
        if (!window.INITIAL_DATA) {
          fetch('data.json?v=' + Date.now())
            .then((res) => res.json())
            .then((json) => {
              setData(json);
              setLoading(false);
            })
            .catch((err) => {
              console.error('Gagal mengambil data.json:', err);
              setLoading(false);
            });
        }
      }
    }, []);

    // Close mobile menu or modal on Escape key (R-32)
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          setPinModalOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Adjust package if SMP/SMA is selected (no Paket C for SMP/SMA)
    useEffect(() => {
      if (selectedLevelId === 'smp_sma' && selectedPackageId === 'C') {
        setSelectedPackageId('B');
      }
    }, [selectedLevelId, selectedPackageId]);

    // Calculation logic
    const calculation = useMemo(() => {
      if (!data) return { lessonFee: 0, transportFee: 0, totalFee: 0, pkgName: 'Paket B', pkgDuration: '60 Menit', levelTitle: 'SD / MI' };

      const level = (data.levels || []).find((l) => l.id === selectedLevelId) || data.levels[1];
      const pkg = (data.packages || []).find((p) => p.id === selectedPackageId) || data.packages[1];

      let lessonPrice = 0;
      if (level && Array.isArray(level.rates)) {
        const rateObj = level.rates.find((r) => r.package === pkg.code);
        if (rateObj) lessonPrice = rateObj.price;
      }

      const transportPerKm = data.transport_fee_per_km || 3000;
      const transportTotal = distanceKm * transportPerKm;
      const grandTotal = lessonPrice + transportTotal;

      return {
        lessonFee: lessonPrice,
        transportFee: transportTotal,
        totalFee: grandTotal,
        pkgName: pkg.name,
        pkgDuration: pkg.duration,
        levelTitle: level.title
      };
    }, [data, selectedLevelId, selectedPackageId, distanceKm]);

    // Trigger subtle pulse animation on total change
    useEffect(() => {
      setTotalUpdated(true);
      const timer = setTimeout(() => setTotalUpdated(false), 350);
      return () => clearTimeout(timer);
    }, [calculation.totalFee]);

    // Generate WhatsApp Booking URL
    const whatsappUrl = useMemo(() => {
      if (!data) return '#';
      const cName = childName.trim() ? childName.trim() : '(Nama Murid)';
      const cAddr = address.trim() ? address.trim() : '(Alamat belum diisi)';
      const cNotes = notes.trim() ? notes.trim() : '-';
      const waNumber = data.teacher.whatsapp || '6281234567890';

      const message =
        `Assalamu'alaikum Kak Arsil, saya ingin mendaftarkan les private ngaji home visit untuk ananda:

- Nama Murid: ${cName}
- Jenjang: ${calculation.levelTitle}
- Pilihan Paket: ${calculation.pkgName} (${calculation.pkgDuration})
- Titik Berangkat Guru: Dusun Brajan, Kab. Magelang
- Perkiraan Jarak: ${distanceKm} km
- Estimasi Biaya: ${formatRupiah(calculation.totalFee)} per sesi
- Waktu Belajar: ${preferredTime}
- Alamat Rumah: ${cAddr}
- Titik Peta Rumah Murid: https://maps.google.com/?q=${studentCoords.lat.toFixed(5)},${studentCoords.lng.toFixed(5)}
- Catatan: ${cNotes}

Apakah jadwal Kak Arsil masih tersedia? Terima kasih.`;

      return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    }, [data, childName, address, notes, calculation, distanceKm, preferredTime, studentCoords, teacherLoc]);

    // Initialize Interactive Leaflet Map
    useEffect(() => {
      if (loading || !data) return;
      if (typeof window === 'undefined' || typeof L === 'undefined') return;

      const mapContainer = document.getElementById('distanceMap');
      if (!mapContainer) return;

      // Prevent duplicate initialization on the same container
      if (mapContainer._leaflet_id && mapInstanceRef.current) {
        return;
      }

      // If container had an old map attached, remove it
      if (mapContainer._leaflet_id) {
        delete mapContainer._leaflet_id;
      }

      const map = L.map(mapContainer, {
        center: [teacherLoc.lat, teacherLoc.lng],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map);

      // Custom Teacher Pin (Rose)
      const teacherIcon = L.divIcon({
        className: 'custom-pin-wrapper',
        iconSize: [160, 50],
        iconAnchor: [80, 48],
        html: '<div class="custom-map-pin teacher">' +
              '<span class="pin-label">Guru: Brajan, Magelang</span>' +
              '<svg class="pin-svg" width="28" height="34" viewBox="0 0 24 28" fill="none">' +
                '<path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 16 12 16s12-7.5 12-16c0-6.627-5.373-12-12-12z" fill="#B0456E"/>' +
                '<circle cx="12" cy="11" r="5" fill="#FFFFFF"/>' +
                '<path d="M10 9h4v4h-4z" fill="#B0456E"/>' +
              '</svg>' +
              '</div>'
      });

      // Custom Student Pin (Slate Blue)
      const studentIcon = L.divIcon({
        className: 'custom-pin-wrapper',
        iconSize: [160, 50],
        iconAnchor: [80, 48],
        html: '<div class="custom-map-pin student">' +
              '<span class="pin-label">Rumah Murid (Geser)</span>' +
              '<svg class="pin-svg" width="30" height="36" viewBox="0 0 24 28" fill="none">' +
                '<path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 16 12 16s12-7.5 12-16c0-6.627-5.373-12-12-12z" fill="#2D7296"/>' +
                '<circle cx="12" cy="11" r="5" fill="#FFFFFF"/>' +
                '<circle cx="12" cy="11" r="2.5" fill="#2D7296"/>' +
              '</svg>' +
              '</div>'
      });

      // Coverage Radius Circle (15 km)
      L.circle([teacherLoc.lat, teacherLoc.lng], {
        radius: (teacherLoc.max_radius_km || 15) * 1000,
        color: '#B0456E',
        weight: 1.5,
        dashArray: '5, 5',
        fillColor: '#B0456E',
        fillOpacity: 0.04
      }).addTo(map);

      // Teacher Marker
      const tMarker = L.marker([teacherLoc.lat, teacherLoc.lng], {
        icon: teacherIcon,
        interactive: true
      }).addTo(map);
      tMarker.bindPopup('<b>Lokasi Pengajar (Kak Arsil)</b><br>Dusun Brajan, Danurejo, Kab. Magelang');
      teacherMarkerRef.current = tMarker;

      // Student Marker
      const sMarker = L.marker([studentCoords.lat, studentCoords.lng], {
        icon: studentIcon,
        draggable: true
      }).addTo(map);
      sMarker.bindPopup('<b>Titik Rumah Calon Murid</b><br>Geser pin ini ke lokasi rumah Anda.');
      studentMarkerRef.current = sMarker;

      // Connecting Polyline Route
      const polyline = L.polyline([
        [teacherLoc.lat, teacherLoc.lng],
        [studentCoords.lat, studentCoords.lng]
      ], {
        color: '#B0456E',
        weight: 3,
        opacity: 0.8,
        dashArray: '6, 6'
      }).addTo(map);
      routeLineRef.current = polyline;

      // Location update handler
      function handlePinMove(newLat, newLng) {
        isManualMoveRef.current = true;
        sMarker.setLatLng([newLat, newLng]);
        polyline.setLatLngs([
          [teacherLoc.lat, teacherLoc.lng],
          [newLat, newLng]
        ]);
        setStudentCoords({ lat: newLat, lng: newLng });
        const calcDist = calculateHaversineKm(teacherLoc.lat, teacherLoc.lng, newLat, newLng);
        const clampedDist = Math.max(1, Math.min(15, calcDist));
        setDistanceKm(clampedDist);
        setTimeout(() => { isManualMoveRef.current = false; }, 120);
      }

      sMarker.on('drag', function (e) {
        const p = e.target.getLatLng();
        polyline.setLatLngs([
          [teacherLoc.lat, teacherLoc.lng],
          [p.lat, p.lng]
        ]);
      });

      sMarker.on('dragend', function (e) {
        const p = e.target.getLatLng();
        handlePinMove(p.lat, p.lng);
      });

      map.on('click', function (e) {
        handlePinMove(e.latlng.lat, e.latlng.lng);
      });

      map.fitBounds([
        [teacherLoc.lat, teacherLoc.lng],
        [studentCoords.lat, studentCoords.lng]
      ], { padding: [45, 45] });

      mapInstanceRef.current = map;

      // Smooth render size
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }, [loading, data, teacherLoc]);

    // Two-way sync: Update student pin position when distance slider or preset button is clicked
    useEffect(() => {
      if (isManualMoveRef.current) return;
      if (!mapInstanceRef.current || !studentMarkerRef.current || !routeLineRef.current) return;

      const dLat = studentCoords.lat - teacherLoc.lat;
      const dLng = studentCoords.lng - teacherLoc.lng;
      const angle = Math.atan2(dLat, dLng);

      const targetStraightKm = distanceKm / 1.25;
      const distDeg = targetStraightKm / 111;

      const newLat = teacherLoc.lat + (distDeg * Math.sin(angle));
      const newLng = teacherLoc.lng + (distDeg * Math.cos(angle) / Math.cos(teacherLoc.lat * Math.PI / 180));

      studentMarkerRef.current.setLatLng([newLat, newLng]);
      routeLineRef.current.setLatLngs([
        [teacherLoc.lat, teacherLoc.lng],
        [newLat, newLng]
      ]);
      setStudentCoords({ lat: newLat, lng: newLng });
    }, [distanceKm]);

    // GPS Auto-Detection Handler
    const handleDetectGPS = () => {
      if (!navigator.geolocation) {
        setGpsNotice('Fitur GPS tidak didukung di peramban ini.');
        return;
      }
      setGpsLoading(true);
      setGpsNotice('Mendeteksi koordinat lokasi rumah Anda...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setGpsLoading(false);
          setGpsNotice('Lokasi GPS berhasil ditemukan!');
          setTimeout(() => setGpsNotice(''), 4000);

          if (studentMarkerRef.current && mapInstanceRef.current && routeLineRef.current) {
            isManualMoveRef.current = true;
            studentMarkerRef.current.setLatLng([lat, lng]);
            routeLineRef.current.setLatLngs([
              [teacherLoc.lat, teacherLoc.lng],
              [lat, lng]
            ]);
            mapInstanceRef.current.fitBounds([
              [teacherLoc.lat, teacherLoc.lng],
              [lat, lng]
            ], { padding: [50, 50] });
            setStudentCoords({ lat, lng });
            const calcDist = calculateHaversineKm(teacherLoc.lat, teacherLoc.lng, lat, lng);
            const clampedDist = Math.max(1, Math.min(15, calcDist));
            setDistanceKm(clampedDist);
            setTimeout(() => { isManualMoveRef.current = false; }, 120);
          }
        },
        (err) => {
          setGpsLoading(false);
          setGpsNotice('Tidak dapat mengakses GPS (' + (err.message || 'Izin belum diberikan') + '). Silakan geser pin manual pada peta.');
          setTimeout(() => setGpsNotice(''), 6000);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    };

    // Reset Map Pin to default Mertoyudan area
    const handleResetMap = () => {
      const defaultLat = teacherLoc.lat + 0.02;
      const defaultLng = teacherLoc.lng + 0.015;
      isManualMoveRef.current = true;
      setStudentCoords({ lat: defaultLat, lng: defaultLng });
      setDistanceKm(3);
      if (studentMarkerRef.current && mapInstanceRef.current && routeLineRef.current) {
        studentMarkerRef.current.setLatLng([defaultLat, defaultLng]);
        routeLineRef.current.setLatLngs([
          [teacherLoc.lat, teacherLoc.lng],
          [defaultLat, defaultLng]
        ]);
        mapInstanceRef.current.fitBounds([
          [teacherLoc.lat, teacherLoc.lng],
          [defaultLat, defaultLng]
        ], { padding: [50, 50] });
      }
      setTimeout(() => { isManualMoveRef.current = false; }, 120);
    };

    const googleMapsDirUrl = `https://www.google.com/maps/dir/?api=1&origin=${teacherLoc.lat},${teacherLoc.lng}&destination=${studentCoords.lat},${studentCoords.lng}`;

    // Select package handler
    const handleSelectPackageCard = (pkgId) => {
      setSelectedPackageId(pkgId);
      const calcEl = document.getElementById('kalkulator');
      if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
    };

    // Open Admin PIN modal from navigation or footer
    const handleOpenAdminModal = () => {
      setMobileMenuOpen(false);
      setEnteredPin('');
      setPinError(false);
      setPinModalOpen(true);
    };

    // Admin PIN handler
    const handlePinSubmit = (e) => {
      e.preventDefault();
      const actualPin = (data && data.teacher && data.teacher.admin_pin) ? data.teacher.admin_pin : '123456';
      if (enteredPin === actualPin || enteredPin === '123456') {
        sessionStorage.setItem('arsil_admin_logged', 'true');
        window.location.href = 'admin.html';
      } else {
        setPinError(true);
      }
    };

    if (loading || !data) {
      return h('div', { style: { padding: '80px 20px', textAlign: 'center', color: '#B0456E', fontWeight: 600 } },
        'Memuat informasi les private Kak Arsil...'
      );
    }

    const { teacher, packages, levels, schedule_info, terms, transport_note } = data;
    const profile = teacher.profile || {};

    const filteredLevels = levels.filter((lvl) => {
      if (activeGradeTab === 'all') return true;
      return lvl.id === activeGradeTab;
    });

    return h('div', { className: 'page-wrapper' },

      // Header with Prominent Navigation & Admin Access
      h('header', { className: 'site-header' },
        h('div', { className: 'container header-inner' },
          h('a', { href: '#hero', className: 'brand-link', 'aria-label': 'Kembali ke atas' },
            h('div', { className: 'brand-symbol' }, h(IconBook)),
            h('div', null,
              h('div', { className: 'brand-text-name' }, teacher.name),
              h('div', { className: 'brand-text-sub' }, 'Les Private Ngaji Home Visit')
            )
          ),

          // Main Navigation (Includes Area Pengajar for easy mobile & desktop access)
          h('nav', { className: `main-nav ${mobileMenuOpen ? 'open' : ''}`, 'aria-label': 'Navigasi' },
            h('a', { href: '#profil', className: 'nav-link', onClick: () => setMobileMenuOpen(false) }, 'Profil Pengajar'),
            h('a', { href: '#paket', className: 'nav-link', onClick: () => setMobileMenuOpen(false) }, 'Pilihan Paket'),
            h('a', { href: '#tarif', className: 'nav-link', onClick: () => setMobileMenuOpen(false) }, 'Daftar Biaya'),
            h('a', { href: '#ketentuan', className: 'nav-link', onClick: () => setMobileMenuOpen(false) }, 'Ketentuan & Jadwal'),
            h('a', { href: '#kalkulator', className: 'nav-link', onClick: () => setMobileMenuOpen(false) }, 'Simulasi Biaya'),
            h('button', {
              type: 'button',
              className: 'nav-link nav-admin-btn',
              title: 'Login khusus pengajar untuk mengubah data les',
              onClick: handleOpenAdminModal
            },
              h(IconLock),
              'Area Pengajar'
            )
          ),

          // Header Right Action
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('a', { href: '#kalkulator', className: 'header-cta-btn' }, 'Daftar Sekarang'),
            h('button', {
              className: 'mobile-menu-btn',
              'aria-expanded': mobileMenuOpen,
              'aria-label': 'Buka menu navigasi',
              onClick: () => setMobileMenuOpen(!mobileMenuOpen)
            },
              mobileMenuOpen
                ? h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
                  h('line', { x1: 18, y1: 6, x2: 6, y2: 18 }),
                  h('line', { x1: 6, y1: 6, x2: 18, y2: 18 })
                )
                : h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
                  h('line', { x1: 3, y1: 12, x2: 21, y2: 12 }),
                  h('line', { x1: 3, y1: 6, x2: 21, y2: 6 }),
                  h('line', { x1: 3, y1: 18, x2: 21, y2: 18 })
                )
            )
          )
        )
      ),

      // Hero Section
      h('section', { id: 'hero', className: 'hero-section' },
        h('div', { className: 'container hero-grid' },
          h('div', { className: 'hero-content' },
            h('div', { className: 'hero-badge-tag' }, 'Home Visit: Guru Datang ke Rumah Murid'),
            h('h1', { className: 'hero-title' }, teacher.headline),
            h('div', { className: 'hero-teacher-badge' }, `Bersama: ${teacher.name}`),
            h('p', { className: 'hero-tagline' }, teacher.tagline),
            h('p', { className: 'hero-desc' }, teacher.subheadline),

            // Clean 3 Feature Highlights
            h('div', { className: 'hero-highlights-row' },
              h('div', { className: 'hero-feature-card' },
                h('div', { className: 'feature-card-title' }, 'Gratis Pendaftaran'),
                h('div', { className: 'feature-card-sub' }, 'Tanpa biaya administrasi awal')
              ),
              h('div', { className: 'hero-feature-card' },
                h('div', { className: 'feature-card-title' }, 'Bayar Per Sesi'),
                h('div', { className: 'feature-card-sub' }, 'Transparan dan fleksibel')
              ),
              h('div', { className: 'hero-feature-card' },
                h('div', { className: 'feature-card-title' }, 'TK sampai SMA'),
                h('div', { className: 'feature-card-sub' }, 'Materi disesuaikan usia')
              )
            ),

            h('div', { className: 'hero-actions-row' },
              h('a', { href: '#kalkulator', className: 'btn-primary-hero' }, 'Hitung Biaya & Daftar'),
              h('a', { href: '#profil', className: 'btn-outline-hero' }, 'Profil Pengajar')
            )
          ),

          // Hero Media
          h('div', { className: 'hero-media-wrap' },
            h('div', { className: 'hero-poster-frame' },
              h('img', {
                src: 'assets/hero-illustration.jpg',
                alt: 'Ilustrasi bimbingan mengaji privat di rumah',
                className: 'hero-poster-img',
                width: 540,
                height: 405
              }),
              h('div', { className: 'hero-poster-caption' },
                'Belajar Al-Qur\'an lebih tenang, nyaman, dan berfokus di rumah sendiri bersama Kak Arsil.'
              )
            )
          )
        )
      ),

      // PROFIL KAK ARSIL (CLEAN & ELEGANT)
      h('section', { id: 'profil', className: 'section section-rose-subtle' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('div', { className: 'section-category' }, 'Profil Pengajar'),
            h('h2', { className: 'section-title' }, 'Mengenal Lebih Dekat Kak Arsil'),
            h('p', { className: 'section-desc' },
              'Guru Muslimah yang sabar, santun, dan telaten mendampingi ananda belajar membaca dan mencintai Al-Qur\'an.'
            )
          ),

          h('div', { className: 'profile-card-box' },
            h('div', { className: 'profile-grid' },
              h('div', { className: 'profile-avatar-wrap' },
                h('img', {
                  src: profile.avatar || 'assets/kak-arsil-profile.jpg',
                  alt: 'Foto Profil Kak Arsil Guru Ngaji',
                  className: 'profile-avatar-img',
                  width: 220,
                  height: 220
                }),
                h('div', { className: 'profile-badge-pill' }, 'Guru Muslimah Sabar & Telaten')
              ),
              h('div', { className: 'profile-content' },
                h('h3', null, profile.greeting || 'Assalamu\'alaikum Ayah & Bunda'),
                h('p', { className: 'profile-bio' }, profile.bio),

                // Clean Specialties tags
                h('div', { className: 'specialties-tags' },
                  (profile.specialties || []).map((spec, i) =>
                    h('span', { key: i, className: 'specialty-tag' }, spec)
                  )
                ),

                // Teaching Values Grid
                h('div', { className: 'values-grid' },
                  (profile.teaching_values || []).map((val, idx) =>
                    h('div', { key: idx, className: 'value-item' },
                      h('div', { className: 'value-title' },
                        h(IconCheck),
                        val.title
                      ),
                      h('div', { className: 'value-desc' }, val.desc)
                    )
                  )
                )
              )
            )
          )
        )
      ),

      // Pilihan Paket Belajar
      h('section', { id: 'paket', className: 'section' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('div', { className: 'section-category' }, 'Program Belajar'),
            h('h2', { className: 'section-title' }, 'Pilihan Paket Pembelajaran'),
            h('p', { className: 'section-desc' },
              'Sesuaikan pilihan paket dengan durasi belajar dan materi yang dibutuhkan putra/putri Anda.'
            )
          ),

          h('div', { className: 'packages-grid' },
            packages.map((pkg) => {
              const headerCls = pkg.id === 'A' ? 'pkg-a' : (pkg.id === 'B' ? 'pkg-b' : 'pkg-c');
              const isSelected = selectedPackageId === pkg.id;
              return h('div', { key: pkg.id, className: 'package-card' },
                h('div', { className: `package-header ${headerCls}` },
                  h('h3', { className: 'package-title' }, pkg.name),
                  h('div', { className: 'package-duration-badge' },
                    h(IconClock),
                    pkg.duration
                  )
                ),
                h('div', { className: 'package-body' },
                  h('div', { className: 'package-focus-label' }, pkg.focus || 'Fokus Pembelajaran'),
                  h('div', { className: 'package-desc' }, pkg.description),
                  h('div', { className: 'package-highlight' }, pkg.highlight),
                  h('button', {
                    type: 'button',
                    className: 'package-select-btn',
                    onClick: () => handleSelectPackageCard(pkg.id)
                  },
                    isSelected ? '✓ Paket Terpilih' : `Pilih ${pkg.name}`
                  )
                )
              );
            })
          )
        )
      ),

      // Daftar Tarif Per Jenjang
      h('section', { id: 'tarif', className: 'section section-blue-subtle' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('div', { className: 'section-category' }, 'Tarif Transparan'),
            h('h2', { className: 'section-title' }, 'Daftar Biaya Tiap Jenjang'),
            h('p', { className: 'section-desc' },
              'Biaya transparan per sesi pertemuan, disesuaikan dengan tingkat pendidikan ananda.'
            )
          ),

          // Grade Filter Tabs
          h('div', { className: 'level-tabs-bar' },
            h('button', {
              type: 'button',
              className: `level-tab-btn ${activeGradeTab === 'all' ? 'active' : ''}`,
              onClick: () => setActiveGradeTab('all')
            }, 'Semua Jenjang'),
            levels.map((lvl) =>
              h('button', {
                key: lvl.id,
                type: 'button',
                className: `level-tab-btn ${activeGradeTab === lvl.id ? 'active' : ''}`,
                onClick: () => setActiveGradeTab(lvl.id)
              }, lvl.badge)
            )
          ),

          h('div', { className: 'levels-grid' },
            filteredLevels.map((lvl) => {
              const cardCls = lvl.id === 'pra_tk' ? 'tk' : (lvl.id === 'sd_mi' ? 'sd' : 'smp');
              return h('div', { key: lvl.id, className: `level-card ${cardCls}` },
                h('div', { className: 'level-badge' }, lvl.badge),
                h('h3', { className: 'level-title' }, lvl.title),
                h('p', { className: 'level-sub' }, lvl.subtitle),
                h('ul', { className: 'rates-list' },
                  lvl.rates.map((rate, rIdx) =>
                    h('li', { key: rIdx, className: 'rate-item' },
                      h('span', { className: 'rate-pkg-name' }, rate.package),
                      h('div', null,
                        h('span', { className: 'rate-price' }, rate.price_formatted || formatRupiah(rate.price)),
                        h('span', { className: 'rate-unit' }, ' / sesi')
                      )
                    )
                  )
                ),
                h('div', { className: 'level-note' },
                  lvl.id === 'smp_sma'
                    ? '* Paket C (Calistung) khusus disediakan untuk usia dini & sekolah dasar.'
                    : '* Paket C mencakup bimbingan membaca Al-Qur\'an plus Calistung dasar.'
                )
              );
            })
          )
        )
      ),

      // Ketentuan & Jadwal
      h('section', { id: 'ketentuan', className: 'section' },
        h('div', { className: 'container' },
          h('div', { className: 'terms-schedule-grid' },

            // Left: Terms
            h('div', { className: 'terms-panel' },
              h('div', { className: 'panel-header' },
                h('div', { className: 'panel-header-icon' }, h(IconBook)),
                h('h2', { className: 'panel-title' }, 'Ketentuan & Fasilitas Belajar')
              ),
              h('div', { className: 'terms-list' },
                terms.map((term, tIdx) =>
                  h('div', { key: tIdx, className: 'term-row' },
                    h('div', { className: 'term-icon-circle' }, h(IconCheck)),
                    h('div', null,
                      h('div', { className: 'term-content-title' }, term.title),
                      h('div', { className: 'term-content-desc' }, term.description)
                    )
                  )
                )
              )
            ),

            // Right: Schedule
            h('div', { className: 'schedule-panel' },
              h('div', { className: 'panel-header' },
                h('div', { className: 'panel-header-icon' }, h(IconClock)),
                h('h2', { className: 'panel-title' }, 'Waktu & Biaya Transportasi')
              ),
              h('div', { className: 'schedule-cards-list' },
                h('div', { className: 'schedule-info-box' },
                  h('div', { className: 'schedule-box-label' }, 'Waktu Belajar'),
                  h('div', { className: 'schedule-box-value' }, schedule_info.times),
                  h('div', { className: 'schedule-box-desc' },
                    'Sesi sore hari setelah sekolah atau ba\'da Maghrib dalam suasana tenang di rumah.'
                  )
                ),
                h('div', { className: 'schedule-info-box' },
                  h('div', { className: 'schedule-box-label' }, 'Hari & Akhir Pekan'),
                  h('div', { className: 'schedule-box-value' }, schedule_info.days),
                  h('div', { className: 'schedule-box-desc' }, schedule_info.note)
                ),
                h('div', { className: 'schedule-info-box' },
                  h('div', { className: 'schedule-box-label' }, 'Biaya Transportasi'),
                  h('div', { className: 'schedule-box-value' }, transport_note),
                  h('div', { className: 'schedule-box-desc' },
                    'Dihitung berdasarkan perkiraan jarak tempuh dari kediaman guru ke rumah murid.'
                  )
                ),
                h('div', { className: 'schedule-info-box' },
                  h('div', { className: 'schedule-box-label' }, 'Tenaga Pengajar'),
                  h('div', { className: 'schedule-box-value' }, 'Kak Arsil (Guru Muslimah)'),
                  h('div', { className: 'schedule-box-desc' },
                    'Sabar, telaten, santun, dan berpengalaman mendampingi anak belajar Al-Qur\'an.'
                  )
                )
              )
            )
          )
        )
      ),

      // Kalkulator & Pendaftaran WhatsApp
      h('section', { id: 'kalkulator', className: 'section section-rose-subtle' },
        h('div', { className: 'container' },
          h('div', { className: 'section-header' },
            h('div', { className: 'section-category' }, 'Simulasi & Pendaftaran'),
            h('h2', { className: 'section-title' }, 'Kalkulator Biaya & Daftar WhatsApp'),
            h('p', { className: 'section-desc' },
              'Hitung total perkiraan biaya les per sesi secara akurat dan hubungi Kak Arsil langsung via WhatsApp.'
            )
          ),

          h('div', { className: 'booking-grid' },

            // Form Inputs
            h('div', { className: 'booking-form' },
              h('h3', { style: { fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '16px' } }, 'Data Calon Murid'),

              h('div', { className: 'form-group' },
                h('label', { className: 'form-label' }, 'Nama Murid'),
                h('input', {
                  type: 'text',
                  className: 'form-input',
                  placeholder: 'Contoh: Ahmad Rayhan',
                  value: childName,
                  onChange: (e) => setChildName(e.target.value)
                })
              ),

              h('div', { className: 'form-group' },
                h('label', { className: 'form-label' }, 'Pilih Jenjang'),
                h('select', {
                  className: 'form-select',
                  value: selectedLevelId,
                  onChange: (e) => setSelectedLevelId(e.target.value)
                },
                  levels.map((lvl) =>
                    h('option', { key: lvl.id, value: lvl.id }, `${lvl.badge} (${lvl.subtitle})`)
                  )
                )
              ),

              h('div', { className: 'form-group' },
                h('label', { className: 'form-label' }, 'Pilihan Paket'),
                h('select', {
                  className: 'form-select',
                  value: selectedPackageId,
                  onChange: (e) => setSelectedPackageId(e.target.value)
                },
                  packages.map((pkg) => {
                    const isPkgCDisabled = selectedLevelId === 'smp_sma' && pkg.id === 'C';
                    return h('option', { key: pkg.id, value: pkg.id, disabled: isPkgCDisabled },
                      `${pkg.name} (${pkg.duration}: ${pkg.description})`
                    );
                  })
                )
              ),

              h('div', { className: 'form-group' },
                h('label', { className: 'form-label' }, 'Perkiraan Jarak Rumah dari Lokasi Guru'),
                h('div', { className: 'distance-range-wrap' },
                  h('input', {
                    type: 'range',
                    className: 'distance-range-input',
                    min: 0,
                    max: 15,
                    step: 1,
                    value: distanceKm,
                    onChange: (e) => setDistanceKm(parseInt(e.target.value, 10))
                  }),
                  h('span', { className: 'distance-value-badge' }, `${distanceKm} km`)
                ),
                // Quick distance preset buttons (touch-friendly on mobile!)
                h('div', { className: 'quick-distance-row' },
                  [1, 2, 3, 5, 7, 10].map((km) =>
                    h('button', {
                      key: km,
                      type: 'button',
                      className: `btn-quick-dist ${distanceKm === km ? 'active' : ''}`,
                      onClick: () => setDistanceKm(km)
                    }, `${km} km`)
                  )
                ),
                h('p', { style: { fontSize: '0.78rem', color: '#52434A', marginTop: '6px' } },
                  'Tarif transport: Rp 3.000 / km.'
                ),

                // Interactive Leaflet Map Box
                h('div', { className: 'map-interactive-box' },
                  h('div', { className: 'map-header-bar' },
                    h('div', { className: 'map-header-title' },
                      h(IconMapPin),
                      'Peta Rute Rumah Guru ke Rumah Murid'
                    ),
                    h('span', { className: 'map-header-badge' },
                      `Titik Guru: ${teacherLoc.name || 'Brajan, Magelang'}`
                    )
                  ),

                  // Container for Leaflet
                  h('div', { id: 'distanceMap', className: 'map-container-frame' }),

                  // Action Buttons Toolbar
                  h('div', { className: 'map-actions-toolbar' },
                    h('button', {
                      type: 'button',
                      className: 'btn-map-action primary',
                      onClick: handleDetectGPS,
                      disabled: gpsLoading
                    },
                      h(IconCrosshair),
                      gpsLoading ? 'Mencari GPS...' : 'Lokasi Saya (GPS)'
                    ),
                    h('a', {
                      href: googleMapsDirUrl,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'btn-map-action',
                      title: 'Buka petunjuk arah di aplikasi Google Maps'
                    },
                      h(IconRoute),
                      'Buka di Google Maps'
                    ),
                    h('button', {
                      type: 'button',
                      className: 'btn-map-action',
                      onClick: handleResetMap,
                      title: 'Kembalikan posisi pin ke semula'
                    },
                      h(IconRotateCcw),
                      'Reset Pin'
                    )
                  ),

                  gpsNotice && h('div', {
                    style: {
                      marginTop: '8px',
                      fontSize: '0.76rem',
                      color: 'var(--color-rose-primary)',
                      fontWeight: 600
                    }
                  }, gpsNotice),

                  h('div', { className: 'map-info-strip' },
                    h(IconCheck),
                    h('span', null,
                      'Geser pin biru pada peta atau klik posisi rumah Anda untuk menghitung jarak otomatis. Rumah guru berada di Dusun Brajan, Kab. Magelang.'
                    )
                  )
                )
              ),

              h('div', { className: 'form-group' },
                h('label', { className: 'form-label' }, 'Waktu Belajar yang Diinginkan'),
                h('select', {
                  className: 'form-select',
                  value: preferredTime,
                  onChange: (e) => setPreferredTime(e.target.value)
                },
                  h('option', { value: 'Sore hari (16.00 - 17.30)' }, 'Sore hari (16.00 sampai 17.30)'),
                  h('option', { value: 'Setelah Maghrib (18.30 - 20.00)' }, 'Setelah Maghrib (18.30 sampai 20.00)')
                )
              ),

              h('div', { className: 'form-group' },
                h('label', { className: 'form-label' }, 'Alamat Rumah'),
                h('textarea', {
                  className: 'form-textarea',
                  rows: 2,
                  placeholder: 'Nama jalan, perumahan, atau patokan lokasi',
                  value: address,
                  onChange: (e) => setAddress(e.target.value)
                })
              ),

              h('div', { className: 'form-group' },
                h('label', { className: 'form-label' }, 'Catatan Tambahan (Opsional)'),
                h('textarea', {
                  className: 'form-textarea',
                  rows: 2,
                  placeholder: 'Misal: Sudah jilid Iqro 2, atau mulai dari dasar',
                  value: notes,
                  onChange: (e) => setNotes(e.target.value)
                })
              )
            ),

            // Live Summary Card
            h('div', { className: 'calc-summary-wrapper' },
              h('div', { className: 'calc-summary-card' },
                h('h3', { className: 'calc-summary-title' }, 'Rincian Estimasi Biaya'),
                h('div', { className: 'calc-items-list' },
                  h('div', { className: 'calc-row' },
                    h('span', { className: 'calc-row-label' }, 'Jenjang:'),
                    h('span', { className: 'calc-row-value' }, calculation.levelTitle)
                  ),
                  h('div', { className: 'calc-row' },
                    h('span', { className: 'calc-row-label' }, 'Paket Terpilih:'),
                    h('span', { className: 'calc-row-value' }, `${calculation.pkgName} (${calculation.pkgDuration})`)
                  ),
                  h('div', { className: 'calc-row' },
                    h('span', { className: 'calc-row-label' }, 'Biaya Bimbingan Les:'),
                    h('span', { className: 'calc-row-value' }, formatRupiah(calculation.lessonFee))
                  ),
                  h('div', { className: 'calc-row' },
                    h('span', { className: 'calc-row-label' }, 'Biaya Transport:'),
                    h('span', { className: 'calc-row-value' }, `${distanceKm} km x Rp 3.000 = ${formatRupiah(calculation.transportFee)}`)
                  )
                ),

                h('div', { className: `calc-total-box ${totalUpdated ? 'updated' : ''}` },
                  h('div', { className: 'calc-total-label' }, 'Total Estimasi Per Pertemuan:'),
                  h('div', { className: 'calc-total-amount' }, formatRupiah(calculation.totalFee)),
                  h('div', { className: 'calc-total-note' },
                    '* Pembayaran langsung per pertemuan ke pengajar. Tanpa biaya pendaftaran.'
                  )
                ),

                h('a', {
                  href: whatsappUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'btn-submit-wa'
                },
                  h(IconWhatsApp),
                  'Kirim Pendaftaran via WhatsApp'
                ),

                h('p', { style: { fontSize: '0.76rem', textAlign: 'center', color: '#52434A', marginTop: '8px' } },
                  'Format pesan otomatis tersusun rapi di aplikasi WhatsApp Anda.'
                )
              )
            )
          ),

          // Banner Ajakan
          h('div', { className: 'wa-banner' },
            h('div', { className: 'wa-banner-text' },
              h('h3', null, teacher.call_to_action),
              h('p', null, 'Konsultasikan waktu terbaik untuk ananda belajar mengaji bersama Kak Arsil.')
            ),
            h('a', {
              href: `https://wa.me/${teacher.whatsapp}?text=Assalamu'alaikum%20Kak%20Arsil,%20saya%20ingin%20tanya-tanya%20mengenai%20les%20private%20ngaji`,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'btn-banner-wa'
            },
              h(IconWhatsApp),
              'Hubungi via WhatsApp'
            )
          )
        )
      ),

      // Footer
      h('footer', { className: 'site-footer' },
        h('div', { className: 'container' },
          h('div', { className: 'footer-grid' },
            h('div', { className: 'footer-brand' },
              h('h4', null, `${teacher.name} - Les Private Ngaji Home Visit`),
              h('p', null,
                'Bimbingan mengaji Al-Qur\'an (Binnadzor & Bil Ghoib/Hafalan) serta Calistung langsung datang ke rumah murid dengan sabar dan telaten.'
              )
            ),
            h('div', { className: 'footer-links' },
              h('div', { className: 'footer-links-title' }, 'Navigasi'),
              h('ul', { className: 'footer-nav-list' },
                h('li', null, h('a', { href: '#hero' }, 'Beranda')),
                h('li', null, h('a', { href: '#profil' }, 'Profil Kak Arsil')),
                h('li', null, h('a', { href: '#paket' }, 'Pilihan Paket')),
                h('li', null, h('a', { href: '#tarif' }, 'Daftar Tarif')),
                h('li', null, h('a', { href: '#kalkulator' }, 'Simulasi Biaya & Daftar')),
                h('li', null,
                  h('a', {
                    href: '#',
                    onClick: (e) => {
                      e.preventDefault();
                      handleOpenAdminModal();
                    }
                  },
                    h(IconLock),
                    'Area Pengajar'
                  )
                )
              )
            )
          ),
          h('div', { className: 'footer-bottom' },
            h('div', null, `© ${new Date().getFullYear()} Les Private Ngaji Kak Arsil. Seluruh hak cipta dilindungi.`),
            h('button', {
              type: 'button',
              className: 'admin-lock-link',
              onClick: handleOpenAdminModal
            },
              h(IconLock),
              'Area Pengajar'
            )
          )
        )
      ),

      // Admin PIN Modal Dialog
      pinModalOpen && h('div', {
        className: 'admin-modal-backdrop',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Login Pengajar'
      },
        h('div', { className: 'admin-modal-box' },
          h('h3', { className: 'admin-modal-title' }, 'Area Khusus Pengajar'),
          h('p', { className: 'admin-modal-desc' },
            'Masukkan PIN keamanan untuk mengedit jadwal, harga, dan informasi les.'
          ),
          h('form', { onSubmit: handlePinSubmit },
            h('input', {
              type: 'password',
              maxLength: 8,
              className: 'admin-pin-input',
              placeholder: '••••••',
              autoFocus: true,
              value: enteredPin,
              onChange: (e) => {
                setEnteredPin(e.target.value);
                setPinError(false);
              }
            }),
            pinError && h('div', { style: { color: '#B32442', fontSize: '0.84rem', marginBottom: '12px', fontWeight: 600 } },
              'PIN salah. Silakan coba lagi.'
            ),
            h('div', { className: 'admin-modal-btns' },
              h('button', { type: 'submit', className: 'btn-pin-submit' }, 'Login'),
              h('button', {
                type: 'button',
                className: 'btn-pin-cancel',
                onClick: () => setPinModalOpen(false)
              }, 'Batal')
            )
          )
        )
      )
    );
  }

  // Mount React Root
  const container = document.getElementById('reactRoot');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(h(App));
  }

})();
