#!/bin/bash
# deploy-guaru.sh — faz deploy do site Guaru (p002-site) em /A-fabrica/ no gh-pages
# Não toca no site da Alkimia (raiz do gh-pages)
# Uso: bash deploy-guaru.sh

set -e

SITE_DIR="clientes/c000-a-fabrica/p002-site"
DEPLOY_SUBDIR="A-fabrica"

echo "→ Build de produção..."
cd "$SITE_DIR"
npm run build
cd - > /dev/null

echo "→ Preparando deploy no gh-pages/$DEPLOY_SUBDIR ..."

# Stash qualquer mudança não commitada pra não perder
git stash --quiet || true

# Copia o dist para uma pasta temporária fora do repo
TMPDIR_DEPLOY=$(mktemp -d)
cp -r "$SITE_DIR/dist/." "$TMPDIR_DEPLOY/"

# Muda para o branch gh-pages
git checkout gh-pages

# Remove somente a subpasta do Guaru (não mexe em nada da Alkimia)
rm -rf "$DEPLOY_SUBDIR"
mkdir -p "$DEPLOY_SUBDIR"

# Copia o build novo
cp -r "$TMPDIR_DEPLOY/." "$DEPLOY_SUBDIR/"

# Limpa temp
rm -rf "$TMPDIR_DEPLOY"

# Commit e push
git add "$DEPLOY_SUBDIR"
git commit -m "deploy: atualiza site Guaru Estúdio em /$DEPLOY_SUBDIR"
git push origin gh-pages

# Volta para o branch principal
git checkout master

# Restaura stash se havia mudanças
git stash pop --quiet 2>/dev/null || true

echo ""
echo "✓ Deploy concluído!"
echo "→ Acesse: https://guarucriativo-ux.github.io/A-fabrica/"
