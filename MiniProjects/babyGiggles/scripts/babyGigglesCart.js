function openOrderTrackingPage() {
    // Navigate to a order trackin page
    window.location.href = "orderTracking.html";
  }

function gotoHomePage() {
    // Navigate to a home page
    window.location.href = "babyGiggles.html";
  }

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutSection = document.getElementById("checkout-section");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Display cart items
    if (cart.length > 0) {
        cart.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("cart-item");

            productDiv.innerHTML = `
                <img src="${product.image}"  style="width: 50px; height: 50px; object-fit: cover;" alt="${product.name}" =>
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
            `;

            cartItemsContainer.appendChild(productDiv);
        });
        checkoutSection.style.display = "block";
    } else {
        cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
    }

    // Proceed to checkout functionality
    checkoutBtn.addEventListener("click", () => {
        const proceed = confirm("Only Cash On Delivery (COD) is available. Do you want to proceed with COD?");
        if (proceed) {
            placeOrder();
        }
    });

    function placeOrder() {
    
        // Dummy order details
        const order = {
            id: new Date().getTime(),
            products: cart,
            status: "Order successfully placed",
            tracking: [
                { status: "Order successfully placed", date: "2025-01-01" },
                { status: "Order shipped", date: "2025-01-03" },
                { status: "Order in transit", date: "2025-01-05" },
                { status: "Ready to pickup", date: "2025-01-06" },
                { status: "Delivered", date: "2025-01-08" },
            ],
        };
    
        const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
        previousOrders.push(order);
    
        // Save updated orders to localStorage
        localStorage.setItem("orders", JSON.stringify(previousOrders));

        cartItemsContainer.innerHTML = "<p>Order successfully placed!</p>";
        checkoutSection.style.display = "none";
        
        localStorage.removeItem("cart");
    }
    
});
