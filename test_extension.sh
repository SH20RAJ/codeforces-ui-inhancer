#!/bin/bash

# Test script for Codeforces UI Extension
echo "🚀 Testing Codeforces UI Extension..."

# Check if all required files exist
echo "📁 Checking files..."
files=("manifest.json" "styles.css" "content.js" "popup.html")

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
        exit 1
    fi
done

# Check manifest.json syntax
echo "📋 Validating manifest.json..."
if python3 -m json.tool manifest.json > /dev/null 2>&1; then
    echo "✅ manifest.json is valid JSON"
else
    echo "❌ manifest.json has syntax errors"
    exit 1
fi

# Check if required manifest fields exist
echo "🔍 Checking manifest fields..."
required_fields=("manifest_version" "name" "version" "content_scripts" "action")

for field in "${required_fields[@]}"; do
    if grep -q "\"$field\"" manifest.json; then
        echo "✅ $field found in manifest"
    else
        echo "❌ $field missing from manifest"
        exit 1
    fi
done

# Check CSS for basic syntax
echo "🎨 Checking CSS syntax..."
if command -v css-validator >/dev/null 2>&1; then
    css-validator styles.css
else
    echo "ℹ️  CSS validator not available, skipping CSS validation"
fi

# Check JavaScript for basic syntax
echo "📝 Checking JavaScript syntax..."
if command -v node >/dev/null 2>&1; then
    if node -c content.js 2>/dev/null; then
        echo "✅ content.js syntax is valid"
    else
        echo "❌ content.js has syntax errors"
        exit 1
    fi
else
    echo "ℹ️  Node.js not available, skipping JavaScript validation"
fi

# Check HTML for basic structure
echo "🌐 Checking HTML structure..."
if grep -q "<!DOCTYPE html>" popup.html && grep -q "<html" popup.html && grep -q "</html>" popup.html; then
    echo "✅ popup.html has valid HTML structure"
else
    echo "❌ popup.html missing required HTML structure"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Extension appears to be ready."
echo ""
echo "📋 Next steps:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable Developer mode"
echo "3. Click 'Load unpacked' and select this folder"
echo "4. Visit codeforces.com to see the enhanced UI"
echo ""
echo "✨ Enjoy your beautiful LeetCode-style Codeforces experience!"
