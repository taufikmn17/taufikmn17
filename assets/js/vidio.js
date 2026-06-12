
document.addEventListener("DOMContentLoaded", function () {
  const videoSlider = document.getElementById("videoSlider");
  const videoContainer = document.querySelector(".video-boundary");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let currentIndex = 0;

  function pauseAllVideos() {
    const videos = videoSlider.querySelectorAll("video");
    videos.forEach(video => video.pause());
  }

  function updateSlide() {
    const width = videoContainer.offsetWidth;
    videoSlider.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  nextBtn.addEventListener("click", function () {
    const totalItems = videoSlider.children.length;
    if (currentIndex < totalItems - 1) {
      currentIndex++;
      pauseAllVideos();
      updateSlide();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      pauseAllVideos();
      updateSlide();
    }
  });

  window.addEventListener("resize", updateSlide);
});


// ========================================================
// REVISI LOGIKA: SURPRISE VIDEO OVERLAY (FIX SUARA HILANG)
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