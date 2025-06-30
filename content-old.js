// ============================
// BEAUTIFUL CODEFORCES UI ENHANCER
// Advanced JavaScript Enhancement Script
// ============================

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        enableAnimations: true,
        autoEnhance: true,
        darkModeDefault: false,
        enhancementDelay: 100,
        version: '2.0.0'
    };
    
    // State management
    let isEnhanced = false;
    let isDarkMode = false;
    let themeToggleButton = null;
    let observerInstance = null;
    
    // Utility functions
    const utils = {
        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Check if element exists
        elementExists: function(selector) {
            return document.querySelector(selector) !== null;
        },
        
        // Add class with animation
        addClassWithAnimation: function(element, className) {
            if (element) {
                element.classList.add(className);
                if (CONFIG.enableAnimations) {
                    element.classList.add('cf-animate-in');
                }
            }
        },
        
        // Create element with attributes
        createElement: function(tag, attributes = {}, content = '') {
            const element = document.createElement(tag);
            Object.keys(attributes).forEach(key => {
                if (key === 'className') {
                    element.className = attributes[key];
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            });
            if (content) {
                element.innerHTML = content;
            }
            return element;
        },
        
        // Wait for element to appear
        waitForElement: function(selector, timeout = 5000) {
            return new Promise((resolve, reject) => {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                    return;
                }
                
                const observer = new MutationObserver((mutations) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        observer.disconnect();
                        resolve(element);
                    }
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                
                setTimeout(() => {
                    observer.disconnect();
                    reject(new Error(`Element ${selector} not found within ${timeout}ms`));
                }, timeout);
            });
        }
    };
    
    // Theme management
    const themeManager = {
        init: function() {
            this.loadTheme();
            this.createThemeToggle();
            this.applyTheme();
        },
        
        loadTheme: function() {
            const savedTheme = localStorage.getItem('cf-enhanced-theme');
            const savedEnhanced = localStorage.getItem('cf-enhanced-ui');
            
            isDarkMode = savedTheme === 'dark';
            isEnhanced = savedEnhanced !== 'false'; // Default to true
        },
        
        saveTheme: function() {
            localStorage.setItem('cf-enhanced-theme', isDarkMode ? 'dark' : 'light');
            localStorage.setItem('cf-enhanced-ui', isEnhanced.toString());
        },
        
        toggleTheme: function() {
            isDarkMode = !isDarkMode;
            this.applyTheme();
            this.saveTheme();
            this.updateToggleButton();
        },
        
        toggleEnhancement: function() {
            isEnhanced = !isEnhanced;
            this.applyEnhancement();
            this.saveTheme();
        },
        
        applyTheme: function() {
            if (isDarkMode) {
                document.documentElement.classList.add('cf-dark');
            } else {
                document.documentElement.classList.remove('cf-dark');
            }
        },
        
        applyEnhancement: function() {
            if (isEnhanced) {
                document.documentElement.classList.add('cf-enhanced-ui');
                enhancementManager.enhanceAll();
            } else {
                document.documentElement.classList.remove('cf-enhanced-ui');
            }
        },
        
        createThemeToggle: function() {
            // Remove existing toggle if present
            const existingToggle = document.querySelector('.cf-theme-toggle');
            if (existingToggle) {
                existingToggle.remove();
            }
            
            const toggleContainer = utils.createElement('div', {
                className: 'cf-theme-toggle'
            });
            
            themeToggleButton = utils.createElement('button', {
                className: 'cf-theme-btn',
                title: 'Toggle Dark/Light Mode',
                'aria-label': 'Toggle Theme'
            });
            
            this.updateToggleButton();
            
            themeToggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            toggleContainer.appendChild(themeToggleButton);
            document.body.appendChild(toggleContainer);
        },
        
        updateToggleButton: function() {
            if (themeToggleButton) {
                themeToggleButton.innerHTML = isDarkMode ? '☀️' : '🌙';
                themeToggleButton.title = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            }
        }
    };
    
    // Enhancement management
    const enhancementManager = {
        init: function() {
            this.enhanceAll();
            this.startObserving();
        },
        
        enhanceAll: function() {
            if (!isEnhanced) return;
            
            console.log('🎨 Applying Beautiful Codeforces UI Enhancements...');
            
            // Apply enhancements with delay for smooth loading
            setTimeout(() => {
                this.enhanceHeader();
                this.enhanceTables();
                this.enhanceNavigation();
                this.enhanceForms();
                this.enhanceContent();
                this.enhanceFooter();
                this.addCustomStyles();
                this.fixCodeforcesBugs();
            }, CONFIG.enhancementDelay);
        },
        
        enhanceHeader: function() {
            const header = document.querySelector('#header');
            if (header) {
                utils.addClassWithAnimation(header, 'cf-enhanced-header');
                
                // Enhance logo
                const logo = header.querySelector('a[href="/"]') || header.querySelector('.logo');
                if (logo) {
                    utils.addClassWithAnimation(logo, 'cf-enhanced-logo');
                }
                
                // Enhance navigation links
                const navLinks = header.querySelectorAll('a');
                navLinks.forEach(link => {
                    utils.addClassWithAnimation(link, 'cf-enhanced-nav-link');
                });
            }
        },
        
        enhanceTables: function() {
            const tables = document.querySelectorAll('table');
            tables.forEach(table => {
                if (!table.classList.contains('cf-enhanced-table')) {
                    utils.addClassWithAnimation(table, 'cf-enhanced-table');
                    
                    // Add hover effects to rows
                    const rows = table.querySelectorAll('tbody tr');
                    rows.forEach((row, index) => {
                        row.style.animationDelay = `${index * 50}ms`;
                        utils.addClassWithAnimation(row, 'cf-table-row');
                    });
                    
                    // Enhance problem links
                    const problemLinks = table.querySelectorAll('a[href*="/problem/"]');
                    problemLinks.forEach(link => {
                        utils.addClassWithAnimation(link, 'cf-problem-link');
                    });
                }
            });
        },
        
        enhanceNavigation: function() {
            // Enhance main navigation
            const nav = document.querySelector('#header ul') || document.querySelector('.menu');
            if (nav) {
                utils.addClassWithAnimation(nav, 'cf-enhanced-nav');
            }
            
            // Enhance pagination
            const pagination = document.querySelector('.pagination') || 
                              document.querySelector('[class*="page"]');
            if (pagination) {
                utils.addClassWithAnimation(pagination, 'cf-enhanced-pagination');
            }
        },
        
        enhanceForms: function() {
            // Enhance form inputs
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (!input.classList.contains('cf-enhanced-input')) {
                    utils.addClassWithAnimation(input, 'cf-enhanced-input');
                }
            });
            
            // Enhance buttons
            const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"], .button');
            buttons.forEach(button => {
                if (!button.classList.contains('cf-enhanced-button')) {
                    utils.addClassWithAnimation(button, 'cf-enhanced-button');
                }
            });
        },
        
        enhanceContent: function() {
            // Enhance content containers
            const containers = document.querySelectorAll('.roundbox, .datatable, .sidebar');
            containers.forEach(container => {
                utils.addClassWithAnimation(container, 'cf-enhanced-container');
            });
            
            // Enhance problem statements
            const problemStatement = document.querySelector('.problem-statement');
            if (problemStatement) {
                utils.addClassWithAnimation(problemStatement, 'cf-enhanced-problem');
            }
            
            // Enhance code blocks
            const codeBlocks = document.querySelectorAll('pre, code');
            codeBlocks.forEach(block => {
                utils.addClassWithAnimation(block, 'cf-enhanced-code');
            });
            
            // Enhance tags
            const tags = document.querySelectorAll('.tag, [class*="tag"]');
            tags.forEach(tag => {
                utils.addClassWithAnimation(tag, 'cf-enhanced-tag');
            });
        },
        
        enhanceFooter: function() {
            const footer = document.querySelector('#footer') || document.querySelector('footer');
            if (footer) {
                utils.addClassWithAnimation(footer, 'cf-enhanced-footer');
            }
        },
        
        addCustomStyles: function() {
            // Add custom CSS classes to body
            document.body.classList.add('cf-beautified');
            
            // Add gradient background
            if (!document.querySelector('.cf-bg-gradient')) {
                const bgGradient = utils.createElement('div', {
                    className: 'cf-bg-gradient'
                });
                document.body.insertBefore(bgGradient, document.body.firstChild);
            }
        },
        
        fixCodeforcesBugs: function() {
            // Fix common Codeforces display issues
            const problematicElements = document.querySelectorAll('[style*="display: none"]');
            problematicElements.forEach(element => {
                if (element.textContent.trim() !== '') {
                    element.style.display = '';
                }
            });
            
            // Ensure proper font rendering
            document.body.style.fontFamily = 'var(--font-primary)';
        },
        
        startObserving: function() {
            // Observe DOM changes and enhance new elements
            if (observerInstance) {
                observerInstance.disconnect();
            }
            
            observerInstance = new MutationObserver(utils.debounce((mutations) => {
                let shouldEnhance = false;
                
                mutations.forEach(mutation => {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Check if new elements need enhancement
                                if (node.matches('table, .roundbox, .datatable, button, input, a')) {
                                    shouldEnhance = true;
                                }
                            }
                        });
                    }
                });
                
                if (shouldEnhance && isEnhanced) {
                    this.enhanceAll();
                }
            }, 300));
            
            observerInstance.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    };
    
    // Animation manager
    const animationManager = {
        init: function() {
            if (!CONFIG.enableAnimations) return;
            
            this.addScrollAnimations();
            this.addHoverEffects();
        },
        
        addScrollAnimations: function() {
            const observeElements = document.querySelectorAll('.roundbox, .datatable, table');
            
            const scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('cf-animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            observeElements.forEach(el => scrollObserver.observe(el));
        },
        
        addHoverEffects: function() {
            // Add pulse effect to important elements
            const importantElements = document.querySelectorAll('.cf-theme-btn, .logo');
            importantElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    el.classList.add('cf-pulse');
                });
                
                el.addEventListener('mouseleave', () => {
                    el.classList.remove('cf-pulse');
                });
            });
        }
    };
    
    // Performance manager
    const performanceManager = {
        init: function() {
            this.optimizeImages();
            this.lazyLoadContent();
        },
        
        optimizeImages: function() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        },
        
        lazyLoadContent: function() {
            // Implement lazy loading for heavy content
            const heavyContent = document.querySelectorAll('.datatable, .contest-list');
            
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('cf-loaded');
                        lazyObserver.unobserve(entry.target);
                    }
                });
            });
            
            heavyContent.forEach(el => lazyObserver.observe(el));
        }
    };
    
    // Accessibility manager
    const accessibilityManager = {
        init: function() {
            this.improveKeyboardNavigation();
            this.addAriaLabels();
            this.improveFocus();
        },
        
        improveKeyboardNavigation: function() {
            // Add keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Alt + T to toggle theme
                if (e.altKey && e.key === 't') {
                    e.preventDefault();
                    themeManager.toggleTheme();
                }
                
                // Alt + E to toggle enhancement
                if (e.altKey && e.key === 'e') {
                    e.preventDefault();
                    themeManager.toggleEnhancement();
                }
            });
        },
        
        addAriaLabels: function() {
            // Add proper ARIA labels
            const tables = document.querySelectorAll('table');
            tables.forEach((table, index) => {
                if (!table.hasAttribute('aria-label')) {
                    table.setAttribute('aria-label', `Data table ${index + 1}`);
                }
            });
            
            const links = document.querySelectorAll('a[href*="/problem/"]');
            links.forEach(link => {
                if (!link.hasAttribute('aria-label')) {
                    link.setAttribute('aria-label', `Problem: ${link.textContent}`);
                }
            });
        },
        
        improveFocus: function() {
            // Improve focus indicators
            const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
            focusableElements.forEach(el => {
                el.addEventListener('focus', () => {
                    el.classList.add('cf-focused');
                });
                
                el.addEventListener('blur', () => {
                    el.classList.remove('cf-focused');
                });
            });
        }
    };
    
    // Main initialization
    function initialize() {
        console.log(`🚀 Beautiful Codeforces UI Enhancer v${CONFIG.version} loading...`);
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeEnhancements);
        } else {
            initializeEnhancements();
        }
    }
    
    function initializeEnhancements() {
        try {
            // Initialize all managers
            themeManager.init();
            enhancementManager.init();
            animationManager.init();
            performanceManager.init();
            accessibilityManager.init();
            
            console.log('✨ Beautiful Codeforces UI Enhancer loaded successfully!');
            
            // Show welcome message for first-time users
            if (!localStorage.getItem('cf-enhanced-welcome-shown')) {
                showWelcomeMessage();
                localStorage.setItem('cf-enhanced-welcome-shown', 'true');
            }
            
        } catch (error) {
            console.error('❌ Error initializing Codeforces UI Enhancer:', error);
        }
    }
    
    function showWelcomeMessage() {
        const welcomeBanner = utils.createElement('div', {
            className: 'cf-welcome-banner',
            style: `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #0066ff, #6366f1);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 102, 255, 0.3);
                z-index: 10001;
                font-family: 'Inter', sans-serif;
                font-weight: 500;
                animation: slideInRight 0.5s ease-out;
                max-width: 300px;
                cursor: pointer;
            `
        }, `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">✨</span>
                <div>
                    <div style="font-weight: 600; margin-bottom: 4px;">UI Enhanced!</div>
                    <div style="font-size: 12px; opacity: 0.9;">
                        Press Alt+T to toggle theme<br>
                        Press Alt+E to toggle enhancement
                    </div>
                </div>
            </div>
        `);
        
        // Add animation keyframes
        if (!document.querySelector('#cf-welcome-styles')) {
            const welcomeStyles = utils.createElement('style', {
                id: 'cf-welcome-styles'
            }, `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `);
            document.head.appendChild(welcomeStyles);
        }
        
        welcomeBanner.addEventListener('click', () => {
            welcomeBanner.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => welcomeBanner.remove(), 300);
        });
        
        document.body.appendChild(welcomeBanner);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (welcomeBanner.parentNode) {
                welcomeBanner.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => welcomeBanner.remove(), 300);
            }
        }, 5000);
    }
    
    // Start the enhancement
    initialize();
    
})();
    improveUserProfile();
}

