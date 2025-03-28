
// Secure API URL (calls the serverless function instead of exposing real API)
const baseApiUrl = "/api/getBanners?region=";

// Function to fetch banners securely
async function fetchBanners(region) {
    try {
        const response = await fetch(baseApiUrl + encodeURIComponent(region));
        const data = await response.json();

        if (data.error) {
            console.warn("Error fetching banners:", data.error);
        } else {
            console.log("Banners:", data);
            displayBanners(data);
        }
    } catch (error) {
        console.error("Failed to fetch banners:", error);
    }
}

// Fake response for unauthorized copies
if (window.location.hostname !== "yourwebsite.com") {
    console.warn("This is secured by MACBRUH FF. Unauthorized access detected.");
    
    fetch = function() {
        return new Promise((resolve) => resolve({ json: () => Promise.resolve({ error: "Unauthorized access" }) }));
    };
}

// Function to display banners (assuming there's an existing function for this)
function displayBanners(data) {
    const bannerContainer = document.getElementById("banner-container");
    bannerContainer.innerHTML = "";

    data.forEach((banner) => {
        const img = document.createElement("img");
        img.src = banner.imageUrl;
        img.alt = banner.title;
        bannerContainer.appendChild(img);
    });
}

// Example usage
document.getElementById("load-banners").addEventListener("click", () => {
    const selectedRegion = document.getElementById("region-select").value;
    fetchBanners(selectedRegion);
});
