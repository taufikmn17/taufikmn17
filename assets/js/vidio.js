
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

