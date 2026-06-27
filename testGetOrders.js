const { initializeApp } = require('firebase/app');
const { getFirestore, query, collection, where, getDocs } = require('firebase/firestore');

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
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', 'test-user')
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
      };
    });
    console.log("Docs found:", docs.length);
    if(docs.length > 0) {
        console.log("First doc createdAt:", docs[0].createdAt);
    }
  } catch (err) {
    console.error("Error getting orders:", err.message);
  }
  process.exit();
}
test();
