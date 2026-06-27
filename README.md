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
