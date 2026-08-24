#!/bin/bash

# Descargar logos de bancos colombianos

echo "Descargando logos de bancos colombianos..."

# Bancolombia
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bancolombia_logo.svg/1200px-Bancolombia_logo.svg.png" -o "bancolombia.png" 2>/dev/null && echo "✓ Bancolombia" || echo "✗ Bancolombia"

# Banco de Bogotá
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_Banco_de_Bogota.svg/1200px-Logo_Banco_de_Bogota.svg.png" -o "banco_bogota.png" 2>/dev/null && echo "✓ Banco de Bogotá" || echo "✗ Banco de Bogotá"

# Davivienda
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Davivienda_logo.svg/1200px-Davivienda_logo.svg.png" -o "davivienda.png" 2>/dev/null && echo "✓ Davivienda" || echo "✗ Davivienda"

# Banco Popular
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Banco_Popular_Colombia_logo.png/1200px-Banco_Popular_Colombia_logo.png" -o "banco_popular.png" 2>/dev/null && echo "✓ Banco Popular" || echo "✗ Banco Popular"

# Banco de Occidente
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Banco_de_Occidente_logo.svg/1200px-Banco_de_Occidente_logo.svg.png" -o "banco_occidente.png" 2>/dev/null && echo "✓ Banco de Occidente" || echo "✗ Banco de Occidente"

# ITAU
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Ita%C3%BA_logo.svg/1200px-Ita%C3%BA_logo.svg.png" -o "itau.png" 2>/dev/null && echo "✓ ITAU" || echo "✗ ITAU"

# Nequi
curl -s "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Nequi_logo.svg/1200px-Nequi_logo.svg.png" -o "nequi.png" 2>/dev/null && echo "✓ Nequi" || echo "✗ Nequi"

echo "Descarga completada"
