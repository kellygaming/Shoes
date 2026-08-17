// Rendu des cartes produits (accueil + boutique), branché sur Supabase.
window.ProductUI = (function () {
  function formatPrice(n) {
    return Math.round(n).toLocaleString('fr-FR') + ' ' + window.SHOES_CONFIG.CURRENCY;
  }

  function sizeMap(product) {
    const map = {};
    (product.product_sizes || []).forEach((s) => {
      map[s.size] = s.in_stock && s.quantity > 0;
    });
    return map;
  }

  function isSoldOut(product) {
    const map = sizeMap(product);
    return window.SHOES_CONFIG.SIZES.every((s) => !map[s]);
  }

  function cardHTML(product) {
    const map = sizeMap(product);
    const soldOut = isSoldOut(product);
    const sizesHTML = window.SHOES_CONFIG.SIZES.map((s) => {
      const available = !!map[s];
      return `<button type="button" class="mini-size" data-size="${s}" ${
        available ? '' : 'disabled'
      }>${s}</button>`;
    }).join('');

    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-media">
          ${soldOut ? '<span class="product-tag out">Rupture de stock</span>' : ''}
          ${!soldOut && product.compare_at_price ? '<span class="product-tag">Promo</span>' : ''}
          <img src="${product.image_url}" alt="${product.name}" loading="lazy"
               onerror="this.src='images/products/placeholder.svg'"/>
        </div>
        <div class="product-body">
          <span class="product-brand">${product.brand}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-sizes">${sizesHTML}</div>
          <div class="product-price">
            ${formatPrice(product.price)}
            ${product.compare_at_price ? `<span style="text-decoration:line-through;color:var(--muted);font-size:0.8rem;font-family:var(--font-body);margin-left:6px;">${formatPrice(product.compare_at_price)}</span>` : ''}
          </div>
          <button type="button" class="btn btn-primary btn-block product-add" ${soldOut ? 'disabled' : ''}>
            ${soldOut ? 'Indisponible' : 'Ajouter au panier'}
          </button>
        </div>
      </article>
    `;
  }

  function wireCard(el, product) {
    let selectedSize = null;
    const sizeButtons = el.querySelectorAll('.mini-size');
    const addBtn = el.querySelector('.product-add');

    sizeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        sizeButtons.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = Number(btn.dataset.size);
      });
    });

    if (addBtn && !addBtn.disabled) {
      addBtn.addEventListener('click', () => {
        if (!selectedSize) {
          const firstAvailable = el.querySelector('.mini-size:not(:disabled)');
          if (firstAvailable) {
            firstAvailable.classList.add('selected');
            selectedSize = Number(firstAvailable.dataset.size);
          } else {
            return;
          }
        }
        window.Cart.addItem(product, selectedSize);
        addBtn.textContent = 'Ajouté';
        setTimeout(() => (addBtn.textContent = 'Ajouter au panier'), 1200);
        if (window.openCartDrawer) window.openCartDrawer();
      });
    }
  }

  async function mountGrid(containerId, options) {
    options = options || {};
    const container = document.getElementById(containerId);
    if (!container) return [];
    container.innerHTML = '<p class="state-msg">Chargement des produits…</p>';

    try {
      let products = await window.SupabaseREST.fetchProducts();
      if (options.filter) products = products.filter(options.filter);
      if (options.limit) products = products.slice(0, options.limit);

      if (products.length === 0) {
        container.innerHTML = '<p class="state-msg">Aucun produit disponible pour le moment.</p>';
        return [];
      }

      container.innerHTML = products.map(cardHTML).join('');
      container.querySelectorAll('.product-card').forEach((el) => {
        const product = products.find((p) => p.id === el.dataset.productId);
        wireCard(el, product);
      });
      return products;
    } catch (err) {
      console.error(err);
      container.innerHTML =
        '<p class="state-msg">Impossible de charger les produits pour le moment. Réessayez plus tard.</p>';
      return [];
    }
  }

  return { mountGrid, formatPrice, sizeMap, isSoldOut, cardHTML };
})();
