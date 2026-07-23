import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

// Dynamically grab all html files in the docs directory
const docsDir = resolve(__dirname, 'docs');
const docFiles = fs.existsSync(docsDir) ? fs.readdirSync(docsDir).filter(file => file.endsWith('.html')) : [];

const input = {
  main: resolve(__dirname, 'index.html'),
};

docFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[`docs_${name}`] = resolve(docsDir, file);
});

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input
    }
  }
})
