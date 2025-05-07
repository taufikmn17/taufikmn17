function setupMusicSlider(sliderId, prevBtnId, nextBtnId) {
    const slider = document.getElementById(sliderId);
    const items = slider.querySelectorAll(".music-item");
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
  
    let currentIndex = 0;
  
    function showItem(index) {
      // Pause semua audio sebelum ganti tampilan
      items.forEach((item, i) => {
        const audio = item.querySelector("audio");
        if (audio) {
          audio.pause();
          audio.currentTime = 0; // reset ke awal
        }
        item.classList.toggle("hidden", i !== index);
        item.classList.toggle("block", i === index);
      });
    }
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
    });
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    });
  
    showItem(currentIndex);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    setupMusicSlider("taufikSlider", "taufikPrevBtn", "taufikNextBtn");
    setupMusicSlider("alyaSlider", "alyaPrevBtn", "alyaNextBtn");
  });
  