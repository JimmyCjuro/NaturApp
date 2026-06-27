const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, addDoc, query, where, getDocs, doc, setDoc, serverTimestamp } = require('firebase/firestore');

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
    // 1. Log in
    console.log("Logging in...");
    const userCred = await signInWithEmailAndPassword(auth, "jimmy_cjuro@hotmail.com", "77710875");
    const userId = userCred.user.uid;
    console.log("Logged in as:", userId);

    // 2. Add to cart
    console.log("Adding item to cart...");
    const productId = "test_product_123";
    const qCart = query(collection(db, 'users', userId, 'cart'), where('productId', '==', productId));
    const cartSnap = await getDocs(qCart);
    if(cartSnap.empty) {
        await addDoc(collection(db, 'users', userId, 'cart'), {
            productId: productId,
            name: "Test Item",
            price: 10,
            image: "test.jpg",
            quantity: 1,
        });
        console.log("Item added to cart.");
    } else {
        console.log("Item already in cart.");
    }

    // 3. Get Cart
    console.log("Fetching cart...");
    const cartQuery = query(collection(db, 'users', userId, 'cart'));
    const cartSnapshot = await getDocs(cartQuery);
    const cartItems = cartSnapshot.docs.map(d => ({ id: d.data().productId, docId: d.id, ...d.data() }));
    console.log("Cart items:", cartItems);

    // 4. Create Order
    console.log("Creating order...");
    const orderRef = await addDoc(collection(db, 'orders'), {
        userId,
        items: cartItems,
        total: 10,
        shippingAddress: "Test Address",
        paymentMethod: "cash",
        status: "pending",
        createdAt: serverTimestamp(),
    });
    console.log("Order created:", orderRef.id);

    // 5. Get Orders
    console.log("Fetching orders...");
    const ordersQ = query(collection(db, 'orders'), where('userId', '==', userId));
    const ordersSnap = await getDocs(ordersQ);
    const orders = ordersSnap.docs.map(d => d.data());
    console.log("Orders found:", orders.length);

  } catch (err) {
    console.error("Error:", err.message);
  }
  process.exit();
}
test();
