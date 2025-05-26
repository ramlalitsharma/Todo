class AdManager {
    constructor() {
        this.adSlots = {
            top: 'top-ad-slot',
            bottom: 'bottom-ad-slot',
            sidebar: 'sidebar-ad-slot'
        };
        
        this.initialized = false;
        this.isContentLoaded = false;
        
        // Initialize after content loads
        document.addEventListener('DOMContentLoaded', () => {
            this.isContentLoaded = true;
            this.initializeAds();
        });
    }

    initializeAds() {
        if (!this.isContentLoaded || this.initialized) return;
        
        // Wait for main content to load before showing ads
        if (document.querySelector('.task-list')) {
            this.loadAds();
            this.initialized = true;
        } else {
            setTimeout(() => this.initializeAds(), 1000);
        }
    }

    loadAds() {
        // Ensure content exists before loading ads
        const taskList = document.querySelector('.task-list');
        if (!taskList || taskList.children.length === 0) {
            console.log('No content available. Delaying ad load.');
            return;
        }

        // Initialize AdSense ads
        (adsbygoogle = window.adsbygoogle || []).push({});
        
        // Add event listeners for visibility
        this.monitorAdVisibility();
    }

    monitorAdVisibility() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Refresh ad when it becomes visible
                    this.refreshAd(entry.target.id);
                }
            });
        }, options);

        // Observe ad containers
        Object.values(this.adSlots).forEach(slotId => {
            const element = document.getElementById(slotId);
            if (element) {
                observer.observe(element);
            }
        });
    }

    refreshAd(slotId) {
        // Implement ad refresh logic if needed
        console.log(`Refreshing ad slot: ${slotId}`);
    }
}

// Initialize ad manager
const adManager = new AdManager();
