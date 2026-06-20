const canvas = document.getElementById('loveLanternCanvas');
const ctx = canvas.getContext('2d');

// Fungsi untuk menyesuaikan ukuran canvas dengan parent (section home)
function resizeCanvas() {
    const parent = canvas.parentElement; 
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Panggil sekali untuk inisialisasi

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

// Class untuk Lentera Love
class Lantern {
    constructor() {
        this.size = Math.random() * 15 + 15;
        this.x = -this.size * 2;
        this.y = Math.random() * (canvas.height * 0.7) + (canvas.height * 0.1);
        this.speedX = Math.random() * 1.5 + 1;
        this.speedY = Math.sin(Math.random() * Math.PI) * 0.3;
        this.angle = Math.random() * 100;
        this.color = `hsl(${Math.random() * 20 + 340}, 100%, 70%)`;
    }

    update() {
        this.x += this.speedX;
        this.angle += 0.02;
        this.y += Math.sin(this.angle) * 0.4;
    }

    draw() {
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
        this.x = x; this.y = y; this.size = 10;
        this.maxSize = 30; this.opacity = 1; this.color = '#ff4d6d';
    }
    update() {
        if (this.size < this.maxSize) this.size += 4;
        else this.opacity -= 0.05;
    }
    draw() {
        if (this.opacity > 0) drawLove(this.x, this.y, this.size, this.color, this.opacity);
    }
}

// Class untuk Serpihan Confetti
class Confetti {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 6 + 4;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.7) * 12;
        this.gravity = 0.3;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.opacity = 1;
    }
    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}

setInterval(() => {
    if (lantaners.length < 10) lantaners.push(new Lantern());
}, 2500);

function handleInteraction(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    let hit = false; // Deteksi apakah mengenai lentera

    for (let i = lantaners.length - 1; i >= 0; i--) {
        const lantern = lantaners[i];
        const dist = Math.hypot(lantern.x - mouseX, lantern.y - mouseY);
        if (dist < lantern.size * 2) {
            bigLoves.push(new BigLove(lantern.x, lantern.y));
            for (let j = 0; j < 40; j++) particles.push(new Confetti(lantern.x, lantern.y));
            lantaners.splice(i, 1);
            hit = true;
            break;
        }
    }
    if (!hit) {
        // Opsional: Jika ingin tetap bisa scroll meski menyentuh canvas kosong
        return; 
    }
}

canvas.addEventListener('click', handleInteraction);
canvas.addEventListener('touchstart', handleInteraction, {passive: false});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = lantaners.length - 1; i >= 0; i--) {
        lantaners[i].update(); lantaners[i].draw();
        if (lantaners[i].x - lantaners[i].size * 2 > canvas.width) lantaners.splice(i, 1);
    }
    for (let i = bigLoves.length - 1; i >= 0; i--) {
        bigLoves[i].update(); bigLoves[i].draw();
        if (bigLoves[i].opacity <= 0) bigLoves.splice(i, 1);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(); particles[i].draw();
        if (particles[i].opacity <= 0 || particles[i].y > canvas.height) particles.splice(i, 1);
    }

    canvas.style.pointerEvents = lantaners.length > 0 ? 'auto' : 'none';
    requestAnimationFrame(animate);
}
animate();