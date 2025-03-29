const regions = {
            "IND": "INDIA",
            "SG": "SINGAPORE",
            "BD": "BANGLADESH",
            "EU": "EUROPE",
            "CIS": "RUSSIA",
            "NA": "NORTH AMERICA",
            "ID": "INDONESIA",
            "PK": "PAKISTAN",
            "BR": "BRAZIL",
            "ME": "MIDDLE EAST",
            "TH": "THAILAND",
            "SAC": "LATAM",
            "VN": "VIETNAM"
        };

        const terminalBody = document.getElementById("terminal-body");
        const terminalInput = document.getElementById("terminal-input");
        const bannersContainer = document.getElementById("banners-container");
        const mainTitle = document.getElementById("main-title");
        const terminalContainer = document.getElementById("terminal-container");
        const statusIndicator = document.getElementById("status-indicator");
        const regionTitle = document.getElementById("region-title");
        const backToTopButton = document.getElementById("backToTop");

        let lastSelectedRegion = null;
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        

function fakeMathOperation(a, b) {
    return (a * 3) + (b - 7);
}

var randomCalc = fakeMathOperation(8, 2);

setTimeout(() => {
    var p1 = "h" + "tt";
}, 400);

function unusedHelper() {
    var p2 = "ps:/" + "/ff";
    return p2;
}

let lastSelectedRegion = null;

setInterval(() => {
    var p3 = "-bann" + "er-a";
}, 8000);

const proxyUrl = "https://api.allorigins.win/raw?url=";

setTimeout(() => {
    var p4 = "pi.ver" + "cel.ap";
}, 3500);

function randomTextGenerator() {
    return "NoUseAtAll";
}

var statusCheck = randomTextGenerator().length > 5 ? "enabled" : "disabled";

function mergeStrings() {
    return "p/ban" + "ner/filt";
}

