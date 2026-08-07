// Hero de la page d'accueil : produit vedette + swatches de couleur + pointures.
(function () {
  const THEMES = [
    { h1: '#7c3aed', h2: '#4338ca', word: 'STYLE' },
    { h1: '#fb7185', h2: '#f97316', word: 'FLEX' },
    { h1: '#22c55e', h2: '#0d9488', word: 'STEP' },
    { h1: '#ec4899', h2: '#a855f7', word: 'GLOW' }
  ];

  function applyTheme(hero, wordEl, theme) {
    hero.style.setProperty('--h1', theme.h1);
    hero.style.setProperty('--h2', theme.h2);
    wordEl.textContent = theme.word;
  }

  async function initHero() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const wordEl = document.getElementById('hero-word');
    const swatchWrap = document.getElementById('hero-swatches');
    const sizeWrap = document.getElementById('hero-sizes');
    const imgEl = document.getElementById('hero-shoe-img');
    const nameEl = document.getElementById('hero-product-name');
    const priceEl = document.getElementById('hero-product-price');
    const shopBtn = document.getElementById('hero-shop-btn');

    THEMES.forEach((theme, i) => {
      const btn = document.createElement('button');
      btn.className = 'swatch' + (i === 0 ? ' active' : '');
      btn.style.background = `linear-gradient(135deg, ${theme.h1}, ${theme.h2})`;
      btn.setAttribute('aria-label', 'Thème ' + theme.word);
      btn.addEventListener('click', () => {
        swatchWrap.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
        btn.classList.add('active');
        applyTheme(hero, wordEl, theme);
      });
      swatchWrap.appendChild(btn);
    });
    applyTheme(hero, wordEl, THEMES[0]);

    try {
      const products = await window.SupabaseREST.fetchProducts();
      if (!products.length) return;
      const featured = products.find((p) => p.is_featured) || products[0];

      imgEl.src = featured.image_url;
      imgEl.alt = featured.name;
      nameEl.textContent = featured.brand + ' — ' + featured.name;
      priceEl.textContent = window.ProductUI.formatPrice(featured.price);
      if (shopBtn) shopBtn.href = 'boutique.html#' + featured.slug;

      const map = window.ProductUI.sizeMap(featured);
      let selectedSize = null;
      sizeWrap.innerHTML = '';
      window.SHOES_CONFIG.SIZES.forEach((s) => {
        const available = !!map[s];
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'size-pill';
        btn.textContent = s;
        if (!available) btn.disabled = true;
        btn.addEventListener('click', () => {
          sizeWrap.querySelectorAll('.size-pill').forEach((b) => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedSize = s;
        });
        sizeWrap.appendChild(btn);
      });

      const addBtn = document.getElementById('hero-add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          const size = selectedSize || window.SHOES_CONFIG.SIZES.find((s) => map[s]);
          if (!size) return;
          window.Cart.addItem(featured, size);
          if (window.openCartDrawer) window.openCartDrawer();
        });
      }
    } catch (err) {
      console.error('Erreur chargement du produit vedette', err);
    }
  }

  document.addEventListener('DOMContentLoaded', initHero);
})();
