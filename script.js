const mainImage = document.querySelector(".main-image img");
const thumbnailImages = document.querySelectorAll(".thumbnail-images img");
const quantityInput = document.querySelector(".quantity");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const addToCartBtn = document.querySelector(".add-to-cart-btn");

// Switch main image when thumbnail is clicked
thumbnailImages.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    const imageUrl = `images/image-product-${index + 1}.jpg`;
    mainImage.src = imageUrl;
    thumbnailImages.forEach((img) => img.classList.remove("active"));
    thumbnail.classList.add("active");
  });
});

// Update quantity
let quantity = 0;
minusBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityInput.textContent = quantity;
  }
});

plusBtn.addEventListener("click", () => {
  quantity++;
  quantityInput.textContent = quantity;
});

// Add to cart
addToCartBtn.addEventListener("click", () => {
  if (quantity > 0) {
    // Simulate adding to cart
    alert(`You added ${quantity} item(s) to the cart!`);
    quantity = 0;
    quantityInput.textContent = quantity;
  }
});
