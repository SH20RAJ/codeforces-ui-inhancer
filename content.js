// Enhanced Codeforces LeetCode-style UI
console.log('🚀 Codeforces LeetCode UI Enhanced loaded');

// Add the enhancement class to enable our styles
document.documentElement.classList.add('cf-leetcode-ui');

// Enhanced navigation features
function enhanceNavigation() {
  const header = document.querySelector('#header');
  if (!header) return;

  // Create search container if it doesn't exist
  const searchContainer = createSearchContainer();
  
  // Create notification badge
  const notificationBadge = createNotificationBadge();
  
  // Create theme toggle
  const themeToggle = createThemeToggle();
  
  // Insert enhanced elements into header
  const headerRight = header.querySelector('.header-right') || createHeaderRight(header);
  
  // Add search to center area
  const headerCenter = header.querySelector('.header-center') || createHeaderCenter(header);
  if (!headerCenter.querySelector('.search-container')) {
    headerCenter.appendChild(searchContainer);
  }
  
  // Add notification and theme toggle to right area
  if (!headerRight.querySelector('.notification-badge')) {
    headerRight.insertBefore(notificationBadge, headerRight.firstChild);
  }
  if (!headerRight.querySelector('.theme-toggle')) {
    headerRight.appendChild(themeToggle);
  }
}

function createSearchContainer() {
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.innerHTML = `
    <span class="search-icon">🔍</span>
    <input type="text" class="search-input" placeholder="Search problems, contests, users..." />
  `;
  return searchContainer;
}

function createNotificationBadge() {
  const badge = document.createElement('div');
  badge.className = 'notification-badge';
  badge.innerHTML = '🔔';
  badge.title = 'Notifications';
  return badge;
}

function createThemeToggle() {
  const toggle = document.createElement('div');
  toggle.className = 'theme-toggle';
  toggle.innerHTML = '🌙';
  toggle.title = 'Toggle theme';
  
  toggle.addEventListener('click', () => {
    // Toggle theme logic can be added here
    console.log('Theme toggle clicked');
    toggle.innerHTML = toggle.innerHTML === '🌙' ? '☀️' : '🌙';
  });
  
  return toggle;
}

function createHeaderRight(header) {
  const headerRight = document.createElement('div');
  headerRight.className = 'header-right';
  header.appendChild(headerRight);
  return headerRight;
}

function createHeaderCenter(header) {
  const headerCenter = document.createElement('div');
  headerCenter.className = 'header-center';
  header.appendChild(headerCenter);
  return headerCenter;
}

// Add breadcrumbs enhancement
function enhanceBreadcrumbs() {
  const breadcrumbs = document.querySelector('.second-level-menu, .breadcrumb');
  if (breadcrumbs && !breadcrumbs.classList.contains('enhanced')) {
    breadcrumbs.classList.add('breadcrumbs', 'enhanced');
    
    // Add separators between breadcrumb items
    const links = breadcrumbs.querySelectorAll('a');
    links.forEach((link, index) => {
      if (index < links.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'separator';
        separator.textContent = '→';
        link.parentNode.insertBefore(separator, link.nextSibling);
      }
    });
  }
}

// Add status indicator
function addStatusIndicator() {
  // Remove existing indicator
  const existing = document.querySelector('.cf-status');
  if (existing) existing.remove();
  
  // Create new indicator
  const status = document.createElement('div');
  status.className = 'cf-status';
  status.textContent = '✨ LeetCode UI Enhanced';
  document.body.appendChild(status);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    if (status) status.style.display = 'none';
  }, 3000);
}

// Initialize enhancements
function initializeEnhancements() {
  addStatusIndicator();
  enhanceNavigation();
  enhanceBreadcrumbs();
}

// Add enhancements when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEnhancements);
} else {
  initializeEnhancements();
}

// Re-apply enhancements on dynamic content changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Re-enhance navigation if header is re-rendered
      setTimeout(() => {
        enhanceNavigation();
        enhanceBreadcrumbs();
      }, 100);
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});