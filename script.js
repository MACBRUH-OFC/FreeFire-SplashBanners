
// Secure API call using a backend proxy (you need to set this up in Vercel)
const backendApiUrl = "/api/getBanners"; 

// Global object to store preloaded banners
let allBanners = {};
let backgroundLoadComplete = false;

// Function to fetch banners securely
async function fetchBanners(region) {
    if (allBanners[region]) {
        displayBanners(region); // Show cached data instantly
        return;
    }

    try {
        const response = await fetch(backendApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ region })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch banners.");
        }

        const data = await response.json();
        allBanners[region] = data.banners;
        displayBanners(region);
    } catch (error) {
        console.error("Error fetching banners:", error);
    }
}

// Preload banners in the background
async function preloadBanners() {
    const regions = ["NA", "EU", "ASIA", "SA"]; // Example regions
    for (let region of regions) {
        await fetchBanners(region);
    }
    backgroundLoadComplete = true;
}

// Function to display banners
function displayBanners(region) {
    const container = document.getElementById("banner-container");
    container.innerHTML = "";

    if (allBanners[region] && allBanners[region].length > 0) {
        allBanners[region].forEach(banner => {
            let img = document.createElement("img");
            img.src = banner.imageUrl;
            container.appendChild(img);
        });
    } else {
        container.innerHTML = "<p>No banners available for this region.</p>";
    }
}

// Handle region search instantly
document.getElementById("searchButton").addEventListener("click", () => {
    const region = document.getElementById("regionInput").value.trim();
    if (!region) return;

    if (allBanners[region]) {
        displayBanners(region);
    } else {
        fetchBanners(region);
    }
});

// Fake API Response for Inspectors
if (window.location.hostname !== "your-official-domain.com") {
    console.warn("⚠️ This site is secured by MACBRUH FF. Unauthorized copying is not allowed.");
    fetch = function () {
        return new Promise((resolve) => {
            resolve({
                json: () => ({
                    message: "⚠️ Fake API Response: Access Denied. This site is secured."
                })
            });
        });
    };
}

// Start preloading banners
preloadBanners();
