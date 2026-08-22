# SNR Payment Backend

Backend para procesamiento de pagos con integración de Telegram Bot.

## 🚀 Características

- ✅ Webhook de Telegram para aprobación/rechazo de pagos
- ✅ Polling para sincronizar estado entre frontend y Telegram
- ✅ Detección automática de tipo de tarjeta (Visa, Mastercard, Amex)
- ✅ Variables de entorno para máxima seguridad
- ✅ Deploy automático en Render

## 📋 Requisitos

- Node.js 14+
- Cuenta en Telegram Bot (obtener token de @BotFather)
- Para producción: Render.com (gratuito)

## 🔧 Setup Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear archivo `.env`

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```
TELEGRAM_BOT_TOKEN=8952571695:AAHr5qHDQ7Hu0LoqGS49jUWg9MYFjO1MaBw
TELEGRAM_CHAT_ID=-1004389419498
PORT=3000
```

### 3. Arrancar servidor

```bash
npm start
```

### 4. Configurar webhook (local con ngrok)

Terminal nueva:

```bash
./ngrok http 3000
```

Otra terminal:

```bash
$env:WEBHOOK_URL='https://abc123.ngrok.io/api/webhook'; node setup-webhook.js
```

## 🌐 Deploy en Render

### 1. Crear repo en GitHub

```bash
git init
git add .
git commit -m "Initial backend"
git branch -M main
git remote add origin https://github.com/tu-usuario/snr-payment-backend.git
git push -u origin main
```

### 2. Deploy en Render

1. Ve a https://render.com
2. Conecta tu repo GitHub
3. Render detectará `render.yaml`
4. Agrega variables de entorno en Render Dashboard:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

### 3. Configurar webhook final

```bash
$env:WEBHOOK_URL='https://snr-payment-backend.onrender.com/api/webhook'; node setup-webhook.js
```

## 🔐 Variables de Entorno (SEGURIDAD)

**NUNCA** commitees `.env` a GitHub (está en `.gitignore`)

Archivo `.env.example` muestra la estructura pero SIN valores sensibles.

En Render Dashboard:
- Environment → Environment Variables
- Agrega los valores reales ahí

## 📊 Endpoints

```
POST /api/webhook           → Recibe callbacks Telegram
GET  /api/webhook?check=ID  → Polling estado
GET  /health                → Health check
GET  /api/debug/estados     → Ver estados (DEBUG)
```

## ✅ Checklist Antes de Commitear

- [ ] `.env` NO está en Git (`git status`)
- [ ] `TELEGRAM_BOT_TOKEN` NO en código
- [ ] `TELEGRAM_CHAT_ID` NO en código
- [ ] `.gitignore` tiene `.env`
- [ ] `.env.example` como referencia

## 🧪 Testing Local

```bash
# Health
curl http://localhost:3000/health

# Ver estados
curl http://localhost:3000/api/debug/estados
```

---

**Listo para GitHub ✅**