// Modernize the header with Google-like design
function modernizeHeader() {
    const header = document.querySelector('#header');
    if (!header) return;

    // Clear existing header content
    header.innerHTML = '';

    // Add logo
    const logo = document.createElement('a');
    logo.href = '/';
    logo.className = 'logo';
    logo.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 19H22L12 2Z" fill="var(--google-blue)"/>
        </svg>
        <span>Codeforces</span>
    `;
    header.appendChild(logo);

    // Add search box
    const searchBox = createSearchBox();
    header.appendChild(searchBox);

    // Add navigation
    const nav = document.createElement('nav');
    nav.className = 'menu-list';
    nav.innerHTML = `
        <li><a href="/problemset">Problems</a></li>
        <li><a href="/contests">Contests</a></li>
        <li><a href="/gyms">Gym</a></li>
        <li><a href="/groups">Groups</a></li>
    `;
    header.appendChild(nav);
}

// Create Google-like search box
function createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-box';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search problems, contests, or users...';
    
    searchContainer.appendChild(searchInput);
    return searchContainer;
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value;
        if (query.length > 2) {
            searchProblems(query);
        }
    }, 300));
}

// Search problems
async function searchProblems(query) {
    try {
        const response = await fetch(`/api/problemset.problems?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        displaySearchResults(data.result.problems);
    } catch (error) {
        console.error('Search failed:', error);
    }
}

