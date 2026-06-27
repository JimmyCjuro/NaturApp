const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const firebaseConfig = {
  apiKey: "AIzaSyDnMzDTJTfF2N8EjVth9APa--WkJuGZT8M",
  authDomain: "naturapp-55ae6.firebaseapp.com",
  projectId: "naturapp-55ae6",
  storageBucket: "naturapp-55ae6.firebasestorage.app",
  messagingSenderId: "840348356426",
  appId: "1:840348356426:web:edfef53c3ae31b206afbb3"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
async function test() {
  try {
    const user = await createUserWithEmailAndPassword(auth, "test" + Date.now() + "@test.com", "123456");
    console.log("Success:", user.user.uid);
  } catch (err) {
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
  }
}
test();
