// ================================
// DESIGN SYSTEM MANAGER
// Loads and applies design tokens
// ================================

class DesignSystem {
  constructor() {
    this.tokens = null;
    this.isLoaded = false;
  }

  async loadTokens() {
    try {
      const response = await fetch(chrome.runtime.getURL('design-system.json'));
      this.tokens = await response.json();
      this.isLoaded = true;
      this.applyTokens();
    } catch (error) {
      console.warn('CF Enhancer: Could not load design tokens, using defaults');
      this.useDefaults();
    }
  }

  applyTokens() {
    if (!this.tokens) return;

    const root = document.documentElement;
    const { colors, typography, spacing, borderRadius, shadows } = this.tokens.designSystem.theme;

    // Apply color tokens
    Object.entries(colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--cf-bg-${key.replace('bg', 'primary')}`, value);
    });

    Object.entries(colors.accent).forEach(([key, value]) => {
      root.style.setProperty(`--cf-${key}`, value);
    });

    Object.entries(colors.text).forEach(([key, value]) => {
      root.style.setProperty(`--cf-text-${key}`, value);
    });

    // Apply typography tokens
    Object.entries(typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--cf-text-${key}`, value);
    });

    // Apply spacing tokens
    Object.entries(spacing).forEach(([key, value]) => {
      root.style.setProperty(`--cf-space-${key}`, value);
    });

    // Apply border radius tokens
    Object.entries(borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--cf-radius-${key}`, value);
    });

    // Apply shadow tokens
    Object.entries(shadows).forEach(([key, value]) => {
      root.style.setProperty(`--cf-shadow-${key}`, value);
    });
  }

  useDefaults() {
    // Fallback tokens are already in CSS
    this.isLoaded = true;
  }

  getComponent(componentName) {
    if (!this.tokens) return null;
    return this.tokens.designSystem.components[componentName] || null;
  }
}

export default DesignSystem;