// Display search results
function displaySearchResults(problems) {
    const resultsContainer = document.querySelector('.search-results') || createSearchResults();
    resultsContainer.innerHTML = '';

    problems.forEach(problem => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <a href="/problemset/problem/${problem.contestId}/${problem.index}">
                ${problem.name}
            </a>
            <span class="difficulty" style="background: ${getDifficultyColor(problem.rating)}">
                ${problem.rating}
            </span>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

// Create search results container
function createSearchResults() {
    const container = document.createElement('div');
    container.className = 'search-results';
    document.querySelector('.search-box').appendChild(container);
    return container;
}

// Enhance problem list
function enhanceProblemList() {
    const problemTable = document.querySelector('.problems');
    if (!problemTable) return;

    const rows = problemTable.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            // Add difficulty indicator
            const difficultyCell = cells[3]; // Adjust index based on table structure
            if (difficultyCell) {
                const rating = parseInt(difficultyCell.textContent);
                difficultyCell.innerHTML = `
                    <span class="difficulty" style="background: ${getDifficultyColor(rating)}">
                        ${rating}
                    </span>
                `;
            }

            // Enhance problem title
            const titleCell = cells[1]; // Adjust index based on table structure
            if (titleCell) {
                const link = titleCell.querySelector('a');
                if (link) {
                    link.className = 'problem-title';
                }
            }
        }
    });
}

