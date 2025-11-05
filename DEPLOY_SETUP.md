# 🚀 Deploy Manual - Neuracoder.com

Sistema de deploy confiable y simple usando Git + SSH.

## 📋 Método de Deploy

**Deploy Manual** - 100% confiable, sin depender de cronjobs o webhooks.

## 🔧 Setup Único (Ya realizado)

1. ✅ Repositorio Git configurado en local
2. ✅ Repositorio público en GitHub: https://github.com/neuracoder/estudio-neuracoder
3. ✅ Servidor Hostinger con Git configurado en `/home/u777479293/domains/neuracoder.com/public_html`
4. ✅ SSH configurado (puerto 65002)

## 🚀 Cómo Hacer Deploy

### Opción 1: Script Automático (Recomendado)

1. Haz tus cambios en los archivos
2. Abre terminal y ejecuta:
   ```bash
   git add .
   git commit -m "tu mensaje descriptivo"
   ```
3. **Doble clic en `deploy-now.bat`**
   - Hace push a GitHub
   - Hace pull en el servidor
   - ¡Listo!

### Opción 2: Manual Paso a Paso

```bash
# 1. Commit y push local
git add .
git commit -m "descripción de cambios"
git push origin main

# 2. Deploy al servidor
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && git pull origin main"
```

## ✅ Verificar Deploy

Después del deploy, verifica:

```bash
# Ver último commit en el servidor
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && git log -1 --oneline"

# Ver estado
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && git status"
```

O simplemente abre https://neuracoder.com en tu navegador.

## 🐛 Troubleshooting

### El sitio no se actualiza

```bash
# Forzar actualización en el servidor
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && git reset --hard origin/main && git pull origin main"
```

### Ver diferencias entre local y servidor

```bash
# Ver qué commit tiene el servidor
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && git log -1"

# Ver qué commit tienes local
git log -1
```

### Permisos de archivos

Si hay problemas con permisos después del deploy:

```bash
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && chmod -R 755 . && chmod 644 *.html *.css *.js *.php"
```

## 📝 Notas

- **Siempre** haz commit antes de usar `deploy-now.bat`
- El script hace push + deploy en un solo comando
- No necesitas configurar nada más, todo ya está listo
- Si el script falla, usa la Opción 2 manual

## 🎯 Workflow Típico

```bash
# 1. Trabajas en tus archivos
code index.html

# 2. Revisas cambios
git status
git diff

# 3. Commit
git add .
git commit -m "feat: agregar nueva sección de servicios"

# 4. Deploy (doble clic en deploy-now.bat o ejecuta):
./deploy-now.bat
```

¡Así de simple! 🎉

---

**Última actualización:** 2025-11-05
**Repositorio:** https://github.com/neuracoder/estudio-neuracoder
**Sitio:** https://neuracoder.com
