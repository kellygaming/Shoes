# Kelly Shoes

Site e-commerce de vente de chaussures (sneakers), avec accueil, boutique, panier,
paiement Mobile Money via MoneyFusion et gestion des prix/stock via Supabase.

## Structure

- `index.html` — page d'accueil (hero + produits en vedette)
- `boutique.html` — catalogue complet avec filtre par marque
- `checkout.html` — tunnel de paiement (MoneyFusion)
- `success.html` — page de confirmation après paiement
- `css/style.css` — styles (responsive mobile/tablette/desktop)
- `js/` — logique front (Supabase, panier, produits, hero, paiement)
- `api/webhook.js` — fonction serverless Vercel appelée par MoneyFusion après paiement,
  qui décrémente le stock dans Supabase

## Gestion des prix et du stock (Supabase)

Projet Supabase : **Chaussure site** (`ahdzgclywakvwipexbse`).

- Table `products` : nom, marque, **prix** (`price`), image, description, `is_featured`.
  → Modifiez `price` directement dans Supabase (Table Editor) pour changer un prix, il
  sera reflété instantanément sur le site.
- Table `product_sizes` : une ligne par produit/pointure (41, 44, 45) avec `in_stock`
  et `quantity`. Passez `in_stock` à `false` (ou `quantity` à `0`) pour marquer une
  rupture de stock — la pointure apparaîtra alors barrée et indisponible sur le site.

Le site lit ces tables en lecture seule via la clé publique (anon key), déjà configurée
dans `js/config.js`.

## Déploiement (Vercel conseillé)

1. Importer ce repo dans Vercel.
2. Dans les paramètres du projet, ajouter les variables d'environnement :
   - `SUPABASE_URL` = `https://ahdzgclywakvwipexbse.supabase.co`
   - `SUPABASE_SERVICE_KEY` = la clé **service_role** du projet Supabase (Project
     Settings > API), utilisée uniquement côté serveur par `api/webhook.js` pour
     mettre à jour le stock après une vente. Ne jamais mettre cette clé côté front.
3. Déployer. Une fois le domaine connu, aucune configuration supplémentaire n'est
   nécessaire : les URLs de retour/webhook MoneyFusion sont générées automatiquement
   à partir du domaine (`window.location.origin`).

## Paiement MoneyFusion

Le checkout utilise actuellement le lien marchand MoneyFusion de kellygame
(`e01bcc2156cd33e2`), le temps que la boutique de chaussures ait son propre compte.
Pour basculer sur votre propre lien marchand : mettez à jour `MONEYFUSION_URL` dans
`js/config.js` avec `https://pay.moneyfusion.net/E_commerce/VOTRE_ID/pay/`.
