# Guion de Presentación: NaturApp

**Objetivo:** Explicar el proyecto NaturApp de forma clara, técnica pero accesible, resaltando la arquitectura y las soluciones implementadas en la integración con Firebase.

---

## 1. Introducción (El "Qué" y el "Para Qué")
*"Buenos días profesor. Hoy voy a presentar **NaturApp**, una aplicación móvil desarrollada en **React Native con Expo**, orientada a la venta de productos naturales y orgánicos. El objetivo de este proyecto fue construir un e-commerce funcional desde cero, integrando un backend en la nube utilizando **Firebase** para gestionar usuarios, productos y pedidos en tiempo real."*

## 2. Arquitectura del Proyecto (El "Cómo")
*"Para mantener el código organizado y escalable, decidimos implementar un patrón de diseño basado en **MVVM (Model-View-ViewModel)** adaptado a React Native:*

*   ***Las Vistas (View):*** *Están construidas usando **Expo Router**, lo que nos permite manejar la navegación de la aplicación basándonos en archivos y carpetas.*
*   ***Los ViewModels:*** *Creamos **Custom Hooks** (como `useAuth`, `useCart`, `useOrders`) que actúan como puente. Estos hooks manejan todo el estado de la aplicación y la lógica de negocio, manteniendo las vistas limpias de código complejo.*
*   ***Los Servicios (Model):*** *Tenemos una capa dedicada exclusivamente a comunicarse con Firebase. Aquí es donde centralizamos las consultas a Firestore y la Autenticación.*

## 3. Integración con Firebase (El Core del Proyecto)
*"El mayor reto y logro del proyecto fue la integración completa con Firebase (Sesión 11 y 12). Implementamos:*

1.  ***Autenticación:** Sistema de login y registro usando Firebase Authentication (Correo/Contraseña).*
2.  ***Base de Datos (Firestore):** Estructuramos los datos en colecciones principales:*
    *   *`products`: El catálogo general.*
    *   *`users/{userId}/cart`: Una subcolección privada para el carrito de cada usuario.*
    *   *`orders`: El registro global de pedidos asociados a cada usuario.*

## 4. Retos y Soluciones Técnicas (Demostrar conocimiento profundo)
*"Durante la integración, nos encontramos con algunos bugs interesantes que tuvimos que resolver para garantizar que la app funcionara de forma óptima y multiplataforma:*

*   ***Problemas de Sincronización en el Carrito:** Inicialmente, el carrito no se actualizaba bien porque los identificadores únicos (`item.id`) no coincidían entre la base de datos y las listas de React Native. Lo solucionamos mapeando explícitamente el `productId` como clave primaria.*
*   ***Fallos en la creación de Pedidos:** Al usar emuladores Android (Waydroid/Expo Go), la función `serverTimestamp()` nativa de Firebase causaba bloqueos al intentar registrar la fecha del pedido. Lo resolvimos generando los Timestamps localmente usando Javascript puro (`new Date().toISOString()`), lo que demostró ser más confiable en este entorno.*
*   ***Compatibilidad Multiplataforma:** Queríamos que la app funcionara tanto en Móvil como en Web. Nos dimos cuenta de que la persistencia nativa (`AsyncStorage`) rompía la versión web, así que implementamos una detección de plataforma (`Platform.OS === 'web'`) para usar el almacenamiento estándar en navegadores y el almacenamiento nativo en móviles.*

## 5. Demostración Rápida (Live Demo)
*"A continuación, me gustaría hacer una demostración rápida del flujo completo:*
1.  *Iniciamos sesión con un usuario de prueba.*
2.  *Exploramos el catálogo, que está leyendo los datos en vivo desde Firestore.*
3.  *Agregamos productos al carrito.*
4.  *Procedemos al Checkout, confirmamos la dirección, y vemos cómo se limpia el carrito y el pedido se registra exitosamente en nuestra base de datos.*
5.  *Finalmente, revisamos el Historial de Pedidos."*

## 6. Conclusión
*"En conclusión, NaturApp no es solo una interfaz de usuario estática, sino una aplicación completa conectada a un backend real (BaaS), lista para operar, con un flujo de compras funcional, y con un código altamente modular preparado para futuras expansiones. Gracias."*
