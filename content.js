// Simple Codeforces LeetCode-style enhancement
console.log('🚀 Codeforces LeetCode UI loaded');

// Add the enhancement class to enable our styles
document.documentElement.classList.add('cf-leetcode-ui');

// Add status indicator
function addStatusIndicator() {
  // Remove existing indicator
  const existing = document.querySelector('.cf-status');
  if (existing) existing.remove();
  
  // Create new indicator
  const status = document.createElement('div');
  status.className = 'cf-status';
  status.textContent = '✨ LeetCode UI Active';
  document.body.appendChild(status);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    if (status) status.style.display = 'none';
  }, 3000);
}

// Add status when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addStatusIndicator);
} else {
  addStatusIndicator();
}