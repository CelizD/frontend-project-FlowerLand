import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para usar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- 0. DATOS DE EMERGENCIA (Por si todo falla) ---
// CORREGIDO: Se eliminaron los corchetes dobles [[ ]]
const PRODUCTOS_BACKUP = [
  {
    "id": 1,
    "name": "Ramo de 24 Rosas Rojas Premium",
    "price": 850,
    "category": "Flores",
    "image": "https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=800&q=80",
    "description": "El clásico gesto de amor. Rosas de invernadero de tallo largo."
  },
  {
    "id": 2,
    "name": "Tulipanes Holandeses (10 tallos)",
    "price": 650,
    "category": "Flores",
    "image": "https://images.unsplash.com/photo-1547516508-4c1f9c7c47ee?auto=format&fit=crop&w=800&q=80",
    "description": "Tulipanes multicolor importados, ideales para alegrar el día."
  },
  {
    "id": 3,
    "name": "Girasoles con Eucalipto",
    "price": 550,
    "category": "Flores",
    "image": "https://images.unsplash.com/photo-1543322748-33df6d3db8aa?auto=format&fit=crop&w=800&q=80",
    "description": "Vibrante arreglo de 5 girasoles grandes con follaje fino."
  },
  {
    "id": 4,
    "name": "Orquídea Phalaenopsis Doble Vara",
    "price": 980,
    "category": "Plantas",
    "image": "https://images.unsplash.com/photo-1556209598-a5676770f90c?auto=format&fit=crop&w=800&q=80",
    "description": "Elegante orquídea blanca en maceta de cerámica, larga duración."
  },
  {
    "id": 5,
    "name": "Pastel de Chocolate Trufa (8 pnas)",
    "price": 480,
    "category": "Postres y Vinos",
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    "description": "Delicioso pastel con cobertura de ganache de chocolate belga."
  },
  {
    "id": 6,
    "name": "Oso de Peluche Gigante (1.2m)",
    "price": 1450,
    "category": "Globos y Peluches",
    "image": "https://images.unsplash.com/photo-1559454403-b8fb9a1802d2?auto=format&fit=crop&w=800&q=80",
    "description": "El regalo más abrazable. Oso color beige extra suave."
  },
  {
    "id": 7,
    "name": "Bouquet de Globos 'Feliz Cumpleaños'",
    "price": 320,
    "category": "Globos y Peluches",
    "image": "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?auto=format&fit=crop&w=800&q=80",
    "description": "Set de 5 globos metálicos inflados con helio y contrapeso."
  },
  {
    "id": 8,
    "name": "Vino Tinto Cabernet Sauvignon",
    "price": 350,
    "category": "Postres y Vinos",
    "image": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80",
    "description": "Botella de 750ml, notas frutales. Ideal para acompañar flores."
  },
  {
    "id": 9,
    "name": "Combo Amor: Rosas + Chocolates",
    "price": 990,
    "category": "Combos",
    "image": "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80",
    "description": "12 Rosas rojas y una caja de chocolates fina."
  },
  {
    "id": 10,
    "name": "Gerberas de Colores",
    "price": 450,
    "category": "Flores",
    "image": "https://images.unsplash.com/photo-1522209706316-52210878e3c6?auto=format&fit=crop&w=800&q=80",
    "description": "Arreglo alegre con 10 gerberas de colores surtidos."
  },
  {
    "id": 11,
    "name": "Caja de Brownies Gourmet (6 pzas)",
    "price": 280,
    "category": "Postres y Vinos",
    "image": "https://images.unsplash.com/photo-1643714652285-4554eb75681e?auto=format&fit=crop&w=800&q=80",
    "description": "Brownies caseros con nuez y trozos de chocolate."
  },
  {
    "id": 12,
    "name": "Arreglo Fúnebre Lilys Blancas",
    "price": 1200,
    "category": "Momentos difíciles",
    "image": "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
    "description": "Diseño sobrio y elegante para expresar respeto y condolencias."
  },
  {
    "id": 13,
    "name": "Taza Personalizada 'Te Amo'",
    "price": 180,
    "category": "Personalizados",
    "image": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    "description": "Taza de cerámica con diseño romántico, incluye dulces dentro."
  },
  {
    "id": 14,
    "name": "Collar de Plata Corazón",
    "price": 650,
    "category": "Personalizados",
    "image": "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80",
    "description": "Cadena de plata .925 con dije de corazón minimalista."
  },
  {
    "id": 15,
    "name": "Ramo de Rosas Rosas (Sweet)",
    "price": 850,
    "category": "Flores",
    "image": "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=800&q=80",
    "description": "12 rosas en tono rosa pastel, envueltas en papel coreano."
  },
  {
    "id": 16,
    "name": "Cheesecake de Fresa",
    "price": 520,
    "category": "Postres y Vinos",
    "image": "https://images.unsplash.com/photo-1561726715-c26685f09623?auto=format&fit=crop&w=800&q=80",
    "description": "Clásico pay de queso con topping de mermelada y fresas naturales."
  },
  {
    "id": 17,
    "name": "Globo Gigante Personalizado",
    "price": 450,
    "category": "Globos y Peluches",
    "image": "https://images.unsplash.com/photo-1609121873111-e631665e8a56?auto=format&fit=crop&w=800&q=80",
    "description": "Globo burbuja transparente con frase personalizada en vinil."
  },
  {
    "id": 18,
    "name": "Cuna de Moisés en Maceta",
    "price": 380,
    "category": "Plantas",
    "image": "https://images.unsplash.com/photo-1593691509543-c55ce32e0435?auto=format&fit=crop&w=800&q=80",
    "description": "Planta de interior purificadora de aire con flores blancas."
  },
  {
    "id": 19,
    "name": "Caja de Botanas Saladas",
    "price": 400,
    "category": "Postres y Vinos",
    "image": "https://images.unsplash.com/photo-1615486511269-e74f881d3319?auto=format&fit=crop&w=800&q=80",
    "description": "Selección de nueces, pistaches y pretzels en caja de regalo."
  },
  {
    "id": 20,
    "name": "Combo Recupérate Pronto",
    "price": 750,
    "category": "Combos",
    "image": "https://images.unsplash.com/photo-1508737893664-8a48e7753c1d?auto=format&fit=crop&w=800&q=80",
    "description": "Flores alegres + Globo de 'Get Well Soon' + Peluche pequeño."
  },
  {
    "id": 21,
    "name": "Arreglo de Lilys y Stargazers",
    "price": 780,
    "category": "Flores",
    "image": "https://images.unsplash.com/photo-1563241527-30755f5223c7?auto=format&fit=crop&w=800&q=80",
    "description": "Flores muy aromáticas en tonos rosas y blancos."
  },
  {
    "id": 22,
    "name": "Vino Rosado Espumoso",
    "price": 420,
    "category": "Postres y Vinos",
    "image": "https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&w=800&q=80",
    "description": "Ideal para brindar en aniversarios o celebraciones especiales."
  },
  {
    "id": 23,
    "name": "Peluche de Conejo Orejón",
    "price": 350,
    "category": "Globos y Peluches",
    "image": "https://images.unsplash.com/photo-1585664811087-47f658d57053?auto=format&fit=crop&w=800&q=80",
    "description": "Peluche ultra suave de 30cm, ideal para recién nacidos."
  },
  {
    "id": 24,
    "name": "Marco de Fotos 'Nuestra Historia'",
    "price": 250,
    "category": "Personalizados",
    "image": "https://images.unsplash.com/photo-1582255757973-2281a44e59f4?auto=format&fit=crop&w=800&q=80",
    "description": "Marco decorativo blanco para foto de 6x4 pulgadas."
  },
  {
    "id": 25,
    "name": "Ramo Mixto de Temporada",
    "price": 350,
    "category": "Flores",
    "image": "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    "description": "La opción económica. Selección fresca del día del florista."
  },
  {
    "id": 26,
    "name": "Chocolates Ferrero Rocher (24 pzas)",
    "price": 280,
    "category": "Postres y Vinos",
    "image": "https://images.unsplash.com/photo-1627885942461-805175659833?auto=format&fit=crop&w=800&q=80",
    "description": "Caja diamante de chocolates con avellana."
  },
  {
    "id": 27,
    "name": "Combo Graduación",
    "price": 850,
    "category": "Combos",
    "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
    "description": "Girasoles + Globo de Graduación + Peluche de Búho."
  },
  {
    "id": 28,
    "name": "Suculentas en Base de Madera",
    "price": 300,
    "category": "Plantas",
    "image": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    "description": "Trío de suculentas variadas, regalo duradero y fácil de cuidar."
  },
  {
    "id": 29,
    "name": "Aretes de Perla Cultivada",
    "price": 450,
    "category": "Personalizados",
    "image": "https://images.unsplash.com/photo-1635767798638-3e2523456c98?auto=format&fit=crop&w=800&q=80",
    "description": "Broqueles de plata con perla auténtica, incluye caja de regalo."
  },
  {
    "id": 30,
    "name": "Canasta de Frutas y Flores",
    "price": 1100,
    "category": "Combos",
    "image": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    "description": "Selección de frutas de temporada decorada con flores frescas."
  }
];

