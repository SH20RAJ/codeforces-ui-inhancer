// ================================
// THEME MANAGER
// Handles light/dark theme switching
// ================================

class ThemeManager {
  constructor() {
    this.currentTheme = this.getSavedTheme() || 'dark';
    this.themeToggle = null;
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeToggle();
    this.bindEvents();
  }

  getSavedTheme() {
    return localStorage.getItem('cf-theme') || 'dark';
  }

  saveTheme(theme) {
    localStorage.setItem('cf-theme', theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-cf-theme', theme);
    this.currentTheme = theme;
    this.saveTheme(theme);
    this.updateToggleIcon();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cf-theme-changed', {
      detail: { theme: newTheme }
    }));
  }

  createThemeToggle() {
    // Remove existing toggle
    const existing = document.querySelector('.cf-theme-toggle');
    if (existing) existing.remove();

    // Create new toggle
    this.themeToggle = document.createElement('div');
    this.themeToggle.className = 'cf-theme-toggle';
    this.themeToggle.title = 'Toggle theme (Alt+T)';
    this.updateToggleIcon();

    document.body.appendChild(this.themeToggle);
  }

  updateToggleIcon() {
    if (this.themeToggle) {
      this.themeToggle.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
    }
  }

  bindEvents() {
    // Click event
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Keyboard shortcut (Alt+T)
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}

export default ThemeManager;
