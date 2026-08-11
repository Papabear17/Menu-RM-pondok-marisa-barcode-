// ==========================================
// app.js – Shared Utilities & Data Store
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyAquXEzHXgbp-036enXnJdN9kn2IFA6CUU",
    authDomain: "rm-pondok-marisa-final.firebaseapp.com",
    projectId: "rm-pondok-marisa-final",
    storageBucket: "rm-pondok-marisa-final.firebasestorage.app",
    messagingSenderId: "638351696963",
    appId: "1:638351696963:web:ad266be827925976ba20f6",
    measurementId: "G-4C0X7LZ9Z8"
};

// Initialize Firebase dengan penanganan error yang aman
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();

        // Aktifkan Offline Persistence agar tidak melambat saat koneksi tidak stabil
        db.enablePersistence().catch(err => console.warn('[MarisaPOS] Persistence failed:', err.code));

        console.log('[MarisaPOS] Firebase Firestore terhubung:', firebaseConfig.projectId);
    }
} catch (e) {
    console.error('[MarisaPOS] Firebase gagal init, pakai localStorage:', e.message);
    db = null;
}

const DB = {
    _cache: {},
    async load(key) {
        // Ambil secara instan dari lokal agar UI tidak lag
        const raw = localStorage.getItem(key);
        let localData = null;
        if (raw) {
            try {
                localData = JSON.parse(raw);
                DB._cache[key] = localData; // Init in-memory cache
            } catch (e) { }
        }

        // FIX #3: Jika localStorage kosong dan Firebase tersedia, tunggu data Firebase
        // agar halaman tidak render dengan data default saat pertama kali buka
        if (!localData && db) {
            try {
                const docSnap = await db.collection('PondokMarisaPOS').doc(key).get();
                if (docSnap.exists) {
                    const data = docSnap.data().data;
                    localStorage.setItem(key, JSON.stringify(data));
                    DB._cache[key] = data;
                    return data;
                }
            } catch (e) {
                console.warn(`[DB.load] firebase error untuk ${key}:`, e.message);
            }
            return getDefault(key);
        }

        // Kalau data lokal sudah ada, sinkron Firebase di background (non-blocking)
        if (db) {
            (async () => {
                try {
                    const docSnap = await db.collection('PondokMarisaPOS').doc(key).get();
                    if (docSnap.exists) {
                        const data = docSnap.data().data;
                        localStorage.setItem(key, JSON.stringify(data));
                        DB._cache[key] = data;
                    }
                } catch (e) {
                    console.warn(`[DB.load] background sync error untuk ${key}:`, e.message);
                }
            })();
        }

        return localData || getDefault(key);
    },

    async save(key, data) {
        // Optimistic update: simpan ke lokal instan
        localStorage.setItem(key, JSON.stringify(data));
        DB._cache[key] = data;

        // Background sync tanpa await agar UI ga macet!
        if (db) {
            db.collection('PondokMarisaPOS').doc(key).set({
                data: data,
                updatedAt: new Date().toISOString()
            }).catch(e => console.warn(`[DB.save] firebase gagal sinkron ${key}:`, e.message));
        }

        return true; // langsung true
    },

    listen(key, callback) {
        if (!db) return;
        return db.collection('PondokMarisaPOS').doc(key).onSnapshot((docSnap) => {
            if (docSnap.exists) {
                const data = docSnap.data().data;
                const oldDataStr = JSON.stringify(DB._cache[key] || null);
                const newDataStr = JSON.stringify(data);

                if (oldDataStr !== newDataStr) {
                    localStorage.setItem(key, newDataStr);
                    DB._cache[key] = data;
                    callback(data);
                }
            }
        }, err => console.warn('Listen err:', err));
    }
};

