function gotoHomePage() {
    // Navigate to Home page
    window.location.href = "babyGiggles.html";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const orderStatusContainer = document.getElementById("order-status");
    const orders = JSON.parse(localStorage.getItem("orders")) || []; // Fetch orders from localStorage

    if (orders.length > 0) {
        // Sort orders by timestamp (id) in descending order (most recent first)
        orders.sort((a, b) => b.id - a.id);

        orders.forEach(order => {
            // Create order info container
            const orderInfo = document.createElement("div");
            orderInfo.classList.add("order-info");
            orderInfo.classList.add("fade-in");

            // Order ID and Product List
            const orderTitle = document.createElement("h2");
            orderTitle.innerHTML = `Order ID: ${order.id}`;
            orderInfo.appendChild(orderTitle);

            const productList = document.createElement("ul");
            order.products.forEach(product => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `${product.name} - $${product.price}`;
                productList.appendChild(listItem);
            });
            orderInfo.appendChild(productList);

            // Order Status Progress
            const trackingList = document.createElement("ul");
            trackingList.classList.add("tracking-list");

            order.tracking.forEach(update => {
                const listItem = document.createElement("li");
                listItem.classList.add("tracking-item");
                listItem.innerHTML = `<strong>${update.status}:</strong> ${update.date}`;
                trackingList.appendChild(listItem);
            });

            orderInfo.appendChild(trackingList);
            orderStatusContainer.appendChild(orderInfo);
        });
    } else {
        orderStatusContainer.innerHTML = "<p>No orders found. Please place an order first.</p>";
    }
});
