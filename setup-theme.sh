#!/bin/bash

set -e

# Step 1: Clone repo into temp folder
echo "Cloning Twenty Twenty-Five theme from GitHub..."
git clone --depth=1 https://github.com/WordPress/twentytwentyfive.git temp

# Step 2: Move files to root, excluding unwanted files
echo "Moving theme files to current directory..."

rsync -av temp/ ./ \
  --exclude=".git" \
  --exclude=".github" \
  --exclude=".gitignore" \
  --exclude=".gitattributes" \
  --exclude="composer.*" \
  --exclude="package*.json" \
  --exclude="node_modules" \
  --exclude="theme-utils.mjs" \
  --exclude="phpcs.xml.dist" \
  --exclude="CONTRIBUTORS.MD" \
  --exclude="README.md" \
  --exclude="readme.txt" \
  --exclude="screenshot.png" \
  --exclude="temp" \
  --exclude=".*" # hidden files

# Step 2.2: Delete temp folder
rm -rf temp
echo "Temporary folder removed."

# Step 3: Prompt for new theme name
read -p "Enter new theme name (to replace 'Twenty Twenty-Five'): " THEME_NAME

# Step 4: Replace "Twenty Twenty-Five" in all text files
echo "Replacing theme name across files..."
grep -rl "Twenty Twenty-Five" . --exclude-dir={.git,node_modules} --exclude=setup-theme.sh | xargs sed -i '' "s/Twenty Twenty-Five/$THEME_NAME/g"

# Step 5: Prompt for WP.org username
read -p "Enter your WordPress.org username (for Author field): " WP_AUTHOR

# Step 6: Update style.css
STYLE_CSS="style.css"

if [[ -f "$STYLE_CSS" ]]; then
    echo "Updating style.css..."
    sed -i '' "s/^Author: .*/Author: $WP_AUTHOR/" "$STYLE_CSS"
    sed -i '' "s/^Description: .*/Description:/" "$STYLE_CSS"
else
    echo "⚠️ style.css not found!"
fi

# Step 7: Prompt to delete .git and .gitignore
#read -p "Do you want to delete the .git folder and .gitignore file? (y/N): " CONFIRM_DELETE

#if [[ "$CONFIRM_DELETE" =~ ^[Yy](es)?$ ]]; then
#    echo "Deleting .git and .gitignore..."
#    rm -rf .git .gitignore
#else
#    echo "Keeping .git and .gitignore."
#fi

echo "✅ Theme setup complete."
