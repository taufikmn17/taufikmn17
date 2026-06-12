function openModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = src;
  modal.classList.remove("hidden");
  modal.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = "";
}

// Klik di luar gambar untuk tutup modal
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Tekan ESC untuk menutup modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// Tombol silang
document.getElementById("closeModalBtn").addEventListener("click", closeModal);

function enableNormalScroll() {
  const scrollContainer = document.getElementById("scrollContainer");
  const progressBar = document.getElementById("scrollProgressBar");
  if (!scrollContainer) return;

  const imageData = [
    { src: "assets/img/2.jpg", title: "Kaliurang", desc: "Main skuter 🛴🍃" },
    { src: "assets/img/3.jpg", title: "Kopi Tuku", desc: "Habis ngopi foto mirror ☕📷" },
    { src: "assets/img/4.jpg", title: "Photobooth SCH", desc: "Foto tambahan ceritanya 🎞️💫" },
    { src: "assets/img/5.jpg", title: "Popsnap", desc: "Pinky 💕📸" },
    { src: "assets/img/6.jpg", title: "Jalan Kaliurang", desc: "Foto mirror atas motor 🛵🌌" },
    { src: "assets/img/7.jpg", title: "Popsnap", desc: "Sambil menunggu 🤭⏳" },
    { src: "assets/img/8.jpg", title: "UTY", desc: "Wisata jam batu 🕰️🏛️" },
    { src: "assets/img/9.jpg", title: "Popsnap", desc: "Gemashh 🥹💗" },
    { src: "assets/img/10.jpg", title: "Alun-alun Kidul", desc: "Menunggu berbuka puasa 🌙🕌" },
    { src: "assets/img/11.jpg", title: "Popsnap", desc: "Prepare sebelum foto 🎀📷" },
    { src: "assets/img/12.jpg", title: "Union Pizza", desc: "Bikin pizza sendiri 👩‍🍳🍕" },
    { src: "assets/img/13.jpg", title: "Gwiyomi", desc: "Pose gemes 🐣🎶" },
    { src: "assets/img/14.jpg", title: "Oca Ice Skating", desc: "Seluncuran gess 🧊⛸️" },
    { src: "assets/img/15.jpg", title: "Jalan Tunjungan", desc: "Jalan-jalan malam 🌃🚶‍♀️" },
    { src: "assets/img/16.jpg", title: "Lift Lippo", desc: "Ngaca dulu di lift 🪞✨" },
  ];

  // Bersihkan container agar tidak menumpuk saat reload
  scrollContainer.innerHTML = "";

  // Render 1 set foto murni agar bisa mentok kanan-kiri alami
  imageData.forEach((data) => {
    const card = document.createElement("div");
    card.className = "min-w-[250px] card-cute rounded-xl shadow-lg shrink-0 cursor-pointer";
    card.ondblclick = () => openModal(data.src);
    card.innerHTML = `
      <img src="${data.src}" class="w-full h-60 object-cover rounded-t-xl" alt="${data.title}" />
      <div class="p-4 text-left">
        <h3 class="text-lg font-bold text-pink-700">${data.title}</h3>
        <p class="text-sm text-pink-600">${data.desc}</p>
      </div>
    `;
    scrollContainer.appendChild(card);
  });

  // Posisi awal paling kiri
  scrollContainer.scrollLeft = 0;

  // Fungsi menggerakkan garis progres di bawah foto secara real-time
  function updateProgressBar() {
    if (!progressBar) return;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    if (maxScroll <= 0) return;
    
    const scrollPercentage = (scrollContainer.scrollLeft / maxScroll) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  }

  // Monitor pergerakan scroll
  scrollContainer.addEventListener("scroll", updateProgressBar);
  window.addEventListener("resize", updateProgressBar);
  updateProgressBar();

  let isDragging = false;
  let startX;
  let scrollLeft;

  // Manajemen Drag-to-scroll menggunakan mouse
  scrollContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    scrollContainer.classList.add("cursor-grabbing");
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener("mouseleave", () => {
    isDragging = false;
    scrollContainer.classList.remove("cursor-grabbing");
  });

  scrollContainer.addEventListener("mouseup", () => {
    isDragging = false;
    scrollContainer.classList.remove("cursor-grabbing");
  });

  scrollContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    
    // PERBAIKAN: Pengali diatur ke 1.5 agar pergeseran sangat akurat mengikuti gerakan mouse
    const walk = (x - startX) * 1.5; 
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}

// Jalankan fungsi saat dokumen siap
if (document.readyState !== "loading") {
  enableNormalScroll();
} else {
  document.addEventListener("DOMContentLoaded", enableNormalScroll);
}