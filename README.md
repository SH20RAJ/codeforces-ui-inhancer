# ⚡ CF Enhancer v4.0 - Dev.to Inspired

A **beautiful, modern, and accessible** Chrome extension that transforms Codeforces with a dev.to-inspired design system. **Non-destructive** - preserves all original functionality while adding stunning visual enhancements.

## ✨ Key Features

### 🎨 **Dev.to Inspired Design**
- **Clean spacing system** (4px, 8px, 16px, 24px, 32px) for consistent layout
- **Modern navigation** with refined typography and better accessibility
- **Card-based content** with subtle shadows and borders
- **Professional color palette** with carefully chosen contrast ratios
- **Enhanced typography** with Inter font and improved line heights

### 🌓 **Refined Theme System**
- **Dark theme** with dev.to night mode inspired colors
- **Light theme** with clean, minimal aesthetics
- **Smooth transitions** and improved hover states
- **Better color contrast** for accessibility
- **Persistent settings** across sessions

### 🔧 **Enhanced Controls**
- **Floating controls** with improved positioning and styling
- **Modern popup interface** with dev.to inspired switches
- **Keyboard shortcuts** (Alt+E, Alt+T)
- **Better visual feedback** and states

### 📱 **Mobile-First Responsive**
- **Progressive enhancement** from mobile to desktop
- **Adaptive spacing** and component sizing
- **Better mobile navigation** behavior
- **Touch-friendly controls**

## 🚀 Installation

1. **Download/clone** this repository
2. **Open Chrome** → `chrome://extensions/`
3. **Enable Developer mode** (top right toggle)
4. **Click "Load unpacked"** → select extension folder
5. **Visit Codeforces** → see the enhanced UI!

## 🎮 Usage

### Toggle Controls
- **Alt+E** - Toggle enhancement on/off
- **Alt+T** - Switch between dark/light themes
- **Popup** - Click extension icon for visual controls
- **Floating buttons** - Right side of screen

### Features
- ✅ Full-width dark navigation
- ✅ Minimal card designs
- ✅ Enhanced tables and forms
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Custom scrollbars
- ✅ Beautiful buttons

## 🎨 Design System

