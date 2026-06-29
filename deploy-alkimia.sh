#!/bin/bash
# deploy-alkimia.sh — atualiza o GitHub Pages com o site mais recente
# Uso: bash deploy-alkimia.sh

set -e

SITE="clientes/c001-alkimia/p001-site"

echo "→ Sincronizando gh-pages com master..."

git checkout gh-pages
git checkout master -- "$SITE/index.html"
cp "$SITE/index.html" index.html
git checkout master -- "$SITE/assets"
cp -r "$SITE/assets" .
git add index.html assets/
git commit -m "deploy: atualiza site Alkimia ($(date '+%Y-%m-%d %H:%M'))" || echo "Nada novo pra commitar."
git push origin gh-pages --force
git checkout master

echo "✓ Site ao vivo: https://guarucriativo-ux.github.io/A-fabrica/"
