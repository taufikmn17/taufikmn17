document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("placeGridContainer");
  if (!gridContainer) return;

  // URL Web App Apps Script Anda
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjkU7fYLqlm-Jq0LJxShq3jGkzaKV_d1h7B2yvFvxpHkr32IkYctpdh1pQ_seo8xcjLg/exec";

  // Fungsi global penampung data khusus untuk tab 'place'
  window.renderPlaceData = function(placeData) {
    if (placeData.error) {
      console.error("Error dari Apps Script Server (Place):", placeData.error);
      return;
    }

    gridContainer.innerHTML = ""; // Bersihkan kontainer

    placeData.forEach(item => {
      const card = document.createElement("div");
      
      // DISAMAKAN PERSIS: Menggunakan p-4 dan text-left seperti destinasi.js
      card.className = "destinasi-card p-4 text-left";
      card.innerHTML = `
          <div class="card-inner-wrapper p-5 bg-white rounded-3xl shadow-md border border-gray-100 group transition-all duration-300 h-full flex flex-col justify-between"> 
          <div>
            <div class="relative overflow-hidden rounded-2xl mb-4 h-48 w-full">
              <img src="${item.src || 'assets/img/default.jpg'}" class="w-full h-full object-cover" alt="${item.title || 'Gambar Kuliner'}">
            </div>
            
            <div class="flex justify-between items-center mb-3">
              <span class="bg-pink-50 text-pink-600 text-xs font-bold px-3 py-1 rounded-full border border-pink-100 inline-block w-max">${item.tag || 'Kuliner'}</span>
              <span class="text-sm font-bold text-amber-500 flex items-center bg-amber-50 px-2.5 py-0.5 rounded-full"><i class="fas fa-star mr-1 text-xs"></i>${item.rating || '0.0'}</span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 mt-1">
                ${item.title || ''}
            </h3>
            
            <p class="text-gray-500 text-sm mt-2 mb-4 leading-relaxed">${item.desc || ''}</p>
          </div>
          
          <div class="flex justify-between items-center text-xs font-semibold pt-4 border-t border-gray-100 mt-auto">
            <p class="text-gray-400 flex items-center"><i class="fas fa-map-marker-alt mr-1.5 text-pink-500"></i>${item.geo || ''}</p>
            <span class="text-pink-600 bg-pink-100/50 px-2.5 py-1 rounded-lg tracking-wide uppercase text-[10px] font-bold">${item.status || ''}</span>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });

    // Jalankan efek parallax setelah seluruh kartu tempat selesai masuk ke HTML
    initPlaceParallax();
  };

  // Memanggil data ke Apps Script dengan parameter ?type=place
  const scriptElement = document.createElement("script");
  scriptElement.src = `${APPS_SCRIPT_URL}?type=place&callback=renderPlaceData`;
  document.body.appendChild(scriptElement);

  // Fungsi Parallax - DISAMAKAN 100% PERSIS dengan destinasi.js
  function initPlaceParallax() {
    const cards = document.querySelectorAll(".destinasi-card");
    
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const inner = card.querySelector(".card-inner-wrapper");
            if (!inner) return;

            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;

            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = (mouseY / (cardHeight / 2)) * -8;
            const rotateY = (mouseX / (cardWidth / 2)) * 8;

            // Menggunakan nilai translasi -8px murni tanpa modifikasi boxShadow tambahan
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener("mouseleave", () => {
            const inner = card.querySelector(".card-inner-wrapper");
            if (!inner) return;
            inner.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
        });
    });
  }

  // INTERSECTION OBSERVER JUDUL
  const sectionTitles = document.querySelectorAll(".section-title-fade");
  const titleObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("title-visible");
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  sectionTitles.forEach(title => titleObserver.observe(title));
});