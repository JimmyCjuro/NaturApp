const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

async function testKey(apiKey) {
  const firebaseConfig = {
    apiKey,
    authDomain: "naturapp-55ae6.firebaseapp.com",
    projectId: "naturapp-55ae6",
    storageBucket: "naturapp-55ae6.firebasestorage.app",
    messagingSenderId: "840348356426",
    appId: "1:840348356426:web:edfef53c3ae31b206afbb3"
  };
  try {
    const app = initializeApp(firebaseConfig, apiKey); // unique name
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, "fake@fake.com", "123456");
  } catch (err) {
    if (err.code !== 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' && err.code !== 'auth/invalid-api-key') {
      console.log(`✅ Success (valid API key): ${apiKey} -> ${err.code}`);
      return true;
    }
  }
  return false;
}

async function main() {
  const variations = [
    "AIzaSyDnMzDTJTfF2N8EjVth9APa--WkJuGZT8M",
    "AIzaSyDnMzDTJTfF2N8EjVth9APa-WkJuGZT8M", // 1 dash
    "AIzaSyDnMzDTJTfF2N8EjVth9APa__WkJuGZT8M", // 2 underscores
    "AIzaSyDnMzDTJTfF2N8EjVth9APa_WkJuGZT8M", // 1 underscore
    "AIzaSyDnMzDTJTfF2N8EjVth9APa--WkJuGZTBM", // B instead of 8
    "AIzaSyDnMzDTJTfF2N8EjVth9APa--WkJuGZT0M", // 0 instead of 8
    "AIzaSyDnMzDTjTfF2N8EjVth9APa--WkJuGZT8M", // j instead of J
    "AlzaSyDnMzDTJTfF2N8EjVth9APa--WkJuGZT8M", // l instead of I
  ];
  for (const key of variations) {
    const valid = await testKey(key);
    if (valid) {
      console.log("Found valid key!");
      break;
    }
  }
  console.log("Done testing variations.");
}
main();
