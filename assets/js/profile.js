// --- KODE ANIMASI COUNTER & GARIS MENGALIR MASUK ---
(function() {
    function startCharacterStats() {
        var seksi = document.getElementById("characterCards");
        if (!seksi || seksi.classList.contains("efek-aktif")) return;
        
        seksi.classList.add("efek-aktif");

        // Durasi animasi agar gerakan lebih dramatis (dalam milidetik)
        var durasiAnimasi = 4500; 

        // 1. JALANKAN ANIMASI GARIS MASUK (MENGALIR HALUS & SLOW)
        var semuaBar = seksi.querySelectorAll(".animate-bar");
        semuaBar.forEach(function(bar) {
            var targetLebar = bar.getAttribute("data-width");
            
            // Menggunakan cubic-bezier khusus agar di awal melesat lembut dan melambat sangat anggun di akhir
            bar.style.transition = "width " + durasiAnimasi + "ms cubic-bezier(0.25, 0.8, 0.25, 1)";
            
            // Diberi jeda 100ms agar browser sempat menyiapkan posisi bar dari w-0 (nol) sebelum meluncur
            setTimeout(function() {
                requestAnimationFrame(function() {
                    bar.style.width = targetLebar;
                });
            }, 100);
        });

        // 2. JALANKAN ANIMASI ANGKA BERJALAN (MENYESUAIKAN TEMPO SLOW)
        var semuaAngka = seksi.querySelectorAll(".stat-number");
        semuaAngka.forEach(function(counter) {
            var targetAngka = parseInt(counter.getAttribute("data-target"), 10);
            var angkaSekarang = 0;
            
            var fps = 60;
            var totalFrame = Math.round(durasiAnimasi / (1000 / fps));
            var kenaikan = targetAngka / totalFrame;
            var frame = 0;

            function update() {
                frame++;
                angkaSekarang += kenaikan;

                if (frame < totalFrame) {
                    counter.textContent = Math.floor(angkaSekarang);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = targetAngka;
                    // LOGIKA TAMBAHAN: Jika target mencapai 100 atau lebih, buat berkedip
                    if (targetAngka >= 100) {
                        var parentDiv = counter.closest('div > div > div'); 
                        var bar = parentDiv && parentDiv.nextElementSibling ? parentDiv.nextElementSibling.querySelector('.animate-bar') : null;
                        if (bar) {
                            bar.classList.add("animate-pulse-bar");
                        }
                    }
                }
            }
            
            // Angka ikut berjalan bersamaan dengan luncuran bar setelah jeda singkat
            setTimeout(function() {
                requestAnimationFrame(update);
            }, 100);
        });
    }

    // Sensor scroll manual yang ringan
    function cekPosisiLayar() {
        var seksi = document.getElementById("characterCards");
        if (!seksi) return;
        
        var koordinat = seksi.getBoundingClientRect();
        if (koordinat.top < window.innerHeight && koordinat.bottom >= 0) {
            startCharacterStats();
            window.removeEventListener("scroll", cekPosisiLayar);
        }
    }

    window.addEventListener("scroll", cekPosisiLayar);
    window.addEventListener("DOMContentLoaded", cekPosisiLayar);
    setTimeout(cekPosisiLayar, 800); 
})();