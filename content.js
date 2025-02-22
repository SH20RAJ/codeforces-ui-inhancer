// Theme Toggle UI
function createThemeToggle() {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'cf-theme-toggle';
    toggleContainer.innerHTML = `
        <div class="cf-theme-popup">
            <h3>Enhance Codeforces UI?</h3>
            <p>Choose between the classic or modern interface.</p>
            <div class="cf-theme-options">
                <button class="cf-btn cf-btn-classic">Keep Classic</button>
                <button class="cf-btn cf-btn-modern">Use Modern UI</button>
            </div>
        </div>
    `;
    document.body.appendChild(toggleContainer);

    // Event listeners
    toggleContainer.querySelector('.cf-btn-classic').addEventListener('click', () => {
        localStorage.setItem('cf-enhanced-ui', 'false');
        toggleContainer.remove();
        disableEnhancedStyles();
    });

    toggleContainer.querySelector('.cf-btn-modern').addEventListener('click', () => {
        localStorage.setItem('cf-enhanced-ui', 'true');
        toggleContainer.remove();
        enableEnhancedStyles();
    });
}

function enableEnhancedStyles() {
    document.documentElement.classList.add('cf-enhanced');
    enhanceUI();
}

function disableEnhancedStyles() {
    document.documentElement.classList.remove('cf-enhanced');
}

// Main function to enhance UI
function enhanceUI() {
    modernizeHeader();
    enhanceProblemList();
    addSearchBox();
    improveCodeEditor();
    addDarkModeToggle();
    enhanceNavigation();
    improveRoundbox();
    enhanceDataTable();
    modernizeTopics();
    improveUserProfile();
}

// Modernize the header with Google-like design
function modernizeHeader() {
    const header = document.querySelector('#header');
    if (!header) return;

    // Clear existing header content
    header.innerHTML = '';

    // Add logo
    const logo = document.createElement('a');
    logo.href = '/';
    logo.className = 'logo';
    logo.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 19H22L12 2Z" fill="var(--google-blue)"/>
        </svg>
        <span>Codeforces</span>
    `;
    header.appendChild(logo);

    // Add search box
    const searchBox = createSearchBox();
    header.appendChild(searchBox);

    // Add navigation
    const nav = document.createElement('nav');
    nav.className = 'menu-list';
    nav.innerHTML = `
        <li><a href="/problemset">Problems</a></li>
        <li><a href="/contests">Contests</a></li>
        <li><a href="/gyms">Gym</a></li>
        <li><a href="/groups">Groups</a></li>
    `;
    header.appendChild(nav);
}

// Create Google-like search box
function createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-box';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search problems, contests, or users...';
    
    searchContainer.appendChild(searchInput);
    return searchContainer;
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value;
        if (query.length > 2) {
            searchProblems(query);
        }
    }, 300));
}

// Search problems
async function searchProblems(query) {
    try {
        const response = await fetch(`/api/problemset.problems?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        displaySearchResults(data.result.problems);
    } catch (error) {
        console.error('Search failed:', error);
    }
}

// Display search results
function displaySearchResults(problems) {
    const resultsContainer = document.querySelector('.search-results') || createSearchResults();
    resultsContainer.innerHTML = '';

    problems.forEach(problem => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <a href="/problemset/problem/${problem.contestId}/${problem.index}">
                ${problem.name}
            </a>
            <span class="difficulty" style="background: ${getDifficultyColor(problem.rating)}">
                ${problem.rating}
            </span>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

// Create search results container
function createSearchResults() {
    const container = document.createElement('div');
    container.className = 'search-results';
    document.querySelector('.search-box').appendChild(container);
    return container;
}

// Enhance problem list
function enhanceProblemList() {
    const problemTable = document.querySelector('.problems');
    if (!problemTable) return;

    const rows = problemTable.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            // Add difficulty indicator
            const difficultyCell = cells[3]; // Adjust index based on table structure
            if (difficultyCell) {
                const rating = parseInt(difficultyCell.textContent);
                difficultyCell.innerHTML = `
                    <span class="difficulty" style="background: ${getDifficultyColor(rating)}">
                        ${rating}
                    </span>
                `;
            }

            // Enhance problem title
            const titleCell = cells[1]; // Adjust index based on table structure
            if (titleCell) {
                const link = titleCell.querySelector('a');
                if (link) {
                    link.className = 'problem-title';
                }
            }
        }
    });
}

// Improve code editor
function improveCodeEditor() {
    const editor = document.querySelector('#sourceCodeTextarea');
    if (editor) {
        editor.classList.add('code-editor');
        
        // Add line numbers
        const wrapper = document.createElement('div');
        wrapper.className = 'editor-wrapper';
        editor.parentNode.insertBefore(wrapper, editor);
        wrapper.appendChild(editor);
        
        // Add syntax highlighting (placeholder for CodeMirror integration)
        initializeSyntaxHighlighting(editor);
    }
}

// Add dark mode toggle
function addDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '🌙';
    toggle.onclick = toggleDarkMode;
    document.querySelector('#header').appendChild(toggle);
}