// --- 1. CONEXIÓN A MONGODB ATLAS ---
const URI = "mongodb+srv://mxdcm82_db_user:U6fsGrLS3eutKs@cluster0.t1uw2qx.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("✅ Conectado exitosamente a MongoDB Atlas");
  } catch (error) {
    console.log("⚠️ MongoDB no disponible. El servidor usará datos locales.");
  }
};
connectDB();

// --- 2. MODELO ---
const Product = mongoose.model('Product', new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  category: String,
  image: String,
  description: String
}));

// --- 3. RUTAS BLINDADAS ---

app.get('/api/products', async (req, res) => {
  try {
    let products = [];

    // INTENTO A: MongoDB
    if (mongoose.connection.readyState === 1) {
      try {
        products = await Product.find();
        if (products.length > 0) console.log("📦 Datos cargados desde MongoDB");
      } catch (err) { console.log("Error en consulta Mongo, pasando a plan B"); }
    }

    // INTENTO B: Archivo Local
    if (products.length === 0) {
      const filePath = path.join(__dirname, 'productos.json');
      if (fs.existsSync(filePath)) {
        try {
          const data = fs.readFileSync(filePath, 'utf8');
          products = JSON.parse(data);
          console.log("📂 Datos cargados desde productos.json");
        } catch (jsonError) {
          console.error("❌ El archivo productos.json tiene errores de texto. Pasando a Plan C.");
        }
      }
    }

    // INTENTO C: Datos en Memoria (Hardcoded)
    if (products.length === 0) {
      console.log("🚨 Usando datos de EMERGENCIA (Hardcoded)");
      products = PRODUCTOS_BACKUP;
    }

    res.json(products);

  } catch (error) {
    console.error("Error fatal:", error);
    // Si todo falla, enviamos el backup para que la página NUNCA se quede vacía
    res.json(PRODUCTOS_BACKUP);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});