function getDefault(key) {
    if (key === 'produk') return [
        { id: 1, nama: 'Ayam Goreng Kalasan', harga: 20000, kategori: 'Makanan', variasi: ['Dada', 'Paha'] },
        { id: 2, nama: 'Nasi Ayam Kremes', harga: 25000, kategori: 'Makanan', variasi: ['Dada', 'Paha'] },
        { id: 3, nama: 'Es Teh Manis', harga: 5000, kategori: 'Minuman' },
        { id: 4, nama: 'Es Jeruk', harga: 7000, kategori: 'Minuman' },
        { id: 5, nama: 'Air Putih', harga: 1000, kategori: 'Minuman' },
        { id: 6, nama: 'Ayam Ungkep', harga: 18000, kategori: 'Makanan' },
    ];
    if (key === 'transaksi') return [];
    if (key === 'kategori') return ['Makanan', 'Minuman', 'Cemilan', 'Paket', 'Lainnya'];
    if (key === 'pengaturan') return {
        merchantName: 'RM.PONDOK MARISA 2008',
        address: 'Perumahan Bukit Dago, Jl. Ps. Jengkol Jl. Pendidikan Blok BDU No.81.',
        phone: '085101191675',
        footer: 'Terimakasih sudah order di Rm.Pondok marisa. Jangan lupa untuk langsung di buka ya supaya tidak lembab! Kami juga menerima orderan nasi box untuk berbagai acara.',
        logo: '',
        taxRate: 10,
        bankName: 'BCA',
        bankAccount: '1234567890',
        adminPin: '011105',
        bluetoothPrinter: null,
        instagram: '',
        googleMaps: '',
        tiktok: '',
        goFood: '',
        grabFood: ''
    };
    return [];
}

// Format Rupiah - Added fallback for safety
function formatRp(num) {
    const val = num ? Number(num) : 0;
    return 'Rp ' + val.toLocaleString('id-ID');
}

// Format tanggal
function formatTanggal(iso) {
    if (!iso) return '-';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
        return '-';
    }
}

function formatWaktu(iso) {
    if (!iso) return '-';
    try {
        const d = new Date(iso);
        return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return '-';
    }
}

// Generate ID unik
function genId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Nomor faktur
function genNomorFaktur() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `INV-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${String(genId()).slice(-4)}`;
}

// sidebar active link
function setActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.remove('bg-indigo-700', 'text-white', 'shadow-lg', 'shadow-xl', 'shadow-indigo-900/20');
        el.classList.add('text-indigo-100', 'hover:bg-indigo-700/50');
    });
    const active = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (active) {
        active.classList.add('bg-indigo-700', 'text-white', 'shadow-xl', 'shadow-indigo-900/20');
        active.classList.remove('text-indigo-100', 'hover:bg-indigo-700/50');
    }
}

