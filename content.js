// ================================
// Codeforces UI Enhancer v3.0
// Minimal, Clean, Modular Design
// ================================

console.log('🚀 CF Enhancer v3.0 Loading...');

class CFEnhancer {
  constructor() {
    this.isEnabled = this.getStoredState();
    this.theme = this.getStoredTheme();
    this.init();
  }

  init() {
    this.createControls();
    this.applyTheme();
    
    if (this.isEnabled) {
      this.enable();
    }
    
    this.bindEvents();
    this.showStatus();
  }

  getStoredState() {
    try {
      return JSON.parse(localStorage.getItem('cf-enhancer-enabled') || 'true');
    } catch {
      return true;
    }
  }

  getStoredTheme() {
    return localStorage.getItem('cf-enhancer-theme') || 'dark';
  }

  saveState() {
    localStorage.setItem('cf-enhancer-enabled', JSON.stringify(this.isEnabled));
    localStorage.setItem('cf-enhancer-theme', this.theme);
  }

  enable() {
    document.documentElement.classList.add('cf-enhanced');
    this.isEnabled = true;
    this.saveState();
    this.updateToggle();
  }

  disable() {
    document.documentElement.classList.remove('cf-enhanced');
    this.isEnabled = false;
    this.saveState();
    this.updateToggle();
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  applyTheme() {
    document.documentElement.setAttribute('data-cf-theme', this.theme);
    this.updateThemeToggle();
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    this.saveState();
  }

  createControls() {
    // Remove existing controls
    document.querySelectorAll('.cf-control').forEach(el => el.remove());

    // Create toggle button
    this.toggleBtn = document.createElement('div');
    this.toggleBtn.className = 'cf-control cf-toggle';
    this.toggleBtn.title = 'Toggle Enhancement (Alt+E)';
    this.updateToggle();

    // Create theme button
    this.themeBtn = document.createElement('div');
    this.themeBtn.className = 'cf-control cf-theme';
    this.themeBtn.title = 'Toggle Theme (Alt+T)';
    this.updateThemeToggle();

    // Add to DOM
    document.body.appendChild(this.toggleBtn);
    document.body.appendChild(this.themeBtn);
  }

  updateToggle() {
    if (this.toggleBtn) {
      this.toggleBtn.textContent = this.isEnabled ? '✨' : '💤';
      this.toggleBtn.classList.toggle('active', this.isEnabled);
    }
  }

  updateThemeToggle() {
    if (this.themeBtn) {
      this.themeBtn.textContent = this.theme === 'dark' ? '☀️' : '🌙';
    }
  }

  showStatus() {
    const status = document.createElement('div');
    status.className = 'cf-status';
    status.textContent = `✨ CF Enhanced ${this.isEnabled ? 'Active' : 'Disabled'}`;
    document.body.appendChild(status);

    setTimeout(() => status.remove(), 3000);
  }

  bindEvents() {
    // Toggle button
    this.toggleBtn?.addEventListener('click', () => this.toggle());
    
    // Theme button
    this.themeBtn?.addEventListener('click', () => this.toggleTheme());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.altKey) {
        if (e.key.toLowerCase() === 'e') {
          e.preventDefault();
          this.toggle();
        } else if (e.key.toLowerCase() === 't') {
          e.preventDefault();
          this.toggleTheme();
        }
      }
    });

    // Listen for popup messages
    chrome.runtime.onMessage?.addListener((request, sender, sendResponse) => {
      switch (request.action) {
        case 'getStatus':
          sendResponse({
            enabled: this.isEnabled,
            theme: this.theme,
            version: '3.0.0'
          });
          break;
        case 'toggle':
          this.toggle();
          sendResponse({ enabled: this.isEnabled });
          break;
        case 'toggleTheme':
          this.toggleTheme();
          sendResponse({ theme: this.theme });
          break;
      }
    });
  }
}

// Initialize
const cfEnhancer = new CFEnhancer();