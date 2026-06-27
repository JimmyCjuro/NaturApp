# NaturApp - Plataforma E-Commerce Móvil y Web

NaturApp es una aplicación integral para la venta y distribución de productos naturales y orgánicos. Desarrollada con React Native y Expo SDK 52, ofrece una experiencia de usuario fluida tanto en dispositivos móviles (iOS/Android) como en navegadores web. El proyecto se apoya en Firebase como Backend-as-a-Service (BaaS) para gestionar la base de datos en tiempo real, la autenticación de usuarios y el almacenamiento de recursos.

## Características Principales

* Autenticación Segura: Registro e inicio de sesión de usuarios respaldado por Firebase Authentication.
* Catálogo Dinámico: Visualización en tiempo real de productos obtenidos desde Cloud Firestore.
* Carrito de Compras Persistente: Gestión avanzada del carrito por usuario, manteniendo el estado a través de subcolecciones en Firestore.
* Proceso de Checkout: Confirmación de pedidos con registro de direcciones y almacenamiento seguro en el historial del usuario.
* Compatibilidad Multiplataforma: Código unificado que se ejecuta nativamente en dispositivos móviles y de forma responsiva en la web.
* Modo Fallback Inteligente: Capacidad de operar con datos locales estáticos si las credenciales de Firebase no están configuradas, ideal para evaluaciones rápidas de interfaz.

## Arquitectura y Diseño

El proyecto sigue una adaptación moderna del patrón de arquitectura MVVM (Model-View-ViewModel) para separar claramente las responsabilidades y facilitar el mantenimiento y la escalabilidad del código.

### Componentes de la Arquitectura

1. Vista (View):
   * Implementada mediante componentes funcionales de React Native y el sistema de enrutamiento basado en archivos de Expo Router (ubicado en el directorio `app/`).
   * Componentes modulares y reutilizables ubicados en `src/components/`.

2. ViewModel:
   * Representado por Custom Hooks ubicados en `src/hooks/` (ej. `useAuth.js`, `useCart.js`, `useOrders.js`).
   * Estos hooks son responsables de gestionar el estado de la UI, orquestar la lógica de negocio y servir como intermediarios entre las Vistas y los Servicios.

3. Modelo (Model / Servicios):
   * Capa de integración ubicada en `src/services/`.
   * Centraliza toda la comunicación externa, encapsulando las interacciones complejas con las APIs de Firebase.

### Stack Tecnológico

* Frontend: React Native, Expo SDK 52, Expo Router
* Backend (BaaS): Firebase (Authentication, Cloud Firestore, Cloud Storage)
* Persistencia Local: AsyncStorage (Móvil) / LocalStorage (Web)
* Lenguaje: JavaScript (ES6+)

## Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrese de contar con las siguientes herramientas en su entorno de desarrollo:

* Node.js (versión 18.x o superior)
* npm (versión 8.x o superior) o yarn
* Expo CLI (opcional, ejecutable vía npx)
* Una cuenta activa en Firebase Console

## Instalación y Configuración

Siga estos pasos para configurar el entorno de desarrollo local:

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd NaturApp_S11_Firebase
   ```

2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Configurar el entorno de Firebase:
   * Cree un nuevo proyecto en la Consola de Firebase.
   * Habilite los servicios de Authentication (proveedor Correo/Contraseña) y Firestore Database.
   * Modifique las reglas de seguridad de Firestore según sea necesario para su entorno.
   * Copie sus credenciales de configuración web de Firebase.
   * Abra el archivo `src/services/firebaseConfig.js` y reemplace el objeto `firebaseConfig` con sus credenciales.

4. Inicializar la base de datos (Opcional):
   Puede poblar Cloud Firestore con el catálogo de productos inicial ejecutando el siguiente script automatizado:
   ```bash
   node scripts/seedFirestore.js
   ```

5. Iniciar el servidor de desarrollo:
   ```bash
   npx expo start
   ```
   Presione `w` para abrir en la Web, `a` para abrir en un emulador de Android, o `i` para un simulador de iOS.

## Estructura de Directorios

```text
├── app/                  # Rutas y pantallas de la aplicación (Expo Router)
├── scripts/              # Scripts utilitarios (ej. inserción de datos iniciales)
├── src/
│   ├── components/       # Componentes de interfaz de usuario reutilizables
│   ├── hooks/            # Lógica de negocio y gestión de estado (ViewModels)
│   ├── services/         # Integración de APIs externas y configuración (Firebase)
│   └── utils/            # Funciones auxiliares y formateadores
├── README.md             # Documentación principal del proyecto
├── Informe.md            # Informe técnico detallado
├── Guion_Presentacion.md # Guía para la sustentación del proyecto
└── package.json          # Dependencias y scripts del proyecto
```

## Troubleshooting y Optimizaciones (Sesión 11)

Durante el ciclo de desarrollo e integración de Firebase, se implementaron soluciones técnicas críticas para garantizar la estabilidad y el funcionamiento multiplataforma:

1. Resolución de Mapeo de Direcciones (Checkout):
   Se implementó una lógica de respaldo condicional (`orderData.address || orderData.shippingAddress || ''`) en el servicio de creación de pedidos para sincronizar la nomenclatura entre la Vista y los requerimientos de la base de datos Firestore, previniendo el rechazo de transacciones.

2. Unificación de Identificadores en el Carrito:
   Se estandarizó la estructura de datos retornada por el servicio del carrito, asignando explícitamente la propiedad `id` al valor de `productId`. Esto corrigió errores críticos de renderizado en componentes `FlatList` que requerían claves únicas y reactivó las funciones de eliminación y actualización de ítems.

3. Compatibilidad de Marcas de Tiempo (Timestamps):
   Para evitar interbloqueos silenciosos provocados por la función nativa `serverTimestamp()` de Firebase en entornos de emulación Android, se migró a un sistema de generación de marcas de tiempo basado en JavaScript puro (`new Date().toISOString()`).

4. Soporte Verdaderamente Multiplataforma (Web/Móvil):
   Se refactorizó el módulo de inicialización de autenticación para aplicar la persistencia de sesión dinámicamente. Utilizando `Platform.OS === 'web'`, la aplicación detecta el entorno de ejecución e invoca el método estándar para navegadores o la persistencia nativa con `AsyncStorage` para dispositivos móviles, eliminando excepciones fatales en la versión web.

## Licencia

Este proyecto está destinado a fines educativos y de demostración.
