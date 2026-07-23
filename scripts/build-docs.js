import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const SOURCE_DIR = '/Users/tareqmy/development/rustprojects/gitwig/docs';
const DEST_DIR = path.resolve('./docs');

// Mapping of markdown files to their display names and categories
const DOCS_CONFIG = {
  'Getting Started': [
    { file: 'index.html', md: null, title: 'Quickstart' }, // Manually handled index
    { file: 'installation.html', md: 'installation.md', title: 'Installation' },
  ],
  'User Guide': [
    { file: 'features.html', md: 'features.md', title: 'Core Features' },
    { file: 'keybindings.html', md: 'keybindings.md', title: 'Keybindings' },
    { file: 'status_indicators.html', md: 'status_indicators.md', title: 'Status Indicators' },
    { file: 'detail_view.html', md: 'detail_view.md', title: 'Detail View' },
    { file: 'panels.html', md: 'panels.md', title: 'Panels & UI Windows' },
    { file: 'configuration.html', md: 'configuration.md', title: 'Configuration' },
    { file: 'font_support.html', md: 'font_support.md', title: 'Font & Symbol Support' },
  ]
};

function generateSidebar(activeFile) {
  let sidebarHtml = '<nav class="sidebar-nav">\n';
  
  for (const [category, items] of Object.entries(DOCS_CONFIG)) {
    sidebarHtml += `  <div class="nav-group">\n    <h4 class="nav-group-title">${category}</h4>\n`;
    for (const item of items) {
      const activeClass = item.file === activeFile ? ' class="active"' : '';
      sidebarHtml += `    <a href="${item.file}"${activeClass}>${item.title}</a>\n`;
    }
    sidebarHtml += `  </div>\n`;
  }
  
  sidebarHtml += '</nav>';
  return sidebarHtml;
}

function generateHtml(title, content, activeFile) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Gitwig</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="./style.css">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="navbar">
        <div class="container nav-content">
            <div class="logo">
                <a href="../index.html" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.5rem;">
                    <span class="logo-icon">🌿</span>
                    <span class="logo-text">Gitwig</span>
                </a>
            </div>
            <nav class="nav-links">
                <a href="../index.html">Home</a>
                <a href="https://github.com/tareqmy/gitwig" class="btn btn-outline" target="_blank">GitHub</a>
            </nav>
        </div>
    </header>

    <div class="docs-container container">
        <aside class="sidebar">
            ${generateSidebar(activeFile)}
        </aside>

        <main class="docs-content">
            ${content}
        </main>
    </div>
</body>
</html>`;
}

// Generate all markdown pages
for (const items of Object.values(DOCS_CONFIG)) {
  for (const item of items) {
    if (item.md) {
      const mdPath = path.join(SOURCE_DIR, item.md);
      const destPath = path.join(DEST_DIR, item.file);
      
      try {
        if (fs.existsSync(mdPath)) {
          console.log(`Processing ${item.md} -> ${item.file}`);
          const mdContent = fs.readFileSync(mdPath, 'utf8');
          // Basic markdown parsing
          const htmlContent = marked.parse(mdContent);
          const fullHtml = generateHtml(item.title, htmlContent, item.file);
          fs.writeFileSync(destPath, fullHtml);
        } else {
          console.warn(`Warning: Source file ${mdPath} not found.`);
        }
      } catch (err) {
        console.error(`Error processing ${item.md}:`, err);
      }
    }
  }
}

// Re-generate the index.html with the updated sidebar, keeping its existing content
try {
  const indexPath = path.join(DEST_DIR, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  
  // Replace the old sidebar with the new one dynamically
  const sidebarRegex = /<nav class="sidebar-nav">[\s\S]*?<\/nav>/;
  indexHtml = indexHtml.replace(sidebarRegex, generateSidebar('index.html'));
  
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Updated index.html sidebar');
} catch (err) {
  console.error('Error updating index.html:', err);
}

console.log('Documentation build complete.');
