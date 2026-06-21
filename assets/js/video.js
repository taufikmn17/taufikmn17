document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // URL WEB APP DEPLOYMENT APPS SCRIPT ANDA
  // ==========================================
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz6HaF731DyONmINCJBBkbr8cVgznjkyai_NTU9v03-G5xgH3xJ6L04gkbjLBXhDBddDw/exec"; 
  
  const videoSlider = document.getElementById("videoSlider");
  const videoContainer = document.querySelector(".video-boundary");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let currentIndex = 0;

  function fetchVideoData() {
    videoSlider.innerHTML = `<p class="text-pink-500 font-medium p-6 mx-auto">Memuat dokumentasi video...</p>`;

    fetch(`${WEB_APP_URL}?type=video`)
      .then(response => response.json())
      .then(data => {
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
      .catch(error => {
        console.error(error);
        videoSlider.innerHTML = `<p class="text-red-500 p-4 mx-auto">Gagal memuat data video.</p>`;
      });
  }

  // Fungsi render menggunakan tag <video> asli HTML5 agar responsif di HP
  function renderVideos(videos) {
    videoSlider.innerHTML = ""; 
  
    if (videoContainer) {
      // Mengunci lebar maksimal kotak video agar tegak lurus proporsional di HP
      videoContainer.style.maxWidth = "330px"; 
      videoContainer.style.width = "100%";
    }
  
    videos.forEach(item => {
      if (item.video_url && item.video_url.trim() !== "") {
        let embedUrl = item.video_url.trim();
        let videoId = "";
  
        // Ekstrak ID unik dari link Google Drive di Google Sheets Anda
        if (embedUrl.includes('/file/d/')) {
          videoId = embedUrl.split('/file/d/')[1].split('/')[0];
        } else if (embedUrl.includes('id=')) {
          videoId = embedUrl.split('id=')[1].split('&')[0];
        }
  
        // WAJIB MENGGUNAKAN /preview AGAR BEBAS DARI ERROR "MINTA AKSES"
        if (videoId) {
          embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;
        }
  
        const videoItem = document.createElement("div");
        videoItem.className = "video-item"; 
        
        // Membungkus video ke dalam aspek rasio vertikal 9:16 (Ala Instagram Story/TikTok)
        videoItem.innerHTML = `
          <div style="
            width: 100%; 
            aspect-ratio: 9/16; 
            border-radius: 24px; 
            overflow: hidden; 
            box-shadow: 0 12px 28px rgba(0,0,0,0.18);
            background-color: #000;
          ">
            <iframe
              src="${embedUrl}"
              style="
                width: 100%;
                height: 100%;
                border: none;
                display: block;
              "
              allow="autoplay"
              allowfullscreen>
            </iframe>
          </div>
        `;
        videoSlider.appendChild(videoItem);
      }
    });
  
    setTimeout(updateSlide, 300);
  }
  
  // Fungsi otomatis mematikan video saat slider digeser (opsional/pendukung)
  function stopAllVideos() {
    const iframes = videoSlider.querySelectorAll("iframe");
    iframes.forEach(iframe => {
      const currentSrc = iframe.src;
      iframe.src = ""; 
      iframe.src = currentSrc; 
    });
  }

  function updateSlide() {
    if (videoSlider.children.length === 0) return;
    const width = videoContainer.offsetWidth;
    videoSlider.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  // Tombol Next
  nextBtn.addEventListener("click", function () {
    const totalItems = videoSlider.children.length;
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      stopAllVideos(); 
      updateSlide();
    }
  });

  // Tombol Prev
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      stopAllVideos(); 
      updateSlide();
    }
  });

  window.addEventListener("resize", updateSlide);

  // Jalankan sistem pembaca data
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

