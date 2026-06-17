/* ==========================================================================
   AloeAmla JavaScript Logic & Interactivity
   ========================================================================== */

// 1. Made Products Detailed Data
const productsData = {
  'soap': {
    name: 'Gentle Aloe Vera Soap',
    price: 'Rs. 120 (100g)',
    tag: 'Aloe Vera',
    icon: 'fa-soap',
    desc: 'Crafted with fresh cold-pressed organic Aloe Vera pulp and virgin coconut oil. Gently cleanses the skin while retaining natural moisture, making it ideal for daily bathing and sensitive skin types.',
    benefits: [
      'Gently cleanses without stripping natural oils',
      'Provides a rich, creamy, and soothing lather',
      '100% natural, free from parabens and sulfates'
    ]
  },
  'facewash': {
    name: 'Aloe Vera Nourishing Facewash',
    price: 'Rs. 150 (150ml)',
    tag: 'Aloe Vera',
    icon: 'fa-pump-soap',
    desc: 'A gentle face wash formulated with fresh organic Aloe Vera juice, neem leaf extracts, and essential oils. It effectively cleanses pores, removes oil and grime, and helps prevent acne while maintaining skin hydration.',
    benefits: [
      'Removes deep impurities and excess sebum',
      'Soothes irritated skin and prevents acne breakouts',
      'Leaves the face feeling fresh, clean, and hydrated'
    ]
  },
  'gel': {
    name: '99% Pure Hydrating Aloe Gel',
    price: 'Rs. 180 (200g)',
    tag: 'Aloe Vera',
    icon: 'fa-wind',
    desc: 'Extracted directly from the inner flesh of our premium organic Aloe Vera stalks. This multi-use gel provides instant cooling relief for sunburns, minor skin rashes, insect bites, and works as an excellent oil-free moisturizer.',
    benefits: [
      'Provides instant cooling and soothing relief',
      'Acts as a lightweight, oil-free daily moisturizer',
      'Excellent for hair conditioning and scalp nourishment'
    ]
  },
  'cream': {
    name: 'Deep Hydration Aloe Cream',
    price: 'Rs. 220 (50g)',
    tag: 'Aloe Vera',
    icon: 'fa-mortar-pestle',
    desc: 'A luxurious night cream blending organic Aloe Vera extracts, cold-pressed almond oil, and vitamin E. Specially crafted to deeply hydrate, repair dry skin layers overnight, and restore a youthful, natural glow.',
    benefits: [
      'Deeply nourishes and locks in skin moisture',
      'Repairs dry and damaged skin layers overnight',
      'Improves skin texture, elasticity, and glow'
    ]
  },
  'powder': {
    name: 'Sun-Dried Amla Powder',
    price: 'Rs. 160 (250g)',
    tag: 'Amla',
    icon: 'fa-mortar-pestle',
    desc: 'Made from fresh Amla fruits grown in our integrated orchards. The fruits are carefully sliced, sun-dried, and stone-ground to preserve their high Vitamin C content, active antioxidants, and natural digestive properties.',
    benefits: [
      'Rich source of natural Vitamin C and dietary fiber',
      'Boosts immunity and improves gut health/digestion',
      'Supports glowing skin and strong hair roots when consumed daily'
    ]
  },
  'hair-oil': {
    name: 'Revitalizing Amla Hair Oil',
    price: 'Rs. 250 (200ml)',
    tag: 'Amla',
    icon: 'fa-bottle-droplet',
    desc: 'An authentic Ayurvedic recipe using cold-pressed sesame oil infused with fresh Amla extract and local herbs. It deeply penetrates the hair follicles to strengthen roots, prevent premature greying, and add natural shine.',
    benefits: [
      'Strengthens hair roots and minimizes hair fall',
      'Prevents premature greying and dry scalp dandruff',
      'Adds volume, bounce, and a healthy dark shine'
    ]
  },
  'murabba': {
    name: 'Sweet Organic Amla Murabba',
    price: 'Rs. 320 (500g)',
    tag: 'Amla',
    icon: 'fa-bowl-food',
    desc: 'A delicious traditional Indian preserve made with large, handpicked Amla fruits boiled in a clean organic raw cane sugar syrup. A delightful sweet treat that acts as a powerful digestive tonic and daily health supplement.',
    benefits: [
      'Traditional recipe loaded with bioactive Vitamin C',
      'Excellent digestive aid and general gut cleanser',
      'Improves energy levels and general well-being'
    ]
  }
};