// ==========================================
// Authentication / PIN Gate for Admin Pages
// ==========================================
(function () {
    // Jalankan hanya di halaman admin
    // menu.html adalah halaman publik untuk pembeli — TIDAK butuh PIN
    // Semua halaman lain (termasuk kasir, qrcode, menu-hub, dll) butuh PIN admin
    const path = window.location.pathname;
    const isPublic = path.includes('menu.html') && !path.includes('menu-hub.html') && !path.includes('menu-admin.html');
    if (isPublic) return;

    document.addEventListener("DOMContentLoaded", async function () {
        // Cek jika sudah terautentikasi di sesi ini — skip semua proses
        // Gunakan localStorage agar autentikasi persisten antar tab
        if (localStorage.getItem('admin_authenticated') === 'true') {
            return;
        }

        // Tampilkan loading spinner dulu sementara Firebase load
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'pin-loading';
        loadingOverlay.style.cssText = 'position:fixed;inset:0;background:linear-gradient(135deg,#312e81,#1e1b4b);z-index:999999;display:flex;align-items:center;justify-content:center;';
        loadingOverlay.innerHTML = '<div style="text-align:center;color:white;"><div style="width:40px;height:40px;border:3px solid rgba(255,255,255,0.2);border-top:3px solid white;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 1rem;"></div><p style="font-size:0.8rem;font-weight:700;opacity:0.6;letter-spacing:0.1em;">MEMUAT...</p></div><style>@keyframes spin{to{transform:rotate(360deg)}}</style>';
        document.body.appendChild(loadingOverlay);

        // FIX PIN RACE CONDITION:
        // 1. Ambil data lokal DULU sebagai fallback instan
        // 2. Coba ambil dari Firebase dengan TIMEOUT 5 detik
        // 3. Jika Firebase gagal/lambat, pakai data lokal
        let settings = {};
        const localRaw = localStorage.getItem('pengaturan');
        let localSettings = {};
        if (localRaw) {
            try { localSettings = JSON.parse(localRaw); } catch (e) { }
        }

        try {
            if (db) {
                // Race: Firebase fetch vs Timeout 5 detik
                const firebaseFetch = db.collection('PondokMarisaPOS').doc('pengaturan').get();
                const timeout = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Firebase timeout')), 5000)
                );
                try {
                    const docSnap = await Promise.race([firebaseFetch, timeout]);
                    if (docSnap.exists) {
                        settings = docSnap.data().data || {};
                        // Sinkronkan ke localStorage agar selanjutnya lokal sudah terbaru
                        localStorage.setItem('pengaturan', JSON.stringify(settings));
                    } else {
                        settings = localSettings;
                    }
                } catch (raceErr) {
                    // Firebase timeout atau error — pakai data lokal
                    console.warn('[PIN Gate] Firebase lambat/gagal, pakai data lokal:', raceErr.message);
                    settings = localSettings;
                }
            } else {
                settings = localSettings;
            }
        } catch (e) {
            settings = localSettings;
        }

        // Jika settings masih kosong, load dari DB helper sebagai upaya terakhir
        if (!settings || Object.keys(settings).length === 0) {
            settings = await DB.load('pengaturan') || {};
        }

        // Hapus loading overlay
        loadingOverlay.remove();

        // Jika adminPin belum diset, tampilkan pesan agar admin mengatur PIN terlebih dahulu.
        if (!settings.adminPin || settings.adminPin === '2008') {
            settings.adminPin = '011105';
            localStorage.setItem('pengaturan', JSON.stringify(settings));
        }

        const requiredPin = settings.adminPin;
        if (!requiredPin) {
            // PIN belum diatur — langsung masuk dan arahkan ke pengaturan
            localStorage.setItem('admin_authenticated', 'true');
            if (!window.location.pathname.includes('pengaturan.html')) {
                const banner = document.createElement('div');
                banner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#f59e0b;color:#1c1917;padding:10px 16px;text-align:center;font-size:0.8rem;font-weight:700;z-index:99998;';
                banner.textContent = '⚠️ PIN Admin belum diatur. Silakan atur PIN di menu Pengaturan untuk mengamankan aplikasi.';
                document.body.appendChild(banner);
            }
            return;
        }

        // Buat overlay PIN Gate
        const gate = document.createElement('div');
        gate.id = 'admin-pin-gate';
        gate.style.cssText = `
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #312e81, #1e1b4b);
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', sans-serif;
            color: white;
            padding: 20px;
            box-sizing: border-box;
        `;

        gate.innerHTML = `
            <div style="max-width: 400px; width: 100%; text-align: center; display: flex; flex-direction: column; align-items: center;">
                <!-- Icon Kunci -->
                <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.07); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-radius: 2rem; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15);">
                    <svg style="width: 36px; height: 36px; color: #a5b4fc;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </div>

                <h1 style="font-weight: 900; font-size: 1.6rem; text-transform: uppercase; letter-spacing: -0.05em; margin: 0 0 6px 0; text-shadow: 0 4px 6px rgba(0,0,0,0.2);">${settings.merchantName || 'RM. PONDOK MARISA'}</h1>
                <p style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #818cf8; margin: 0 0 36px 0;">PIN Gate Akses Admin</p>

                <!-- Bulatan PIN — dikosongkan, diisi oleh JS sesuai panjang PIN aktual -->
                <div id="pin-dots" style="display: flex; gap: 20px; margin-bottom: 44px;"></div>

                <!-- Keyboard Panel -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; width: 280px; box-sizing: border-box;">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => `
                        <button class="pin-key" data-val="${num}" aria-label="${num}" style="width: 72px; height: 72px; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 50%; font-weight: 800; font-size: 1.5rem; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; outline: none; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-sizing: border-box;">${num}</button>
                    `).join('')}
                    <button class="pin-key" data-val="clear" aria-label="Reset PIN" style="width: 72px; height: 72px; background: transparent; border: none; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #f43f5e; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; outline: none; box-sizing: border-box;">Reset</button>
                    <button class="pin-key" data-val="0" aria-label="0" style="width: 72px; height: 72px; background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 50%; font-weight: 800; font-size: 1.5rem; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; outline: none; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-sizing: border-box;">0</button>
                    <button class="pin-key" data-val="back" aria-label="Backspace (Hapus)" style="width: 72px; height: 72px; background: transparent; border: none; font-weight: 800; font-size: 1.25rem; color: #cbd5e1; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; outline: none; box-sizing: border-box;">
                        <svg style="width: 22px; height: 22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414A2 2 0 0010.828 5H19a2 2 0 012 2v10a2 2 0 01-2 2h-8.172a2 2 0 01-1.414-.586L3 12z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(gate);

        // Hover, Active & Keyboard Focus States
        const keys = gate.querySelectorAll('.pin-key');
        keys.forEach(k => {
            const val = k.getAttribute('data-val');

            // Helper functions to handle styling changes consistently for mouse & keyboard
            const setKeyActive = () => {
                if (val !== 'clear' && val !== 'back') {
                    k.style.background = 'rgba(255,255,255,0.12)';
                    k.style.borderColor = 'rgba(255,255,255,0.2)';
                    k.style.transform = 'scale(1.06)';
                    k.style.boxShadow = '0 0 14px rgba(165,180,252,0.5)';
                } else {
                    k.style.transform = 'scale(1.1)';
                    k.style.boxShadow = '0 0 14px rgba(165,180,252,0.3)';
                    if (val === 'clear') k.style.color = '#fda4af';
                    else k.style.color = '#ffffff';
                }
            };

            const setKeyInactive = () => {
                k.style.boxShadow = 'none';
                if (val !== 'clear' && val !== 'back') {
                    k.style.background = 'rgba(255,255,255,0.05)';
                    k.style.borderColor = 'rgba(255,255,255,0.08)';
                    k.style.transform = 'scale(1)';
                } else {
                    k.style.transform = 'scale(1)';
                    if (val === 'clear') k.style.color = '#f43f5e';
                    else k.style.color = '#cbd5e1';
                }
            };

            if (val !== 'clear' && val !== 'back') {
                k.addEventListener('mouseenter', setKeyActive);
                k.addEventListener('mouseleave', setKeyInactive);
                k.addEventListener('mousedown', () => {
                    k.style.background = 'rgba(255,255,255,0.25)';
                    k.style.transform = 'scale(0.95)';
                });
                k.addEventListener('mouseup', setKeyActive);
            } else {
                k.addEventListener('mouseenter', setKeyActive);
                k.addEventListener('mouseleave', setKeyInactive);
            }

            // Keyboard Focus Event Listeners
            k.addEventListener('focus', setKeyActive);
            k.addEventListener('blur', setKeyInactive);
        });

        let currentInput = "";
        const PIN_LENGTH = requiredPin.length; // Dinamis sesuai panjang PIN aktual (misal 6 untuk "011105")
        // Render titik dari JS sesuai panjang PIN — tidak ada hardcode di HTML
        const pinDotsContainer = gate.querySelector('#pin-dots');
        pinDotsContainer.innerHTML = '';
        for (let i = 0; i < PIN_LENGTH; i++) {
            const dot = document.createElement('div');
            dot.className = 'pin-dot';
            dot.style.cssText = 'width:14px;height:14px;border:2.5px solid rgba(255,255,255,0.3);border-radius:50%;transition:all 0.2s;box-sizing:border-box;';
            pinDotsContainer.appendChild(dot);
        }
        const dotsEls = gate.querySelectorAll('.pin-dot');

        function updateDots() {
            dotsEls.forEach((dot, idx) => {
                if (idx < currentInput.length) {
                    dot.style.background = '#ffffff';
                    dot.style.borderColor = '#ffffff';
                    dot.style.transform = 'scale(1.25)';
                    dot.style.boxShadow = '0 0 12px rgba(255,255,255,0.9)';
                } else {
                    dot.style.background = 'transparent';
                    dot.style.borderColor = 'rgba(255,255,255,0.3)';
                    dot.style.transform = 'scale(1)';
                    dot.style.boxShadow = 'none';
                }
            });
        }

        async function handleKey(val) {
            if (val === 'clear') {
                currentInput = "";
            } else if (val === 'back') {
                currentInput = currentInput.slice(0, -1);
            } else {
                if (currentInput.length < PIN_LENGTH) {
                    currentInput += val;
                }
            }

            updateDots();

            if (currentInput.length === PIN_LENGTH) {
                if (currentInput === requiredPin) {
                    gate.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    gate.style.opacity = '0';
                    gate.style.transform = 'scale(1.08)';
                    localStorage.setItem('admin_authenticated', 'true');
                    setTimeout(() => { gate.remove(); }, 400);
                } else {
                    gate.style.animation = 'shake 0.35s';
                    const style = document.createElement('style');
                    style.innerHTML = `@keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-8px); } 40%, 80% { transform: translateX(8px); } }`;
                    document.head.appendChild(style);
                    setTimeout(() => {
                        currentInput = "";
                        updateDots();
                        style.remove();
                        gate.style.animation = '';
                    }, 350);
                }
            }
        }

        gate.querySelectorAll('.pin-key').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-val');
                handleKey(val);
            });
        });

        // Event listener Keyboard fisik
        document.addEventListener('keydown', (e) => {
            if (gate.parentElement) {
                if (e.key >= '0' && e.key <= '9') {
                    handleKey(e.key);
                } else if (e.key === 'Backspace') {
                    handleKey('back');
                } else if (e.key === 'Escape') {
                    handleKey('clear');
                }
            }
        });
    });
})();

// ==========================================
// Session Timeout — Auto Logout Admin
// ==========================================
(function () {
    const TIMEOUT_MS = 30 * 60 * 1000; // 30 menit tidak aktif → logout
    const WARNING_MS = 25 * 60 * 1000; // Peringatan di menit ke-25
    const isPublic = window.location.pathname.includes('menu.html') &&
        !window.location.pathname.includes('menu-hub.html') &&
        !window.location.pathname.includes('menu-admin.html');
    if (isPublic) return;

    let timeoutTimer, warningTimer, warningBanner;

    function resetTimers() {
        // Hanya aktif kalau sudah login
        if (localStorage.getItem('admin_authenticated') !== 'true') return;

        clearTimeout(timeoutTimer);
        clearTimeout(warningTimer);

        // Hapus banner peringatan kalau ada
        if (warningBanner && warningBanner.parentElement) {
            warningBanner.remove();
            warningBanner = null;
        }

        // Set timer peringatan (menit ke-25)
        warningTimer = setTimeout(() => {
            if (localStorage.getItem('admin_authenticated') !== 'true') return;
            warningBanner = document.createElement('div');
            warningBanner.id = 'session-warning';
            warningBanner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#f59e0b;color:#1c1917;padding:10px 16px;text-align:center;font-size:0.8rem;font-weight:700;z-index:99997;display:flex;align-items:center;justify-content:center;gap:10px;';
            warningBanner.innerHTML = '⏰ Sesi akan berakhir dalam 5 menit karena tidak ada aktivitas. <button onclick="document.getElementById(\'session-warning\').remove()" style="background:#1c1917;color:#f59e0b;border:none;padding:3px 10px;border-radius:6px;font-weight:700;cursor:pointer;font-size:0.75rem;">Tetap Aktif</button>';
            warningBanner.querySelector('button').addEventListener('click', resetTimers);
            document.body.appendChild(warningBanner);
        }, WARNING_MS);

        // Set timer logout (menit ke-30)
        timeoutTimer = setTimeout(() => {
            if (localStorage.getItem('admin_authenticated') !== 'true') return;
            // Logout
            localStorage.removeItem('admin_authenticated');
            // Tampilkan notifikasi
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:999998;display:flex;align-items:center;justify-content:center;';
            overlay.innerHTML = '<div style="background:white;border-radius:20px;padding:2rem;text-align:center;max-width:320px;"><div style="font-size:2.5rem;margin-bottom:1rem;">🔒</div><h3 style="font-weight:900;margin-bottom:.5rem;">Sesi Berakhir</h3><p style="color:#64748b;font-size:.85rem;margin-bottom:1.5rem;">Kamu otomatis logout karena tidak aktif selama 30 menit.</p><button onclick="location.reload()" style="background:#4f46e5;color:white;border:none;padding:.75rem 2rem;border-radius:12px;font-weight:700;cursor:pointer;width:100%;">Login Kembali</button></div>';
            document.body.appendChild(overlay);
        }, TIMEOUT_MS);
    }

    // Pantau aktivitas pengguna
    const aktifitasEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    aktifitasEvents.forEach(event => {
        document.addEventListener(event, resetTimers, { passive: true });
    });

    // Mulai timer saat halaman dimuat
    document.addEventListener('DOMContentLoaded', () => {
        // Tunggu sampai auth selesai baru mulai timer
        setTimeout(resetTimers, 2000);
    });
})();

