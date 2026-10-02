# Charles Lippens, Data Analyst : portfolio en une page (version 3)

Ce dépôt contient la version 3 de mon portfolio : une page unique en HTML, CSS et JavaScript, sans framework ni étape
de construction. Elle est publiée avec GitHub Pages, à l'adresse <https://charleslippensdata.github.io/portfolio-v3/>.

La page présente la mission du projet 13 (le notebook BottleNeck amélioré avec l'IA), la veille technologique et
métier, le registre des quatorze projets du parcours Data Analyst d'OpenClassrooms avec leurs livrables, mon parcours
et le contact. Elle se lit en thème clair ou sombre, sur ordinateur comme sur téléphone, et s'imprime.

## Les trois versions de mon portfolio

| Version | Présentation | Adresse | Dépôt |
|---|---|---|---|
| 4, la référence | dossier éditorial, une page longue avec sommaire | <https://charleslippensdata.github.io/> | `CharlesLippensData.github.io` |
| 3, ce dépôt | page unique | <https://charleslippensdata.github.io/portfolio-v3/> | `portfolio-v3` |
| 2 | site de six pages | <https://charleslippensdata.github.io/portfolio-v2/> | `portfolio-v2` |

Les trois présentent le même contenu. Elles renvoient aux mêmes documents (notebooks et documentation du projet 13,
CV, livrables des projets du parcours), publiés une seule fois sur le site principal, dans <https://charleslippensdata.github.io/livrables/>.

## Structure

- `index.html` : la page.
- `assets/style.css` et `assets/app.js` : mise en page, thème clair ou sombre, menu mobile, onglets de la veille,
  filtres des projets, impression.
- `assets/fonts/` : Sora et Inter, sous licence SIL Open Font License (textes des licences dans le même dossier).
- `assets/img/` : les cinq figures de la mission, redessinées à partir des sorties du notebook, la capture du dispositif
  de veille et l'icône.
- `404.html`, `.nojekyll` et `.gitignore` : fichiers d'hébergement.

## Consulter en local

Depuis ce dossier : `python -m http.server 8000`, puis ouvrir <http://localhost:8000> dans un navigateur. Les documents à
télécharger restent ceux du site principal : il faut une connexion pour les ouvrir.

## Données et confidentialité

Aucun cookie, aucune mesure d'audience ; le thème choisi reste dans le navigateur du visiteur. La page ne charge aucune
ressource d'un autre serveur ; seuls les liens vers les documents mènent au site principal. Les jeux de données des
projets sont fournis par OpenClassrooms ou ouverts ; aucune donnée personnelle de tiers n'est publiée. L'hébergeur,
GitHub Pages (GitHub, Inc.), enregistre l'adresse IP des visiteurs pour la sécurité du service.

Dernière mise à jour : 1er octobre 2026.
