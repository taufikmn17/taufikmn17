/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

/*==================== VIDEO ====================*/
const videoFile = document.getElementById('video-file'),
      videoButton = document.getElementById('video-button'),
      videoIcon = document.getElementById('video-icon')

function playPause(){ 
    if (videoFile.paused){
        // Play video
        videoFile.play()
        // We change the icon
        videoIcon.classList.add('ri-pause-line')
        videoIcon.classList.remove('ri-play-line')
    }
    else {
        // Pause video
        videoFile.pause(); 
        // We change the icon
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')

    }
}
videoButton.addEventListener('click', playPause)

function finalVideo(){
    // Video ends, icon change
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
}
// ended, when the video ends
videoFile.addEventListener('ended', finalVideo)


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

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

  /* ========================================================
   LOGIKA INTERAKTIF MENU: OUR VIRTUAL FOOTPRINTS
   ======================================================== */

// Data Konten Cerita Jejak Langkah (Silakan ubah teks/gambar sesuai cerita asli kalian)
const footprintsData = {
    pubg: {
      title: "Pochinki & Erangel Island",
      tag: "Virtual World",
      date: "Awal Pertemuan Kita 🎮",
      img: "assets/img/1,1.jpg", // Ganti dengan screenshot PUBG kalian berdua
      desc: "Semua berawal dari sini. Berawal dari hobi yang sama di PUBG Mobile, ketemu di dalam satu tim, mabar bareng, tukaran info media sosial, hingga canda tawa di voice chat game yang pelan-pelan berubah jadi rasa nyaman."
    },
    firstmeet: {
      title: "Pertemuan Pertama di Dunia Nyata",
      tag: "Real World",
      date: "Hari Paling Mendebarkan ❤️",
      img: "assets/img/icon.jpg", // Ganti dengan foto jepretan pertama kali ketemu
      desc: "Setelah sekian lama cuma mendengar suara lewat game dan telepon, akhirnya momen canggung tapi manis ini tiba. Berani melangkah keluar dari layar HP untuk saling bertatap muka langsung, mengobrol santai tanpa sekat sinyal."
    },
    favorite: {
      title: "Petualangan di Yogyakarta",
      tag: "Our Adventure",
      date: "Setiap Sudut Penuh Kenangan 🗺️",
      img: "assets/img/jajan1.jpg", // Ganti dengan foto liburan berdua
      desc: "Menjelajahi keindahan sudut kota, berkendara menyusuri jalanan malam yang syahdu, hingga mencicipi aneka kuliner lezat yang daftarnya bisa kamu lihat langsung di seksi 'Memory Lane' di bawah!"
    }
  };
  
  function openMapModal(key) {
    const modal = document.getElementById("mapModal");
    const data = footprintsData[key];
  
    if (!modal || !data) return;
  
    // Isi data ke dalam element popup
    document.getElementById("modalMapImg").src = data.img;
    document.getElementById("modalMapTitle").innerText = data.title;
    document.getElementById("modalMapTag").innerText = data.tag;
    document.getElementById("modalMapDate").innerText = data.date;
    document.getElementById("modalMapDesc").innerText = data.desc;
  
    // Jalankan animasi buka
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      modal.querySelector(".transform").classList.remove("scale-95");
      modal.querySelector(".transform").classList.add("scale-100");
    }, 10);
  }
  
  function closeMapModal() {
    const modal = document.getElementById("mapModal");
    if (!modal) return;
  
    modal.classList.add("opacity-0");
    modal.querySelector(".transform").classList.remove("scale-100");
    modal.querySelector(".transform").classList.add("scale-95");
  
    setTimeout(() => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }, 300);
  }
  
  // Tutup modal otomatis jika pengguna mengeklik area hitam di luar kotak info
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("mapModal");
    if (e.target === modal) closeMapModal();
  });

  