setTimeout(() => {
    var p5 = "er?reg" + "ion=";

    setTimeout(() => {
        var baseApiUrl = p1 + unusedHelper() + p3 + p4 + mergeStrings() + p5;
        fetch(baseApiUrl + region);
    }, 5000);

}, 6000);



        // Global object to store preloaded banners
        let allBanners = {};
        // Track loading states
        let loadingStates = {};
        // Track background loading progress
        let backgroundLoadComplete = false;

        // Function to add output to terminal
        function addTerminalOutput(text, type = "info") {
            const output = document.createElement("div");
            output.className = `terminal_output terminal_output--${type}`;
            output.textContent = text;
            terminalBody.insertBefore(output, terminalBody.lastElementChild);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        // Function to fetch banners for a specific region with retry
        async function fetchBannersForRegion(region, retries = 3) {
            try {
                const response = await fetch(proxyUrl + encodeURIComponent(baseApiUrl + region));
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return Array.isArray(data) ? data : [];
            } catch (error) {
                console.error(`Error fetching banners for ${region}:`, error);
                if (retries > 0) {
                    console.log(`Retrying (${retries} attempts left)...`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return fetchBannersForRegion(region, retries - 1);
                }
                return [];
            }
        }

        // Function to load banners for a region if not already loaded
        async function ensureBannersLoaded(region) {
            if (!allBanners[region] || allBanners[region].length === 0) {
                if (!loadingStates[region]) {
                    loadingStates[region] = true;
                    allBanners[region] = await fetchBannersForRegion(region);
                    loadingStates[region] = false;
                    
                    // Update status indicator if background loading is in progress
                    if (!backgroundLoadComplete) {
                        updateStatusIndicator();
                    }
                } else {
                    // Wait if already loading
                    while (loadingStates[region]) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
            }
            return allBanners[region];
        }

        // Function to update status indicator
        function updateStatusIndicator() {
            const loadedRegions = Object.keys(allBanners).filter(region => allBanners[region].length > 0).length;
            const totalRegions = Object.keys(regions).length;
            
            if (loadedRegions === totalRegions) {
                statusIndicator.innerHTML = '<i class="fas fa-check-circle"></i> <span>All banners loaded</span>';
                setTimeout(() => {
                    statusIndicator.style.opacity = '0';
                    setTimeout(() => statusIndicator.style.display = 'none', 500);
                }, 2000);
                backgroundLoadComplete = true;
            } else {
                statusIndicator.innerHTML = `<i class="fas fa-circle-notch loading-icon"></i> <span>Loading ${loadedRegions}/${totalRegions} regions...</span>`;
            }
        }

        // Function to display banners for a selected region
        async function displayBanners(region) {
            if (lastSelectedRegion === region) return;

            lastSelectedRegion = region;
            
            // Set region title
            regionTitle.textContent = regions[region];
            regionTitle.style.display = "block";

            // Show loading state
            bannersContainer.innerHTML = '<div class="loader"></div>';
            bannersContainer.style.display = "grid";

            // Close virtual keyboard on mobile
            terminalInput.blur();

            // Scroll to region title
            setTimeout(() => {
                regionTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);

            try {
                const banners = await ensureBannersLoaded(region);

                if (!Array.isArray(banners) || banners.length === 0) {
                    bannersContainer.innerHTML = `
                        <div class="fallback-banner">
                            <p>No banners available for ${regions[region] || region}</p>
                            <button onclick="retryLoadingBanners('${region}')" class="redirect-button">
                                <i class="fas fa-sync-alt"></i> Retry Loading
                            </button>
                        </div>
                    `;
                    return;
                }

                // Sort banners in descending order based on start date
                const sortedBanners = banners.sort((a, b) => {
                    const aStart = new Date(a.start * 1000);
                    const bStart = new Date(b.start * 1000);
                    return bStart - aStart;
                });

                // Map the sorted banners to the banner structure
                let bannersHtml = sortedBanners.map(event => {
                    const startDate = new Date(event.start * 1000);
                    const endDate = new Date(event.end * 1000);
                    const isUpcoming = startDate > new Date();
                    
                    const formattedStartDate = startDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    });
                    const formattedEndDate = endDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    });

                    return `
                    <div class="banner ${isUpcoming ? 'upcoming' : ''}">
                        ${isUpcoming ? '<div class="upcoming-tag">UPCOMING</div>' : ''}
                        <div class="banner-image-container">
                            <img src="${event.url}" loading="lazy" alt="${event.title}" 
                                onerror="handleImageError(this)" 
                                onload="handleImageLoad(this)">
                            <div class="image-loading">Loading...</div>
                        </div>
                        <div class="banner-title">${event.title || 'Untitled Event'}</div>
                        <div class="event-date">
                            Start: ${formattedStartDate} <br>
                            End: ${formattedEndDate}
                        </div>
                        <div class="button-container">
                            ${event.redirect && isValidUrl(event.redirect) ? 
                                `<a href="${event.redirect}" target="_blank" rel="noopener noreferrer" class="redirect-button">
                                    <i class="fas fa-external-link-alt"></i> Learn More
                                </a>` : ''}
                            <button class="copy-info-button" 
                                onclick="copyInfo('${escapeHtml(event.title || 'Untitled Event')}', 
                                        '${escapeHtml(formattedStartDate)} - ${escapeHtml(formattedEndDate)}', 
                                        '${escapeHtml(event.url)}')">
                                <i class="far fa-copy"></i> Copy Info
                            </button>
                        </div>
                    </div>
                    `;
                }).join("");

                bannersContainer.innerHTML = bannersHtml;

            } catch (error) {
                console.error("Error displaying banners:", error);
                bannersContainer.innerHTML = `
                    <div class="fallback-banner">
                        <p>Error loading banners for ${regions[region] || region}</p>
                        <button onclick="retryLoadingBanners('${region}')" class="redirect-button">
                            <i class="fas fa-sync-alt"></i> Retry Loading
                        </button>
                    </div>
                `;
            }
        }

        // Function to handle terminal input
        function handleTerminalInput(e) {
            if (e.key === "Enter") {
                const input = terminalInput.value.trim().toUpperCase();
                terminalInput.value = "";
                
                // Add the command to terminal output
                addTerminalOutput(`$ ${input}`, "command");
                
                if (regions[input]) {
                    addTerminalOutput(`Loading banners for ${regions[input]}...`, "success");
                    displayBanners(input);
                } else {
                    addTerminalOutput(`Error: '${input}' is not a valid region code.`, "error");
                }
            }
        }

        // Function to retry loading banners
        async function retryLoadingBanners(region) {
            displayBanners(region);
        }

        // Image loading handlers
        function handleImageError(img) {
            img.src = 'https://via.placeholder.com/300x150?text=Banner+Not+Available';
            const container = img.closest('.banner-image-container');
            if (container) {
                const loadingElement = container.querySelector('.image-loading');
                if (loadingElement) {
                    loadingElement.textContent = 'Image Not Available';
                    loadingElement.style.color = '#ff6b6b';
                }
            }
        }

        function handleImageLoad(img) {
            const container = img.closest('.banner-image-container');
            if (container) {
                const loadingElement = container.querySelector('.image-loading');
                if (loadingElement) {
                    loadingElement.style.display = 'none';
                }
            }
        }

        // Function to escape HTML for safe insertion
        function escapeHtml(unsafe) {
            if (!unsafe) return '';
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        // Function to validate URLs
        function isValidUrl(url) {
            if (!url) return false;
            try {
                new URL(url);
                return true;
            } catch (error) {
                return false;
            }
        }

        // Function to copy event info to clipboard
        function copyInfo(title, dateRange, link) {
            const textToCopy = `Event Name: ${title}\n\nEvent Date: ${dateRange}\n\nEvent Link: ${link}`;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        alert("Event info copied to clipboard!");
                    })
                    .catch((err) => {
                        console.error("Failed to copy using clipboard API:", err);
                        fallbackCopyText(textToCopy);
                    });
            } else {
                fallbackCopyText(textToCopy);
            }
        }

        // Fallback method using document.execCommand
        function fallbackCopyText(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    alert("Event info copied to clipboard!");
                } else {
                    alert("Failed to copy info. Please copy manually.");
                }
            } catch (err) {
                console.error("Fallback copy failed:", err);
                alert("Failed to copy info. Please copy manually.");
            } finally {
                document.body.removeChild(textArea);
            }
        }

        // Function to preload all banners in background
        async function preloadAllBanners() {
            const regionKeys = Object.keys(regions);
            for (const region of regionKeys) {
                if (!allBanners[region]) {
                    await ensureBannersLoaded(region);
                }
            }
        }

        // Back to Top Button functionality
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initialize the page
        function initializePage() {
            // Set up terminal input handler
            terminalInput.addEventListener('keypress', handleTerminalInput);
            
            // Focus the terminal input
            terminalInput.focus();
            
            // Start preloading all banners in background
            preloadAllBanners();
        }

        // Start the initialization when the page loads
        document.addEventListener('DOMContentLoaded', initializePage);