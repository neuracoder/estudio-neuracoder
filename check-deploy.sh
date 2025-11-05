#!/bin/bash
# Script para verificar el estado del deploy en el servidor

echo "🔍 Verificando estado del deploy en neuracoder.com..."
echo ""

# Verificar si el comentario de cronjob está presente
echo "📝 Buscando el último comentario de prueba..."
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && grep 'Cronjob test' index.html"

if [ $? -eq 0 ]; then
    echo "✅ ¡Deploy automático funcionó! El archivo se actualizó."
else
    echo "⏳ Todavía no se actualizó. Espera unos minutos más."
fi

echo ""
echo "📊 Últimas líneas del log de deploy:"
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && tail -10 deploy.log"

echo ""
echo "⏰ Última modificación de index.html en el servidor:"
ssh -p 65002 u777479293@147.79.84.35 "cd domains/neuracoder.com/public_html && ls -lh index.html | awk '{print \$6, \$7, \$8}'"
