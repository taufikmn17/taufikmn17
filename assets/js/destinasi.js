document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("destinasiGridContainer");
    if (!gridContainer) return;
    
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6HaF731DyONmINCJBBkbr8cVgznjkyai_NTU9v03-G5xgH3xJ6L04gkbjLBXhDBddDw/exec";
  
    // 1. Ambil data menggunakan FETCH modern, bukan menyuntikkan script tag
    fetch(`${APPS_SCRIPT_URL}?type=destinasi`)
      .then(response => response.json())
      .then(destinasiData => {
        if (destinasiData.error) {
          console.error("Error dari Server:", destinasiData.error);
          return;
        }
  
        gridContainer.innerHTML = ""; // Bersihkan kontainer
  
        destinasiData.forEach(item => {
          const card = document.createElement("div");
          card.className = "destinasi-card p-4 text-left";
          card.innerHTML = `
            <div class="card-inner-wrapper p-4 group">
              <img src="${item.src}" class="w-full h-48 object-cover rounded-2xl mb-4" alt="${item.title}">
              <span class="inline-block w-max bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">${item.tag}</span>
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 mt-2">${item.title}</h3>
              <p class="text-gray-500 text-sm mt-1 mb-3">${item.desc}</p>
              <p class="text-pink-500 text-xs font-semibold"><i class="fas fa-map-marker-alt mr-1"></i>${item.geo}</p>
            </div>
          `;
          gridContainer.appendChild(card);
        });
  
        // Jalankan efek parallax setelah data selesai dirender
        initDestinasiParallax();
      })
      .catch(error => console.error("Gagal memuat data Google Sheets:", error));
  
    // Fungsi Parallax (Tetap sama seperti kode Anda sebelumnya)
    function initDestinasiParallax() {
      const cards = document.querySelectorAll(".destinasi-card");
      cards.forEach((card) => {
          card.addEventListener("mousemove", (e) => {
              const inner = card.querySelector(".card-inner-wrapper");
              if (!inner) return;
              const cardRect = card.getBoundingClientRect();
              const centerX = cardRect.left + cardRect.width / 2;
              const centerY = cardRect.top + cardRect.height / 2;
              const mouseX = e.clientX - centerX;
              const mouseY = e.clientY - centerY;
              const rotateX = (mouseY / (cardRect.height / 2)) * -8;
              const rotateY = (mouseX / (cardRect.width / 2)) * 8;
              inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
          });
          card.addEventListener("mouseleave", () => {
              const inner = card.querySelector(".card-inner-wrapper");
              if (!inner) return;
              inner.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
          });
      });
    }
  });