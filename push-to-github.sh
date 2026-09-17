#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "==> Init git (if needed)"
if [ ! -d .git ]; then
  git init
fi

echo "==> Remote"
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Ps0904/dreamewell-realestate.git

echo "==> Commit"
git add -A
git commit -m "Deploy Dreamwell Ventures static frontend for GitHub Pages" || echo "Nothing new to commit"

echo "==> Push main"
git branch -M main
git push -u origin main --force

echo ""
echo "Done. Now open GitHub:"
echo "  1. https://github.com/Ps0904/dreamewell-realestate/settings/pages"
echo "  2. Set Source = GitHub Actions"
echo "  3. Wait for Actions to finish"
echo "  4. Open https://ps0904.github.io/dreamewell-realestate/"
