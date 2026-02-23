// Importar dependencias profesionales
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// IMPORTAR LA CONEXIÓN A LA BASE DE DATOS
// Asegúrate de que tu archivo db.js esté configurado correctamente con pool
const pool = require('./db');

// Inicializar la aplicación Express
const app = express();

// Middlewares (Configuraciones de Seguridad y Datos)
app.use(cors()); // Habilita el Intercambio de Recursos de Origen Cruzado para React
app.use(express.json()); // Middleware para parsear cuerpos JSON

// Ruta Raíz de Diagnóstico
app.get('/', (req, res) => {
  res.send('🌺 API de FlowerLand: Ecosistema Digital Activo');
});

// ==========================================
// 1. LEER PRODUCTOS (GET)
// ==========================================
app.get('/api/productos', async (req, res) => {
  try {
    // Consulta optimizada para mantener el orden del catálogo
    const resultado = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ==========================================
// 2. CREAR PRODUCTO (POST)
// ==========================================
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen_url, categoria } = req.body;
    const query = `
      INSERT INTO productos (nombre, descripcion, precio, imagen_url, categoria) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *;
    `;
    const values = [nombre, descripcion, precio, imagen_url, categoria];
    const resultado = await pool.query(query, values);
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al insertar producto:', error.message);
    res.status(500).json({ error: 'Fallo en la persistencia del producto' });
  }
});

// ==========================================
// 3. ACTUALIZAR PRODUCTO (PUT)
// ==========================================
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen_url, categoria } = req.body;
    const query = `
      UPDATE productos 
      SET nombre = $1, descripcion = $2, precio = $3, imagen_url = $4, categoria = $5
      WHERE id = $6 
      RETURNING *;
    `;
    const values = [nombre, descripcion, precio, imagen_url, categoria, id];
    const resultado = await pool.query(query, values);
    
    if (resultado.rows.length === 0) return res.status(404).json({ error: 'Producto inexistente' });
    
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar:', error.message);
    res.status(500).json({ error: 'Error en la actualización de datos' });
  }
});

// ==========================================
// 4. ELIMINAR PRODUCTO (DELETE)
// ==========================================
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *;', [id]);
    
    if (resultado.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar:', error.message);
    res.status(500).json({ error: 'Error en la eliminación de datos' });
  }
});

// ==========================================
// 5. REGISTRAR PEDIDOS (POST) - INTEGRACIÓN FULL STACK
// ==========================================
app.post('/api/orders', async (req, res) => {
  try {
    // Extracción de datos del payload enviado por el CheckoutModal
    const { customerName, address, deliveryMethod, paymentMethod, total } = req.body;

    // Inserción en tabla orders con nombres de columna para PostgreSQL
    const query = `
      INSERT INTO orders (customer_name, address, delivery_method, payment_method, total, status) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `;
    
    // Status predefinido para simular éxito transaccional
    const values = [customerName, address, deliveryMethod, paymentMethod, total, 'Pagado'];

    const result = await pool.query(query, values);
    
    console.log("✅ Pedido transaccionado correctamente:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Bloque catch para asegurar la resiliencia del backend
    console.error('❌ Error crítico al procesar pedido:', error.message);
    res.status(500).json({ error: 'Error interno al procesar el pago' });
  }
});

// ==========================================
// 6. HISTORIAL DE PEDIDOS (GET) - PANEL ADMINISTRATIVO
// ==========================================
app.get('/api/orders', async (req, res) => {
  try {
    // Recuperación de transacciones ordenada por fecha descendente
    const resultado = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener pedidos:', error.message);
    res.status(500).json({ error: 'Error al consultar el historial de ventas' });
  }
});

// ==========================================
// 7. OBTENER ESTADÍSTICAS PARA GRÁFICAS (GET)
// ==========================================
app.get('/api/stats', async (req, res) => {
  try {
    // 1. Conteo por Métodos de Pago (Para la Dona)
    const paymentStats = await pool.query(`
      SELECT payment_method as name, COUNT(*) as value 
      FROM orders 
      GROUP BY payment_method
    `);

    // 2. Ventas por Día (Para la Gráfica de Líneas)
    const salesStats = await pool.query(`
      SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as date, SUM(total) as total
      FROM orders 
      GROUP BY date 
      ORDER BY date ASC 
      LIMIT 7
    `);

    res.json({
      payments: paymentStats.rows,
      sales: salesStats.rows
    });
  } catch (error) {
    console.error('Error en estadísticas:', error.message);
    res.status(500).json({ error: 'Error al consultar métricas' });
  }
});

// Configuración y encendido del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor de FlowerLand activo en http://localhost:${PORT}`);
});