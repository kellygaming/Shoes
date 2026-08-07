// Panier partagé (localStorage) — utilisé sur toutes les pages.
window.Cart = (function () {
  const STORAGE_KEY = 'kellyshoes_cart';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderAll();
  }

  function addItem(product, size) {
    const items = getCart();
    const existing = items.find(
      (i) => i.productId === product.id && i.size === size
    );

    if (existing) {
      existing.qty += 1;
    } else {
      items.push({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: Number(product.price),
        image: product.image_url,
        size: size,
        qty: 1
      });
    }
    saveCart(items);
  }

  function removeItem(productId, size) {
    const items = getCart().filter(
      (i) => !(i.productId === productId && i.size === size)
    );
    saveCart(items);
  }

  function updateQty(productId, size, qty) {
    const items = getCart();
    const item = items.find((i) => i.productId === productId && i.size === size);
    if (!item) return;
    item.qty = Math.max(1, qty);
    saveCart(items);
  }

  function clear() {
    saveCart([]);
  }

  function total() {
    return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function count() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function formatPrice(n) {
    return Math.round(n).toLocaleString('fr-FR') + ' ' + window.SHOES_CONFIG.CURRENCY;
  }

  function renderAll() {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = count();
    });

    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const emptyEl = document.getElementById('cart-empty');
    if (!list) return;

    const items = getCart();
    list.innerHTML = '';

    if (items.length === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
    } else {
      if (emptyEl) emptyEl.style.display = 'none';
      items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'cart-row';
        row.innerHTML = `
          <img src="${item.image}" alt="${item.name}" onerror="this.src='images/products/placeholder.svg'"/>
          <div class="cart-row-info">
            <p class="cart-row-name">${item.name}</p>
            <p class="cart-row-meta">${item.brand} · Pointure ${item.size}</p>
            <div class="cart-row-qty">
              <button type="button" data-qty-minus>−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-plus>+</button>
            </div>
          </div>
          <div class="cart-row-right">
            <span class="cart-row-price">${formatPrice(item.price * item.qty)}</span>
            <button type="button" class="cart-row-remove" data-remove>Retirer</button>
          </div>
        `;
        row.querySelector('[data-qty-minus]').addEventListener('click', () =>
          updateQty(item.productId, item.size, item.qty - 1)
        );
        row.querySelector('[data-qty-plus]').addEventListener('click', () =>
          updateQty(item.productId, item.size, item.qty + 1)
        );
        row.querySelector('[data-remove]').addEventListener('click', () =>
          removeItem(item.productId, item.size)
        );
        list.appendChild(row);
      });
    }

    if (totalEl) totalEl.textContent = formatPrice(total());
  }

  document.addEventListener('DOMContentLoaded', renderAll);

  return { getCart, addItem, removeItem, updateQty, clear, total, count, formatPrice, renderAll };
})();
