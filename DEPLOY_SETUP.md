# 🚀 Guía de Deploy Automático - Hostinger

Esta guía te ayudará a configurar el deploy automático de tu sitio en Hostinger usando Git + GitHub Webhooks.

## 📋 Requisitos Previos

- Cuenta de Hostinger con acceso SSH
- Repositorio en GitHub
- Sitio web en `neuracoder.com`

## 🔧 PASO 1: Setup Inicial en Hostinger (una sola vez)

### 1.1 Conectar por SSH

```bash
ssh -p 65002 u777479293@147.79.84.35
```

### 1.2 Preparar el directorio

```bash
# Ir a la carpeta del sitio
cd public_html

# IMPORTANTE: Si ya hay archivos, hacer backup primero
mkdir ~/backup_old_site
mv * ~/backup_old_site/ 2>/dev/null || true

# Si hay archivos ocultos también
mv .* ~/backup_old_site/ 2>/dev/null || true
```

### 1.3 Clonar el repositorio

```bash
# Clonar tu repo de GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git clone https://github.com/TU_USUARIO/neuracoder.git .

# Configurar Git (si es necesario)
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### 1.4 Dar permisos al script de deploy

```bash
chmod +x deploy.sh
```

## 🪝 PASO 2: Configurar GitHub Webhook

### 2.1 Configurar el secreto en deploy.php

1. Genera una clave secreta segura:
   ```bash
   # En tu terminal local, genera una clave aleatoria
   openssl rand -hex 32
   ```

2. Edita `deploy.php` en el servidor y cambia:
   ```php
   $secret = "CAMBIA_ESTA_CLAVE_SECRETA";
   ```
   Por tu clave generada.

3. Asegúrate de que el archivo tenga los permisos correctos:
   ```bash
   chmod 644 deploy.php
   ```

### 2.2 Configurar el Webhook en GitHub

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** → **Webhooks** → **Add webhook**
3. Configura:
   - **Payload URL**: `https://neuracoder.com/deploy.php`
   - **Content type**: `application/json`
   - **Secret**: La misma clave que pusiste en `deploy.php`
   - **Which events**: Selecciona "Just the push event"
   - **Active**: ✅ Marcado
4. Haz clic en **Add webhook**

## ✅ PASO 3: Probar el Deploy

### 3.1 Hacer un push de prueba

```bash
# En tu máquina local
git add .
git commit -m "Test auto-deploy"
git push origin main
```

### 3.2 Verificar que funcionó

1. Ve a GitHub → Tu repositorio → Settings → Webhooks
2. Haz clic en tu webhook
3. Ve a la pestaña "Recent Deliveries"
4. Deberías ver una entrega con un ✅ verde

### 3.3 Revisar los logs en el servidor

```bash
# Conectarte por SSH y revisar el log
ssh -p 65002 u777479293@147.79.84.35
cd public_html
cat deploy.log
```

## 🐛 Troubleshooting

### El webhook falla con error 403

- Verifica que el secret en GitHub y en `deploy.php` sean exactamente iguales
- Revisa el log: `cat deploy.log`

### Git pull no funciona

```bash
# Verifica que el usuario web tenga permisos
cd /home/u777479293/public_html
ls -la

# Si hay problemas de permisos
chown -R u777479293:u777479293 .
chmod -R 755 .
```

### El sitio no se actualiza

```bash
# Verifica manualmente que git pull funciona
cd /home/u777479293/public_html
git pull origin main

# Si hay conflictos
git reset --hard origin/main
```

## 🔒 Seguridad

### Proteger deploy.php

Si quieres agregar una capa extra de seguridad, puedes mover el webhook a una ubicación no obvia:

```bash
# Renombrar el archivo
mv deploy.php webhook-a8f3d9c2e1b4.php
```

Y actualizar la URL en GitHub Webhooks.

### Revisar logs periódicamente

```bash
# Ver las últimas 50 líneas del log
tail -n 50 /home/u777479293/public_html/deploy.log

# Limpiar logs antiguos (opcional)
> /home/u777479293/public_html/deploy.log
```

## 📝 Notas Importantes

- El deploy solo se ejecuta cuando haces push a la rama `main`
- Los archivos `.git` no son accesibles desde el navegador por seguridad
- Si necesitas ejecutar comandos adicionales después del deploy (como npm install), agrégalos a `deploy.sh`

## 🎉 ¡Listo!

Ahora cada vez que hagas `git push origin main`, tu sitio se actualizará automáticamente en Hostinger.

---

**¿Problemas?** Revisa el archivo `deploy.log` en tu servidor para más detalles.
