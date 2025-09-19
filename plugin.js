// Material Symbols Plugin for Penpot
// Comprehensive list of popular Material Symbols icons
const MATERIAL_SYMBOLS = [
    // Navigation & Actions
    'home', 'search', 'menu', 'close', 'arrow_back', 'arrow_forward', 'arrow_upward', 'arrow_downward',
    'chevron_left', 'chevron_right', 'expand_more', 'expand_less', 'add', 'remove', 'edit', 'delete',
    'done', 'clear', 'check', 'cancel', 'refresh', 'sync', 'undo', 'redo',
    
    // Communication & Social
    'phone', 'email', 'message', 'chat', 'comment', 'share', 'thumb_up', 'thumb_down',
    'favorite', 'star', 'bookmark', 'notifications', 'campaign', 'send', 'reply', 'forward',
    
    // Media & Content
    'play_arrow', 'pause', 'stop', 'skip_next', 'skip_previous', 'volume_up', 'volume_down', 'volume_off',
    'image', 'photo_camera', 'videocam', 'mic', 'headset', 'music_note', 'movie', 'library_music',
    
    // Files & Documents
    'folder', 'folder_open', 'insert_drive_file', 'description', 'article', 'note', 'assignment',
    'download', 'upload', 'cloud', 'cloud_download', 'cloud_upload', 'attach_file', 'link',
    
    // Shopping & Commerce
    'shopping_cart', 'shopping_bag', 'store', 'payment', 'credit_card', 'local_atm', 'receipt',
    'local_shipping', 'inventory', 'sell', 'monetization_on', 'trending_up', 'trending_down',
    
    // Technology & Devices
    'computer', 'phone_iphone', 'tablet', 'laptop', 'desktop_windows', 'keyboard', 'mouse',
    'headphones', 'speaker', 'tv', 'watch', 'memory', 'storage', 'wifi', 'bluetooth',
    
    // Transportation
    'directions_car', 'directions_bus', 'directions_subway', 'flight', 'train', 'directions_bike',
    'directions_walk', 'local_taxi', 'motorcycle', 'sailing', 'map', 'navigation', 'my_location',
    
    // Places & Travel
    'place', 'hotel', 'restaurant', 'local_cafe', 'local_hospital', 'school', 'work',
    'business', 'apartment', 'house', 'park', 'beach_access', 'terrain', 'explore',
    
    // Time & Calendar
    'schedule', 'today', 'event', 'calendar_month', 'access_time', 'timer', 'alarm',
    'watch_later', 'history', 'update', 'pending', 'hourglass_empty',
    
    // People & Social
    'person', 'people', 'group', 'face', 'account_circle', 'supervisor_account', 'contact_mail',
    'contacts', 'family_restroom', 'child_care', 'elderly', 'accessibility',
    
    // Security & Privacy
    'lock', 'lock_open', 'security', 'visibility', 'visibility_off', 'vpn_key', 'fingerprint',
    'shield', 'verified_user', 'admin_panel_settings', 'privacy_tip',
    
    // Settings & Tools
    'settings', 'tune', 'build', 'construction', 'handyman', 'engineering', 'science',
    'biotech', 'psychology', 'auto_fix_high', 'colorize', 'palette', 'brush',
    
    // Health & Fitness
    'fitness_center', 'sports', 'pool', 'spa', 'self_improvement', 'sports_gymnastics',
    'directions_run', 'sports_soccer', 'sports_basketball', 'sports_tennis',
    
    // Weather & Nature
    'wb_sunny', 'wb_cloudy', 'cloud', 'umbrella', 'ac_unit', 'whatshot', 'eco',
    'local_florist', 'grass', 'forest', 'water_drop', 'waves', 'thunderstorm',
    
    // Business & Finance
    'business_center', 'work', 'trending_up', 'analytics', 'bar_chart', 'pie_chart',
    'show_chart', 'account_balance', 'savings', 'request_quote', 'calculate',
    
    // Education & Learning
    'school', 'menu_book', 'library_books', 'quiz', 'psychology', 'science', 'functions',
    'calculate', 'translate', 'language', 'public', 'history_edu',
    
    // Gaming & Entertainment
    'sports_esports', 'casino', 'games', 'celebration', 'party_mode', 'cake', 'gift',
    'balloon', 'confetti', 'festival', 'nightlife', 'local_bar',
    
    // Miscellaneous
    'lightbulb', 'flash_on', 'battery_full', 'signal_wifi_4_bar', 'network_cell',
    'qr_code', 'barcode', 'print', 'scanner', 'crop', 'rotate_right', 'flip'
];

class MaterialSymbolsPlugin {
    constructor() {
        this.selectedIcon = null;
        this.currentStyle = 'outlined';
        this.currentOptions = {
            fill: 0,
            weight: 400,
            size: 24,
            grade: 0,
            opticalSize: 24
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderIcons();
        this.setupPenpotAPI();
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.filterIcons(e.target.value);
        });
        
