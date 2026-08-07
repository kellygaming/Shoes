// Webhook MoneyFusion — appelé par MoneyFusion après confirmation du paiement.
// Décrémente le stock (table product_sizes) dans Supabase pour chaque article vendu.
//
// Variables d'environnement requises (à définir dans Vercel > Settings > Environment Variables) :
//   SUPABASE_URL          -> https://ahdzgclywakvwipexbse.supabase.co
//   SUPABASE_SERVICE_KEY   -> la clé "service_role" du projet Supabase (Settings > API)
//                             ⚠️ ne jamais exposer cette clé côté navigateur.

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ahdzgclywakvwipexbse.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function decrementStock(productId, size, qty) {
  const headers = {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  };

  const getUrl = `${SUPABASE_URL}/rest/v1/product_sizes?product_id=eq.${productId}&size=eq.${size}&select=id,quantity`;
  const getRes = await fetch(getUrl, { headers });
  const rows = await getRes.json();
  if (!Array.isArray(rows) || rows.length === 0) return;

  const row = rows[0];
  const newQty = Math.max(0, (row.quantity || 0) - qty);

  await fetch(`${SUPABASE_URL}/rest/v1/product_sizes?id=eq.${row.id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ quantity: newQty, in_stock: newQty > 0 })
  });
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body || {};
    const isPaid =
      payload.statut === true ||
      payload.status === 'confirmed' ||
      payload.status === 'success' ||
      payload.status === 'completed';

    if (!isPaid) {
      return res.status(200).json({ success: true, message: 'Paiement non confirmé, ignoré.' });
    }

    let personalInfo = payload.personal_info || payload.personal_Info || [];
    if (typeof personalInfo === 'string') {
      try {
        personalInfo = JSON.parse(personalInfo);
      } catch (e) {
        personalInfo = [];
      }
    }

    const info = Array.isArray(personalInfo) ? personalInfo[0] : null;
    if (!info || !info.Panier || !SUPABASE_SERVICE_KEY) {
      return res.status(200).json({ success: true, message: 'Rien à traiter.' });
    }

    let panier = [];
    try {
      panier = JSON.parse(info.Panier);
    } catch (e) {
      panier = [];
    }

    for (const item of panier) {
      if (item.id && item.size && item.qty) {
        await decrementStock(item.id, item.size, item.qty);
      }
    }

    return res.status(200).json({ success: true, message: 'Stock mis à jour.' });
  } catch (error) {
    console.error('[WEBHOOK] Erreur:', error);
    return res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
};
