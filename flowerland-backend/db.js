const { Pool } = require('pg');
require('dotenv').config();

// Configuramos la conexión leyendo el archivo .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Probamos la conexión
pool.connect()
  .then(() => console.log('📦 Conectado con éxito a PostgreSQL (FlowerLand DB)'))
  .catch(err => console.error('❌ Error de conexión a PostgreSQL:', err.message));

module.exports = pool;