        // Style selector
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentStyle = e.target.dataset.style;
                this.renderIcons();
            });
        });
        
        // Options controls
        const fillSlider = document.getElementById('fillSlider');
        const weightSelect = document.getElementById('weightSelect');
        const sizeInput = document.getElementById('sizeInput');
        
        fillSlider.addEventListener('input', (e) => {
            this.currentOptions.fill = parseFloat(e.target.value);
            this.updateIconStyles();
        });
        
        weightSelect.addEventListener('change', (e) => {
            this.currentOptions.weight = parseInt(e.target.value);
            this.updateIconStyles();
        });
        
        sizeInput.addEventListener('input', (e) => {
            this.currentOptions.size = parseInt(e.target.value);
            this.currentOptions.opticalSize = parseInt(e.target.value);
            this.updateIconStyles();
        });
        
        // Add button
        const addButton = document.getElementById('addButton');
        addButton.addEventListener('click', () => {
            if (this.selectedIcon) {
                this.addIconToPenpot(this.selectedIcon);
            }
        });
    }
    
    setupPenpotAPI() {
        // Initialize Penpot plugin API when available
        if (typeof penpot !== 'undefined') {
            console.log('Penpot API available');
            
            // Listen for messages from Penpot
            penpot.ui.onMessage((message) => {
                console.log('Received message:', message);
            });
            
        } else {
            console.log('Running in standalone mode (no Penpot API)');
        }
    }
    
    renderIcons() {
        const iconsGrid = document.getElementById('iconsGrid');
        iconsGrid.innerHTML = '';
        
        MATERIAL_SYMBOLS.forEach(iconName => {
            const iconItem = this.createIconElement(iconName);
            iconsGrid.appendChild(iconItem);
        });
        
        this.updateIconStyles();
    }
    
    createIconElement(iconName) {
        const iconItem = document.createElement('div');
        iconItem.className = 'icon-item';
        iconItem.dataset.iconName = iconName;
        
        const iconSpan = document.createElement('span');
        iconSpan.className = `material-symbols material-symbols-${this.currentStyle}`;
        iconSpan.textContent = iconName;
        
        const iconNameSpan = document.createElement('span');
        iconNameSpan.className = 'icon-name';
        iconNameSpan.textContent = iconName.replace(/_/g, ' ');
        
        iconItem.appendChild(iconSpan);
        iconItem.appendChild(iconNameSpan);
        
        iconItem.addEventListener('click', () => {
            this.selectIcon(iconItem, iconName);
        });
        
        return iconItem;
    }
    
    selectIcon(iconElement, iconName) {
        // Remove previous selection
        document.querySelectorAll('.icon-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Select current icon
        iconElement.classList.add('selected');
        this.selectedIcon = iconName;
        
        // Show add button
        const addButton = document.getElementById('addButton');
        addButton.classList.add('visible');
    }
    
    updateIconStyles() {
        const icons = document.querySelectorAll('.material-symbols');
        icons.forEach(icon => {
            icon.style.setProperty('--fill', this.currentOptions.fill);
            icon.style.setProperty('--weight', this.currentOptions.weight);
            icon.style.setProperty('--grade', this.currentOptions.grade);
            icon.style.setProperty('--optical-size', this.currentOptions.opticalSize);
            icon.style.fontSize = `${this.currentOptions.size}px`;
        });
    }
    
    filterIcons(searchTerm) {
        const iconItems = document.querySelectorAll('.icon-item');
        const lowerSearchTerm = searchTerm.toLowerCase();
        let visibleCount = 0;
        
        iconItems.forEach(item => {
            const iconName = item.dataset.iconName;
            const isVisible = iconName.toLowerCase().includes(lowerSearchTerm);
            item.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount++;
        });
        
        // Show no results message if needed
        const iconsGrid = document.getElementById('iconsGrid');
        let noResultsMsg = iconsGrid.querySelector('.no-results');
        
        if (visibleCount === 0 && searchTerm.trim() !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.textContent = 'No icons found. Try a different search term.';
                iconsGrid.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    addIconToPenpot(iconName) {
        if (typeof penpot === 'undefined') {
            console.warn('Penpot API not available - running in standalone mode');
            alert(`Would add icon: ${iconName} (${this.currentStyle} style)`);
            return;
        }
        
        try {
            console.log(`Adding icon: ${iconName} with style: ${this.currentStyle}`);
            
            // Send message to Penpot parent window
            if (penpot.ui && penpot.ui.sendMessage) {
                penpot.ui.sendMessage({
                    type: 'create-text',
                    content: iconName,
                    fontFamily: `Material Symbols ${this.currentStyle.charAt(0).toUpperCase() + this.currentStyle.slice(1)}`,
                    fontSize: this.currentOptions.size,
                    fontWeight: this.currentOptions.weight,
                    style: this.currentStyle,
                    options: this.currentOptions
                });
            }
            
            console.log(`Successfully requested icon creation: ${iconName}`);
            
        } catch (error) {
            console.error('Error adding icon to Penpot:', error);
            alert(`Error adding icon: ${error.message}`);
        }
    }
}

// Initialize plugin when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MaterialSymbolsPlugin();
});

// Handle messages from Penpot if needed
if (typeof penpot !== 'undefined') {
    penpot.ui.onMessage((message) => {
        if (message.type === 'plugin-ready') {
            console.log('Material Symbols plugin ready');
        }
    });
}
