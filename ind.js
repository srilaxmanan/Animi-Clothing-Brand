// Toggle Navbar Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Product Data
const products = [
    { id: 1, name: "Product 1", price: "200RS", image: "./img/1.jpg" },
    { id: 2, name: "Product 2", price: "350RS", image: "./img/3.jpg" },
    { id: 3, name: "Product 3", price: "500RS", image: "./img/4.jpg" },
    { id: 4, name: "Product 4", price: "400RS", image: "./img/12.jpg" },
    { id: 5, name: "Product 5", price: "200RS", image: "./img/5.jpg" },
    { id: 6, name: "Product 6", price: "700R", image: "./img/7.jpg" }
];

// DOM Elements
const productList = document.getElementById('product-list');
const orderList = document.getElementById('order-list');
const totalPriceElement = document.getElementById('total-price'); // New element
let orders = [];

// Display Products (6 products)
products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'col-md-4 col-sm-6 mb-4'; // Responsive layout
    productCard.innerHTML = `
        <div class="product-card border p-3 text-center">
            <img src="${product.image}" alt="${product.name}" class="product-img img-fluid">
            <h5 class="mt-2">${product.name}</h5>
            <p>${product.price}</p>
            <button class="btn btn-primary" onclick="placeOrder(${product.id})">Buy Now</button>
        </div>
    `;
    productList.appendChild(productCard);
});

// Place Order
function placeOrder(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        orders.push(product);
        displayOrders();
        showOrderModal(product);
    }
}

// Display Orders with Total Price
function displayOrders() {
    orderList.innerHTML = ""; // Clear existing orders
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card'; // Apply list styling

        orderCard.innerHTML = `
            <img src="${order.image}" alt="${order.name}">
            <h5 class="mt-2">${order.name}</h5>
            <p>${order.price}</p>
            <button class="btn btn-danger" onclick="cancelOrder(${order.id})">Cancel</button>
        `;

        orderList.appendChild(orderCard); // Append to the order list
    });
    updateTotalPrice(); // Update the total price
}

// Update Total Price
function updateTotalPrice() {
    const total = orders.reduce((sum, order) => {
        const price = parseFloat(order.price.replace('$', ''));
        return sum + price;
    }, 0);
    totalPriceElement.innerText = `Total: $${total}`;
}

// Show Order Modal
function showOrderModal(product) {
    document.getElementById('order-product-name').innerText = `Order placed for: ${product.name}`;
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();
}

// Cancel Order
function cancelOrder(orderId) {
    orders = orders.filter(order => order.id !== orderId);
    displayOrders();
}
