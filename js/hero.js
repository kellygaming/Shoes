// Hero de la page d'accueil : carrousel produit (flèches) + thème de couleur.
(function () {
  // Ambiances du héros. Le rose de la marque est l'état par défaut ; les
  // autres restent des fonds sombres et sobres pour que la chaussure
  // détourée ressorte sans concurrencer l'accent rose du reste du site.
  const THEMES = [
    { h1: '#d6336c', h2: '#7d1839', word: 'STYLE' },
    { h1: '#1f2430', h2: '#0b0d12', word: 'FLEX' },
    { h1: '#17624a', h2: '#0b3b2c', word: 'STEP' },
    { h1: '#1e3a8a', h2: '#111c44', word: 'JUMP' }
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
    const dotsWrap = document.getElementById('hero-dots');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const addBtn = document.getElementById('hero-add-btn');

    // Thème de couleur (décoratif, indépendant du produit affiché)
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

    let products = [];
    let currentIndex = 0;
    let selectedSize = null;

    function renderDots() {
      dotsWrap.innerHTML = '';
      products.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => show(i));
        dotsWrap.appendChild(dot);
      });
    }

    // Beaucoup de noms de produits contiennent déjà la marque ("Air Jordan 1
    // Mid SE" pour la marque Jordan). Préfixer systématiquement donnerait
    // "Jordan Air Jordan 1 Mid SE".
    function fullTitle(product) {
      const name = product.name || '';
      const brand = product.brand || '';
      if (!brand || name.toLowerCase().includes(brand.toLowerCase())) return name;
      return brand + ' ' + name;
    }

    function renderProduct() {
      const product = products[currentIndex];
      nameEl.textContent = fullTitle(product);
      priceEl.textContent = window.ProductUI.formatPrice(product.price);

      const map = window.ProductUI.sizeMap(product);
      selectedSize = null;
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

      renderDots();
    }

    function show(index) {
      if (products.length === 0) return;
      currentIndex = (index + products.length) % products.length;
      const product = products[currentIndex];

      imgEl.classList.add('swap');
      setTimeout(() => {
        imgEl.src = product.image_url;
        imgEl.alt = product.name;
        imgEl.classList.remove('swap');
      }, 180);

      renderProduct();
    }

    prevBtn.addEventListener('click', () => show(currentIndex - 1));
    nextBtn.addEventListener('click', () => show(currentIndex + 1));

    addBtn.addEventListener('click', () => {
      const product = products[currentIndex];
      if (!product) return;
      const map = window.ProductUI.sizeMap(product);
      const size = selectedSize || window.SHOES_CONFIG.SIZES.find((s) => map[s]);
      if (!size) return;
      window.Cart.addItem(product, size);
      if (window.openCartDrawer) window.openCartDrawer();
    });

    try {
      const all = await window.SupabaseREST.fetchProducts();
      // Le carrousel n'affiche que des visuels détourés (fond transparent) : .webp uniquement.
      products = all.filter((p) => p.image_url && p.image_url.endsWith('.webp'));
      if (products.length === 0) return;

      const featuredIndex = products.findIndex((p) => p.is_featured);
      currentIndex = featuredIndex >= 0 ? featuredIndex : 0;
      imgEl.src = products[currentIndex].image_url;
      imgEl.alt = products[currentIndex].name;
      renderProduct();
    } catch (err) {
      console.error('Erreur chargement du carrousel héros', err);
    }
  }

  document.addEventListener('DOMContentLoaded', initHero);
})();
