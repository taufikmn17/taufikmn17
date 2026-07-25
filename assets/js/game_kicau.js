const SCRIPT_URL_GAME = "https://script.google.com/macros/s/AKfycbz6HaF731DyONmINCJBBkbr8cVgznjkyai_NTU9v03-G5xgH3xJ6L04gkbjLBXhDBddDw/exec";

const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("myScore");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const gameMusic = document.getElementById("gameMusic");

let score = 0;
let timeLeft = 35;
let gameInterval, spawnTimeoutId;
let fallSpeed = 15;
let currentPlayer = "";
let spawnDelay = 800;

window.startGame = function() {
    document.getElementById("nameModal").classList.remove("hidden");
};

window.saveNameAndStart = function() {
    const nameInput = document.getElementById("playerName");
    if (!nameInput.checkValidity()) {
        nameInput.reportValidity();
        return;
    }

    currentPlayer = nameInput.value.trim();
    document.getElementById("nameModal").classList.add("hidden");

    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff69b4', '#ff1493', '#ffffff'] });
    }
    runGameLogic();
};

function runGameLogic() {
    score = 0;
    timeLeft = 35;
    fallSpeed = 15;
    spawnDelay = 800;
    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;
    startBtn.disabled = true;
    
    clearInterval(gameInterval);
    clearTimeout(spawnTimeoutId);

    gameMusic.currentTime = 0;
    gameMusic.play();

    gameInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            timeLeft = 0;
            endGame();
        } else {
            timerDisplay.innerText = timeLeft;
        }
    }, 1000);

    spawnBirdLoop();
}

function spawnBirdLoop() {
    spawnHeart(); 
    if (timeLeft > 25) spawnDelay = 800;
    else if (timeLeft > 15) spawnDelay = 600;
    else if (timeLeft > 5) spawnDelay = 400;
    else spawnDelay = 250;

    if (score > 20) spawnHeart(); 
    if (score > 40) spawnHeart();

    spawnTimeoutId = setTimeout(spawnBirdLoop, spawnDelay);
}

function spawnHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "🐦";
    heart.className = "absolute text-4xl cursor-pointer p-10 transition-transform hover:scale-110"; 
    heart.style.left = Math.random() * (gameArea.clientWidth - 80) + "px";
    heart.style.top = "-80px";
    gameArea.appendChild(heart);

    const fall = setInterval(() => {
        let top = parseInt(heart.style.top || -80);
        if (top > gameArea.clientHeight) {
            clearInterval(fall);
            heart.remove();
        } else {
            heart.style.top = (top + 5) + "px";
        }
    }, fallSpeed);

    heart.onclick = () => {
        score++;
        scoreDisplay.innerText = score;
        heart.remove();
        clearInterval(fall);
        if (fallSpeed > 5) fallSpeed -= 0.5;
    };
}

async function endGame() {
    clearInterval(gameInterval);
    clearTimeout(spawnTimeoutId);
    gameArea.innerHTML = "";
    startBtn.disabled = false;
    gameMusic.pause();
    gameMusic.currentTime = 0;

    try {
        await fetch(SCRIPT_URL_GAME, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "game",
                sheet: "game_kicau",
                name: currentPlayer,
                score: score,
                timestamp: new Date().toISOString()
            })
        });
    } catch (e) { 
        console.error(e); 
    }

    document.getElementById("finalScoreText").innerText = `${currentPlayer}, skor kamu: ${score}!`;
    document.getElementById("gameModal").classList.remove("hidden");
    setTimeout(loadLeaderboard, 1500);
}

window.closeNameModal = function() {
    document.getElementById("nameModal").classList.add("hidden");
    document.getElementById("playerName").value = "";
};

window.closeScoreModal = function() {
    document.getElementById("gameModal").classList.add("hidden");
    startBtn.disabled = false;
    timeLeft = 35; 
    timerDisplay.innerText = timeLeft;
    score = 0;
    scoreDisplay.innerText = score;
};

async function loadLeaderboard() {
    try {
        const response = await fetch(`${SCRIPT_URL_GAME}?type=game_kicau`);
        const data = await response.json();
        const container = document.getElementById("leaderboardList");
        if (!container) return;
        
        container.innerHTML = ""; 

        // Urutkan skor dari yang tertinggi
        data.sort((a, b) => b.score - a.score);
        const top3 = data.slice(0, 3);

        top3.forEach((item, index) => {
            let rank = index + 1;
            container.innerHTML += `
                <div class="flex flex-col items-center w-full md:w-auto">
                    <div class="bg-white p-5 rounded-3xl shadow-lg border-2 border-pink-100 text-center w-full md:w-32 transform transition hover:scale-105">
                        <div class="text-4xl mb-2">${rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}</div>
                        <p class="font-bold text-gray-800 truncate">${item.name}</p>
                        <p class="text-pink-500 font-black text-xl">${item.score} pts</p>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);