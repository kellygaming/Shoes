// Injecte le header, le menu mobile, le tiroir panier et le footer
// (évite de dupliquer ce markup identique sur chaque page).
(function () {
  function headerHTML(active) {
    const link = (href, label, key) =>
      `<a href="${href}" class="${active === key ? 'active' : ''}">${label}</a>`;
    return `
      <header class="site-header">
        <div class="container">
          <a href="index.html" class="logo"><span>KELLY</span><span class="dot">SHOES</span></a>
          <nav class="nav-links">
            ${link('index.html', 'Accueil', 'home')}
            ${link('boutique.html', 'Boutique', 'shop')}
            ${link('contact.html', 'Contact', 'contact')}
          </nav>
          <div class="header-actions">
            <button class="icon-btn" id="cart-toggle" aria-label="Voir le panier">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span class="cart-badge" data-cart-count>0</span>
            </button>
            <button class="burger" id="burger-toggle" aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  function mobileNavHTML(active) {
    return `
      <a href="index.html">Accueil</a>
      <a href="boutique.html">Boutique</a>
      <a href="contact.html">Contact</a>
      <a href="boutique.html" class="btn btn-primary btn-block">Voir la boutique</a>
    `;
  }

  function cartDrawerHTML() {
    return `
      <div class="cart-overlay" id="cart-overlay"></div>
      <aside class="cart-drawer" id="cart-drawer" aria-label="Panier">
        <div class="cart-head">
          <h3>Votre panier</h3>
          <button class="cart-close" id="cart-close" aria-label="Fermer">${window.Icons.get('close', 16)}</button>
        </div>
        <div class="cart-body">
          <p id="cart-empty">Votre panier est vide pour le moment.</p>
          <div id="cart-items"></div>
        </div>
        <div class="cart-foot">
          <div class="cart-total-row">
            <span>Total</span>
            <span id="cart-total">0 FCFA</span>
          </div>
          <a href="checkout.html" class="btn btn-primary btn-block">Passer la commande</a>
        </div>
      </aside>
    `;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="logo"><span>KELLY</span><span class="dot" style="color:var(--accent-soft)">SHOES</span></a>
              <p>Des sneakers premium sélectionnées pour le style et le confort. Livraison partout, paiement Mobile Money sécurisé.</p>
              <div class="footer-socials">
                <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
                <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="#" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
              </div>
            </div>
            <div>
              <h4>Boutique</h4>
              <ul>
                <li><a href="boutique.html">Tous les produits</a></li>
                <li><a href="boutique.html">Nouveautés</a></li>
                <li><a href="boutique.html">Collab limitées</a></li>
              </ul>
            </div>
            <div>
              <h4>Aide</h4>
              <ul>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="checkout.html">Paiement</a></li>
                <li><a href="index.html#faq">Livraison &amp; retours</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="https://wa.me/2250501310360" target="_blank" rel="noopener">WhatsApp : +225 05 01 31 03 60</a></li>
                <li><a href="mailto:info@shoes.com">info@shoes.com</a></li>
                <li>Abidjan, Côte d'Ivoire</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${year} Kelly Shoes. Tous droits réservés.</span>
            <span>Paiement sécurisé via MoneyFusion</span>
          </div>
        </div>
      </footer>
    `;
  }

  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function wireInteractions() {
    const burger = document.getElementById('burger-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (burger && mobileNav) {
      burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
      mobileNav.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => mobileNav.classList.remove('open'))
      );
    }

    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const openCart = () => {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
    };
    const closeCart = () => {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
    };
    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    window.openCartDrawer = openCart;
  }

  window.SiteChrome = {
    mount(active) {
      inject('header-root', headerHTML(active));
      const mobileNavEl = document.getElementById('mobile-nav');
      if (mobileNavEl) mobileNavEl.innerHTML = mobileNavHTML(active);
      inject('cart-root', cartDrawerHTML());
      inject('footer-root', footerHTML());
      wireInteractions();
      if (window.Cart) window.Cart.renderAll();
    }
  };
})();
