const { initializeApp } = require('firebase/app');
const { getFirestore, addDoc, collection, serverTimestamp } = require('firebase/firestore');

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
    const orderData = {
      items: [],
      total: 0,
      address: 'Test', // Note this
      notes: '',
      status: 'pending',
    };
    const docRef = await addDoc(collection(db, 'orders'), {
      userId: 'test-user',
      items: orderData.items,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress, // THIS IS UNDEFINED
      paymentMethod: orderData.paymentMethod || 'cash',
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    console.log("Success:", docRef.id);
  } catch (err) {
    console.error("Error creating order:", err.message);
  }
}
test();
