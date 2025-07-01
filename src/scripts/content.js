// ================================
// MAIN CONTENT SCRIPT
// Modular initialization and management
// ================================

import DesignSystem from './design-system.js';
import ThemeManager from './theme-manager.js';
import EnhancementManager from './enhancement-manager.js';
import DOMEnhancer from './dom-enhancer.js';

class CodeforceEnhancer {
  constructor() {
    this.designSystem = null;
    this.themeManager = null;
    this.enhancementManager = null;
    this.domEnhancer = null;
    this.isInitialized = false;
    
    this.init();
  }

  async init() {
    console.log('🚀 Codeforces UI Enhancer - Modular Edition Starting...');
    
    try {
      // Initialize design system
      this.designSystem = new DesignSystem();
      await this.designSystem.loadTokens();
      
      // Initialize theme manager
      this.themeManager = new ThemeManager();
      
      // Initialize enhancement manager
      this.enhancementManager = new EnhancementManager();
      
      // Initialize DOM enhancer
      this.domEnhancer = new DOMEnhancer();
      
      // Bind events
      this.bindEvents();
      
      this.isInitialized = true;
      console.log('✅ Codeforces UI Enhancer initialized successfully');
      
      // Send initialization message to popup
      this.sendMessageToPopup('initialized', {
        theme: this.themeManager.getCurrentTheme(),
        enhanced: this.enhancementManager.isEnhancementEnabled()
      });
      
    } catch (error) {
      console.error('❌ Error initializing Codeforces UI Enhancer:', error);
    }
  }

  bindEvents() {
    // Listen for theme changes
    window.addEventListener('cf-theme-changed', (e) => {
      console.log('🎨 Theme changed to:', e.detail.theme);
      
      // Re-enhance DOM elements after theme change
      setTimeout(() => {
        if (this.domEnhancer && this.enhancementManager.isEnhancementEnabled()) {
          this.domEnhancer.reEnhance();
        }
      }, 100);
    });

    // Listen for enhancement state changes
    window.addEventListener('cf-enhancement-enabled', () => {
      console.log('✨ Enhancement enabled');
      if (this.domEnhancer) {
        this.domEnhancer.reEnhance();
      }
    });

    window.addEventListener('cf-enhancement-disabled', () => {
      console.log('💤 Enhancement disabled');
    });

    // Listen for page navigation (for SPAs)
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        console.log('🔄 Navigation detected, re-enhancing...');
        
        // Re-enhance after navigation
        setTimeout(() => {
          if (this.domEnhancer && this.enhancementManager.isEnhancementEnabled()) {
            this.domEnhancer.reEnhance();
          }
        }, 500);
      }
    }).observe(document, { subtree: true, childList: true });

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep channel open for async response
    });
  }

  handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'getStatus':
        sendResponse({
          initialized: this.isInitialized,
          theme: this.themeManager?.getCurrentTheme() || 'dark',
          enhanced: this.enhancementManager?.isEnhancementEnabled() || false,
          version: '3.0.0'
        });
        break;

      case 'toggleTheme':
        if (this.themeManager) {
          this.themeManager.toggleTheme();
          sendResponse({ success: true, theme: this.themeManager.getCurrentTheme() });
        } else {
          sendResponse({ success: false, error: 'Theme manager not initialized' });
        }
        break;

      case 'toggleEnhancement':
        if (this.enhancementManager) {
          this.enhancementManager.toggle();
          sendResponse({ success: true, enhanced: this.enhancementManager.isEnhancementEnabled() });
        } else {
          sendResponse({ success: false, error: 'Enhancement manager not initialized' });
        }
        break;

      case 'setTheme':
        if (this.themeManager && request.theme) {
          this.themeManager.applyTheme(request.theme);
          sendResponse({ success: true, theme: request.theme });
        } else {
          sendResponse({ success: false, error: 'Invalid theme or theme manager not initialized' });
        }
        break;

      default:
        sendResponse({ success: false, error: 'Unknown action' });
    }
  }

  sendMessageToPopup(action, data) {
    try {
      chrome.runtime.sendMessage({
        action,
        data,
        timestamp: Date.now()
      });
    } catch (error) {
      // Popup might not be open, which is fine
      console.debug('Could not send message to popup:', error.message);
    }
  }

  // Public API methods
  getStatus() {
    return {
      initialized: this.isInitialized,
      theme: this.themeManager?.getCurrentTheme(),
      enhanced: this.enhancementManager?.isEnhancementEnabled(),
      version: '3.0.0'
    };
  }

  toggleTheme() {
    if (this.themeManager) {
      this.themeManager.toggleTheme();
    }
  }

  toggleEnhancement() {
    if (this.enhancementManager) {
      this.enhancementManager.toggle();
    }
  }

  destroy() {
    if (this.domEnhancer) {
      this.domEnhancer.destroy();
    }
  }
}

// Initialize when DOM is ready
function initializeEnhancer() {
  // Make sure we're on a Codeforces page
  if (!window.location.hostname.includes('codeforces.com')) {
    return;
  }

  window.cfEnhancer = new CodeforceEnhancer();
}

// Initialize based on document state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEnhancer);
} else {
  initializeEnhancer();
}

// Handle extension updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extensionUpdated') {
    console.log('🔄 Extension updated, reinitializing...');
    if (window.cfEnhancer) {
      window.cfEnhancer.destroy();
    }
    setTimeout(initializeEnhancer, 1000);
  }
});
