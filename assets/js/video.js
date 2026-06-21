document.addEventListener("DOMContentLoaded", function () {
  // URL Web App Apps Script Anda
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz6HaF731DyONmINCJBBkbr8cVgznjkyai_NTU9v03-G5xgH3xJ6L04gkbjLBXhDBddDw/exec";
  const videoSlider = document.getElementById("videoSlider");
  const videoContainer = document.querySelector(".video-boundary");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let currentIndex = 0;

  function fetchVideoData() {
    videoSlider.innerHTML = `<p class="text-pink-500 font-medium p-6 mx-auto">Memuat dokumentasi video...</p>`;
    
    fetch(`${WEB_APP_URL}?type=video`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          videoSlider.innerHTML = `<p class="text-red-500 p-4 mx-auto">${data.error}</p>`;
          return;
        }
        if (!data || data.length === 0) {
          videoSlider.innerHTML = `<p class="text-gray-500 p-4 mx-auto">Belum ada video.</p>`;
          return;
        }
        renderVideos(data);
      })
      .catch((error) => {
        console.error(error);
        videoSlider.innerHTML = `<p class="text-red-500 p-4 mx-auto">Gagal memuat data video.</p>`;
      });
  }

  function renderVideos(videos) {
    videoSlider.innerHTML = "";

    if (videoContainer) {
      videoContainer.style.maxWidth = "350px";
      videoContainer.style.width = "100%";
    }

    videos.forEach((item) => {
      if (item.video_url && item.video_url.trim() !== "") {
        const fileName = item.video_url.trim();

        const videoItem = document.createElement("div");
        videoItem.className = "video-item";

        videoItem.innerHTML = `
          <div style="
            width: 100%; 
            aspect-ratio: 9/16; 
            border-radius: 24px; 
            overflow: hidden; 
            background-color: #000;
          ">
            <video 
              controls 
              playsinline
              preload="metadata"
              style="width: 100%; height: 100%; object-fit: cover;">
              <source src="assets/video/${fileName}" type="video/mp4">
              Browser Anda tidak mendukung pemutar video ini.
            </video>
          </div>
        `;
        videoSlider.appendChild(videoItem);
      }
    });

    // ==========================================================================
    // LOGIKA PERBAIKAN TOTAL: TOMBOL BACK & GESTURE HP SAAT FULLSCREEN
    // ==========================================================================
    const allVideos = videoSlider.querySelectorAll("video");
    
    allVideos.forEach((video) => {
      // Deteksi saat video beralih ke layar penuh (Fullscreen)
      const onFullscreenChange = () => {
        const isFullscreen = document.fullscreenElement || 
                             document.webkitIsFullScreen || 
                             document.mozFullScreen || 
                             document.msFullscreenElement;

        if (isFullscreen) {
          // Begitu masuk layar penuh, suntikkan riwayat baru ke browser HP (PushState)
          if (history.state !== "video-fullscreen") {
            history.pushState("video-fullscreen", null, null);
          }
        } else {
          // Jika keluar dari layar penuh secara normal (klik tombol kecil di pojok video)
          if (history.state === "video-fullscreen") {
            history.back(); // Bersihkan riwayat buatan agar sinkron kembali
          }
        }
      };

      // Daftarkan ke semua jenis browser (Chrome, Safari/iOS, Firefox)
      video.addEventListener("fullscreenchange", onFullscreenChange);
      video.addEventListener("webkitfullscreenchange", onFullscreenChange);
      video.addEventListener("mozfullscreenchange", onFullscreenChange);
      video.addEventListener("msfullscreenchange", onFullscreenChange);
    });

    setTimeout(updateSlide, 300);
  }

  // MENANGKAP TOMBOL BACK FISIK / USAP (SWIPE GESTURE) HP
  window.addEventListener("popstate", function (event) {
    // Cek apakah ada elemen video yang sedang dalam mode layar penuh
    const fullScreenElement = document.fullscreenElement || 
                              document.webkitFullscreenElement || 
                              document.webkitCurrentFullScreenElement ||
                              document.mozFullScreenElement ||
                              document.msFullScreenElement;

    // Jika user menekan back/usap saat video membesar, batalkan navigasi halaman
    if (fullScreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // Jalur khusus Safari / iOS
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });


  
  function stopAllVideos() {
    const nativeVideos = videoSlider.querySelectorAll("video");
    nativeVideos.forEach((video) => {
      video.pause();
    });
  }

  function updateSlide() {
    if (videoSlider.children.length === 0) return;
    const width = videoContainer.offsetWidth;
    videoSlider.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  nextBtn.addEventListener("click", function () {
    const totalItems = videoSlider.children.length;
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      stopAllVideos();
      updateSlide();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      stopAllVideos();
      updateSlide();
    }
  });

  window.addEventListener("resize", updateSlide);
  fetchVideoData();
});






// ========================================================
// LOGIKA SURPRISE VIDEO OVERLAY (FIX SUARA HILANG)
// ========================================================
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("surpriseOverlay");
  const startContainer = document.getElementById("surpriseStartContainer");
  const startBtn = document.getElementById("startSurpriseBtn");
  const video = document.getElementById("surpriseVideo");
  const skipBtn = document.getElementById("skipVideoBtn");

  if (!overlay || !video) return;

  // Kunci scroll halaman utama selama proses kejutan berlangsung
  document.body.classList.add("video-active");

  // Fungsi untuk menutup total overlay saat video selesai/dilewati
  function closeSurpriseOverlay() {
    overlay.classList.add("hide-overlay");
    document.body.classList.remove("video-active");
    
    setTimeout(() => {
      video.pause();
      video.innerHTML = ""; 
      overlay.remove();     
    }, 1000);
  }

  // Event saat video selesai diputar murni
  video.addEventListener("ended", closeSurpriseOverlay);

  // Event tombol skip
  if (skipBtn) {
    skipBtn.addEventListener("click", closeSurpriseOverlay);
  }

  // KUNCI PERBAIKAN: Video baru diputar BER-SUARA setelah tombol ditekan
  if (startBtn && startContainer) {
    startBtn.addEventListener("click", function () {
      // Hilangkan tirai layar tombol mulai
      startContainer.style.opacity = "0";
      startContainer.style.visibility = "hidden";
      
      // Munculkan tombol skip (optional)
      if (skipBtn) skipBtn.classList.remove("hidden");

      // Setel suara aktif 100% dan putar videonya
      video.muted = false; 
      video.currentTime = 0; // Mulai tepat dari detik ke-0
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Gagal memutar video:", error);
        });
      }
    });
  }
});

