# FlowerLand - E-commerce de Arreglos Florales

FlowerLand es una aplicación web moderna diseñada para la venta, gestión y administración de un negocio de flores. El proyecto combina una interfaz de usuario elegante y minimalista con un sistema de gestión de contenido (CMS) en tiempo real.

---

## Tecnologías Utilizadas

Este proyecto fue construido utilizando un stack tecnológico moderno y escalable:

### Frontend (Interfaz)
* **React.js (v18):** Biblioteca principal para la construcción de interfaces dinámicas y componentes reutilizables.
* **Vite:** Empaquetador de módulos de última generación para un entorno de desarrollo ultrarrápido.
* **JavaScript (ES6+):** Lógica de negocio, manejo de estados y efectos asíncronos.
* **Tailwind CSS:** Framework de estilos "utility-first" para un diseño responsivo, limpio y moderno. Incluye efectos de cristal (Glassmorphism), animaciones y gradientes.

### Backend & Servicios (Nube)
* **Firebase Firestore (NoSQL):** Base de datos en tiempo real para gestionar el inventario de productos y el historial de pedidos.
* **Firebase Storage:** Almacenamiento en la nube para las imágenes de los productos subidas desde el panel administrativo.
* **LocalStorage:** Persistencia temporal de sesión de usuario y carrito de compras local.

### Herramientas de Desarrollo
* **NPM:** Gestión de dependencias.
* **Git/GitHub:** Control de versiones.
* **VS Code:** Editor de código.

---

## Características Principales

### Para el Cliente
1.  **Catálogo Dinámico:** Filtrado de productos por categorías (Romance, Jardín, etc.) y buscador en tiempo real.
2.  **Carrito de Compras:** Agregar y eliminar productos, cálculo automático de totales y persistencia de datos.
3.  **Historial de Pedidos:** Registro local de compras anteriores ("Mis Pedidos").
4.  **Checkout Simulado:** Flujo de compra completo con notificaciones de estado.
5.  **Integración con WhatsApp:** Botón directo para contacto y pedidos personalizados.

### Panel de Administración (Backoffice)
1.  **Modo Admin:** Acceso restringido mediante botón de alternancia ("Toggle Admin").
2.  **CRUD Completo:**
    * **Crear:** Subida de productos con nombre, precio, categoría y foto real (Drag & Drop).
    * **Leer:** Tabla de inventario conectada a Firebase en tiempo real.
    * **Actualizar/Borrar:** Gestión directa del catálogo en la nube.
3.  **Gestión de Imágenes:** Subida automática de archivos a Firebase Storage.

---

## Instalación y Despliegue

Si deseas correr este proyecto localmente:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/flowerland.git](https://github.com/TU_USUARIO/flowerland.git)
    cd flowerland
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Firebase:**
    * Crea un archivo "src/firebaseConfig.js".
    * Añade tus credenciales de Firebase (API Key, AuthDomain, etc.).

4.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

5.  **Construir para producción (Deploy):**
    ```bash
    npm run build
    ```
    La carpeta "dist" generada está lista para subirse a servicios como Netlify o Vercel.

---

## Diseño y UX

El diseño se centra en la elegancia y la calidez, utilizando una paleta de colores inspirada en la naturaleza:
* **Colores:** Crema (#fdfbf7), Dorado (#a67c5b), Rosa Pálido (#d4af97) y Verdes naturales.
* **Tipografía:** Limpia, moderna y legible.
* **Componentes:** Tarjetas con estilo "papel texturizado", botones interactivos y transiciones suaves.

---

**Desarrollado por:** Daniel Celiz Martinez
**Estudiante ID:** 23030536 | CESUN Universidad
