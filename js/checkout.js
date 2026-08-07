// Flux de paiement MoneyFusion — adapté du flux e-commerce direct
// (même API que kellygame.shop, marchand configurable dans config.js).
(function () {
  function renderSummary() {
    const cart = window.Cart.getCart();
    const linesEl = document.getElementById('summary-lines');
    const totalEl = document.getElementById('summary-total');
    if (!linesEl) return;

    if (cart.length === 0) {
      linesEl.innerHTML = '<p style="color:var(--muted)">Votre panier est vide. <a href="boutique.html" style="text-decoration:underline;">Retour à la boutique</a></p>';
    } else {
      linesEl.innerHTML = cart
        .map(
          (i) => `
        <div class="summary-line">
          <span>${i.name} (P.${i.size}) x${i.qty}</span>
          <span>${window.Cart.formatPrice(i.price * i.qty)}</span>
        </div>`
        )
        .join('');
    }
    totalEl.textContent = window.Cart.formatPrice(window.Cart.total());
  }

  function initForm() {
    const form = document.getElementById('checkout-form');
    const errorEl = document.getElementById('checkout-error');
    const payBtn = document.getElementById('pay-btn');
    const payBtnText = document.getElementById('pay-btn-text');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      errorEl.classList.remove('show');

      const cart = window.Cart.getCart();
      if (cart.length === 0) {
        errorEl.textContent = 'Votre panier est vide.';
        errorEl.classList.add('show');
        return;
      }

      const nom = document.getElementById('nomClient').value.trim();
      const numero = document.getElementById('numeroClient').value.trim();
      const email = document.getElementById('emailClient').value.trim();
      const ville = document.getElementById('villeClient').value.trim();
      const adresse = document.getElementById('adresseClient').value.trim();

      if (!nom || !numero || !ville || !adresse) {
        errorEl.textContent = 'Merci de remplir tous les champs obligatoires.';
        errorEl.classList.add('show');
        return;
      }

      const total = window.Cart.total();
      const article = cart.map((i) => ({
        [`${i.name} (Pointure ${i.size}) x${i.qty}`]: i.price * i.qty
      }));

      const paymentData = {
        totalPrice: total,
        article: article,
        numeroSend: numero,
        nomclient: nom,
        email: email || 'N/A',
        personal_Info: [
          {
            Nom: nom,
            Telephone: numero,
            Ville: ville,
            Adresse: adresse,
            Panier: JSON.stringify(
              cart.map((i) => ({ id: i.productId, size: i.size, qty: i.qty }))
            )
          }
        ],
        return_url: window.location.origin + '/success.html',
        webhook_url: window.location.origin + '/api/webhook'
      };

      payBtn.disabled = true;
      payBtnText.textContent = 'Génération du paiement…';

      try {
        const response = await fetch(window.SHOES_CONFIG.MONEYFUSION_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        });
        const data = await response.json();

        if (data.statut && data.url) {
          localStorage.setItem(
            'kellyshoes_last_order',
            JSON.stringify({ cart, nom, numero, ville, adresse, total, timestamp: Date.now() })
          );
          window.location.href = data.url;
        } else {
          throw new Error(data.message || 'Statut de paiement invalide');
        }
      } catch (err) {
        errorEl.textContent =
          '❌ ' + (err.message === 'Failed to fetch' ? 'Erreur réseau. Vérifiez votre connexion.' : 'Paiement impossible : ' + err.message);
        errorEl.classList.add('show');
        payBtn.disabled = false;
        payBtnText.textContent = '🔐 Payer maintenant';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderSummary();
    initForm();
  });
})();
