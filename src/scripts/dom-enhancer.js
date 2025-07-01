// ================================
// DOM ENHANCER
// Enhances DOM elements without breaking structure
// ================================

class DOMEnhancer {
  constructor() {
    this.observer = null;
    this.enhancedElements = new WeakSet();
    this.init();
  }

  init() {
    this.enhanceExistingElements();
    this.setupMutationObserver();
  }

  enhanceExistingElements() {
    // Only enhance if enhancement is enabled
    if (!document.documentElement.classList.contains('cf-enhanced')) {
      return;
    }

    // Enhance navigation elements
    this.enhanceNavigation();
    
    // Enhance tables
    this.enhanceTables();
    
    // Enhance forms
    this.enhanceForms();
    
    // Enhance links
    this.enhanceLinks();
    
    // Enhance breadcrumbs
    this.enhanceBreadcrumbs();
  }

  enhanceNavigation() {
    const header = document.querySelector('#header');
    if (header && !this.enhancedElements.has(header)) {
      // Add data attributes for styling hooks
      header.setAttribute('data-cf-component', 'navbar');
      
      // Enhance logo
      const logo = header.querySelector('.logo, a[href="/"], a[href="https://codeforces.com/"]');
      if (logo) {
        logo.setAttribute('data-cf-component', 'logo');
      }

      // Enhance menu items
      const menuItems = header.querySelectorAll('.second-level-menu a, ul.menu a, nav a');
      menuItems.forEach(item => {
        item.setAttribute('data-cf-component', 'nav-item');
        
        // Add active state for current page
        if (item.href === window.location.href) {
          item.classList.add('current');
        }
      });

      // Enhance search
      const searchBox = header.querySelector('.searchbox, input[type="text"]');
      if (searchBox) {
        searchBox.setAttribute('data-cf-component', 'search');
        searchBox.setAttribute('placeholder', 'Search problems, contests, users...');
      }

      this.enhancedElements.add(header);
    }
  }

  enhanceTables() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      if (!this.enhancedElements.has(table)) {
        table.setAttribute('data-cf-component', 'table');
        
        // Add hover effects to rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          row.setAttribute('data-cf-component', 'table-row');
        });

        // Enhance headers
        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
          header.setAttribute('data-cf-component', 'table-header');
        });

        this.enhancedElements.add(table);
      }
    });
  }

  enhanceForms() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (!this.enhancedElements.has(input)) {
        input.setAttribute('data-cf-component', 'form-input');
        this.enhancedElements.add(input);
      }
    });

    const buttons = document.querySelectorAll('button, input[type="submit"], .button');
    buttons.forEach(button => {
      if (!this.enhancedElements.has(button)) {
        button.setAttribute('data-cf-component', 'button');
        this.enhancedElements.add(button);
      }
    });
  }

  enhanceLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (!this.enhancedElements.has(link) && link.href) {
        link.setAttribute('data-cf-component', 'link');
        this.enhancedElements.add(link);
      }
    });
  }

  enhanceBreadcrumbs() {
    const breadcrumbs = document.querySelector('.second-level-menu, .breadcrumb');
    if (breadcrumbs && !this.enhancedElements.has(breadcrumbs)) {
      breadcrumbs.setAttribute('data-cf-component', 'breadcrumbs');
      
      // Add separators
      const links = breadcrumbs.querySelectorAll('a');
      links.forEach((link, index) => {
        if (index < links.length - 1) {
          const separator = document.createElement('span');
          separator.className = 'cf-breadcrumb-separator';
          separator.textContent = '→';
          separator.style.margin = '0 0.5rem';
          separator.style.color = 'var(--cf-text-muted)';
          
          if (link.nextSibling) {
            link.parentNode.insertBefore(separator, link.nextSibling);
          } else {
            link.parentNode.appendChild(separator);
          }
        }
      });

      this.enhancedElements.add(breadcrumbs);
    }
  }

  setupMutationObserver() {
    this.observer = new MutationObserver((mutations) => {
      let shouldEnhance = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any new nodes need enhancement
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              shouldEnhance = true;
            }
          });
        }
      });

      if (shouldEnhance) {
        // Debounce enhancement calls
        clearTimeout(this.enhanceTimeout);
        this.enhanceTimeout = setTimeout(() => {
          this.enhanceExistingElements();
        }, 100);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Force re-enhancement
  reEnhance() {
    this.enhancedElements = new WeakSet();
    this.enhanceExistingElements();
  }
}

export default DOMEnhancer;
