const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, where } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDnMzDTJTfF2N8EjVth9APa--WkjUGZT8M",
  authDomain: "naturapp-55ae6.firebaseapp.com",
  projectId: "naturapp-55ae6",
  storageBucket: "naturapp-55ae6.firebasestorage.app",
  messagingSenderId: "840348356426",
  appId: "1:840348356426:web:edfef53c3ae31b206afbb3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const q = query(collection(db, 'products'), where('isActive', '==', true));
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(docs);
  } catch (err) {
    console.error(err);
  }
  process.exit();
}
test();