// Improve code editor
function improveCodeEditor() {
    const editor = document.querySelector('#sourceCodeTextarea');
    if (editor) {
        editor.classList.add('code-editor');
        
        // Add line numbers
        const wrapper = document.createElement('div');
        wrapper.className = 'editor-wrapper';
        editor.parentNode.insertBefore(wrapper, editor);
        wrapper.appendChild(editor);
        
        // Add syntax highlighting (placeholder for CodeMirror integration)
        initializeSyntaxHighlighting(editor);
    }
}

// Add dark mode toggle
function addDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '🌙';
    toggle.onclick = toggleDarkMode;
    document.querySelector('#header').appendChild(toggle);
}

// Toggle dark mode
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Utility functions
function getDifficultyColor(rating) {
    if (rating < 1200) return 'var(--google-green)';
    if (rating < 1400) return 'var(--google-blue)';
    if (rating < 1600) return 'var(--google-yellow)';
    if (rating < 1900) return 'var(--google-yellow)';
    if (rating < 2100) return 'var(--google-red)';
    return 'var(--google-red)';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize dark mode from saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Remove the first observer and replace with this one
const observer = new MutationObserver((mutations) => {
    // Check if mutations are caused by our own changes
    const shouldProcess = mutations.some(mutation => {
        return Array.from(mutation.addedNodes).some(node => {
            return node.nodeType === 1 && !node.classList.contains('cf-enhanced');
        });
    });

    if (shouldProcess) {
        mutations.forEach(mutation => {
            Array.from(mutation.addedNodes)
                .filter(node => node.nodeType === 1 && !node.classList.contains('cf-enhanced'))
                .forEach(node => {
                    enhanceUI();
                    // Mark as enhanced
                    node.classList.add('cf-enhanced');
                });
        });
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// Replace the IIFE with this updated version
(function() {
    // Create and inject our custom styles
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color: #2563eb;
            --primary-dark: #1e40af;
            --surface-color: #f8fafc;
            --text-color: #1f2937;
            --border-color: #e5e7eb;
        }

        /* Basic resets */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            line-height: 1.6 !important;
            color: var(--text-color) !important;
            background: #fff !important;
        }

        /* Header improvements */
        #header {
            background: #fff !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            padding: 1rem !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 1000 !important;
        }

        /* Menu styling */
        .menu-list li {
            font-family: inherit !important;
        }

        .menu-list li a {
            color: var(--text-color) !important;
            text-decoration: none !important;
            padding: 0.5rem 1rem !important;
            border-radius: 4px !important;
            transition: all 0.2s ease !important;
        }

        .menu-list li a:hover {
            background: var(--surface-color) !important;
            color: var(--primary-color) !important;
        }

        /* Problem list improvements */
        .problems {
            background: #fff !important;
            border-radius: 8px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            margin: 1rem auto !important;
            max-width: 1200px !important;
            border: 1px solid var(--border-color) !important;
        }

        .problems tr {
            border-bottom: 1px solid var(--border-color) !important;
        }

        .problems td {
            padding: 1rem !important;
        }

        /* Roundbox modernization */
        .roundbox {
            border: 1px solid var(--border-color) !important;
            border-radius: 8px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            background: #fff !important;
            margin-bottom: 1rem !important;
        }

        .roundbox .caption {
            color: var(--primary-color) !important;
            font-size: 1.25rem !important;
            padding: 1rem !important;
            border-bottom: 1px solid var(--border-color) !important;
        }

        /* Button improvements */
        .submit {
            background: var(--primary-color) !important;
            color: white !important;
            padding: 0.5rem 1rem !important;
            border-radius: 4px !important;
            border: none !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
        }

        .submit:hover {
            background: var(--primary-dark) !important;
            transform: translateY(-1px) !important;
        }

        /* Table improvements */
        .datatable {
            border: 1px solid var(--border-color) !important;
            border-radius: 8px !important;
            overflow: hidden !important;
        }

        .datatable th {
            background: var(--surface-color) !important;
            padding: 1rem !important;
            font-weight: 600 !important;
        }

        .datatable td {
            padding: 1rem !important;
            border-bottom: 1px solid var(--border-color) !important;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
            :root {
                --surface-color: #1e293b;
                --text-color: #f8fafc;
                --border-color: #334155;
            }

            body {
                background: #0f172a !important;
                color: var(--text-color) !important;
            }

            #header {
                background: #0f172a !important;
            }

            .problems, .roundbox, .datatable {
                background: #1e293b !important;
            }
        }
    `;
    
    document.documentElement.appendChild(style);

    // Function to apply modern classes
    function modernizeUI() {
        // Add modern classes to unenhanced elements only
        document.querySelectorAll('.roundbox:not(.cf-enhanced)').forEach(box => {
            box.classList.add('modern-roundbox', 'cf-enhanced');
        });

        document.querySelectorAll('.datatable:not(.cf-enhanced)').forEach(table => {
            table.classList.add('modern-datatable', 'cf-enhanced');
        });

        document.querySelectorAll('.problems:not(.cf-enhanced)').forEach(table => {
            table.classList.add('modern-problems', 'cf-enhanced');
        });

        // Enhance unenhanced buttons
        document.querySelectorAll('input[type="submit"]:not(.cf-enhanced)').forEach(button => {
            button.classList.add('modern-button', 'cf-enhanced');
        });
    }

    // Apply styles when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', modernizeUI);
    } else {
        modernizeUI();
    }

    // Single observer for all changes
    const styleObserver = new MutationObserver((mutations) => {
        const shouldProcess = mutations.some(mutation => {
            return Array.from(mutation.addedNodes).some(node => {
                return node.nodeType === 1 && !node.classList.contains('cf-enhanced');
            });
        });

        if (shouldProcess) {
            modernizeUI();
        }
    });

    styleObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: false
    });
})(); 
