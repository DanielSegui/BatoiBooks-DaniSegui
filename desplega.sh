#!/bin/bash

# ==============================================================================
# Script de desplegament automatitzat per a Batoibooks
# Autor: Daniel Seguí
# Descripció: Compila l'aplicació en local i la puja per SCP amb l'usuari deploy
# ==============================================================================

# Variables de configuració del servidor i credencials
SERVER_USER="deploy"
SERVER_IP="3.213.178.2"
SSH_KEY="$HOME/Escritorio/DAWS.pem"     # Assegura't de tenir la clau al directori o posar la ruta absoluta
REMOTE_DIR="/var/www/html/"

echo "=================================================="
echo "🚀 Iniciant el desplegament de Batoibooks..."
echo "👤 Autor: Daniel Seguí"
echo "=================================================="

# Pas 1: Generar la versió de producció de l'aplicació amb npm
echo ">> 1. Compilant l'aplicació en local (npm run build)..."
npm run build

# Comprovació de si la compilació ha anat bé
if [ $? -ne 0 ]; then
    echo "❌ Error: La compilació amb npm ha fallat. Desplegament avortat."
    exit 1
fi
echo "✔ Compilació completada correctament."

# Pas 2: Pujar els fitxers compilats (dist/*) al servidor mitjançant scp segur
echo ">> 2. Pujant els fitxers al servidor remot ($SERVER_IP)..."
scp -i "$SSH_KEY" -r dist/* "$SERVER_USER@$SERVER_IP:$REMOTE_DIR"

# Comprovació de si la transferència SCP ha anat bé
if [ $? -ne 0 ]; then
    echo "❌ Error: Ha fallat la pujada dels fitxers per SCP."
    exit 1
fi
echo "✔ Fitxers pujats correctament a $REMOTE_DIR."

echo "=================================================="
echo "✨ Desplegament finalitzat amb èxit!"
echo "🌐 Pots comprovar-ho a: https://app.3-213-178-2.sslip.io"
echo "=================================================="
