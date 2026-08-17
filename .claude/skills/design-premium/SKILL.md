---
name: design-premium
description: Règles de design anti-slop pour ce site (Kelly Shoes) et tout autre site en HTML/CSS/JS pur. À charger avant d'écrire ou de modifier du markup, du CSS ou une animation, et avant de livrer une page. Contient les interdits (patterns qui font "fait par une IA"), les règles de typographie, couleur, layout, motion, et un check pré-livraison.
---

# Design premium pour sites statiques

Distillé du projet open source [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
(licence MIT, Copyright (c) 2026 Leonxlnx), puis **traduit pour notre stack réelle** :
HTML/CSS/JS natif, sans React, sans Tailwind, sans Motion. Le repo d'origine suppose
React + Next + Tailwind + Motion ; les principes de design sont transférables, les
recettes techniques non. Ce fichier ne garde que ce qui s'applique ici.

Portée : pages vitrines, accueil, boutique, contact. Pas les tableaux de données ni
les back-offices.

---

## 1. Lire le brief avant de coder

Avant de toucher au code, formuler en une ligne : **"Je lis ça comme : \<type de page>
pour \<audience>, avec un langage \<vibe>."**

Pour ce projet, la lecture par défaut est :
*boutique e-commerce sneakers pour une clientèle jeune en Afrique de l'Ouest, langage
premium consumer, mobile d'abord.*

Si le brief est vraiment ambigu, poser **une seule** question. Sinon, décider et avancer.

### Les trois curseurs

Régler ces trois valeurs et les respecter dans toute la page.

| Curseur | Échelle | Valeur pour ce projet |
|---|---|---|
| `VARIANCE` (audace du layout) | 1 symétrique, 10 chaotique | **7** |
| `MOTION` (profondeur des animations) | 1 statique, 10 cinématique | **6** |
| `DENSITE` (info par écran) | 1 galerie d'art, 10 cockpit | **3** |

Conséquences directes : `VARIANCE 7` interdit les héros centrés (voir 4), `MOTION 6`
oblige la page à réellement bouger (voir 6), `DENSITE 3` impose des sections aérées
(96px de padding vertical minimum au desktop).

---

## 2. Interdits absolus (les signatures "fait par une IA")

Chacun de ces points est un motif d'échec à la livraison.

### 2.1 Le tiret cadratin est banni

**Zéro `—` et zéro `–` dans tout texte visible.** Titres, sous-titres, labels, boutons,
corps de texte, citations, légendes, attributs `alt`, balises `<title>`. Aucune
exception, aucune tolérance "avec parcimonie".

C'est la signature stylistique numéro un des textes générés par IA. Remplacer par :

- un point (deux phrases),
- une virgule,
- deux points,
- des parenthèses,
- un trait d'union simple `-` pour les plages (`2018-2026`, `8h00-19h00`).

Seuls caractères tiret autorisés : le trait d'union `-` et le signe moins (`-5°C`).

### 2.2 Emoji comme icône : banni

Un emoji dans une pastille ronde en guise d'icône (🚚 🔒 ⚡ 💬 ✉️ 📍 ✨ 🔥) est un
marqueur immédiat. Les emoji ne sont pas des icônes : ils changent de rendu selon
l'OS, s'alignent mal, et cassent le ton premium.

À la place : SVG inline d'une **seule** famille d'icônes, `stroke-width` uniforme
(1.5 ou 2), jamais dessinés à la main quand une librairie existe. Dans ce projet,
les SVG du header et du footer donnent le style de référence.

Exception : si le client demande explicitement un ton joueur ou "réseaux sociaux",
et alors avec parcimonie.

### 2.3 Le violet IA

`#7c3aed`, `#8b5cf6`, les dégradés violet-vers-rose, les halos néon violets : c'est la
palette par défaut de tout site généré par IA. Elle rend la marque invisible.

Règles de couleur :

- **Un seul accent** par site, saturation < 80%.
- Base neutre (zinc, slate, stone) plus un accent à fort contraste.
- **Verrou de cohérence** : l'accent choisi est utilisé sur toute la page. Pas de CTA
  bleu à la section 7 sur un site à accent rose.
- Ni `#000000` pur ni `#ffffff` pur. Ils tuent la profondeur. Utiliser un presque-noir
  et un presque-blanc.
- Une seule famille de gris (chaud **ou** froid, pas les deux).

Palettes de rechange pour du premium consumer, à faire tourner d'un projet à l'autre :
noir profond et tan, vert forêt et os avec accent ambre, cobalt et crème, terracotta
et ardoise, monochrome avec un seul accent saturé.

### 2.4 Trois cartes identiques côte à côte

La rangée de trois cartes égales avec icône, titre et paragraphe est le layout par
défaut de l'IA. Banni. Remplacer par :

- deux colonnes en zigzag,
- une grille asymétrique (une grande cellule plus deux petites),
- une bande à défilement horizontal,
- une simple liste séparée par des filets, sans cartes.

### 2.5 Autres marqueurs bannis

- **Les faux aperçus produit en `<div>`** (faux dashboard, faux terminal, fausse liste
  de tâches construits en div stylisées). Utiliser une vraie image ou rien.
- **Les indices de scroll** (`Scroll`, `↓ scroll`, roulette animée). L'utilisateur sait
  scroller.
- **Les numéros de section en label** (`01 / INDEX`, `002 · Nos produits`).
- **Les bandeaux ville, heure ou météo** décoratifs.
- **Les pastilles de statut colorées** partout. Uniquement pour un vrai état sémantique.
- **Les étiquettes posées sur les photos** (`Produit · 02`). Légende sous l'image ou rien.
- **Les fausses précisions chiffrées** (`92%`, `4,1×`, `5,8 mm`) sans donnée réelle derrière.
- **Le point médian `·` en séparateur universel**. Maximum un par ligne.
- **Les noms génériques** ("Jean Dupont", "Acme", "Nexus"). Noms réalistes et adaptés
  à la localité (pour ce projet : prénoms ivoiriens, quartiers d'Abidjan réels).
- **Les verbes creux** ("Révolutionner", "Sublimer", "Nouvelle génération", "Seamless").

### 2.6 Rationner les sur-titres

Le sur-titre est le petit label en majuscules espacées au-dessus d'un titre de section
(`SÉLECTION`, `EXPLORER`, `AVIS CLIENTS`). Toute page générée par IA en met un au-dessus
de chaque section, ce qui produit le même rythme templatisé partout.

**Maximum 1 sur-titre pour 3 sections.** Le héros compte pour 1. Une page de 9 sections
a droit à 3 sur-titres au total. Si la section A en a un, les deux suivantes n'en ont pas.

Vérification mécanique : compter les occurrences de la classe de sur-titre dans le HTML.
Si le total dépasse `arrondi_sup(nb_sections / 3)`, retirer les surplus. Le titre seul
suffit presque toujours : la position de la section dans la page la catégorise déjà.

---

## 3. Typographie

- **Titres d'affichage** : interlignage serré (`line-height: 1` à `1.05`), `letter-spacing`
  légèrement négatif. Contrôler la hiérarchie par le poids et la couleur, pas par une
  taille qui hurle.
- **Corps de texte** : largeur maximale `65ch`, interlignage `1.6` à `1.7`.
- **Inter par défaut : à éviter.** Préférer Geist, Outfit, Satoshi, Cabinet Grotesk,
  Space Grotesk. Inter reste acceptable si le brief demande un rendu neutre ou
  accessibilité d'abord.
- **Serif : très déconseillé par défaut.** "Ça fait créatif et premium" n'est pas une
  raison. C'est le réflexe IA le plus testé. Un serif se justifie seulement si la marque
  en nomme un, ou si l'univers est authentiquement éditorial, luxe, patrimonial. Dans
  ce cas, jamais `Fraunces` ni `Instrument Serif` (les deux serifs favoris des IA).
- **Emphase dans un titre** : italique ou gras de la **même** police. Ne jamais injecter
  un mot en serif dans un titre en sans-serif pour "faire joli". Le mélange de familles
  pour l'emphase est amateur.
- **Descendantes en italique** : un mot italique contenant `y g j p q` avec
  `line-height: 1` se fait couper. Minimum `1.1` plus une réserve de `padding-bottom`.

---

## 4. Layout

### Le héros

- **Il doit tenir dans le premier écran.** Titre sur 2 lignes maximum au desktop,
  sous-titre de 20 mots maximum et 4 lignes maximum, CTA visible sans scroller.
- Un titre de héros sur 4 lignes est toujours une erreur de taille de police, jamais
  une erreur de longueur de texte.
- **Padding haut : 96px maximum** au desktop. Au-delà, le contenu flotte au milieu de
  l'écran et ça se lit comme un bug.
- **Maximum 4 éléments de texte** : sur-titre (ou rien), titre, sous-titre, CTA
  (1 principal plus 1 secondaire au maximum). Bannis dans le héros : la mini-phrase
  sous les CTA, la bande de logos clients, le teaser de prix, la liste de bénéfices.
  Tout ça descend dans une section dédiée juste en dessous.
- **Pas de héros centré** quand `VARIANCE > 4`. Préférer l'écran scindé, le contenu à
  gauche et l'asset à droite, ou l'asymétrie de blanc. Exception : les pages manifeste
  où le message *est* le design.
- **Le héros a besoin d'un vrai visuel.** Texte plus dégradé n'est pas un héros, c'est
  un emplacement vide.
- **`min-height: 100dvh`, jamais `100vh`.** La barre d'adresse de Safari iOS fait sauter
  le layout avec `vh`.

### Les sections

- **Interdiction de répéter une famille de layout.** Une fois qu'une section utilise un
  motif (trio de cartes, citation pleine largeur, texte-image scindé), ce motif
  n'apparaît **qu'une fois** dans la page. Une page de 8 sections utilise au moins
  4 familles différentes.
- **Plafond du zigzag : 2 sections consécutives** en texte-image alterné. La troisième
  d'affilée est un échec. Casser avec une section pleine largeur, une grille, une bande.
- **Grille asymétrique : exactement autant de cellules que de contenu.** 3 items donnent
  3 cellules. Une cellule vide au milieu ou à la fin veut dire que la grille est mal
  pensée. Reformer la grille, ne pas coller une tuile vide.
- **Diversité visuelle dans les grilles** : au moins 2 ou 3 cellules d'une grille
  multi-cellules portent une vraie variation (image, dégradé de marque, texture, fond
  teinté). Six cartes blanches avec juste du texte se lit comme un défaut IA.
- **Titre de section : un seul message.** Le motif "gros titre à gauche plus petit
  paragraphe explicatif flottant à droite" est banni par défaut. Empiler verticalement.
- **CSS Grid, pas de calcul en flexbox.** `grid-template-columns: repeat(3, 1fr)` plutôt
  que `width: calc(33% - 1rem)`.
- **Navigation sur une seule ligne** au desktop, hauteur 80px maximum (64-72px par défaut).
- **Chaque layout multi-colonnes déclare son repli mobile** dans la même feuille. Pas de
  "ça devrait passer".

### Cartes, ombres, formes

- Une carte seulement quand l'élévation traduit une vraie hiérarchie. Sinon, grouper par
  filet (`border-top`), séparateur ou espace négatif.
- Une ombre est **teintée de la couleur du fond**. Jamais de noir pur sur fond clair.
- **Verrou de forme** : un seul barème de rayon pour toute la page. Soit tout net (0),
  soit tout doux (12-16px), soit tout en pilule. Un système mixte est acceptable
  seulement s'il est documenté et suivi partout (par exemple : boutons en pilule,
  cartes à 16px, champs à 8px).

---

## 5. Contenu et copie

- **Par section** : titre court (8 mots maximum), sous-paragraphe court (25 mots maximum),
  et un visuel **ou** un CTA. Le reste doit se justifier.
- **Listes de plus de 5 items** : la liste à puces ou les rangées séparées par des filets
  est le choix paresseux. Préférer une grille de cartes, des onglets, un accordéon, des
  pastilles à défilement horizontal, ou un regroupement en 2-3 blocs logiques.
- **Jamais `border-top` et `border-bottom` sur chaque rangée** d'un long tableau. Choisir
  un seul filet, l'utiliser avec parcimonie.
- **Citations : 3 lignes maximum.** Attribution avec prénom plus rôle ou ville, jamais un
  prénom seul.
- **Un seul CTA par intention.** "Nous contacter" plus "Parlons-en" plus "Écrivez-nous"
  sur la même page est un échec. Un libellé par intention, réutilisé partout.
- **Libellé de CTA sur une seule ligne** au desktop, 3 mots maximum pour un CTA principal.
- **Relecture obligatoire avant livraison** : relire chaque chaîne visible. Signaler et
  réécrire tout ce qui est grammaticalement cassé, sans référent clair, ou qui sonne
  comme une IA qui essaie d'être poétique. Une copie plate est meilleure qu'une copie
  mignonne et fausse.

---

## 6. Motion en CSS et JS natif

Le repo d'origine s'appuie sur Motion et GSAP. Voici les équivalents natifs.

### Règles dures

- **Animer uniquement `transform` et `opacity`.** Jamais `top`, `left`, `width`, `height`
  ni `margin` : ça déclenche un recalcul de layout à chaque frame.
- **`window.addEventListener('scroll')` est banni.** Il tourne à chaque frame, sans
  regroupement. Utiliser `IntersectionObserver`, ou les animations CSS pilotées par le
  scroll (`animation-timeline: view()`).
- **Courbes personnalisées obligatoires.** Jamais `linear` ni `ease-in-out` bruts.
  Références utiles : `cubic-bezier(0.16, 1, 0.3, 1)` pour une sortie douce et ample,
  `cubic-bezier(0.32, 0.72, 0, 1)` pour un ressenti de masse physique.
- **`prefers-reduced-motion` est obligatoire** dès que `MOTION > 3`. Les boucles infinies,
  le parallaxe et les révélations au scroll retombent à l'état statique.
- **Toute animation doit être motivée.** Avant d'en ajouter une, savoir ce qu'elle
  communique : hiérarchie, narration, retour d'action, ou changement d'état. "C'était
  joli" n'est pas une réponse valable.
- **Une seule bande défilante (marquee) par page** au maximum. Deux se lisent comme du
  remplissage.
- **`MOTION` annoncé égale `MOTION` visible.** Si le curseur est au-dessus de 4, la page
  bouge vraiment : entrée du héros, révélation au scroll, physique au survol des CTA.
  Sinon, descendre le curseur à 3 et livrer une page nette et statique. Ne jamais livrer
  une animation à moitié faite.
- **`backdrop-filter` seulement sur les éléments fixes ou collants** (barre de nav,
  surcouches). Jamais sur un conteneur qui défile : repeints GPU en continu, effondrement
  du framerate mobile.
- **Grain et bruit** exclusivement sur un pseudo-élément `position: fixed` avec
  `pointer-events: none`.
- **Pas de `z-index` arbitraire.** Réserver l'empilement aux couches systémiques
  (nav collante, modale, surcouche, grain) et documenter le barème.

### Révélation au scroll (le motif à utiliser par défaut)

```js
// Ne jamais écouter l'événement scroll. IntersectionObserver suffit et se regroupe.
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target); // une seule fois, on libère l'observateur
      }
    });
  },
  { threshold: 0.25 }
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
}
[data-reveal].in-view { opacity: 1; transform: none; }

/* Cascade : décaler les enfants par une variable d'index posée dans le HTML */
[data-reveal].in-view > * { transition-delay: calc(var(--i, 0) * 70ms); }

@media (prefers-reduced-motion: reduce) {
  [data-reveal] { opacity: 1; transform: none; transition: none; }
}
```

### Vidéo de fond

Charger en différé et mettre en pause hors écran, sinon la vidéo consomme du réseau et
du CPU pour rien.

```js
// preload="none" dans le HTML, puis load() au premier passage dans l'écran
if (entry.isIntersecting) { if (!loaded) { loaded = true; video.load(); } video.play(); }
else { video.pause(); }
```

---

## 7. Images

Une page vitrine est un **produit visuel**. Une page tout en texte n'est pas du
minimalisme, c'est un travail inachevé.

Ordre de priorité :

1. **Générer les visuels** si un outil de génération d'images est disponible, au bon
   ratio pour chaque section.
2. **Vraies photos** sinon : `https://picsum.photos/seed/{graine-descriptive}/{l}/{h}`,
   ou les assets fournis par le client.
3. **En dernier recours**, laisser un emplacement clairement marqué
   (`<!-- TODO: photo produit, 1600x1200 -->`) et **le dire à l'utilisateur** en fin de
   réponse. Ne jamais remplir avec des illustrations SVG dessinées à la main ni de faux
   aperçus en div.

Autres points :

- Même un site sobre a besoin de 2-3 vraies images au minimum.
- Les photos produit détourées (fond transparent, format WebP) sont l'atout de ce projet :
  elles se posent sur n'importe quel fond coloré. Les conserver en WebP, jamais en PNG
  non compressé.
- **Mur de logos : des logos et rien d'autre.** Pas de libellé de secteur sous chaque
  logo. Il se place **sous** le héros, jamais dedans, et utilise de vrais SVG
  (Simple Icons : `https://cdn.simpleicons.org/{slug}/{couleur}`).
- Réserver la place des images (`aspect-ratio`) pour éviter le décalage de mise en page.

---

## 8. Accessibilité et performance

- **Contraste des boutons** : vérifier que le texte du bouton est lisible sur son fond.
  Blanc sur blanc, ou bouton transparent sans bordure sur un fond photographique, sont
  des échecs. Minimum WCAG AA : 4,5:1 pour le texte courant, 3:1 à partir de 18px.
- **Contraste des formulaires** : champs, texte indicatif, anneau de focus, libellés,
  messages d'erreur passent tous AA sur le fond de leur section.
- **Libellé au-dessus du champ**, message d'erreur en dessous. Jamais le texte indicatif
  en guise de libellé.
- **États complets** : chargement (squelettes à la forme du contenu final, pas de
  rond qui tourne), vide (composé, avec l'action pour le remplir), erreur (en ligne pour
  un formulaire, contextuel sinon).
- **Retour tactile** : au `:active`, `transform: scale(.98)` ou `translateY(1px)` pour
  simuler l'appui physique.
- **Un seul thème par page.** Une page sombre reste sombre de bout en bout. Une section
  claire coincée entre deux sections sombres donne l'impression d'avoir changé de site.
  Un basculement de thème est permis une fois, s'il est délibéré et transitionné.
- **Cibles Core Web Vitals** : LCP sous 2,5s (image du héros préchargée), INP sous 200ms,
  CLS sous 0,1.

---

## 9. Check avant livraison

À passer intégralement. Une case non cochable veut dire que la page n'est pas finie.

- [ ] Lecture du brief formulée et curseurs `VARIANCE` / `MOTION` / `DENSITE` explicites
- [ ] **Zéro `—` et zéro `–`** dans tout texte visible, `<title>` et `alt` compris
- [ ] Aucun emoji en guise d'icône ; une seule famille d'icônes SVG, `stroke-width` uniforme
- [ ] Un seul accent, appliqué identiquement sur toute la page ; pas de violet IA par défaut
- [ ] Un seul barème de rayon appliqué partout
- [ ] Un seul thème (clair, sombre ou auto) pour toute la page
- [ ] Une seule famille de gris (chaud ou froid), ni noir pur ni blanc pur
- [ ] Héros : titre sur 2 lignes maximum, sous-titre de 20 mots maximum, CTA visible
      sans scroller, padding haut de 96px maximum, 4 éléments de texte maximum
- [ ] Nombre de sur-titres inférieur ou égal à `arrondi_sup(nb_sections / 3)`
- [ ] Aucune rangée de trois cartes identiques
- [ ] Aucune famille de layout utilisée deux fois ; au moins 4 familles sur 8 sections
- [ ] Pas plus de 2 sections texte-image alternées consécutives
- [ ] Grilles : autant de cellules que de contenu, aucune cellule vide, 2-3 cellules
      avec une vraie variation visuelle
- [ ] Un seul libellé par intention de CTA, tenant sur une ligne au desktop
- [ ] Contraste des boutons et des formulaires vérifié (WCAG AA)
- [ ] Vraies images partout, aucun faux aperçu en div, aucun SVG décoratif dessiné à la main
- [ ] Mur de logos sous le héros, logos seuls, sans libellé de secteur
- [ ] Chaque animation justifiable en une phrase ; une seule bande défilante maximum
- [ ] Aucun `window.addEventListener('scroll')` ; `IntersectionObserver` ou CSS
- [ ] Animations sur `transform` et `opacity` uniquement, courbes personnalisées
- [ ] `prefers-reduced-motion` géré pour toute animation
- [ ] `min-height: 100dvh`, jamais `100vh`
- [ ] `backdrop-filter` seulement sur des éléments fixes ou collants
- [ ] Repli mobile déclaré pour chaque layout multi-colonnes
- [ ] Toutes les chaînes visibles relues : rien de cassé, rien de pseudo-poétique
- [ ] Aucun indice de scroll, numéro de section, bandeau ville/heure, pastille décorative
- [ ] Aucun chiffre faussement précis sans donnée réelle derrière

---

## 10. État de ce site

Le premier audit avait relevé cinq écarts. Tous sont corrigés.

| Écart relevé | Correction appliquée | Règle |
|---|---|---|
| Tirets cadratins dans le texte visible | Zéro `—` et zéro `–` sur tout le site, vérifié par script | 2.1 |
| Emoji en guise d'icônes | `js/icons.js` : une seule famille SVG, tracé 1.75, injectée par `data-icon` | 2.2 |
| Accent violet IA plus second accent rose | Accent unique rose `#d6336c` ; `--accent-deep` et `--accent-soft` sont des nuances du même rose | 2.3 |
| Rangée de trois cartes identiques | Rangée `.assurance-row` groupée par filets, sans cartes | 2.4 |
| 6 sur-titres pour 8 sections | 2 sur-titres conservés (héros et bannière promo) | 2.6 |

### Conventions issues de ces corrections

- **Sémantique des couleurs** : le rose signale la marque et le positif (pastille
  Promo, badge panier, liens actifs) ; le gris translucide signale l'indisponibilité
  (badge rupture de stock) ; le rouge `--danger` est réservé aux erreurs de
  formulaire. Ne pas mélanger ces trois rôles.
- **Icônes** : n'ajouter une icône qu'en l'enregistrant dans `js/icons.js`, jamais en
  posant un SVG à la main dans une page. `icons.js` doit être chargé avant
  `partials.js` sur toute page qui utilise `data-icon` ou `data-stars`.
- **Ambiances du héros** : les quatre pastilles de couleur du héros sont un dispositif
  interactif assumé, autorisé une fois par page. Le rose de la marque est l'état par
  défaut, les trois autres sont des fonds sombres qui ne concurrencent pas l'accent.
- **Nom de produit** : ne jamais préfixer aveuglément le nom par la marque. Beaucoup
  de noms la contiennent déjà, ce qui produit "Jordan Air Jordan 1 Mid SE". Voir
  `fullTitle()` dans `js/hero.js`.
- **Bloc vidéo sombre** : c'est le seul basculement de thème pleine largeur de la
  page, délibéré pour mettre la vidéo en valeur. Les bannières promo et contact sont
  des cartes sombres contenues, pas des basculements de thème. Ne pas en ajouter un
  deuxième en pleine largeur.
