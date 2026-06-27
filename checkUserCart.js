const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, query, where, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDnMzDTJTfF2N8EjVth9APa--WkjUGZT8M",
  authDomain: "naturapp-55ae6.firebaseapp.com",
  projectId: "naturapp-55ae6",
  storageBucket: "naturapp-55ae6.firebasestorage.app",
  messagingSenderId: "840348356426",
  appId: "1:840348356426:web:edfef53c3ae31b206afbb3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function test() {
  try {
    const userCred = await signInWithEmailAndPassword(auth, "jimmy_cjuro@hotmail.com", "77710875");
    const userId = userCred.user.uid;
    console.log("User ID:", userId);

    const cartQuery = query(collection(db, 'users', userId, 'cart'));
    const cartSnapshot = await getDocs(cartQuery);
    console.log("Cart items:", cartSnapshot.docs.length);
    cartSnapshot.forEach(doc => console.log(doc.id, "=>", doc.data()));

    const ordersQuery = query(collection(db, 'orders'), where('userId', '==', userId));
    const ordersSnapshot = await getDocs(ordersQuery);
    console.log("Orders:", ordersSnapshot.docs.length);
    ordersSnapshot.forEach(doc => {
      const d = doc.data();
      console.log(doc.id, "=> Total:", d.total, "Items:", d.items.length, "Address:", d.shippingAddress);
    });

  } catch (err) {
    console.error("Error:", err.message);
  }
  process.exit();
}
test();
