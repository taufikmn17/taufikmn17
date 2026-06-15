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

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("scrollContainer");
  const progressBar = document.getElementById("scrollProgressBar");

  const data = [
    { src: "assets/img/2.jpg", title: "Kaliurang", tag: "Wisata", desc: "Skuteran bareng di Kaliurang suasana sejuk, bahagianya juga dapet karena kamu yang nemenin hihi 🛴🍃", geo: "Sleman"},
    { src: "assets/img/3.jpg", title: "Photo Mirror", tag: "Kopi Tuku", desc: "Cuma modal ngopi, ujung-ujungnya malah jadi sesi foto mirror gemes ☕📸", geo: "Sleman"},
    { src: "assets/img/4.jpeg", title: "Tunjungan Plaza", tag: "Color Time", desc: "Mewarnai bareng di mall, cara sederhana buat bikin hari jadi berwarna 🎨✨", geo: "Surabaya"},
    { src: "assets/img/5.jpg", title: "Photobooth", tag: "Pop Snap", desc: "Pose cakep di photobooth, hasilnya secakep masa depan kita 📸💖", geo: "Sleman"},
    { src: "assets/img/6.jpg", title: "Kaliurang", tag: "Wisata", desc: "Cuma mirror selfie di pinggir jalan deket Kopmer bareng kamu tapi rasanya ngangenin 📸🏍️", geo: "Sleman"},
    { src: "assets/img/7.jpg", title: "Foto Mirror", tag: "Pop Snap", desc: "Foto random langsung jepret, tapi kok ya malah jadi favorit banget 📷✨", geo: "Sleman"},
    { src: "assets/img/8.jpg", title: "UTY", tag: "Wisata Jam Batu", desc: "Berkunjung ke jam Batu UTY, spot wajib prasasti kampus bersejarah wkwk 🎓✨", geo: "Sleman"},
    { src: "assets/img/9.jpeg", title: "Photobooth", tag: "Pop Snap", desc: "Pose sedikit jongkok kayak pemain bola lucu amay kita 👯‍♂️📸", geo: "Sleman"},
    { src: "assets/img/10.jpg", title: "Bukber", tag: "Alkid", desc: "Tujuan utamanya sih bukber, tapi poin plusnya bisa menikmati sore di alkid bareng kamu 🌙🍽️", geo: "Yogyakarta"},
    { src: "assets/img/11.jpeg", title: "Tunjungan Plaza", tag: "Fun World", desc: "Habis main game langsung foto bareng deh 🎮🎢", geo: "Surabaya"},
    { src: "assets/img/12.jpg", title: "Union Pizza", tag: "Masak", desc: "Belajar bikin pizza bareng, ternyata kunci enaknya bukan di topping, tapi masaknya bareng kamu cihuyy 🍕✨", geo: "Yogyakarta"},
    { src: "assets/img/13.jpg", title: "Photobooth", tag: "Gwiyomi", desc: "Sesi foto lucu gandeng tangan cantikku karena lagi pose jongkok 😆💖", geo: "Surabaya"},
    { src: "assets/img/14.jpg", title: "Ice Skating", tag: "Oca", desc: "Ice skating bareng, sering hampir jatuh tapi seru wkwkwk ⛸️❄️", geo: "Surabaya"},
    { src: "assets/img/15.jpg", title: "Foto Mirror", tag: "Jalan-jalan", desc: "Lagi jalan tiba tiba nemu spot foto, hasilnya cekrek aja 🛍️📸", geo: "Surabaya"},
    { src: "assets/img/16.jpg", title: "Foto Mirror", tag: "Lift Lippo", desc: "Foto di lift ala-ala, random banget tapi ya lucu 🏢✨", geo: "Yogyakarta"},
    { src: "assets/img/17.jpeg", title: "Paralayan Batu", tag: "Wisata", desc: "Menikmati malam di paralayang batu, best night view with the best person! 🌌💖", geo: "Malang"},
    { src: "assets/img/18.jpeg", title: "Alun-alun 1", tag: "Jalan-jalan Malam", desc: "Mulai dari keliling kota Jepara, lanjut mewarnai di alun-alun, terus ditutup ngopi bareng 🎨☕", geo: "Jepara"},
    { src: "assets/img/19.jpeg", title: "Photobooth", tag: "Malioboro", desc: "Malioboro night vibe, pose ole romeny, tegakkan kepala dan fokus masa depan ✊⚡", geo: "Yogyakarta"},
    { src: "assets/img/20.jpeg", title: "Photobooth", tag: "Tugu", desc: "Jam 2 pagi di tugu demi menghindari keramaian biar bisa foto leluasa dan gak perlu antre lama 🌃✨", geo: "Yogyakarta"},
    { src: "assets/img/21.jpeg", title: "Photobooth", tag: "K3 Mart", desc: "Semarang Kota Lama night walk. Suka banget sama suasana klasiknya 🌃✨", geo: "Semarang"},


  ];

  // 1. Rendering Kartu
  container.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    // Di dalam loop data.forEach
    card.className = "discover-card group hover:shadow-lg transition-all duration-300 snap-start";
    card.style.cursor = "pointer"; // Menandakan bisa diklik
    
    card.innerHTML = `
    <div class="card-inner-wrapper flex flex-col h-full">
    <div class="card-image-box">
        <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
    </div>
    <div class="card-info-content p-5 flex flex-col flex-grow">
        <span class="content-tag text-pink-600 text-sm font-semibold mb-1">${item.tag || 'Adventure'}</span>
        <h3 class="text-xl font-bold text-gray-800 mb-2">${item.title}</h3>
        <p class="text-sm text-gray-500 leading-relaxed mb-4">${item.desc}</p>
        <div class="mt-auto pt-3 border-t border-pink-100/50">
            <span class="text-xs text-pink-400 font-medium">
                <i class="fas fa-map-marker-alt mr-1"></i> ${item.geo || 'N/A'}
            </span>
        </div>
    </div>
</div>
`;

    card.addEventListener("dblclick", () => {
        openModal(item.src);
    });

    container.appendChild(card);
  });

  // 2. Fungsi Progres Bar
  function updateProgressBar() {
    if (!progressBar) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
        progressBar.style.width = "100%";
        return;
    }
    const scrollPercentage = (container.scrollLeft / maxScroll) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  }

  container.addEventListener("scroll", updateProgressBar);
  window.addEventListener("resize", updateProgressBar);
  updateProgressBar();

  // 3. Drag to Scroll
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    container.classList.add("cursor-grabbing");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
    container.classList.remove("cursor-grabbing");
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
    container.classList.remove("cursor-grabbing");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; 
    container.scrollLeft = scrollLeft - walk;
    updateProgressBar(); // Update progress saat drag
  });

  // Set posisi awal
  container.scrollLeft = 0;
});