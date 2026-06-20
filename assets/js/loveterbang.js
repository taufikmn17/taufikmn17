const canvas = document.getElementById('loveLanternCanvas');
const ctx = canvas.getContext('2d');

// Atur ukuran canvas penuh layar
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

// --- PERBAIKAN DI BAGIAN INI ---
// Menggunakan 'window' agar klik bisa menembus canvas transparan dan tetap mendeteksi koordinat lentera
window.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Cek apakah area klik mengenai salah satu love lentera
    lantaners.forEach((lantern, index) => {
        // Toleransi radius klik sedikit diperbesar agar lebih responsif (lantern.size * 2)
        const dist = Math.hypot(lantern.x - mouseX, lantern.y - mouseY);
        
        if (dist < lantern.size * 2) {
            // 1. Munculkan Love Besar di titik tersebut
            bigLoves.push(new BigLove(lantern.x, lantern.y));

            // 2. Ledakkan 40 buah Serpihan Confetti
            for (let i = 0; i < 40; i++) {
                particles.push(new Confetti(lantern.x, lantern.y));
            }

            // 3. Hapus lentera kecil yang berhasil diklik
            lantaners.splice(index, 1);
        }
    });
});

// Loop Animasi Canvas utama (60 FPS perkiraan)
function animate() {
    // Membersihkan canvas di setiap frame baru tanpa menghapus background asli web
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Jalankan & Gambar Lentera Terbang
    lantaners.forEach((lantern, index) => {
        lantern.update();
        lantern.draw();
        // Hapus jika sudah lolos melewati layar kanan
        if (lantern.x - lantern.size * 2 > canvas.width) {
            lantaners.splice(index, 1);
        }
    });

    // Jalankan & Gambar Efek Love Besar
    bigLoves.forEach((bigLove, index) => {
        bigLove.update();
        bigLove.draw();
        if (bigLove.opacity <= 0) {
            bigLoves.splice(index, 1);
        }
    });

    // Jalankan & Gambar Confetti jatuh
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0 || particle.y > canvas.height) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// Mulai loop animasi
animate();