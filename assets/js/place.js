/**
 * ROMBAK TOTAL: LOGIKA RENDER DATA AUTOMATIS & ANIMASI SEKSI TEMPAT (PLACE.JS)
 */
document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("placeGridContainer");
  if (!gridContainer) return;

  // 1. DATABASE DATA FOTO & TEMPAT (Disimpan di JS agar HTML tetap bersih)
  const placeData = [
    { src: "assets/img/jajan1.jpg", title: "Penyetan Candu", rating: "4.5", tag: "Kuliner Hits", desc: "Tempat makan penyetan pedas favorit yang selalu bikin nagih!", geo: "Sleman, DIY", status: "Must Visit" },
    { src: "assets/img/jajan2.jpg", title: "Kopi Tuku", rating: "5.0", tag: "Coffee Shop", desc: "Habis ngopi foto mirror berdua. Momen santai yang sederhana tapi berkesan manis.", geo: "Area Kuliner", status: "Favorite" },
    { src: "assets/img/jajan3.jpg", title: "Sego Pasar Ngasem", rating: "4.0", tag: "Sarapan Tradisional", desc: "Menikmati kuliner tradisional pasar dengan suasana yang khas dan otentik.", geo: "Kraton, Yogyakarta", status: "Classic" },
    { src: "assets/img/jajan4.jpg", title: "Brownies Buatan Adek Sayang", rating: "5.0", tag: "Spesial Homemade", desc: "Brownies buatan adek yang paling manis dan dibikin pakai penuh rasa cinta! ❤️", geo: "Home Sweet Home", status: "Best Ever" },
    { src: "assets/img/jajan5.jpg", title: "Kopi Merapi", rating: "4.2", tag: "Wisata Alam", desc: "Ngopi syahdu di lereng gunung dengan pemandangan alam yang sejuk dan asri.", geo: "Cangkringan", status: "Recommended" },
    { src: "assets/img/jajan6.jpg", title: "Mie Gacoan", rating: "4.0", tag: "Kuliner Populer", desc: "Makan mie pedas legendaris sambil mengobrol seru dan seruan bareng.", geo: "Pusat Kota", status: "Fun Time" },
    { src: "assets/img/jajan7.jpg", title: "Ayam Bakar Alkid", rating: "3.8", tag: "Kuliner Malam", desc: "Makan malam ayam bakar lezat di sekitar area Alun-alun Kidul.", geo: "Alun-Alun Kidul", status: "Chill" },
    { src: "assets/img/jajan8.jpg", title: "Kebon Ndalem", rating: "3.5", tag: "Cafe & Resto", desc: "Nongkrong premium sambil melihat pemandangan Tugu Jogja langsung dari lantai atas.", geo: "Tugu Jogja", status: "Good View" },
    { src: "assets/img/jajan9.jpg", title: "Union Pizza", rating: "4.5", tag: "Creative Food", desc: "Momen seru belajar dan bikin adonan pizza kreasi kita sendiri.", geo: "Sleman", status: "Romantic" },
    { src: "assets/img/jajan10.jpg", title: "Pecel Telaga Sarangan", rating: "5.0", tag: "Kuliner Wisata", desc: "Makan pecel pincuk legendaris di pinggir telaga yang dingin dan berkabut.", geo: "Sarangan, Magetan", status: "Superb" },
    { src: "assets/img/jajan11.jpg", title: "Bebakaran Sarangan", rating: "4.3", tag: "Kuliner Malam Wisata", desc: "Menikmati sate kelinci hangat atau sate ayam di malam hari pinggir telaga.", geo: "Sarangan", status: "Warm Momen" },
    { src: "assets/img/jajan12.jpg", title: "Seblak Sarangan", rating: "4.0", tag: "Cemilan Pedas", desc: "Makan seblak hangat kuah pedas di tengah udara dingin menusuk tulang.", geo: "Sarangan", status: "Spicy" },
    { src: "assets/img/jajan13.jpg", title: "Malio Gelato", rating: "4.5", tag: "Dessert Manis", desc: "Mencicipi es krim gelato berbagai varian rasa biar hari kita makin manis.", geo: "Malioboro", status: "Sweet Treat" },
    { src: "assets/img/jajan14.jpg", title: "Iga Bajog", rating: "3.5", tag: "Kuliner 24 Jam", desc: "Makan iga sapi bakar porsi mantap tengah malam saat perut lapar-laparnya.", geo: "Sleman", status: "Late Night" },
    { src: "assets/img/jajan15.jpg", title: "Sate Ratu", rating: "4.5", tag: "Kuliner Juara", desc: "Sate merah bumbu meresap super lezat yang selalu bikin rindu suasananya! 🍢✨", geo: "Sleman, DIY", status: "Must Visit" }
  ];

  // 2. PROSES GENERATE KARTU SECARA OTOMATIS (Looping Render)
  gridContainer.innerHTML = ""; // Bersihkan kontainer terlebih dahulu
  
  placeData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "place-card-premium group";
    
    card.innerHTML = `
      <div class="card-inner-wrapper">
          <div class="floating-rating-badge">
              <i class="fas fa-star text-yellow-400 mr-1 animate-pulse"></i>
              <span>${item.rating}</span>
          </div>
          <div class="card-image-box">
              <img src="${item.src}" alt="${item.title}" class="group-hover:scale-110 transition-transform duration-700 ease-out" onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop'"/>
              <div class="image-gradient-overlay"></div>
          </div>
          <div class="card-info-content">
              <span class="content-tag text-pink-600">${item.tag}</span>
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 mb-2">${item.title}</h3>
              <p class="text-sm text-gray-500 leading-relaxed mb-4">${item.desc}</p>
              <div class="flex items-center justify-between pt-3 border-t border-pink-100/50 mt-auto">
                  <span class="text-xs text-pink-400 font-medium"><i class="fas fa-map-marker-alt mr-1"></i> ${item.geo}</span>
                  <span class="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-md font-semibold">${item.status}</span>
              </div>
          </div>
      </div>
    `;
    
    gridContainer.appendChild(card);
  });

  // 3. INTERSECTION OBSERVER (Animasi Muncul Bertahap/Staggered)
  const premiumCards = document.querySelectorAll(".place-card-premium");
  const revealOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -20px 0px"
  };

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("reveal-visible");
        }, index * 100); // Muncul bergantian setiap 100ms
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  premiumCards.forEach((card) => cardObserver.observe(card));

  // 4. EFEK INTERAKTIF 3D PARALLAX MOUSE HOVER
  premiumCards.forEach((card) => {
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
});

/* ========================================================
   LOGIKA INTERSECTION OBSERVER KHUSUS JUDUL SEKSI
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const sectionTitles = document.querySelectorAll(".section-title-fade");

  if (sectionTitles.length === 0) return;

  const titleOptions = {
    root: null,
    threshold: 0.1, // Terpicu langsung saat ujung atas judul mulai masuk layar
    rootMargin: "0px 0px -50px 0px"
  };

  const titleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("title-visible");
        observer.unobserve(entry.target); // Cukup animasi sekali saat pertama di-scroll
      }
    });
  }, titleOptions);

  sectionTitles.forEach(title => {
    titleObserver.observe(title);
  });
});