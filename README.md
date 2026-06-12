# MyDope Off

**Application web de réduction des risques liés aux substances psychoactives.**
Francophone, hors-ligne, sans compte, sans serveur. Tout reste sur l'appareil de la personne.

🔗 [podarcis-cloud.github.io/lucide-](https://podarcis-cloud.github.io/lucide-)

---

## Pourquoi ce projet

L'information fiable sur les drogues existe, mais elle est dispersée, en anglais, ou noyée dans des forums. Pendant ce temps, le marché évolue plus vite que les lois : cannabinoïdes de synthèse, nitazènes, cathinones vendues sous des noms commerciaux opaques. Beaucoup de gens consomment sans savoir ce qu'ils prennent ni ce qui se passe quand on mélange.

MyDope Off part d'un principe simple : **interdire ou ignorer ne réduit pas les dommages, informer si.** L'application ne juge pas, n'encourage pas l'usage, et ne se substitue pas à un soignant. Elle donne à la personne — pas au patient, pas au dossier — les moyens de comprendre, de mesurer et, si elle le décide, de réduire ou couper la boucle.

## Ce que fait l'application

- **Fiches substances** — plus de 270 fiches : effets, doses indicatives (réduction des risques, pas des seuils « sûrs »), durée, addiction, pharmacologie, alias de recherche. Couvre les classiques, les research chemicals, les cannabinoïdes, les NPS et les psychoactifs naturels.
- **Vérificateur d'interactions** — analyse chaque paire de produits saisie. Au-delà des interactions documentées, un moteur déduit le risque par mécanisme (dépresseur + dépresseur, opioïde + benzo, IMAO + sérotoninergique…) pour couvrir toutes les substances.
- **Suivi conso** — journal personnel, calendrier des 30 derniers jours, projection des coûts (« loterie inversée »), objectifs par substance. Export/import des données en local.
- **Détection** — fenêtres de détection estimées par type de test (salive, urine, sang).
- **Exercices anti-craving** — tâches courtes (labyrinthe au gyroscope, Tetris) pour occuper l'esprit le temps qu'une envie redescende.
- **RDR & contrôles routiers** — numéros d'urgence, bonnes pratiques, déroulé et seuils légaux des contrôles (France, Belgique).
- **Guide & lexique** — prise en main et glossaire des termes scientifiques du domaine.

## Principes

- **Vie privée d'abord.** Aucun compte, aucune analyse, aucun serveur. Les données du journal vivent uniquement dans le navigateur.
- **Hors-ligne.** Installable comme une PWA, fonctionne sans connexion.
- **Sans jugement.** Posture de réduction des risques, pas d'abstinence imposée.
- **Honnêteté sur les limites.** Les dosages et durées sont des estimations, pas des garanties ni un avis médical ou juridique.

## Installer comme application (PWA)

- **Android / ordinateur (Chrome, Edge)** : menu du navigateur → « Installer l'application ».
- **iPhone / iPad** : ouvrir dans **Safari** → Partager → « Sur l'écran d'accueil ».

## Technique

Site statique, sans dépendances ni build. HTML / CSS / JavaScript natif, service worker pour le hors-ligne, `localStorage` pour les données. Hébergé sur GitHub Pages.

Déploiement : remplacer les fichiers à la racine du dépôt. Le service worker est versionné (`CACHE` dans `sw.js`) ; incrémenter sa version à chaque mise à jour force le rechargement du cache côté utilisateur.

## Avertissement

MyDope Off est un outil d'information et de réduction des risques. Il **ne promeut pas** l'usage de substances et **ne remplace pas** un avis médical, psychologique ou juridique. En cas d'urgence, contactez les secours (15 / 112 en Europe). Les informations sont fournies à titre éducatif, sans garantie d'exactitude ou d'exhaustivité.

## Licence

Projet à but non lucratif. Voir `LICENSE` si présent dans le dépôt.
