// Product Data with images
const products = [
    { id: 1, name: "Red Shirt", price: 15, category: "boys", image: "images/b_shirt.png" },
    { id: 2, name: "Shirts set", price: 25, category: "boys", image: "images/b_shirt_1.png" },
    { id: 3, name: "Party suite blue", price: 20, category: "boys", image: "images/b_partywear.png" },
    { id: 4, name: "Party suite black", price: 30, category: "boys", image: "images/b_partywear_1.png" },
    { id: 5, name: "Yellow Hoodie", price: 30, category: "boys", image: "images/b_hoodie_1.png" },
    { id: 6, name: "Multi color Hoodie", price: 10, category: "boys", image: "images/b_hoodie.png" },
    { id: 7, name: "Navi Cap", price: 10, category: "boys", image: "images/b_cap.png" },
    { id: 8, name: "Teddy Cap", price: 10, category: "boys", image: "images/b_cap_1.png" },
    { id: 9, name: "Embroidered Lehenga Set - Pink", price: 25, category: "girls", image: "images/G_8.png" },
    { id: 10, name: "Embroidered Lehenga Set - Red", price: 30, category: "girls", image: "images/G_1.png" },
    { id: 11, name: "Cats & Paws Night Suit", price: 15, category: "girls", image: "images/G_2.png" },
    { id: 12, name: "Night Suit Marine ", price: 15, category: "girls", image: "images/G_3.png" },
    { id: 13, name: "Minnie Mouse Pack Of 2", price: 12, category: "girls", image: "images/G_4.png" },
    { id: 14, name: "Marie Graphics Pack of 2 ", price: 15, category: "girls", image: "images/G_5.png" },
    { id: 15, name: "Text Print Pack of 5", price: 15, category: "girls", image: "images/G_6.png" },
    { id: 16, name: "Sweatshirt With Tie & Dye Print", price: 12, category: "girls", image: "images/G_7.png" },
    { id: 17, name: "3 in 1 Swing and Slide ", price: 10, category: "toys", image: "images/T_1.png" },
    { id: 18, name: "Baby Kick and Play Piano Blue", price: 15, category: "toys", image: "images/T_2.png" },
    { id: 19, name: "Tiger Free Wheel Car", price: 20, category: "toys", image: "images/T_3.png" },
    { id: 20, name: "Push and Go Giraffe on Wheel Toy", price: 35, category: "toys", image: "images/T_4.png" },
    { id: 21, name: "Magnetic Building Sticks & Balls ", price: 20, category: "toys", image: "images/T_5.png" },
    { id: 22, name: "8 Pcs Montessori Stacking Cup", price: 20, category: "toys", image: "images/T_6.png" },
    { id: 23, name: "Toy Kitchen Set", price: 20, category: "toys", image: "images/T_7.png" },
    { id: 24, name: "Zip Zap Zoom Racing Tower Track", price: 20, category: "toys", image: "images/T_8.png" },
    { id: 26, name: "Baby Blanket", price: 25, category: "winter-wear", image: "images/W_1.png" },
    { id: 26, name: "Snow Boots", price: 45, category: "winter-wear", image: "images/W_2.png" },
    { id: 27, name: "Baby Socks", price: 5, category: "winter-wear", image: "images/W_3.png" },
    { id: 28, name: "Baby Jacket", price: 40, category: "winter-wear", image: "images/W_4.png" }
];

function openViewCartPage() {
    // Navigate to a cart page
    window.location.href = "babyGigglesCart.html";
  }

function gotoHomePage() {
    // Navigate to a Home page
    window.location.href = "babyGiggles.html";
  }


  function gotoIndexPage() {
    // Navigate to a Home page
    window.location.href = "../../index.html";
  }

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const defaultMessage = document.getElementById("default-message");
    const productsContainer = document.getElementById("products-container");

    // Retrieve the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.category;
            defaultMessage.style.display = "none";
            productsContainer.style.display = "grid";
            displayProducts(selectedCategory);
        });
    });

    function displayProducts(category) {
        productsContainer.innerHTML = ""; // Clear previous products

        const filteredProducts = products.filter(product =>
            category === "all" ? true : product.category === category
        );

        // Limit to the first 20 products
        filteredProducts.slice(0, 20).forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.dataset.id = product.id;

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productDiv.querySelector(".add-to-cart").addEventListener("click", () => {
                // Add the product to the cart, including quantity
                addToCart(product);
                alert(`${product.name} has been added to your cart!`);
            });

            productsContainer.appendChild(productDiv);
        });
    }

    function addToCart(product) {
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1; // If product exists, increment the quantity
        } else {
            // Add a new product with a quantity of 1
            cart.push({ ...product, quantity: 1 });
        }

        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }
});

// Array to hold the image sources
const images = [
    "images/Offer_1.png", 
    "images/Offer_2.png", 
    "images/Offer_3.png", 
    "images/Offer_4.png", 
    "images/Offer_5.png"
];

let currentIndex = 1;

// Get the image element
const sliderImg = document.getElementById("slider-img");

// Function to change the image
function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;  // Loop back to the first image after the last one
    sliderImg.src = images[currentIndex];
}

// Change the image every 5 seconds (5000 milliseconds)
setInterval(changeImage, 2000); // 5000ms = 5 seconds

