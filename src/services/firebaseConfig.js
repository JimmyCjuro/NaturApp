// src/services/firebaseConfig.js
// ============================================
// CONFIGURACIÓN DE FIREBASE
// Sesión 11: Integración de Firebase
// Auth + Firestore + Storage
// ============================================
//
// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Ir a https://console.firebase.google.com/
// 2. Crear un nuevo proyecto o seleccionar uno existente
// 3. Agregar una app web (icono </>)
// 4. Copiar la configuración de Firebase y reemplazar los valores abajo
// 5. Habilitar Authentication > Email/Password en la consola
// 6. Crear una base de datos Firestore
// 7. Habilitar Storage
// ============================================

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// ── Configuración de Firebase ──
// REEMPLAZAR con tus credenciales de Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDnMzDTJTfF2N8EjVth9APa--WkjUGZT8M",
  authDomain: "naturapp-55ae6.firebaseapp.com",
  projectId: "naturapp-55ae6",
  storageBucket: "naturapp-55ae6.firebasestorage.app",
  messagingSenderId: "840348356426",
  appId: "1:840348356426:web:edfef53c3ae31b206afbb3"
};
console.log("Firebase Init with API Key:", firebaseConfig.apiKey);
const app = initializeApp(firebaseConfig);

// ── Auth con persistencia compatible con Web y Móvil ──
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app); // Web maneja su propia persistencia (localStorage) por defecto
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// ── Firestore (Base de datos) ──
const db = getFirestore(app);

// ── Storage (Almacenamiento de archivos) ──
const storage = getStorage(app);

export { app, auth, db, storage };
export default app;