Based on the attached dashboard image with:
- **Dark palette**: #0a0a0a, #1a1a1a, #2a2a2a
- **Accent colors**: Green (#4ade80), Blue (#60a5fa), Orange (#fb923c)
- **Modern spacing**: 0.75rem border radius, clean shadows
- **Typography**: Inter font family for professionalism

## � Mobile Responsive

- **Adaptive navigation** for mobile devices
- **Touch-friendly controls** (44px minimum)
- **Optimized spacing** for smaller screens
- **Preserved functionality** on all devices

## 🛠 Technical Details

- **Non-destructive CSS** - uses `.cf-enhanced` class scope
- **Modular architecture** with organized file structure
- **Vanilla JavaScript** - no dependencies
- **Chrome Extension v3** manifest
- **Local storage** for persistent settings

## 🎯 GitHub Repository

Visit: **https://github.com/SH20RAJ/codeforces-ui-inhancer**

## 📄 Version History

- **v3.0** - Complete rewrite with minimal design system
- **v2.x** - Enhanced features and modular approach  
- **v1.x** - Initial LeetCode-style implementation

---

**Made with ❤️ for competitive programmers**

Transform your Codeforces experience with clean, minimal design!
- **Active state indicators** for current navigation items
- **Hover effects** with shimmer animations
- **Improved table design** with hover effects and better readability
- **Beautiful buttons** with gradient backgrounds and shine effects
- **Enhanced navigation** with modern styling and better organization

### ⚡ **Performance Optimized**
- **Lazy loading** for better performance
- **Debounced interactions** for smooth experience
- **Optimized animations** with CSS transforms
- **Minimal performance impact** on page load

### ♿ **Accessibility First**
- **Keyboard navigation** support (Alt+T for theme, Alt+E for enhancement)
- **ARIA labels** for screen readers
- **Focus indicators** for better navigation
- **High contrast** options for better visibility

### 🛠️ **Smart Enhancement**
- **Auto-detection** of page elements
- **Dynamic enhancement** of new content
- **Fallback support** for edge cases
- **Non-intrusive** - can be easily toggled on/off

## 🎯 What Gets Enhanced

### 📊 **Tables & Data**
- Contest tables with beautiful hover effects
- Problem sets with gradient headers
- Submission status with color-coded results
- User ratings with enhanced styling

### 🧭 **Navigation**
- Header with modern design and better spacing
- Menu items with smooth hover animations
- Breadcrumbs with improved visibility
- Pagination with elegant button design

### 📝 **Content Areas**
- Problem statements with better typography
- Code blocks with syntax highlighting theme
- Comments section with card-based design
- Blog posts with modern layout

### 🎛️ **Interactive Elements**
- Forms with floating labels and focus states
- Buttons with gradient backgrounds and animations
- Links with smooth color transitions
- Input fields with modern styling

## 🚀 Installation

### Method 1: Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) (coming soon)
2. Click "Add to Chrome"
3. Enjoy the beautiful Codeforces experience!

### Method 2: Developer Mode
1. **Download** or clone this repository
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable** "Developer mode" (toggle in top right)
4. **Click** "Load unpacked" and select the extension folder
5. **Visit** any Codeforces page and see the magic! ✨

## 🎮 Usage

### Quick Start
1. **Install** the extension
2. **Visit** any Codeforces page
3. **Enjoy** the beautiful transformation automatically!

### Keyboard Shortcuts
- `Alt + T` - Toggle between dark and light themes
- `Alt + E` - Toggle enhancement on/off

### Extension Popup
- Click the extension icon to access quick settings
- Toggle enhancement and theme modes
- View keyboard shortcuts and status

## 🎨 Screenshots

### Before & After Comparison
*Coming soon - showcasing the dramatic transformation*

### Dark Mode
*Beautiful dark theme with carefully selected colors*

### Light Mode
*Clean, modern light theme with perfect contrast*

### Enhanced Tables
*Stunning table design with hover effects and smooth animations*

## 🛠️ Technical Features

### Modern CSS
- CSS Custom Properties for dynamic theming
- CSS Grid and Flexbox for perfect layouts
- CSS Transforms for smooth animations
- Modern pseudo-selectors for advanced styling

### Advanced JavaScript
- ES6+ features with arrow functions and modules
- Intersection Observer for performance
- MutationObserver for dynamic content
- Local Storage for settings persistence

### Performance Optimizations
- Debounced event handlers
- Efficient DOM queries
- Lazy loading implementation
- Minimal reflows and repaints

## 🔧 Customization

The extension is designed to be beautiful out of the box, but you can customize it further:

### CSS Variables
All colors and spacing are defined using CSS custom properties, making it easy to customize:

```css
:root {
  --primary-blue: #0066ff;
  --secondary-purple: #6366f1;
  --accent-green: #10b981;
  /* ... and many more */
}
```

### Configuration
Modify the `CONFIG` object in `content.js` to adjust behavior:

```javascript
const CONFIG = {
    enableAnimations: true,
    autoEnhance: true,
    darkModeDefault: false,
    enhancementDelay: 100,
    version: '2.0.0'
};
```

## 🤝 Contributing

We welcome contributions to make Codeforces even more beautiful!

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup
1. Clone the repository
2. Make your changes
3. Test on Codeforces pages
4. Submit a pull request

## 📝 Changelog

### v2.0.0 (Latest)
- ✨ Complete redesign with modern UI
- 🌙 Advanced dark/light theme system
- ⚡ Performance optimizations
- ♿ Accessibility improvements
- 🎨 Beautiful animations and transitions
- 🛠️ Enhanced popup interface

### v1.0.0
- 🎉 Initial release
- 🎨 Basic UI improvements
- 🌙 Simple dark mode

## 🐛 Known Issues & Solutions

### Issue: Extension not working
**Solution**: Make sure you're on a Codeforces page and the extension is enabled

### Issue: Styles not applying
**Solution**: Try refreshing the page or toggling the enhancement off and on

### Issue: Dark mode not persisting
**Solution**: Check if cookies/local storage is enabled in your browser

## 📞 Support

Having issues or suggestions? We're here to help!

- **GitHub Issues**: [Report bugs or request features](https://github.com/sh20raj/issues)
- **Email**: your-email@example.com
- **Discord**: Join our community (link coming soon)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Codeforces** team for creating an amazing platform
- **Material Design** for design inspiration
- **Inter & JetBrains Mono** for beautiful typography
- **Chrome Extensions API** for making this possible

## 🎉 Star History

If you love this extension, please give it a ⭐ star on GitHub!

---

**Made with ❤️ for the competitive programming community**

Transform your Codeforces experience today! 🚀
