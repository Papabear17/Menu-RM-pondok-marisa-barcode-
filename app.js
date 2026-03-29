document.addEventListener("DOMContentLoaded", () => {
    
    // Elements
    const brandName = document.getElementById("brand-name");
    const brandTagline = document.getElementById("brand-tagline");
    const openHoursEle = document.getElementById("open-hours");
    const categoryNav = document.getElementById("category-nav");
    const menuContainer = document.getElementById("menu-container");
    const waLink = document.getElementById("wa-link");

    // State 
    let allItems = [];
    let currentFilter = 'all';

    // Format currency
    const formatRp = (num) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(num);
    };

    // Firebase Listener
    const loadMenu = () => {
        // Menggunakan library Firebase yang dimuat di HTML
        const menuRef = db.ref('restaurant_menu');

        // Mendengarkan perubahan data REAL-TIME (Langsung berganti tiap diedit)
        menuRef.on('value', async (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                
                // 1. Populate Restaurant Info
                brandName.textContent = data.restaurantInfo.name;
                brandTagline.textContent = data.restaurantInfo.tagline;
                openHoursEle.textContent = data.restaurantInfo.openHours;
                
                // Form WhatsApp
                const waNumber = data.restaurantInfo.whatsapp;
                const waMessage = encodeURIComponent(`Halo ${data.restaurantInfo.name}, saya ingin memesan menu...`);
                waLink.href = `https://wa.me/${waNumber}?text=${waMessage}`;

                // 2. Populate Categories (Hanya dijalankan 1x awal agar tombol tak berkerumun berlipat ganda)
                if (categoryNav.children.length === 1) { // 1 karena tombol 'semua' sdh ada
                    data.categories.forEach(cat => {
                        const btn = document.createElement("button");
                        btn.className = "cat-btn";
                        btn.dataset.filter = cat.id;
                        btn.innerHTML = `<span>${cat.icon}</span> ${cat.name}`;
                        
                        btn.addEventListener("click", () => {
                            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            currentFilter = cat.id;
                            renderMenuItems();
                        });

                        categoryNav.appendChild(btn);
                    });

                    // "Semua" button
                    const semuaBtn = document.querySelector('.cat-btn[data-filter="all"]');
                    semuaBtn.addEventListener("click", () => {
                        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                        semuaBtn.classList.add('active');
                        currentFilter = 'all';
                        renderMenuItems();
                    });
                }

                // 3. Render items
                allItems = data.items || [];
                renderMenuItems();

            } else {
                // FALLBACK: JIKA FIREBASE KOSONG, Ambil dari menu.json dan masukkan ke FB
                try {
                    const res = await fetch('menu.json?t=' + new Date().getTime());
                    if (!res.ok) throw new Error("Gagal mengambil data menu backup");
                    const data = await res.json();
                    
                    // Dorong ke firebase
                    try {
                         await menuRef.set(data);
                    } catch(writeErr) {
                         console.error("Gagal nyimpan ke firebase (Mungkin Hak Akses belum True): ", writeErr);
                         // Tetap render agar web tidak mati jika gagal nulis
                         renderDirectData(data);
                    }

                } catch (error) {
                    console.error(error);
                    menuContainer.innerHTML = `
                        <div class="spinner-container">
                            <i class="ph ph-warning-circle" style="font-size: 2rem; color: var(--primary);"></i>
                            <p style="color: var(--text-muted); text-align: center;">Maaf, gagal koneksi ke Database.<br>Silakan hubungi admin.</p>
                        </div>
                    `;
                }
            }
        });
    };

    // Fungsi Render Darurat JIKA penulisan pertama ke firebase gagal (permission denied)
    const renderDirectData = (data) => {
        brandName.textContent = data.restaurantInfo.name;
        brandTagline.textContent = data.restaurantInfo.tagline;
        openHoursEle.textContent = data.restaurantInfo.openHours;
        allItems = data.items;
        renderMenuItems();
    }

    // Render logic UI Grid
    const renderMenuItems = () => {
        // Filter items
        const filtered = currentFilter === 'all' 
            ? allItems 
            : allItems.filter(item => item.category === currentFilter);

        // Clear container
        menuContainer.innerHTML = '';

        if (filtered.length === 0) {
            menuContainer.innerHTML = `<p style="text-align:center; padding: 2rem; color: var(--text-muted);">Tidak ada menu di kategori ini.</p>`;
            return;
        }

        let delay = 0;
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.style.animationDelay = `${delay}s`;
            delay += 0.05; 
            
            const badgeHtml = item.recommended 
                ? `<span class="badge-recommended"><i class="ph-fill ph-star"></i> Rekomendasi</span>` 
                : '';

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="menu-img" loading="lazy">
                <div class="menu-info">
                    <div class="menu-info-top">
                        <h3 class="menu-name">${item.name}</h3>
                        ${badgeHtml}
                    </div>
                    <p class="menu-desc">${item.description}</p>
                    <div class="menu-price">${formatRp(item.price)}</div>
                </div>
            `;

            menuContainer.appendChild(card);
        });
    };

    // Admin Hidden Login
    // Menaruh listener klik ini lebih awal
    let clickCount = 0;
    brandName.addEventListener('click', () => {
        clickCount++;
        if (clickCount >= 3) {
            const pwd = prompt("Masukkan Password Admin:");
            if (pwd === "admin123") {
                window.location.href = "admin.html";
            } else if (pwd !== null) {
                alert("Password salah!");
            }
            clickCount = 0; // reset
        }
        
        setTimeout(() => {
            clickCount = 0;
        }, 2000);
    });

    // Kickoff
    loadMenu();

});
