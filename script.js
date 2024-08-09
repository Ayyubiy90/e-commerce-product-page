document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.querySelector(".main-image img");
  const thumbnailImages = document.querySelectorAll(".thumbnail-images img");
  const quantityInput = document.querySelector(".quantity");
  const minusBtn = document.querySelector(".minus-btn");
  const plusBtn = document.querySelector(".plus-btn");
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  const cartIcon = document.querySelector(".cart-icon");
  const cartContainer = document.querySelector(".cart-container");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  const prevButton = document.querySelector(".prev-image");
  const nextButton = document.querySelector(".next-image");

  let cartItems = [];
  let quantity = 0;
  let currentImageIndex = 0;
  const images = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
  ];

  // Initialize
  updateCart();
  updateCartIcon();

  // Mobile menu toggle
  hamburgerMenu.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target)) {
      navMenu.classList.remove("show");
    }
  });

  // Image navigation for mobile
  prevButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    mainImage.src = images[currentImageIndex];
    updateThumbnailActive();
  });

  nextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    mainImage.src = images[currentImageIndex];
    updateThumbnailActive();
  });

  // Switch main image when thumbnail is clicked
  thumbnailImages.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      currentImageIndex = index;
      mainImage.src = images[currentImageIndex];
      updateThumbnailActive();
    });
  });

  // Update quantity
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
        image: images[currentImageIndex],
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
    cartContainer.style.display =
      cartContainer.style.display === "none" ? "block" : "none";
  });

  function updateThumbnailActive() {
    thumbnailImages.forEach((img, index) => {
      img.classList.toggle("active", index === currentImageIndex);
    });
  }

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
      const cartItemsContainer = document.createElement("div");
      cartItemsContainer.classList.add("cart-items");

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
        priceElement.textContent = `$${item.price.toFixed(2)} x ${
          item.quantity
        }`;

        const totalElement = document.createElement("p");
        totalElement.classList.add("total-price");
        totalElement.textContent = `$${(item.price * item.quantity).toFixed(
          2
        )}`;

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

        cartItemsContainer.appendChild(cartItemElement);
      });

      cartContainer.appendChild(cartItemsContainer);

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
});
