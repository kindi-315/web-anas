// Visitor count example (random count for demo)
const visitorCount = document.getElementById('visitor-count');
let visitors = 1000 + Math.floor(Math.random() * 1000);
visitorCount.textContent = `Visitors: ${visitors}`;

// Cart Logic
const cartBox = document.getElementById('cart-box');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartIcon = document.getElementById('cart-icon');
const closeCartBtn = cartBox.querySelector('.close-btn');

let cart = [];

function toggleCart() {
  cartBox.classList.toggle('active');
  cartBox.setAttribute('aria-hidden', !cartBox.classList.contains('active'));
}

cartIcon.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

// Add to Cart Buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
  button.addEventListener('click', e => {
    const productEl = e.target.closest('.product');
    const name = productEl.dataset.name;
    const price = parseFloat(productEl.dataset.price);
    const quantityInput = productEl.querySelector('input[type="number"]');
    let quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
      alert('Please enter a valid quantity (1 or more).');
      return;
    }

    addToCart(name, price, quantity);
  });
});

function addToCart(name, price, quantity) {
  // Check if item exists
  const existingItemIndex = cart.findIndex(item => item.name === name);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  updateCartUI();
  toggleCart();
}

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartCount.textContent = totalItems;
}

// Contact form validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  let valid = true;

  // Reset errors
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  formSuccess.textContent = '';

  // Validate Name
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Name must be at least 2 characters.';
    valid = false;
  }

  // Validate Email
  if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email.';
    valid = false;
  }

  // Validate Message
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message must be at least 10 characters.';
    valid = false;
  }

  if (valid) {
    formSuccess.textContent = 'Thank you for contacting us! We will respond shortly.';
    contactForm.reset();
  }
});

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
