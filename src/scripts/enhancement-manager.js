// ================================
// ENHANCEMENT MANAGER
// Controls the enhancement state
// ================================

class EnhancementManager {
  constructor() {
    this.isEnabled = this.getSavedState();
    this.toggleButton = null;
    this.statusIndicator = null;
    this.init();
  }

  init() {
    this.createToggleButton();
    this.createStatusIndicator();
    this.bindEvents();
    
    if (this.isEnabled) {
      this.enable();
    }
  }

  getSavedState() {
    const saved = localStorage.getItem('cf-enhancement-enabled');
    return saved !== null ? JSON.parse(saved) : true; // Default to enabled
  }

  saveState(enabled) {
    localStorage.setItem('cf-enhancement-enabled', JSON.stringify(enabled));
  }

  enable() {
    document.documentElement.classList.add('cf-enhanced');
    this.isEnabled = true;
    this.saveState(true);
    this.updateToggleButton();
    this.showStatusIndicator('✨ CF Enhanced Active');
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cf-enhancement-enabled'));
  }

  disable() {
    document.documentElement.classList.remove('cf-enhanced');
    this.isEnabled = false;
    this.saveState(false);
    this.updateToggleButton();
    this.showStatusIndicator('🚫 CF Enhancement Disabled');
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cf-enhancement-disabled'));
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }

  createToggleButton() {
    // Remove existing button
    const existing = document.querySelector('.cf-toggle-btn');
    if (existing) existing.remove();

    // Create new button
    this.toggleButton = document.createElement('div');
    this.toggleButton.className = 'cf-toggle-btn';
    this.toggleButton.title = 'Toggle CF Enhancement (Alt+E)';
    this.updateToggleButton();

    document.body.appendChild(this.toggleButton);
  }

  updateToggleButton() {
    if (this.toggleButton) {
      this.toggleButton.textContent = this.isEnabled ? '✨' : '💤';
      this.toggleButton.classList.toggle('active', this.isEnabled);
    }
  }

  createStatusIndicator() {
    // Remove existing indicator
    const existing = document.querySelector('.cf-status-indicator');
    if (existing) existing.remove();

    // Create new indicator
    this.statusIndicator = document.createElement('div');
    this.statusIndicator.className = 'cf-status-indicator cf-hidden';
    
    document.body.appendChild(this.statusIndicator);
  }

  showStatusIndicator(message, duration = 3000) {
    if (this.statusIndicator) {
      this.statusIndicator.textContent = message;
      this.statusIndicator.classList.remove('cf-hidden');
      this.statusIndicator.classList.add('cf-visible');

      // Auto-hide
      setTimeout(() => {
        if (this.statusIndicator) {
          this.statusIndicator.classList.add('cf-hidden');
          this.statusIndicator.classList.remove('cf-visible');
        }
      }, duration);
    }
  }

  bindEvents() {
    // Click event for toggle button
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => {
        this.toggle();
      });
    }

    // Click event for status indicator (to hide)
    if (this.statusIndicator) {
      this.statusIndicator.addEventListener('click', () => {
        this.statusIndicator.classList.add('cf-hidden');
        this.statusIndicator.classList.remove('cf-visible');
      });
    }

    // Keyboard shortcut (Alt+E)
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  isEnhancementEnabled() {
    return this.isEnabled;
  }
}

export default EnhancementManager;