// Current active product id in modal context
let activeModalProductId = '';
let cartItems = [];

function updateCartCounter() {
  const count = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartButton = document.getElementById('cart-button-home');
  const badge = cartButton?.querySelector('.cart-count');

  if (badge) {
    badge.innerText = count;
  }

  if (cartButton) {
    cartButton.title = `Cart items: ${count}`;
  }
}

function addToCart(productId) {
  const product = productsData[productId];
  if (!product) return;

  const existing = cartItems.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({ id: productId, name: product.name, qty: 1, price: product.price });
  }

  updateCartCounter();
  triggerToast('Added to Cart', `${product.name} has been added to your cart.`);
}

function increaseCartQuantity(productId) {
  const item = cartItems.find(entry => entry.id === productId);
  if (!item) return;

  item.qty += 1;
  updateCartCounter();
  populateCartItems();
  triggerToast('Quantity Updated', `${item.name} quantity is now ${item.qty}.`);
}

function populateCartItems() {
  const list = document.getElementById('cart-items-list');
  const totalCount = document.getElementById('cart-total-count');

  if (!list) return;

  if (cartItems.length === 0) {
    list.innerHTML = '<p class="empty-cart-text">Your cart is currently empty.</p>';
  } else {
    list.innerHTML = cartItems.map(item => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <span>Qty: ${item.qty}</span>
        </div>
        <div class="cart-item-actions">
          <button type="button" class="btn btn-sm btn-outline cart-add-btn" onclick="increaseCartQuantity('${item.id}')">
            + Add
          </button>
          <span>${item.price}</span>
        </div>
      </div>
    `).join('');
  }

  if (totalCount) {
    totalCount.innerText = `Items: ${cartItems.reduce((sum, item) => sum + item.qty, 0)}`;
  }
}

function openCartModal() {
  populateCartItems();
  updateCartCounter();
  openModal('cart-modal');
}

function checkoutCart() {
  if (cartItems.length === 0) {
    triggerToast('Cart Empty', 'Add items before checkout.');
    return;
  }

  cartItems = [];
  populateCartItems();
  updateCartCounter();
  closeModal('cart-modal');
  triggerToast('Checkout Ready', 'Your cart has been cleared and is ready for order submission.');
}

// 2. Navigation & Hash-based Routing
function handleRouting() {
  const hash = window.location.hash || '#home';
  const sections = document.querySelectorAll('.view-section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let targetSectionExists = false;

  sections.forEach(section => {
    if ('#' + section.id === hash) {
      section.classList.add('active');
      targetSectionExists = true;
    } else {
      section.classList.remove('active');
    }
  });

  // Default to home if hash doesn't match
  if (!targetSectionExists) {
    const homeSection = document.getElementById('home');
    if (homeSection) homeSection.classList.add('active');
    window.location.hash = '#home';
  }

  // Set active class on navbar links
  navLinks.forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Scroll to top on page switch
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile navigation menu if open
  const nav = document.querySelector('.nav');
  if (nav && nav.classList.contains('active')) {
    nav.classList.remove('active');
  }
}

// Listen for routing triggers
window.addEventListener('hashchange', handleRouting);
window.addEventListener('load', handleRouting);

// Toggle Mobile Menu
const menuToggleBtn = document.getElementById('menu-toggle-btn');
if (menuToggleBtn) {
  menuToggleBtn.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
  });
}

function applyTheme(theme) {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle-btn');
  const isDark = theme === 'dark';

  body.classList.toggle('dark-theme', isDark);

  if (themeToggle) {
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i> Light'
      : '<i class="fa-solid fa-moon"></i> Dark';
  }

  localStorage.setItem('siteTheme', theme);
}

function toggleTheme() {
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('siteTheme') || 'light';
  applyTheme(savedTheme);
});

// 3. Modal Functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable page scrolling
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable page scrolling
  }
}

// Close modal when clicking outside the modal container
window.addEventListener('click', (event) => {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// 4. Open Buy/Sell Modal
function openTradingModal(action = 'buy', preSelectedProduct = '') {
  // Set action inside hidden input
  const tradeAction = document.getElementById('trade-action');
  if (tradeAction) tradeAction.value = action;

  // Set Title & Button text
  const title = document.getElementById('trading-modal-title');
  const submitBtn = document.getElementById('trade-submit-btn');
  
  if (action === 'buy') {
    if (title) title.innerText = 'Buy Raw Materials';
    if (submitBtn) submitBtn.innerText = 'Submit Purchase Order';
  } else {
    if (title) title.innerText = 'Sell Your Raw Material';
    if (submitBtn) submitBtn.innerText = 'Submit Sell Offer';
  }

  // Pre-select raw product if passed
  const productSelect = document.getElementById('trade-product');
  if (productSelect && preSelectedProduct) {
    productSelect.value = preSelectedProduct;
  } else if (productSelect) {
    productSelect.selectedIndex = 0;
  }

  // Open the modal
  openModal('trading-modal');
}

// 5. Show Product Details Modal
function showProductDetails(productId) {
  const product = productsData[productId];
  if (!product) return;

  activeModalProductId = productId;

  // Populate dynamic elements
  document.getElementById('p-modal-name').innerText = product.name;
  document.getElementById('p-modal-price').innerText = product.price;
  document.getElementById('p-modal-tag').innerText = product.tag;
  document.getElementById('p-modal-description').innerText = product.desc;

  // Update Icon
  const iconElement = document.getElementById('p-modal-icon');
  if (iconElement) {
    iconElement.className = `fa-solid ${product.icon}`;
  }

  // Update benefits list
  const benefitsContainer = document.getElementById('p-modal-benefits');
  if (benefitsContainer) {
    benefitsContainer.innerHTML = '';
    product.benefits.forEach(benefit => {
      const li = document.createElement('li');
      li.innerText = benefit;
      benefitsContainer.appendChild(li);
    });
  }

  // Configure action buttons in details modal
  const sellBtn = document.getElementById('p-modal-sell-btn');
  if (sellBtn) {
    sellBtn.onclick = () => {
      addToCart(productId);
      closeModal('product-detail-modal');
    };
  }

  openModal('product-detail-modal');
}

// Scroll to Farmer Guidance Form in Services tab
function scrollToFarmerForm() {
  window.location.hash = '#services';
  
  // Wait a small duration for routing animation to finish, then scroll
  setTimeout(() => {
    const farmerSection = document.getElementById('farmer-partnership-section');
    if (farmerSection) {
      farmerSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

// 6. Form Submissions & Toast Alerts
function triggerToast(title, desc) {
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');

  if (toast && toastTitle && toastDesc) {
    toastTitle.innerText = title;
    toastDesc.innerText = desc;
    toast.classList.add('active');

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
}

// Form Handlers
// A. Trading Form (Buy / Sell)
const tradingForm = document.getElementById('trading-form');
if (tradingForm) {
  tradingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const action = document.getElementById('trade-action').value;
    const name = document.getElementById('trade-name').value;
    const contact = document.getElementById('trade-contact').value;
    const email = document.getElementById('trade-email').value;
    const address = document.getElementById('trade-address').value;
    const product = document.getElementById('trade-product').value;
    const qty = document.getElementById('trade-qty').value;

    closeModal('trading-modal');
    tradingForm.reset();

    const title = action === 'buy' ? 'Order Submitted!' : 'Offer Submitted!';
    const desc = action === 'buy' 
      ? `Thank you ${name}. Our logistics manager will call you at ${contact} regarding shipping ${qty}kg of Raw ${product}.`
      : `Thank you ${name}. Our team will call you at ${contact} to inspect and purchase your ${qty}kg of Raw ${product}.`;

    triggerToast(title, desc);
  });
}

// B. Farmer Partnership Form
const farmerForm = document.getElementById('farmer-partnership-form-element');
if (farmerForm) {
  farmerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('farmer-name').value;
    const phone = document.getElementById('farmer-phone').value;
    const land = document.getElementById('farmer-land').value;
    const location = document.getElementById('farmer-location').value;

    farmerForm.reset();

    triggerToast(
      'Partnership Applied!',
      `Hello ${name}, our agricultural advisor will call you at ${phone} to arrange a free visit to your ${land}-acre land in ${location}.`
    );
  });
}

// C. General Contact Form
const contactForm = document.getElementById('general-contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;

    contactForm.reset();

    triggerToast(
      'Message Sent!',
      `Dear ${name}, thank you for contacting AloeAmla. We will reach you at ${phone} within 24 hours.`
    );
  });
}
