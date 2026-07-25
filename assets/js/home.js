// --- INTERAKSI HEADER & HOME ---
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("mainHeader");
    
    // Efek Header berubah menjadi pink solid transparan saat halaman digulir
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("bg-pink-500/50", "backdrop-blur-md", "shadow-md");
            header.classList.remove("bg-transparent");
        } else {
            header.classList.remove("bg-pink-500/50", "backdrop-blur-md", "shadow-md");
            header.classList.add("bg-transparent");
        }
    });

    // Toggle Menu Mobile
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
            });
        });

        document.addEventListener("click", (e) => {
            if (!header.contains(e.target)) {
                mobileMenu.classList.add("hidden");
            }
        });
    }
});