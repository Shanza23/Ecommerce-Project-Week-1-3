/* ===========================
   ECOMMERCE PROJECT - JS
   DevelopersHub Internship
   =========================== */

// --- COUNTDOWN TIMER ---
function startCountdown(endDate) {
  const timerEls = {
    h: document.getElementById('timer-h'),
    m: document.getElementById('timer-m'),
    s: document.getElementById('timer-s'),
    d: document.getElementById('timer-d'),
  };
  if (!timerEls.h) return;

  function update() {
    const now = new Date().getTime();
    const dist = endDate - now;
    if (dist < 0) return;
    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dist % (1000 * 60)) / 1000);
    if (timerEls.d) timerEls.d.textContent = String(d).padStart(2, '0');
    timerEls.h.textContent = String(h).padStart(2, '0');
    timerEls.m.textContent = String(m).padStart(2, '0');
    timerEls.s.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// --- TOAST NOTIFICATION ---
function showToast(message, icon = '✅') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- ADD TO CART ---
function addToCart(productName) {
  let count = parseInt(localStorage.getItem('cartCount') || '0') + 1;
  localStorage.setItem('cartCount', count);
  const badge = document.querySelector('.cart-badge');
  if (badge) badge.textContent = count;
  showToast(`"${productName}" added to cart!`);
}

// --- WISHLIST TOGGLE ---
function toggleWishlist(btn, productName) {
  btn.classList.toggle('wishlisted');
  if (btn.classList.contains('wishlisted')) {
    btn.textContent = '❤️';
    showToast(`"${productName}" added to wishlist!`, '❤️');
  } else {
    btn.textContent = '🤍';
    showToast(`"${productName}" removed from wishlist.`, '🗑️');
  }
}

// --- TABS (Product Detail) ---
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// --- SIZE SELECTOR ---
function initSizeSelector() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-options').querySelectorAll('.size-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// --- COLOR SELECTOR ---
function initColorSelector() {
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.color-options').querySelectorAll('.color-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// --- QUANTITY SELECTOR ---
function initQtySelector() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.qty-selector').querySelector('.qty-input');
      let val = parseInt(input.value) || 1;
      if (btn.dataset.action === 'plus') input.value = val + 1;
      if (btn.dataset.action === 'minus' && val > 1) input.value = val - 1;
    });
  });
}

// --- CATEGORY FILTER (Listing Page) ---
function initCategoryFilter() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// --- SEARCH BAR (Styled only, per task spec) ---
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  if (!searchInput || !searchBtn) return;
  searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (q) showToast(`Searching for "${q}"...`, '🔍');
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchBtn.click();
  });
}

// --- GALLERY THUMBNAILS ---
function initGallery() {
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// --- CART COUNT ON LOAD ---
function loadCartCount() {
  const count = localStorage.getItem('cartCount') || '0';
  const badge = document.querySelector('.cart-badge');
  if (badge) badge.textContent = count;
}

// --- VIEW TOGGLE (Grid/List) ---
function initViewToggle() {
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  const grid = document.querySelector('.products-grid');
  if (!gridBtn || !listBtn || !grid) return;

  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  });
  listBtn.addEventListener('click', () => {
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    grid.style.gridTemplateColumns = '1fr';
  });
}

// --- INIT ALL ---
document.addEventListener('DOMContentLoaded', () => {
  loadCartCount();
  initSearch();
  initTabs();
  initSizeSelector();
  initColorSelector();
  initQtySelector();
  initCategoryFilter();
  initGallery();
  initViewToggle();

  // Start countdown 3 days from now
  const endDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
  startCountdown(endDate);
});