// Toggle dark mode
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Utility functions
function getDifficultyColor(rating) {
    if (rating < 1200) return 'var(--google-green)';
    if (rating < 1400) return 'var(--google-blue)';
    if (rating < 1600) return 'var(--google-yellow)';
    if (rating < 1900) return 'var(--google-yellow)';
    if (rating < 2100) return 'var(--google-red)';
    return 'var(--google-red)';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize dark mode from saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Remove the first observer and replace with this one
const observer = new MutationObserver((mutations) => {
    // Check if mutations are caused by our own changes
    const shouldProcess = mutations.some(mutation => {
        return Array.from(mutation.addedNodes).some(node => {
            return node.nodeType === 1 && !node.classList.contains('cf-enhanced');
        });
    });

    if (shouldProcess) {
        mutations.forEach(mutation => {
            Array.from(mutation.addedNodes)
                .filter(node => node.nodeType === 1 && !node.classList.contains('cf-enhanced'))
                .forEach(node => {
                    enhanceUI();
                    // Mark as enhanced
                    node.classList.add('cf-enhanced');
                });
        });
    }
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// Replace the IIFE with this updated version
(function() {
    // Create and inject our custom styles
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color: #2563eb;
            --primary-dark: #1e40af;
            --surface-color: #f8fafc;
            --text-color: #1f2937;
            --border-color: #e5e7eb;
        }

        /* Basic resets */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            line-height: 1.6 !important;
            color: var(--text-color) !important;
            background: #fff !important;
        }

        /* Header improvements */
        #header {
            background: #fff !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            padding: 1rem !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 1000 !important;
        }

        /* Menu styling */
        .menu-list li {
            font-family: inherit !important;
        }

        .menu-list li a {
            color: var(--text-color) !important;
            text-decoration: none !important;
            padding: 0.5rem 1rem !important;
            border-radius: 4px !important;
            transition: all 0.2s ease !important;
        }

        .menu-list li a:hover {
            background: var(--surface-color) !important;
            color: var(--primary-color) !important;
        }

        /* Problem list improvements */
        .problems {
            background: #fff !important;
            border-radius: 8px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            margin: 1rem auto !important;
            max-width: 1200px !important;
            border: 1px solid var(--border-color) !important;
        }

        .problems tr {
            border-bottom: 1px solid var(--border-color) !important;
        }

        .problems td {
            padding: 1rem !important;
        }

        /* Roundbox modernization */
        .roundbox {
            border: 1px solid var(--border-color) !important;
            border-radius: 8px !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
            background: #fff !important;
            margin-bottom: 1rem !important;
        }

        .roundbox .caption {
            color: var(--primary-color) !important;
            font-size: 1.25rem !important;
            padding: 1rem !important;
            border-bottom: 1px solid var(--border-color) !important;
        }

        /* Button improvements */
        .submit {
            background: var(--primary-color) !important;
            color: white !important;
            padding: 0.5rem 1rem !important;
            border-radius: 4px !important;
            border: none !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
        }

        .submit:hover {
            background: var(--primary-dark) !important;
            transform: translateY(-1px) !important;
        }

        /* Table improvements */
        .datatable {
            border: 1px solid var(--border-color) !important;
            border-radius: 8px !important;
            overflow: hidden !important;
        }

        .datatable th {
            background: var(--surface-color) !important;
            padding: 1rem !important;
            font-weight: 600 !important;
        }

        .datatable td {
            padding: 1rem !important;
            border-bottom: 1px solid var(--border-color) !important;
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
            :root {
                --surface-color: #1e293b;
                --text-color: #f8fafc;
                --border-color: #334155;
            }

            body {
                background: #0f172a !important;
                color: var(--text-color) !important;
            }

            #header {
                background: #0f172a !important;
            }

            .problems, .roundbox, .datatable {
                background: #1e293b !important;
            }
        }
    `;
    
    document.documentElement.appendChild(style);

    // Function to apply modern classes
    function modernizeUI() {
        // Add modern classes to unenhanced elements only
        document.querySelectorAll('.roundbox:not(.cf-enhanced)').forEach(box => {
            box.classList.add('modern-roundbox', 'cf-enhanced');
        });

        document.querySelectorAll('.datatable:not(.cf-enhanced)').forEach(table => {
            table.classList.add('modern-datatable', 'cf-enhanced');
        });

        document.querySelectorAll('.problems:not(.cf-enhanced)').forEach(table => {
            table.classList.add('modern-problems', 'cf-enhanced');
        });

        // Enhance unenhanced buttons
        document.querySelectorAll('input[type="submit"]:not(.cf-enhanced)').forEach(button => {
            button.classList.add('modern-button', 'cf-enhanced');
        });
    }

    // Apply styles when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', modernizeUI);
    } else {
        modernizeUI();
    }

    // Single observer for all changes
    const styleObserver = new MutationObserver((mutations) => {
        const shouldProcess = mutations.some(mutation => {
            return Array.from(mutation.addedNodes).some(node => {
                return node.nodeType === 1 && !node.classList.contains('cf-enhanced');
            });
        });

        if (shouldProcess) {
            modernizeUI();
        }
    });

    styleObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: false
    });
})(); 
