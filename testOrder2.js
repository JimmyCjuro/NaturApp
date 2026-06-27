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
      items: [{
          productId: "KXJlzBkHHLmDEziixTMO",
          name: "Manzanilla Orgánica",
          price: 12.50,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400"
      }],
      total: 12.50,
      address: "Test address",
      notes: "Test notes",
      status: "pending",
    };
    
    // Simulate what checkout.js does
    const payload = {
        userId: 'test-user',
        items: orderData.items,
        total: orderData.total,
        shippingAddress: orderData.address || orderData.shippingAddress || '',
        paymentMethod: orderData.paymentMethod || 'cash',
        status: 'pending',
        createdAt: serverTimestamp(),
    };
    console.log("Payload:", payload);
    const docRef = await addDoc(collection(db, 'orders'), payload);
    console.log("Success:", docRef.id);
  } catch (err) {
    console.error("Error creating order:", err.message);
  }
  process.exit();
}
test();
