const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6HaF731DyONmINCJBBkbr8cVgznjkyai_NTU9v03-G5xgH3xJ6L04gkbjLBXhDBddDw/exec"; 

document.addEventListener("DOMContentLoaded", () => {
    const wishForm = document.getElementById("wishForm");
    const wishText = document.getElementById("wishText");
    const charCount = document.getElementById("charCount");
    const skyContainer = document.getElementById("lanternSkyContainer");
    const wishTreeContainer = document.getElementById("wishTreeContainer");

    if (wishText && charCount) {
        wishText.addEventListener("input", function() {
            charCount.textContent = wishText.value.length + " / 150 karakter";
        });
    }

    function buatLenteraTerbang(pesan, warna) {
        var warnaBg = warna === "amber" ? "rgba(251, 191, 36, 0.85)" : "rgba(255, 105, 180, 0.9)";
        var warnaGlow = warna === "amber" ? "rgba(251, 191, 36, 0.5)" : "rgba(255, 20, 147, 0.6)";

        var lantern = document.createElement("div");
        lantern.style.cssText = "position:absolute; bottom:-120px; display:flex; flex-direction:column; align-items:center; transition:all 7500ms cubic-bezier(0.25, 0.1, 0.25, 1); opacity:1; z-index:1;";
        lantern.style.left = (Math.floor(Math.random() * 70) + 15) + "%";
        
        lantern.innerHTML = `
            <div style="background: #ffffff; border: 2.5px solid ${warnaBg}; color: #1e293b; padding: 10px 16px; border-radius: 16px; font-size: 12px; max-width: 190px; text-align: center; word-wrap: break-word; box-shadow: 0 6px 20px rgba(0,0,0,0.15); margin-bottom: 10px; font-style: italic; font-weight: 500;">"${pesan}"</div>
            <div style="width: 46px; height: 58px; background: ${warnaBg}; border-radius: 14px 14px 6px 6px; box-shadow: 0 0 25px ${warnaGlow}; position: relative;">
                <div style="position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 12px; height: 18px; background: #fb923c; border-radius: 50%;"></div>
            </div>
        `;
        
        if (skyContainer) {
            skyContainer.appendChild(lantern);
            setTimeout(() => {
                lantern.style.bottom = "115%";
                lantern.style.transform = `translateX(${Math.random() > 0.5 ? 60 : -60}px) scale(0.7)`;
            }, 5);
            setTimeout(() => lantern.remove(), 8000);
        }
    }

    if (wishForm) {
        wishForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            var pesan = wishText.value.trim();
            if (!pesan) return;

            var warnaDipilih = document.querySelector('input[name="lanternColor"]:checked').value;
            var waktuSekarang = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

            buatLenteraTerbang(pesan, warnaDipilih);

            try {
                await fetch(SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        action: "lentera",
                        sheet: "lentera",
                        text: pesan,
                        color: warnaDipilih,
                        date: waktuSekarang,
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (error) {
                console.error("Error saving wish:", error);
            }

            wishText.value = "";
            charCount.textContent = "0 / 150 karakter";
            setTimeout(loadWishes, 1000); // Refresh data papan
        });
    }

    async function loadWishes() {
        try {
            const response = await fetch(`${SCRIPT_URL}?type=lentera`);
            const data = await response.json();
            wishTreeContainer.innerHTML = "";

            if (!data || data.length === 0) {
                wishTreeContainer.innerHTML = `<div class="text-center py-6 text-sm text-slate-400 italic bg-white px-6 rounded-2xl border border-dashed border-slate-300">Belum ada memo. Yuk, tulis harapan pertamamu!</div>`;
                return;
            }

            // Ambil 3 data terbaru
            const latestWishes = data.reverse().slice(0, 3);
            latestWishes.forEach((wish, index) => {
                var styleMemo = "border-color: rgba(255, 105, 180, 0.4); background: linear-gradient(to bottom right, #fff5f8, rgba(255, 182, 193, 0.3)); color: #ff1493;";
                var labelWarna = "🌸 Pink Wish";
                var styleClip = "background-color: #ff69b4;";
                
                if (wish.color === "amber") {
                    styleMemo = "border-color: rgba(251, 191, 36, 0.4); background: linear-gradient(to bottom right, #fffbeb, rgba(253, 230, 138, 0.3)); color: #b45309;";
                    labelWarna = "✨ Golden Wish";
                    styleClip = "background-color: #fb923c;";
                }

                var noteHarapan = document.createElement("div");
                noteHarapan.className = `w-[180px] min-h-[145px] p-5 border rounded-xl flex flex-col justify-between transition-all duration-300 hover:scale-105 relative text-center items-center bg-white shadow-md ${index % 2 === 0 ? 'rotate-2' : '-rotate-1'}`;
                noteHarapan.setAttribute("style", styleMemo);
                
                noteHarapan.innerHTML = `
                    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-6 rounded-full opacity-90 border border-white/50 shadow flex items-center justify-center z-30" style="${styleClip}"></div>
                    <div class="w-full relative z-10 pt-2">
                        <span class="text-[9px] font-bold uppercase tracking-wider opacity-60 block mb-2">${labelWarna}</span>
                        <p class="text-xs font-semibold leading-relaxed italic text-slate-800 px-1 break-words">"${wish.text}"</p>
                    </div>
                    <div class="mt-3 w-full pt-1.5 border-t border-slate-200/40 text-[9px] opacity-50 text-slate-500 font-medium">${wish.date}</div>
                `;
                wishTreeContainer.appendChild(noteHarapan);
            });
        } catch (error) {
            console.error("Error loading wishes:", error);
        }
    }

    loadWishes();
});