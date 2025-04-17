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

function enableInfiniteScroll() {
  const scrollContainer = document.getElementById("scrollContainer");
  if (!scrollContainer) return;

  const imageData = [
    { src: "assets/img/2.jpg", title: "Lippo", desc: "Foto di lift 🥺💞" },
    { src: "assets/img/2.jpg", title: "Nonton", desc: "Foto nonton bareng 🍿❤️" },
    { src: "assets/img/2.jpg", title: "Cafe", desc: "Ngopi Tuku ☕️💕" },
    { src: "assets/img/2.jpg", title: "Jalan", desc: "Main ke taman 🌸" },
    { src: "assets/img/2.jpg", title: "Pantai", desc: "Sunset bareng 🌅💕" },
    { src: "assets/img/2.jpg", title: "Selfie", desc: "Selfie random 📸💖" }
  ];

  const DUPLICATE_COUNT = 200;
  for (let i = 0; i < DUPLICATE_COUNT; i++) {
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
  }

  const sectionWidth = scrollContainer.scrollWidth / 3;
  scrollContainer.scrollLeft = sectionWidth;

  let isDragging = false;
  let startX;
  let scrollLeft;

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
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  scrollContainer.addEventListener("scroll", () => {
    const currentScroll = scrollContainer.scrollLeft;
    if (currentScroll < sectionWidth * 0.5) {
      scrollContainer.scrollLeft = currentScroll + sectionWidth;
    } else if (currentScroll > sectionWidth * 2.5) {
      scrollContainer.scrollLeft = currentScroll - sectionWidth;
    }
  });
}

// Jalankan fungsi saat dokumen siap
if (document.readyState !== "loading") {
  enableInfiniteScroll();
} else {
  document.addEventListener("DOMContentLoaded", enableInfiniteScroll);
}
