// Petit client REST pour Supabase (PostgREST) : pas besoin du SDK complet
// pour de simples lectures publiques protégées par RLS.
window.SupabaseREST = (function () {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.SHOES_CONFIG;

  async function fetchProducts() {
    const url =
      `${SUPABASE_URL}/rest/v1/products` +
      `?select=*,product_sizes(size,in_stock,quantity)` +
      `&is_active=eq.true&order=created_at.asc`;

    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!res.ok) throw new Error('Erreur de chargement des produits');
    return res.json();
  }

  return { fetchProducts };
})();
