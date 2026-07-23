# Development Guide

This document outlines the design and architectural choices for the Gitwig website.

## Design System

The website relies heavily on CSS variables defined in `style.css` in the `:root` scope.

### Colors
- **Background**: `#09090b` (Deep dark, slate-like)
- **Elevated Background**: `#18181b` (Used for cards and header)
- **Primary Accent**: `#22c55e` (Git green)
- **Secondary Accent**: `#3b82f6` (Used in gradients)

### Typography
- **Primary (Sans)**: `Inter`, system-ui
- **Monospace**: `Fira Code`, ui-monospace

## Adding Documentation Pages
To add a new documentation page:
1. Create a new HTML file in the `docs/` folder.
2. Link it to the `docs/style.css` (which we will create for common doc styling).
3. Update the sidebar navigation in `docs/index.html`.
