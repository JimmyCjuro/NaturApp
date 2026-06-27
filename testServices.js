const { auth } = require('./src/services/firebaseConfig');
const { signInWithEmailAndPassword } = require('firebase/auth');
const { CartService, OrderService, ProductService } = require('./src/services/firestoreService');

async function test() {
  try {
    console.log("Logging in...");
    const userCred = await signInWithEmailAndPassword(auth, "jimmy_cjuro@hotmail.com", "77710875");
    const userId = userCred.user.uid;
    console.log("Logged in as:", userId);

    console.log("Fetching products...");
    const products = await ProductService.getAll();
    if(products.length === 0) throw new Error("No products found");
    const product = products[0];
    console.log("Selected product:", product.name);

    console.log("Adding to cart...");
    await CartService.addItem(userId, product);

    console.log("Fetching cart...");
    const cart = await CartService.get(userId);
    console.log("Cart fetched, item count:", cart.items.length);

    if (cart.items.length > 0) {
        console.log("Creating order...");
        const orderData = {
            items: cart.items.map(i => ({
                productId: i.productId || i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                image: i.image,
            })),
            total: cart.total,
            address: "Test address",
            notes: "Test notes",
            status: 'pending',
        };
        const order = await OrderService.create(userId, orderData);
        console.log("Order created:", order.id);

        console.log("Fetching orders...");
        const orders = await OrderService.getByUser(userId);
        console.log("Orders found:", orders.length);
        if (orders.length > 0) {
            console.log("Latest order ID:", orders[0].id);
        }
    } else {
        console.log("Cart is empty, cannot create order.");
    }
    
  } catch (err) {
    console.error("Test failed:", err.message);
  }
  process.exit();
}
test();
