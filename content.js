// ============================
// CODEFORCES UI ENHANCER - LEETCODE STYLE
// Clean Toggle System with Proper Controls
// ============================

(function() {
    'use strict';
    
    // State management
    let isEnhanced = false;
    let isDarkMode = false;
    let themeToggleButton = null;
    let enhancementToggleButton = null;
    
    // Utility functions
    const utils = {
        createElement: function(tag, attributes = {}) {
            const element = document.createElement(tag);
            Object.keys(attributes).forEach(key => {
                if (key === 'className') {
                    element.className = attributes[key];
                } else if (key === 'innerHTML') {
                    element.innerHTML = attributes[key];
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            });
            return element;
        }
    };
    
    // Main manager
    const manager = {
        init: function() {
            this.loadSettings();
            this.createControls();
            this.applySettings();
            this.setupKeyboardShortcuts();
            this.setupMessageListener();
            this.updateButtons();
            console.log('🚀 Codeforces UI Enhancer loaded!');
        },
        
        loadSettings: function() {
            const savedTheme = localStorage.getItem('cf-enhanced-theme');
            const savedEnhanced = localStorage.getItem('cf-enhanced-ui');
            
            isDarkMode = savedTheme === 'dark';
            isEnhanced = savedEnhanced === 'true';
        },
        
        saveSettings: function() {
            localStorage.setItem('cf-enhanced-theme', isDarkMode ? 'dark' : 'light');
            localStorage.setItem('cf-enhanced-ui', isEnhanced.toString());
        },
        
        toggleTheme: function() {
            isDarkMode = !isDarkMode;
            this.applyTheme();
            this.saveSettings();
            this.updateButtons();
            console.log('🌙 Theme:', isDarkMode ? 'Dark' : 'Light');
        },
        
        toggleEnhancement: function() {
            isEnhanced = !isEnhanced;
            this.applyEnhancement();
            this.saveSettings();
            this.updateButtons();
            console.log('✨ Enhancement:', isEnhanced ? 'ON' : 'OFF');
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
            } else {
                document.documentElement.classList.remove('cf-enhanced-ui');
            }
        },
        
        applySettings: function() {
            this.applyTheme();
            this.applyEnhancement();
        },
        
        createControls: function() {
            this.createEnhancementToggle();
            this.createThemeToggle();
        },
        
        createEnhancementToggle: function() {
            // Remove existing
            const existing = document.querySelector('.cf-enhancement-toggle');
            if (existing) existing.remove();
            
            const container = utils.createElement('div', {
                className: 'cf-enhancement-toggle'
            });
            
            enhancementToggleButton = utils.createElement('button', {
                className: 'cf-enhancement-btn',
                title: 'Toggle UI Enhancement (Alt+E)',
                'aria-label': 'Toggle Enhancement'
            });
            
            enhancementToggleButton.addEventListener('click', () => {
                this.toggleEnhancement();
            });
            
            container.appendChild(enhancementToggleButton);
            document.body.appendChild(container);
        },
        
        createThemeToggle: function() {
            // Remove existing
            const existing = document.querySelector('.cf-theme-toggle');
            if (existing) existing.remove();
            
            const container = utils.createElement('div', {
                className: 'cf-theme-toggle'
            });
            
            themeToggleButton = utils.createElement('button', {
                className: 'cf-theme-btn',
                title: 'Toggle Dark/Light Mode (Alt+T)',
                'aria-label': 'Toggle Theme'
            });
            
            themeToggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
            
            container.appendChild(themeToggleButton);
            document.body.appendChild(container);
        },
        
        updateButtons: function() {
            if (enhancementToggleButton) {
                enhancementToggleButton.innerHTML = isEnhanced ? '✨' : '💤';
                enhancementToggleButton.title = isEnhanced ? 
                    'Disable UI Enhancement (Alt+E)' : 
                    'Enable UI Enhancement (Alt+E)';
                
                if (isEnhanced) {
                    enhancementToggleButton.classList.remove('disabled');
                } else {
                    enhancementToggleButton.classList.add('disabled');
                }
            }
            
            if (themeToggleButton) {
                themeToggleButton.innerHTML = isDarkMode ? '☀️' : '🌙';
                themeToggleButton.title = isDarkMode ? 
                    'Switch to Light Mode (Alt+T)' : 
                    'Switch to Dark Mode (Alt+T)';
            }
        },
        
        setupKeyboardShortcuts: function() {
            document.addEventListener('keydown', (e) => {
                if (e.altKey) {
                    if (e.key === 't' || e.key === 'T') {
                        e.preventDefault();
                        this.toggleTheme();
                    } else if (e.key === 'e' || e.key === 'E') {
                        e.preventDefault();
                        this.toggleEnhancement();
                    }
                }
            });
        },
        
        setupMessageListener: function() {
            // Listen for messages from popup
            if (typeof chrome !== 'undefined' && chrome.runtime) {
                chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                    if (request.action === 'toggleEnhancement') {
                        this.toggleEnhancement();
                        sendResponse({success: true});
                    } else if (request.action === 'toggleTheme') {
                        this.toggleTheme();
                        sendResponse({success: true});
                    } else if (request.action === 'getState') {
                        sendResponse({
                            isEnhanced: isEnhanced,
                            isDarkMode: isDarkMode
                        });
                    }
                    return true;
                });
            }
        }
    };
    
    // Initialize when ready
    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => manager.init(), 100);
            });
        } else {
            setTimeout(() => manager.init(), 100);
        }
    }
    
    initialize();
    
})();