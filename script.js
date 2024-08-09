const mainImage = document.querySelector(".main-image img");
const thumbnailImages = document.querySelectorAll(".thumbnail-images img");
const quantityInput = document.querySelector(".quantity");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.createElement("div");
cartContainer.classList.add("cart-container");

let cartItems = [];

// When the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  updateCartIcon();
  document.querySelector(".nav-right").appendChild(cartContainer);
});

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
    const cartItem = {
      name: "Fall Limited Edition Sneakers",
      price: 125,
      quantity: quantity,
      image: "images/image-product-1-thumbnail.jpg",
    };
    cartItems.push(cartItem);
    updateCart();
    updateCartIcon();
    quantity = 0;
    quantityInput.textContent = quantity;
  }
});

// Toggle cart display
cartIcon.addEventListener("click", () => {
  cartContainer.classList.toggle("show");
});

// Update cart display
function updateCart() {
  cartContainer.innerHTML = "";

  const cartHeader = document.createElement("div");
  cartHeader.classList.add("cart-header");
  const cartTitle = document.createElement("h3");
  cartTitle.textContent = "Cart";
  cartHeader.appendChild(cartTitle);

  cartContainer.appendChild(cartHeader);

  if (cartItems.length === 0) {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "Your cart is empty.";
    cartContainer.appendChild(emptyCartMessage);
  } else {
    cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");

      const thumbnailElement = document.createElement("img");
      thumbnailElement.src = item.image;
      thumbnailElement.alt = "Product thumbnail";
      thumbnailElement.classList.add("cart-thumbnail");

      const detailsElement = document.createElement("div");
      detailsElement.classList.add("cart-item-details");

      const nameElement = document.createElement("p");
      nameElement.textContent = item.name;

      const priceElement = document.createElement("p");
      priceElement.textContent = `$${item.price.toFixed(2)} x ${item.quantity}`;

      const totalElement = document.createElement("p");
      totalElement.classList.add("total-price");
      totalElement.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML =
        '<img src="images/icon-delete.svg" alt="Delete icon">';
      deleteBtn.addEventListener("click", () => {
        cartItems.splice(index, 1);
        updateCart();
        updateCartIcon();
      });

      detailsElement.appendChild(nameElement);
      detailsElement.appendChild(priceElement);
      detailsElement.appendChild(totalElement);
      cartItemElement.appendChild(thumbnailElement);
      cartItemElement.appendChild(detailsElement);
      cartItemElement.appendChild(deleteBtn);

      cartContainer.appendChild(cartItemElement);
    });

    const checkoutBtn = document.createElement("button");
    checkoutBtn.classList.add("checkout-btn");
    checkoutBtn.textContent = "Checkout";
    cartContainer.appendChild(checkoutBtn);
  }

  updateCartIcon();
}

function updateCartIcon() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartIconElement = document.querySelector(".cart-icon");
  let cartCountElement = cartIconElement.querySelector(".cart-count");

  if (!cartCountElement) {
    cartCountElement = document.createElement("span");
    cartCountElement.classList.add("cart-count");
    cartIconElement.appendChild(cartCountElement);
  }

  if (totalItems > 0) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = "block";
  } else {
    cartCountElement.style.display = "none";
  }
}

// Add styles for the cart container
const styles = document.createElement("style");
styles.innerHTML = `
  .cart-container {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--color-white);
    width: 360px;
    max-height: 500px;
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: 0 20px 50px -20px var(--color-black-75);
    padding: 1.5rem;
    display: none;
    z-index: 100;
  }

  .cart-container.show {
    display: block;
  }

  .cart-header {
    border-bottom: 1px solid var(--color-grayish-blue);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .cart-header h3 {
    font-weight: var(--font-weight-bold);
  }

  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .cart-thumbnail {
    width: 70px;
    height: 70px;
    border-radius: 5px;
  }

  .cart-item-details {
    flex-grow: 1;
    margin-left: 1rem;
  }

  .cart-item-details p {
    margin-bottom: 0.5rem;
    font-size: 15px;
  }

  .total-price {
    font-weight: var(--font-weight-bold);
  }

  .delete-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .delete-btn img {
    width: 16px;
    height: 16px;
  }

  .checkout-btn {
    width: 100%;
    background-color: var(--color-orange);
    color: var(--color-white);
    font-weight: var(--font-weight-bold);
    padding: 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .checkout-btn:hover {
    background-color: hsl(26, 100%, 65%);
  }
`;
document.head.appendChild(styles);
