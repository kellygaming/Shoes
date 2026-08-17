// Jeu d'icônes du site. Une seule famille, tracé de 1.75, bouts arrondis.
// Les emoji ne sont pas utilisés comme icônes : leur rendu change selon
// le système d'exploitation, ils s'alignent mal et cassent le ton premium.
window.Icons = (function () {
  function svg(paths, size) {
    return (
      `<svg viewBox="0 0 24 24" width="${size || 24}" height="${size || 24}" ` +
      `fill="none" stroke="currentColor" stroke-width="1.75" ` +
      `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`
    );
  }

  const paths = {
    // Livraison
    truck:
      '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/>' +
      '<circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',
    // Paiement sécurisé
    lock:
      '<rect x="4.5" y="10.5" width="15" height="9.5" rx="2"/>' +
      '<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    // Stock en temps réel
    refresh: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4h-4"/>',
    // Confiance, énergie
    bolt: '<path d="M13.5 3 6 13.5h5l-.5 7.5L18 10.5h-5z"/>',
    // Qualité, durabilité
    shield:
      '<path d="M12 3.5 5 6.2v5.3c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6.2z"/>' +
      '<path d="M9.3 12.2l1.9 1.9 3.6-3.6"/>',
    // Style, singularité
    sparkle:
      '<path d="M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7z"/>' +
      '<path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    // Contact
    whatsapp:
      '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3.5 20.5l1.6-4.6A8.4 8.4 0 1 1 20.5 11.6z"/>' +
      '<path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.7 0 1.1-.6.8-1.2l-.6-1-1.5.5-1.8-1.8.5-1.5-1-.6c-.6-.3-1.2.1-1.2.8z"/>',
    mail:
      '<rect x="3" y="5.5" width="18" height="13" rx="2"/>' +
      '<path d="M3.8 6.8 12 12.8l8.2-6"/>',
    pin:
      '<path d="M12 21c4-4.4 6-7.5 6-10a6 6 0 1 0-12 0c0 2.5 2 5.6 6 10z"/>' +
      '<circle cx="12" cy="11" r="2.3"/>',
    // Notation
    star:
      '<path d="M12 4l2.5 5.2 5.5.8-4 3.9 1 5.6L12 16.9 7 19.5l1-5.6-4-3.9 5.5-.8z"/>',
    // Confirmation
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    // Fermeture d'un panneau
    close: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>'
  };

  function get(name, size) {
    const p = paths[name];
    if (!p) return '';
    return svg(p, size);
  }

  // Remplit tout élément portant data-icon="nom" (data-icon-size facultatif).
  function render(root) {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      const name = el.getAttribute('data-icon');
      const size = el.getAttribute('data-icon-size');
      el.innerHTML = get(name, size ? Number(size) : undefined);
    });
  }

  // Remplit tout élément portant data-stars="n" avec n étoiles pleines.
  function renderStars(root) {
    (root || document).querySelectorAll('[data-stars]').forEach((el) => {
      const n = Number(el.getAttribute('data-stars')) || 0;
      const label = `${n} étoiles sur 5`;
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', label);
      el.innerHTML = get('star', 15).repeat(n);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    renderStars();
  });

  return { get, render, renderStars, paths };
})();
