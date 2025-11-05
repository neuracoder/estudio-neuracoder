#!/bin/bash
# Script de auto-deploy para Hostinger
# Este script debe estar en /home/u777479293/public_html/

echo "=== Starting deployment ==="
cd /home/u777479293/public_html

echo "=== Pulling latest changes from GitHub ==="
git pull origin main

echo "=== Deployment completed at $(date) ==="
