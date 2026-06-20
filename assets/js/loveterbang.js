const canvas = document.getElementById('loveLanternCanvas');
const ctx = canvas.getContext('2d');


// Fungsi untuk memutar suara klik
function playClickSound() {
    const audio = new Audio('assets/music/klik_love.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio diblokir browser: " + e));
}

// Atur ukuran canvas penuh layar
function resizeCanvas() {
    // 1. Dapatkan ukuran layar yang benar
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 2. Set atribut canvas sesuai ukuran layar
    canvas.width = width;
    canvas.height = height;

    // 3. (Opsional) Jika CSS Anda sudah 100%, ini memastikan context 
    // sinkron dengan resolusi fisik layar
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let lantaners = [];
let particles = [];
let bigLoves = [];

// Fungsi pembantu untuk menggambar bentuk Love di Canvas
function drawLove(x, y, size, color, opacity = 1) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y - size / 2, x - size / 2, y - size / 2);
    ctx.quadraticCurveTo(x - size, y - size / 2, x - size, y + size / 4);
    ctx.quadraticCurveTo(x - size, y + size * 0.75, x, y + size * 1.25);
    ctx.quadraticCurveTo(x + size, y + size * 0.75, x + size, y + size / 4);
    ctx.quadraticCurveTo(x + size, y - size / 2, x + size / 2, y - size / 2);
    ctx.quadraticCurveTo(x, y - size / 2, x, y + size / 4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}

// Class untuk Lentera Love Terbang (Kiri ke Kanan)
class Lantern {
    constructor() {
        this.size = Math.random() * 15 + 15; // Ukuran random (15px - 30px)
        this.x = -this.size * 2; // Mulai dari luar layar sebelah kiri
        this.y = Math.random() * (canvas.height * 0.7) + (canvas.height * 0.1); // Ketinggian acak
        this.speedX = Math.random() * 1.5 + 1; // Kecepatan horizontal
        this.speedY = Math.sin(Math.random() * Math.PI) * 0.3; // Efek melayang naik turun sedikit
        this.angle = Math.random() * 100;
        this.color = `hsl(${Math.random() * 20 + 340}, 100%, 70%)`; // Variasi warna pink/merah muda cerah
    }

    update() {
        this.x += this.speedX;
        this.angle += 0.02;
        this.y += Math.sin(this.angle) * 0.4; // Membuat gerakan meliuk lembut seperti lentera terbang
    }

    draw() {
        // Efek glow/bercahaya di sekeliling lentera
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        drawLove(this.x, this.y, this.size, this.color);
        ctx.restore();
    }
}

// Class untuk Efek Love Besar saat diklik
class BigLove {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.maxSize = 30; // <-- UBAH DI SINI (Sebelumnya 90, diturunkan agar tidak terlalu besar)
        this.opacity = 1;
        this.color = '#ff4d6d';
    }

    update() {
        if (this.size < this.maxSize) {
            this.size += 4; // Menurunkan kecepatan pop sedikit agar animasinya tetap halus
        } else {
            this.opacity -= 0.05; // Sedikit lebih cepat memudar setelah mencapai batas maksimum
        }
    }

    draw() {
        if (this.opacity > 0) {
            drawLove(this.x, this.y, this.size, this.color, this.opacity);
        }
    }
}

// Class untuk Serpihan Confetti
class Confetti {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 4;
        this.speedX = (Math.random() - 0.5) * 10; // Menyebar ke samping
        this.speedY = (Math.random() - 0.7) * 12; // Muncrat ke atas lalu jatuh
        this.gravity = 0.3;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Confetti warna-warni penuh
        this.opacity = 1;
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015; // Menghilang perlahan
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Menggambar serpihan kotak confetti kecil
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}

// Munculkan lentera baru setiap 2.5 detik secara otomatis
setInterval(() => {
    // Batasi maksimal lentera di layar agar tidak lag (max: 10 lentera sekaligus)
    if (lantaners.length < 10) {
        lantaners.push(new Lantern());
    }
}, 2500);

function handleInteraction(e) {
    const rect = canvas.getBoundingClientRect();
    // Jika mobile, ambil koordinat dari sentuhan pertama
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    // Iterasi terbalik agar jika ada lentera tumpang tindih, 
    // yang di depan yang terkena klik
    for (let i = lantaners.length - 1; i >= 0; i--) {
        const lantern = lantaners[i];
        const dist = Math.hypot(lantern.x - mouseX, lantern.y - mouseY);
        
        if (dist < lantern.size * 2) {
            
            // --- BAGIAN YANG PERLU ANDA TAMBAHKAN DI SINI ---
            playClickSound(); 
            // ------------------------------------------------

            bigLoves.push(new BigLove(lantern.x, lantern.y));
            for (let j = 0; j < 40; j++) {
                particles.push(new Confetti(lantern.x, lantern.y));
            }
            lantaners.splice(i, 1);
            break; // Berhenti setelah satu lentera terpencet
        }
    }
}

window.addEventListener('click', handleInteraction);
window.addEventListener('touchstart', handleInteraction, {passive: false});

// Loop Animasi Canvas utama (60 FPS perkiraan)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Loop Lentera (Mundur)
    for (let i = lantaners.length - 1; i >= 0; i--) {
        lantaners[i].update();
        lantaners[i].draw();
        if (lantaners[i].x - lantaners[i].size * 2 > canvas.width) {
            lantaners.splice(i, 1);
        }
    }

    // 2. Loop Efek Love Besar (Mundur)
    for (let i = bigLoves.length - 1; i >= 0; i--) {
        bigLoves[i].update();
        bigLoves[i].draw();
        if (bigLoves[i].opacity <= 0) {
            bigLoves.splice(i, 1);
        }
    }

    // 3. Loop Confetti (Mundur)
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0 || particles[i].y > canvas.height) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

// Mulai loop animasi
animate();