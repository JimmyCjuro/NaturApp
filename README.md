# NaturApp - Proyecto Móvil con Firebase

Esta es una aplicación móvil para la venta de productos naturales y orgánicos, desarrollada con **React Native** y **Expo SDK 52**. El proyecto implementa una arquitectura modular con Firebase como backend principal (BaaS).

## Arquitectura y Tecnologías

El proyecto sigue un patrón **MVVM** (Model-View-ViewModel) adaptado a React Native:
- **Vista (View):** Componentes y pantallas implementados con Expo Router (enrutamiento basado en archivos bajo la carpeta `app/`).
- **ViewModel:** Custom hooks (`src/hooks/`) que encapsulan el estado, la lógica de negocio y se comunican con los servicios.
- **Servicios:** Capa de integración (`src/services/`) con Firebase Authentication, Cloud Firestore y Cloud Storage. También implementa un modo *fallback* que usa datos locales si Firebase no está configurado.

### Tecnologías principales:
- React Native
- Expo SDK 52
- Expo Router
- Firebase (Auth, Firestore, Storage)
- AsyncStorage (para persistencia de sesión)

## Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar las dependencias con npm:
   ```bash
   npm install
   ```
3. Configurar Firebase:
   - Crear un proyecto en Firebase Console.
   - Habilitar Authentication (Email/Password), Firestore y Storage.
   - Reemplazar las credenciales en `src/services/firebaseConfig.js`.
4. (Opcional) Ejecutar el script para poblar la base de datos de Firestore con datos iniciales:
   ```bash
   node scripts/seedFirestore.js
   ```
5. Iniciar la aplicación:
   ```bash
   npx expo start
   ```

## Estructura del Proyecto

- `app/`: Contiene el sistema de rutas basado en archivos de Expo Router, incluyendo pestañas y flujos de autenticación.
- `src/components/`: Componentes UI reutilizables (tarjetas de productos, carrito, etc.).
- `src/hooks/`: Lógica principal de negocio separada de las vistas.
- `src/services/`: Configuración y operaciones de Firebase.
- `scripts/`: Scripts auxiliares (como el poblador de datos de Firestore).

## Modo sin Firebase (Fallback)
Si las credenciales de Firebase no están configuradas, la aplicación detectará esto automáticamente y cargará datos estáticos locales para el catálogo, categorías y manejará carritos y pedidos en memoria, lo que permite evaluar la UI y el flujo de la aplicación sin configuración previa.

## Correcciones y Optimizaciones de Integración (Sesión 11)

Durante el proceso de integración del backend con Firebase (basado en la guía del proyecto), se abordaron y solucionaron diversos *bugs* para garantizar el correcto funcionamiento multiplataforma:

1. **Mapeo del campo de dirección de envío (`shippingAddress`)**
   Se corrigió una discrepancia donde la vista de checkout emitía la dirección como `address` pero Firestore esperaba `shippingAddress`. Se implementó un mapeo condicional (`orderData.address || orderData.shippingAddress || ''`) para evitar que el servicio rechace la creación del pedido por valores indefinidos.

2. **Unificación de identificadores en el carrito (`item.id`)**
   El servicio del carrito devolvía el identificador principal bajo `docId`, pero las listas de React Native requerían estrictamente `item.id`. Se estandarizó el mapeo asignando explícitamente `id: d.data().productId`, evitando así errores de renderización (claves únicas) y asegurando que las funciones de actualizar y eliminar funcionaran.

3. **Compatibilidad en la generación de Timestamps**
   La función nativa `serverTimestamp()` de Firebase presentaba incompatibilidades silenciosas al operar con el SDK Web de Firebase en el entorno de desarrollo del emulador de Android (Expo Go), interrumpiendo el flujo de creación de pedidos. Se reemplazó por la generación local utilizando `new Date().toISOString()`, garantizando el guardado correcto de transacciones.

4. **Soporte de Autenticación Cross-Platform (Web/Móvil)**
   El uso estricto de `getReactNativePersistence` (junto con `AsyncStorage`) en `firebaseConfig.js` rompía la ejecución de la aplicación en navegadores. Se implementó una detección condicional mediante `Platform.OS === 'web'` para invocar el método estándar `getAuth()` en Web y mantener la persistencia nativa en dispositivos móviles, haciendo a la aplicación 100% multiplataforma.
