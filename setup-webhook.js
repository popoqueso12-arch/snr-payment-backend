import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/webhook';

if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ Error: TELEGRAM_BOT_TOKEN no configurado');
  console.error('   Agrega TELEGRAM_BOT_TOKEN a .env');
  process.exit(1);
}

async function setupWebhook() {
  console.log('🔗 Configurando webhook de Telegram...');
  console.log(`📍 URL del webhook: ${WEBHOOK_URL}`);

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${encodeURIComponent(WEBHOOK_URL)}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.ok) {
            console.log('✅ Webhook configurado correctamente');
            console.log(`📨 Telegram enviará updates a: ${WEBHOOK_URL}`);
            resolve(true);
          } else {
            console.error('❌ Error:', response.description);
            reject(response);
          }
        } catch (e) {
          console.error('❌ Error parseando respuesta:', e);
          reject(e);
        }
      });
    }).on('error', (error) => {
      console.error('❌ Error configurando webhook:', error);
      reject(error);
    });
  });
}

async function getWebhookInfo() {
  console.log('📋 Obteniendo info del webhook actual...\n');

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.ok) {
            const info = response.result;
            console.log('📊 Info del Webhook:');
            console.log('  URL:', info.url || 'No configurado');
            console.log('  Pendientes:', info.pending_update_count || 0);
            console.log('  Errores últimos:', info.last_error_date ? new Date(info.last_error_date * 1000) : 'Ninguno');
            if (info.last_error_message) {
              console.log('  Último error:', info.last_error_message);
            }
            console.log('');
            resolve(true);
          } else {
            console.error('❌ Error:', response.description);
            reject(response);
          }
        } catch (e) {
          console.error('❌ Error parseando respuesta:', e);
          reject(e);
        }
      });
    }).on('error', (error) => {
      console.error('❌ Error obteniendo info:', error);
      reject(error);
    });
  });
}

(async () => {
  try {
    await getWebhookInfo();
    await setupWebhook();
    console.log('\n✅ Todo listo. El servidor está escuchando en http://localhost:3000');
  } catch (error) {
    console.error('\n⚠️  Error en setup:', error);
    process.exit(1);
  }
})();
