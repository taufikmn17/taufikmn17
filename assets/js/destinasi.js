// destinasi.js
document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("destinasiGridContainer");
  if (!gridContainer) return;

  const destinasiData = [
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
      { src: "assets/img/17.jpeg", title: "Paralayang Batu", tag: "Wisata", desc: "Menikmati malam di paralayang batu, best night view with the best person! 🌌💖", geo: "Malang"},
      { src: "assets/img/18.jpeg", title: "Alun-alun 1", tag: "Jalan-jalan Malam", desc: "Mulai dari keliling kota Jepara, lanjut mewarnai di alun-alun, terus ditutup ngopi bareng 🎨☕", geo: "Jepara"},
      { src: "assets/img/19.jpeg", title: "Photobooth", tag: "Malioboro", desc: "Malioboro night vibe, pose ole romeny, tegakkan kepala dan fokus masa depan ✊⚡", geo: "Yogyakarta"},
      { src: "assets/img/20.jpeg", title: "Photobooth", tag: "Tugu", desc: "Jam 2 pagi di tugu demi menghindari keramaian biar bisa foto leluasa dan gak perlu antre lama 🌃✨", geo: "Yogyakarta"},
      { src: "assets/img/21.jpeg", title: "Photobooth", tag: "K3 Mart", desc: "Semarang Kota Lama night walk, Suka banget sama suasana klasiknya 🌃✨", geo: "Semarang"}
  ];

  destinasiData.forEach(item => {
      const card = document.createElement("div");
      // Hapus kelas tailwind yang bertabrakan dengan CSS custom (seperti border-pink-100)
      card.className = "destinasi-card p-4"; 
      card.innerHTML = `
          <div class="card-inner-wrapper p-4">
          <img src="${item.src}" class="w-full h-48 object-cover rounded-2xl mb-4" alt="${item.title}">
          <span class="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full">${item.tag}</span>
          <h3 class="text-xl font-bold text-gray-800 mt-2">${item.title}</h3>
          <p class="text-gray-500 text-sm mt-1 mb-3">${item.desc}</p>
          <p class="text-pink-500 text-xs font-semibold"><i class="fas fa-map-marker-alt mr-1"></i>${item.geo}</p>
      </div>
      `;
      gridContainer.appendChild(card);
  });

  // EFEK INTERAKTIF 3D PARALLAX MOUSE HOVER (Sesuai permintaan Anda)
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
});