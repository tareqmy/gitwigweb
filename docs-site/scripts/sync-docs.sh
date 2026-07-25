#!/bin/bash

# Exit on error
set -e

# Arguments
SRC="$1"

if [ -z "$SRC" ]; then
  echo "Error: Source path not provided."
  echo "Usage: $0 <path-to-gitwig-repo>"
  exit 1
fi

# Convert to absolute path if needed
SRC_ABS=$(cd "$SRC" && pwd)

if [ ! -d "$SRC_ABS/docs" ]; then
  echo "Error: Directory 'docs' not found in source path '$SRC_ABS'."
  exit 1
fi

# Destination paths
DEST="$(cd "$(dirname "$0")/.." && pwd)"
CONTENT_DIR="$DEST/content"
PUBLIC_DIR="$DEST/public/assets"

echo "Syncing documentation..."
echo "Source: $SRC_ABS"
echo "Destination: $DEST"

# Ensure directories exist
mkdir -p "$CONTENT_DIR"
mkdir -p "$PUBLIC_DIR"

# Clean the destination content directory (except index.mdx and _meta.ts)
echo "Cleaning content directory..."
find "$CONTENT_DIR" -type f -name "*.mdx" ! -name "index.mdx" -delete

# Copy and rename docs files
echo "Copying documentation files..."
for file in "$SRC_ABS/docs"/*.md; do
  if [ -f "$file" ]; then
    basename=$(basename "$file" .md)
    kebab_case=$(echo "$basename" | tr '_' '-')
    cp "$file" "$CONTENT_DIR/$kebab_case.mdx"
    echo "  - Copied $basename.md -> $kebab_case.mdx"
  fi
done


# Copy CHANGELOG.md
if [ -f "$SRC_ABS/CHANGELOG.md" ]; then
  echo "Copying CHANGELOG.md..."
  echo "---" > "$CONTENT_DIR/changelog.mdx"
  echo "title: Changelog" >> "$CONTENT_DIR/changelog.mdx"
  echo "---" >> "$CONTENT_DIR/changelog.mdx"
  echo "" >> "$CONTENT_DIR/changelog.mdx"
  cat "$SRC_ABS/CHANGELOG.md" >> "$CONTENT_DIR/changelog.mdx"
fi

# Copy media assets
if [ -d "$SRC_ABS/resources" ]; then
  echo "Copying media assets..."
  cp -r "$SRC_ABS/resources"/* "$PUBLIC_DIR/"
fi

# Fix image paths in copied files
echo "Fixing image paths..."
if [ "$(uname)" == "Darwin" ]; then
  find "$CONTENT_DIR" -type f -name "*.mdx" -exec sed -i '' 's/resources\//\/assets\//g' {} +
else
  find "$CONTENT_DIR" -type f -name "*.mdx" -exec sed -i 's/resources\//\/assets\//g' {} +
fi

echo "Documentation sync complete!"
