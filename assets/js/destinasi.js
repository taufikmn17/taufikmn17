document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("destinasiGridContainer");
    if (!gridContainer) return;
  
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyjkU7fYLqlm-Jq0LJxShq3jGkzaKV_d1h7B2yvFvxpHkr32IkYctpdh1pQ_seo8xcjLg/exec";
  
    // Fungsi global penampung data khusus untuk tab 'destinasi'
    window.renderDestinasiData = function(destinasiData) {
      if (destinasiData.error) {
        console.error("Error dari Apps Script Server (Destinasi):", destinasiData.error);
        return;
      }
  
      gridContainer.innerHTML = ""; // Bersihkan kontainer
  
      destinasiData.forEach(item => {
        const card = document.createElement("div");
        
        // PERBAIKAN: Ditambahkan 'text-left' agar tulisan dalam kartu rata kiri
        card.className = "destinasi-card p-4 text-left";
        card.innerHTML = `
              <div class="card-inner-wrapper p-4 group">
              <img src="${item.src}" class="w-full h-48 object-cover rounded-2xl mb-4" alt="${item.title}">
              <span class="inline-block w-max bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">${item.tag}</span>
              
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 mt-2">
                  ${item.title}
              </h3>
              
              <p class="text-gray-500 text-sm mt-1 mb-3">${item.desc}</p>
              <p class="text-pink-500 text-xs font-semibold"><i class="fas fa-map-marker-alt mr-1"></i>${item.geo}</p>
          </div>
        `;
        gridContainer.appendChild(card);
      });
  
      // Jalankan efek parallax setelah seluruh kartu selesai masuk ke HTML
      initDestinasiParallax();
    };
  
    // Memanggil data ke Apps Script dengan parameter ?type=destinasi
    const scriptElement = document.createElement("script");
    scriptElement.src = `${APPS_SCRIPT_URL}?type=destinasi&callback=renderDestinasiData`;
    document.body.appendChild(scriptElement);
  
    // Fungsi Parallax
    function initDestinasiParallax() {
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